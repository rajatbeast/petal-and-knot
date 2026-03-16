import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import './Admin.css';

const CATEGORIES = ['macrame', 'resin', 'clay', 'candle', 'tote'];
const ORDER_STATUSES = ['new', 'contacted', 'confirmed', 'completed', 'cancelled'];
const EMPTY_PRODUCT = { name: '', description: '', price: '', category: 'macrame', emoji: '🌸', badge: '', inStock: true, featured: false };

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productForm, setProductForm] = useState(EMPTY_PRODUCT);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/login'); return; }
    fetchProducts();
    fetchOrders();
  }, [user, navigate]);

  const fetchProducts = useCallback(async () => {
    try { const res = await api.get('/products'); setProducts(res.data); } catch {}
  }, []);

  const fetchOrders = useCallback(async () => {
    try { const res = await api.get('/orders'); setOrders(res.data); } catch {}
  }, []);

  const openAddModal = () => {
    setEditingProduct(null); setProductForm(EMPTY_PRODUCT);
    setFormError(''); setFormSuccess(''); setShowProductModal(true);
  };
  const openEditModal = (p) => {
    setEditingProduct(p._id);
    setProductForm({ name: p.name, description: p.description || '', price: p.price, category: p.category, emoji: p.emoji || '🌸', badge: p.badge || '', inStock: p.inStock, featured: p.featured });
    setFormError(''); setFormSuccess(''); setShowProductModal(true);
  };

  const handleProductSubmit = async e => {
    e.preventDefault();
    setLoading(true); setFormError(''); setFormSuccess('');
    try {
      const payload = { ...productForm, price: Number(productForm.price) };
      if (editingProduct) { await api.put(`/products/${editingProduct}`, payload); setFormSuccess('Product updated!'); }
      else { await api.post('/products', payload); setFormSuccess('Product added!'); }
      fetchProducts();
      setTimeout(() => { setShowProductModal(false); setFormSuccess(''); }, 1000);
    } catch (err) { setFormError(err.response?.data?.message || 'Error saving product'); }
    finally { setLoading(false); }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  const updateOrderStatus = async (id, status) => {
    await api.put(`/orders/${id}`, { status });
    fetchOrders();
  };

  const deleteOrder = async (id) => {
    if (!window.confirm('Delete this order?')) return;
    await api.delete(`/orders/${id}`);
    fetchOrders();
  };

  const stats = {
    totalProducts: products.length,
    inStock: products.filter(p => p.inStock).length,
    totalOrders: orders.length,
    newOrders: orders.filter(o => o.status === 'new').length,
  };

  return (
    <div className="admin">
      <div className="admin-sidebar">
        <div className="admin-logo">Petal <em>&</em> Knot</div>
        <p className="admin-role">Admin Dashboard</p>
        <nav className="admin-nav">
          {['overview', 'products', 'orders'].map(t => (
            <button key={t} className={`admin-nav-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
              {t === 'overview' ? '📊 Overview' : t === 'products' ? '🧵 Products' : '📦 Orders'}
            </button>
          ))}
        </nav>
        <button className="admin-back-btn" onClick={() => navigate('/')}>← Back to Site</button>
      </div>

      <div className="admin-main">
        {/* OVERVIEW */}
        {tab === 'overview' && (
          <div className="admin-section">
            <h2>Overview</h2>
            <div className="stats-grid">
              <div className="stat-card"><span className="stat-num">{stats.totalProducts}</span><span className="stat-label">Total Products</span></div>
              <div className="stat-card"><span className="stat-num">{stats.inStock}</span><span className="stat-label">In Stock</span></div>
              <div className="stat-card"><span className="stat-num">{stats.totalOrders}</span><span className="stat-label">Total Enquiries</span></div>
              <div className="stat-card highlight"><span className="stat-num">{stats.newOrders}</span><span className="stat-label">New Enquiries</span></div>
            </div>
            <div className="overview-lists">
              <div className="overview-col">
                <h3>Recent Enquiries</h3>
                {orders.slice(0, 5).map(o => (
                  <div key={o._id} className="overview-item">
                    <div>
                      <strong>{o.name}</strong>
                      <span className="item-sub">{o.category} · {o.phone}</span>
                    </div>
                    <span className={`status-badge status-${o.status}`}>{o.status}</span>
                  </div>
                ))}
              </div>
              <div className="overview-col">
                <h3>Recent Products</h3>
                {products.slice(0, 5).map(p => (
                  <div key={p._id} className="overview-item">
                    <div>
                      <strong>{p.emoji} {p.name}</strong>
                      <span className="item-sub">{p.category} · ₹{p.price}</span>
                    </div>
                    <span className={`status-badge ${p.inStock ? 'status-confirmed' : 'status-cancelled'}`}>
                      {p.inStock ? 'In Stock' : 'Out'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        {tab === 'products' && (
          <div className="admin-section">
            <div className="section-top">
              <h2>Products</h2>
              <button className="btn-primary" onClick={openAddModal}>+ Add Product</button>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Badge</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p._id}>
                      <td><span className="t-emoji">{p.emoji}</span> {p.name}</td>
                      <td><span className="cat-tag">{p.category}</span></td>
                      <td>₹{p.price}</td>
                      <td><span className={`status-badge ${p.inStock ? 'status-confirmed' : 'status-cancelled'}`}>{p.inStock ? 'In Stock' : 'Out'}</span></td>
                      <td>{p.badge || '—'}</td>
                      <td className="action-cell">
                        <button className="action-btn edit" onClick={() => openEditModal(p)}>Edit</button>
                        <button className="action-btn delete" onClick={() => deleteProduct(p._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ORDERS */}
        {tab === 'orders' && (
          <div className="admin-section">
            <div className="section-top"><h2>Enquiries & Orders</h2></div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Name</th><th>Contact</th><th>Category</th><th>Message</th><th>Status</th><th>Date</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o._id}>
                      <td><strong>{o.name}</strong><br /><small>{o.email}</small></td>
                      <td>{o.phone}</td>
                      <td><span className="cat-tag">{o.category}</span></td>
                      <td className="msg-cell">{o.message || '—'}</td>
                      <td>
                        <select
                          className={`status-select status-${o.status}`}
                          value={o.status}
                          onChange={e => updateOrderStatus(o._id, e.target.value)}
                        >
                          {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td>{new Date(o.createdAt).toLocaleDateString('en-IN')}</td>
                      <td><button className="action-btn delete" onClick={() => deleteOrder(o._id)}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div className="modal-overlay" onClick={() => setShowProductModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button className="modal-close" onClick={() => setShowProductModal(false)}>✕</button>
            </div>
            <form onSubmit={handleProductSubmit}>
              <div className="form-row-2">
                <div className="form-group"><label>Product Name *</label><input value={productForm.name} onChange={e => setProductForm(p => ({...p, name: e.target.value}))} required /></div>
                <div className="form-group"><label>Emoji</label><input value={productForm.emoji} onChange={e => setProductForm(p => ({...p, emoji: e.target.value}))} /></div>
              </div>
              <div className="form-group"><label>Description</label><textarea value={productForm.description} onChange={e => setProductForm(p => ({...p, description: e.target.value}))} /></div>
              <div className="form-row-2">
                <div className="form-group">
                  <label>Price (₹) *</label>
                  <input type="number" value={productForm.price} onChange={e => setProductForm(p => ({...p, price: e.target.value}))} required />
                </div>
                <div className="form-group">
                  <label>Category *</label>
                  <select value={productForm.category} onChange={e => setProductForm(p => ({...p, category: e.target.value}))}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row-2">
                <div className="form-group"><label>Badge (optional)</label><input value={productForm.badge} onChange={e => setProductForm(p => ({...p, badge: e.target.value}))} placeholder="e.g. Bestseller" /></div>
                <div className="form-group modal-checks">
                  <label className="check-label"><input type="checkbox" checked={productForm.inStock} onChange={e => setProductForm(p => ({...p, inStock: e.target.checked}))} /> In Stock</label>
                  <label className="check-label"><input type="checkbox" checked={productForm.featured} onChange={e => setProductForm(p => ({...p, featured: e.target.checked}))} /> Featured</label>
                </div>
              </div>
              {formError && <p className="error-msg">{formError}</p>}
              {formSuccess && <p className="success-msg">{formSuccess}</p>}
              <div className="modal-actions">
                <button type="button" className="btn-outline" onClick={() => setShowProductModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Saving...' : editingProduct ? 'Update' : 'Add Product'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
