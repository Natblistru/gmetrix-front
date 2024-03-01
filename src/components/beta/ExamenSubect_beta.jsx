import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import temeIstoriArray from "../../data/temeIstoria";
import Navbar from "../layouts/Navbar";
import Wrapper from "../Wrapper";
import VerticalSlider from "../Slider/VerticalSlider";
import Breadcrumb from "../Breadcrumb";

import {
  fetchTheme,
  fetchEvaluation_all } from "../../routes/api";
import {
    updateTopicBreadcrumb,
    updateCurrentTheme,
    fetchEvaluationsSuccess,
  } from "../ReduxComp/actions";  
import FlipCardNou from "../FlipCards/FlipCardNou";
import EvaluationSubject1_beta from "./EvaluationSubject1_beta";
import EvaluationSubject2_beta from "./EvaluationSubject2_beta";
import EvaluationSubject3_beta from "./EvaluationSubject3_beta";
import TitleBox_beta from "./TitleBox_beta";

const ExamenSubect_beta = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { address, disciplina } = useParams();
  const wrapperRef = useRef(null);

  const [wrapperHeight, setWrapperHeight] = useState(0);
  const [idRaspuns, setIdRaspuns] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [text, setText] = useState("");
  const [indx, setIndx] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(null);
  const [textArray, setTextArray] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [showAutoevaluare, setShowAutoevaluare] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showCards, setShowCards] = useState(false);
  const speed = 50;
  let teacher;
  let theme;
  const capitole = useSelector((state) => state.capitole);
  const [temaObject, setTemaObject] = useState(null);

  const currentThemeObject = useSelector(state => state.currentTheme);
  // console.log(currentThemeObject)
  const currentTheme = currentThemeObject?.currentTheme || JSON.parse(localStorage.getItem('currentTheme'));
  // console.log(currentTheme)
  const evaluations_all = useSelector((state) => state.evaluations_all);
  const currentSubject = useSelector((state) => state.currentSubject);
  // console.log(currentSubject.currentSubject)
  const currentStudentObject = useSelector((state) => state.currentStudent);
  const currentStudent = currentStudentObject ? currentStudentObject.currentStudent : 1;

  const student_id = localStorage.getItem('auth_role') == 'student' ? currentStudent : 1;


  const subject_id =
    currentSubject.subject_id || currentSubject.currentSubject.subject_id;
  let subject_tema_id = 1

  const [linkTo, setLinkTo] = useState("");

  let quizArray = evaluations_all;
  // console.log(quizArray)

  useEffect(() => {
    // console.log("intrat")
    if (!currentSubject) {
      return;
    }
    const searchParams = new URLSearchParams(location.search);
    teacher = 1;

    theme = searchParams.get("theme");
    subject_tema_id = theme;
    // console.log(theme)
    const pathToFind = `/${disciplina}/${address}`;

    setLinkTo(`${pathToFind}?teacher=1&theme=${subject_tema_id}&level=1&disciplina=${subject_id}`);
    setTemaObject(theme);

    const level_id = 1;

    fetchTheme(teacher, theme, subject_id, level_id, dispatch, student_id);
    fetchEvaluations(theme);
    fetchEvaluation_all(theme, subject_id, level_id, dispatch);


    const tema = capitole.reduce(
      (result, item) =>
        result ||
        (item.subtitles || []).find(
          (subtitle) => subtitle.path_tema === pathToFind
        ),
      null
    );
    setTemaObject(tema);

    setProc(tema ? tema.tema_media : 0);

    if (tema != null) {
      dispatch(updateCurrentTheme(tema));

      const temaName = tema.tema_name;
      const temaid = tema.tema_id;
      const addressPath = `/${disciplina}/${address}?teacher=${teacher}&level=1&disciplina=${subject_id}&theme=${temaid}`;
      const newBreadcrumb = { name: temaName, path: addressPath };
      dispatch(updateTopicBreadcrumb(newBreadcrumb));
    }

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);



  }, [location.search]);
// }, [currentSubject, location.search]);

  const fetchEvaluations = async (theme) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/themeevaluations?level=1&disciplina=${subject_id}&theme=${theme}`
      );
      dispatch(fetchEvaluationsSuccess(res.data));
      // console.log(res.data)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (wrapperRef.current) {
      const height = wrapperRef.current.offsetHeight;
      setWrapperHeight(height);
    }
  }, []);

  useEffect(() => {
    quizArray = evaluations_all;

    const sumMaxPoints = quizArray.reduce(
      (acc, evaluation) => acc + parseFloat(evaluation.maxPoints),
      0
    );

    const sumStudentPoints = quizArray.reduce(
      (acc, evaluation) => acc + parseFloat(evaluation.student_points),
      0
    );

    // Calculați media din catul celor două sume
    const average = (sumStudentPoints * 100) / sumMaxPoints;

    setProc(average);
  }, [evaluations_all]);

  const [proc, setProc] = useState(quizArray[currentIndex]?.student_procent);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    theme = searchParams.get("theme");
    const teacher = searchParams.get("teacher");

    // console.log("Parametrul theme:", theme);
    // console.log("Parametrul teacher:", teacher);
  }, [location.search]);

  const initialization = () => {
    const newArray = Array(quizArray[currentIndex]?.form.length).fill("");
    setTextArray([...newArray]);
    if (wrapperRef.current) {
      const height = wrapperRef.current.scrollHeight;
      setWrapperHeight(height);
    }
  };

  useEffect(() => {
    initialization();
  }, [currentIndex]);

  useEffect(() => {
    if (currentTextIndex !== null) {
      setText(textArray[currentTextIndex]);
      if (currentTextIndex < textArray.length) {
        if (textArray[currentTextIndex].length == 0) {
          indx == 1 ? setIndx(0) : setIndx(1);
        } else setIndx(1);
      }
    }
  }, [currentTextIndex]);

  useEffect(() => {
    if (currentTextIndex !== null && currentTextIndex < textArray.length) {
      if (indx == text?.length || text?.length == 0) {
        if (currentTextIndex < textArray.length) {
          setCurrentTextIndex(currentTextIndex + 1);
        } else return;
      }

      const interval = setInterval(() => {
        setIndx((prevIdx) => (prevIdx >= text?.length ? prevIdx : prevIdx + 1));
      }, speed);

      return () => clearInterval(interval);
    }
  }, [indx, text]);

  const openModal = () => {
    if (!showResponse) setIsOpen(true);
  };

  const closeModal = (textRaspuns, idRasp) => {
    if (idRasp !== null) {
      setIdRaspuns(idRasp);
    }
    if (textRaspuns !== null) {
      if (textRaspuns.every((element) => element === "")) {
        setIsAnswered(false);
      } else {
        setTextArray([...textRaspuns]);
        setCurrentTextIndex(0);
        setIsAnswered(true);
      }
    }
    setIsOpen(false);
  };

  const handleTryAgain = async () => {
    setShowCards(false);

    let itemQuantity = quizArray.length;
    if (itemQuantity - 1 == currentIndex) {
      setCurrentIndex(0);
      let studentResults = [];
      try {
        const response = await axios.post(
          "http://localhost:8000/api/student-evaluation-results",
          {
            theme_id: subject_tema_id,
            subject_id: subject_id,
            study_level_id: 1,
            order_number: 1,
            studentId: currentStudent,
          }
        );

        // console.log(response.data);
        studentResults = response.data.studentEvaluationResults;
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
      // console.log(studentResults );
      try {
        const formDataArray = studentResults.map((column) => {
          const formData = new FormData();
          formData.append("student_id", column.student_id);
          formData.append("points", 0);
          formData.append(
            "evaluation_answer_option_id",
            column.evaluation_answer_option_id
          );
          formData.append("evaluation_answer_id", column.answer_id);
          formData.append("status", 0);
          return formData;
        });
        // console.log(formDataArray)

        axios
          .all(
            formDataArray.map((formData) =>
              axios.post(
                "http://localhost:8000/api/update-student-evaluation-answers",
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
              // console.log(responses);
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
                console.log(response.data.errors);
              });
            })
          );
      } catch (error) {
        console.error(error);
      }
    } else {
      setCurrentIndex(currentIndex + 1);
    }

    setIsAnswered(false);
    setShowResponse(false);
    if (wrapperRef.current) {
      const height = wrapperRef.current.scrollHeight;
      setWrapperHeight(height);
    }
    initialization();
    setCurrentTextIndex(0);
    setIdRaspuns(null);
  };

  const handleVerifica = () => {
    setShowResponse(true);
    if (wrapperRef.current) {
      const height = wrapperRef.current.scrollHeight;
      setWrapperHeight(height);
    }
  };

  const handleAutoevaluare = () => {
    setShowAutoevaluare(true);
  };

  const onCloseAutoevaluare = async (notaResult, newOptions) => {
    if (newOptions && newOptions.length > 0) {
      const theme = currentTheme.tema_id;
      const level_id = 1;

      await fetchEvaluation_all(theme, subject_id, level_id, dispatch);

      // console.log(evaluations_all);

      const quizItem = evaluations_all;
      // console.log(quizItem);

      const totalStudentPoints = quizArray.reduce((sum, evaluation, idx) => {
        const studentPoints =
          idx === currentIndex ? notaResult : evaluation.student_points;

        return sum + studentPoints;
      }, 0);

      const totalMaxPoints = quizArray.reduce(
        (sum, evaluation) => sum + evaluation.maxPoints,
        0
      );

      const procent = (totalStudentPoints / totalMaxPoints) * 100;
      setProc(procent);

      setSelectedOptions((prevOptions) => {
        let updatedOptions = [...prevOptions];

        newOptions.forEach((newOption) => {
          const existingIndex = updatedOptions.findIndex(
            (option) =>
              option.answer_id == newOption.answer_id &&
              option.student_id == newOption.student_id
          );

          if (existingIndex !== -1) {
            updatedOptions = updatedOptions.map((option, index) =>
              index == existingIndex
                ? {
                    ...option,
                    points: newOption.points,
                    evaluation_answer_option_id:
                      newOption.evaluation_answer_option_id,
                  }
                : option
            );
          } else {
            updatedOptions.push({ ...newOption });
          }
        });

        return updatedOptions;
      });
    }
    setShowAutoevaluare(false);
  };

  const handleNext = () => {
    let itemQuantity = quizArray.length;
    if (itemQuantity - 1 == currentIndex) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
    setShowResponse(false);
    setShowCards(false);
    initialization();
    setCurrentTextIndex(0);
    setIdRaspuns(null);
    setIsAnswered(false);
    if (wrapperRef.current) {
      const height = wrapperRef.current.scrollHeight;
      setWrapperHeight(height);
    }
  };

  const handlePrevious = () => {
    // console.log("quizArray", quizArray)
    let itemQuantity = quizArray.length;
    if (currentIndex === 0) {
      setCurrentIndex(itemQuantity - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
    setShowResponse(false);
    setShowCards(false);
    initialization();
    setCurrentTextIndex(0);
    setIdRaspuns(null);
    setIsAnswered(false);
    if (wrapperRef.current) {
      const height = wrapperRef.current.scrollHeight;
      setWrapperHeight(height);
    }
  };

  useEffect(() => {
    if (currentTheme) {
      const theme = currentTheme.tema_id;
      const level_id = 1;

      fetchEvaluation_all(theme, subject_id, level_id, dispatch);
      console.log("Valoarea lui proc a fost actualizată:", proc);
    }
  }, [proc]);

  const generateText = () => {
    const cerinta = quizArray[currentIndex]?.cerinta;
    const answersText = quizArray[currentIndex]?.answers.map((answer) => {
      const formattedAnswerText = answer.answer_text.replace(/\\n/g, "\n");
      const parts = formattedAnswerText.split(/<b>(.*?)<\/b>/g);

      return parts.map((part, index) => {
        if (index % 2 === 1) {
          return { text: part, bold: true };
        } else {
          return { text: part, newLine: true };
        }
      });
    });

    const finalText = [
      { text: cerinta },
      { text: "\n" },
      ...answersText.flat(),
    ];

    return finalText;
  };

  const toggleCards = () => {
    setShowCards(!showCards);
  };

  const sourceArray = quizArray[currentIndex]?.source?.filter(item => item.content !== null);

  let slidesToShow;
  switch (true) {
    case Boolean(quizArray[currentIndex]?.harta):
      slidesToShow = 11;
      break;
    case quizArray[currentIndex]?.order === 3:
      slidesToShow = 8;
      break;
    case sourceArray && sourceArray.length > 2:
      slidesToShow = 7;
      break;
    default:
      slidesToShow = 6;
  }

  // console.log(quizArray[currentIndex])
  console.log('wrapperHeight', wrapperHeight)
  console.log('count', Math.round(wrapperHeight/100))
  return (
    <div style={{position:'relative'}}>
      <Navbar />
      <Wrapper >

        {quizArray && (
          <>
          <Breadcrumb step={2} />
          <TitleBox_beta className="teme-container" proc={proc} sursa={quizArray[currentIndex]?.type_evaluation}>{quizArray[currentIndex]?.name}</TitleBox_beta>
          <div ref={wrapperRef}>
            {(() => {
              switch (quizArray[currentIndex]?.order) {
                case 1:
                  return <EvaluationSubject1_beta 
                  quizArray={quizArray}  
                  currentIndex={currentIndex}
                  currentTextIndex={currentTextIndex} 
                  isAnswered={isAnswered}
                  textArray={textArray}
                  indx={indx} 
                  openModal={openModal}
                  isOpen={isOpen}
                  closeModal={closeModal}
                  idRaspuns={idRaspuns}
                  handleVerifica={handleVerifica}
                  showResponse={showResponse}
                  generateText={generateText}
                  handleAutoevaluare={handleAutoevaluare}
                  showAutoevaluare={showAutoevaluare}
                  onCloseAutoevaluare={onCloseAutoevaluare}
                  toggleCards={toggleCards}
                  handleTryAgain={handleTryAgain}
                  setWrapperHeight={setWrapperHeight}
                  />;
                case 2:
                  return <EvaluationSubject2_beta 
                  quizArray={quizArray}  
                  currentIndex={currentIndex}
                  currentTextIndex={currentTextIndex} 
                  isAnswered={isAnswered}
                  textArray={textArray}
                  indx={indx} 
                  openModal={openModal}
                  isOpen={isOpen}
                  closeModal={closeModal}
                  idRaspuns={idRaspuns}
                  handleVerifica={handleVerifica}
                  showResponse={showResponse}
                  generateText={generateText}
                  handleAutoevaluare={handleAutoevaluare}
                  showAutoevaluare={showAutoevaluare}
                  onCloseAutoevaluare={onCloseAutoevaluare}
                  toggleCards={toggleCards}
                  handleTryAgain={handleTryAgain}
                  setWrapperHeight={setWrapperHeight}
                  />;
                case 3:
                  return <EvaluationSubject3_beta  
                  quizArray={quizArray}  
                  currentIndex={currentIndex}
                  currentTextIndex={currentTextIndex} 
                  isAnswered={isAnswered}
                  textArray={textArray}
                  indx={indx} 
                  openModal={openModal}
                  isOpen={isOpen}
                  closeModal={closeModal}
                  idRaspuns={idRaspuns}
                  handleVerifica={handleVerifica}
                  showResponse={showResponse}
                  generateText={generateText}
                  handleAutoevaluare={handleAutoevaluare}
                  showAutoevaluare={showAutoevaluare}
                  onCloseAutoevaluare={onCloseAutoevaluare}
                  toggleCards={toggleCards}
                  handleTryAgain={handleTryAgain}
                  setWrapperHeight={setWrapperHeight}
                  />;
                default:
                  return null; 
              }
            })()}
          </div>
            {showCards && (
              <div className="Cards">
                {quizArray[currentIndex]?.answers
                  .filter(
                    (answer) =>
                      answer?.answer_text != null && answer.answer_text !== ""
                  )
                  .map(
                    (answer) =>
                      answer &&
                      answer.answer_text != null && (
                        <FlipCardNou
                          title={answer.task}
                          key={answer.answer_id}
                          dangerousHTML={`<p style="padding:15px; text-indent:20px;">${answer?.answer_text.replace(
                            /\\n/g,
                            "<br />"
                          )}</p>\n`}
                        />
                      )
                  )}
              </div>
            )}

            <div className="nav-container">
              <div className="nav-link">
                <div onClick={handlePrevious}>
                  <img
                    src={process.env.PUBLIC_URL + "/images/navigation-left.png"}
                    alt=""
                  />
                  <p>Sarcina precedentă</p>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <button className="btn">
                  <Link className="small" to={linkTo}>STUDIAZĂ TEMA</Link>
                </button>
              </div>
              <div className="nav-link">
                <div onClick={handleNext}>
                  <img
                    src={
                      process.env.PUBLIC_URL + "/images/navigation-right.png"
                    }
                    alt=""
                  />
                  <p>Sarcina următoare</p>
                </div>
              </div>
            </div>
          </>
        )}

      </Wrapper>
      <VerticalSlider quizArray={quizArray} 
                      currentIndex={currentIndex} 
                      slidesToShow={Math.ceil(wrapperHeight/100)}
                      setCurrentIndex={setCurrentIndex}
                      setShowResponse={setShowResponse}
                      setShowCards={setShowCards}
                      setCurrentTextIndex={setCurrentTextIndex}
                      setIdRaspuns={setIdRaspuns}
                      setIsAnswered={setIsAnswered} />
    </div>
  );
};

export default ExamenSubect_beta;