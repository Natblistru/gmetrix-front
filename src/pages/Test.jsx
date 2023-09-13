import React, { useState, useRef, useEffect } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import temeIstoriArray from "../data/temeIstoria";
import Breadcrumb from "../components/Breadcrumb";
import Wrapper from "../components/Wrapper";
import TitleBox from "../components/TitleBox";
import TestQuiz from "../components/Teste/TestQuiz";
import TestCheck from "../components/Teste/TestCheck";
import ListNavigatie from "../components/ListNavigatie";
import TestBoard from "../components/Teste/TestBoard";
import TestWords from "../components/Teste/TestWords";
import TestSnap from "../components/Snap/TestSnap";
import TestGeneralizator from "../components/Teste/TestGeneralizator";
import "../index.css";

const TestWrapper = ({ tests, add, update }) => {
  const { address1, addressTest, idTest } = useParams();
  // console.log(addressTest);
  const [currentList, setCurrentList] = useState(null);
  // const [currentTest, setcurrentTest] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const history = useHistory();

  function findObjectWithAddress(obj) {
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        const found = findObjectWithAddress(obj[key]);
        if (found) {
          return found;
        }
      } else if (
        key === "addressTestId" &&
        obj[key] === "/" + address1 + "/" + addressTest
      ) {
        return obj;
      }
    }
    return null;
  }

  useEffect(() => {
    const foundItem = findObjectWithAddress(temeIstoriArray);
    if (foundItem) {
      setCurrentList(foundItem);
      setCurrentIndex(0);
      setCorrectAnswer(null);
    } else {
      history.push("/error");
    }
  }, [addressTest]);

  // console.log("correctAns ", correctAns);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  useEffect(() => {
  //  console.log("Nota s-aschimbat", correctAnswer);
  //    console.log("currentList", currentList);
      if (correctAnswer !== null && currentList.type!= "testGeneralizator") {
  //    console.log("currentList", currentList);
  //    console.log("currentIndex", currentIndex);
  //    console.log("correctAnswer", correctAnswer);
      const userItems = tests.items.find(
        (item) => item.user === "Current user"
      );
      if (userItems) {
        const resultItem = userItems.tests.find(
          (item) =>
            item.id == currentList.subjectID &&
            item.quiz == currentList.id &&
            item.item == currentIndex + 1
        );
        if (resultItem) {
          update({
            id: currentList.subjectID,
            quiz: currentList.id,
            item: currentIndex + 1,
            proc: correctAnswer ? 100 : 0,
          });
        } else {
          add({
            id: currentList.subjectID,
            quiz: currentList.id,
            item: currentIndex + 1,
            proc: correctAnswer ? 100 : 0,
          });
        }
      }
    }
  }, [correctAnswer]);

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
    // console.log("handleTryAgain currInd",currInd);
    // if(currInd!==undefined) setCurrentIndex(currInd)
    // else
    if (currentList.type === "testGeneralizator") {
   //   console.log("currentIndex",currentIndex);
      setCurrentIndex(
        currentList.quizArray.length - 1 === currentIndex ? 0 : currentIndex + 1
      );
    } else {
      setCurrentIndex(
        currentList.quizArray.length - 1 === currentIndex ? 0 : currentIndex + 1
      );
      // console.log("currentIndex din Test(handleTryAgain) ",currentIndex);
      setCorrectAnswer(null);
    }
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
      {currentList && (
        <>
          <Breadcrumb list={currentList.breadcrumb} />
          {/* {console.log("currentList", currentList)} */}
          <TitleBox className="teme-container" list={currentList}>
            {currentList.type === "testGeneralizator"? currentList.name+ "  "+ `  ${currentIndex+1} / ${currentList.quizArray.length}`:currentList.name }
          </TitleBox>
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
          {currentList.type === "words" && (
            <TestWords
              list={currentList}
              currentIndex={currentIndex}
              correctAnswer={correctAnswer}
              setCorrectAnswer={setCorrectAnswer}
              additionalContent={additionalContent}
              handleTryAgain={handleTryAgain}
            />
          )}
          {currentList.type === "snap" && (
            <TestSnap
              list={currentList}
              currentIndex={currentIndex}
              correctAnswer={correctAnswer}
              setCorrectAnswer={setCorrectAnswer}
              additionalContent={additionalContent}
              handleTryAgain={handleTryAgain}
            />
          )}
          {currentList.type === "testGeneralizator" && (
            <TestGeneralizator
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
            currentList.type === "chronoDuble" ||
            currentList.type === "group") && (
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
        </>
      )}
    </Wrapper>
  );
};

// export default withRouter(TestWrapper);
// export default connect(reduxState, null)(TestWrapper);

const withRouterWrapper = withRouter(TestWrapper);
const reduxState = (state) => ({
  tests: state.tests,
});
const reduxFunctions = (dispatch) => ({
  update: (item) => dispatch({ type: "UPDATE_TEST", payload: item }),
  add: (item) => dispatch({ type: "ADD_TEST", payload: item }),
});

const connectWrapper = connect(reduxState, reduxFunctions)(withRouterWrapper);

export default connectWrapper;
