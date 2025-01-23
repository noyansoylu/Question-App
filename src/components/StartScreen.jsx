import React from "react";

const StartScreen = ({ onStart }) => {
  return (
    <div className="start-screen">
      <h1>Welcome to the Quiz</h1>
      <br />
      <p>
        There are 10 questions in this test. Each question will be displayed for 30 seconds. The answer choices will appear after 4 seconds. Once an answer is selected, the next question will appear. Good luck!
      </p>
      <button className="button" onClick={onStart}>
        Start Test
      </button>
    </div>
  );
};

export default StartScreen;
