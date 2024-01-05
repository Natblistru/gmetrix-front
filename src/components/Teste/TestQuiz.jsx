import React, { useEffect, useState } from "react";
import axios from "axios";
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
  currentItemIndex
}) => {
  const {stateData, dispatchData} = React.useContext(ContextData)
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([])

  useEffect(()=>{
    setSelectedOptions([{ "option": "", 
        "score": 0,
        "explanation": "explanation",
        "test_item_complexity": listItems[currentItemIndex].test_item_complexity,
        "formative_test_id": listItems[currentItemIndex].formative_test_id,
        "test_item_id": listItems[currentItemIndex].test_item_id}])
  },[])

  // console.log(stateData.currentTests)
  // console.log(stateData.currentTests[stateData.currentIndexTest].order_number_options);

  // console.log(stateData.currentIndexTest);

  const listItems = stateData.currentTests[stateData.currentIndexTest].order_number_options;

  const correctAnswerText = listItems[currentItemIndex].test_item_options.find(item => item.correct === 1)?.option;

  // console.log(listItems[currentItemIndex]);

  const handleRadioButtonChange = (value) => {
    setSelectedValue(value);
    setSelectedOptions(selectedOptions.map((obj, index) => {
        return {
          ...obj,
          option: value,
          score: 0,
          explanation: "explanation",
          test_item_complexity: listItems[currentItemIndex].test_item_complexity,
          formative_test_id: listItems[currentItemIndex].formative_test_id,
          test_item_id: listItems[currentItemIndex].test_item_id  
        };
    }));
  };


  const checkAnswer = () => {
    const selectedOptionsCalculate = selectedOptions.map(item => {
      let score;
      if (item.option === correctAnswerText) {
        score = item.test_item_complexity;
      } else {
        score = 0;
      }
      return {
        ...item,
        score: score
      };
    });

    const selectedOptionsToDB = selectedOptionsCalculate.map(item => {
      const { test_item_complexity, ...rest } = item;
      return { ...rest, student_id: stateData.currentStudent, type: 'quiz' };
    });

    trimiteDateLaBackend([...selectedOptionsToDB]);

    if (selectedValue === correctAnswerText) {
      setCorrectAnswer(true);
    } else {
      setCorrectAnswer(false);
    }
  };

  const trimiteDateLaBackend = async (selectedOptionsToDB) => {
    try {
      for (const element of selectedOptionsToDB) {
        const response = await axios.post('http://localhost:8000/api/student-formative-test-options', element);

        if (response.status === 200) {
          console.log('Success:', response.data.message);
        } else {
          console.error('Error');
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.log('Validation Errors:', error.response.data.errors);
      } else {
        console.error('Error:', error);
      }
    }
  };


  return (
    <>
    <ItemAccordeon
      titlu={
        correctAnswer === null
          ? `Cerințele sarcinii (${currentItemIndex + 1}/${listItems.length}):`
          : `Rezultat (${currentItemIndex + 1}/${listItems.length}):`
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
        {listItems[currentItemIndex].test_item_options.map((answer, idx) => {
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
          titlu={`Rezolvarea sarcinii (${currentItemIndex + 1}/${listItems.length}):`}
          open={true}
        >
          <ItemText classNameChild="">
            {listItems[currentItemIndex].test_item_options.map((answer, idx) => (
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