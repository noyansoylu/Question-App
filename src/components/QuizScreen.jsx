import React, { useState, useEffect } from "react";

const QuizScreen = ({ questions, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [userAnswers, setUserAnswers] = useState([]);

  // Here we are setting up the timers for the options and the questions
  // Answer options are delayed by 4 seconds
  // 30 seconds are given to click answer and move to the next question
  // Works for each index of the questions array
  useEffect(() => {
    // Information!
    // Normally the option delay time is 4 seconds and the question's total time set to 30 seconds but for quick testing, I set them to 1 second and 10 seconds respectively.
    const optionsTimer = setTimeout(() => setShowOptions(true), 1000);
    const questionTimer = setTimeout(() => handleNextQuestion(null), 10000);
    const countdownTimer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(optionsTimer);
      clearTimeout(questionTimer);
      clearInterval(countdownTimer);
    };
  }, [currentQuestionIndex]);

  // This function is called when an answer is selected or the timer runs out. It updates the userAnswers state and moves to the next question
  const handleNextQuestion = (selectedAnswer) => {
    const updatedAnswers = [
      ...userAnswers,
      {
        question: questions[currentQuestionIndex].question,
        selectedAnswer: selectedAnswer,
        correctAnswer: questions[currentQuestionIndex].answer,
      },
    ];

    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowOptions(false);
      setTimeLeft(30);
    } else {
      onFinish(updatedAnswers);
    }
  };

  return (
    <div className="quiz-screen">
      <h2>
        Question {currentQuestionIndex + 1} of {questions.length}
      </h2>
      <img
        className="img-fluid"
        src={`/${questions[currentQuestionIndex].media}`}
        alt="Question"
      />
      <p>{questions[currentQuestionIndex].question}</p>

      {showOptions ? (
        <div className="options">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <button key={index} onClick={() => handleNextQuestion(option)}>
              {option}
            </button>
          ))}
        </div>
      ) : (
        <p className="waiting">Options will appear soon...</p>
      )}

      <p className="timer">Time Left: {timeLeft} seconds</p>
    </div>
  );
};

export default QuizScreen;
