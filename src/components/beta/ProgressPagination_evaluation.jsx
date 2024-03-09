import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import SwiperCore from "swiper";

import "swiper/css/pagination";
import "swiper/css/navigation";
import "./swiper.css";
import AccordionSurse from "../Accordeon/AccordionSurse";
// import AccordionSurse from "./AccordionSurse_beta";

// SwiperCore.use([Pagination, Navigation]);

export const Modal = ({ src, alt, caption, onClose }) => {
  return (
    <div className="modalFlipImg">
      <span className="close" onClick={onClose}>
        &times;
      </span>
      <img className="modal-contentFlipImg" src={src} alt={alt} />
      {/* {caption.length > 0 && <div className="caption">{caption}</div>} */}
    </div>
  )
}


const ProgressPagination_evaluation = ({ cards }) => {
  const [isRotated, setIsRotated] = useState(false);
  const [cardList, setCardList] = useState(cards);
  // const swiperRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false)
  const showModal = () => setIsOpen(true)

  const toggleRotation = () => {
    setIsRotated(!isRotated);
  };

  const handleSlideChange = () => {
    setIsRotated(false);
    setIsOpen(false)
  };

  const handleStiuButtonClick = (subjectIndex) => {
    const updatedCards = cardList.filter(
      (card) => card.card_id !== subjectIndex
    );
    setCardList(updatedCards);
  };

  const handleResetList = () => {
    setCardList(cards);
  };

  return (
    <>
      {cardList.length === 0 && (
        <div className="d-flex flex-md-column justify-content-center align-content-center" style={{height: '500px'}}>
          <button className="btn-reper p-2" onClick={handleResetList}>
            Restabilește lista
          </button>
        </div>
      )}

      {cardList.length > 0 && (
        <Swiper
          pagination={{ type: "progressbar" }}
          navigation={true}
          modules={[Navigation, Pagination]}
          className="mySwiper"
          onSlideChange={handleSlideChange}
        >
          {cardList.map((subject, subjectIndex) => (
            <SwiperSlide
              key={subject.item_id}
              className="d-flex flex-md-column"
            >
              <div
                className={`flip-card-subtitle ${isRotated ? "rotate" : ""}`}
                // onClick={toggleRotation}
              >
                <div className="flip-card-inner-subtitle">
                  <div className="flip-card-front-subtitle">
                    <p onClick={toggleRotation}>{subject.cerinta}</p>
                    {subject.img && (
                      <>
                        <img
                          className="image"
                          src={`http://localhost:8000/${process.env.PUBLIC_URL + subject.img}`}
                          alt=""
                          onClick={showModal}
                          style={{ width: "50%" }}
                        />
                        {isOpen && (
                          <Modal
                            src={`http://localhost:8000/${process.env.PUBLIC_URL + subject.img}`}
                            alt=""
                            // caption="caption"
                            onClose={() => setIsOpen(false)}
                          />
                        )}
                      </>
                    )}
                    {subject.source && !isRotated && subject.source.filter(item => item.content !== null).length > 0 && (
                      <AccordionSurse data={subject.source.filter(item => item.content !== null)} />
                    )}
                  </div>
                  <div className="flip-card-back-subtitle d-flex flex-md-column gap-3">
                  {subject?.answers.map((answer) => (
                      <React.Fragment key={answer.answer_id}>
                        <p onClick={toggleRotation}
                          dangerouslySetInnerHTML={{
                            __html: answer.answer_text?.replace(/\\n/g, "<br />"),
                          }}
                        />
                      </React.Fragment>
                    ))}
                    <button
                      className="btn-reper p-2"
                      onClick={() => handleStiuButtonClick(subject.card_id)}
                    >
                      Stiu
                    </button>
                  </div>
                </div>
              </div>
              <p style={{ paddingTop: "10px" }}>
                {subjectIndex + 1} / {cardList.length}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default ProgressPagination_evaluation;
