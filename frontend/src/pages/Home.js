import { useNavigate } from "react-router-dom";
import "./Home.css";

const CATEGORIES = [
  {
    key: "macrame",
    label: "Macramé Accessories",
    emoji: "🪡",
    desc: "Earrings, keychains, bag slings & more",
  },
  {
    key: "resin",
    label: "Floral Resin Jewellery",
    emoji: "🌸",
    desc: "Dried flower earrings, pendants & bezels",
  },
  {
    key: "clay",
    label: "Clay Collection",
    emoji: "🍂",
    desc: "Pins, earrings & clay pendants",
  },
  {
    key: "candle",
    label: "Candles & Gifts",
    emoji: "🕯️",
    desc: "Bouquets, hampers & gift sets",
  },
  {
    key: "tote",
    label: "Tote Bags",
    emoji: "🎨",
    desc: "Hand-painted, quote & custom totes",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="home">
      {/* Hero */}
      <section className="hero">
        <video
          className="hero-video"
          src="https://v1.pinimg.com/videos/mc/expMp4/a6/18/11/a61811467ce333a1516134184f670a13_t3.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hero-overlay" />
        <div className="hero-text">
          <p className="hero-eyebrow">Handcrafted · Boho · Made with Love</p>
          <h1>
            Where every knot
            <br />
            tells a <em>story</em>
          </h1>
          <p className="hero-sub">
            Boho macramé accessories, floral resin jewellery, clay earrings &
            artisan candles — each piece made by hand, with soul.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate("/shop")}>
              Shop the Collection
            </button>
            <button
              className="btn-outline"
              onClick={() => navigate("/contact")}
            >
              Custom Orders
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-badge">
            <span className="hero-badge-icon">🌿</span>
            <strong>First Launch Collection</strong>
            <p>
              5 macramé earrings · 3 resin flower earrings
              <br />2 clay earrings · 3 keychains · 2 candle bouquets
            </p>
            <div className="hero-tags">
              <span>Boho</span>
              <span>Handmade</span>
              <span>Nature-inspired</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories bar */}
      <div className="cat-bar">
        {CATEGORIES.map((c) => (
          <span key={c.key} onClick={() => navigate(`/shop?category=${c.key}`)}>
            {c.label}
          </span>
        ))}
      </div>

      {/* Category cards */}
      <section className="cat-section">
        <div className="section-header">
          <h2>Explore the Collections</h2>
          <p>Every category, crafted with intention</p>
        </div>
        <div className="cat-grid">
          {CATEGORIES.map((c) => (
            <div
              key={c.key}
              className="cat-card"
              onClick={() => navigate(`/shop?category=${c.key}`)}
            >
              <span className="cat-emoji">{c.emoji}</span>
              <h3>{c.label}</h3>
              <p>{c.desc}</p>
              <span className="cat-link">View all →</span>
            </div>
          ))}
        </div>
      </section>

      {/* Brand promise */}
      <section className="promise-section">
        <div className="promise-grid">
          {[
            {
              icon: "✦",
              title: "100% Handmade",
              desc: "No machines, no shortcuts — every piece made by hand.",
            },
            {
              icon: "🌸",
              title: "Nature Inspired",
              desc: "Dried florals, earthy tones, organic textures.",
            },
            {
              icon: "🎁",
              title: "Gift-Ready Packaging",
              desc: "Kraft box, dried flower, handmade tag & thank-you card.",
            },
            {
              icon: "💛",
              title: "Custom Orders",
              desc: "Personalised gifts, name keychains, wedding favours.",
            },
          ].map((p, i) => (
            <div key={i} className="promise-card">
              <span className="promise-icon">{p.icon}</span>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="cta-banner">
        <h2>Have something special in mind?</h2>
        <p>
          Custom orders, bulk gifting, wedding favours — let's create something
          beautiful together.
        </p>
        <button className="btn-primary" onClick={() => navigate("/contact")}>
          Get in Touch
        </button>
      </section>
    </main>
  );
}
