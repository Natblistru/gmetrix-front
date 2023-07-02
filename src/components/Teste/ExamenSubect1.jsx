import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { RaspunsuriCtx } from "../context/Raspunsuri";
import temeIstoriArray from "../../data/temeIstoria";
import Wrapper from "../Wrapper";
import Breadcrumb from "../Breadcrumb";
import TitleBox from "../TitleBox";
import ItemAccordeon from "../Accordeon/ItemAccordeon";
import ItemText from "../Accordeon/ItemText";
import ModalForm from "../Modal/ModalForm";

const ExamenSubect1 = () => {
  const { address } = useParams();
  const { raspunsuri } = useContext(RaspunsuriCtx);
  const [item, setItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const speed = 50;

  useEffect(() => {
    if (idx > text?.length) {
      return; // Stop the animation if idx exceeds the length of the text
    }
    const interval = setInterval(() => {
      setIdx((prevIdx) => (prevIdx >= text.length ? prevIdx : prevIdx + 1));
    }, speed);

    return () => clearInterval(interval);
  }, [text, idx]);

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
        obj[key] === "/" + address + "/examen-subiect1"
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
     console.log(textRaspuns);
     if(textRaspuns!==null) {
    if (!textRaspuns.text1 && !textRaspuns.text3) {
      setIsAnswered(false);
    } else {
      const obj = { ...textRaspuns };
      if (!textRaspuns.text3) setText(obj.text1 + obj.text2);
      else setText(obj.text1 + obj.text3);
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
  };

  return (
    <Wrapper>
      {item && (
        <>
          <Breadcrumb list={item.breadcrumb} />
          <TitleBox className="teme-container">{item.name}</TitleBox>
          <ItemAccordeon titlu="Cerințele sarcinii" open={true}>
            <ItemText>
              {console.log(currentIndex)}
              <p>{item.quizArray[currentIndex].cerinte[0]}</p>
              <div className="subject1-container">
                <div className="paper">
                  <div className="lines">
                    <div className="text">{text.slice(0, idx)}</div>
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
                  src={
                    process.env.PUBLIC_URL + item.quizArray[currentIndex].img
                  }
                  alt=""
                />
              </div>
            </ItemText>

            {isOpen && (
              <div className="modal-overlay">
                <ModalForm
                  onClick={closeModal}
                  item={item}
                  currentIndex={currentIndex}
                />
              </div>
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
export default ExamenSubect1;
