import React, { useState } from "react";
import ContextData from "../context/ContextData";
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
  const {stateData, dispatchData} = React.useContext(ContextData)
  const [selectedValues, setSelectedValues] = useState([]);

  // console.log(stateData.currentTests)
  // console.log(stateData.currentTests[stateData.currentIndexTest].order_number_options);

  // console.log(stateData.currentIndexTest);

  const listItems = stateData.currentTests[stateData.currentIndexTest].order_number_options;


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

    const correctValues = listItems[currentIndex].test_item_options
      .filter((answer) => answer.correct==1)
      .map((answer) => answer.option);
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
            ? `Cerințele sarcinii (${currentIndex + 1}/${listItems.length}):`
            : `Rezultat (${currentIndex + 1}/${listItems.length}):`
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
          <p>{listItems[currentIndex].test_item_task}</p>
          <Puzzle />
          {listItems[currentIndex].test_item_options.map((answer, idx) => {
            return (
              <CheckBox
                key={idx}
                value={answer.option}
                checked={selectedValues.includes(answer.option)}
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
          titlu={`Rezolvarea sarcinii (${currentIndex + 1}/${listItems.length}):`}
          open={true}
        >
          <ItemText classNameChild="">
            {listItems[currentIndex].test_item_options.map((answer, idx) => (
              <CheckBox
                key={idx}
                value={answer.explanation}
                checked={answer.correct==1}
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
