import React, { useState } from "react";
import "./ModalForm.css";
const ModalForm = (props) => {
  const [activeTab, setActiveTab] = useState(1);
  const [modalPosition, setModalPosition] = useState({ x: 370, y: 270 });
  let hasPrev = activeTab > 1;
  let hasNext = activeTab < 3;

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const nextStep = () => {
    if (hasNext) setActiveTab(activeTab + 1);
  };

  const previousStep = () => {
    if (hasPrev) setActiveTab(activeTab - 1);
  };

  const moveUp = () => {
    setModalPosition((prevPosition) => ({
      ...prevPosition,
      y: prevPosition.y - 10, // Измените значение сдвига по вертикали по вашему усмотрению
    }));
  };

  const moveDown = () => {
    setModalPosition((prevPosition) => ({
      ...prevPosition,
      y: prevPosition.y + 10, // Измените значение сдвига по вертикали по вашему усмотрению
    }));
  };

  const moveLeft = () => {
    setModalPosition((prevPosition) => ({
      ...prevPosition,
      x: prevPosition.x - 10, // Измените значение сдвига по горизонтали по вашему усмотрению
    }));
  };

  const moveRight = () => {
    setModalPosition((prevPosition) => ({
      ...prevPosition,
      x: prevPosition.x + 10, // Измените значение сдвига по горизонтали по вашему усмотрению
    }));
  };
  return (
    <>
      <div
        className="modal-subject"
        style={{
          top: `${modalPosition.y}px`,
          left: `${modalPosition.x}px`,
        }}
      >
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${(activeTab / 3) * 100}%` }}
          >
            Step {activeTab} of 3
          </div>
        </div>
        <div className="navbar-subject">
          <ul>
            <li
              className={activeTab === 1 ? "active" : ""}
              onClick={() => handleTabClick(1)}
            >
              Step 1
            </li>
            <li
              className={activeTab === 2 ? "active" : ""}
              onClick={() => handleTabClick(2)}
            >
              Step 2
            </li>
            <li
              className={activeTab === 3 ? "active" : ""}
              onClick={() => handleTabClick(3)}
            >
              Step 3
            </li>
          </ul>
        </div>
        <div className="modal-content">
          <div className={activeTab === 1 ? "active" : ""}>
            <div>
              <label>Message1</label>
              <textarea rows="5"></textarea>
            </div>
          </div>
          <div className={activeTab === 2 ? "active" : ""}>
            <div>
              <label>Message2</label>
              <textarea rows="5"></textarea>
            </div>
          </div>
          <div className={activeTab === 3 ? "active" : ""}>
            <div>
              <label>Message3</label>
              <textarea rows="5"></textarea>
            </div>
          </div>
          <div className="button-nav">
            <button className="btn" onClick={props.onClick}>
              Răspunde
            </button>
            <div className="button-group">
              <button
                className="btn prev"
                type="button"
                onClick={previousStep}
                style={{
                  display: !hasPrev ? "none" : "inline-block",
                }}
              >
                Back
              </button>
              <button
                className="btn next"
                type="button"
                onClick={nextStep}
                style={{
                  display: !hasNext ? "none" : "inline-block",
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <button className="btn-close-modal" onClick={props.onClick}></button>
      </div>
      {/* <div className="modal-arrows">
        <button className="arrow-btn" onClick={moveUp}>
          ↑
        </button>
        <button className="arrow-btn" onClick={moveDown}>
          ↓
        </button>
        <button className="arrow-btn" onClick={moveLeft}>
          ←
        </button>
        <button className="arrow-btn" onClick={moveRight}>
          →
        </button>
      </div> */}
      <div className="modal-arrows">
        <div className="arrow-container">
          <div className="arrow arrow--up" onClick={moveUp}>
            <div className="arrow-line arrow-line__upper"></div>
            <div className="arrow-line arrow-line__lower"></div>
          </div>
        </div>
        <div className="arrow-container">
          <div className="arrow arrow--back" onClick={moveLeft}>
            <div className="arrow-line arrow-line__upper"></div>
            <div className="arrow-line arrow-line__lower"></div>
          </div>
          <div className="arrow"></div>
          <div className="arrow arrow--next" onClick={moveRight}>
            <div className="arrow-line arrow-line__upper"></div>
            <div className="arrow-line arrow-line__lower"></div>
          </div>
        </div>
        <div className="arrow-container">
          <div className="arrow arrow--down" onClick={moveDown}>
            <div className="arrow-line arrow-line__upper"></div>
            <div className="arrow-line arrow-line__lower"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ModalForm;
