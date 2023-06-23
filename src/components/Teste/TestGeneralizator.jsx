import React, { useState } from "react";
import temeIstoriArray from '../../data/temeIstoria';

import ItemAccordeon from "../Accordeon/ItemAccordeon";
import ItemText from "../Accordeon/ItemText";
import ItemList from "../Accordeon/ItemList";

// let list = temeIstoriArray[0].subtitles[0].subjects[0].teste[9];
let currentIndex = 0;
const TestGeneralizator = ({
  list,
  currentIndex,
  correctAnswer,
  setCorrectAnswer,
  additionalContent,
  handleTryAgain,
}) => {
  const [selectedValues, setSelectedValues] = useState([]);

  // const [correctAnswer, setCorrectAnswer] = useState(null);

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
      <ItemAccordeon titlu="Lista de sarcini" open={true}>
      <ItemList list={list.quizArray[currentIndex].listaSarcini} />
        {correctAnswer === null && (
          <button onClick={checkAnswer} className="btn-test">
            Incepe testul
          </button>
        )}
      </ItemAccordeon>
      {correctAnswer !== null && (
        <ItemAccordeon
          titlu={`Rezolvarea sarcinii (${currentIndex + 1}/${list.quizArray.length}):`}
          open={true}
        >
          <ItemText classNameChild="">
            {/* {list.quizArray[currentIndex].answers.map((answer, idx) => (
              <CheckBox
                key={idx}
                value={answer.rezolvare}
                checked={answer.correct}
                onChange={() => {}}
              />
            ))} */}
          </ItemText>
          <button onClick={handleTryAgainClearCheck} className="btn-test">
            Încearcă din nou!
          </button>
        </ItemAccordeon>
      )}
    </>
  );
};

export default TestGeneralizator;
