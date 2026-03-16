import './ProductCard.css';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-img">
        {product.badge && <span className="badge">{product.badge}</span>}
        {!product.inStock && <span className="badge out">Out of Stock</span>}
        <span className="product-emoji">{product.emoji || '🌸'}</span>
      </div>
      <div className="product-info">
        <div className="product-cat">{product.category}</div>
        <h4 className="product-name">{product.name}</h4>
        {product.description && <p className="product-desc">{product.description}</p>}
        <div className="product-price">₹{product.price}</div>
      </div>
    </div>
  );
}
