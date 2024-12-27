import React, { useState, useRef, useEffect } from "react";
import { withRouter, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
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
import { fetchTheme } from "../routes/api";
import { fetchCurrentIndexTest } from "../components/ReduxComp/actions";
import "../index.css";

const TestWrapper = () => {
  const dispatch = useDispatch();
  const { address1, addressTest, idTest } = useParams();
  // console.log(addressTest);
  const [currentList1, setCurrentList1] = useState(null);

  const [proc, setProc] = useState(0);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [responseReceived, setResponseReceived] = useState(false);
  const currentThemeObject = useSelector(state => state.currentTheme);
  const currentTheme = currentThemeObject.currentTheme || JSON.parse(localStorage.getItem('currentTheme'));
  const currentSubject = useSelector((state) => state.currentSubject);
  const currentTests = useSelector((state) => state.currentTests);
  const currentTopicObject = useSelector((state) => state.currentTopic);
  const currentTopic = currentTopicObject.currentTopic;

  const currentStudentObject = useSelector(state => state.currentStudent);
  const currentStudent = currentStudentObject ? currentStudentObject.currentStudent : 1; 

  const student_id = localStorage.getItem('auth_role') == 'student' ? currentStudent : 1;

  console.log(currentTopic);

  const subject_id =
    currentSubject.subject_id || currentSubject.currentSubject.subject_id;

  // console.log(currentTopic)

  useEffect(() => {
    // console.log(currentTopic)
    // console.log(currentTheme)
    // console.log(currentTests)
    if (currentTheme) {
      const teacher = 1;
      const theme = currentTheme?.tema_id;
      const level_id = 1;

      fetchTheme(teacher, theme, subject_id, level_id, dispatch, student_id);
    }

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  useEffect(() => {
    const pathCautat = "/" + addressTest;
    if (currentTopic) {
      const indexElementCautat = currentTopic.tests.findIndex(
        (element) => element.addressTest === pathCautat
      );
      // console.log(currentTopic)
      setCurrentTestIndex(indexElementCautat);
      setCurrentList1(currentTopic.tests[indexElementCautat]);
      if (loading) {
        // setProc(currentTopic.tests[indexElementCautat].testResult*100/currentTopic.tests[indexElementCautat].complexityNumber);
        setProc(currentTopic.tests[indexElementCautat].testResult * 100);
        // console.log(currentTopic.tests[indexElementCautat])
        setLoading(false);
      }
      setLoading(false);
      setCurrentItemIndex(0);
      dispatch(fetchCurrentIndexTest(indexElementCautat));
    }
  }, [addressTest]);

  const [correctAnswer, setCorrectAnswer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (correctAnswer !== null && responseReceived) {
        // console.log(currentTests)
        // console.log(currentTestIndex)
        // console.log(testBoardRef.current)
        let firstTestItemComplexity =
          currentTests[currentTestIndex].order_number_options[0]
            ?.test_item_complexity;

        if (firstTestItemComplexity === undefined) {
          firstTestItemComplexity = 1;
        }
        const testItemObjects = currentTests[
          currentTestIndex
        ].order_number_options.map((option) => ({
          test_item_id: option.test_item_id,
          formative_test_id: currentTests[currentTestIndex].formative_test_id,
        }));

        try {
          const studentId = 1;
          const token = localStorage.getItem('auth_token');
          const promises = testItemObjects.map((testItem) =>
            axios.post(
              "/api/student-formative-test-score",
              {
                test_item_id: testItem.test_item_id,
                formative_test_id: testItem.formative_test_id,
                studentId: studentId,
              }
              ,
              {
                headers: {
                  "Content-Type": "application/json",       
                  "Authorization": token ? `Bearer ${token}` : ''    
                },
              }
            )
          );
          const responses = await axios.all(promises);
          const successResponses = responses.filter(
            (response) => response.data.status === 200
          );
          const errorResponses = responses.filter(
            (response) => response.data.status === 404
          );
          // console.log(responses)
          // console.log(successResponses)
          // console.log(errorResponses)
          if (successResponses.length > 0) {
            const totalScore = successResponses.reduce(
              (accumulator, response) => {
                const score = parseFloat(response.data.score);

                return accumulator + score;
              },
              0
            );

            // const averageScore = totalScore * 100 / (successResponses.length*firstTestItemComplexity);
            const averageScore = (totalScore * 100) / successResponses.length;
            // console.log(averageScore)
            setProc(averageScore);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [correctAnswer, responseReceived, currentTests, currentTestIndex]);

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
    setResponseReceived(false);
    let itemQuantity = currentList1.length;
    if (itemQuantity - 1 === currentItemIndex) {
      setCurrentItemIndex(0);
      const testItems = currentTests[currentTestIndex].order_number_options.map(
        (option) => option
      );
      // console.log(testItems)
      try {
        const formDataArray = testItems.map((item) => {
          const formData = new FormData();
          formData.append("student_id", 1);
          formData.append("order_number", item.order_number);
          formData.append("test_item_id", item.test_item_id);
          formData.append("formative_test_id", item.formative_test_id);
          formData.append("score", 0);
          formData.append("status", 0);
          return formData;
        });
        const token = localStorage.getItem('auth_token');
        axios
          .all(
            formDataArray.map((formData) =>
              axios.post(
                "/api/update-student-formative-test-result",
                formData,
                {
                  headers: {
                    "Content-Type": "application/json",       
                    "Authorization": token ? `Bearer ${token}` : ''    
                  },
                }
              )
            )
          )
          .then(
            axios.spread((...responses) => {
              const successResponses = responses.filter(
                (response) => response.data.status === 200
              );
              const errorResponses = responses.filter(
                (response) => response.data.status === 404
              );
              // console.log(responses)
              if (successResponses.length > 0) {
                console.log(
                  "Successfully processed ",
                  successResponses.lengt,
                  " out of ",
                  responses.length,
                  " requests"
                );
                setProc(0);
              }
              errorResponses.forEach((response) => {
                // console.log(response.data.errors)
              });
            })
          );
      } catch (error) {
        console.error(error);
      }

      try {
        const formDataArray = testItems.map((item) => {
          const formData = new FormData();
          formData.append("student_id", 1);
          formData.append("order_number", item.order_number);
          formData.append("test_item_id", item.test_item_id);
          formData.append("formative_test_id", item.formative_test_id);
          formData.append("score", 0);
          formData.append("status", 0);
          return formData;
        });
        
        const token = localStorage.getItem('auth_token');
        axios
          .all(
            formDataArray.map((formData) =>
              axios.post(
                "/api/update-student-formative-test-option",
                formData,
                {
                  headers: {
                    "Content-Type": "application/json",       
                    "Authorization": token ? `Bearer ${token}` : ''    
                  },
                }
              )
            )
          )
          .then(
            axios.spread((...responses) => {
              const successResponses = responses.filter(
                (response) => response.data.status === 200
              );
              const errorResponses = responses.filter(
                (response) => response.data.status === 404
              );
              // console.log(responses)
              if (successResponses.length > 0) {
                console.log(
                  "Successfully processed ",
                  successResponses.lengt,
                  " out of ",
                  responses.length,
                  " requests"
                );
              }
              errorResponses.forEach((response) => {
                // console.log(response.data.errors)
              });
            })
          );
      } catch (error) {
        console.error(error);
      }
    } else {
      setCurrentItemIndex(currentItemIndex + 1);
    }

    setCorrectAnswer(null);
  };

  const handleClearTestBoard = (testId) => {
    if (testBoardRef.current && testBoardRef.current.handleTryAgainClear) {
      testBoardRef.current.handleTryAgainClear(testId);
    }
  };

  useEffect(() => {
    if (currentTheme) {
      const teacher = 1;
      const theme = currentTheme?.tema_id;
      const level_id = 1;

      fetchTheme(teacher, theme, subject_id, level_id, dispatch, student_id);
      console.log("Valoarea lui proc a fost actualizată:", proc);
    }
  }, [proc]);

  // console.log("currentTheme", currentTheme.tema_id)
  // console.log("currentTests", currentTests)
  // console.log("stateData.currentSummativeTests",stateData.currentSummativeTests)
  // console.log("currentTests[currentTestIndex]",currentTests[currentTestIndex])
  // console.log("currentTopic.tests[currentTestIndex]", currentTopic.tests[currentTestIndex])
  // console.log("currentList1", currentList1)
  // console.log("currentItemIndex",currentItemIndex)
  // console.log("currentTestIndex",currentTestIndex)
  // console.log(currentTopic.tests)
  return (
    <>
      <Navbar />
      <Wrapper>
        {currentList1 && (
          <>
            <Breadcrumb step={3} />
            <TitleBox
              className="teme-container"
              list={currentList1}
              proc={proc}
            >
              {currentList1.type === "testGeneralizator"
                ? currentList1.name +
                  "  " +
                  `  ${currentItemIndex + 1} / ${currentList1.length / 4}`
                : currentList1.name}
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
                responseReceived={responseReceived}
                setResponseReceived={setResponseReceived}
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
                setResponseReceived={setResponseReceived}
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
                setResponseReceived={setResponseReceived}
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
                setResponseReceived={setResponseReceived}
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
                setResponseReceived={setResponseReceived}
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

const withRouterWrapper = withRouter(TestWrapper);

export default withRouterWrapper;
