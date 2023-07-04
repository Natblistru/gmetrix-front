import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { RaspunsuriCtx } from "../context/Raspunsuri";
import temeIstoriArray from "../../data/temeIstoria";
import Wrapper from "../Wrapper";
import Breadcrumb from "../Breadcrumb";
import TitleBox from "../TitleBox";
import ItemAccordeon from "../Accordeon/ItemAccordeon";
import AccordionSurse from "../Accordeon/AccordionSurse";
import ItemText from "../Accordeon/ItemText";
import ModalForm from "../Modal/ModalForm";

const ExamenSubect2 = () => {
  const { address } = useParams();
  const { raspunsuri } = useContext(RaspunsuriCtx);
  const [item, setItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);

  const [text, setText] = useState("");
  const [indx, setIndx] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(null);
  const [textArray, setTextArray] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const speed = 50;

  const history = useHistory();

  function findObjectWithAddress(obj) {
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        const found = findObjectWithAddress(obj[key]);
        if (found) {
          return found;
        }
      } else if (
        key === "addressAplicatie" &&
        obj[key] === "/" + address + "/examen-subiect2"
      ) {
        return obj;
      }
    }
    return null;
  }

  useEffect(() => {
    const foundItem = findObjectWithAddress(temeIstoriArray);
    if (foundItem) {
      setItem(foundItem);
    } else {
      history.push("/error");
    }
  }, []);

  const initialization = () => {
    const newArray = Array(
      item?.quizArray[currentIndex].item[currentItem].forma.length
    ).fill("");
    setTextArray([...newArray]);
  };

  useEffect(() => {
    initialization();
  }, [item]);

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

  const closeModal = (textRaspuns) => {
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
    setCurrentItem(
      item.quizArray[currentIndex].item.length - 1 === currentItem ? 0 : currentItem + 1
    );
    setIsAnswered(false);
    setShowResponse(false);
    initialization();
    setCurrentTextIndex(0);
  };

  const handleIndexTryAgain = () => {
    setCurrentIndex(
      item.quizArray.length - 1 === currentIndex ? 0 : currentIndex + 1
   );
   setIsAnswered(false);
   setShowResponse(false);
   initialization();
   setCurrentTextIndex(0);
   setCurrentItem(0);
  }

  const handleVerifica = () => {
    setShowResponse(true);
  };

  return (
    <Wrapper>
      {item && (
        <>
          <Breadcrumb list={item.breadcrumb} />
          <TitleBox className="teme-container">{item.name}</TitleBox>
          <ItemAccordeon
            titlu={`Cerințele sarcinii (${currentIndex + 1}/${
              item.quizArray.length
            }):`}
            open={true}
          >
            <ItemText>
              <p>{item.quizArray[currentIndex].cerinte[0]}</p>
              <AccordionSurse data={item.quizArray[currentIndex].sursa} />
              <h3 style={{ textAlign: 'center'}}>
                {`Item (${currentItem + 1}/${
                  item.quizArray[currentIndex].item.length
                }):`}
              </h3>
              <h4>{item.quizArray[currentIndex].item[currentItem].sursa}</h4>
              <p>{item.quizArray[currentIndex].item[currentItem].cerinte[0]} {item.quizArray[currentIndex].item[currentItem].afirmatia}{item.quizArray[currentIndex].item[currentItem].cerinte[1]}</p>              
              <div className="subject1-container">
                <div className="paper" style={{ width: "100%", height: '267px'}}>
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
                forma={item.quizArray[currentIndex].item[currentItem].forma}
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
              titlu={`Rezolvarea item (${currentItem + 1}/${
                item.quizArray[currentIndex].item.length
              }):`}
              open={true}
            >
              <ItemText classNameChild="">
                {item.quizArray[currentIndex].item[currentItem].raspuns}
              </ItemText>
              <button onClick={handleTryAgain} className="btn-test">
                Urmatorul item!
              </button>
              {item.quizArray[currentIndex].item.length - 1 === currentItem && (<button onClick={handleIndexTryAgain} className="btn-test">
                Urmatoarea sarcina!
              </button>) }             
            </ItemAccordeon>
          )}
        </>
      )}
    </Wrapper>
  );
};
export default ExamenSubect2;
