import React, { useState } from "react";
import RadioButton from "../RadioButton";
import ItemAccordeon from "../Accordeon/ItemAccordeon";
import ItemText from "../Accordeon/ItemText";

const TestQuiz = ({
  list,
  currentIndex,
  correctAnswer,
  setCorrectAnswer,
  additionalContent,
  handleTryAgain,
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleRadioButtonChange = (value) => {
    setSelectedValue(value);
  };

  const checkAnswer = () => {
    if (selectedValue === list.quizArray[currentIndex].correctAnswer) {
      setCorrectAnswer(true);
    } else {
      setCorrectAnswer(false);
    }
  };

  return (
    <>
    <ItemAccordeon
      titlu={
        correctAnswer === null
          ? `Cerințele sarcinii (${currentIndex + 1}/${list.quizArray.length}):`
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
        {list.quizArray[currentIndex].answers.map((answer, idx) => {
          return (
            <RadioButton
              key={idx}
              value={answer.text}
              checked={selectedValue === answer.text}
              onChange={
                correctAnswer === null ? handleRadioButtonChange : () => {}
              }
              correctAnswer={list.quizArray[currentIndex].correctAnswer}
            />
          );
        })}
      </ItemText>
      {correctAnswer === null && (
        <button onClick={checkAnswer} className="btn-test">
          Verifică răspunsul
        </button>
      )}
    </ItemAccordeon>
    {correctAnswer !== null && (
      
        <ItemAccordeon
          titlu={`Rezolvarea sarcinii (${currentIndex + 1}/${list.quizArray.length}):`}
          open={true}
        >
          <ItemText classNameChild="">
            {list.quizArray[currentIndex].answers.map((answer, idx) => (
              <RadioButton
                key={idx}
                value={answer.rezolvare}
                checked={answer.text === list.quizArray[currentIndex].correctAnswer}
                onChange={() => {}}
                correctAnswer={list.quizArray[currentIndex].correctAnswer}
              />
            ))}
          </ItemText>
          <button onClick={handleTryAgain} className="btn-test">
            Încearcă din nou!
          </button>
        </ItemAccordeon>
      
    )}
</>
  );
  
};

export default TestQuiz;