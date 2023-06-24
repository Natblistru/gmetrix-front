import React, { useState, useEffect } from "react";
import temeIstoriArray from "../../data/temeIstoria";

import ItemAccordeon from "../Accordeon/ItemAccordeon";
import CheckBox from "../CheckBox";
import SentenceBox from "../DragWords/SentenceBox";
import AnswerBox from "../DragWords/AnswerBox";
import ItemText from "../Accordeon/ItemText";
import { getSentence, getAnswers } from "../DragWords/TextConverter";
import { shuffleArray } from "./TestWords";
import ItemList from "../Accordeon/ItemList";

const HeaderInit = () => {
  return (
    <div>
      <div style={{ textAlign: "right", marginRight: "5px" }}>
        Timp recomandat: 00:05:00
      </div>
    </div>
  );
};

const Header = ({ activeButton, handleClick }) => {
  return (
    <div className="nav-header">
      <div className="nav-header">
        <button
          className="circle"
          style={{ backgroundColor: activeButton == 1 ? "#76a900" : "#fff" }}
          onClick={() => handleClick(1)}
        >
          1
        </button>
        <button
          className="circle"
          style={{ backgroundColor: activeButton == 2 ? "#76a900" : "#fff" }}
          onClick={() => handleClick(2)}
        >
          2
        </button>
        <button
          className="circle"
          style={{ backgroundColor: activeButton == 3 ? "#76a900" : "#fff" }}
          onClick={() => handleClick(3)}
        >
          3
        </button>
        <button
          className="circle"
          style={{ backgroundColor: activeButton == 4 ? "#76a900" : "#fff" }}
          onClick={() => handleClick(4)}
        >
          4
        </button>
        {activeButton !== null && <a onClick={() => handleClick(null)}>Lista de sarcini</a> }
      </div>
      <div>00:05:00</div>
    </div>
  );
};

// let list = temeIstoriArray[0].subtitles[0].subjects[0].teste[9];
let currentIndex = 0;
const TestGeneralizator = ({
  list,
  currentIndex,
  correctAnswer,
  setCorrectAnswer,
  additionalContent,
  handleTryAgain,
}) => {
  const [selectedValues, setSelectedValues] = useState([]);
  // const [showHeader, setShowHeader] = useState(false);
  // const [correctAnswer, setCorrectAnswer] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [start, setStart] = useState(null);

  const handleClick = (buttonId) => {
    setActiveButton(buttonId);
  };

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
    const correctValues = list.quizArray[currentIndex].answers
      .filter((answer) => answer.correct)
      .map((answer) => answer.text);
    const selectedValuesString = selectedValues.sort().join(",");
    const correctValuesString = correctValues.sort().join(",");
    setCorrectAnswer(selectedValuesString === correctValuesString);
    // setShowHeader(true);
    setActiveButton(1);
  };

  const handleAnswer = () => {};
  const handleContinue = () => {};
  const handleFinish = () => {};

  const handleTryAgainClearCheck = () => {
    setSelectedValues([]);
    handleTryAgain();
  };
  const handleStart = () => {
    setStart(true);
    setActiveButton(1);
  }; /*  Test[1]  */
  const text1 = list.quizArray[currentIndex].listaSarcini[1].answers[0].text;
  const textAdd1 =
    list.quizArray[currentIndex].listaSarcini[1].answers[0].textAdditional;
  const [answers1, setAnswers1] = useState([]);
  const [sentence1, setSentence1] = useState([]);

  useEffect(() => {
    setAnswers1(shuffleArray(getAnswers(text1).concat(textAdd1)));
    setSentence1(getSentence(text1));
  }, [text1]);
  const onDrop1 = (ev, dropId) => {
    const text = ev.dataTransfer.getData("text/plain");
    const updatedSentence = sentence1.map((w) => {
      if (w.id === dropId) {
        return { ...w, placed: true, displayed: text };
      }
      return w;
    });
    setSentence1(updatedSentence);
  };

  /*  Test[2]  */
  const text2 = list.quizArray[currentIndex].listaSarcini[2].answers[0].text;
  const textAdd2 =
    list.quizArray[currentIndex].listaSarcini[2].answers[0].textAdditional;
  const [answers2, setAnswers2] = useState([]);
  const [sentence2, setSentence2] = useState([]);

  useEffect(() => {
    setAnswers2(shuffleArray(getAnswers(text2).concat(textAdd2)));
    setSentence2(getSentence(text2));
  }, [text2]);
  const onDrop2 = (ev, dropId) => {
    const text = ev.dataTransfer.getData("text/plain");
    const updatedSentence = sentence2.map((w) => {
      if (w.id === dropId) {
        return { ...w, placed: true, displayed: text };
      }
      return w;
    });
    setSentence2(updatedSentence);
  };

  /*  Test[3]  */
  const text3 = list.quizArray[currentIndex].listaSarcini[3].answers[0].text;
  const textAdd3 =
    list.quizArray[currentIndex].listaSarcini[3].answers[0].textAdditional;
  const [answers3, setAnswers3] = useState([]);
  const [sentence3, setSentence3] = useState([]);

  useEffect(() => {
    setAnswers3(shuffleArray(getAnswers(text3).concat(textAdd3)));
    setSentence3(getSentence(text3));
  }, [text3]);
  const onDrop3 = (ev, dropId) => {
    const text = ev.dataTransfer.getData("text/plain");
    const updatedSentence = sentence3.map((w) => {
      if (w.id === dropId) {
        return { ...w, placed: true, displayed: text };
      }
      return w;
    });
    setSentence3(updatedSentence);
  };

  return (
    <>
      {!start && <HeaderInit />}
      {start && (
        <Header activeButton={activeButton} handleClick={handleClick} />
      )}
      <ItemAccordeon
        titlu={activeButton ? `Cerințele sarcinii:` : `Lista de sarcini`}
        open={true}
      >
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
                  <div className="points">V</div>
                </div>
              );
            })}
          </div>
        )}
        {activeButton == 1 && (
          <ItemText
            classNameChild={
              correctAnswer === null
                ? ""
                : correctAnswer
                ? " correct"
                : " incorrect"
            }
          >
            <p>{list.quizArray[currentIndex].listaSarcini[0].sarcina} 1</p>
            {list.quizArray[currentIndex].listaSarcini[0].answers.map(
              (answer, idx) => {
                return (
                  <CheckBox
                    key={idx}
                    value={answer.text}
                    checked={selectedValues.includes(answer.text)}
                    onChange={
                      correctAnswer === null ? handleCheckBoxChange : () => {}
                    }
                  />
                );
              }
            )}
          </ItemText>
        )}
        {activeButton == 2 && (
          <ItemText
            classNameChild={
              correctAnswer === null
                ? ""
                : correctAnswer
                ? " correct"
                : " incorrect"
            }
          >
            <p>{list.quizArray[currentIndex].listaSarcini[1].sarcina} 2</p>
            <SentenceBox marked={false} onDrop={onDrop1} sentence={sentence1} />
            <AnswerBox answers={answers1} />
          </ItemText>
        )}
        {activeButton == 3 && (
          <ItemText
            classNameChild={
              correctAnswer === null
                ? ""
                : correctAnswer
                ? " correct"
                : " incorrect"
            }
          >
            <p>{list.quizArray[currentIndex].listaSarcini[2].sarcina} 3</p>
            <SentenceBox marked={false} onDrop={onDrop2} sentence={sentence2} />
            <AnswerBox answers={answers2} />
          </ItemText>
        )}
        {activeButton == 4 && (
          <ItemText
            classNameChild={
              correctAnswer === null
                ? ""
                : correctAnswer
                ? " correct"
                : " incorrect"
            }
          >
            <p>{list.quizArray[currentIndex].listaSarcini[3].sarcina} 4</p>
            <SentenceBox marked={false} onDrop={onDrop3} sentence={sentence3} />
            <AnswerBox answers={answers3} />
          </ItemText>
        )}
        {start === null && (
          <button onClick={handleStart} className="btn-test">
            Incepe testul
          </button>
        )}
        {activeButton !== null && (
          <button onClick={handleAnswer} className="btn-test">
            Raspunde
          </button>
        )}
        {activeButton === null && start !== null && (
          <>
            <button onClick={handleContinue} className="btn-test">
              Continue testul
            </button>
            <button onClick={handleFinish} className="btn-test"  style={{margin: "0 0 2em" }}>
              Finisează testul
            </button>
          </>
        )}
      </ItemAccordeon>
    </>
  );
};

export default TestGeneralizator;
