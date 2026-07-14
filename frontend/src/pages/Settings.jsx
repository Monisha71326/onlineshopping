import { useState } from "react";

function Settings() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const settings = [
    {
      title: "Profile Settings",
      desc: "Update admin profile details, avatar, and display name.",
      icon: "👤",
      accent: { card: "rgba(167,139,250,0.15)", border: "rgba(167,139,250,0.25)", btn: "rgba(167,139,250,0.1)", btnBorder: "rgba(167,139,250,0.35)", color: "#a78bfa" },
    },
    {
      title: "Security",
      desc: "Change your password and enable two-factor authentication.",
      icon: "🔒",
      accent: { card: "rgba(96,165,250,0.15)", border: "rgba(96,165,250,0.25)", btn: "rgba(96,165,250,0.1)", btnBorder: "rgba(96,165,250,0.35)", color: "#60a5fa" },
    },
    {
      title: "Notifications",
      desc: "Configure your email & SMS notification preferences.",
      icon: "🔔",
      accent: { card: "rgba(52,211,153,0.15)", border: "rgba(52,211,153,0.25)", btn: "rgba(52,211,153,0.1)", btnBorder: "rgba(52,211,153,0.35)", color: "#34d399" },
    },
    {
      title: "Theme",
      desc: "Switch between light & dark mode and customise your theme.",
      icon: "🎨",
      accent: { card: "rgba(251,191,36,0.15)", border: "rgba(251,191,36,0.25)", btn: "rgba(251,191,36,0.1)", btnBorder: "rgba(251,191,36,0.35)", color: "#fbbf24" },
    },
  ];

  return (
    <div className="settings-page">

      {/* Header */}
      <div className="settings-header">
        <div>
          <div className="settings-title">Settings</div>
          <div className="settings-subtitle">Manage your account & preferences</div>
        </div>
        <button className="settings-save-btn" onClick={handleSave}>
          {saved ? "✅ Saved!" : "💾 Save Changes"}
        </button>
      </div>

      {/* Grid */}
      <div className="settings-grid">
        {settings.map((item, i) => (
          <div
            key={i}
            className="settings-card"
            style={{
              background: item.accent.card,
              borderColor: item.accent.border,
            }}
          >
            <div className="settings-card-icon">{item.icon}</div>
            <h3 className="settings-card-title">{item.title}</h3>
            <p className="settings-card-desc">{item.desc}</p>
            <button
              className="settings-open-btn"
              style={{
                background: item.accent.btn,
                borderColor: item.accent.btnBorder,
                color: item.accent.color,
              }}
            >
              Open →
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Settings;