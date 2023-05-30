import React from "react";
import Slider from "react-slick";
import "./slick.css"; 
import "./slick-theme.css";
import "./../../index.css";
import CustomSlide from "./CustomSlide";

// import { baseUrl } from "./public/images";

 
export default class CustomArrows extends React.Component {
  render() {
    const settings = {
      customPaging: function(i) {
        return (
          <a>
            <img src={process.env.PUBLIC_URL +`/images/abstract0${i + 1}.jpg`}  
                width="56" height="37" 
                 />
          </a>
        );
      },
      dots: true,
      arrows: false,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
    //   speed: 500,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      appendDots: dots => (
        <div>
          <ul style={{ display: "flex",
            justifyContent: "center",
            gap: "31px", }}> {dots} 
          </ul>
        </div>
      ),
    };
    return (
      <div>
        <h2></h2>
        <Slider {...settings} >
          <CustomSlide index={1} />
          <CustomSlide index={2} />
          <CustomSlide index={3} />
        </Slider>
      </div>
    );
  }
}