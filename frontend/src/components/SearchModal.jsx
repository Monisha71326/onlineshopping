import { useState, useEffect, useRef } from "react";

const allItems = [
  { type: "Order",    label: "#ORD-8821 — Priya Nair",    icon: "ti-receipt-2",   color: "blue",   link: "/orders"    },
  { type: "Order",    label: "#ORD-8820 — Ravi Shankar",  icon: "ti-receipt-2",   color: "blue",   link: "/orders"    },
  { type: "Product",  label: "Nike Air Max",               icon: "ti-box",         color: "green",  link: "/products"  },
  { type: "Product",  label: "Apple Watch",                icon: "ti-box",         color: "green",  link: "/products"  },
  { type: "Customer", label: "Priya Nair",                 icon: "ti-user",        color: "amber",  link: "/customers" },
  { type: "Customer", label: "Deepak R",                   icon: "ti-user",        color: "amber",  link: "/customers" },
  { type: "Page",     label: "Analytics",                  icon: "ti-chart-bar",   color: "purple", link: "/analytics" },
  { type: "Page",     label: "Payments",                   icon: "ti-credit-card", color: "purple", link: "/payments"  },
  { type: "Page",     label: "Settings",                   icon: "ti-settings",    color: "purple", link: "/settings"  },
];

function SearchModal({ onClose }) {
  const [query, setQuery] = useState("");
  const inputRef          = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const results = query.trim()
    ? allItems.filter(i =>
        i.label.toLowerCase().includes(query.toLowerCase()) ||
        i.type.toLowerCase().includes(query.toLowerCase())
      )
    : allItems;

  return (
    <div className="sm-backdrop" onClick={onClose}>
      <div className="sm-modal" onClick={(e) => e.stopPropagation()}>

        <div className="sm-input-row">
          <i className="ti ti-search" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search orders, products, customers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd onClick={onClose}>ESC</kbd>
        </div>

        <div className="sm-results">
          {results.length === 0 ? (
            <p className="sm-empty">No results for "{query}"</p>
          ) : (
            results.map((item, i) => (
              <a href={item.link} key={i} className="sm-result-item" onClick={onClose}>
                <span className={`sm-result-icon smi-${item.color}`}>
                  <i className={`ti ${item.icon}`} />
                </span>
                <span className="sm-result-label">{item.label}</span>
                <span className={`sm-result-type smt-${item.color}`}>{item.type}</span>
              </a>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default SearchModal;