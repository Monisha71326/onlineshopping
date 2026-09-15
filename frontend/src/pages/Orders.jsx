    import { useEffect, useState } from "react";

   const API_BASE = window.location.hostname === "localhost" 
  ? "http://localhost:8000/api" 
  : "https://onlineshopping-production-550b.up.railway.app/api";
    async function apiFetch(path, options = {}) {
      const res = await fetch(`${API_BASE}${path}`, options);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || err.detail || "API Error");
      }
      return res.json();
    }

    function Orders() {
      const [customers, setCustomers] = useState([]);
      const [products, setProducts] = useState([]);
      const [orders, setOrders] = useState([]);
      const [showModal, setShowModal] = useState(false);

      const [form, setForm] = useState({
        customer: "",
        product: "",
        qty: 1,
        amount: 0,
      });

      const statusClass = {
        Delivered: "b-delivered",
        Pending: "b-pending",
        Shipped: "b-shipped",
      };

      const loadData = async () => {
        try {
          const [custData, prodData, orderData] = await Promise.all([
            apiFetch("/customers/"),
            apiFetch("/products/"),
            apiFetch("/orders/"),
          ]);
          setCustomers(custData);
          setProducts(prodData);
          setOrders(orderData);
        } catch (err) {
          console.error(err.message);
        }
      };

      useEffect(() => {
        loadData();
      }, []);

      const handleProductChange = (productId) => {
        const product = products.find((p) => String(p.id) === productId);
        setForm((prev) => ({
          ...prev,
          product: productId,
          amount: product ? product.price * prev.qty : 0,
        }));
      };

      const handleQtyChange = (qty) => {
        const product = products.find((p) => String(p.id) === form.product);
        setForm((prev) => ({
          ...prev,
          qty,
          amount: product ? product.price * qty : 0,
        }));
      };

      const addOrder = async () => {
        if (!form.customer || !form.product) return;
        try {
          await apiFetch("/orders/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              customer: form.customer,
              product: form.product,
              qty: form.qty,
            }),
          });
          setShowModal(false);
          setForm({ customer: "", product: "", qty: 1, amount: 0 });
          loadData();
        } catch (err) {
          alert(err.message);
        }
      };

      return (
        <div className="orders-page">

          {/* HEADER */}
          <div className="orders-header">
            <div>
              <div className="orders-title">Orders</div>
              <div className="orders-subtitle">{orders.length} orders total</div>
            </div>
            <button className="orders-add-btn" onClick={() => setShowModal(true)}>
              + New Order
            </button>
          </div>

          {/* TABLE */}
          <div className="orders-card">
            <table className="ord-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", padding: "2rem", color: "rgba(255,255,255,0.3)" }}>
                      No orders yet
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td className="ord-id">#{order.id}</td>
                      <td>{order.customer_name}</td>
                      <td>{order.product_name}</td>
                      <td>{order.qty}</td>
                      <td>₹{Number(order.amount).toLocaleString()}</td>
                      <td>
                        <span className={`ord-badge ${statusClass[order.status] || "b-pending"}`}>
                          <span className="ord-dot"></span>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* MODAL */}
          {showModal && (
            <div className="modal-overlay">
              <div className="modal-box">

                <h3>🛒 Create Order</h3>

                {/* CUSTOMER */}
                <label style={{ fontSize: 11, fontWeight: 700, color: "#a78bfa", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 6, display: "block" }}>
                  Customer
                </label>
                <select
                  value={form.customer}
                  onChange={(e) => setForm({ ...form, customer: e.target.value })}
                >
                  <option value="">Select Customer</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      #{c.id} — {c.name}  {/* ✅ id add பண்ணேன் */}
                    </option>
                  ))}
                </select>

                {/* PRODUCT */}
                <label style={{ fontSize: 11, fontWeight: 700, color: "#a78bfa", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 6, display: "block" }}>
                  Product
                </label>
                <select
                  value={form.product}
                  onChange={(e) => handleProductChange(e.target.value)}
                >
                  <option value="">Select Product</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — ₹{p.price}
                    </option>
                  ))}
                </select>

                {/* QTY */}
                <label style={{ fontSize: 11, fontWeight: 700, color: "#a78bfa", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 6, display: "block" }}>
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={form.qty}
                  onChange={(e) => handleQtyChange(Number(e.target.value))}
                />

                {/* AMOUNT */}
                <div className="modal-amount">
                  💰 Total: ₹{Number(form.amount || 0).toLocaleString()}
                </div>

                {/* BUTTONS */}
                <div className="modal-footer">
                  <button
                    className="modal-cancel-btn"
                    onClick={() => {
                      setShowModal(false);
                      setForm({ customer: "", product: "", qty: 1, amount: 0 });
                    }}
                  >
                    Cancel
                  </button>
                  <button className="modal-save-btn" onClick={addOrder}>
                    Add Order
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>
      );
    }

    export default Orders;
