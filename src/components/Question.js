import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(()=>{
    const timerID = setTimeout(()=> { 
      console.log("Delayed for 1 second.");
      setTimeRemaining(timeRemaining - 1);
    }, "1000");

    if (timeRemaining === 0){ // resets timeRemaining back to 10 seconds, so our next question will have a fresh timer;
      setTimeRemaining(timeRemaining + 10);
      onAnswered(false);
    }

    // returning a cleanup function
    return function cleanup() {				// WIll clean up after the unmounted component
      clearTimeout(timerID);
    };
  }, [timeRemaining]);
  

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
