import React, { useState } from 'react';

const RadioButton = ({value, checked, onChange, correctAnswer, text_additional  }) => {
  
  
  const handleClick = () => {
    if (!checked) {
      onChange(value);
    }
  };

  return (
    <div className={`ns-radio-btn ${checked ? 'checkedRadio' : ''}`} onClick={handleClick}>
      <input type="radio" value={value} checked={checked} onChange={() => {}} className="option-input radio"/>
      <span>
        {text_additional == null ? (
          value
        ) : (
          <span dangerouslySetInnerHTML={{ __html: text_additional }} />
        )}
      </span>
     </div>
  );
};

export default RadioButton;