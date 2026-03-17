import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api";
import ProductCard from "../components/ProductCard";
import "./Shop.css";
import { useCart } from "../context/CartContext";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "macrame", label: "Macramé" },
  { key: "resin", label: "Resin" },
  { key: "clay", label: "Clay" },
  { key: "candle", label: "Candles & Gifts" },
  { key: "tote", label: "Tote Bags" },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  const category = searchParams.get("category") || "all";

  useEffect(() => {
    setLoading(true);
    const params = category !== "all" ? `?category=${category}` : "";
    api
      .get(`/products${params}`)
      .then((res) => setProducts(res.data))
      .catch(() => setError("Failed to load products. Please try again."))
      .finally(() => setLoading(false));
  }, [category]);

  const setFilter = (key) => {
    if (key === "all") setSearchParams({});
    else setSearchParams({ category: key });
  };

  return (
    <main className="shop">
      <div className="shop-header">
        <h1>The Collection</h1>
        <p>Every piece is one-of-a-kind, handcrafted with care</p>
      </div>

      <div className="filter-bar">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`filter-btn ${category === f.key ? "active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading && <div className="page-loader">Loading collection...</div>}
      {error && (
        <div className="page-loader" style={{ color: "var(--danger)" }}>
          {error}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="page-loader">
          No products found in this category yet.
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="products-grid">
          {products.map((p) => (
            <div key={p._id} className="product-card-wrap">
              <ProductCard product={p} />
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(p)}
                disabled={!p.inStock}
              >
                {p.inStock ? "+ Add to Cart" : "Out of Stock"}
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
