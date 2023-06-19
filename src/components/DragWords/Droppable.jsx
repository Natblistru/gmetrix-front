import React, { useState } from 'react';

const Droppable = ({ bgcolor, children, groupName, ndx, onDrop }) => {
  // const [dropBgColor, setDropBgColor] = useState('#337ab7');
  const [dropBgColor, setDropBgColor] = useState('white');

  const handleDrop = e => {
    onDrop(e, groupName);
    setDropBgColor('#00b4d8');
  };

  const handleDragOver = e => {
    e.preventDefault();
    setDropBgColor('yellow');
  };

  const handleDragLeave = e => {
    e.preventDefault();
    setDropBgColor('#00b4d8');
    // setDropBgColor('white');
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
