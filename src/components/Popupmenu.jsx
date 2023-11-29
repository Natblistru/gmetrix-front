import React, { useState } from "react";
const Popupmenu = (props) => {
  const [isShown, setIsShown] = useState(false);
  const classes = "popup-menu-container " + props.className;

  const handleToggleButtonClick = () => {
    setIsShown((prevState) => !prevState);
  };
  const handleButtonClick = () => {
    if (isShown) {
      setIsShown(false);
    } else {
      setIsShown(true);
    }
  };
  // console.log(props.hint)
  const hintObject = JSON.parse(props.hint);

  const hintArray = Object.values(hintObject);

  return (
    <>
      {props.hint.length >
        0 && (
        <div className={classes}>
          <button className="btn-reper" onClick={handleButtonClick}>
            Sugestii
          </button>
          <div className={`popup-menu ${isShown ? "shown" : ""}`}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {hintArray.map((cuv, idx) => (
                <span key={idx}>{cuv}</span>
              ))}
            </div>
            <button
              onClick={handleToggleButtonClick}
              className="btn-close-modal"
            ></button>
          </div>
        </div>
      )}
    </>
  );
};
export default Popupmenu;
