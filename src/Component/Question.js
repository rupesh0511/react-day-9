import React, { useState } from "react";

const Question = ({ question, handleAnswer }) => {
  const [answered, setAnswered] = useState(false);

  if (!question) {
    return (
      <div className="loadingpage">
        Loading... <p>press next for retry ☹</p>
      </div>
    ); 
  }

  const {
    question: questionText,
    correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers,
  } = question;

  const handleOptionClick = (selectedAnswer) => {
    setAnswered(true);
    handleAnswer(selectedAnswer === correctAnswer);
  };

  console.log(question);

  return (
    <div>
      <h3>{questionText}</h3>
      <button value={answered} onClick={() => handleOptionClick(correctAnswer)}>
        {correctAnswer}
      </button>
      <ul>
        {incorrectAnswers.map((answer, index) => (
          <li key={index}>
            <button
              value={answered}
              onClick={() => handleOptionClick(answer)}
              key={index}
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;