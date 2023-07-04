import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "./AccordionSurse.css";

const AccordionSurse = ({ data }) => {
  const [accordionItems, setAccordionItems] = useState(() =>
    data.map((item) => ({ ...item, open: false }))
  );
  const handleClick = (item) => {
    const updatedAccordionItems = accordionItems.map((accItem) =>
      accItem === item ? { ...accItem, open: !accItem.open } : accItem
    );
    setAccordionItems(updatedAccordionItems);
  };

  return (
    <div className="accordion-surse">
      {accordionItems.map((item) => (
        <div key={item.title}>
          <div className="title-surse arrow-wrapper" onClick={() => handleClick(item)}>
            <span className="title-text">{item.title}</span>
            {/* <div className="arrow-wrapper"> */}
            <FontAwesomeIcon
              icon={faAngleDown}
              className={`fa fa-angle-down ${item.open ? "fa-rotate-180" : ""}`}
            />
            {/* </div> */}
          </div>
          <div
            className={`content-surse ${item.open ? "content-surse-open" : ""}`}
          >
            <div
              className={`content-surse-text ${
                item.open ? "content-surse-text-open" : ""
              }`}
            >
              {item.content.map((paragraf, idx) => (
                <span key={idx}>{paragraf}</span>
              ))}
            </div>
            <p
              className={`content-surse-text ${
                item.open ? "content-surse-text-open" : ""
              }`}
            >
              {item.author.length > 0 ? `${item.author},` : null}
              <span>{item.sursaText}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionSurse;
