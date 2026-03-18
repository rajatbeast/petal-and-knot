import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            Meraki <em></em> Knotora
          </div>
          <p>
            Handcrafted with love in Indore, India.
            <br />
            Boho accessories, floral jewellery & artisan candles.
          </p>
        </div>
        <div className="footer-links">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-links">
          <h4>Categories</h4>
          <Link to="/shop?category=macrame">Macramé</Link>
          <Link to="/shop?category=resin">Resin Jewellery</Link>
          <Link to="/shop?category=clay">Clay Collection</Link>
          <Link to="/shop?category=candle">Candles & Gifts</Link>
          <Link to="/shop?category=tote">Tote Bags</Link>
        </div>
        <div className="footer-contact">
          <h4>Get in Touch</h4>
          <p>📍 Indore, MP, India</p>
          <p>📦 Shipping across India</p>
          <p>🎁 Custom orders welcome</p>
          <Link to="/contact" className="footer-cta">
            Send an Enquiry →
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Meraki Knotora · Handmade with love · All
          rights reserved
        </p>
      </div>
    </footer>
  );
}
