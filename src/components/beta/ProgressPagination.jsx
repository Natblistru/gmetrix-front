import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import SwiperCore from "swiper";

import "swiper/css/pagination";
import "swiper/css/navigation";
import "./swiper.css";

// SwiperCore.use([Pagination, Navigation]);

const ProgressPagination = ({ cards }) => {
  const [isRotated, setIsRotated] = useState(false);
  const [cardList, setCardList] = useState(cards);
  // const swiperRef = useRef(null);

  const toggleRotation = () => {
    setIsRotated(!isRotated);
  };

  const handleSlideChange = () => {
    setIsRotated(false);
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
              key={subject.card_id}
              className="d-flex flex-md-column"
            >
              <div
                className={`flip-card-subtitle ${isRotated ? "rotate" : ""}`}
                onClick={toggleRotation}
              >
                <div className="flip-card-inner-subtitle">
                  <div className="flip-card-front-subtitle">
                    <p>{subject.sarcina}</p>
                  </div>
                  <div className="flip-card-back-subtitle d-flex flex-md-column gap-3">
                    <div
                      dangerouslySetInnerHTML={{ __html: subject.rezolvare }}
                    />
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

export default ProgressPagination;
