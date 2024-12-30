import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateStudentProcent } from "../ReduxComp/actions";
import SentenceBox from "../DragWords/SentenceBox";
import AnswerBox from "../DragWords/AnswerBox";
import { getSentence, getAnswers, decodeDiacritics } from "../DragWords/TextConverter";
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
  const currentTests = useSelector(state => state.currentTests);
  const currentIndexTestObject = useSelector(state => state.currentIndexTest);

  const currentStudentObject = useSelector(state => state.currentStudent);
  const currentStudent = currentStudentObject ? currentStudentObject.currentStudent : 1;
  const language = useSelector(state => state.language);

  const dispatch = useDispatch();
  const allTeacherTests = useSelector((state) => state.allTeacherTests);

  const [showResults, setShowResults] = useState(false);
  const [question, setQuestion] = useState("");

  const [answers, setAnswers] = useState([]);
  const [sentence, setSentence] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState([])

  let text;
  let currentIndexTest;

  if (typeof currentIndexTestObject === 'object') {
      currentIndexTest = currentIndexTestObject.currentIndexTest;
  } else {
      currentIndexTest = currentIndexTestObject;
  }

  //   console.log('currentTests', currentTests)
  //   console.log('currentIndexTest', currentIndexTest);
  // console.log('currentTests[currentIndexTest].order_number_options', currentTests[currentIndexTest].order_number_options);
  // console.log('currentItemIndex', currentItemIndex);


  const [listItems, setListItems] = useState(currentTests[currentIndexTest].order_number_options)

  const jsonString = listItems[currentItemIndex]?.test_item_content;

  // console.log('jsonString', jsonString);
  const decodedString = decodeDiacritics(jsonString);
  
  // Parsează JSON-ul pentru a obține obiectul
  const jsonObject = JSON.parse(decodedString);
  
  let task_en = jsonObject.en;
  let task_ro = jsonObject.ro;
  
  let test_task = language === "ro" ? jsonObject.ro : jsonObject.en;

  const textAdditional = listItems[currentItemIndex].test_item_options[0].text_additional;

  // din currentTests se ia al currentIndexTest-lea si se obtine listItems (formative_test)
  // console.log('currentTests', currentTests)
  // console.log('currentIndexTest', currentIndexTest)
  // console.log('listItems', listItems)

  // din listItems se ia al currentItemIndex-lea si se obtine test_item
  // console.log('currentItemIndex', currentItemIndex)
  // console.log('listItems[currentItemIndex]', listItems[currentItemIndex])

  // console.log('textAdditional', textAdditional)

  // Verificăm dacă textAdditional nu este null sau undefined
  if (textAdditional) {
      try {
          text = JSON.parse(textAdditional).trim();
      } catch (e) {
          console.error("Invalid JSON format:", e);
          text = '';
      }
  } else {
      console.warn("text_additional is null or undefined");
      text = ''; // sau orice valoare implicită doriți să folosiți
  }
  text = text.slice(1, -1);
  // console.log('text', text)

  useEffect(()=>{
    setListItems(currentTests[currentIndexTest].order_number_options);

    // console.log('currentIndexTest',currentIndexTest)
    // console.log('currentItemIndex',currentItemIndex)
   
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
    console.log("initialSelectedOptions", initialSelectedOptions)

    const jsonString = listItems[currentItemIndex]?.test_item_content;
    const decodedString = decodeDiacritics(jsonString);
    
    // Parsează JSON-ul pentru a obține obiectul
    const jsonObject = JSON.parse(decodedString);
    
    task_en = jsonObject.en;
    task_ro = jsonObject.ro;
    
    test_task = language === "ro" ? jsonObject.ro : jsonObject.en;

    const textAdditional = listItems[currentItemIndex].test_item_options[0].text_additional;

    // console.log('currentItemIndex', currentItemIndex)
    // console.log('listItems[currentItemIndex]', listItems[currentItemIndex])
    // console.log('textAdditional', textAdditional)

    // Verificăm dacă textAdditional nu este null sau undefined
    if (textAdditional) {
        try {
            text = JSON.parse(textAdditional).trim();
        } catch (e) {
            console.error("Invalid JSON format:", e);
            text = '';
        }
    } else {
        console.warn("text_additional is null or undefined");
        text = ''; // sau orice valoare implicită doriți să folosiți
    }

    // Elimină ghilimelele de la început și sfârșit
    text = text.slice(1, -1);
    // console.log('text', text)
  },[currentItemIndex, currentIndexTest])

  useEffect(()=>{
    test_task = language === "ro" ? task_ro : task_en;
  },[language])

   const filteredElements = listItems[currentItemIndex].test_item_options.filter(function(element) {
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
        // console.log('option',option)
        // console.log('dropId',dropId)
        // console.log('text',text)
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
    console.log("selectedOptions", selectedOptions)
    const selectedOptionsCalculate = selectedOptions.map(item => {
      let score;
      // console.log(item)
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
      return { ...rest, student_id: currentStudent, type: 'check' };
    });
    console.log("selectedOptionsToDB", selectedOptionsToDB)
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

    // console.log(sentence)
    const correct = sentence
      .map((w) => (w.type === "answer" ? w.text === w.displayed : true))
      .every(Boolean);
    setCorrectAnswer(correct);
    const index = allTeacherTests.findIndex(
      (item) => item.test_item_id === listItems[currentItemIndex].test_item_id
    );
    
    if (index !== -1) {
      const newProcent = correct === true ? "100.000000" : "0.000000";
      dispatch(updateStudentProcent(index, newProcent));
    }
  };

  const trimiteDateLaBackend = async (element) => {
    if (currentTests[0].path == "/test-de-totalizare") {
      const token = localStorage.getItem('auth_token');  
      try {
        console.log("element", element)
        const response = await axios.post('/api/student-summative-test-options', element
          // ,
          // {
          //   headers: {
          //     "Content-Type": "application/json",       
          //     "Authorization": token ? `Bearer ${token}` : '' 
          //   },
          // }
        );

        if (response.status === 200) {
          // console.log('Success:', response.data.message);
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
        // console.log(element)
        const response = await axios.post('/api/student-formative-test-options', element);

        if (response.status === 200) {
          // console.log('Success:', response.data.message);
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

  const trimiteResultsLaBackend = async (element) => {
    if (currentTests[0].path == "/test-de-totalizare") {
      try {
        // console.log(element)
        const response = await axios.post('/api/student-summative-test-results', element);

        if (response.status === 200) {
          // console.log('Success:', response.data.message);
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
        // console.log(element)
        const response = await axios.post('/api/student-formative-test-results', element);

        if (response.status === 200) {
          // console.log('Success:', response.data.message);
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

  const handleClick = () => {
    setShowResults(false);
    setAnswers(shuffleArray(getAnswers(text).concat(textAdd)));
    setSentence(getSentence(text));    
    handleTryAgain();
  };
  // console.log("additionalContent (TestWords)", additionalContent)

  return (
    <>
      <ItemAccordeon
        titlu={
          correctAnswer === null
            ? `Cerințele sarcinii (${currentIndex + 1}/${
              list.length
              }):`
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
          <div className="app-container">
              {/* <p style={{paddingBottom: '20px'}}>
              {listItems[currentItemIndex].test_item_task.includes('(')
                ? listItems[currentItemIndex].test_item_task.substring(0, listItems[currentItemIndex].test_item_task.indexOf('('))
                : listItems[currentItemIndex].test_item_task
              }
            </p> */}

          <div dangerouslySetInnerHTML={{ __html: test_task }} />

          <img
              className="img-subject"
              src={`${process.env.REACT_APP_API_BASE_URL}/${listItems[currentItemIndex]?.image_path}`}
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
            list.length
          }):`}
          open={true}
        >
          <ItemText classNameChild="">
            {listItems[currentItemIndex].test_item_options[0].explanation.split('\n').map((paragraf, idx) => (
                <p key={idx}>{paragraf}</p>
              ))}
          </ItemText>
          {/* <button onClick={handleClick} className="btn-test">
            Încearcă din nou!
          </button> */}
        </ItemAccordeon>
      )}
    </>
  );
};

export default TestWords;
