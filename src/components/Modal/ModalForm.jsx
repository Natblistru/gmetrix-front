import React, { useState } from "react";
import "./ModalForm.css";
const ModalForm = (props) => {
  const [activeTab, setActiveTab] = useState(1);
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

  return (
    <div className="modal-subject">
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
            Submit
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
    </div>
  );
};
export default ModalForm;
