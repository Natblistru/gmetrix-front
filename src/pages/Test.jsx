import React, { useState, useRef, useEffect } from "react";
import ContextData from "../components/context/ContextData";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
// import temeIstoriArray from "../data/temeIstoria";
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
  const {stateData, dispatchData} = React.useContext(ContextData)
  const { address1, addressTest, idTest } = useParams();
  // console.log(addressTest);
  const [currentList, setCurrentList] = useState(null);
  const [currentList1, setCurrentList1] = useState(null);
  // const [currentTest, setcurrentTest] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const history = useHistory();


// console.log(stateData.currentTopic)


  // function findObjectWithAddress(obj) {
  //   for (let key in obj) {
  //     if (typeof obj[key] === "object") {
  //       const found = findObjectWithAddress(obj[key]);
  //       if (found) {
  //         return found;
  //       }
  //     } else if (
  //       key === "addressTestId" &&
  //       obj[key] === "/" + address1 + "/" + addressTest
  //     ) {
  //       return obj;
  //     }
  //   }
  //   return null;
  // }

  useEffect(() => {
    const pathCautat = "/" + addressTest;

    // const indexElementCautat = stateData.currentTests.findIndex(element => element.path === pathCautat);
    const indexElementCautat = stateData.currentTopic.tests.findIndex(element => element.addressTest === pathCautat);
    
    // console.log(stateData.currentTopic.tests);

    setCurrentTestIndex(indexElementCautat);
    setCurrentList1(stateData.currentTopic.tests[indexElementCautat]);

    // console.log(stateData.currentTopic.tests[indexElementCautat]);
    setCurrentItemIndex(0)
    dispatchData({
      type: "FETCH_CURRENT_INDEX_TEST",
      payload: indexElementCautat
    })

    // const foundItem = findObjectWithAddress(temeIstoriArray);
    // if (foundItem) {
    //   setCurrentList(foundItem);
    //   setCurrentIndex(0);
    //   setCorrectAnswer(null);
    // } else {
    //   history.push("/error");
    // }
  }, [addressTest]);

  // console.log("correctAns ", correctAns);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  // useEffect(() => {
  //     if (correctAnswer !== null && currentList.type!= "testGeneralizator") {
  //     const userItems = tests.items.find(
  //       (item) => item.user === "Current user"
  //     );
  //     if (userItems) {
  //       const resultItem = userItems.tests.find(
  //         (item) =>
  //           item.id == currentList.subjectID &&
  //           item.quiz == currentList.id &&
  //           item.item == currentIndex + 1
  //       );
  //       if (resultItem) {
  //         update({
  //           id: currentList.subjectID,
  //           quiz: currentList.id,
  //           item: currentIndex + 1,
  //           proc: correctAnswer ? 100 : 0,
  //         });
  //       } else {
  //         add({
  //           id: currentList.subjectID,
  //           quiz: currentList.id,
  //           item: currentIndex + 1,
  //           proc: correctAnswer ? 100 : 0,
  //         });
  //       }
  //     }
  //   }
  // }, [correctAnswer]);

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
    let itemQuantity = currentList1.length;
    if (currentList1.type === "testGeneralizator") {
      itemQuantity = currentList1.length / 4;
    }
    setCurrentItemIndex(
      itemQuantity - 1 === currentItemIndex ? 0 : currentItemIndex + 1
    );    
    // if (currentList1.type === "testGeneralizator") {
   //   console.log("currentIndex",currentIndex);
    //   setCurrentIndex(
    //     currentList.quizArray.length - 1 === currentIndex ? 0 : currentIndex + 1
    //   );
    // } else {
    //   setCurrentIndex(
    //     currentList.quizArray.length - 1 === currentIndex ? 0 : currentIndex + 1
    //   );
      // console.log("currentIndex din Test(handleTryAgain) ",currentIndex);
      setCorrectAnswer(null);
    // }
  };

  const handleClearTestBoard = (testId) => {
    if (testBoardRef.current && testBoardRef.current.handleTryAgainClear) {
      // console.log("handleClearTestBoard testId",testId);
      // console.log("testBoardRef",testBoardRef.current);
      testBoardRef.current.handleTryAgainClear(testId);
    }
  };

  // console.log("addressTest",addressTest)
  // console.log(stateData.currentTests)
  // console.log(stateData.currentSummativeTests)
  // console.log(stateData.currentTests[currentTestIndex])
  // console.log(stateData.currentTopic.tests[currentTestIndex])
  // console.log(currentList1)
  // console.log(currentItemIndex)
  return (
    <Wrapper>
      {currentList1  && (
        <>
          <Breadcrumb step={3} />
          {/* {console.log("correctAnswer", correctAnswer)} */}
          <TitleBox className="teme-container" list={currentList1}>
            {currentList1.type === "testGeneralizator"? currentList1.name+ "  "+ `  ${currentItemIndex+1} / ${currentList1.length/4}`:currentList1.name }
          </TitleBox>
          {currentList1.type === "quiz" && (
            <TestQuiz
              list={currentList1}
              currentIndex={currentItemIndex}
              correctAnswer={correctAnswer}
              setCorrectAnswer={setCorrectAnswer}
              additionalContent={additionalContent}
              handleTryAgain={handleTryAgain}
              currentItemIndex={currentItemIndex}
            />
          )}
          {currentList1.type === "check" && (
            <TestCheck
              list={currentList1}
              currentIndex={currentItemIndex}
              correctAnswer={correctAnswer}
              setCorrectAnswer={setCorrectAnswer}
              additionalContent={additionalContent}
              handleTryAgain={handleTryAgain}
              currentItemIndex={currentItemIndex}
            />
          )}
          {currentList1.type === "words" && (
            <TestWords
              list={currentList1}
              currentIndex={currentItemIndex}
              correctAnswer={correctAnswer}
              setCorrectAnswer={setCorrectAnswer}
              additionalContent={additionalContent}
              handleTryAgain={handleTryAgain}
              currentItemIndex={currentItemIndex}
            />
          )}
          {currentList1.type === "snap" && (
            <TestSnap
              list={currentList1}
              currentIndex={currentItemIndex}
              correctAnswer={correctAnswer}
              setCorrectAnswer={setCorrectAnswer}
              additionalContent={additionalContent}
              handleTryAgain={handleTryAgain}
              currentItemIndex={currentItemIndex}
            />
          )}
          {currentList1.type === "testGeneralizator" && (
            <TestGeneralizator
              list={currentList1}
              currentIndex={currentItemIndex}
              correctAnswer={correctAnswer}
              setCorrectAnswer={setCorrectAnswer}
              additionalContent={additionalContent}
              handleTryAgain={handleTryAgain}
              currentItemIndex={currentItemIndex}
            />
          )}
          {(currentList1.type === "dnd" ||
            // currentList.type === "consecinte" ||
            // currentList.type === "caracteristica" ||
            currentList1.type === "dnd_chrono" ||
            currentList1.type === "dnd_chrono_double" ||
            currentList1.type === "dnd_group") && (
            <TestBoard
              list={currentList1}
              currentIndex={currentItemIndex}
              correctAnswer={correctAnswer}
              setCorrectAnswer={setCorrectAnswer}
              additionalContent={additionalContent}
              handleTryAgain={handleTryAgain}
              DragDisable={false}
              ref={testBoardRef}
              currentItemIndex={currentItemIndex}
            />
          )}
          {/* <ListNavigatie
            list={currentList1}
            setCurrentList={setCurrentList1}
            correctAnswer={correctAnswer}
            setCorrectAnswer={setCorrectAnswer}
            setCurrentIndex={setCurrentItemIndex}
            handleClearTestBoard={handleClearTestBoard}
          /> */}
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
