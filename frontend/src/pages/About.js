import { useNavigate } from 'react-router-dom';
import './About.css';

export default function About() {
  const navigate = useNavigate();
  return (
    <main className="about">
      <section className="about-hero">
        <div className="about-text">
          <p className="about-eyebrow">Our Story</p>
          <h1>Made with <em>intention,</em><br />gifted with love</h1>
          <p>Petal & Knot was born from a love of slow, intentional making. Each piece starts as an idea, sketched in a notebook — then becomes real through patient hands, natural materials, and a lot of heart.</p>
          <p>We believe the things you carry and wear should tell a story. Whether it's a macramé keychain made from jute, a pressed flower sealed in resin, or a hand-rolled clay earring — there's a little piece of us in every creation.</p>
          <button className="btn-primary" onClick={() => navigate('/shop')}>Explore the Shop</button>
        </div>
        <div className="about-visual">
          <span className="about-big-icon">🌿</span>
          <p>Based in <strong>Indore, India</strong><br />Shipping across India<br />Custom orders welcome</p>
        </div>
      </section>

      <section className="about-values">
        {[
          { icon: '✦', title: '100% Handmade', desc: 'No machines, no shortcuts. Every knot tied, every resin poured, every clay piece shaped by hand.' },
          { icon: '🌸', title: 'Nature Inspired', desc: 'Dried florals, earthy tones, organic textures — our palette is borrowed from the natural world.' },
          { icon: '🎁', title: 'Gift-Ready Packaging', desc: 'Kraft box, dried flower, handmade tag, thank-you card — every order ships beautifully wrapped.' },
          { icon: '💛', title: 'Custom Orders', desc: 'Name keychains, personalised gift sets, wedding favours — reach out and we\'ll create something just for you.' },
        ].map((v, i) => (
          <div key={i} className="value-card">
            <span className="value-icon">{v.icon}</span>
            <h3>{v.title}</h3>
            <p>{v.desc}</p>
          </div>
        ))}
      </section>

      <section className="about-process">
        <div className="section-header-dark">
          <h2>How we make</h2>
          <p>A peek behind the scenes</p>
        </div>
        <div className="process-grid">
          {[
            { step: '01', title: 'Tying Macramé Knots', desc: 'Jute & cotton threads, knotted by hand into earrings, slings, and hangings.' },
            { step: '02', title: 'Pressing Dried Flowers', desc: 'Real flowers preserved and sealed in crystal-clear resin.' },
            { step: '03', title: 'Clay Shaping', desc: 'Air-dry clay rolled, cut, and shaped into earrings, pins, and pendants.' },
            { step: '04', title: 'Candle Bouquets', desc: 'Handmade candles arranged with dried florals into stunning bouquets.' },
          ].map((p, i) => (
            <div key={i} className="process-card">
              <span className="process-step">{p.step}</span>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-cta">
        <h2>Want something made just for you?</h2>
        <p>Custom orders for birthdays, festivals, weddings & more.</p>
        <button className="btn-primary" onClick={() => navigate('/contact')}>Send an Enquiry</button>
      </section>
    </main>
  );
}
