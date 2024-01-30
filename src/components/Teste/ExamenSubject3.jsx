import React, { useState, useEffect, useContext } from "react";
import ContextData from "../context/ContextData";
import { useParams, useHistory, useLocation  } from "react-router-dom";
import { connect } from "react-redux"
import { fetchEvaluation3 } from "../../routes/api"
import axios from "axios";
// import temeIstoriArray from "../../data/temeIstoria";
import Navbar from "../layouts/Navbar";
import Wrapper from "../Wrapper";
import Breadcrumb from "../Breadcrumb";
import TitleBox from "../TitleBox";
import ItemAccordeon from "../Accordeon/ItemAccordeon";
import AccordionSurse from "../Accordeon/AccordionSurse";
import ItemText from "../Accordeon/ItemText";
import ModalForm from "../Modal/ModalForm";
import ModalCalculator from "../Modal/ModalCalculator";

const ExamenSubect3 = ({raspunsuri}) => {
  const {stateData, dispatchData} = React.useContext(ContextData)
  const { address } = useParams();
  const location = useLocation();
  const [idRaspuns, setIdRaspuns] = useState(null);
  const [item, setItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [text, setText] = useState("");
  const [indx, setIndx] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(null);
  const [textArray, setTextArray] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [showAutoevaluare, setShowAutoevaluare] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])
  const speed = 50;
  let theme;
  const history = useHistory();


  let quizArray = stateData.evaluations3;
  // console.log(quizArray[currentIndex])

  useEffect(() => {
    const fetchData = async () => {
      try {

        const theme = stateData.currentTheme.tema_id;
        const subject_id = stateData.currentSubject.subject_id;
        const level_id = 1;
  
        await fetchEvaluation3(theme, subject_id, level_id, dispatchData);
        quizArray = stateData.evaluations3;

      } catch (error) {
        console.error('Eroare în timpul recuperării datelor:', error);
      }
    };
  
    fetchData();
  }, []);

  const [proc, setProc] = useState(quizArray[currentIndex]?.student_procent);

  const initialization = () => {
    const newArray = Array(quizArray[currentIndex].form.length).fill("");
    setTextArray([...newArray]);
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

  useEffect(() => {
    // console.log(raspunsuri.items);
    // console.log(idRaspuns);
  }, [raspunsuri.items]);

  const openModal = () => {
    if (!showResponse) setIsOpen(true);
  };

  const closeModal = (textRaspuns,idRasp) => {
    if (idRasp !== null) {
      setIdRaspuns(idRasp)
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

    let itemQuantity = quizArray.length;
    if(itemQuantity - 1 == currentIndex) {
      setCurrentIndex(0)

      let studentResults = []
      try {
        const response = await axios.post('http://localhost:8000/api/student-evaluation-results', {
          theme_id: stateData.currentSubject.tema_id,
          subject_id: stateData.currentSubject.subject_id,
          study_level_id: stateData.currentSubject.study_level_id,
          order_number: 3,
          studentId: stateData.currentStudent,
        });

        // console.log(response.data);
        studentResults = response.data.studentEvaluationResults;
      } catch (error) {
        console.error('Error fetching data:', error.message);

      }
      console.log(studentResults );

      const formDataArray = studentResults.map(column => {
        const formData = new FormData();
        formData.append('student_id', column.student_id );
        formData.append('points', 0 );
        formData.append('evaluation_answer_option_id', column.evaluation_answer_option_id );
        formData.append('evaluation_answer_id', column.answer_id );
        formData.append('status', 0 );
        return formData;
      });
      console.log(formDataArray)

      axios.all(formDataArray.map(formData => axios.post('http://localhost:8000/api/update-student-evaluation-answers', formData)))
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


    } else {
      setCurrentIndex(currentIndex + 1)
    }

    setIsAnswered(false);
    setShowResponse(false);
    initialization();
    setCurrentTextIndex(0);
    setIdRaspuns(null);
  };

  const handleVerifica = () => {
    setShowResponse(true);
  };

  const handleAutoevaluare = () => {
    setShowAutoevaluare(true);
  }

  const onCloseAutoevaluare = async (notaResult, newOptions) => {

    const theme = stateData.currentTheme.tema_id
    const subject_id = stateData.currentSubject.subject_id;
    const level_id = 1;

    await fetchEvaluation3(theme, subject_id, level_id, dispatchData);

    // console.log("stateData.evaluations2",stateData.evaluations2)

    const quizItem = stateData.evaluations3;
    // console.log(quizItem)   

    const totalStudentProcent = quizItem.reduce((sum, quizItem, idx) => {
      const studentProcent = idx === currentIndex
        ? notaResult * 100 / parseFloat(quizItem.maxPoints)
        : parseFloat(quizItem.student_procent);

      return sum + studentProcent;
    }, 0);

    const procent = Math.round(totalStudentProcent / quizArray.length);
    setProc(procent)
    // console.log("procent",procent)

    setSelectedOptions((prevOptions) => {
      let updatedOptions = [...prevOptions];

      newOptions.forEach((newOption) => {
        const existingIndex = updatedOptions.findIndex(
          (option) => option.answer_id == newOption.answer_id && option.student_id == newOption.student_id
        );

        if (existingIndex !== -1) {
          updatedOptions = updatedOptions.map((option, index) =>
            index == existingIndex
              ? { ...option, points: newOption.points, evaluation_answer_option_id: newOption.evaluation_answer_option_id }
              : option
          );
        } else {
          updatedOptions.push({ ...newOption });
        }
      });

      return updatedOptions;
    });
    setShowAutoevaluare(false);
  }

  const handleNext = () => {
    let itemQuantity = quizArray.length;
    if(itemQuantity - 1 == currentIndex) {
      setCurrentIndex(0)
     } else {
      setCurrentIndex(currentIndex + 1)
    }
    setShowResponse(false);
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
  };

  useEffect(() => {
    const theme = stateData.currentTheme.tema_id
    const subject_id = stateData.currentSubject.subject_id;
    const level_id = 1;

    fetchEvaluation3(theme, subject_id, level_id, dispatchData);
    console.log('Valoarea lui proc a fost actualizată:', proc);
  }, [proc]);

  return (
    <>
      <Navbar />
      <Wrapper>
        {quizArray && (
          <>
            <Breadcrumb step={2} />
            <TitleBox className="teme-container" proc={proc}>{quizArray[currentIndex]?.name}</TitleBox>
            <ItemAccordeon
              titlu={`Cerințele sarcinii (${currentIndex + 1}/${
                quizArray.length
              }) - ${quizArray[currentIndex]?.maxPoints} puncte:`}
              open={true}
              className="non_animation"
            >
              <ItemText>
                <p>Studiază sursele:</p>
                <AccordionSurse data={quizArray[currentIndex].source} />
                <p>
                  {quizArray[currentIndex].afirmatie}{" "}
                  <span style={{ fontStyle: "italic", fontWeight: 'bold' }}>
                    {quizArray[currentIndex].cerinta}
                  </span>
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontStyle: "italic",
                    marginTop: "10px",
                  }}
                >
                  {quizArray[currentIndex].nota.split('\n').map((paragraf, idx) => (
                    <span key={idx}>{paragraf}</span>
                  ))}
                </div>
                <div className="subject1-container">
                  <div className="paper" style={{ width: quizArray[currentIndex]?.procent_paper }}>
                    <div className="lines">
                      <div className="text">
                        {currentTextIndex !== null &&
                          isAnswered &&
                          textArray.map((textElem, ind) =>
                            currentTextIndex >= ind ? (
                              <React.Fragment key={ind}>
                                {textElem.slice(
                                  0,
                                  currentTextIndex == ind &&
                                    indx < textElem.length
                                    ? indx
                                    : textElem.length
                                )}
                                <br />
                              </React.Fragment>
                            ) : null
                          )}
                      </div>
                    </div>
                    <div className="holes hole-top"></div>
                    <div className="holes hole-middle"></div>
                    <div className="holes hole-bottom"></div>
                    <img
                      className="edit-img"
                      src={process.env.PUBLIC_URL + "/images/edit-button.png"}
                      onClick={openModal}
                      alt=""
                    />
                  </div>
                </div>
              </ItemText>
              {isOpen && (
                <ModalForm
                  onClick={closeModal}
                  forma={quizArray[currentIndex].form}
                  idRaspuns={idRaspuns}
                />
              )}
              {isAnswered === true && (
                <button onClick={handleVerifica} className="btn-test">
                  Verifică răspunsul
                </button>
              )}
            </ItemAccordeon>
            {showResponse && (
              <ItemAccordeon
                titlu={`Rezolvarea sarcinii (${currentIndex + 1}/${
                  quizArray.length
                }):`}
                open={true}
                className="non_animation"
              >
                <ItemText classNameChild="">
                {quizArray[currentIndex]?.answers
                  .filter(answer => answer !== null && answer.answer_text !== null) // Filtrarea elementelor care nu sunt nule
                  .map(answer => (
                  <React.Fragment key={answer.answer_id}>
                    {answer.answer_text.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}
                </ItemText>
                <button onClick={handleAutoevaluare} className="btn-test">
                  Autoevaluiaza raspunsul!
                </button>
                {showAutoevaluare && (
                  <ModalCalculator
                    onClick={onCloseAutoevaluare}
                    idRaspuns={idRaspuns}
                    currentIndex={currentIndex}
                    subject={3}
                  />
                )}
                <button onClick={handleTryAgain} className="btn-test">
                  Încearcă din nou!
                </button>
              </ItemAccordeon>
            )}
            <div className="nav-container">
                <div className="nav-link" >
                  <div onClick={handlePrevious}>
                    <img src={process.env.PUBLIC_URL + "/images/navigation-left.png"} alt="" />
                    <p>Sarcina precedentă</p>
                  </div>
                </div>
                <div className="nav-link" >
                  <div onClick={handleNext} >        
                    <img src={process.env.PUBLIC_URL + "/images/navigation-right.png"} alt="" />
                    <p>Sarcina următoare</p>
                  </div>
                </div>
            </div>
          </>
        )}
      </Wrapper>
    </>
  );
};
const reduxState = (state) => ({
  raspunsuri: state.raspunsuri,
});
export default connect(reduxState)(ExamenSubect3);
