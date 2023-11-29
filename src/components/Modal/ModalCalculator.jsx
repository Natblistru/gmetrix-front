import React, { useState, useContext, useEffect, useRef } from "react";
import ContextData from "../context/ContextData";
import { connect } from "react-redux";
import "./ModalCalculator.css";
import "./ModalForm.css";
import DraggableElement from "../DndTest/DraggableElement";
import ModalArrows from "./ModalArrows";

const SelectBox = ({ options, activeTab, setActiveTab,nota, setNota,idx }) => {
  const [value, setValue] = useState(null);
  const [label, setLabel] = useState("Please select...");
  const [showing, setShowing] = useState(false);

  const onSelectorClick = () => {
    setShowing(!showing);
  };

  const onOptionClick = (option) => {
    setValue(option.points);
    setLabel(option.label);
    setShowing(false);
    // console.log("idx", idx)
    // console.log("option.subPoint", option.subPoint)
    setNota(nota.map((n, index) => {
      if (index === idx) {
        return option.points;
      } else {
        return n;
      }
    }));
    if (label == "Please select...") {
      setActiveTab(activeTab + 1);
    }
  };

  const renderOptions = (option,i) => {
    let classNames = "selectbox-option";
    classNames += option.points === value ? " selected" : "";

    return (
      <div
        className={classNames}
        role="option"
        onClick={() => onOptionClick(option)}
        key={Number(option.points)}
      >
        {option.label}
      </div>
    );
  };

  let classNames = "selectbox-option-wrap";
  classNames += showing ? " showing" : "";

  return (
    <div className="selectbox" role="listbox">
      <div
        className="selectbox-selector"
        onClick={onSelectorClick}
        tabIndex="0"
      >
        {label}
      </div>
      <div className={classNames}>{options.map(renderOptions)}</div>
    </div>
  );
};

const ModalCalculator = ({ barem, currentIndex, onClick, idRaspuns, raspunsuri, update }) => {
  const {stateData, dispatchData} = React.useContext(ContextData)
  const quizArray = stateData.evaluations1;
  const currentItem = quizArray[currentIndex];
  // console.log(currentItem);
  // console.log(currentItem.answers.length);

  const raspInitialArr = Array(currentItem.answers.length).fill(0);
  const [rasp, SetRasp] = useState([]);
  const initialNoteArray = Array(currentItem.answers.length).fill(0);
  const [nota, setNota] = useState(initialNoteArray);
  const [activeTab, setActiveTab] = useState(0);
  const [modalPosition, setModalPosition] = useState({ x: 370, y: 270 });

   useEffect(() => {
    // console.log(idRaspuns);
    // console.log(raspunsuri);
    if (idRaspuns !== null) {
      // const foundRaspuns = raspunsuri.items.find(item => item.id === idRaspuns);
      // const valuesArray = Object.values(foundRaspuns).filter(value => value !== foundRaspuns.id);
      // SetRasp(valuesArray)
      SetRasp(Array(currentItem.answers.length).fill(0));
    } else SetRasp(Array(currentItem.answers.length).fill(0));
  }, []);



  const handleResponse = () => {
    update({ ...rasp, id: idRaspuns });
    SetRasp(raspInitialArr);
    const notaResult = nota.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    onClick(notaResult);
  };

  const handleChange = (e, idx) => {
    const updatedRasp = [...rasp]; 
    updatedRasp[idx] = e.target.value; 

    SetRasp(updatedRasp); // Устанавливаем обновленный массив в состояние
  };

  return (
    <div className="modal-overlay">
      <DraggableElement>
      <div
        className="modal-subject-calc"
        style={{
          top: `${modalPosition.y}px`,
          left: `${modalPosition.x}px`,
        }}
      >
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${(activeTab / currentItem.answers.length) * 100}%` }}
          >
            Step {activeTab} of {currentItem.answers.length}
          </div>
        </div>
        <div className="modal-content-select">
          {currentItem.answers.map((item, idx) => (
            <div className="selectbox-container" key={idx}>
              <p>{item.task}</p>
              <SelectBox
                options={item.options}
                setActiveTab={setActiveTab}
                activeTab={activeTab}
                nota={nota} 
                setNota={setNota}
                idx={idx}
              />
            </div>
          ))}

          <div className="button-nav">
            <button className="btn" onClick={handleResponse}>
              Salveaza nota
            </button>

            <div className="points-nota">{nota.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</div>
          </div>
        </div>
        <button className="btn-close-modal" onClick={() => onClick()}></button>
      </div>
      </DraggableElement>
    </div>
  );
};

const reduxState = (state) => ({
  raspunsuri: state.raspunsuri,
});

const reduxFunctions = (dispatch) => ({
  update: (item) => dispatch({ type: "UPDATE_ITEM", payload: item }),
});

export default connect(reduxState, reduxFunctions)(ModalCalculator);
