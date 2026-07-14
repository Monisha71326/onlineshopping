const stats = [
  { label: "Total Revenue",    value: "₹4,82,910", change: "+12.5% this month",   up: true,  icon: "ti-currency-rupee", color: "blue"   },
  { label: "Total Orders",     value: "3,284",     change: "+8.2% vs last month", up: true,  icon: "ti-shopping-bag",   color: "green"  },
  { label: "Active Customers", value: "1,847",     change: "-2.1% this week",     up: false, icon: "ti-users",          color: "amber"  },
  { label: "Products Listed",  value: "124",       change: "+6 new today",        up: true,  icon: "ti-package",        color: "purple" },
];

const orders = [
  { id: "#ORD-8821", customer: "Priya Nair",   product: "Nike Air Max",    amount: "₹8,499",  status: "Delivered"  },
  { id: "#ORD-8820", customer: "Ravi Shankar", product: "Apple Watch",     amount: "₹42,000", status: "Processing" },
  { id: "#ORD-8819", customer: "Anitha M",     product: 'Samsung TV 55"',  amount: "₹65,990", status: "Pending"    },
  { id: "#ORD-8818", customer: "Karthik S",    product: "Boat Headphones", amount: "₹2,199",  status: "Delivered"  },
  { id: "#ORD-8817", customer: "Meena Devi",   product: "Kurta Set",       amount: "₹1,299",  status: "Cancelled"  },
];

const activity = [
  { icon: "ti-shopping-bag", color: "blue",   text: "New order from Priya Nair — ₹8,499", time: "2 mins ago"  },
  { icon: "ti-user-plus",    color: "green",  text: "New customer Deepak R registered",    time: "18 mins ago" },
  { icon: "ti-alert-circle", color: "red",    text: "Low stock — Nike Air Max (3 left)",   time: "1 hr ago"    },
  { icon: "ti-credit-card",  color: "purple", text: "Payment received ₹65,990 via UPI",    time: "2 hrs ago"   },
];

const weekDays  = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const salesData = [62, 78, 55, 90, 83, 97, 71];

const statusPill = {
  Delivered:  "p-delivered",
  Processing: "p-processing",
  Pending:    "p-pending",
  Cancelled:  "p-cancelled",
};
const statusIcon = {
  Delivered:  "ti-check",
  Processing: "ti-loader",
  Pending:    "ti-clock",
  Cancelled:  "ti-x",
};

function MiniChart() {
  const max = Math.max(...salesData);
  return (
    <div className="db-chart-wrap">
      <div className="db-chart-bars">
        {salesData.map((v, i) => (
          <div key={i} className="db-bar-col">
            <div
              className={`db-cbar${i === 5 ? " db-cbar-today" : ""}`}
              style={{ height: `${Math.round((v / max) * 100)}%` }}
              title={`₹${v}k`}
            />
          </div>
        ))}
      </div>
      <div className="db-chart-labels">
        {weekDays.map((d, i) => <span key={i}>{d}</span>)}
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="dashboard">

      {/* Stats */}
      <div className="db-stats-grid">
        {stats.map((s, i) => (
          <div key={i} className={`db-stat-card ds-${s.color}`}>
            <div className={`db-stat-icon ic-${s.color}`}>
              <i className={`ti ${s.icon}`} />
            </div>
            <div className="db-stat-label">{s.label}</div>
            <div className="db-stat-value">{s.value}</div>
            <div className={`db-stat-change ${s.up ? "chg-up" : "chg-dn"}`}>
              <i className={`ti ${s.up ? "ti-trending-up" : "ti-trending-down"}`} />
              {s.change}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom grid */}
      <div className="db-bottom-grid">

        {/* Orders table */}
        <div className="db-card">
          <div className="db-card-hdr">
            <i className="ti ti-receipt-2" />
            <span className="db-card-title">Recent Orders</span>
            <button className="db-hdr-btn">View all</button>
          </div>
          <table className="db-otable">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={i}>
                  <td className="db-oid">{o.id}</td>
                  <td>{o.customer}</td>
                  <td>{o.product}</td>
                  <td>{o.amount}</td>
                  <td>
                    <span className={`db-pill ${statusPill[o.status]}`}>
                      <i className={`ti ${statusIcon[o.status]}`} />
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right col */}
        <div className="db-right-col">

          <div className="db-card">
            <div className="db-card-hdr">
              <i className="ti ti-chart-bar" />
              <span className="db-card-title">Weekly Sales</span>
              <span className="db-muted-label">This week</span>
            </div>
            <MiniChart />
          </div>

          <div className="db-card">
            <div className="db-card-hdr">
              <i className="ti ti-activity" />
              <span className="db-card-title">Recent Activity</span>
            </div>
            <div className="db-act-list">
              {activity.map((a, i) => (
                <div key={i} className="db-act-item">
                  <div className={`db-act-ico ai-${a.color}`}>
                    <i className={`ti ${a.icon}`} />
                  </div>
                  <div>
                    <div className="db-act-txt">{a.text}</div>
                    <div className="db-act-time">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;