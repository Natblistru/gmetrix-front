import React, { useState, useEffect } from "react";
import 'aos/dist/aos.css';
import AOS from 'aos';

const ItemAccordeon = (props) => {
  const [isOpen, setIsOpen] = useState(props.open===null? true : props.open);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    AOS.init(); 
  }, []);

  // let listItems = props.teme[0].subtitles[0].subjects;
  const classes = "block " + props.className;
  const isAnimationEnabled = props.className !== "non_animation";
  
  const togglAccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <section className={classes} data-aos={isAnimationEnabled ? "fade-up" : ""}>
      <button
        className={`accordion ${isOpen ? "active" : ""}`}
        onClick={toggleAccordion}
      >
        <header className="header">
          <h3>{props.titlu}</h3>
        </header>
      </button>
      {isOpen && (
        <>
          {props.correctAnswer!==null ? (
            <div>
              {/* Новое содержимое для correctAnswer=true */}
              {props.additionalContent}
              {props.children}
            </div>
          ) : (
            <div>
              {props.children}
            </div>
          )}
        </>
      )}
    </section>
  );
};
export default ItemAccordeon;
