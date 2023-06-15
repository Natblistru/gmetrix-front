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
      bgcolor='rgba(255,255,255,0)'
      key={a}
      name={a}
      onDragStart={handleDragStart}
    />
  ));

  return (
    <div className="block-styled">
      Answers
      <div className="word-wrapper">{renderedAnswers}</div>
    </div>
  );
};

export default AnswerBox;
