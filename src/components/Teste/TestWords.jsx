import React, { useState, useEffect } from "react";
import SentenceBox from "../DragWords/SentenceBox";
import AnswerBox from "../DragWords/AnswerBox";
import { getSentence, getAnswers } from "../DragWords/TextConverter";
import ItemAccordeon from "../Accordeon/ItemAccordeon";
import ItemText from "../Accordeon/ItemText";

function shuffleArray(pieces) {
  const shuffled = [...pieces];

  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = tmp;
  }

  return shuffled;
}

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
  const textAdd = list.quizArray[currentIndex].answers[0].textAdditional;
  useEffect(() => {
    setShowResults(false);
    setAnswers(shuffleArray(getAnswers(text).concat(textAdd)));
    setSentence(getSentence(text));
  }, [text]);
console.log(answers);
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
            <p>Completați spațiile libere cu cuvintele de mai jos:</p>
            <SentenceBox
              marked={showResults}
              onDrop={onDrop}
              sentence={sentence}
            />
            {correctAnswer === null && <AnswerBox answers={answers} />}
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
