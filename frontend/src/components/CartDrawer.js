import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./CartDrawer.css";

export default function CartDrawer() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
    cartOpen,
    setCartOpen,
  } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setCartOpen(false);
    if (!user) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <>
      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)} />
      )}
      <div className={`cart-drawer ${cartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h3>
            Your Cart{" "}
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </h3>
          <button className="cart-close" onClick={() => setCartOpen(false)}>
            ✕
          </button>
        </div>

        {cart.items.length === 0 ? (
          <div className="cart-empty">
            <span>🛍️</span>
            <p>Your cart is empty</p>
            <button
              className="btn-primary"
              onClick={() => {
                setCartOpen(false);
                navigate("/shop");
              }}
            >
              Browse Shop
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {/* {cart.items.map((item) => (
                // <div key={item.product} className="cart-item">
                //   <span className="cart-item-emoji">{item.emoji}</span>
                //   <div className="cart-item-info">
                <div key={item.product} className="cart-item">
                  <div className="cart-item-thumb">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    ) : (
                      <span>{item.emoji || "🌸"}</span>
                    )}
                  </div> */}

              {cart.items.map((item) => (
                <div key={item.product} className="cart-item">
                  <div className="cart-item-thumb">
                    {item.image ? (
                      <img
                        src={`https://images.weserv.nl/?url=${encodeURIComponent(item.image)}`}
                        alt={item.name}
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.innerHTML = "<span>🌸</span>";
                        }}
                      />
                    ) : (
                      <span>{item.emoji || "🌸"}</span>
                    )}
                  </div>
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">₹{item.price}</p>
                  </div>
                  <div className="cart-item-qty">
                    <button
                      onClick={() =>
                        updateQuantity(item.product, item.quantity - 1)
                      }
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeFromCart(item.product)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <strong>₹{totalPrice}</strong>
              </div>
              {!user && (
                <p className="cart-login-note">
                  Login to save your cart & checkout
                </p>
              )}
              <button
                className="btn-primary cart-checkout-btn"
                onClick={handleCheckout}
              >
                {user ? "Proceed to Checkout" : "Login to Checkout"}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
