import React, { useState } from "react";
import StartScreen from "./components/StartScreen";
import QuizScreen from "./components/QuizScreen";
import ResultScreen from "./components/ResultScreen";
import questions from "./data/questions";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [step, setStep] = useState("start");
  const [results, setResults] = useState([]);

  // Starts the test steping to the quiz screen
  const startTest = () => setStep("quiz");

  // Receiving the final results and stepping to the result screen
  const finishTest = (finalResults) => {
    setResults(finalResults);
    setStep("result");
  };

  return (
    <div className="container">
      {step === "start" && <StartScreen onStart={startTest} />}
      {step === "quiz" && <QuizScreen questions={questions} onFinish={finishTest} />}
      {step === "result" && <ResultScreen results={results} />}
    </div>
  );
};

export default App;
