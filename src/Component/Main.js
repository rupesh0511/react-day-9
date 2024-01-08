import { useEffect, useState } from "react";
import Question from "./Question";

const Main = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const fetching = async (url) => {
    try {
      let result = await fetch(url);
      let data = await result.json();
      if (data.response_code === 0) {
        setQuestions(data.results);
      } else {
        setQuestions([]);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  useEffect(() => {
    fetching("https://opentdb.com/api.php?amount=10&type=multiple&cate");
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <div>
      {!quizCompleted ? (
        <div>
          <Question
            question={questions[currentQuestionIndex]}
            handleAnswer={handleAnswer}
          />
          <button onClick={handleNext}>Next</button>
        </div>
      ) : (
        <div>
          <h2>Quiz Completed!</h2>
          <p>
            Your Score: {score} / {questions.length}
          </p>
          <button onClick={() => window.location.reload()}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default Main;