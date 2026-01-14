export default function Start({ onStart }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)",
        padding: 16
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 760,
          background: "#ffffff",
          borderRadius: 16,
          padding: "40px 48px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)"
        }}
      >
        <h1 style={{ margin: 0, fontSize: 32, color: "#1e3a8a" }}>
          StatePrep CBT – Himachal Pradesh
        </h1>

        <p style={{ color: "#475569", marginTop: 8 }}>
          HP GK Computer Based Test (Mock)
        </p>

        <hr style={{ margin: "24px 0" }} />

        <h3>Exam Instructions</h3>
        <ul style={{ lineHeight: 1.9, color: "#334155", paddingLeft: 18 }}>
          <li>Total Questions: <strong>120</strong></li>
          <li>Duration: <strong>90 minutes</strong></li>
          <li>Each question carries <strong>1 mark</strong></li>
          <li>No negative marking</li>
          <li>Questions are randomly shuffled</li>
          <li>Do not refresh or close the window</li>
        </ul>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 36,
            flexWrap: "wrap",
            gap: 12
          }}
        >
          <span style={{ color: "#64748b", fontSize: 14 }}>
            Best of luck for your examination.
          </span>

          <button
            onClick={onStart}
            style={{
              background: "#1d4ed8",
              color: "#ffffff",
              padding: "12px 32px",
              fontSize: 16,
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            Start Examination
          </button>
        </div>
      </div>
    </div>
  );
}
