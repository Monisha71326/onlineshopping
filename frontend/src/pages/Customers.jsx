import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = window.location.hostname === "localhost" 
  ? "http://localhost:8000/api" 
  : "https://onlineshopping-production-550b.up.railway.app/api";
const API = `${API_BASE}/enquiries/`;

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editCustomer, setEditCustomer] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { fetchCustomers(); }, []);

  async function fetchCustomers() {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setCustomers(Array.isArray(data) ? data : []);
    } catch (err) {
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", editCustomer.name || "");
      formData.append("email", editCustomer.email || "");
      formData.append("phone", editCustomer.phone || "");
      formData.append("message", editCustomer.message || "");
      if (editCustomer.newPhoto) formData.append("photo", editCustomer.newPhoto);

      const res = await fetch(`${API_BASE}/enquiry/${editCustomer.id}/`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) { await fetchCustomers(); setEditCustomer(null); }
      else alert("Update failed!");
    } catch (err) { alert("Network error!"); }
    finally { setSaving(false); }
  }

  async function handleDelete(id) {
    try {
     const res = await fetch(`${API_BASE}/enquiry/${id}/`, { method: "DELETE" });
      if (res.ok) { setCustomers((prev) => prev.filter((c) => c.id !== id)); setDeleteId(null); }
      else alert("Delete failed!");
    } catch (err) { alert("Network error!"); }
  }

  function getInitials(name = "") {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "?";
  }

  function truncate(str, n) {
    if (!str) return null;
    return str.length > n ? str.slice(0, n) + "…" : str;
  }

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase();
    return (
      (c.name || "").toLowerCase().includes(q) ||
      (c.email || "").toLowerCase().includes(q) ||
      (c.phone || "").toLowerCase().includes(q)
    );
  });

  // ── Shared th style ──
  const th = {
    padding: "11px 10px",
    fontSize: 11,
    fontWeight: 600,
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    textAlign: "left",
  };

  // ── Shared td style ──
  const td = {
    padding: "11px 10px",
    fontSize: 13,
    verticalAlign: "middle",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    borderBottom: "1px solid #202020",
    color: "#d0d0d0",
  };

  return (
    <div className="customers-page">

      {/* Header */}
      <div className="customers-header">
        <div>
          <h1 className="customers-title">Customers</h1>
          <p className="customers-subtitle">
            {loading ? "Loading…" : `${customers.length} total records`}
          </p>
        </div>
        <button className="add-btn" onClick={() => navigate("/add-customer")}>
          <span className="add-icon">+</span> Add Customer
        </button>
      </div>

      {/* Stat Cards */}
      {!loading && (
        <div className="stats-row">
          <div className="stat-card">
            <p className="stat-label">Total Records</p>
            <p className="stat-value">{customers.length}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">With Photo</p>
            <p className="stat-value">{customers.filter((c) => c.photo).length}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">With Phone</p>
            <p className="stat-value">{customers.filter((c) => c.phone).length}</p>
          </div>
        </div>
      )}

      {/* Search */}
      {!loading && (
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            type="text"
            placeholder="Search by name, email or phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch("")}>✕</button>
          )}
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="state-box"><p className="state-text">Fetching customers…</p></div>
      ) : filtered.length === 0 ? (
        <div className="state-box">
          <p className="state-icon">👤</p>
          <p className="state-text">{search ? "No results found" : "No customers yet"}</p>
          {search && <button className="clear-link" onClick={() => setSearch("")}>Clear search</button>}
        </div>
      ) : (
        <div className="table-wrap">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, tableLayout: "fixed" }}>
            <colgroup>
              <col style={{ width: "20%" }} /> {/* Name */}
              <col style={{ width: "22%" }} /> {/* Email */}
              <col style={{ width: "13%" }} /> {/* Phone */}
              <col style={{ width: "20%" }} /> {/* Message */}
              <col style={{ width: "8%" }}  /> {/* Photo */}
              <col style={{ width: "17%" }} /> {/* Actions */}
            </colgroup>
            <thead>
              <tr style={{ background: "#141414", borderBottom: "1px solid #2a2a2a" }}>
                <th style={th}>Name</th>
                <th style={th}>Email</th>
                <th style={th}>Phone</th>
                <th style={th}>Message</th>
                <th style={th}>Photo</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} style={{ borderBottom: "1px solid #202020" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#1e1e1e"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  {/* Name */}
                  <td style={td}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="avatar">{getInitials(c.name)}</div>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#fff", fontWeight: 600 }}>
                        {c.name || "—"}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td style={td} title={c.email}>
                    <span style={{ color: c.email ? "#d0d0d0" : "#444" }}>
                      {truncate(c.email, 22) || "—"}
                    </span>
                  </td>

                  {/* Phone */}
                  <td style={td}>
                    <span style={{ color: c.phone ? "#d0d0d0" : "#444" }}>
                      {c.phone || "—"}
                    </span>
                  </td>

                  {/* Message */}
                  <td style={td} title={c.message}>
                    <span style={{ color: c.message ? "#d0d0d0" : "#444" }}>
                      {truncate(c.message, 25) || "—"}
                    </span>
                  </td>

                  {/* Photo */}
<td style={{ ...td, textAlign: "center" }}>
  {c.photo
    ? <img src={c.photo} alt={c.name}
        style={{ width: 34, height: 34, borderRadius: 8, objectFit: "cover", border: "1px solid #2a2a2a", display: "block", margin: "0 auto" }} />
    : <span style={{ color: "#444" }}>—</span>}
</td>

                  {/* Actions */}
                  <td style={{ ...td, overflow: "visible" }}>
                    <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                      {/* Edit */}
                      <button
                        onClick={() => setEditCustomer({ ...c, newPhoto: null })}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 4,
                          padding: "5px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                          cursor: "pointer", border: "1px solid rgba(167,139,250,0.4)",
                          background: "rgba(167,139,250,0.12)", color: "#a78bfa",
                          fontFamily: "inherit", whiteSpace: "nowrap",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "rgba(167,139,250,0.25)"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "rgba(167,139,250,0.12)"}
                      >
                        <i className="ti ti-pencil" style={{ fontSize: 13 }} /> Edit
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => setDeleteId(c.id)}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 4,
                          padding: "5px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                          cursor: "pointer", border: "1px solid rgba(248,113,113,0.4)",
                          background: "rgba(248,113,113,0.12)", color: "#f87171",
                          fontFamily: "inherit", whiteSpace: "nowrap",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "rgba(248,113,113,0.25)"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "rgba(248,113,113,0.12)"}
                      >
                        <i className="ti ti-trash" style={{ fontSize: 13 }} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {search && (
            <p className="result-count">Showing {filtered.length} of {customers.length} customers</p>
          )}
        </div>
      )}

      {/* EDIT MODAL */}
      {editCustomer && (
        <div className="modal-overlay" onClick={() => setEditCustomer(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">✏️ Edit Customer</h2>

            <label className="form-label">Name</label>
            <input className="form-input" value={editCustomer.name || ""}
              onChange={(e) => setEditCustomer({ ...editCustomer, name: e.target.value })}
              placeholder="Full name" />

            <label className="form-label">Email</label>
            <input className="form-input" value={editCustomer.email || ""}
              onChange={(e) => setEditCustomer({ ...editCustomer, email: e.target.value })}
              placeholder="Email address" />

            <label className="form-label">Phone</label>
            <input className="form-input" value={editCustomer.phone || ""}
              onChange={(e) => setEditCustomer({ ...editCustomer, phone: e.target.value })}
              placeholder="Phone number" />

            <label className="form-label">Message</label>
            <textarea className="form-textarea" value={editCustomer.message || ""}
              onChange={(e) => setEditCustomer({ ...editCustomer, message: e.target.value })}
              placeholder="Message" rows={3} />

            <label className="form-label">New Photo (optional)</label>
            <input className="form-input" type="file" accept="image/*"
              style={{ padding: "8px 14px", cursor: "pointer" }}
              onChange={(e) => setEditCustomer({ ...editCustomer, newPhoto: e.target.files[0] })} />

            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setEditCustomer(null)}>Cancel</button>
              <button className="save-btn" onClick={handleSave} disabled={saving}>
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal" style={{ maxWidth: 340, textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
            <p style={{ fontSize: 40, marginBottom: 10 }}>🗑️</p>
            <h2 className="modal-title" style={{ fontSize: "1.1rem", marginBottom: 8 }}>Delete this customer?</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: "1.5rem" }}>
              This action cannot be undone.
            </p>
            <div className="modal-footer" style={{ justifyContent: "center" }}>
              <button className="cancel-btn" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="save-btn"
                style={{ background: "linear-gradient(135deg,#f87171,#ef4444)", boxShadow: "0 4px 15px rgba(239,68,68,0.4)" }}
                onClick={() => handleDelete(deleteId)}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Customers;
