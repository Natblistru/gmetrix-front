import React, { useState } from 'react';

const Droppable = ({ bgcolor, children, groupName, ndx, onDrop }) => {
  const [dropBgColor, setDropBgColor] = useState('#337ab7');

  const handleDrop = e => {
    onDrop(e, groupName);
    setDropBgColor('#337ab7');
  };

  const handleDragOver = e => {
    e.preventDefault();
    setDropBgColor('yellow');
  };

  const handleDragLeave = e => {
    e.preventDefault();
    setDropBgColor('#337ab7');
  };

  return (
    <div className="word-box"
    style={{
      backgroundColor: bgcolor
        ? bgcolor
        : dropBgColor,
    }}
      bgcolor={bgcolor ? bgcolor : dropBgColor}
      data-testid={`droppable${ndx}`}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default Droppable;
