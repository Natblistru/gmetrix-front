import React from 'react';

const Draggable = ({ bgcolor, name, onDragStart}) => {
  const handleDragStart = e => {
    onDragStart(e, name);
  };

  return (
    <div className="word-box"
      bgcolor={bgcolor}
      style={{
        backgroundColor: bgcolor
      }}
      data-testid='answer'
      draggable='true'
      onDragStart={handleDragStart}
    >
      {name}
    </div>
  );
};

export default Draggable;
