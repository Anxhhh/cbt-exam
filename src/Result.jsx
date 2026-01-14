export default function Result({ exam, answers, onRetake }) {
  // ABSOLUTE SAFETY GUARD
  if (!exam || !exam.questions || !Array.isArray(exam.questions)) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Result unavailable</h2>
        <button onClick={onRetake}>Back</button>
      </div>
    );
  }

  const total = exam.questions.length;

  let attempted = 0;
  let correct = 0;

  for (const q of exam.questions) {
    if (answers && answers[q.id] !== undefined) {
      attempted++;
      if (answers[q.id] === q.answer) {
        correct++;
      }
    }
  }

  const wrong = attempted - correct;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 24
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: 32,
          borderRadius: 12,
          width: "100%",
          maxWidth: 420,
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          textAlign: "center"
        }}
      >
        <h1>Exam Result</h1>

        <p>Total Questions: <b>{total}</b></p>
        <p>Attempted: <b>{attempted}</b></p>
        <p>Correct: <b>{correct}</b></p>
        <p>Wrong: <b>{wrong}</b></p>

        <h2 style={{ marginTop: 16 }}>
          Score: {correct} / {total}
        </h2>

        <button
          onClick={onRetake}
          style={{
            marginTop: 24,
            padding: "12px 24px",
            borderRadius: 8,
            border: "none",
            background: "#1d4ed8",
            color: "#ffffff",
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          Retake Exam
        </button>
      </div>
    </div>
  );
}
