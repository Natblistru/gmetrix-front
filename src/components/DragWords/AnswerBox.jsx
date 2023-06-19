import React from 'react';
import Draggable from './Draggable';


const AnswerBox = ({ answers }) => {
  const handleDragStart = (e, id) => {
    if (e.dataTransfer) {
      e.dataTransfer.setData('text/plain', id);
    }
  };

  const renderedAnswers = answers.map(a => (
    <Draggable
      // bgcolor='rgba(255,255,255,0)'
      bgcolor='rgb(51, 122, 183)'
      key={a}
      name={a}
      onDragStart={handleDragStart}
    />
  ));

  return (
    <div className="block-styled-answers">
      <p>Variante de răspuns:</p>
      <div className="word-wrapper-answers">{renderedAnswers}</div>
    </div>
  );
};

export default AnswerBox;
