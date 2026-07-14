import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Offers from "./pages/Offers";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";
import AddCustomer from "./pages/AddCustomer";

import "./App.css";

const pageTitle = {
  "/": "Dashboard",
  "/products": "Products",
  "/orders": "Orders",
  "/customers": "Customers",
  "/payments": "Payments",
  "/analytics": "Analytics",
  "/offers": "Offers",
  "/settings": "Settings",
};

function Layout() {
  const location = useLocation();
  const title = pageTitle[location.pathname] || "Dashboard";

  return (
    <div className="app">
      <Sidebar />

      <div className="main">
        <Navbar title={title} />

        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/add-customer" element={<AddCustomer />} />

            <Route
              path="*"
              element={
                <div className="empty-page">
                  <i className="ti ti-tools" />
                  <p>Page coming soon</p>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;