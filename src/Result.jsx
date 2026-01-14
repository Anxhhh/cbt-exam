export default function Result({ exam, answers, onRetake }) {
  // HARD SAFETY CHECK
  if (!exam || !Array.isArray(exam.questions)) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Result not available</h2>
        <button onClick={onRetake}>Back</button>
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

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8fafc",
        padding: 24
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          background: "#ffffff",
          borderRadius: 12,
          padding: 32,
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          textAlign: "center"
        }}
      >
        <h1 style={{ marginBottom: 16 }}>Exam Result</h1>

        <p>Total Questions: <strong>{total}</strong></p>
        <p>Attempted: <strong>{attempted}</strong></p>
        <p>Correct: <strong>{correct}</strong></p>
        <p>Wrong: <strong>{wrong}</strong></p>

        <h2 style={{ marginTop: 16 }}>
          Score: {correct} / {total}
        </h2>

        <button
          onClick={onRetake}
          style={{
            marginTop: 24,
            padding: "12px 24px",
            fontSize: 16,
            borderRadius: 8,
            border: "none",
            background: "#1d4ed8",
            color: "#ffffff",
            cursor: "pointer",
            fontWeight: 600
          }}
        >
          Retake Exam
        </button>
      </div>
    </div>
  );
}
