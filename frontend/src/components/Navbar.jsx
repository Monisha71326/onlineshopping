import { useState } from "react";
import SearchModal from "./SearchModal";

function Navbar({ title }) {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <>
      <div className="navbar">
        <h1 className="page-title">{title}</h1>

        <div className="search-box" onClick={() => setSearchOpen(true)}>
          <i className="ti ti-search" />
          <span>Search orders, products...</span>
          <kbd>⌘K</kbd>
        </div>

        <div className="nav-actions">
          <button className="nav-btn" aria-label="Notifications">
            <i className="ti ti-bell" />
            <span className="notif-dot" />
          </button>
          <button className="nav-btn" aria-label="Messages">
            <i className="ti ti-message-circle" />
          </button>
          <div className="nav-avatar">AK</div>
        </div>
      </div>
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}

export default Navbar;