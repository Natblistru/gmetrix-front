import React, { useState, useRef, useEffect } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Navbar from "../layouts/Navbar";
import Breadcrumb from "../Breadcrumb";
import Wrapper from "../Wrapper";
import TitleBox from "./TitleBox_beta";
import TestQuiz from "../Teste/TestQuiz";
import TestCheck from "../Teste/TestCheck";
import ListNavigatie from "../ListNavigatie";
import TestBoard from "../Teste/TestBoard";
import TestWords from "../Teste/TestWords";
import TestWordsSelect from "../Teste/TestWordsSelect";
import TestSnap from "../Snap/TestSnap";
import Timer from "./Timer";
import VerticalTestMenu from './VerticalTestMenu';
import { fetchTheme, fetchAllTeacherTestsSuccess } from "../../routes/api";
import { fetchCurrentIndexTest } from "../ReduxComp/actions";
import "../../index.css";

const ExamenFinal = (props) => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const wrapperRef = useRef(null);
  const { address1, addressTest, idTest } = useParams();
  // console.log(addressTest);
  const [currentList1, setCurrentList1] = useState(null);
  const [wrapperHeight, setWrapperHeight] = useState(0);
  // const [height, setHeight] = useState(0);
  const [proc, setProc] = useState(0);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [responseReceived, setResponseReceived] = useState(false);
  const currentSubject = useSelector((state) => state.currentSubject);

  const currentSubject_name = currentSubject.currentSubject.subject_name.toLowerCase();

  const currentTests = useSelector((state) => state.currentTests);
  const allTeacherTests = useSelector((state) => state.allTeacherTests);
  // const [allTeacherTests, setAllTeacherTests] = useState(useSelector((state) => state.allTeacherTests));
  //console.log('allTeacherTests', allTeacherTests)
  //console.log('currentTests', currentTests)
  const [indexAllItems, setIndexAllItems] = useState(0);

  const currentIndexTestObject = useSelector(state => state.currentIndexTest);
  //console.log(currentIndexTestObject)

  const [clearAll, setClearAll] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [forceStopTimer, setForceStopTimer] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // const currentTopicObject = useSelector((state) => state.currentTopic);
  // const currentTopic = currentTopicObject.currentTopic;

  const currentStudentObject = useSelector(state => state.currentStudent);
  const currentStudent = currentStudentObject ? currentStudentObject.currentStudent : 1; 

  const student_id = localStorage.getItem('auth_role') == 'student' ? currentStudent : 1;

  // console.log(currentTopic);

  const subject_id =
    currentSubject.subject_id || currentSubject.currentSubject.subject_id;

  // console.log(currentTopic)

  useEffect(() => {
    // console.log(currentTopic)
    // console.log(currentTheme)
    // console.log(currentTests)

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    if (wrapperRef.current) {
      const height = wrapperRef.current.scrollHeight;
      setWrapperHeight(height);
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  useEffect(() => {
    const pathCautat = "/" + addressTest;
    // console.log("schimbat adrs", addressTest)

    
    const wrapperElement = wrapperRef.current;
    if (wrapperElement) {
      const rect = wrapperElement.getBoundingClientRect();
      console.log('Înălțimea elementului:', rect.height);
      setWrapperHeight(rect.height);
    }
    // if (wrapperRef.current) {
    //   const height = wrapperRef.current.scrollHeight;
    //   setWrapperHeight(height);
    // }
  }, [addressTest, history]);

  const [correctAnswer, setCorrectAnswer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (correctAnswer !== null && responseReceived) {
        console.log("currentTests[currentTestIndex]",currentTests[currentTestIndex])
        // console.log("correctAnswer",correctAnswer)
        // console.log("currentTestIndex", currentTestIndex)
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
          const promises = testItemObjects.map((testItem) =>
            axios.post(
              "/api/student-formative-test-score",
              {
                test_item_id: testItem.test_item_id,
                formative_test_id: testItem.formative_test_id,
                studentId: studentId,
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
            // setProc(averageScore);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    const fetchAllTeacherTests = async () => {
      try {
    
        const res = await fetchAllTeacherTestsSuccess(0, currentStudent, dispatch, currentSubject_name);
      } catch (error) {
        console.error("Eroare la preluarea datelor:", error);
      }
    };

    fetchData();
    fetchAllTeacherTests();
    if (wrapperRef.current) {
      const height = wrapperRef.current.scrollHeight;
      setWrapperHeight(height);
    }
  }, [correctAnswer, responseReceived, currentTests, currentTestIndex]);

  useEffect(()=>{
    // console.log(allTeacherTests);
    let sum = 0;
    const totalItems = allTeacherTests.length;
    allTeacherTests.forEach(obj => {
      sum += parseFloat(obj.student_procent); 
    });
    const averageScore = sum / totalItems;
    // console.log(averageScore)
    setProc(averageScore);
  },[allTeacherTests])

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
    //console.log("ajuns handle try again")
    setResponseReceived(false);
    setResetTimer(prev => !prev);
    // let itemQuantity = allTeacherTests.length;
    // if (itemQuantity - 1 === currentItemIndex) {
      // setCurrentItemIndex(0);
      const testItems = currentTests[currentTestIndex].order_number_options.map(
        (option) => option
      );
      //console.log(testItems)
      try {
        const formDataArray = testItems.map((item) => {
          const formData = new FormData();
          formData.append("student_id", 1);
          formData.append("order_number", item.order_number);
          formData.append("test_item_id", item.test_item_id);
          formData.append("summative_test_id", item.formative_test_id);
          formData.append("score", 0);
          formData.append("status", 0);
          return formData;
        });

        axios
          .all(
            formDataArray.map((formData) =>
              axios.post(
                "/api/update-student-summative-test-result",
                formData
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
          formData.append("summative_test_id", item.formative_test_id);
          formData.append("score", 0);
          formData.append("status", 0);
          return formData;
        });

        axios
          .all(
            formDataArray.map((formData) =>
              axios.post(
                "/api/update-student-summative-test-option",
                formData
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
    // } else {
    //   // setCurrentItemIndex(currentItemIndex + 1);
    // }
    fetchAllTeacherTests()
    setCorrectAnswer(null);
  };

  const fetchAllTeacherTests = async () => {
    try {
      const res = await fetchAllTeacherTestsSuccess(0, currentStudent, dispatch, currentSubject_name);
    } catch (error) {
      console.error("Eroare la preluarea datelor:", error);
    }
  };

  const handleClearTestBoard = (testId) => {
    if (testBoardRef.current && testBoardRef.current.handleTryAgainClear) {
      testBoardRef.current.handleTryAgainClear(testId);
    }
  };

  // useEffect(() => {
  //   if (currentTheme) {
  //     const teacher = 1;
  //     const theme = currentTheme?.tema_id;
  //     const level_id = 1;

  //     fetchTheme(teacher, theme, subject_id, level_id, dispatch, student_id);
  //     // console.log("Valoarea lui proc a fost actualizată:", proc);
  //   }
  // }, [proc]);

  // console.log("currentTheme", currentTheme.tema_id)
  // console.log("currentTests", currentTests)
  // console.log("stateData.currentSummativeTests",stateData.currentSummativeTests)
  // console.log("currentTests[currentTestIndex]",currentTests[currentTestIndex])
  // console.log("currentTopic.tests[currentTestIndex]", currentTopic.tests[currentTestIndex])
  //console.log("allTeacherTests", allTeacherTests)
  // console.log("currentItemIndex",currentItemIndex)
  // console.log("currentTestIndex",currentTestIndex)
  // console.log(currentTopic.tests)

  // const changeAdressIdTest = () => {
  //   const currentId = parseInt(window.location.pathname.split('/').pop(), 10);

  //   const newId = currentId + 1;
  //   setIndexAllItems(newId)
  //   const basePath = window.location.pathname.replace(`/${currentId}`, '');
  //   const newUrl = `${basePath}/${newId}?teacher=1&theme=${currentTheme.tema_id}&level=1&disciplina=${subject_id}`;
  //   history.push(newUrl);
  // };

  const handleNext = () => {
    //console.log('indexAllItems',indexAllItems);
    setCorrectAnswer(null);
    setClearAll(true);
    // Eliminam din adresa path la formative_test si nr_ord a test_item al acestuia
    const pathname = window.location.pathname;
    const segments = pathname.split('/');
    const newPathname = segments.slice(0, -1).join('/');

    let newId = indexAllItems+1;
    if (newId > (allTeacherTests.length-1)) {
        newId = 0;
    }

    const nextAllTests = allTeacherTests[newId];
    const currentIdFormativeTest = nextAllTests.formative_test_id;
    handleClearTestBoard(currentIdFormativeTest);
    setIndexAllItems(newId);

    const newUrlTest = `${newPathname}/${nextAllTests.order_item_test}?level=1&disciplina=${subject_id}`;
    //console.log('newUrlTest', newUrlTest);
    history.push(newUrlTest);

    dispatch(fetchCurrentIndexTest(nextAllTests.order_formative_test-1));
    setCurrentItemIndex(nextAllTests.order_item_test-1);
    // setCorrectAnswer(null);
    if (wrapperRef.current) {
      const height = wrapperRef.current.scrollHeight;
      setWrapperHeight(height);
    }
  };

  const handlePrevious = () => {
    //console.log('indexAllItems',indexAllItems);
    setCorrectAnswer(null);
    setClearAll(true);
    // Eliminam din adresa path la formative_test si nr_ord a test_item al acestuia
    const pathname = window.location.pathname;
    const segments = pathname.split('/');
    const newPathname = segments.slice(0, -1).join('/');

    let newId = indexAllItems-1;
    if (newId < 0) {
        newId = allTeacherTests.length-1;
    }

    const previousAllTests = allTeacherTests[newId];
    const currentIdFormativeTest = previousAllTests.formative_test_id;
    handleClearTestBoard(currentIdFormativeTest);
    setIndexAllItems(newId);

    const newUrlTest = `${newPathname}/${previousAllTests.order_item_test}?level=1&disciplina=${subject_id}`;
    //console.log('newUrlTest', newUrlTest);
    history.push(newUrlTest);

    dispatch(fetchCurrentIndexTest(previousAllTests.order_formative_test-1));
    setCurrentItemIndex(previousAllTests.order_item_test-1);
    // setCorrectAnswer(null);
    if (wrapperRef.current) {
      const height = wrapperRef.current.scrollHeight;
      setWrapperHeight(height);
    }
  };

  const handleSliderClick = (newId) => {
    const currentId = parseInt(window.location.pathname.split('/').pop(), 10);

    const currentFormativeTest = allTeacherTests[currentId-1];
    // console.log(newId)
    // console.log(currentId)
    // console.log(allTeacherTests[currentId-1])
    const currentIdFormativeTest = currentFormativeTest.formative_test_id;
    handleClearTestBoard(currentIdFormativeTest);

    // console.log("newId", newId, "ind", newId-1)
    setIndexAllItems(newId-1)
    const basePath = window.location.pathname.replace(`/${currentId}`, '');
    const newUrl = `${basePath}/${newId}?level=1&disciplina=${subject_id}`;
    history.push(newUrl);

    const previousFormativeTest = allTeacherTests[newId-1];
    const previousIndexFormativeTest = previousFormativeTest.order_formative_test - 1;
    dispatch(fetchCurrentIndexTest(previousIndexFormativeTest));
    const previousIndexItemTest = previousFormativeTest.order_item_test - 1;
    setCurrentItemIndex(previousIndexItemTest);
    setCorrectAnswer(null);
   };

   const handleTimerFinish = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    history.push('/home');
  };

  const finishExam = () => {
    setForceStopTimer(true); // Setează flag-ul pentru a forța oprirea timerului
    handleTimerFinish(); // Deschide forma modală
  };

  // console.log('wrapperHeight', wrapperHeight)
  // console.log(wrapperRef.current && wrapperRef.current.getBoundingClientRect().height)
  // console.log('count', Math.round(wrapperHeight/80))
  console.log("allTeacherTests",allTeacherTests)
  console.log("indexAllItems", indexAllItems)
  console.log("allTeacherTests[indexAllItems]",allTeacherTests[indexAllItems])
  // console.log("correctAnswer", correctAnswer)
  // console.log("setCorrectAnswer", setCorrectAnswer)
  // console.log("additionalContent",additionalContent)
  // console.log("handleTryAgain", handleTryAgain)
  // console.log("clearAll", clearAll)
  // console.log("setClearAll", setClearAll)
  // console.log("currentItemIndex", currentItemIndex)
  // console.log("setResponseReceived", setResponseReceived)
  // console.log("setWrapperHeight", setWrapperHeight)

  return (
    <>
      <Navbar />
      <Wrapper>

        {allTeacherTests && allTeacherTests.length > 0 && (
          <>
            <Breadcrumb step={1} />
            <Timer 
              reset={resetTimer} 
              setResetTimer={setResetTimer} 
              onFinish={handleTimerFinish}
              forceStop={forceStopTimer} />
            <TitleBox
              className="teme-container"
              proc={proc}
            >
              {allTeacherTests[indexAllItems].type === "testGeneralizator"
                ? allTeacherTests[indexAllItems].name +
                  "  " +
                  `  ${currentItemIndex + 1} / ${allTeacherTests.length}`
                : allTeacherTests[indexAllItems].name}
            </TitleBox>
            <div ref={wrapperRef}>
              {allTeacherTests[indexAllItems].type === "quiz" && (
                <TestQuiz
                  list={allTeacherTests}
                  currentIndex={indexAllItems}
                  correctAnswer={correctAnswer}
                  setCorrectAnswer={setCorrectAnswer}
                  additionalContent={additionalContent}
                  handleTryAgain={handleTryAgain}
                  currentItemIndex={currentItemIndex}
                  responseReceived={responseReceived}
                  setResponseReceived={setResponseReceived}
                  setWrapperHeight={setWrapperHeight}
                />
              )}
              {allTeacherTests[indexAllItems].type === "check" && (
                <TestCheck
                  list={allTeacherTests}
                  currentIndex={indexAllItems}
                  correctAnswer={correctAnswer}
                  setCorrectAnswer={setCorrectAnswer}
                  additionalContent={additionalContent}
                  handleTryAgain={handleTryAgain}
                  clearAll = {clearAll}
                  setClearAll = {setClearAll}
                  currentItemIndex={currentItemIndex}
                  setResponseReceived={setResponseReceived}
                  setWrapperHeight={setWrapperHeight}
                />
              )}
              {allTeacherTests[indexAllItems].type === "words" && (
                <TestWords
                  list={allTeacherTests}
                  currentIndex={indexAllItems}
                  correctAnswer={correctAnswer}
                  setCorrectAnswer={setCorrectAnswer}
                  additionalContent={additionalContent}
                  handleTryAgain={handleTryAgain}
                  currentItemIndex={currentItemIndex}
                  setResponseReceived={setResponseReceived}
                  setWrapperHeight={setWrapperHeight}
                />
              )}
              {allTeacherTests[indexAllItems].type === "words_select" && (
                <TestWordsSelect
                  list={allTeacherTests}
                  currentIndex={indexAllItems}
                  correctAnswer={correctAnswer}
                  setCorrectAnswer={setCorrectAnswer}
                  additionalContent={additionalContent}
                  handleTryAgain={handleTryAgain}
                  currentItemIndex={currentItemIndex}
                  setResponseReceived={setResponseReceived}
                  setWrapperHeight={setWrapperHeight}
                />
              )}
              {allTeacherTests[indexAllItems].type === "snap" && (
                <TestSnap
                  list={allTeacherTests}
                  currentIndex={indexAllItems}
                  correctAnswer={correctAnswer}
                  setCorrectAnswer={setCorrectAnswer}
                  additionalContent={additionalContent}
                  handleTryAgain={handleTryAgain}
                  currentItemIndex={currentItemIndex}
                  setResponseReceived={setResponseReceived}
                  setWrapperHeight={setWrapperHeight}
                />
              )}
              {/* {allTeacherTests[indexAllItems].type === "testGeneralizator" && (
                <TestGeneralizator
                  list={allTeacherTests}
                  currentIndex={indexAllItems}
                  correctAnswer={correctAnswer}
                  setCorrectAnswer={setCorrectAnswer}
                  additionalContent={additionalContent}
                  handleTryAgain={handleTryAgain}
                  currentItemIndex={currentItemIndex}
                />
              )} */}
              {(allTeacherTests[indexAllItems].type === "dnd" ||
                allTeacherTests[indexAllItems].type === "dnd_chrono" ||
                allTeacherTests[indexAllItems].type === "dnd_chrono_double" ||
                allTeacherTests[indexAllItems].type === "dnd_group") && (
                <TestBoard
                  list={allTeacherTests}
                  currentIndex={indexAllItems}
                  correctAnswer={correctAnswer}
                  setCorrectAnswer={setCorrectAnswer}
                  additionalContent={additionalContent}
                  handleTryAgain={handleTryAgain}
                  DragDisable={false}
                  ref={testBoardRef}
                  currentItemIndex={currentItemIndex}
                  setResponseReceived={setResponseReceived}
                  setWrapperHeight={setWrapperHeight}
                />
              )}
            </div>
            {/* <ListNavigatie
              list={allTeacherTests}
              setCurrentList={setCurrentList1}
              correctAnswer={correctAnswer}
              setCorrectAnswer={setCorrectAnswer}
              setCurrentIndex={setCurrentItemIndex}
              handleClearTestBoard={handleClearTestBoard}
            /> */}
            <div className="nav-container">
              <div className="nav-link">
                <div onClick={handlePrevious}>
                  <img
                    src={process.env.PUBLIC_URL + "/images/navigation-left.png"}
                    alt=""
                  />
                  <p>Testul precedent</p>
                </div>
              </div>
              <div className="nav-link">
                <div onClick={handleNext}>
                  <img
                    src={
                      process.env.PUBLIC_URL + "/images/navigation-right.png"
                    }
                    alt=""
                  />
                  <p>Testul următor</p>
                </div>
              </div>
            </div>
          </>
        )}

      </Wrapper>
      <VerticalTestMenu quizArray={allTeacherTests}
                        indexAllItems={indexAllItems} 
                        setIndexAllItems={setIndexAllItems}
                        handleSliderClick={handleSliderClick}
                        handleTryAgain={handleTryAgain}
                        finishExam = {finishExam}
      />
      {showModal && (
        <div className="examen-modal-overlay">
          <div className="examen-modal-content">
            <h2>Test finisat</h2>
            <p>{`Ai realizat ${Math.round(proc)}%`}</p>
            <button onClick={handleCloseModal}>Închide</button>
          </div>
        </div>
      )}
      {/* <VerticalSlider quizArray={allTeacherTests} 
                      currentIndex={indexAllItems} 
                      setCurrentIndex={setIndexAllItems}
                      slidesToShow={Math.min(Math.ceil(wrapperHeight/80),allTeacherTests.length)}
                      // slidesToShow={2}
                      destination="test" 
                      handleSliderClick={handleSliderClick}
                      // setShowResponse={setShowResponse}
                      // setShowCards={setShowCards}
                      // setIdRaspuns={setIdRaspuns}
                      // setIsAnswered={setIsAnswered}
                       /> */}
    </>
  );
};

const withRouterWrapper = withRouter(ExamenFinal);

export default withRouterWrapper;
