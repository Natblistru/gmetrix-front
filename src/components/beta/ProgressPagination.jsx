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
            <SwiperSlide key={subjectIndex}>
              <div
                className={`flip-card-subtitle ${isRotated ? "rotate" : ""}`}
                onClick={toggleRotation}
              >
                <div className="flip-card-inner-subtitle">
                  <div className="flip-card-front-subtitle">
                    <p>{subject.sarcina}</p>
                  </div>
                  <div className="flip-card-back-subtitle">
                    <div
                      dangerouslySetInnerHTML={{ __html: subject.rezolvare }}
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <p>{subjectIndex+1}</p>
          </>
        ))}
      </Swiper>
    </>
  );
};

export default ProgressPagination;
