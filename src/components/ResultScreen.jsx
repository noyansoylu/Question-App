import React from "react";

const ResultScreen = ({ results }) => {
  const totalQuestions = results.length;

  // Count correct, incorrect, and unanswered questions
  const correctCount = results.filter(
    (result) => result.selectedAnswer === result.correctAnswer
  ).length;

  const unansweredCount = results.filter(
    (result) => result.selectedAnswer === null
  ).length;

  const incorrectCount = totalQuestions - correctCount - unansweredCount;

  return (
    <div>
      <div className="result-screen">
        <h1>Test Completed!</h1>
        <p>Total Questions: {totalQuestions}</p>
        <p>Correct Answers: {correctCount}</p>
        <p>Incorrect Answers: {incorrectCount}</p>
        <p>Unanswered: {unansweredCount}</p>
      </div>
      <h2>Answer Comparison</h2>
      <table className="table table-bordered">
        <thead className="table-primary">
          <tr>
            <th>Question</th>
            <th>Your Answer</th>
            <th>Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.question}</td>
              <td
                className={
                  result.selectedAnswer === result.correctAnswer
                    ? "text-success"
                    : "text-danger"
                }
              >
                {result.selectedAnswer || "No Answer"}
              </td>
              <td className="text-primary">{result.correctAnswer}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="restart-button">
        <button className="button" onClick={() => window.location.reload()}>
          Restart Test
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
