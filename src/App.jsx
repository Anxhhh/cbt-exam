import { useEffect, useState } from "react";
import Start from "./Start";
import Exam from "./Exam";
import Result from "./Result";

export default function App() {
  const [data, setData] = useState(null);
  const [stage, setStage] = useState("start"); // start | exam | result
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({});

  useEffect(() => {
  fetch(import.meta.env.BASE_URL + "exam.json")
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to load exam.json");
      }
      return res.json();
    })
    .then(data => setExam(data))
    .catch(err => {
      console.error(err);
    });
}, []);


  if (!data) {
    return <div className="loading">Loading…</div>;
  }

  if (stage === "start") {
    return <Start onStart={() => setStage("exam")} />;
  }

  if (stage === "exam") {
    return (
      <Exam
        data={data}
        answers={answers}
        marked={marked}
        setAnswers={setAnswers}
        setMarked={setMarked}
        onSubmit={() => setStage("result")}
      />
    );
  }

  return (
    <Result
      data={data}
      answers={answers}
      onRetake={() => {
        setAnswers({});
        setMarked({});
        setStage("start");
      }}
      onQuit={() => window.close()}
    />
  );
}
