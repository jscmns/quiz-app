import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuizData, Difficulty, QuestionState } from './API';
import { GlobalStyle, Wrapper} from './@.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

function App() {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);



  const startTrivia = async () => {
    try {
      setLoading(true);
      setGameOver(false);

      const newQuestions = await fetchQuizData(TOTAL_QUESTIONS, Difficulty.EASY);

      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setQuestionNumber(0);
      setLoading(false);

    } catch (e) {
      console.log(e);
    }
  }

  console.log(questions);

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[questionNumber].correct_answer === answer;

      if (correct) setScore(prev => prev + 1);

      const answerObject = {
        question: questions[questionNumber].question,
        answer,
        correct,
        correctAnswer: questions[questionNumber].correct_answer,
      }

      setUserAnswers(prev => [...prev, answerObject]);
    }
  }

  const nextQuestion = () => {
    const nextQuestion = questionNumber + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setQuestionNumber(nextQuestion);
    }
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>

        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>Start game!</button>
        ) : null}

        {!gameOver ? <p className="score">Score: {score}</p> : null}

        {loading ? <p>Loading question...</p> : null}

        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={questionNumber + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[questionNumber].question}
            answers={questions[questionNumber].answers}
            userAnswer={userAnswers ? userAnswers[questionNumber] : null}
            callback={checkAnswer}
          />
        )}

        {!gameOver &&
          !loading &&
          userAnswers.length === questionNumber + 1 &&
          questionNumber !== TOTAL_QUESTIONS - 1
          ? (<button className="next" onClick={nextQuestion}>Next question</button>)
          : null
        }


      </ Wrapper>
    </>
  );
}

export default App;
