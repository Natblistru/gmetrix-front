import React, {useState} from "react";
import Slider from "react-slick";
import "./slick.css"; 
import "./slick-theme.css";
import "./../../index.css";
import CustomVerticalSlide from "./CustomVericalSlide";

// import { baseUrl } from "./public/images";

 
const VerticalSlider = ({
  quizArray, 
  currentIndex, 
  setCurrentIndex
}) => {
  // const { images } = this.props;
  const sourceArray = quizArray[currentIndex].source.filter(item => item.content !== null);
  const [activeSlide, setActiveSlide] = useState(null);
  let slidesToShow;
  switch (true) {
    case Boolean(quizArray[currentIndex].harta):
      slidesToShow = 11;
      break;
    case quizArray[currentIndex].order === 3:
      slidesToShow = 8;
      break;
    case sourceArray.length > 2:
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
  const handleClick = (index) => {
    setActiveSlide(index)
    setCurrentIndex(index)
  };
  console.log(quizArray[currentIndex])
  console.log(quizArray)

  return (
    <div style={{width:'100px', position:'absolute', top:'152px', right: '100px'}}>
      <Slider {...settings} >
        {quizArray?.map((evalItem, i) => (
          <CustomVerticalSlide key={i} onClick={() => handleClick(i)} className={activeSlide === i ? "active-slide" : ""} evalItem={evalItem} idx={i+1}/>
        ))}
      </Slider>
      <span> activeSlide: {activeSlide} </span>
    </div>
  );
}

export default VerticalSlider;