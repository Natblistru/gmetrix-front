import React, { useState, useContext, useEffect, useRef } from "react";
import { RaspunsuriCtx } from "../context/Raspunsuri";

import "./ModalForm.css";
const ModalForm = (props) => {
  const { add } = useContext(RaspunsuriCtx);
  const [rasp, SetRasp] = useState({
    text1: "",
    text2: "",
    text3: "",
  });
  const [activeTab, setActiveTab] = useState(1);
  const [modalPosition, setModalPosition] = useState({ x: 370, y: 270 });
  const [isShown, setIsShown] = useState(false);
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
      y: prevPosition.y - 10,
    }));
  };

  const moveDown = () => {
    setModalPosition((prevPosition) => ({
      ...prevPosition,
      y: prevPosition.y + 10,
    }));
  };

  const moveLeft = () => {
    setModalPosition((prevPosition) => ({
      ...prevPosition,
      x: prevPosition.x - 10,
    }));
  };

  const moveRight = () => {
    setModalPosition((prevPosition) => ({
      ...prevPosition,
      x: prevPosition.x + 10,
    }));
  };
  const handleResponse = () => {
    const IdRasp = Date.now();
    // console.log({ ...rasp, id: IdRasp });
    add({ ...rasp, id: IdRasp });

    props.onClick({ ...rasp, id: IdRasp });
    SetRasp({ text1: "", text2: "", text3: "" });
  };

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
              <label>
                {props.item.quizArray[props.currentIndex].cerinte[1]}
              </label>
              <textarea
                value={rasp.text1}
                onChange={(e) => SetRasp({ ...rasp, text1: e.target.value })}
                rows="5"
              ></textarea>
            </div>
          </div>
          <div className={activeTab === 2 ? "active" : ""}>
            <div>
              <label>
                {props.item.quizArray[props.currentIndex].cerinte[2]}
              </label>
              <textarea
                value={rasp.text2}
                onChange={(e) => SetRasp({ ...rasp, text2: e.target.value })}
                rows="5"
              ></textarea>
            </div>
          </div>
          <div className={activeTab === 3 ? "active" : ""}>
            <div>
              <div style={{ display: "flex" }}>
                <label>
                  {props.item.quizArray[props.currentIndex].cerinte[3]}
                </label>
                <div className="popup-menu-container">
                  <button className="btn-reper" onClick={handleButtonClick}>
                    Cuvinte de refetință
                  </button>
                  <div className={`popup-menu ${isShown ? "shown" : ""}`}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {props.item.quizArray[
                        props.currentIndex
                      ].cuvinteReferinta.map((cuv, idx) => (
                        <span key={idx}>{cuv}</span>
                      ))}
                    </div>
                    <button
                      onClick={handleToggleButtonClick}
                      className="btn-close-modal"
                    ></button>
                  </div>
                </div>
              </div>
              <textarea
                value={rasp.text3}
                onChange={(e) => SetRasp({ ...rasp, text3: e.target.value })}
                rows="5"
              ></textarea>
            </div>
          </div>
          <div className="button-nav">
            <button className="btn" onClick={handleResponse}>
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
        <button
          className="btn-close-modal"
          onClick={() => props.onClick(null)}
        ></button>
      </div>
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
