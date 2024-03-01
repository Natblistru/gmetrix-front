import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "./slick.css"; 
import "./slick-theme.css";
import "./../../index.css";
import CustomVerticalSlide from "./CustomVericalSlide";
import CustomVericalTestsSlide from "./CustomVericalTestsSlide";


// import { baseUrl } from "./public/images";

 
const VerticalSlider = ({
  quizArray, 
  currentIndex, 
  setCurrentIndex,
  slidesToShow,
  setShowResponse,
  setShowCards,
  setCurrentTextIndex,
  setIdRaspuns,
  setIsAnswered,
  destination,
  handleTryAgain
}) => {

  const [activeSlide, setActiveSlide] = useState(null);

  const settings = {
    dots: false,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
  }

  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  const handleClick = (index) => {
    setActiveSlide(index)
    setCurrentIndex(index)
    if(destination === "evaluare") {
      setShowResponse(false);
      setShowCards(false);
      setCurrentTextIndex(0);
      setIdRaspuns(null);
      setIsAnswered(false);
    } else if(destination === "test"){
      handleTryAgain();
    }
  };
  // console.log(quizArray[currentIndex])
  // console.log(destination === "test")

  return (
    <div style={{width:'100px', position:'absolute', top:'152px', right: '100px'}}>
      <Slider
        ref={slider => {
          sliderRef = slider;
        }}
        {...settings}
      >
        {quizArray?.map((evalItem, i) => {
          const ComponentToRender = destination === "evaluare" ? CustomVerticalSlide : CustomVericalTestsSlide;
          return (
            <ComponentToRender
              key={i}
              onClick={() => handleClick(i)}
              className={activeSlide === i ? "active-slide" : ""}
              evalitem={evalItem}
              idx={i + 1}
            />
          );
        })}
      </Slider>
      {/* <span> activeSlide: {activeSlide} </span> */}
      <div className="slick-prev1" onClick={() => previous()}>

      </div>
      <div className="slick-next1" onClick={() => next()}>
      </div>
    </div>
  );
}

export default VerticalSlider;