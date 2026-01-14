import { useEffect, useMemo, useState } from "react";
import profileImg from "./assets/profile.png";

export default function Exam({
  data,
  answers,
  marked,
  setAnswers,
  setMarked,
  onSubmit
}) {
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(data.duration * 60);

  const [visited, setVisited] = useState({});
  const [reviewMode, setReviewMode] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(
    window.innerWidth >= 1024
  );

  const candidate = {
    name: "Demo Candidate",
    rollNo: "HPGK-2026-001",
    photo: profileImg
  };

  /* ================= HANDLE RESIZE ================= */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setPaletteOpen(true);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (time <= 0) onSubmit();
    const t = setInterval(() => setTime(t => t - 1), 1000);
    return () => clearInterval(t);
  }, [time, onSubmit]);

  const q = data.questions[index];

  /* ================= MARK VISITED ================= */
  useEffect(() => {
    setVisited(prev => ({ ...prev, [q.id]: true }));
  }, [q.id]);

  /* ================= OPTION SHUFFLE ================= */
  const shuffledOptions = useMemo(() => {
    return q.options
      .map((text, originalIndex) => ({ text, originalIndex }))
      .sort(() => Math.random() - 0.5);
  }, [q.id]);

  /* ================= MARK FOR REVIEW ================= */
  const toggleReview = () => {
    setMarked(prev => ({ ...prev, [q.id]: !prev[q.id] }));
  };

  /* ================= REVIEW MODE INDEXES ================= */
  const markedIndexes = data.questions
    .map((ques, i) => (marked[ques.id] ? i : null))
    .filter(i => i !== null);

  /* ================= SUBMIT HANDLER ================= */
  const handleSubmit = () => {
    const markedCount = Object.values(marked).filter(Boolean).length;
    if (markedCount > 0) {
      const ok = window.confirm(
        `You have ${markedCount} question(s) marked for review.\nDo you still want to submit?`
      );
      if (!ok) return;
    }
    onSubmit();
  };

  const allVisited = Object.keys(visited).length === data.questions.length;

  return (
    <div className="app">
      {/* ================= PALETTE ================= */}
      {paletteOpen && window.innerWidth < 1024 && (
        <div
          className="palette-backdrop"
          onClick={() => setPaletteOpen(false)}
        />
      )}

      <aside
        className={`palette ${paletteOpen ? "open" : "collapsed"} ${
          window.innerWidth < 1024 ? "overlay" : ""
        }`}
      >
        {window.innerWidth < 1024 && (
          <button
            className="palette-close"
            onClick={() => setPaletteOpen(false)}
          >
            ✕
          </button>
        )}

        <h4>Question Palette</h4>
        <div className="palette-grid">
          {data.questions.map((ques, i) => (
            <button
              key={ques.id}
              onClick={() => {
                setIndex(i);
                if (window.innerWidth < 1024) setPaletteOpen(false);
              }}
              style={{
                background:
                  index === i
                    ? "var(--current)"
                    : marked[ques.id]
                    ? "var(--review)"
                    : answers[ques.id] !== undefined
                    ? "var(--answered)"
                    : "var(--unanswered)"
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </aside>

      {/* ================= MAIN EXAM ================= */}
      <main className="exam">
        <button
          className="palette-toggle"
          onClick={() => setPaletteOpen(!paletteOpen)}
        >
          {paletteOpen ? "Hide Palette" : "Show Palette"}
        </button>

        <div className="profile-bar">
          <div className="profile-left">
            <img
              src={candidate.photo}
              alt="Candidate"
              className="profile-avatar"
            />
            <div>
              <div className="profile-name">{candidate.name}</div>
              <div className="profile-meta">{candidate.rollNo}</div>
            </div>
          </div>
          <div className="profile-right">
            <strong>StatePrep CBT – Himachal Pradesh</strong>
          </div>
        </div>

        <div className="topbar">
          <strong>Exam in Progress</strong>
          <span>
            Time Left: {Math.floor(time / 60)}:
            {String(time % 60).padStart(2, "0")}
          </span>
        </div>

        <div className="card">
          <p><b>Section:</b> {q.section || "General"}</p>

          <h3>Q{index + 1}. {q.question}</h3>

          {shuffledOptions.map((opt, i) => (
            <label key={i} className="option">
              <input
                type="radio"
                checked={answers[q.id] === opt.originalIndex}
                onChange={() =>
                  setAnswers(prev => ({
                    ...prev,
                    [q.id]: opt.originalIndex
                  }))
                }
              />
              {opt.text}
            </label>
          ))}

          <div className="controls">
            <button className="review" onClick={toggleReview}>
              {marked[q.id] ? "Unmark Review" : "Mark for Review"}
            </button>

            <button onClick={() => setReviewMode(!reviewMode)}>
              {reviewMode ? "Exit Review Mode" : "View Marked Questions"}
            </button>

            <button
              disabled={
                reviewMode
                  ? markedIndexes.indexOf(index) <= 0
                  : index === 0
              }
              onClick={() => {
                if (!reviewMode) setIndex(index - 1);
                else setIndex(markedIndexes[markedIndexes.indexOf(index) - 1]);
              }}
            >
              Previous
            </button>

            <button
              disabled={
                reviewMode
                  ? markedIndexes.indexOf(index) === markedIndexes.length - 1
                  : index === data.questions.length - 1
              }
              onClick={() => {
                if (!reviewMode) setIndex(index + 1);
                else setIndex(markedIndexes[markedIndexes.indexOf(index) + 1]);
              }}
            >
              Next
            </button>

            <button
              className="primary"
              disabled={!allVisited}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>

          {!allVisited && (
            <p style={{ fontSize: 12, color: "#64748b", marginTop: 8 }}>
              Please visit all questions before submitting.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
