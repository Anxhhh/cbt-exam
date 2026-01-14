export default function Result({ data, answers, onRetake, onQuit }) {
  let correct = 0;
  let wrong = 0;

  data.questions.forEach(q => {
    if (answers[q.id] === undefined) return;
    answers[q.id] === q.correct ? correct++ : wrong++;
  });

  const total = data.questions.length;
  const attempted = correct + wrong;
  const unattempted = total - attempted;

  return (
    <div className="result-wrapper">
      <div className="card result-card">
        <h2 className="result-title">Result Summary</h2>

        {/* SCORE GRID */}
        <div className="result-grid">
          <div className="result-box">
            <span>Total</span>
            <strong>{total}</strong>
          </div>

          <div className="result-box success">
            <span>Correct</span>
            <strong>{correct}</strong>
          </div>

          <div className="result-box danger">
            <span>Wrong</span>
            <strong>{wrong}</strong>
          </div>

          <div className="result-box">
            <span>Unattempted</span>
            <strong>{unattempted}</strong>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="result-actions">
          <button className="primary" onClick={onRetake}>
            Retake Exam
          </button>
          <button onClick={onQuit}>
            Quit
          </button>
        </div>
      </div>
    </div>
  );
}
