export default function Result({ exam, answers, onRetake }) {
  // HARD SAFETY GUARD (DO NOT REMOVE)
  if (!exam || !Array.isArray(exam.questions)) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        Loading result...
      </div>
    );
  }

  const total = exam.questions.length;

  let attempted = 0;
  let correct = 0;

  exam.questions.forEach(q => {
    if (answers && answers[q.id] !== undefined) {
      attempted++;
      if (answers[q.id] === q.answer) {
        correct++;
      }
    }
  });

  const wrong = attempted - correct;
  const unattempted = total - attempted;
  const scorePercent = Math.round((correct / total) * 100);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 24
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          background: "#ffffff",
          borderRadius: 16,
          padding: "36px 40px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)"
        }}
      >
        {/* HEADER */}
        <h1 style={{ marginTop: 0, color: "#1e3a8a" }}>
          Exam Result
        </h1>
        <p style={{ color: "#475569", marginTop: 4 }}>
          StatePrep CBT – Himachal Pradesh
        </p>

        <hr style={{ margin: "24px 0" }} />

        {/* SCORE */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 24
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "#1d4ed8"
            }}
          >
            {correct} / {total}
          </div>
          <div style={{ color: "#475569", marginTop: 4 }}>
            Score ({scorePercent}%)
          </div>
        </div>

        {/* STATS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16
          }}
        >
          <Stat label="Attempted" value={attempted} />
          <Stat label="Correct" value={correct} />
          <Stat label="Wrong" value={wrong} />
          <Stat label="Unattempted" value={unattempted} />
        </div>

        {/* ACTIONS */}
        <div
          style={{
            marginTop: 32,
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <button
            onClick={onRetake}
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
            Retake Exam
          </button>
        </div>
      </div>
    </div>
  );
}

/* SMALL STAT CARD COMPONENT */
function Stat({ label, value }) {
  return (
    <div
      style={{
        background: "#f8fafc",
        borderRadius: 12,
        padding: 16,
        textAlign: "center"
      }}
    >
      <div
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: "#0f172a"
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 14,
          color: "#64748b",
          marginTop: 4
        }}
      >
        {label}
      </div>
    </div>
  );
}
