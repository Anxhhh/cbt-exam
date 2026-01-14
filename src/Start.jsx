export default function Start({ onStart }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #1d4ed8 0%, #2563eb 40%, #3b82f6 100%)",
        padding: 20
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 720,
          background: "#ffffff",
          borderRadius: 16,
          padding: "40px 48px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)"
        }}
      >
        <h1 style={{ margin: 0, fontSize: 32, color: "#1e3a8a" }}>
          Himachal Pradesh GK Mock Test Paper Set-1
        </h1>

        <p style={{ color: "#475569", marginTop: 8 }}>
          HP GK – Computer Based Test
        </p>

        <hr style={{ margin: "24px 0" }} />

        <h3>Exam Instructions</h3>
        <ul style={{ lineHeight: 1.8, color: "#334155" }}>
          <li>Total Questions: <strong>100</strong></li>
          <li>Duration: <strong>90 minutes</strong></li>
          <li>Each question carries <strong>1 mark</strong></li>
          <li>No negative marking (as configured)</li>
          <li>Use the question palette for navigation</li>
          <li>Do not refresh or close the exam window</li>
        </ul>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 36
          }}
        >
          <span style={{ color: "#64748b", fontSize: 14 }}>
            Best of luck for your exam.
          </span>

          <button
            onClick={onStart}
            style={{
              background: "#1d4ed8",
              color: "#ffffff",
              padding: "12px 28px",
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
