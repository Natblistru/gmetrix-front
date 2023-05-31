import React from "react";
import Slider from "react-slick";
import "./slick.css"; 
import "./slick-theme.css";
import "./../../index.css";
import CustomSlide from "./CustomSlide";

// import { baseUrl } from "./public/images";

 
export default class CustomArrows extends React.Component {
  render() {
    const { images } = this.props;
    const settings = {
      customPaging: function(i) {
        return (
          <a>
            <img src={process.env.PUBLIC_URL +images[i]}  
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
          {images.map((image, index) => (
            <CustomSlide key={index} image={image} />
          ))}
        </Slider>
      </div>
    );
  }
}