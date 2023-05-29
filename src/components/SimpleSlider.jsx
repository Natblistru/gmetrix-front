import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { baseUrl } from "./public/images";

const img_slider = {
    display: 'block',
    width: '90%',
    height: "400px",
    objectFit: 'cover',
    margin: '0 auto',
  };
export default class CenterMode extends React.Component {

    

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
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
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
          <div>
            <img src={process.env.PUBLIC_URL +'/images/abstract01.jpg'} style= {img_slider}/>
          </div>
          <div>
            <img src={process.env.PUBLIC_URL + '/images/abstract02.jpg'} style= {img_slider}/>
          </div>
          <div>
            <img src={process.env.PUBLIC_URL + '/images/abstract03.jpg'} style= {img_slider}/>
          </div>
        </Slider>
      </div>
    );
  }
}