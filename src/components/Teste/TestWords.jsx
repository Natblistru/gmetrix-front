import React, { useState, useEffect } from "react";
import SentenceBox from "../DragWords/SentenceBox";
import AnswerBox from "../DragWords/AnswerBox";
import { getSentence, getAnswers } from "../DragWords/TextConverter";
import ItemAccordeon from "../Accordeon/ItemAccordeon";
import ItemText from "../Accordeon/ItemText";

const TestWords = ({
  list,
  currentIndex,
  correctAnswer,
  setCorrectAnswer,
  additionalContent,
  handleTryAgain,
}) => {
  const [showResults, setShowResults] = useState(false);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [sentence, setSentence] = useState([]);

  const text = list.quizArray[currentIndex].answers[0].text;

  useEffect(() => {
    setShowResults(false);
    setAnswers(getAnswers(text));
    setSentence(getSentence(text));
  }, [text]);

  const onDrop = (ev, dropId) => {
    const text = ev.dataTransfer.getData("text/plain");
    const updatedSentence = sentence.map((w) => {
      if (w.id === dropId) {
        return { ...w, placed: true, displayed: text };
      }
      return w;
    });
    setSentence(updatedSentence);
  };

  const onStart = () => {
    setQuestion("");
    setAnswers(getAnswers(question));
    setSentence(getSentence(question));
  };

  const questionChange = (e) => {
    setQuestion(e.target.value);
  };

  const toggleResults = () => {
    setShowResults(!showResults);
  };

  const checkAnswer = () => {
    setShowResults(true);
    const correct = sentence
      .map((w) => (w.type === "answer" ? w.text === w.displayed : true))
      .every(Boolean);
    setCorrectAnswer(correct);
  };

  return (
    <>
      <ItemAccordeon
        titlu={
          correctAnswer === null
            ? `Cerințele sarcinii (${currentIndex + 1}/${
                list.quizArray.length
              }):`
            : `Rezultat (${currentIndex + 1}/${list.quizArray.length}):`
        }
        correctAnswer={correctAnswer}
        additionalContent={additionalContent}
        open={true}
      >
        <ItemText
          classNameChild={
            correctAnswer === null
              ? ""
              : correctAnswer === true
              ? " correct"
              : " incorrect"
          }
        >
          <div className="app-container">
            {/* <h2 className='header'>Word Game</h2>
              <QuestionBox onStart={onStart} questionChange={questionChange} /> */}
            <p>Completați spațiile libere cu cuvintele de mai jos:</p>
            <SentenceBox
              marked={showResults}
              onDrop={onDrop}
              sentence={sentence}
            />
            <AnswerBox answers={answers} />
            <div></div>
          </div>
        </ItemText>
        {correctAnswer === null && (
          <button onClick={checkAnswer} className="btn-test">
            Verifică răspunsul
          </button>
        )}
      </ItemAccordeon>
      {correctAnswer !== null && (
        <ItemAccordeon
          titlu={`Rezolvarea sarcinii (${currentIndex + 1}/${
            list.quizArray.length
          }):`}
          open={true}
        >
          <ItemText classNameChild="">
            {list.quizArray[currentIndex].answers[0].rezolvare}
            {/* {list.quizArray[currentIndex].answers.map((answer, idx) => (
              <RadioButton
                key={idx}
                value={answer.rezolvare}
                checked={
                  answer.text === list.quizArray[currentIndex].correctAnswer
                }
                onChange={() => {}}
                correctAnswer={list.quizArray[currentIndex].correctAnswer}
              />
            ))} */}
          </ItemText>
          <button onClick={handleTryAgain} className="btn-test">
            Încearcă din nou!
          </button>
        </ItemAccordeon>
      )}
    </>
  );
};

export default TestWords;
