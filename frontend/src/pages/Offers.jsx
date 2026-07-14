function Offers() {
  const offers = [
    {
      title: "Diwali Sale",
      desc: "Up to 50% OFF on electronics",
      tag: "Hot Deal",
      tagIcon: "🔥",
      emoji: "🪔",
      color: "orange",
    },
    {
      title: "New Year Offer",
      desc: "Buy 1 Get 1 Free on fashion",
      tag: "Limited",
      tagIcon: "⏳",
      emoji: "🎉",
      color: "green",
    },
    {
      title: "Clearance Sale",
      desc: "Flat 70% OFF selected items",
      tag: "Mega",
      tagIcon: "⚡",
      emoji: "🔥",
      color: "red",
    },
  ];

  return (
    <div className="offers-page">

      <div className="offers-header">
        <div>
          <div className="offers-title">Offers</div>
          <div className="offers-subtitle">3 active promotions running</div>
        </div>
        <button className="offers-add-btn">+ Create Offer</button>
      </div>

      <div className="offers-grid">
        {offers.map((offer, index) => (
          <div className={`offer-card oc-${offer.color}`} key={index}>
            <div className="oc-glow"></div>
            <span className="oc-tag">
              {offer.tagIcon} {offer.tag}
            </span>
            <span className="oc-emoji">{offer.emoji}</span>
            <h3>{offer.title}</h3>
            <p>{offer.desc}</p>
            <button className="oc-view-btn">👁 View Details</button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Offers;