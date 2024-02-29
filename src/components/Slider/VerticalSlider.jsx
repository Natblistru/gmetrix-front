import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "./slick.css"; 
import "./slick-theme.css";
import "./../../index.css";
import CustomVerticalSlide from "./CustomVericalSlide";

// import { baseUrl } from "./public/images";

 
const VerticalSlider = ({
  quizArray, 
  currentIndex, 
  setCurrentIndex,
  setShowResponse,
  setShowCards,
  setCurrentTextIndex,
  setIdRaspuns,
  setIsAnswered
}) => {
  // const { images } = this.props;
  const sourceArray = quizArray[currentIndex]?.source.filter(item => item.content !== null);
  const [activeSlide, setActiveSlide] = useState(null);
  let slidesToShow;
  switch (true) {
    case Boolean(quizArray[currentIndex]?.harta):
      slidesToShow = 11;
      break;
    case quizArray[currentIndex]?.order === 3:
      slidesToShow = 8;
      break;
    case sourceArray && sourceArray.length > 2:
      slidesToShow = 7;
      break;
    default:
      slidesToShow = 6;
  }

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
    setShowResponse(false);
    setShowCards(false);
    setCurrentTextIndex(0);
    setIdRaspuns(null);
    setIsAnswered(false);
  };
  // console.log(quizArray[currentIndex])
  // console.log(quizArray)

  return (
    <div style={{width:'100px', position:'absolute', top:'152px', right: '100px'}}>
      <Slider
        ref={slider => {
          sliderRef = slider;
        }}
        {...settings}
      >
        {quizArray?.map((evalItem, i) => (
          <CustomVerticalSlide key={i} onClick={() => handleClick(i)} className={activeSlide === i ? "active-slide" : ""} evalitem={evalItem} idx={i+1}/>
        ))}
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