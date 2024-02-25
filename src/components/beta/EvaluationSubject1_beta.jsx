import React from "react";
import ItemAccordeon from "../Accordeon/ItemAccordeon";
import ItemText from "../Accordeon/ItemText";
import ModalForm from "../Modal/ModalForm";
import ModalCalculator from "../Modal/ModalCalculator";
import PdfDownloadButton from "../PdfDownloadButton";

const EvaluationSubject1_beta = ({
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
  }) => {
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
          <p>{quizArray[currentIndex]?.cerinta}</p>
          <div className="subject1-container">
            <div
              className="paper"
              style={{ width: quizArray[currentIndex]?.procent_paper }}
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
                            currentTextIndex == ind && indx < textElem.length
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
              src={`http://localhost:8000/${
                process.env.PUBLIC_URL + quizArray[currentIndex]?.img
              }`}
              alt=""
              style={{
                width: isNaN(
                  parseInt(quizArray[currentIndex]?.procent_paper, 10)
                )
                  ? "30%"
                  : `${
                      100 - parseInt(quizArray[currentIndex]?.procent_paper, 10)
                    }%`,
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
          className="non_animation"
        >
          <ItemText classNameChild="">
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
              subject={1}
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
    </>
  );
};

export default EvaluationSubject1_beta;
