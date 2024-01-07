import React, { useState, useEffect, useContext } from "react";
import ContextData from "../context/ContextData";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
// import temeIstoriArray from "../../data/temeIstoria";
import Navbar from "../layouts/Navbar";
import Wrapper from "../Wrapper";
import Breadcrumb from "../Breadcrumb";
import TitleBox from "../TitleBox";
import ItemAccordeon from "../Accordeon/ItemAccordeon";
import ItemText from "../Accordeon/ItemText";
import ModalForm from "../Modal/ModalForm";
import ModalCalculator from "../Modal/ModalCalculator";

const ExamenSubect1 = ({ raspunsuri }) => {
  const {stateData, dispatchData} = React.useContext(ContextData)
  const { address } = useParams();
  const location = useLocation();
  // const [quizArray,setQuizArray] = useState([]);

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
  const speed = 50;

  const history = useHistory();
  let theme;

  function findObjectWithAddress(obj) {
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        const found = findObjectWithAddress(obj[key]);
        if (found) {
          return found;
        }
      } else if (
        key === "addressAplicatie" &&
        obj[key] === "/" + address + "/examen-subiect1"
      ) {
        return obj;
      }
    }
    return null;
  }
  let quizArray = stateData.evaluations1;
  useEffect(() => {
    quizArray = stateData.evaluations1;
    // console.log(quizArray)
    // const foundItem = findObjectWithAddress(temeIstoriArray);
    // if (foundItem) {
    //   setItem(foundItem);
    // } else {
    //   history.push("/error");
    // }
  }, []);

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
  //  console.log(idRaspuns);
  }, [raspunsuri.items]);

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

  const handleTryAgain = () => {
    setCurrentIndex(
      quizArray.length - 1 === currentIndex ? 0 : currentIndex + 1
    );
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

  const onCloseAutoevaluare = (notaResult) => {
    setShowAutoevaluare(false);
  }

  return (
    <>
      <Navbar />
      <Wrapper>
        {quizArray && (
          <>
            <Breadcrumb step={2} />
            <TitleBox className="teme-container" proc={quizArray[currentIndex]?.student_procent} >{quizArray[currentIndex]?.name}</TitleBox>
            <ItemAccordeon
              titlu={`Cerințele sarcinii (${currentIndex + 1}/${
                quizArray.length
              }) - ${quizArray[currentIndex]?.maxPoints} puncte:`}
              open={true}
            >
              <ItemText>
                <p>{quizArray[currentIndex]?.cerinta}</p>
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
                          )}{" "}
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
                  <img
                    className="img-subject"
                    src={`http://localhost:8000/${process.env.PUBLIC_URL + quizArray[currentIndex]?.img}`}
                    alt=""
                    style={{
                      width: isNaN(parseInt(quizArray[currentIndex]?.procent_paper, 10))
                        ? '30%'
                        : `${100 - parseInt(quizArray[currentIndex]?.procent_paper, 10)}%`
                    }}
                  />
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
              >
                <ItemText classNameChild="">
                  {quizArray[currentIndex]?.answers.map(answer => (
                    <React.Fragment key={answer.answer_id}>
                      {answer.answer_text}
                      <br />
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
                    subject={1}
                  />
                )}
                <button onClick={handleTryAgain} className="btn-test">
                  Încearcă din nou!
                </button>
              </ItemAccordeon>
            )}
          </>
        )}
      </Wrapper>
    </>
  );
};

const reduxState = (state) => ({
  raspunsuri: state.raspunsuri,
});
export default connect(reduxState)(ExamenSubect1);
