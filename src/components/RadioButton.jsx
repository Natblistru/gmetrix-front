import React, { useState } from 'react';

const RadioButton = ({ value, checked, onChange, correctAnswer }) => {
  const handleClick = () => {
    if (!checked) {
      onChange(value);
    }
  };

  return (
    <div className={`ns-radio-btn ${checked ? 'checkedRadio' : ''}`} onClick={handleClick}>
      <input type="radio" value={value} checked={checked} onChange={() => {}} className="option-input"/>
      <span>{value}</span>
     </div>
  );
};

export default RadioButton;