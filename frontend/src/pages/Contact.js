import { useState } from 'react';
import api from '../api';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', category: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    try {
      const res = await api.post('/orders', form);
      setSuccess(res.data.message);
      setForm({ name: '', email: '', phone: '', category: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <main className="contact">
      <div className="contact-left">
        <p className="contact-eyebrow">Get in Touch</p>
        <h1>Let's create something <em>beautiful</em></h1>
        <p>Have a custom order in mind? A bulk gifting request? Or just want to say hello? We'd love to hear from you.</p>
        <div className="contact-details">
          <div className="contact-detail-item"><span>📍</span><p>Indore, Madhya Pradesh, India</p></div>
          <div className="contact-detail-item"><span>📦</span><p>Shipping across India</p></div>
          <div className="contact-detail-item"><span>🎁</span><p>Custom & bulk orders welcome</p></div>
          <div className="contact-detail-item"><span>⏱</span><p>We respond within 24 hours</p></div>
        </div>
      </div>

      <div className="contact-right">
        <h2>Send an Enquiry</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Your Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Priya Sharma" required />
            </div>
            <div className="form-group">
              <label>Phone / WhatsApp *</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" required />
            </div>
          </div>
          <div className="form-group">
            <label>Email Address *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
          </div>
          <div className="form-group">
            <label>I'm interested in *</label>
            <select name="category" value={form.category} onChange={handleChange} required>
              <option value="">— Select a category —</option>
              <option value="macrame">Macramé Accessories</option>
              <option value="resin">Resin / Floral Jewellery</option>
              <option value="clay">Clay Jewellery</option>
              <option value="candle">Candle & Gift Sets</option>
              <option value="tote">Custom Tote Bags</option>
              <option value="custom">Custom / Personalised Order</option>
              <option value="bulk">Bulk / Wedding Gifting</option>
              <option value="other">Just Browsing / General Query</option>
            </select>
          </div>
          <div className="form-group">
            <label>Your Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us what you have in mind — budget, occasion, quantity..." />
          </div>
          {error && <p className="error-msg">{error}</p>}
          {success && <p className="success-msg">🌸 {success}</p>}
          <button type="submit" className="btn-primary contact-submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </main>
  );
}
