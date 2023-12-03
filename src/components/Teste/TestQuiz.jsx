import React, { useState } from "react";
import ContextData from "../context/ContextData";
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
  const {stateData, dispatchData} = React.useContext(ContextData)
  const [selectedValue, setSelectedValue] = useState("");

  console.log(stateData.currentTests)
  console.log(stateData.currentTests[stateData.currentIndexTest].order_number_options);

  console.log(stateData.currentIndexTest);

  const listItems = stateData.currentTests[stateData.currentIndexTest].order_number_options;

  const correctAnswerText = listItems[currentIndex].test_item_options.find(item => item.correct === 1)?.option;


  const handleRadioButtonChange = (value) => {
    setSelectedValue(value);
  };

  const checkAnswer = () => {
      if (selectedValue === correctAnswerText) {
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
            : correctAnswer === true
            ? " correct"
            : " incorrect"
        }
      >
        {listItems[currentIndex].test_item_options.map((answer, idx) => {
          return (
            <RadioButton
              key={idx}
              value={answer.option}
              checked={selectedValue === answer.option}
              onChange={
                correctAnswer === null ? handleRadioButtonChange : () => {}
              }
              correctAnswer={correctAnswerText}              
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
              <RadioButton
                key={idx}
                value={answer.explanation}
                checked={answer.option === correctAnswerText}
                onChange={() => {}}
                correctAnswer={correctAnswerText}
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