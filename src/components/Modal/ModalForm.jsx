import React, { useState, useContext, useEffect, useRef } from "react";
import { connect } from "react-redux"
import { addRaspuns, updateRaspuns } from "../ReduxComp/actions";
import Popupmenu from "../Popupmenu";
import ModalArrows from "./ModalArrows";

import "./ModalForm.css";
const ModalForm = ({forma,onClick,idRaspuns,raspunsuri,addRaspuns, updateRaspuns}) => {
  const raspInitialArr = Array(
    forma.length
  ).fill("");
  const [rasp, SetRasp] = useState([]);

  const [activeTab, setActiveTab] = useState(1);
  const [modalPosition, setModalPosition] = useState({ x: 370, y: 270 });
  let hasPrev = activeTab > 1;
  let hasNext = activeTab < forma.length;



  useEffect(() => {
    // console.log(idRaspuns);
    // console.log(raspunsuri);    
    if(idRaspuns!==null) {
      const foundRaspuns = raspunsuri.items.find(item => item.id === idRaspuns);
      const valuesArray = Object.values(foundRaspuns).filter(value => value !== foundRaspuns.id);
      SetRasp(valuesArray)    
    } else SetRasp(Array(forma.length).fill(""))

  }, []);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const nextStep = () => {
    if (hasNext) setActiveTab(activeTab + 1);
  };

  const previousStep = () => {
    if (hasPrev) setActiveTab(activeTab - 1);
  };

  const handleResponse = () => {
    const IdRasp = Date.now();
    // console.log({ ...rasp, id: IdRasp });
    // console.log(idRaspuns);
    // console.log(IdRasp);
    if(idRaspuns===null){
      addRaspuns({ ...rasp, id: IdRasp });
     onClick(rasp, IdRasp);
    } else {
      updateRaspuns({ ...rasp, id: idRaspuns });
      onClick(rasp, idRaspuns);
    }

    SetRasp(raspInitialArr);
  };

  const handleChange = (e, idx) => {
    const updatedRasp = [...rasp]; // Создаем копию массива rasp
    updatedRasp[idx] = e.target.value; // Обновляем первый элемент массива

    SetRasp(updatedRasp); // Устанавливаем обновленный массив в состояние
  };

  return (
    <div className="modal-overlay">
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
            style={{ width: `${(activeTab / forma.length) * 100}%` }}
          >
            Step {activeTab} of {forma.length}
          </div>
        </div>
        <div className="navbar-subject">
          <ul>
          {forma.map((elem, idx) => (
               <li key={idx}
               className={activeTab === (idx+1) ? "active" : ""}
               onClick={() => handleTabClick(idx+1)}
             >
               Step {idx+1}
             </li>         
          ))}
          </ul>
        </div>
        <div className="modal-content">
          {forma.map((elem, idx) => (
            <div className={activeTab === idx + 1 ? "active" : ""} key={idx}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                  <label>
                    {elem.cerinte}
                  </label>
                  {elem.hint !== "[]" && (
                    <Popupmenu
                      hint={elem.hint}
                    />
                  )}
                </div>
                <textarea
                  value={rasp[idx]}
                  onChange={(e) => handleChange(e, idx)}
                  rows="5"
                ></textarea>
              </div>
            </div>
          ))}
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
          onClick={() => onClick(null,null)}
        ></button>
      </div>
      <ModalArrows setModalPosition={setModalPosition}/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  raspunsuri: state.raspunsuri,
});

const mapDispatchToProps = {
  addRaspuns,
  updateRaspuns,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm);
