import { useState, useEffect, useContext } from "react";
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

const ExamenSubect3 = () => {
  const { address } = useParams();
  const { raspunsuri } = useContext(RaspunsuriCtx);
  const [item, setItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [text, setText] = useState("");
  const [text1, setText1] = useState("");
  const [idx, setIdx] = useState(1);
  const [idx1, setIdx1] = useState(1);
  const [startNext, setStartNext] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const speed = 50;

  useEffect(() => {
    if (idx == text?.length) {
      setStartNext(true);
    }
    if (idx > text?.length) {
      return; // Stop the animation if idx exceeds the length of the text
    }
    const interval = setInterval(() => {
      setIdx((prevIdx) => (prevIdx >= text.length ? prevIdx : prevIdx + 1));
    }, speed);

    return () => clearInterval(interval);
  }, [text, idx]);

  useEffect(() => {
    if(startNext) {
    if (idx1 > text1?.length) {
      return; // Stop the animation if idx exceeds the length of the text
    }
    const interval1 = setInterval(() => {
      setIdx1((prevIdx1) => (prevIdx1 >= text1.length ? prevIdx1 : prevIdx1 + 1));
    }, speed);

    return () => clearInterval(interval1);
  }
  }, [text1, idx1,startNext]);

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
        obj[key] === "/" + address + "/examen-subiect3"
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
    setCurrentIndex(0);
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = (textRaspuns) => {
    //  console.log(textRaspuns);
     if(textRaspuns!==null) {
    if (!textRaspuns.text1 && !textRaspuns.text3) {
      setIsAnswered(false);
    } else {
      const obj = { ...textRaspuns };
      setText(obj.text1)
      if (!textRaspuns.text3) setText1(obj.text2);
      else setText1(obj.text3);
      setIdx(1);
      setIsAnswered(true);
    }
  }
    setIsOpen(false);
  };
  const handleTryAgain = () => {
    setCurrentIndex(
      item.quizArray.length - 1 === currentIndex ? 0 : currentIndex + 1
    );
    setIsAnswered(false);
    setShowResponse(false);
    setText("");
    setText1("");
    setIdx(1);
    setIdx1(1);
    setStartNext(false)
  };

  return (
    <Wrapper>
      {item && (
        <>
          <Breadcrumb list={item.breadcrumb} />
          <TitleBox className="teme-container">{item.name}</TitleBox>
          <ItemAccordeon titlu="Cerințele sarcinii" open={true}>
            <ItemText>
              {/* {console.log(currentIndex)} */}
              <p>{item.quizArray[currentIndex].cerinte[0]}</p>
              <AccordionSurse data={item.quizArray[currentIndex].sursa} />
              <p>{item.quizArray[currentIndex].cerinte[1]} <span style={{fontStyle: 'italic'}}>{item.quizArray[currentIndex].afirmatia}</span></p>
              <div
              style={{display: 'flex', flexDirection: 'column', fontStyle: 'italic', marginTop: '10px'}}
            >
              {item.quizArray[currentIndex].nota.map((paragraf, idx) => (
                <span key={idx}>{paragraf}</span>
              ))}
            </div>
              <div className="subject1-container">
                <div className="paper" style={{width: '100%'}}>
                  <div className="lines">
                    <div className="text">{text.slice(0, idx)} <br/>{startNext? text1.slice(0, idx1):""}</div>
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
                  item={item}
                  currentIndex={currentIndex}
                />
            )}
            {isAnswered === true && (
              <button
                onClick={() => setShowResponse(true)}
                className="btn-test"
              >
                Verifică răspunsul
              </button>
            )}
          </ItemAccordeon>
          {showResponse && (
            <ItemAccordeon
              titlu={`Rezolvarea sarcinii (${currentIndex + 1}/${
                item.quizArray.length
              }):`}
              open={true}
            >
              <ItemText classNameChild="">
                {item.quizArray[currentIndex].raspuns[0]}
                <br />
                {item.quizArray[currentIndex].raspuns[1]}
              </ItemText>
              <button onClick={handleTryAgain} className="btn-test">
                Încearcă din nou!
              </button>
            </ItemAccordeon>
          )}
        </>
      )}
    </Wrapper>
  );
};
export default ExamenSubect3;
