import React, { useState, useEffect } from "react";
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
}) => {
  // const [showHeader, setShowHeader] = useState(false);
  // const [correctAnswer, setCorrectAnswer] = useState(null);
  const [selectedValues, setSelectedValues] = useState([]);
  const [timerFinished, setTimerFinished] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [start, setStart] = useState(null);
  const [marked, setMarked] = useState(false);
  const [nota, setNota] = useState(0);

  const [response, setResponse] = useState([0, 0, 0, 0]);
  const [modified, setModified] = useState([0, 0, 0, 0]);
  const [results, setResults] = useState([0, 0, 0, 0]);
  const [answers1, setAnswers1] = useState([]);
  const [sentence1, setSentence1] = useState([]);
  const [answers2, setAnswers2] = useState([]);
  const [sentence2, setSentence2] = useState([]);
  const [answers3, setAnswers3] = useState([]);
  const [sentence3, setSentence3] = useState([]);
  let text1 = "",
    textAdd1 = "";
  let text2 = "",
    textAdd2 = "";
  let text3 = "",
    textAdd3 = "";
  let initValues = [];
  const [userAnswerCheck, setUserAnswerCheck] = useState([]);
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
    initValues = list.quizArray[currentIndex].listaSarcini[0].answers.map(
      (answer) => false
    );
    setUserAnswerCheck(initValues);
    text1 = list.quizArray[currentIndex].listaSarcini[1].answers[0].text;
    textAdd1 =
      list.quizArray[currentIndex].listaSarcini[1].answers[0].textAdditional;
    setAnswers1(shuffleArray(getAnswers(text1).concat(textAdd1)));
    setSentence1(getSentence(text1));
    text2 = list.quizArray[currentIndex].listaSarcini[2].answers[0].text;
    textAdd2 =
      list.quizArray[currentIndex].listaSarcini[2].answers[0].textAdditional;
    setAnswers2(shuffleArray(getAnswers(text2).concat(textAdd2)));
    setSentence2(getSentence(text2));
    text3 = list.quizArray[currentIndex].listaSarcini[3].answers[0].text;
    textAdd3 =
      list.quizArray[currentIndex].listaSarcini[3].answers[0].textAdditional;
    setAnswers3(shuffleArray(getAnswers(text3).concat(textAdd3)));
    setSentence3(getSentence(text3));
  }, [currentIndex]);

  const sumTotalPoints = () => {
    let sumTotal = 0;
    list.quizArray[currentIndex].listaSarcini?.map((item, idx) => {
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
    if (list.quizArray[currentIndex].listaSarcini[n].type == "check")
      return list.quizArray[currentIndex].listaSarcini[n].answers.length;
    if (list.quizArray[currentIndex].listaSarcini[n].type == "words")
      return getAnswers(
        list.quizArray[currentIndex].listaSarcini[n].answers[0].text
      ).length;
  };
  const checkAnswer = (updatedResults) => {
    const correctValuesArray = list.quizArray[
      currentIndex
    ].listaSarcini[0].answers.map((answer) => answer.correct);
    const correctValues = list.quizArray[currentIndex].listaSarcini[0].answers
      .filter((answer) => answer.correct)
      .map((answer) => answer.text);
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
    const totalResult = propozitie.reduce((sum, obj) => {
      if (obj.type === "answer" && obj.text === obj.displayed) {
        return sum + 1;
      } else {
        return sum;
      }
    }, 0);
    const totalResponse =
      raspuns.length -
      list.quizArray[currentIndex].listaSarcini[n].answers[0].textAdditional
        .length;
    const points = (totalResult * 10) / totalResponse;

    updatedResults[n] = totalResult;
    setResults(updatedResults);
  };

  const updateNota = (nota) => {
    console.log("nota", nota);
    const userItems = tests.items.find((item) => item.user === "Current user");
    if (userItems) {
      const resultItem = userItems.tests.find(
        (item) =>
          item.id == list.subjectID &&
          item.quiz == list.id &&
          item.item == currentIndex + 1
      );
      console.log("userItems.tests", userItems.tests);
      console.log("resultItem", resultItem);
      if (resultItem) {
        update({
          id: list.subjectID,
          quiz: list.id,
          item: currentIndex + 1,
          proc: nota,
        });
      } else {
        add({
          id: list.subjectID,
          quiz: list.id,
          item: currentIndex + 1,
          proc: nota,
        });
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
    updateNota(nota);
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
            {list.quizArray[currentIndex].listaSarcini?.map((subtitle, idx) => {
              return (
                <div key={idx} className="subject-item">
                  <div className="title-item">
                    <div className="num-item">{subtitle.id}.</div>
                    <div
                      className="name-item"
                      onClick={
                        start !== null ? () => handleClick(subtitle.id) : null
                      }
                    >
                      {subtitle.name}
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
              <p>{list.quizArray[currentIndex].listaSarcini[0].sarcina}</p>
              {list.quizArray[currentIndex].listaSarcini[0].answers.map(
                (answer, idx) => {
                  return (
                    <CheckBox
                      key={idx}
                      value={answer.text}
                      checked={selectedValues.includes(answer.text)}
                      onChange={
                        correctAnswer === null
                          ? () => handleCheckBoxChange(answer.text, idx)
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
              <p>{list.quizArray[currentIndex].listaSarcini[1].sarcina}</p>
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
              <p>{list.quizArray[currentIndex].listaSarcini[2].sarcina}</p>
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
              <p>{list.quizArray[currentIndex].listaSarcini[3].sarcina}</p>
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
