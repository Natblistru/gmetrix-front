import React, { useState } from "react";

const ItemAccordeon = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // let listItems = props.teme[0].subtitles[0].subjects;
  const classes = "block " + props.className;
  const togglAccordion = () => {
    setIsOpen(!isOpen);
  };
  console.log(props.correctAnswer)
  return (
    <section className={classes}>
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
              {/* Старое содержимое */}
              {props.children}
            </div>
          )}
        </>
      )}
    </section>
  );
};
export default ItemAccordeon;
