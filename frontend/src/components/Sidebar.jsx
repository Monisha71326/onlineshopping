import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <i className="ti ti-shopping-bag" />
        </div>
        <span className="logo-text">MONI<span>SHA</span></span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <i className="ti ti-layout-dashboard" /> Dashboard
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <i className="ti ti-box" /> Products
        </NavLink>
        <NavLink to="/orders" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <i className="ti ti-clipboard-list" /> Orders
        </NavLink>
        <NavLink to="/offers" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <i className="ti ti-tag" /> Offers
        </NavLink>
        <NavLink to="/customers" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <i className="ti ti-users" /> Customers
        </NavLink>
        <NavLink to="/analytics" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <i className="ti ti-chart-bar" /> Analytics
        </NavLink>
        <NavLink to="/payments" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <i className="ti ti-credit-card" /> Payments
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <i className="ti ti-settings" /> Settings
        </NavLink>
        <NavLink to="/add-customer" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <i className="ti ti-user-plus" /> Add Customer
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="user-avatar">AK</div>
        <div className="user-info">
          <div className="user-name">Admin</div>
          <div className="user-role">Store Manager</div>
        </div>
        <i className="ti ti-logout logout-icon" />
      </div>
    </div>
  );
}

export default Sidebar;