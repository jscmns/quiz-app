import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuizData, Difficulty } from './API';

const TOTAL_QUESTIONS = 10;

function App() {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(fetchQuizData(TOTAL_QUESTIONS, Difficulty.EASY));
  

  const startTrivia = async () => {

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () => {

  }

  return (
    <div className="App">
      <h1>REACT QUIZ</h1>
      <button className="start" onClick={startTrivia}>Start game!</button>
      <p className="score">Score:</p>
      <p>Loading question...</p>
      {/* <QuestionCard
        questionNumber={questionNumber + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[questionNumber].question}
        answers={questions[questionNumber].answers}
        userAnswer={userAnswers ? userAnswers[questionNumber] : null}
        callback={checkAnswer}
      /> */}
      <button className="next" onClick={nextQuestion}>Next question</button>
    </div>
  );
}

export default App;
