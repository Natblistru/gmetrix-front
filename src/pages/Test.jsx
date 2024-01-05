import React, { useState, useRef, useEffect } from "react";
import { withRouter, useParams } from "react-router-dom";
import { connect } from "react-redux";
import ContextData from "../components/context/ContextData";
import axios from 'axios'; 
import Navbar from "../components/layouts/Navbar";
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
import { fetchTheme } from "../routes/api"
import "../index.css";

const TestWrapper = ({ tests, add, update }) => {
  const {stateData, dispatchData} = React.useContext(ContextData)
  const { address1, addressTest, idTest } = useParams();
  // console.log(addressTest);
  const [currentList, setCurrentList] = useState(null);
  const [currentList1, setCurrentList1] = useState(null);
  
  // const [currentTest, setcurrentTest] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [proc, setProc] = useState(0);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [loading, setLoading] = useState(true);


// console.log(stateData.currentTopic)

useEffect(() => {
  const teacher = 1
  const theme = stateData.currentTheme.tema_id
  const subject_id = stateData.currentSubject.subject_id;
  const level_id = 1;

  fetchTheme(teacher, theme, subject_id, level_id, dispatchData);
}, []);


  useEffect(() => {
    const pathCautat = "/" + addressTest;

    const indexElementCautat = stateData.currentTopic.tests.findIndex(element => element.addressTest === pathCautat);
    
    setCurrentTestIndex(indexElementCautat);
    setCurrentList1(stateData.currentTopic.tests[indexElementCautat]);
    if(loading) {
      setProc(stateData.currentTopic.tests[indexElementCautat].testResult*100);
      console.log(stateData.currentTopic.tests[indexElementCautat])
      setLoading(false)
    }
    setLoading(false)
    setCurrentItemIndex(0)
    dispatchData({
      type: "FETCH_CURRENT_INDEX_TEST",
      payload: indexElementCautat
    })

  }, [addressTest]);


  const [correctAnswer, setCorrectAnswer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (correctAnswer) {
          console.log(stateData.currentTests)
          console.log(currentTestIndex)
          let firstTestItemComplexity = stateData.currentTests[currentTestIndex].order_number_options[0]?.test_item_complexity;

          if (firstTestItemComplexity === undefined) {
            firstTestItemComplexity = 1
          }
          const testItemIds = stateData.currentTests[currentTestIndex].order_number_options.map(option => option.test_item_id);

          try {
            const studentId = 1;
            const promises = testItemIds.map(itemId => axios.post('http://localhost:8000/api/student-formative-test-score', {itemId,studentId} ));
            const responses = await axios.all(promises);
            const successResponses = responses.filter(response => response.data.status === 200);
            const errorResponses = responses.filter(response => response.data.status === 404);
            if (successResponses.length > 0) {
              const totalScore = successResponses.reduce((accumulator, response) => {
                const score = parseFloat(response.data.score);

                return accumulator + score;
              }, 0);
              
              const averageScore = totalScore * 100 / (successResponses.length*firstTestItemComplexity);
              setProc(averageScore)

            }
          } catch (error) {
            console.error(error);
          }
      }
    };
  
    fetchData()
  }, [correctAnswer, stateData.currentTests, currentTestIndex]);
  
  const testBoardRef = useRef(null);

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
    </div>
  );

  const handleTryAgain = () => {
    
    let itemQuantity = currentList1.length;
    if(itemQuantity - 1 === currentItemIndex) {
      setCurrentItemIndex(0)
      const testItems = stateData.currentTests[currentTestIndex].order_number_options.map(option => option);
      console.log(testItems)
      try {
        const formDataArray = testItems.map(item => {
          const formData = new FormData();
          formData.append('student_id', 1 );
          formData.append('order_number', item.order_number );
          formData.append('test_item_id', item.test_item_id );
          formData.append('formative_test_id', item.formative_test_id );   
          formData.append('score', 0 );
          formData.append('status', 0);
          return formData;
        });
      
        axios.all(formDataArray.map(formData => axios.post('http://localhost:8000/api/update-student-formative-test-result', formData)))
        .then(axios.spread((...responses) => {
          const successResponses = responses.filter(response => response.data.status === 200);
          const errorResponses = responses.filter(response => response.data.status === 404);
          console.log(responses)
          if (successResponses.length > 0) {
            console.log("Successfully processed ", successResponses.lengt, " out of ", responses.length, " requests")
            setProc(0)
          }
          errorResponses.forEach(response => {
            console.log(response.data.errors)
          })
        }));
      } catch (error) {
        console.error(error);
      } 

    } else {
      setCurrentItemIndex(currentItemIndex + 1)
    }


    setCorrectAnswer(null);
  };

  const handleClearTestBoard = (testId) => {
    if (testBoardRef.current && testBoardRef.current.handleTryAgainClear) {
      testBoardRef.current.handleTryAgainClear(testId);
    }
  };

  useEffect(() => {
    const teacher = 1
    const theme = stateData.currentTheme.tema_id
    const subject_id = stateData.currentSubject.subject_id;
    const level_id = 1;

    fetchTheme(teacher, theme, subject_id, level_id, dispatchData);
    console.log('Valoarea lui proc a fost actualizată:', proc);
  }, [proc]);

  // console.log("stateData.currentTheme",stateData.currentTheme.tema_id)
  // console.log("stateData.currentTests", stateData.currentTests)
  // console.log("stateData.currentSummativeTests",stateData.currentSummativeTests)
  // console.log("stateData.currentTests[currentTestIndex]",stateData.currentTests[currentTestIndex])
  // console.log("stateData.currentTopic.tests[currentTestIndex]", stateData.currentTopic.tests[currentTestIndex])
  // console.log("currentList1", currentList1)
  // console.log("currentItemIndex",currentItemIndex)
  // console.log("currentTestIndex",currentTestIndex)
  // console.log(stateData.currentTopic.tests)
  return (
    <>
      <Navbar />
      <Wrapper>
        {currentList1  && (
          <>
            <Breadcrumb step={3} />
            <TitleBox className="teme-container" list={currentList1} proc={proc}>
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
            {/* {currentList1.type === "testGeneralizator" && (
              <TestGeneralizator
                list={currentList1}
                currentIndex={currentItemIndex}
                correctAnswer={correctAnswer}
                setCorrectAnswer={setCorrectAnswer}
                additionalContent={additionalContent}
                handleTryAgain={handleTryAgain}
                currentItemIndex={currentItemIndex}
              />
            )} */}
            {(currentList1.type === "dnd" ||
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
    </>
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
