  import { useState, useEffect, useRef } from "react";

  // ── CONFIG — appo deploy panna, itha update pannu ──────────────
  const API_BASE = window.location.hostname === "localhost"
? "http://localhost:8000/api"
: "https://onlineshopping-production-550b.up.railway.app/api";
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    .pp-page {
      padding: 1.5rem;
      font-family: 'Inter', 'Segoe UI', sans-serif;
      background: #f9f9fb;
      min-height: 100vh;
    }

    /* ── Header ── */
    .pp-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
      gap: 12px;
    }
    .pp-title { font-size: 22px; font-weight: 700; color: #1a1a1a; }
    .pp-subtitle { font-size: 13px; color: #999; margin-top: 2px; }
    .btn-add {
      background: #E91E8C;
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: background 0.15s;
    }
    .btn-add:hover { background: #C2185B; }

    /* ── Stats ── */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 10px;
      margin-bottom: 1.5rem;
    }
    .stat-card {
      border-radius: 12px;
      padding: 1rem 1.1rem;
      border: 1px solid #ececec;
      background: #fff;
    }
    .stat-card.pink  { background: #FFF0F7; border-color: #f9cde3; }
    .stat-card.blue  { background: #F0F4FF; border-color: #c9d6ff; }
    .stat-card.green { background: #F0FFF4; border-color: #b9edc8; }
    .stat-card.amber { background: #FFFBF0; border-color: #f5dfa0; }
    .stat-label { font-size: 12px; color: #888; margin-bottom: 4px; }
    .stat-value { font-size: 20px; font-weight: 700; color: #1a1a1a; }
    .stat-value.warn { color: #854F0B; }

    /* ── Category tabs ── */
    .cat-tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }
    .cat-tab {
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      border: 1.5px solid #e0e0e0;
      background: #fff;
      color: #555;
      transition: all 0.15s;
    }
    .cat-tab:hover  { border-color: #E91E8C; color: #E91E8C; }
    .cat-tab.active { background: #E91E8C; color: #fff; border-color: #E91E8C; }

    /* ── Filters ── */
    .filters-row {
      display: flex;
      gap: 10px;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }
    .filters-row input,
    .filters-row select {
      font-size: 13px;
      padding: 9px 12px;
      border-radius: 8px;
      border: 1px solid #ddd;
      background: #fff;
      color: #1a1a1a;
      outline: none;
    }
    .filters-row input { flex: 1; min-width: 180px; }
    .filters-row input:focus,
    .filters-row select:focus { border-color: #E91E8C; }

    /* ── Table card ── */
    .table-card {
      background: #fff;
      border-radius: 14px;
      border: 1px solid #ececec;
      overflow: hidden;
    }
    .pp-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }
    .pp-table thead tr { background: #fafafa; }
    .pp-table th {
      padding: 11px 16px;
      text-align: left;
      font-weight: 500;
      font-size: 12px;
      color: #999;
      border-bottom: 1px solid #f0f0f0;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .pp-table td {
      padding: 12px 16px;
      border-bottom: 1px solid #f5f5f5;
      color: #1a1a1a;
      vertical-align: middle;
    }
    .pp-table tbody tr:last-child td { border-bottom: none; }
    .pp-table tbody tr:hover td { background: #FFF5FA; }

    /* ── Product name cell ── */
    .prod-name-cell { display: flex; align-items: center; gap: 10px; }
    .prod-thumb {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      object-fit: cover;
      border: 1.5px solid #f0f0f0;
      background: #f9f9f9;
      flex-shrink: 0;
    }
    .prod-emoji-thumb {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      flex-shrink: 0;
      border: 1.5px solid #f0f0f0;
    }
    .cat-dress  { background: #FFF0F7; }
    .cat-jwl    { background: #FFFBF0; }
    .cat-shoe   { background: #F0FFF4; }
    .cat-beauty { background: #FFF0F0; }
    .cat-home   { background: #F0F4FF; }
    .cat-kids   { background: #F5FFF0; }
    .cat-other  { background: #F5F5F5; }

    .prod-name { font-weight: 600; font-size: 14px; color: #1a1a1a; }
    .pp-price { color: #E91E8C; font-weight: 600; }

    /* ── Badge ── */
    .pp-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
    }
    .b-high { background: #EAF3DE; color: #3B6D11; }
    .b-low  { background: #FAEEDA; color: #854F0B; }
    .b-out  { background: #FCEBEB; color: #A32D2D; }
    .pp-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

    /* ── Actions ── */
    .action-btns { display: flex; gap: 6px; }
    .act-btn {
      background: none;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      padding: 5px 10px;
      cursor: pointer;
      font-size: 12px;
      color: #555;
      transition: all 0.12s;
    }
    .act-btn:hover { background: #f5f5f5; }
    .act-btn.del { color: #A32D2D; }
    .act-btn.del:hover { background: #FCEBEB; border-color: #f09595; }

    /* ── Empty / Loading ── */
    .pp-empty {
      text-align: center;
      padding: 3.5rem;
      color: #bbb;
      font-size: 14px;
    }
    .pp-empty .empty-icon { font-size: 42px; margin-bottom: 10px; }
    .pp-loading { text-align: center; padding: 3rem; color: #ccc; font-size: 14px; }

    /* ── Toast ── */
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #1a1a1a;
      color: #fff;
      padding: 12px 18px;
      border-radius: 10px;
      font-size: 14px;
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
      animation: slideUp 0.2s ease;
    }
    .toast.success { background: #1e7e34; }
    .toast.error   { background: #A32D2D; }
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }

    /* ── Modal ── */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
    }
    .modal-box {
      background: #fff;
      border-radius: 16px;
      padding: 1.6rem;
      width: 400px;
      max-width: 92vw;
      box-shadow: 0 8px 32px rgba(0,0,0,0.14);
      max-height: 92vh;
      overflow-y: auto;
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.3rem;
    }
    .modal-title { font-size: 18px; font-weight: 700; color: #1a1a1a; }
    .modal-close {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: #aaa;
      padding: 2px 6px;
      border-radius: 4px;
      line-height: 1;
    }
    .modal-close:hover { background: #f5f5f5; color: #555; }

    /* ── Form ── */
    .form-field { margin-bottom: 13px; }
    .form-field label {
      display: block;
      font-size: 13px;
      color: #666;
      margin-bottom: 5px;
      font-weight: 500;
    }
    .form-field input,
    .form-field select {
      width: 100%;
      padding: 9px 12px;
      border-radius: 8px;
      border: 1px solid #ddd;
      font-size: 14px;
      color: #1a1a1a;
      background: #fff;
      outline: none;
    }
    .form-field input:focus,
    .form-field select:focus { border-color: #E91E8C; }

    /* ── Image upload ── */
    .img-upload-area {
      border: 2px dashed #e0e0e0;
      border-radius: 10px;
      padding: 1.2rem;
      text-align: center;
      cursor: pointer;
      transition: border-color 0.15s;
      background: #fafafa;
      position: relative;
    }
    .img-upload-area:hover { border-color: #E91E8C; background: #FFF5FA; }
    .img-upload-area.has-img { border-style: solid; border-color: #E91E8C; }
    .img-upload-area input[type="file"] {
      position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%;
    }
    .img-preview {
      width: 80px;
      height: 80px;
      border-radius: 10px;
      object-fit: cover;
      margin: 0 auto 8px;
      display: block;
    }
    .img-upload-label { font-size: 13px; color: #999; }
    .img-upload-icon  { font-size: 28px; margin-bottom: 6px; }

    /* ── Emoji picker ── */
    .emoji-picker { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 6px; }
    .emoji-opt {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      border: 1.5px solid #e8e8e8;
      background: #fafafa;
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.12s;
    }
    .emoji-opt:hover   { border-color: #E91E8C; background: #FFF0F7; }
    .emoji-opt.sel     { border-color: #E91E8C; background: #FFF0F7; }

    /* ── Modal buttons ── */
    .modal-actions { display: flex; gap: 10px; margin-top: 1.3rem; }
    .btn-save {
      flex: 1;
      background: #E91E8C;
      color: #fff;
      border: none;
      padding: 10px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s;
    }
    .btn-save:hover    { background: #C2185B; }
    .btn-save:disabled { background: #f097c6; cursor: not-allowed; }
    .btn-cancel {
      flex: 1;
      background: none;
      border: 1px solid #ddd;
      padding: 10px;
      border-radius: 8px;
      font-size: 14px;
      color: #666;
      cursor: pointer;
    }
    .btn-cancel:hover { background: #f5f5f5; }

    /* ── Error inline ── */
    .field-error { font-size: 12px; color: #A32D2D; margin-top: 4px; }
  `;

  // ── Data ───────────────────────────────────────────────────────
  const CATEGORIES = [
    { key: "all",    label: "All" },
    { key: "dress",  label: "👗 Dress" },
    { key: "jwl",    label: "💍 Jewellery" },
    { key: "shoe",   label: "👟 Footwear" },
    { key: "beauty", label: "💄 Beauty" },
    { key: "home",   label: "🏠 Home" },
    { key: "kids",   label: "🧸 Kids" },
    { key: "other",  label: "📦 Other" },
  ];

  const CAT_EMOJIS = {
    dress:  ["👗","👘","🥻","🩱","🧣","🧥","👚","👕"],
    jwl:    ["💍","📿","💎","👑","🪙","✨","🥇","💛"],
    shoe:   ["👟","👠","👡","👢","🥾","🩴","👞","🥿"],
    beauty: ["💄","💅","🪞","🧴","🌸","🪷","🫧","💋"],
    home:   ["🏠","🛋️","🪑","🛏️","🪴","🕯️","🧹","🫙"],
    kids:   ["🧸","🎠","🎒","🪀","🎨","🧩","🪁","🎈"],
    other:  ["📦","🛍️","🎁","⭐","🔖","🏷️"],
  };

  const emptyForm = { name: "", emoji: "", category: "dress", price: "", stock: "" };

  function getStatus(stock) {
    if (stock === 0)   return { cls: "b-out",  label: "Out of stock" };
    if (stock <= 50)   return { cls: "b-low",  label: "Low stock" };
    return                    { cls: "b-high", label: "In stock" };
  }

  function formatValue(val) {
    if (val >= 10000000) return "₹" + (val / 10000000).toFixed(1) + " Cr";
    if (val >= 100000)   return "₹" + (val / 100000).toFixed(1) + " L";
    return "₹" + val.toLocaleString();
  }

  // ── API helpers ────────────────────────────────────────────────
  async function apiFetch(path, options = {}) {
    const res = await fetch(`${API_BASE}${path}`, options);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || err.detail || `Error ${res.status}`);
    }
    return res.json();
  }

  // ── Component ──────────────────────────────────────────────────
  export default function Products() {
    const [products, setProducts]   = useState([]);
    const [stats, setStats]         = useState(null);
    const [loading, setLoading]     = useState(true);
    const [saving, setSaving]       = useState(false);

    const [search, setSearch]           = useState("");
    const [statusFilter, setStatusFlt]  = useState("all");
    const [catFilter, setCatFilter]     = useState("all");

    const [showModal, setShowModal]   = useState(false);
    const [editItem, setEditItem]     = useState(null);      // null = add, object = edit
    const [form, setForm]             = useState(emptyForm);
    const [imageFile, setImageFile]   = useState(null);      // File object
    const [imagePreview, setPreview]  = useState(null);      // data URL
    const [fieldErrors, setFieldErrors] = useState({});

    const [toast, setToast]           = useState(null);
    const fileRef                     = useRef();

    // ── Load products ────────────────────────────────────────────
    const loadProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (catFilter !== "all")    params.set("category", catFilter);
        if (statusFilter !== "all") params.set("status",   statusFilter);
        if (search)                 params.set("search",   search);

        const [data, statsData] = await Promise.all([
          apiFetch(`/products/?${params}`),
          apiFetch("/products/stats/"),
        ]);
        setProducts(data);
        setStats(statsData);
      } catch (e) {
        showToast("❌ " + e.message, "error");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => { loadProducts(); }, [catFilter, statusFilter, search]);

    // ── Toast helper ─────────────────────────────────────────────
    const showToast = (msg, type = "success") => {
      setToast({ msg, type });
      setTimeout(() => setToast(null), 3000);
    };

    // ── Modal helpers ─────────────────────────────────────────────
    const openAdd = () => {
      setEditItem(null);
      setForm(emptyForm);
      setImageFile(null);
      setPreview(null);
      setFieldErrors({});
      setShowModal(true);
    };

    const openEdit = (item) => {
      setEditItem(item);
      setForm({
        name:     item.name,
        emoji:    item.emoji,
        category: item.category,
        price:    String(item.price),
        stock:    String(item.stock),
      });
      setImageFile(null);
      setPreview(item.image_url || null);
      setFieldErrors({});
      setShowModal(true);
    };

    const closeModal = () => { setShowModal(false); setEditItem(null); };

    // ── Image pick ───────────────────────────────────────────────
    const handleImagePick = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target.result);
      reader.readAsDataURL(file);
    };

    // ── Category change in form ───────────────────────────────────
    const handleCatChange = (cat) => {
      setForm(f => ({
        ...f,
        category: cat,
        emoji: CAT_EMOJIS[cat]?.[0] || "📦",
      }));
    };

    // ── Save (create / update) ────────────────────────────────────
    const handleSave = async () => {
      const errors = {};
      if (!form.name.trim())       errors.name  = "Product name required";
      if (!form.price || form.price <= 0) errors.price = "Valid price required";
      if (form.stock === "")       errors.stock = "Stock quantity required";

      if (Object.keys(errors).length) { setFieldErrors(errors); return; }

      setSaving(true);
      try {
        const fd = new FormData();
        fd.append("name",     form.name.trim());
        fd.append("emoji",    form.emoji || CAT_EMOJIS[form.category]?.[0] || "📦");
        fd.append("category", form.category);
        fd.append("price",    form.price);
        fd.append("stock",    form.stock);
        if (imageFile) fd.append("image", imageFile);

        if (editItem) {
          await apiFetch(`/products/${editItem.id}/`, { method: "PUT", body: fd });
          showToast("✅ Product updated!");
        } else {
          await apiFetch("/products/", { method: "POST", body: fd });
          showToast("✅ Product added!");
        }
        closeModal();
        loadProducts();
      } catch (e) {
        showToast("❌ " + e.message, "error");
      } finally {
        setSaving(false);
      }
    };

    // ── Delete ────────────────────────────────────────────────────
    const handleDelete = async (item) => {
      if (!window.confirm(`"${item.name}" delete pannalama?`)) return;
      try {
        await apiFetch(`/products/${item.id}/`, { method: "DELETE" });
        showToast("🗑️ Product deleted");
        loadProducts();
      } catch (e) {
        showToast("❌ " + e.message, "error");
      }
    };

    // ── Render ────────────────────────────────────────────────────
    return (
      <>
        <style>{styles}</style>
        <div className="pp-page">

          {/* Header */}
          <div className="pp-header">
            <div>
              <div className="pp-title">Products</div>
              <div className="pp-subtitle">
                {stats ? `${stats.total_products} product${stats.total_products !== 1 ? "s" : ""} listed` : "Loading..."}
              </div>
            </div>
            <button className="btn-add" onClick={openAdd}>+ Add Product</button>
          </div>

          {/* Stats */}
          {stats && (
            <div className="stats-grid">
              <div className="stat-card pink">
                <div className="stat-label">Total products</div>
                <div className="stat-value">{stats.total_products}</div>
              </div>
              <div className="stat-card blue">
                <div className="stat-label">Total stock</div>
                <div className="stat-value">{Number(stats.total_stock).toLocaleString()} units</div>
              </div>
              <div className="stat-card green">
                <div className="stat-label">Inventory value</div>
                <div className="stat-value">{formatValue(stats.total_value)}</div>
              </div>
              <div className="stat-card amber">
                <div className="stat-label">Low stock items</div>
                <div className="stat-value warn">{stats.low_stock}</div>
              </div>
            </div>
          )}

          {/* Category tabs */}
          <div className="cat-tabs">
            {CATEGORIES.map(c => (
              <button
                key={c.key}
                className={`cat-tab ${catFilter === c.key ? "active" : ""}`}
                onClick={() => setCatFilter(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="filters-row">
            <input
              type="text"
              placeholder="🔍  Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select value={statusFilter} onChange={e => setStatusFlt(e.target.value)}>
              <option value="all">All status</option>
              <option value="high">In stock</option>
              <option value="low">Low stock</option>
              <option value="out">Out of stock</option>
            </select>
          </div>

          {/* Table */}
          <div className="table-card">
            {loading ? (
              <div className="pp-loading">Loading products...</div>
            ) : (
              <table className="pp-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={6}>
                        <div className="pp-empty">
                          <div className="empty-icon">📦</div>
                          No products found
                        </div>
                      </td>
                    </tr>
                  ) : (
                    products.map(item => {
                      const st      = getStatus(item.stock);
                      const catInfo = CATEGORIES.find(c => c.key === item.category) || CATEGORIES[CATEGORIES.length - 1];
                      return (
                        <tr key={item.id}>
                          <td>
                            <div className="prod-name-cell">
                              {item.image_url
                                ? <img src={item.image_url} alt={item.name} className="prod-thumb" />
                                : (
                                  <span className={`prod-emoji-thumb cat-${item.category}`}>
                                    {item.emoji}
                                  </span>
                                )
                              }
                              <span className="prod-name">{item.name}</span>
                            </div>
                          </td>
                          <td style={{ fontSize: "13px", color: "#888" }}>{catInfo.label}</td>
                          <td className="pp-price">₹{Number(item.price).toLocaleString()}</td>
                          <td style={{ color: "#555" }}>{item.stock} units</td>
                          <td>
                            <span className={`pp-badge ${st.cls}`}>
                              <span className="pp-dot"></span>
                              {st.label}
                            </span>
                          </td>
                          <td>
                            <div className="action-btns">
                              <button className="act-btn" onClick={() => openEdit(item)}>✏️ Edit</button>
                              <button className="act-btn del" onClick={() => handleDelete(item)}>🗑️ Del</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}
          </div>

        </div>

        {/* ── Toast ── */}
        {toast && (
          <div className={`toast ${toast.type}`}>{toast.msg}</div>
        )}

        {/* ── Modal ── */}
        {showModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title">{editItem ? "Edit Product" : "Add Product"}</div>
                <button className="modal-close" onClick={closeModal}>✕</button>
              </div>

              {/* Image upload */}
              <div className="form-field">
                <label>Product image</label>
                <div className={`img-upload-area ${imagePreview ? "has-img" : ""}`}>
                  <input type="file" accept="image/*" onChange={handleImagePick} />
                  {imagePreview
                    ? <img src={imagePreview} alt="preview" className="img-preview" />
                    : <>
                        <div className="img-upload-icon">📸</div>
                        <div className="img-upload-label">Click to upload image (Cloudinary la save aagum)</div>
                      </>
                  }
                  {imagePreview && (
                    <div className="img-upload-label">Click to change image</div>
                  )}
                </div>
              </div>

              {/* Category */}
              <div className="form-field">
                <label>Category</label>
                <select value={form.category} onChange={e => handleCatChange(e.target.value)}>
                  {CATEGORIES.filter(c => c.key !== "all").map(c => (
                    <option key={c.key} value={c.key}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Emoji */}
              <div className="form-field">
                <label>Pick emoji (image illana ithe show aagum)</label>
                <div className="emoji-picker">
                  {(CAT_EMOJIS[form.category] || CAT_EMOJIS.other).map(em => (
                    <button
                      key={em}
                      className={`emoji-opt ${form.emoji === em ? "sel" : ""}`}
                      onClick={() => setForm(f => ({ ...f, emoji: em }))}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div className="form-field">
                <label>Product name *</label>
                <input
                  placeholder="e.g. Silk Saree"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
                {fieldErrors.name && <div className="field-error">{fieldErrors.name}</div>}
              </div>

              {/* Price */}
              <div className="form-field">
                <label>Price (₹) *</label>
                <input
                  type="number"
                  placeholder="e.g. 2500"
                  value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })}
                />
                {fieldErrors.price && <div className="field-error">{fieldErrors.price}</div>}
              </div>

              {/* Stock */}
              <div className="form-field">
                <label>Stock quantity *</label>
                <input
                  type="number"
                  placeholder="e.g. 50"
                  value={form.stock}
                  onChange={e => setForm({ ...form, stock: e.target.value })}
                />
                {fieldErrors.stock && <div className="field-error">{fieldErrors.stock}</div>}
              </div>

              <div className="modal-actions">
                <button className="btn-cancel" onClick={closeModal}>Cancel</button>
                <button className="btn-save" onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : (editItem ? "Update" : "Save")}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
