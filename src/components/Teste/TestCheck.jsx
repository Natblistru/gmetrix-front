import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateStudentProcent } from "../ReduxComp/actions";
import { decodeDiacritics } from "../DragWords/TextConverter";

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
  clearAll,
  setClearAll,
  currentItemIndex,
  setResponseReceived
}) => {
  const currentTests = useSelector(state => state.currentTests);
  const currentIndexTestObject = useSelector(state => state.currentIndexTest);
  const currentStudentObject = useSelector(state => state.currentStudent);
  const currentStudent = currentStudentObject ? currentStudentObject.currentStudent : 1;
  const language = useSelector(state => state.language);
  const dispatch = useDispatch();
  const allTeacherTests = useSelector((state) => state.allTeacherTests);


  const [selectedValues, setSelectedValues] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState([])
  // console.log(currentItemIndex)

  let currentIndexTest;

  if (typeof currentIndexTestObject === 'object') {
      currentIndexTest = currentIndexTestObject.currentIndexTest;
  } else {
      currentIndexTest = currentIndexTestObject;
  }

  const [listItems, setListItems] = useState(currentTests[currentIndexTest].order_number_options)

  const jsonString = listItems[currentItemIndex]?.test_item_content;
  const decodedString = decodeDiacritics(jsonString);
  
  // Parsează JSON-ul pentru a obține obiectul
  const jsonObject = JSON.parse(decodedString);
  
  let task_en = jsonObject.en;
  let task_ro = jsonObject.ro;
  
  let test_task = language === "ro" ? jsonObject.ro : jsonObject.en;


  useEffect(()=>{
    setListItems(currentTests[currentIndexTest].order_number_options);
    const initialSelectedOptions = [];

    listItems[currentItemIndex].test_item_options.forEach(element => {
      initialSelectedOptions.push({ "option": element.option, 
                                     "score": 0,
                                     "correct": element.correct,
                                     "selected": false,
                                     "explanation": element.explanation,
                                     "test_item_complexity": listItems[currentItemIndex].test_item_complexity,
                                     "formative_test_id": listItems[currentItemIndex].formative_test_id,
                                     "test_item_id": listItems[currentItemIndex].test_item_id});
    });
    setSelectedOptions(initialSelectedOptions)

    const jsonString = listItems[currentItemIndex]?.test_item_content;
    const decodedString = decodeDiacritics(jsonString);
  
    // Parsează JSON-ul pentru a obține obiectul
    const jsonObject = JSON.parse(decodedString);
  
    task_en = jsonObject.en;
    task_ro = jsonObject.ro;
    
    test_task = language === "ro" ? jsonObject.ro : jsonObject.en;

  },[currentItemIndex])
  
  useEffect(()=>{
    test_task = language === "ro" ? task_ro : task_en;
  },[language])

  // console.log(currentTests)
  // console.log(currentTests[currentIndexTest].order_number_options);

  // console.log(currentIndexTest);

  const handleCheckBoxChange = (value) => {
    console.log(value)
    const updatedValues = [...selectedValues];
    if (updatedValues.includes(value)) {
      const index = updatedValues.indexOf(value);
      updatedValues.splice(index, 1);
    } else {
      updatedValues.push(value);
    }
    setSelectedValues(updatedValues);

    setSelectedOptions((prevOptions) =>
    prevOptions.map((option) => {
      if (option.option === value) {
        return {
          ...option,
          selected: !option.selected,
          test_item_complexity: listItems[currentItemIndex].test_item_complexity,
          formative_test_id: listItems[currentItemIndex].formative_test_id,
          test_item_id: listItems[currentItemIndex].test_item_id,
        };
      }
      return {
          ...option,
          test_item_complexity: listItems[currentItemIndex].test_item_complexity,
          formative_test_id: listItems[currentItemIndex].formative_test_id,
          test_item_id: listItems[currentItemIndex].test_item_id,
        };
    })
   );
  };

  const checkAnswer = () => {
    console.log(selectedOptions)
    const correctValues = listItems[currentItemIndex].test_item_options
      .filter((answer) => answer.correct==1)
      .map((answer) => answer.option);
    const selectedValuesString = selectedValues.sort().join(",");
    const correctValuesString = correctValues.sort().join(","); 
    setCorrectAnswer(selectedValuesString === correctValuesString);
    const index = allTeacherTests.findIndex(
      (item) => item.test_item_id === listItems[currentItemIndex].test_item_id
    );
    
    if (index !== -1) {
      const newProcent = selectedValuesString === correctValuesString ? "100.000000" : "0.000000";
      dispatch(updateStudentProcent(index, newProcent));
    }

    const selectedOptionsCalculate = selectedOptions.map(item => {
      let score;
      if (item.correct == item.selected) {
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
      const { test_item_complexity, selected, correct, ...rest } = item;
      return { ...rest, student_id: currentStudent, type: 'check' };
    });

    console.log(selectedOptionsToDB)
    for (const element of selectedOptionsToDB) {
      trimiteDateLaBackend(element);
    }
    // console.log(selectedOptionsToDB)
    const groupedArray = selectedOptionsToDB.reduce((accumulator, currentObject) => {
      const key = `${currentObject.student_id}_${currentObject.test_item_id}_${currentObject.type}_${currentObject.formative_test_id}`;
      
      if (!accumulator[key]) {
        accumulator[key] = {
          student_id: currentObject.student_id,
          test_item_id: currentObject.test_item_id,
          type: currentObject.type,
          formative_test_id: currentObject.formative_test_id
        };
      }
    
      return accumulator;
    }, {});
    
    const selectedResultsToDB = Object.values(groupedArray);
  
    for (const element of selectedResultsToDB) {
      trimiteResultsLaBackend(element);
    }
  };

  const trimiteDateLaBackend = (element) => {
    if (currentTests[0].path == "/test-de-totalizare") {
      const token = localStorage.getItem('auth_token');
      try {
        const response = axios.post('/api/student-summative-test-options', element
//        const response = await axios.post('/api/student-summative-test-options', element
          // ,
          // {
          //   headers: {
          //     "Content-Type": "application/json",       
          //     "Authorization": token ? `Bearer ${token}` : '' 
          //   },
          // }
        );

        if (response.status === 200) {
          console.log('Success:', response.data.message);
        } else {
          console.error('Error');
        }
      } catch (error) {
        if (error.response && error.response.status === 422) {
          console.log('Validation Errors:', error.response.data.errors);
        } else {
          console.error('Error:', error);
        }
      }
    } else {
      try {
//          const response = await axios.post('/api/student-formative-test-options', element);
          const response = axios.post('/api/student-formative-test-options', element);

          if (response.status === 200) {
            console.log('Success:', response.data.message);
          } else {
            console.error('Error');
          }
      } catch (error) {
        if (error.response && error.response.status === 422) {
          console.log('Validation Errors:', error.response.data.errors);
        } else {
          console.error('Error:', error);
        }
      }
    }
  };

  const trimiteResultsLaBackend = (element) => {
    if (currentTests[0].path == "/test-de-totalizare") {
      try {
//        const response = await axios.post('/api/student-summative-test-results', element);
        const response = axios.post('/api/student-summative-test-results', element);

        if (response.status === 200) {
          console.log('Success:', response.data.message);
          setResponseReceived(true);
        } else {
          console.error('Error');
        }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.log('Validation Errors:', error.response.data.errors);
      } else {
        console.error('Error:', error);
      }
    }
    } else {
      try {
//        const response = await axios.post('/api/student-formative-test-results', element);
        const response = axios.post('/api/student-formative-test-results', element);

        if (response.status === 200) {
          console.log('Success:', response.data.message);
          setResponseReceived(true);
        } else {
          console.error('Error');
        }
      } catch (error) {
        if (error.response && error.response.status === 422) {
          console.log('Validation Errors:', error.response.data.errors);
        } else {
          console.error('Error:', error);
        }
      }
    }

  };

  const handleTryAgainClearCheck = () => {
    setSelectedValues([]); 
    handleTryAgain();
  };

  useEffect(()=>{
    if(clearAll) {
      setSelectedValues([]);
    }
    setClearAll(false);
  },[clearAll])

  return (
    <>
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
              : correctAnswer
              ? " correct"
              : " incorrect"
          }
        >
        {/* <p style={{paddingBottom: '20px'}}>
          {listItems[currentItemIndex].test_item_task.includes('(')
            ? listItems[currentItemIndex].test_item_task.substring(0, listItems[currentItemIndex].test_item_task.indexOf('('))
            : listItems[currentItemIndex].test_item_task
          }
        </p> */}
          {/* <Puzzle /> */}

          <div dangerouslySetInnerHTML={{ __html: test_task }} />

          <img
            className="img-subject"
            src={
              listItems[currentItemIndex]?.image_path === null 
                ? "" 
                : `${process.env.REACT_APP_API_BASE_URL}/${listItems[currentItemIndex]?.image_path}`
            }
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
              <CheckBox
                key={idx}
                value={language === "ro" ? answer.option_ro : answer.option }
                checked={selectedValues.includes(answer.option)}
                onChange={
                  correctAnswer === null && language === "en" ? handleCheckBoxChange : () => {}
                }
                text_additional={answer.text_additional}
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
              <CheckBox
                key={idx}
                value={language === "ro" ? answer.explanation_ro : answer.explanation }
                checked={answer.correct==1}
                onChange={() => {}}
              />
            ))}
          </ItemText>
          {/* <button onClick={handleTryAgainClearCheck} className="btn-test">
            Încearcă din nou!
          </button> */}
        </ItemAccordeon>
      )}
    </>
  );
};

export default TestCheck;
