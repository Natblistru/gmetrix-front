import React, { useEffect, useRef } from "react";
import ItemAccordeon from "../Accordeon/ItemAccordeon";
import ItemText from "../Accordeon/ItemText";
import ModalForm from "../Modal/ModalForm";
import ModalCalculator from "./ModalCalculator_beta";
import PdfDownloadButton from "../PdfDownloadButton";
import AccordionSurse from "../Accordeon/AccordionSurse";
import Draw from "../CanvasDrawing/Draw";

const EvaluationSubject2_beta = ({
    quizArray,
    currentIndex,
    currentTextIndex,
    isAnswered,
    textArray,
    indx,
    openModal,
    isOpen,
    closeModal,
    idRaspuns,
    handleVerifica,
    showResponse,
    generateText,
    handleAutoevaluare,
    showAutoevaluare,
    onCloseAutoevaluare,
    toggleCards,
    handleTryAgain,
    setWrapperHeight
  }) => {
    const answerRef = useRef(null);

    useEffect(() => {
      if (answerRef.current) {
        const heightAnswer = answerRef.current.scrollHeight;
        if (showResponse) {
          setWrapperHeight(prevHeight => prevHeight + heightAnswer + 30);
        }
      }
    }, [showResponse]);

    const sourceArray = quizArray[currentIndex].source.filter(item => item.content !== null);
    // console.log(sourceArray)
  return (
    <>
      <ItemAccordeon
        titlu={`Cerințele sarcinii (${currentIndex + 1}/${
          quizArray.length
        }) - ${quizArray[currentIndex]?.maxPoints} puncte:`}
        open={true}
        className="non_animation"
      >
        <ItemText>
          <p>
            Studiază materialul suport și realizează sarcinile propuse.
          </p>
          <AccordionSurse data={sourceArray} />
          {/* <h3 style={{ textAlign: 'center'}}>
            {`Item (${currentItem + 1}/${
              item.quizArray[currentIndex].item.length
            }):`}
          </h3> */}
          <h4>{quizArray[currentIndex].cerinta}</h4>
          <p>{quizArray[currentIndex].afirmatie} </p>
          {/* {console.log(quizArray[currentIndex])} */}
          {/* {console.log(quizArray[currentIndex].harta)}  */}
          {quizArray[currentIndex].harta &&
            quizArray[currentIndex].harta.length > 0 && (
              <Draw
                item={quizArray[currentIndex]}
                disable={showResponse}
              />
            )}
          <div className="subject1-container">
            <div
              className="paper"
              style={{
                width: quizArray[currentIndex]?.procent_paper,
                height: "267px",
              }}
            >
              <div className="lines">
                <div className="text">
                  {currentTextIndex !== null &&
                    isAnswered &&
                    textArray?.map((textElem, ind) =>
                      currentTextIndex >= ind &&
                      typeof textElem === "string" ? (
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
        <div ref={answerRef}>
          <ItemAccordeon
            titlu={`Rezolvarea item (${currentIndex + 1}/${
              quizArray.length
            }):`}
            open={true}
            className="non_animation"
          >
            <ItemText classNameChild="">
              {quizArray[currentIndex].img && (
                <img
                  src={`http://localhost:8000/${
                    process.env.PUBLIC_URL + quizArray[currentIndex]?.img
                  }`}
                />
              )}
              {quizArray[currentIndex]?.answers.map((answer) => (
                <React.Fragment key={answer.answer_id}>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: answer.answer_text.replace(/\\n/g, "<br />"),
                    }}
                  />
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
                subject={2}
              />
            )}
            <button onClick={toggleCards} className="btn-test">
              Exersează!
            </button>
            <button onClick={handleTryAgain} className="btn-test">
              Urmatorul item!
            </button>
          </ItemAccordeon>
        </div>
      )}
    </>
  );
};

export default EvaluationSubject2_beta;
