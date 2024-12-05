import React from 'react';


const CheckBox = (props) => {
  const handleClick = () => {
    // props.onChange(!props.checked);
    props.onChange(props.value);
  };

  return (
    <div className={`ns-radio-btn ${props.checked ? 'checkedCheckbox' : ''}`} onClick={handleClick}>
      <input type="checkbox" checked={props.checked} onChange={() => {}} className="option-input" />
      <span>
        {props.text_additional == null ? (
            props.value
          ) : (
            <span dangerouslySetInnerHTML={{ __html: props.text_additional }} />
          )}
      </span>
    </div>
  );
};

export default CheckBox;
