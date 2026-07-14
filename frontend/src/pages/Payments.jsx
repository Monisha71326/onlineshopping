function Payments() {
  const payments = [
    { id: "#1001", method: "UPI", status: "Success", amount: 5000 },
    { id: "#1002", method: "Card", status: "Pending", amount: 12000 },
    { id: "#1003", method: "Cash", status: "Success", amount: 2500 },
  ];

  const total = payments.reduce((sum, p) => sum + p.amount, 0);
  const successCount = payments.filter((p) => p.status === "Success").length;
  const pendingCount = payments.filter((p) => p.status === "Pending").length;

  const methodIcons = { UPI: "💸", Card: "💳", Cash: "💵" };
  const statusDot = { Success: "🟢", Pending: "🟡", Failed: "🔴" };

  return (
    <div className="payments-page">

      <div className="page-header">
        <div>
          <h1 className="page-title">Payments</h1>
          <p className="page-subtitle">Transaction overview</p>
        </div>
        <button className="add-btn">⬇ Download Report</button>
      </div>

      {/* Summary Cards */}
      <div className="pay-summary">
        <div className="pay-scard">
          <p className="pay-slabel">Total Revenue</p>
          <h2 className="pay-sval green">₹{total.toLocaleString()}</h2>
        </div>
        <div className="pay-scard">
          <p className="pay-slabel">Successful</p>
          <h2 className="pay-sval green">
            {successCount} <span className="pay-sval-sub">transactions</span>
          </h2>
        </div>
        <div className="pay-scard">
          <p className="pay-slabel">Pending</p>
          <h2 className="pay-sval yellow">
            {pendingCount} <span className="pay-sval-sub">transaction</span>
          </h2>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <table className="payment-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Method</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, index) => (
              <tr key={index}>
                <td className="pay-order-id">{p.id}</td>
                <td>
                  <span className={`pay-method ${p.method.toLowerCase()}`}>
                    {methodIcons[p.method]} {p.method}
                  </span>
                </td>
                <td>
                  <span className={`pay-badge ${p.status.toLowerCase()}`}>
                    <span className="pay-dot"></span>
                    {p.status}
                  </span>
                </td>
                <td className="pay-amount">₹{p.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Payments;