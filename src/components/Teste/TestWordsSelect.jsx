import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ItemAccordeon from "../Accordeon/ItemAccordeon";
import ItemText from "../Accordeon/ItemText";
import { decodeDiacritics } from "../DragWords/TextConverter";

const TestWordsSelect = ({
  list,
  currentIndex,
  correctAnswer,
  setCorrectAnswer,
  additionalContent,
  handleTryAgain,
  currentItemIndex,
  setResponseReceived,
}) => {
  const currentTests = useSelector((state) => state.currentTests);
  const currentIndexTestObject = useSelector((state) => state.currentIndexTest);
  const language = useSelector((state) => state.language);

  const currentStudentObject = useSelector(state => state.currentStudent);
  const currentStudent = currentStudentObject ? currentStudentObject.currentStudent : 1;

  const [question, setQuestion] = useState("");
  const [sentenceWithBlanks, setSentenceWithBlanks] = useState([]);
  const [options, setOptions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [userAnswersText, setUserAnswersText] = useState("");
  const [renderedHtml, setRenderedHtml] = useState("");

  const [selectedOptions, setSelectedOptions] = useState([])

  let currentIndexTest;

  if (typeof currentIndexTestObject === "object") {
    currentIndexTest = currentIndexTestObject.currentIndexTest;
  } else {
    currentIndexTest = currentIndexTestObject;
  }

  const [listItems, setListItems] = useState(
    currentTests[currentIndexTest]?.order_number_options || []
  );

  useEffect(() => {
    setListItems(currentTests[currentIndexTest]?.order_number_options || []);

    const testItem = listItems[currentItemIndex];
    if (!testItem) return;

    const initialSelectedOptions = [];
    listItems[currentItemIndex].test_item_options.forEach((element, index) => {
      initialSelectedOptions.push({ "option": element.option, 
                                     "user_option": `default${index}`,
                                     "score": 0,
                                     "correct": element.correct,
                                     "user_column": -1,
                                     "explanation": element.explanation,
                                     "test_item_complexity": listItems[currentItemIndex].test_item_complexity,
                                     "formative_test_id": listItems[currentItemIndex].formative_test_id,
                                     "test_item_id": listItems[currentItemIndex].test_item_id});
    });

    setSelectedOptions(initialSelectedOptions);
    setUserAnswersText(listItems[currentItemIndex]?.test_item_options[0].text_additional || "");

    const jsonString = testItem?.test_item_content;
    //console.log("testItem (TestWordsSelect)", testItem)
    const decodedString = decodeDiacritics(jsonString);
    const jsonObject = JSON.parse(decodedString);

    const task = language === "ro" ? jsonObject.ro : jsonObject.en;

    setQuestion(task);

    //console.log("jsonString",jsonString)

    // Pregătește propoziția și opțiunile pentru select
    setSentenceWithBlanks(jsonObject.sentenceWithBlanks || []);
    setOptions(jsonObject.options || []);

    const selects = document.querySelectorAll('select[data-index]');
    selects.forEach((select) => {
      const index = parseInt(select.getAttribute("data-index"), 10);
      select.onchange = (e) => handleChange(e, index);
    });
    //console.log("selects",selects)
    // Inițializează răspunsurile utilizatorului
    const initialAnswers = (jsonObject.sentenceWithBlanks || []).map(() => "");
    // setUserAnswers(initialAnswers);
    setUserAnswers(Array(testItem?.test_item_options.length).fill("default"))
  }, [listItems, currentIndexTest, currentItemIndex, language]);

  const handleChange = (e, index) => {

    setSelectedOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];

      updatedOptions[index].user_option = e.target.value;
      updatedOptions[index].user_column = index;
  
      return updatedOptions; 
    });


    setUserAnswers((prevUserAnswers) => {
      const updatedAnswers = [...prevUserAnswers];
      //console.log("Before update:", prevUserAnswers); 
  
      // Actualizează valoarea la indexul specificat
      updatedAnswers[index] = e.target.value;
      //console.log(`Value changed at index ${index}:`, e.target.value);
  
      return updatedAnswers; 
    });
  };

  const checkAnswer = () => {
    // const correctAnswers = sentenceWithBlanks.map((blank, index) =>
    //   blank.isBlank ? blank.correct : null
    // );
    const selectedOptionsCalculate = selectedOptions.map(item => {
      let score;
      // console.log(item)
      if (item.correct == item.user_column && item.option == item.user_option) {
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
      const { test_item_complexity, user_column, user_option, correct, explanation, ...rest } = item;
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

    const correctAnswers = [];

    // Parcurge array-ul și plasează valorile în poziția specificată de `correct`
    listItems[currentItemIndex]?.test_item_options.forEach(item => {
      correctAnswers[item.correct] = item.option;
    });
    
    console.log("correctAnswers", correctAnswers);
    console.log("userAnswers", userAnswers);
    console.log("selectedOptions", selectedOptions);
    
    // console.log("sentenceWithBlanks", sentenceWithBlanks);
    const isCorrect = correctAnswers.every(
      (answer, index) => answer === userAnswers[index]
    );

    setCorrectAnswer(isCorrect);
    setResponseReceived(true);


    const parser = new DOMParser();
    const doc = parser.parseFromString(userAnswersText, "text/html");

    selectedOptions.forEach((item) => {
      const select = doc.querySelector(`select[data-index="${item.correct}"]`);
      if (select) {
        Array.from(select.options).forEach((option) => option.removeAttribute("selected"));

        const selectedOption = Array.from(select.options).find((option) => option.value === item.user_option);
        if (selectedOption) {
          selectedOption.setAttribute("selected", "selected");
        }
      }
    });

    // Salvează HTML-ul actualizat pentru afișare
    setRenderedHtml(doc.body.innerHTML);

  };

  console.log("sentenceWithBlanks (TestWordsSelect)", sentenceWithBlanks)
  //console.log("correctAnswers (TestWordsSelect)", userAnswers)
  //console.log("userAnswers (TestWordsSelect)", userAnswers)
//  console.log("listItems[currentItemIndex]?.test_item_options[0] (TestWordsSelect)", listItems[currentItemIndex]?.test_item_options[0])

  const trimiteDateLaBackend = async (element) => {
    if (currentTests[0].path == "/test-de-totalizare") {
      try {
        console.log("element", element)
        const response = await axios.post('/api/student-summative-test-options', element,
          {
            headers: {
              "Content-Type": "application/json", 
            },
          });

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
          <div className="app-container word_select">
            <div dangerouslySetInnerHTML={{ __html: question }} />
            {/* <div dangerouslySetInnerHTML={{ __html: listItems[currentItemIndex]?.test_item_options[0].text_additional}} /> */}

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

            {correctAnswer === null && (
              <>
              <div dangerouslySetInnerHTML={{ __html: listItems[currentItemIndex]?.test_item_options[0].text_additional}} />

              <button onClick={checkAnswer} className="btn-test">
                Verifică răspunsul
              </button>
              </>
            )}
            {correctAnswer !== null && (
              
              <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />

            )}
          </div>
        </ItemText>
      </ItemAccordeon>
      {correctAnswer !== null && (
        <ItemAccordeon
          titlu={`Rezolvarea sarcinii (${currentIndex + 1}/${
            list.length
          }):`}
          open={true}
        >
          <ItemText classNameChild="word_select">
            {/* {listItems[currentItemIndex]?.test_item_options[0]?.explanation
              ?.split("\n")
              .map((paragraf, idx) => (
                <p key={idx}>{paragraf}</p>
              ))} */}
            <div dangerouslySetInnerHTML={{ __html: listItems[currentItemIndex]?.test_item_options[0].explanation}} />              
          </ItemText>
        </ItemAccordeon>
      )}
    </>
  );
};

export default TestWordsSelect;