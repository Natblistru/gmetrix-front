import React, { useState } from "react";
import temeIstoriArray from "../../data/temeIstoria";

import ItemAccordeon from "../Accordeon/ItemAccordeon";
import ItemText from "../Accordeon/ItemText";
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
        <a onClick={() => handleClick(null)}>Lista de sarcini</a>
      </div>
      <div>Timp recomandat: 00:05:00</div>
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
  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  // const [correctAnswer, setCorrectAnswer] = useState(null);

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
  const handleTryAgainClearCheck = () => {
    setSelectedValues([]);
    handleTryAgain();
  };

  return (
    <>
      {!activeButton && <HeaderInit />}
      {console.log(activeButton)}
      {activeButton && (
        <Header activeButton={activeButton} handleClick={handleClick} />
      )}
      <ItemAccordeon titlu="Lista de sarcini" open={true}>
        <div className="subjects-container ">
          {list.quizArray[currentIndex].listaSarcini?.map((subtitle, idx) => {
            return (
              <div key={idx} className="subject-item">
                <div className="title-item">
                  <div className="num-item">{subtitle.id}.</div>
                  <div className="name-item" onClick={() => handleClick(subtitle.id)}>{subtitle.name}</div>
                </div>
                <div className="points">V</div>
              </div>
            );
          })}
        </div>

        {correctAnswer === null && (
          <button onClick={checkAnswer} className="btn-test">
            Incepe testul
          </button>
        )}
      </ItemAccordeon>
      {correctAnswer !== null && (
        <ItemAccordeon
          titlu={`Rezolvarea sarcinii (${currentIndex + 1}/${
            list.quizArray.length
          }):`}
          open={true}
        >
          <ItemText classNameChild="">
            {/* {list.quizArray[currentIndex].answers.map((answer, idx) => (
              <CheckBox
                key={idx}
                value={answer.rezolvare}
                checked={answer.correct}
                onChange={() => {}}
              />
            ))} */}
          </ItemText>
          <button onClick={handleTryAgainClearCheck} className="btn-test">
            Încearcă din nou!
          </button>
        </ItemAccordeon>
      )}
    </>
  );
};

export default TestGeneralizator;
