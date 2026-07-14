import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_BASE = window.location.hostname === "localhost" ? "http://localhost:8000/api" : "/api";

function AddCustomer() {
  const location = useLocation();
  const navigate = useNavigate();

  const editingCustomer = location.state?.customer || null;
  const isEditing = Boolean(editingCustomer);

  const [form, setForm] = useState({
    name: editingCustomer?.name || "",
    email: editingCustomer?.email || "",
    phone: editingCustomer?.phone || "",
    message: editingCustomer?.message || "",
    photo: null,
  });

  const [preview, setPreview] = useState(
    editingCustomer?.photo || null
  );

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      const file = files?.[0] || null;
      setForm((prev) => ({ ...prev, photo: file }));

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      }
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const url = isEditing
        ? `${API_BASE}/enquiry/${editingCustomer.id}/`
        : `${API_BASE}/enquiry/`;

      const method = isEditing ? "PUT" : "POST";

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("message", form.message);

      if (form.photo) {
        formData.append("photo", form.photo);
      }

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        alert("Failed to save data");
        return;
      }

      alert(
        isEditing
          ? "Customer updated successfully!"
          : "Customer added successfully!"
      );

      if (isEditing) {
        navigate("/customers");
      } else {
        setForm({
          name: "",
          email: "",
          phone: "",
          message: "",
          photo: null,
        });
        setPreview(null);
        document.querySelector('input[type="file"]').value = "";
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <div className="form-brand">
          <div className="form-brand-icon">
            {isEditing ? "✏️" : "👤"}
          </div>

          <div>
            <h2 className="form-title">
              {isEditing ? "Edit Customer" : "Add Customer"}
            </h2>

            <p className="form-subtitle">
              {isEditing
                ? `Editing: ${editingCustomer.name}`
                : "Fill in the details below"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label>Message</label>
            <input
              type="text"
              name="message"
              value={form.message}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Photo</label>

            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: 8,
                  display: "block",
                }}
              />
            )}

            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading
              ? "Saving..."
              : isEditing
              ? "Update Customer"
              : "Add Customer"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCustomer;