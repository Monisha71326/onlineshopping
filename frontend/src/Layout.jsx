import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

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
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;