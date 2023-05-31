import React, { useState } from 'react';
import '../index.css'

const Switch = (props) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    props.onChange();
  };

  return (
    <label className="label-switch">
      {props.label}
      <input className="switch"
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <span></span> 
    </label>
  );
};

export default Switch;