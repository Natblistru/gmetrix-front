import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import temeIstoriArray from "../data/temeIstoria";
import Breadcrumb from "../components/Breadcrumb";
import Wrapper from "../components/Wrapper";
import TitleBox from "../components/TitleBox";
import TestQuiz from  "../components/Teste/TestQuiz";
import TestCheck from  "../components/Teste/TestCheck";
import TestCardChrono from "../components/Teste/TestCardChrono";
import ListNavigatie from "../components/ListNavigatie";
import "../index.css";


const TestWrapper = (props) => {
  const { list } = props.location.state;
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    setCurrentIndex(
      (list.quizArray.length - 1) === currentIndex ? 0 : currentIndex + 1
    );
    setCorrectAnswer(null);
  };

  return (
    <Wrapper>
      <Breadcrumb
        list={temeIstoriArray[0].subtitles[0].subjects[0].breadcrumb}
      />
      <TitleBox className="teme-container">{list.name}</TitleBox>
      {list.type === "quiz" && (
        <TestQuiz
          list={list}
          currentIndex={currentIndex}
          correctAnswer={correctAnswer}
          setCorrectAnswer={setCorrectAnswer}
          additionalContent={additionalContent}
          handleTryAgain={handleTryAgain}
        />
      )}
      {list.type === "check" && (
        <TestCheck
          list={list}
          currentIndex={currentIndex}
          correctAnswer={correctAnswer}
          setCorrectAnswer={setCorrectAnswer}
          additionalContent={additionalContent}
          handleTryAgain={handleTryAgain}
        />
      )}  
      {list.type === "chrono" && (
        <TestCardChrono
          list={list}
          currentIndex={currentIndex}
          correctAnswer={correctAnswer}
          setCorrectAnswer={setCorrectAnswer}
          additionalContent={additionalContent}
          handleTryAgain={handleTryAgain}
        />
      )}
      <ListNavigatie list={list}/>     
    </Wrapper>
  );
};

export default withRouter(TestWrapper);