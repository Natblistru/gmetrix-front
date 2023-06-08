import React, { useState } from "react";
import CheckBox from "../CheckBox";

import ItemAccordeon from "../Accordeon/ItemAccordeon";
import ItemText from "../Accordeon/ItemText";
import Puzzle from "../Puzzle";

const TestCheck = ({
  list,
  currentIndex,
  correctAnswer,
  setCorrectAnswer,
  additionalContent,
  handleTryAgain,
}) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleCheckBoxChange = (value) => {
    const updatedValues = [...selectedValues];
    if (updatedValues.includes(value)) {
      const index = updatedValues.indexOf(value);
      updatedValues.splice(index, 1);
    } else {
      updatedValues.push(value);
    }
    setSelectedValues(updatedValues);
  };

  const checkAnswer = () => {
    const correctValues = list.quizArray[currentIndex].answers
      .filter((answer) => answer.correct)
      .map((answer) => answer.text);
    const selectedValuesString = selectedValues.sort().join(",");
    const correctValuesString = correctValues.sort().join(","); 
    setCorrectAnswer(selectedValuesString === correctValuesString);
  };
  const handleTryAgainClearCheck = () => {
    setSelectedValues([]); 
    handleTryAgain();
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
              : correctAnswer
              ? " correct"
              : " incorrect"
          }
        >
          <p>{list.quizArray[currentIndex].cerinte}</p>
          <Puzzle />
          {list.quizArray[currentIndex].answers.map((answer, idx) => {
            return (
              <CheckBox
                key={idx}
                value={answer.text}
                checked={selectedValues.includes(answer.text)}
                onChange={
                  correctAnswer === null ? handleCheckBoxChange : () => {}
                }
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
              <CheckBox
                key={idx}
                value={answer.rezolvare}
                checked={answer.correct}
                onChange={() => {}}
              />
            ))}
          </ItemText>
          <button onClick={handleTryAgainClearCheck} className="btn-test">
            Încearcă din nou!
          </button>
        </ItemAccordeon>
      )}
    </>
  );
};

export default TestCheck;
