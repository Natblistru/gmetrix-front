import React, { useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import temeIstoriArray from "../data/temeIstoria";
import Breadcrumb from "../components/Breadcrumb";
import Wrapper from "../components/Wrapper";
import TitleBox from "../components/TitleBox";
import TestQuiz from "../components/Teste/TestQuiz";
import TestCheck from "../components/Teste/TestCheck";
import ListNavigatie from "../components/ListNavigatie";
import TestBoard from "../components/Teste/TestBoard";
import "../index.css";

const TestWrapper = (props) => {

  const { list, correctAns, currInd } = props.location.state;
// console.log("correctAns ", correctAns);
   const [correctAnswer, setCorrectAnswer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentList, setCurrentList] = useState(list);
  // if(currInd!==undefined) setCurrentIndex(currInd);
  const testBoardRef = useRef(null);

  // console.log("list din Test",list);
  // console.log("currentIndex din Test",currentIndex);
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
    console.log("handleTryAgain currInd",currInd);
    // if(currInd!==undefined) setCurrentIndex(currInd) 
    // else 
    setCurrentIndex(
      currentList.quizArray.length - 1 === currentIndex ? 0 : currentIndex + 1
    );
    console.log("currentIndex din Test(handleTryAgain) ",currentIndex);
    setCorrectAnswer(null);
  };

  const handleClearTestBoard = (testId) => {
    if (testBoardRef.current && testBoardRef.current.handleTryAgainClear) {
      // console.log("handleClearTestBoard testId",testId);
      // console.log("testBoardRef",testBoardRef.current);
      testBoardRef.current.handleTryAgainClear(testId);
    }
  };
  return (
    <Wrapper>
      <Breadcrumb
        list={temeIstoriArray[0].subtitles[0].subjects[0].breadcrumb}
      />
      <TitleBox className="teme-container">{currentList.name}</TitleBox>
      {currentList.type === "quiz" && (
        <TestQuiz
          list={currentList}
          currentIndex={currentIndex}
          correctAnswer={correctAnswer}
          setCorrectAnswer={setCorrectAnswer}
          additionalContent={additionalContent}
          handleTryAgain={handleTryAgain}
        />
      )}
      {currentList.type === "check" && (
        <TestCheck
          list={currentList}
          currentIndex={currentIndex}
          correctAnswer={correctAnswer}
          setCorrectAnswer={setCorrectAnswer}
          additionalContent={additionalContent}
          handleTryAgain={handleTryAgain}
        />
      )}
      {(currentList.type === "cauze" ||
        currentList.type === "consecinte" ||
        currentList.type === "caracteristica" ||
        currentList.type === "chrono" ||
        currentList.type === "chronoDuble") && (
        <TestBoard
          list={currentList}
          currentIndex={currentIndex}
          correctAnswer={correctAnswer}
          setCorrectAnswer={setCorrectAnswer}
          additionalContent={additionalContent}
          handleTryAgain={handleTryAgain}
          DragDisable={false}
          ref={testBoardRef}
        />
      )}
      <ListNavigatie
        list={currentList}
        setCurrentList={setCurrentList}
        correctAnswer={correctAnswer}
        setCorrectAnswer={setCorrectAnswer}
        setCurrentIndex={setCurrentIndex}
        handleClearTestBoard={handleClearTestBoard}
      />
    </Wrapper>
  );
};

export default withRouter(TestWrapper);
