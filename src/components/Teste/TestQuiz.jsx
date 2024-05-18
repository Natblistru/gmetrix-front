import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import { decodeDiacritics } from "../DragWords/TextConverter";
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
  currentItemIndex,
  responseReceived,
  setResponseReceived,
  setWrapperHeight
}) => {
  const quizWrapperRef = useRef(null);
  const currentTests = useSelector(state => state.currentTests);
  console.log(currentTests)

  const currentIndexTestObject = useSelector(state => state.currentIndexTest);
  console.log(currentIndexTestObject)
  const currentStudentObject = useSelector(state => state.currentStudent);
  const currentStudent = currentStudentObject ? currentStudentObject.currentStudent : 1;
  const language = useSelector(state => state.language);

  const [selectedValue, setSelectedValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([])

  let currentIndexTest;

  if (typeof currentIndexTestObject === 'object') {
      currentIndexTest = currentIndexTestObject.currentIndexTest;
  } else {
      currentIndexTest = currentIndexTestObject;
  }

  const [listItems, setListItems] = useState(currentTests[currentIndexTest].order_number_options)
  // console.log(currentTests[currentIndexTest])

  const jsonString = listItems[currentItemIndex]?.test_item_content;
  const decodedString = decodeDiacritics(jsonString);
  
  // Parsează JSON-ul pentru a obține obiectul
  const jsonObject = JSON.parse(decodedString);
  
  let task_en = jsonObject.en;
  let task_ro = jsonObject.ro;
  
  let test_task = language === "ro" ? jsonObject.ro : jsonObject.en;

  useEffect(() => {
    setListItems(currentTests[currentIndexTest].order_number_options);

    const jsonString = listItems[currentItemIndex]?.test_item_content;
    const decodedString = decodeDiacritics(jsonString);
  
    // Parsează JSON-ul pentru a obține obiectul
    const jsonObject = JSON.parse(decodedString);
  
    task_en = jsonObject.en;
    task_ro = jsonObject.ro;
    
    test_task = language === "ro" ? jsonObject.ro : jsonObject.en;
  }, [currentItemIndex]);


  useEffect(()=>{
    setSelectedOptions([{ "option": "", 
        "score": 0,
        "explanation": "explanation",
        "test_item_complexity": listItems[currentItemIndex].test_item_complexity,
        "formative_test_id": listItems[currentItemIndex].formative_test_id,
        "test_item_id": listItems[currentItemIndex].test_item_id}])
    const wrapperElement = quizWrapperRef.current;
    if (wrapperElement) {
      const rect = wrapperElement.getBoundingClientRect();
      // console.log('Înălțimea elementului:', rect.height);
      setWrapperHeight(rect.height);
    }
  },[])

  // console.log(currentTests)
  // console.log(currentTests[currentIndexTest].order_number_options);

  // console.log(currentIndexTest);


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
      return { ...rest, student_id: currentStudent, type: 'quiz' };
    });

    trimiteDateLaBackend([...selectedOptionsToDB]);

    if (selectedValue === correctAnswerText) {
      setCorrectAnswer(true);
    } else {
      setCorrectAnswer(false);
    }
    // console.log("ckeck")
    // const wrapperElement = quizWrapperRef.current;
    // if (wrapperElement) {
    //   const rect = wrapperElement.getBoundingClientRect();
    //   console.log('Înălțimea elementului:', rect.height);
    //   setWrapperHeight(rect.height);
    // }

  };

  const trimiteDateLaBackend = async (selectedOptionsToDB) => {
    try {
      for (const element of selectedOptionsToDB) {
        const response = await axios.post('http://localhost:8000/api/student-formative-test-options', element);

        if (response.status === 200) {
          // console.log('Success:', response.data.message);
          // console.log(responseReceived)
          setResponseReceived(true);
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
    <div ref={quizWrapperRef}>
    <ItemAccordeon
      titlu={
        correctAnswer === null
          ? `Cerințele sarcinii (${currentIndex + 1}/${list.length}):`
          : `Rezultat (${currentIndex + 1}/${list.length}):`
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
        {/* <p style={{paddingBottom: '20px'}}> */}
          {/* {listItems[currentItemIndex].test_item_task.includes('(')
            ? listItems[currentItemIndex].test_item_task.substring(0, listItems[currentItemIndex].test_item_task.indexOf('('))
            : listItems[currentItemIndex].test_item_task
          } */}
        {/* </p> */}

        <div dangerouslySetInnerHTML={{ __html: test_task }} />

        <img
              className="img-subject"
              src={`http://localhost:8000/${
                process.env.PUBLIC_URL + listItems[currentItemIndex]?.image_path
              }`}
              alt=""
              style={{
                width: isNaN(
                  parseInt(listItems[currentItemIndex]?.procent_paper, 10)
                )
                  ? "40%"
                  : `${
                      100 - parseInt(listItems[currentItemIndex]?.procent_paper, 10)
                    }%`,
              }}
            />

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
          titlu={`Rezolvarea sarcinii (${currentIndex + 1}/${list.length}):`}
          open={true}
        >
          <ItemText classNameChild="">
            {listItems[currentItemIndex].test_item_options.map((answer, idx) => (
              <RadioButton
                key={idx}
                value={language === "ro" ? answer.explanation_ro : answer.explanation}
                checked={answer.option === correctAnswerText}
                onChange={() => {}}
                correctAnswer={correctAnswerText}
              />
            ))}
          </ItemText>
          {/* <button onClick={handleTryAgain} className="btn-test">
            Încearcă din nou!
          </button> */}
        </ItemAccordeon>
      
    )}
  </div>
  );
  
};

export default TestQuiz;