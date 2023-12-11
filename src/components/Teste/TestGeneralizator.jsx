import React, { useState, useEffect } from "react";
import axios from "axios";
import ContextData from "../context/ContextData";
import { connect } from "react-redux";
import ItemAccordeon from "../Accordeon/ItemAccordeon";
import CheckBox from "../CheckBox";
import SentenceBox from "../DragWords/SentenceBox";
import AnswerBox from "../DragWords/AnswerBox";
import ItemText from "../Accordeon/ItemText";
import Timer from "../Timer";
import { getSentence, getAnswers } from "../DragWords/TextConverter";
import { shuffleArray } from "./TestWords";

const HeaderInit = () => {
  return (
    <div>
      <div style={{ textAlign: "right", marginRight: "5px" }}>
        Timp recomandat: 00:05:00
      </div>
    </div>
  );
};

const Header = ({
  activeButton,
  handleClick,
  response,
  handleFinish,
  timerFinished,
}) => {
  return (
    <div className="nav-header">
      <div className="nav-header">
        <button
          className="circle"
          style={{
            backgroundColor:
              activeButton == 1
                ? "#76a900"
                : response[0] == 1
                ? "#e9ecef"
                : "#fff",
          }}
          onClick={() => handleClick(1)}
        >
          1
        </button>
        <button
          className="circle"
          style={{
            backgroundColor:
              activeButton == 2
                ? "#76a900"
                : response[1] == 1
                ? "#e9ecef"
                : "#fff",
          }}
          onClick={() => handleClick(2)}
        >
          2
        </button>
        <button
          className="circle"
          style={{
            backgroundColor:
              activeButton == 3
                ? "#76a900"
                : response[2] == 1
                ? "#e9ecef"
                : "#fff",
          }}
          onClick={() => handleClick(3)}
        >
          3
        </button>
        <button
          className="circle"
          style={{
            backgroundColor:
              activeButton == 4
                ? "#76a900"
                : response[3] == 1
                ? "#e9ecef"
                : "#fff",
          }}
          onClick={() => handleClick(4)}
        >
          4
        </button>
        {activeButton !== null && (
          <a onClick={() => handleClick(null)}>Lista de sarcini</a>
        )}
      </div>
      <div>
        <Timer
          onFinish={handleFinish}
          initialTime={300}
          isFinished={timerFinished}
        />
      </div>
    </div>
  );
};

// let list = temeIstoriArray[0].subtitles[0].subjects[0].teste[9];
//let currentIndex = 0;
const TestGeneralizator = ({
  list,
  currentIndex,
  correctAnswer,
  setCorrectAnswer,
  additionalContent,
  handleTryAgain,
  tests,
  add,
  update,
  currentItemIndex
}) => {
  const {stateData, dispatchData} = React.useContext(ContextData)
  // const [showHeader, setShowHeader] = useState(false);
  // const [correctAnswer, setCorrectAnswer] = useState(null);
  const [selectedValues, setSelectedValues] = useState([]);
  const [timerFinished, setTimerFinished] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [start, setStart] = useState(null);
  const [marked, setMarked] = useState(false);
  const [nota, setNota] = useState(0);

  // console.log(stateData.currentSummativeTests);

  const [response, setResponse] = useState([0, 0, 0, 0]);
  const [modified, setModified] = useState([0, 0, 0, 0]);
  const [results, setResults] = useState([0, 0, 0, 0]);
  const [answers1, setAnswers1] = useState([]);
  const [sentence1, setSentence1] = useState([]);
  const [answers2, setAnswers2] = useState([]);
  const [sentence2, setSentence2] = useState([]);
  const [answers3, setAnswers3] = useState([]);
  const [sentence3, setSentence3] = useState([]);

  const [selectedOptions1, setSelectedOptions1] = useState([])
  const [selectedOptions2, setSelectedOptions2] = useState([])
  const [selectedOptions3, setSelectedOptions3] = useState([])
  const [selectedOptions4, setSelectedOptions4] = useState([])

  let text1 = "",
    textAdd1 = "";
  let text2 = "",
    textAdd2 = "";
  let text3 = "",
    textAdd3 = "";
  let initValues = [];
  let dataObject = "";
  const [userAnswerCheck, setUserAnswerCheck] = useState([]);
   const listItems = stateData.currentSummativeTests[currentIndex].order_number_options;
  console.log("listItems",listItems)
  console.log("currentIndex",currentIndex)
  console.log("listItems[0]",listItems[0])
  // console.log("listaSarcini",list.quizArray[currentIndex].listaSarcini);

  useEffect(() => {
    setSelectedValues([]);
    setTimerFinished(false);
    setActiveButton(null);
    setStart(null);
    setCorrectAnswer(null);
    setMarked(false);
    setNota(0);
    setResponse([0, 0, 0, 0]);
    setModified([0, 0, 0, 0]);
    setResults([0, 0, 0, 0]);
    // console.log(stateData.currentSummativeTests)
    initValues = listItems.map(
      (answer) => false
    );
    
    setUserAnswerCheck(initValues);
    
    text1 = JSON.parse(listItems[1].test_item_options[0].text_additional).trim();
    // Elimină ghilimelele de la început și sfârșit
    text1 = text1.slice(1, -1);
    const filteredElements1 = listItems[1].test_item_options.filter(function(element) {
      return element.correct == 0;
    });
    textAdd1 = filteredElements1.map(function(element) {
      return element.option;
    });

    setAnswers1(shuffleArray(getAnswers(text1).concat(textAdd1)));
    setSentence1(getSentence(text1));

    text2 = JSON.parse(listItems[2].test_item_options[0].text_additional).trim();
    // Elimină ghilimelele de la început și sfârșit
    text2 = text2.slice(1, -1);
    const filteredElements2 = listItems[2].test_item_options.filter(function(element) {
      return element.correct == 0;
    });
    textAdd2 = filteredElements2.map(function(element) {
      return element.option;
    });

    setAnswers2(shuffleArray(getAnswers(text2).concat(textAdd2)));
    setSentence2(getSentence(text2));

    text3 = JSON.parse(listItems[3].test_item_options[0].text_additional).trim();
    // Elimină ghilimelele de la început și sfârșit
    text3 = text3.slice(1, -1);
    const filteredElements3 = listItems[3].test_item_options.filter(function(element) {
      return element.correct == 0;
    });
    textAdd3 = filteredElements3.map(function(element) {
      return element.option;
    });

    setAnswers3(shuffleArray(getAnswers(text3).concat(textAdd3)));
    setSentence3(getSentence(text3));

    const initialSelectedOption1 = [];

    listItems[0].test_item_options.forEach(element => {
      initialSelectedOption1.push({ "option": element.option, 
                                     "score": 0,
                                     "correct": element.correct,
                                     "selected": false,
                                     "explanation": element.explanation,
                                     "test_item_complexity": listItems[0].test_item_complexity,
                                     "summative_test_id": listItems[0].summative_test_id,
                                     "test_item_id": listItems[0].test_item_id});
    });
    setSelectedOptions1(initialSelectedOption1)
    console.log("initialSelectedOption1",initialSelectedOption1)

    const initialSelectedOptions2 = [];
    listItems[1].test_item_options.forEach(element => {
      initialSelectedOptions2.push({ "option": element.option, 
                                     "score": 0,
                                     "correct": element.correct - 1,
                                     "user_column": -1,
                                     "explanation": element.explanation,
                                     "test_item_complexity": listItems[1].test_item_complexity,
                                     "summative_test_id": listItems[1].summative_test_id,
                                     "test_item_id": listItems[1].test_item_id});
    });
    setSelectedOptions2(initialSelectedOptions2)

    const initialSelectedOptions3 = [];
    listItems[2].test_item_options.forEach(element => {
      initialSelectedOptions3.push({ "option": element.option, 
                                     "score": 0,
                                     "correct": element.correct - 1,
                                     "user_column": -1,
                                     "explanation": element.explanation,
                                     "test_item_complexity": listItems[2].test_item_complexity,
                                     "summative_test_id": listItems[2].summative_test_id,
                                     "test_item_id": listItems[2].test_item_id});
    });
    setSelectedOptions3(initialSelectedOptions3)

    const initialSelectedOptions4 = [];
    listItems[3].test_item_options.forEach(element => {
      initialSelectedOptions4.push({ "option": element.option, 
                                     "score": 0,
                                     "correct": element.correct - 1,
                                     "user_column": -1,
                                     "explanation": element.explanation,
                                     "test_item_complexity": listItems[3].test_item_complexity,
                                     "summative_test_id": listItems[3].summative_test_id,
                                     "test_item_id": listItems[3].test_item_id});
    });
    setSelectedOptions4(initialSelectedOptions4)

  }, [currentIndex]);

  const sumTotalPoints = () => {
    let sumTotal = 0;
    listItems?.map((item, idx) => {
      sumTotal += totalPoint(idx);
    });
    return sumTotal;
  };

  const handleModified = () => {
    const updatedModified = [...modified];
    updatedModified[activeButton - 1] = 1;
    setModified(updatedModified);
  };
  const handleClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const handleCheckBoxChange = (value, idx) => {

    setSelectedOptions1((prevOptions) =>
    prevOptions.map((option) => {
      if (option.option === value) {
        return {
          ...option,
          selected: !option.selected,
        };
      }
      return {
          ...option,
        };
    })
   );

    const updatedResponse = [...response];
    updatedResponse[activeButton - 1] = 1;
    setResponse(updatedResponse);
    if (value !== null) handleModified();
    const newInitValues = [...userAnswerCheck];
    const updatedValues = [...selectedValues];
    if (updatedValues.includes(value)) {
      const index = updatedValues.indexOf(value);
      updatedValues.splice(index, 1);
      newInitValues[idx] = false;
    } else {
      updatedValues.push(value);
      newInitValues[idx] = true;
    }
    setSelectedValues(updatedValues);
    setUserAnswerCheck(newInitValues);
  };

  const totalPoint = (n) => {
      return listItems[n].test_item_options.length;
  };
  const checkAnswer = (updatedResults) => {

    const selectedOptionsCalculate = selectedOptions1.map(item => {
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
      return { ...rest, student_id: stateData.currentStudent, type: 'check' };
    });

    for (const element of selectedOptionsToDB) {
      trimiteDateLaBackend(element);
    }

    const correctValuesArray = listItems [0].test_item_options.map((answer) => answer.correct == 1);
    const correctValues = listItems[0].test_item_options
      .filter((answer) => answer.correct == 1)
      .map((answer) => answer.option);
    const selectedValuesString = selectedValues.sort().join(",");
    const correctValuesString = correctValues.sort().join(",");
    setCorrectAnswer(selectedValuesString === correctValuesString);
    const totalResult = userAnswerCheck.reduce((sum, value, index) => {
      const result = value === correctValuesArray[index] ? 1 : 0;
      return sum + result;
    }, 0);
    updatedResults[0] = totalResult;
    setResults(updatedResults);
  };

  const checkTestWords = (propozitie, raspuns, n, updatedResults) => {
    let sumaScore = 0
    let selectedOptionsCalculate = []
    if(n==1) {
      selectedOptionsCalculate = selectedOptions2.map(item => {
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
    } else if(n==2) {
      selectedOptionsCalculate = selectedOptions3.map(item => {
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
    } else if(n==3) {
      selectedOptionsCalculate = selectedOptions4.map(item => {
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
    }
    // console.log(selectedOptionsCalculate)
    sumaScore = selectedOptionsCalculate.reduce((accumulator, element) => accumulator + element.score, 0);
    // console.log(sumaScore);

    const selectedOptionsToDB = selectedOptionsCalculate.map(item => {
      const { test_item_complexity, user_column, correct, explanation, ...rest } = item;
      return { ...rest, student_id: stateData.currentStudent, type: 'check' };
    });
    for (const element of selectedOptionsToDB) {
      trimiteDateLaBackend(element);
    }
    
    const totalResult = propozitie.reduce((sum, obj) => {
      if (obj.type === "answer" && obj.text === obj.displayed) {
        return sum + 1;
      } else {
        return sum;
      }
    }, 0);
    const totalResponse =
      raspuns.length -
      listItems[n].test_item_options[0].text_additional
        .length;
    const points = (totalResult * 10) / totalResponse;

    // updatedResults[n] = totalResult;
    updatedResults[n] = sumaScore;
    setResults(updatedResults);
  };

  const trimiteDateLaBackend = async (element) => {
    try {
        console.log(element)
        const response = await axios.post('http://localhost:8000/api/student-summative-test-options', element);

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

  const calcSumArray = (updatedResults) => {
    let sumResults = 0;
    for (let i = 0; i < updatedResults.length; i++) {
      sumResults += updatedResults[i];
    }
    return sumResults;
  };

  const handleFinish = () => {
    const updatedResults = [...results];
    checkAnswer(updatedResults);
    checkTestWords(sentence1, answers1, 1, updatedResults);
    checkTestWords(sentence2, answers2, 2, updatedResults);
    checkTestWords(sentence3, answers3, 3, updatedResults);
    const nota = (calcSumArray(updatedResults) * 100) / sumTotalPoints();
    setNota(nota);
    setMarked(true);
    setResults(updatedResults);
    setTimerFinished(true);
  };

  const handleTryAgainClearCheck = () => {
    setSelectedValues([]);
    handleTryAgain();
    handleStart();
  };
  const handleStart = () => {
    setStart(true);
    setActiveButton(1);
  };

  /*  Test[0]  */

  /*  Test[1]  */
  const onDrop1 = (ev, dropId) => {
    const updatedResponse = [...response];
    updatedResponse[activeButton - 1] = 1;
    setResponse(updatedResponse);

    const text = ev.dataTransfer.getData("text/plain");

    setSelectedOptions2(prevOptions => {
      const updatedOptions = prevOptions.map(option => {
          return option.option === text ? { ...option, user_column: Math.floor(dropId/2) } : option;
      });
      return updatedOptions;
    });

    handleModified();
    const updatedSentence = sentence1.map((w) => {
      if (w.id === dropId) {
        return { ...w, placed: true, displayed: text };
      }
      return w;
    });
    setSentence1(updatedSentence);
  };

  /*  Test[2]  */
  const onDrop2 = (ev, dropId) => {
    const updatedResponse = [...response];
    updatedResponse[activeButton - 1] = 1;
    setResponse(updatedResponse);

    const text = ev.dataTransfer.getData("text/plain");

    setSelectedOptions3(prevOptions => {
      const updatedOptions = prevOptions.map(option => {
          return option.option === text ? { ...option, user_column: Math.floor(dropId/2) } : option;
      });
      return updatedOptions;
    });

    handleModified();
    const updatedSentence = sentence2.map((w) => {
      if (w.id === dropId) {
        return { ...w, placed: true, displayed: text };
      }
      return w;
    });
    setSentence2(updatedSentence);
  };

  /*  Test[3]  */
  const onDrop3 = (ev, dropId) => {
    const updatedResponse = [...response];
    updatedResponse[activeButton - 1] = 1;
    setResponse(updatedResponse);
    const text = ev.dataTransfer.getData("text/plain");

    setSelectedOptions4(prevOptions => {
      const updatedOptions = prevOptions.map(option => {
          return option.option === text ? { ...option, user_column: Math.floor(dropId/2) } : option;
      });
      return updatedOptions;
    });

    handleModified();
    const updatedSentence = sentence3.map((w) => {
      if (w.id === dropId) {
        return { ...w, placed: true, displayed: text };
      }
      return w;
    });
    setSentence3(updatedSentence);
  };

  const additionalText = (n) => {
    return (
      <div className="answer-result">
        <div
          className={`svg-sprite-vs ${
            correctAnswer ? "result-perfect" : "result-tried"
          }`}
        ></div>
        <div>
          <h3>
            {results[n] == totalPoint(n)
              ? "Excelent, felicitări!"
              : results[n] > 0
              ? "Raspuns parțial corect"
              : "Răspuns incorect."}{" "}
          </h3>
          <p style={{ fontSize: "small" }}>
            Câștigat puncte: {results[n]}/{totalPoint(n)}
          </p>
        </div>
      </div>
    );
  };
  let titlu;

  if (activeButton === null && start === null) {
    titlu = "Lista de sarcini";
  } else if (
    activeButton === null &&
    start !== null &&
    !marked &&
    activeButton !== 1 &&
    activeButton !== 2 &&
    activeButton !== 3 &&
    activeButton !== 4
  ) {
    titlu = "Lista de sarcini";
  } else if (
    activeButton !== null &&
    start !== null &&
    !marked &&
    (activeButton === 1 ||
      activeButton === 2 ||
      activeButton === 3 ||
      activeButton === 4)
  ) {
    titlu = "Cerintele sarcinii";
  } else if (
    activeButton === null &&
    start !== null &&
    marked &&
    activeButton !== 1 &&
    activeButton !== 2 &&
    activeButton !== 3 &&
    activeButton !== 4
  ) {
    titlu = "Rezultatele testului:";
  } else if (
    activeButton !== null &&
    start !== null &&
    marked &&
    (activeButton === 1 ||
      activeButton === 2 ||
      activeButton === 3 ||
      activeButton === 4)
  ) {
    titlu = "Rezultat:";
  }
  return (
    <>
      {!start && <HeaderInit />}
      {start && (
        <Header
          activeButton={activeButton}
          handleClick={handleClick}
          response={response}
          handleFinish={handleFinish}
          timerFinished={timerFinished}
        />
      )}
      <ItemAccordeon
        // titlu={activeButton ? `Cerințele sarcinii:` : `Lista de sarcini`}
        titlu={titlu}
        // additionalContent={additionalContent}
        open={true}
      >
        {activeButton === null &&
          start !== null &&
          marked &&
          activeButton !== 1 &&
          activeButton !== 2 &&
          activeButton !== 3 &&
          activeButton !== 4 && (
            <div className="answer-result">
              <div
                className={`svg-sprite-vs ${
                  nota == 100 ? "result-perfect" : "result-tried"
                }`}
              ></div>
              <div>
                <h3>
                  {nota == 100
                    ? "Excelent, felicitări!"
                    : nota > 0
                    ? "Raspuns parțial corect"
                    : "Răspuns incorect."}{" "}
                </h3>
                <p style={{ fontSize: "small" }}>
                  Câștigat puncte: {calcSumArray(results)}/{sumTotalPoints()}
                </p>
              </div>
            </div>
          )}
        {activeButton === null && (
          <div className="subjects-container ">
            {listItems?.map((subtitle, idx) => {
              return (
                <div key={idx} className="subject-item">
                  <div className="title-item">
                    <div className="num-item">{subtitle.order_number}.</div>
                    <div
                      className="name-item"
                      onClick={
                        start !== null ? () => handleClick(subtitle.order_number) : null
                      }
                    >
                      {subtitle.test_item_task}
                    </div>
                  </div>
                  <div className="points">
                    {activeButton === null &&
                      start === null &&
                      marked === false && <span>{totalPoint(idx)} p.</span>}
                    {start === true &&
                      marked === false &&
                      response[idx] == 1 && (
                        <span>Răspuns primit ? / {totalPoint(idx)} p.</span>
                      )}
                    {start === true &&
                      marked === false &&
                      response[idx] == 0 && (
                        <span>Lipsa răspuns {totalPoint(idx)} p.</span>
                      )}
                    {/* {start === true && marked === true && (
                      <span>
                        {results[idx]} / {totalPoint(idx)} p.
                      </span>
                    )} */}
                    {start === true &&
                    marked === true &&
                    results[idx] === totalPoint(idx) ? (
                      <>
                        <span className="svg-sprite-vs-small result-perfect"></span>
                        <span>{" "}</span>
                        <span>
                          {results[idx]} / {totalPoint(idx)} p.
                        </span>
                      </>
                    ) : start === true && marked === true && results[idx] !== totalPoint(idx) ? 
                    (
                      <>
                        <span className="svg-sprite-vs-small result-tried"> </span>
                        <span>{"   "}</span>
                        <span>
                          {results[idx]} / {totalPoint(idx)} p.
                        </span>
                      </>
                    ) : null
                  }
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {activeButton == 1 && (
          <>
            {" "}
            {marked && additionalText(0)}
            <ItemText
              classNameChild={
                correctAnswer === null
                  ? ""
                  : results[0] == totalPoint(0)
                  ? " correct"
                  : " incorrect"
              }
            >
              <p>{listItems[0].test_item_task}</p>
              {listItems[0].test_item_options.map(
                (answer, idx) => {
                  return (
                    <CheckBox
                      key={idx}
                      value={answer.option}
                      checked={selectedValues.includes(answer.option)}
                      onChange={
                        correctAnswer === null
                          ? () => handleCheckBoxChange(answer.option, idx)
                          : () => {}
                      }
                    />
                  );
                }
              )}
            </ItemText>
          </>
        )}

        {activeButton == 2 && (
          <>
            {marked && additionalText(1)}
            <ItemText
              classNameChild={
                correctAnswer === null
                  ? ""
                  : results[1] == totalPoint(1)
                  ? " correct"
                  : " incorrect"
              }
            >
              <p>{listItems[1].test_item_task}</p>
              <SentenceBox
                marked={marked}
                onDrop={onDrop1}
                sentence={sentence1}
              />
              {marked === false && <AnswerBox answers={answers1} />}
            </ItemText>
          </>
        )}

        {activeButton == 3 && (
          <>
            {marked && additionalText(2)}
            <ItemText
              classNameChild={
                correctAnswer === null
                  ? ""
                  : results[2] == totalPoint(2)
                  ? " correct"
                  : " incorrect"
              }
            >
              <p>{listItems[2].test_item_task}</p>
              <SentenceBox
                marked={marked}
                onDrop={onDrop2}
                sentence={sentence2}
              />
              {marked === false && <AnswerBox answers={answers2} />}
            </ItemText>
          </>
        )}
        {activeButton == 4 && (
          <>
            {marked && additionalText(3)}
            <ItemText
              classNameChild={
                correctAnswer === null
                  ? ""
                  : results[3] == totalPoint(3)
                  ? " correct"
                  : " incorrect"
              }
            >
              <p>{listItems[3].test_item_task}</p>
              <SentenceBox
                marked={marked}
                onDrop={onDrop3}
                sentence={sentence3}
              />
              {marked === false && <AnswerBox answers={answers3} />}
            </ItemText>
          </>
        )}
        {start === null && (
          <button onClick={handleStart} className="btn-test">
            Incepe testul
          </button>
        )}
        {activeButton === null && start !== null && !marked && (
          <>
            <button onClick={handleFinish} className="btn-test">
              Finisează testul
            </button>
          </>
        )}
        {activeButton === null && start !== null && marked && (
          <>
            <button onClick={handleTryAgainClearCheck} className="btn-test">
              Încearcă din nou!
            </button>
          </>
        )}
      </ItemAccordeon>
    </>
  );
};

const reduxState = (state) => ({
  tests: state.tests,
});

const reduxFunctions = (dispatch) => ({
  update: (item) => dispatch({ type: "UPDATE_TEST", payload: item }),
  add: (item) => dispatch({ type: "ADD_TEST", payload: item }),
});

export default connect(reduxState, reduxFunctions)(TestGeneralizator);
