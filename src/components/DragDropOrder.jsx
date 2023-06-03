import React, { useState } from "react";
import "../index.css";

const DragDropOrder = (props) => {
  const [cardList, setCardList] = useState([
    { id: 1, order: 3, text: "România a intrat în Primul Război Mondial" },
    { id: 2, order: 1, text: "România a semnat Tratatul de la București" },
    { id: 3, order: 2, text: "România a câștigat o victorie importantă în Bătălia de la Mărăști" },
    { id: 4, order: 4, text: "Ocuparea Bucureștelui" },
  ]);
  const [currentCard, setCurrentCard] = useState(null);
  const dragStartHandler = (e, card) => {
    console.log("drag", card);
    setCurrentCard(card);
  };
  const dragEndHandler = (e) => {
    e.target.style.background = "white";
  };
  const dragOverHandler = (e) => {
    e.preventDefault();
    e.target.style.background = "lightgray";
  };
  const dropHandler = (e, card) => {
    e.preventDefault();
    setCardList(
      cardList.map((c) => {
        if (c.id === card.id) {
          return { ...c, order: currentCard.order };
        }
        if (c.id === currentCard.id) {
          return { ...c, order: card.order };
        }
        return c;
      })
    );
    e.target.style.background = "white";
  };

  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };
  return (
    <div className="wrapperChrono">
      {cardList.sort(sortCards).map((card) => (
        <div
          key={card.id}
          className="cardChrono"
          draggable={true}
          onDragStart={(e) => dragStartHandler(e, card)}
          onDragLeave={(e) => dragEndHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e, card)}
        >
          {card.text}
        </div>
      ))}
    </div>
  );
};
export default DragDropOrder;
