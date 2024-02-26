import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux"
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
import PdfDownloadButton from "../PdfDownloadButton";
import FlipCardNou from "../FlipCards/FlipCardNou";
import Draw from "../CanvasDrawing/Draw";

const ExamenSubect3 = () => {
  const dispatch = useDispatch();
  const [idRaspuns, setIdRaspuns] = useState(null);
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
  const [showCards, setShowCards] = useState(false);
  const speed = 50;
  let theme;
  const currentThemeObject = useSelector(state => state.currentTheme);
  const currentTheme = currentThemeObject.currentTheme || JSON.parse(localStorage.getItem('currentTheme'));
  const evaluations3 = useSelector(state => state.evaluations3);
  const currentSubject = useSelector(state => state.currentSubject);
  const currentStudentObject = useSelector(state => state.currentStudent);
  const currentStudent = currentStudentObject ? currentStudentObject.currentStudent : 1;

  const subject_id = currentSubject.subject_id || currentSubject.currentSubject.subject_id;
  const subject_tema_id = currentSubject.tema_id || currentSubject.currentSubject.tema_id;

  let quizArray = evaluations3;
  // console.log(quizArray[currentIndex])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentTheme) {
          const theme = currentTheme.tema_id;
          const level_id = 1;
    
          await fetchEvaluation3(theme, subject_id, level_id, dispatch);
          quizArray = evaluations3;
        }
      } catch (error) {
        console.error('Eroare în timpul recuperării datelor:', error);
      }
    };
  
    fetchData();

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ''; 
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);

  }, []);

  useEffect(()=>{
    quizArray = evaluations3;
    const sumMaxPoints = quizArray.reduce((acc, evaluation) =>
    acc + parseFloat(evaluation.maxPoints), 0);

    const sumStudentPoints = quizArray.reduce((acc, evaluation) =>
      acc + parseFloat(evaluation.student_points), 0);

    // Calculați media din catul celor două sume
    const average = sumStudentPoints * 100 / sumMaxPoints;

    setProc(average)
    console.log("evaluations3", evaluations3)
  },[evaluations3])

  const [proc, setProc] = useState(quizArray[currentIndex]?.student_procent);

  const initialization = () => {
    const newArray = Array(quizArray[currentIndex]?.form.length).fill("");
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

    setShowCards(false);

    let itemQuantity = quizArray.length;
    if(itemQuantity - 1 == currentIndex) {
      setCurrentIndex(0)

      let studentResults = []
      try {
        const response = await axios.post('http://localhost:8000/api/student-evaluation-results', {
          theme_id: subject_tema_id,
          subject_id: subject_id,
          study_level_id: 1,
          order_number: 3,
          studentId: currentStudent,
        });

        // console.log(response.data);
        studentResults = response.data.studentEvaluationResults;
      } catch (error) {
        console.error('Error fetching data:', error.message);

      }
      // console.log(studentResults );

      const formDataArray = studentResults.map(column => {
        const formData = new FormData();
        formData.append('student_id', column.student_id );
        formData.append('points', 0 );
        formData.append('evaluation_answer_option_id', column.evaluation_answer_option_id );
        formData.append('evaluation_answer_id', column.answer_id );
        formData.append('status', 0 );
        return formData;
      });
      // console.log(formDataArray)

      axios.all(formDataArray.map(formData => axios.post('http://localhost:8000/api/update-student-evaluation-answers', formData)))
      .then(axios.spread((...responses) => {
        const successResponses = responses.filter(response => response.data.status === 200);
        const errorResponses = responses.filter(response => response.data.status === 404);
        // console.log(responses)
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

    if (newOptions && newOptions.length > 0) {
      const theme = currentTheme.tema_id
      const level_id = 1;

      await fetchEvaluation3(theme, subject_id, level_id, dispatch);

      // console.log("evaluations3",evaluations3)

      const quizItem = evaluations3;
      // console.log(quizItem)   

      const totalStudentPoints = quizArray.reduce((sum, evaluation, idx) => {
        const studentPoints = idx === currentIndex
          ? notaResult 
          : evaluation.student_points;
    
        return sum + studentPoints;
      }, 0);
    
      const totalMaxPoints = quizArray.reduce((sum, evaluation) =>
        sum + evaluation.maxPoints, 0);
    
      const procent = (totalStudentPoints / totalMaxPoints) * 100;
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
    }
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
    setShowCards(false);
    initialization();
    setCurrentTextIndex(0);
    setIdRaspuns(null);
    setIsAnswered(false);
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
  };

  useEffect(() => {
    if (currentTheme) {
    const theme = currentTheme.tema_id
    const level_id = 1;

    fetchEvaluation3(theme, subject_id, level_id, dispatch);
    console.log('Valoarea lui proc a fost actualizată:', proc);
    }
  }, [proc]);

  const generateText = () => {
    const cerinta = quizArray[currentIndex]?.cerinta;
    const answersText = quizArray[currentIndex]?.answers.map(answer => {
      if (answer?.answer_text != null) {
        const formattedAnswerText = answer.answer_text.replace(/\\n/g, '\n');
        const parts = formattedAnswerText.split(/<b>(.*?)<\/b>/g);
  
        return parts.map((part, index) => {
          if (index % 2 === 1) {
            return { text: part, bold: true };
          } else {
            return { text: part, newLine: true };
          }
        });
      } else {
        return null; // sau orice altceva, în funcție de cerințe
      }
    });
  
    const finalText = [{ text: cerinta }, { text: '\n' }, ...answersText.flat()];
  
    return finalText.filter(item => item !== null); // elimină elementele nule din finalText
  };
  
  
  
  
  
  

  const toggleCards = () => {
    setShowCards(!showCards);
  };

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
                <AccordionSurse data={quizArray[currentIndex]?.source} />
                <p>
                  {quizArray[currentIndex]?.afirmatie}{" "}
                  <span style={{ fontStyle: "italic", fontWeight: 'bold' }}>
                    {quizArray[currentIndex]?.cerinta}
                  </span>
                </p>
                {quizArray[currentIndex].harta &&
                  quizArray[currentIndex].harta.length > 0 && (
                    <Draw
                      item={quizArray[currentIndex]}
                      disable={showResponse}
                    />
                  )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontStyle: "italic",
                    marginTop: "10px",
                  }}
                >
                  {quizArray[currentIndex]?.nota.split('\n').map((paragraf, idx) => (
                    <span key={idx}>{paragraf}</span>
                  ))}
                </div>
                <div className="subject1-container">
                  <div className="paper" style={{ width: quizArray[currentIndex]?.procent_paper }}>
                    <div className="lines">
                      <div className="text">
                        {currentTextIndex !== null &&
                          isAnswered &&
                          textArray?.map((textElem, ind) =>
                            currentTextIndex >= ind && typeof textElem === 'string' ? (
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
                  forma={quizArray[currentIndex]?.form}
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
                {quizArray[currentIndex]?.answers.map(answer => (
                  <React.Fragment key={answer.answer_id}>
                    {answer && answer.answer_text != null && (
                      <p dangerouslySetInnerHTML={{ __html: answer.answer_text.replace(/\\n/g, '<br />') }} />
                    )}
                  </React.Fragment>
                ))}
                </ItemText>
                <PdfDownloadButton generateText={generateText} /> 
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
                <button onClick={toggleCards} className="btn-test">
                  Exersează!
                </button>
                <button onClick={handleTryAgain} className="btn-test">
                  Încearcă din nou!
                </button>
              </ItemAccordeon>
            )}
            {showCards && (
              <div className="Cards">
                {quizArray[currentIndex]?.answers
                  .filter(answer => answer?.answer_text != null && answer.answer_text !== "") 
                  .map(answer => (
                    answer && answer.answer_text != null && (
                      <FlipCardNou
                        title={answer.task}
                        key={answer.answer_id}
                        dangerousHTML={`<p style="padding:15px; text-indent:20px;">${answer?.answer_text.replace(/\\n/g, '<br />')}</p>\n`}
                      />
                    )
                  ))}
              </div>
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

export default ExamenSubect3;
