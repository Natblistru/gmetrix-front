import React, {useState} from "react";
import Slider from "react-slick";
import "./slick.css"; 
import "./slick-theme.css";
import "./../../index.css";
import CustomVerticalSlide from "./CustomVericalSlide";

// import { baseUrl } from "./public/images";

 
const VerticalSlider = () => {
  // const { images } = this.props;
  const [activeSlide, setActiveSlide] = useState(null);
  const settings = {
    dots: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    centerPadding: "60px",
  }
  const handleClick = (index) => {
    setActiveSlide(index)
  };

  return (
    <div style={{width:'100px', position:'absolute', top:'152px', right: '100px'}}>
      <Slider {...settings} >
        {Array.from({ length: 50 }, (_, i) => (
          <CustomVerticalSlide key={i} onClick={() => handleClick(i)} className={activeSlide === i ? "active-slide" : ""} />
        ))}
      </Slider>
      <span> activeSlide: {activeSlide} </span>
    </div>
  );
}

export default VerticalSlider;