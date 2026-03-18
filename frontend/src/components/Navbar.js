import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems, setCartOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => (location.pathname === path ? "active" : "");
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        Meraki <span></span> Knotora
      </Link>
      <div className="nav-links">
        <Link to="/" className={isActive("/")}>
          Home
        </Link>
        <Link to="/shop" className={isActive("/shop")}>
          Shop
        </Link>
        <Link to="/about" className={isActive("/about")}>
          About
        </Link>
        <Link to="/contact" className={isActive("/contact")}>
          Contact
        </Link>
        {user?.role === "admin" && (
          <Link to="/admin" className={`admin-link ${isActive("/admin")}`}>
            Dashboard
          </Link>
        )}
      </div>
      <div className="nav-auth">
        <button className="cart-btn" onClick={() => setCartOpen(true)}>
          🛍️
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </button>
        {user ? (
          <>
            <span className="nav-username">Hi, {user.name.split(" ")[0]}</span>
            <button className="btn-outline" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="btn-outline">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn-primary">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
