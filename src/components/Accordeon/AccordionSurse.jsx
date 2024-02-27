import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "./AccordionSurse.css";

const AccordionSurse = ({ data }) => {
  const [accordionItems, setAccordionItems] = useState(() =>
    data.map((item) => ({ ...item, open: false }))
  );

  useEffect(() => {
    setAccordionItems(data)
  },[data])

  const handleClick = (item) => {
    const updatedAccordionItems = accordionItems.map((accItem) =>
      accItem === item ? { ...accItem, open: !accItem.open } : accItem
    );
    setAccordionItems(updatedAccordionItems);
  };
// console.log(accordionItems)

const surse = ["Sursa A.", "Sursa B.", "Sursa C.", "Sursa D.", "Sursa E.", "Sursa F.", "Sursa G.", "Sursa H.", "Sursa I."]; 
  return (
    <div className="accordion-surse">
      {accordionItems.map((item, index) => (
        <div key={item.order} onClick={() => handleClick(item)}>
          <div className="title-surse arrow-wrapper" >
            {/* <span className="title-text">{item.title}</span> */}
            <span className="title-text">{surse[index]}</span>            
            <FontAwesomeIcon
              icon={faAngleDown}
              className={`fa fa-angle-down ${item.open ? "fa-rotate-180" : ""}`}
            />
          </div>
          <div
            className={`content-surse ${item.open ? "content-surse-open" : ""}`}
          >
            <div
              className={`content-surse-text ${
                item.open ? "content-surse-text-open" : ""
              }`}
            >
              {Object.values(JSON.parse(item.content)).map((paragraf, idx) => (
                <span key={idx}>{paragraf}</span>
              ))}
            </div>
            <p
              className={`content-surse-text ${
                item.open ? "content-surse-text-open" : ""
              }`}
            >
              {item.author && item.author?.length > 0 ? `${item.author},` : null}
              <span>{item.sursaText}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionSurse;
