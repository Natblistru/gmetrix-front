import React, { useState } from "react";

const ItemAccordeon = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  let listItems = props.teme[0].subtitles[0].subjects;
  const classes = "block " + props.className;
  const togglAccordion = () => {
    setIsOpen(!isOpen);
  };


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
      {isOpen && <div>{props.children}</div>}
    </section>
  );
};
export default ItemAccordeon;
