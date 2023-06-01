import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import temeIstoriArray from "../data/temeIstoria";
import Breadcrumb from "../components/Breadcrumb";
import Wrapper from "../components/Wrapper";
import TitleBox from "../components/TitleBox";
import ItemAccordeon from "../components/Accordeon/ItemAccordeon";
import ItemText from "../components/Accordeon/ItemText";
import "../index.css";
import RadioButton from "../components/RadioButton";

const Test = (props) => {
  const { list } = props.location.state;
  const [selectedValue, setSelectedValue] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleRadioButtonChange = (value) => {
    if (buttonDisabled) {
      return; // Игнорируем события клика после нажатия на кнопку
    }
    setSelectedValue(value);
  };
  const checkAnswer = () => {
    if (selectedValue === list.quizArray[currentIndex].correctAnswer) {
      setCorrectAnswer(true);
    } else {
      setCorrectAnswer(false);
    }
    setButtonDisabled(true);
  };
  const additionalContent = (
    <div className="answer-result">
      <div
        className={`svg-sprite-vs ${
          correctAnswer ? "result-perfect" : "result-tried"
        }`}
      ></div>
      <h3>
        {correctAnswer === true
          ? "Excelent, felicitări!"
          : "Răspuns incorect, te rog să încerci din nou."}{" "}
      </h3>
      {/* Дополнительное содержимое для correctAnswer=true */}
    </div>
  );

  const handleTryAgain = () => {
    setCurrentIndex((list.quizArray.length-1)==currentIndex? 0 : currentIndex + 1); 
    setSelectedValue("");
    setCorrectAnswer(null);
    setButtonDisabled(false);
  };
  return (
    <Wrapper>
      <Breadcrumb
        list={temeIstoriArray[0].subtitles[0].subjects[0].breadcrumb}
      />
      <TitleBox className="teme-container">{list.name}</TitleBox>
      <ItemAccordeon
        titlu={correctAnswer === null ? `Cerințele sarcinii (${currentIndex + 1}/${list.quizArray.length}):` : `Rezultat (${currentIndex + 1}/${list.quizArray.length}):`}
        correctAnswer={correctAnswer}
        additionalContent={additionalContent}
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
          {list.quizArray[currentIndex].answers.map((answer, idx) => {
            return (
              <RadioButton
                key={idx}
                value={answer.text}
                checked={selectedValue === answer.text}
                onChange={handleRadioButtonChange}
                correctAnswer={list.quizArray[currentIndex].correctAnswer}
              />
            );
          })}
        </ItemText>
        <button onClick={checkAnswer} className="btn-test" disabled={buttonDisabled}>
          Verifică răspunsul
        </button>
      </ItemAccordeon>

      {correctAnswer !== null && (
        <ItemAccordeon titlu={`Rezolvare sarcinii (${currentIndex + 1}/${list.quizArray.length}):`}>
          <ItemText classNameChild="">
            {list.quizArray[currentIndex].answers.map((answer,idx) => (
              <RadioButton
                key={idx}
                value={answer.rezolvare}
                checked={answer.text === list.quizArray[currentIndex].correctAnswer}
                onChange={() => {}}
                correctAnswer={list.quizArray[currentIndex].correctAnswer}
              />
            ))}
          </ItemText>
          <button onClick={handleTryAgain} className="btn-test">
            Încearcă din nou!
          </button>
        </ItemAccordeon>
      )}
    </Wrapper>
  );
};
export default withRouter(Test);
