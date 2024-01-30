import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

const Card = (props) => {
    const classes = "card " + props.className; 
    useEffect(() => {
        AOS.init(); 
      }, []);
    return (
        <div className={classes} data-aos="fade-up">
                {props.children}
        </div>
    )
}
export default Card;