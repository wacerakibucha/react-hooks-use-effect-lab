import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // useEffect for countdown timer
  useEffect(() => {
    // If there is time left, set a timeout to decrease it
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);

      // Cleanup function: clear timeout if effect re-runs
      return () => clearTimeout(timer);
    } else {
      // Time ran out: reset timer and notify parent
      setTimeRemaining(10);
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered]);

  // Called when user clicks an answer
  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // reset timer for next question
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      <div className="answers">
        {answers.map((answer, index) => {
          const isCorrect = index === correctIndex;
          return (
            <button key={answer} onClick={() => handleAnswer(isCorrect)}>
              {answer}
            </button>
          );
        })}
      </div>
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
