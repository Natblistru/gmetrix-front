import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import ContextData from "../context/ContextData";
import SentenceBox from "../DragWords/SentenceBox";
import AnswerBox from "../DragWords/AnswerBox";
import { getSentence, getAnswers } from "../DragWords/TextConverter";
import ItemAccordeon from "../Accordeon/ItemAccordeon";
import ItemText from "../Accordeon/ItemText";

export function shuffleArray(pieces) {
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
  currentItemIndex,
  setResponseReceived
}) => {
  const {stateData, dispatchData} = React.useContext(ContextData)
  const currentTests = useSelector(state => state.currentTests);
  const currentIndexTest = useSelector(state => state.currentIndexTest);
  const [showResults, setShowResults] = useState(false);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [sentence, setSentence] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState([])

  const [listItems, setListItems] = useState(currentTests[currentIndexTest].order_number_options)


  // console.log(currentTests)
  // console.log(currentTests[currentIndexTest].order_number_options);


  useEffect(()=>{
    setListItems(currentTests[currentIndexTest].order_number_options);

    const initialSelectedOptions = [];
    listItems[currentItemIndex].test_item_options.forEach(element => {
      initialSelectedOptions.push({ "option": element.option, 
                                     "score": 0,
                                     "correct": element.correct - 1,
                                     "user_column": -1,
                                     "explanation": element.explanation,
                                     "test_item_complexity": listItems[currentItemIndex].test_item_complexity,
                                     "formative_test_id": listItems[currentItemIndex].formative_test_id,
                                     "test_item_id": listItems[currentItemIndex].test_item_id});
    });
    setSelectedOptions(initialSelectedOptions)

  },[currentItemIndex])

  // console.log(currentIndexTest);

  // const listItems = currentTests[currentIndexTest].order_number_options;

  let text = JSON.parse(listItems[currentIndex].test_item_options[0].text_additional).trim();

  // Elimină ghilimelele de la început și sfârșit
  text = text.slice(1, -1);

   const filteredElements = listItems[currentIndex].test_item_options.filter(function(element) {
    return element.correct == 0;
  });
  
  const textAdd = filteredElements.map(function(element) {
    return element.option;
  });


  useEffect(() => {
    setShowResults(false);
    setAnswers(shuffleArray(getAnswers(text).concat(textAdd)));
    setSentence(getSentence(text));
  }, [text]);

  useEffect(() => {
    setShowResults(false);
  }, []);

  const onDrop = (ev, dropId) => {
    const text = ev.dataTransfer.getData("text/plain");

    setSelectedOptions(prevOptions => {
      const updatedOptions = prevOptions.map(option => {
          return option.option === text ? { ...option, user_column: Math.floor(dropId/2) } : option;
      });
      return updatedOptions;
    });

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

    const selectedOptionsCalculate = selectedOptions.map(item => {
      let score;
      if (item.correct == item.user_column) {
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
      const { test_item_complexity, user_column, correct, explanation, ...rest } = item;
      return { ...rest, student_id: stateData.currentStudent, type: 'check' };
    });
    for (const element of selectedOptionsToDB) {
      trimiteDateLaBackend(element);
    }

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

    const correct = sentence
      .map((w) => (w.type === "answer" ? w.text === w.displayed : true))
      .every(Boolean);
    setCorrectAnswer(correct);
  };

  const trimiteDateLaBackend = async (element) => {
    try {
        // console.log(element)
        const response = await axios.post('http://localhost:8000/api/student-formative-test-options', element);

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
  };

  const trimiteResultsLaBackend = async (element) => {
    try {
        // console.log(element)
        const response = await axios.post('http://localhost:8000/api/student-formative-test-results', element);

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
  };

  const handleClick = () => {
    setShowResults(false);
    setAnswers(shuffleArray(getAnswers(text).concat(textAdd)));
    setSentence(getSentence(text));    
    handleTryAgain();
  };

  return (
    <>
      <ItemAccordeon
        titlu={
          correctAnswer === null
            ? `Cerințele sarcinii (${currentIndex + 1}/${
              listItems.length
              }):`
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
            listItems.length
          }):`}
          open={true}
        >
          <ItemText classNameChild="">
           {listItems[currentIndex].test_item_options[0].explanation} 
          </ItemText>
          <button onClick={handleClick} className="btn-test">
            Încearcă din nou!
          </button>
        </ItemAccordeon>
      )}
    </>
  );
};

export default TestWords;
