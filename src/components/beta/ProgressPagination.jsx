import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import SwiperCore from "swiper";

import "swiper/css/pagination";
import "swiper/css/navigation";
import "./swiper.css";

// SwiperCore.use([Pagination, Navigation]);

const ProgressPagination = ({ cards }) => {
  const [isRotated, setIsRotated] = useState(false);
  // const swiperRef = useRef(null);

  const toggleRotation = () => {
    setIsRotated(!isRotated);
  };

  const handleSlideChange = () => {
    setIsRotated(false);
  };

  return (
    <>
      <Swiper
        // ref={swiperRef}

        pagination={{ type: "progressbar" }}
        navigation={true}
        modules={[Navigation, Pagination]}
        className="mySwiper"
        onSlideChange={handleSlideChange}
      >
        {cards.map((subject, subjectIndex) => (
          <>
            <SwiperSlide key={subjectIndex} className="d-flex flex-md-column">
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
                    <button className="btn-reper p-2">Stiu</button>
                  </div>
                </div>
              </div>
              <p style={{paddingTop: '10px'}}>{subjectIndex+1} / {cards.length}</p>
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </>
  );
};

export default ProgressPagination;
