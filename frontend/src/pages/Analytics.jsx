function Analytics() {
  const stats = [
    {
      title: "Revenue",
      value: "₹2,50,000",
      color: "green",
      icon: "💰",
      trend: "↑ 12.4% vs last month",
      bar: 78,
    },
    {
      title: "Visitors",
      value: "25,000",
      color: "blue",
      icon: "👥",
      trend: "↑ 8.1% vs last month",
      bar: 62,
    },
    {
      title: "Conversion Rate",
      value: "4.5%",
      color: "purple",
      icon: "📈",
      trend: "↑ 0.3% vs last month",
      bar: 45,
    },
    {
      title: "Bounce Rate",
      value: "38%",
      color: "red",
      icon: "📉",
      trend: "↓ 2.1% vs last month",
      bar: 38,
    },
  ];

  return (
    <div className="analytics-page">

      <div className="page-header">
        <div>
          <h1 className="page-title">Analytics</h1>
          <p className="page-subtitle">Last 30 days overview</p>
        </div>
        <button className="add-btn">⬇ Download Report</button>
      </div>

      <div className="analytics-grid">
        {stats.map((item, index) => (
          <div className={`analytics-card card-${item.color}`} key={index}>
            <div className={`stat-icon icon-${item.color}`}>{item.icon}</div>
            <p className="stat-label">{item.title}</p>
            <h2 className={`stat-value value-${item.color}`}>{item.value}</h2>
            <div className="bar-track">
              <div
                className={`bar-fill fill-${item.color}`}
                style={{ width: `${item.bar}%` }}
              ></div>
            </div>
            <p className="stat-trend">{item.trend}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Analytics;