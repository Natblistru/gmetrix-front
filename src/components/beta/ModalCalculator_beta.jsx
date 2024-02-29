import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "../Modal/ModalCalculator.css";
import "../Modal/ModalForm.css";
import DraggableElement from "../DndTest/DraggableElement";

const SelectBox = ({
  options,
  activeTab,
  setActiveTab,
  nota,
  setNota,
  selectedOptions,
  setSelectedOptions,
  idx,
}) => {
  const [value, setValue] = useState(null);
  const [label, setLabel] = useState("Please select...");
  const [showing, setShowing] = useState(false);

  const onSelectorClick = () => {
    setShowing(!showing);
  };
  //  console.log(options)
  const onOptionClick = (option) => {
    // console.log(option)
    // console.log(nota)
    setValue(option.points);
    setLabel(option.label);
    setShowing(false);
    setSelectedOptions(
      selectedOptions.map((obj, index) => {
        if (index === idx) {
          return {
            ...obj,
            points: option.points,
            option_id: option.option_id,
            evaluation_answer_option_id: option.evaluation_answer_id,
          };
        } else {
          return obj;
        }
      })
    );

    // console.log("idx", idx)
    // console.log("option.subPoint", option.subPoint)
    setNota(
      nota.map((n, index) => {
        if (index === idx) {
          return option.points;
        } else {
          return n;
        }
      })
    );
    if (label == "Please select...") {
      setActiveTab(activeTab + 1);
    }
  };

  const renderOptions = (option, i) => {
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

const ModalCalculator_beta = ({ subject, currentIndex, onClick, idRaspuns }) => {
  // const evaluations1 = useSelector((state) => state.evaluations1);
  // const evaluations2 = useSelector((state) => state.evaluations2);
  // const evaluations3 = useSelector((state) => state.evaluations3);
  const evaluations_all = useSelector((state) => state.evaluations_all);
  const currentStudentObject = useSelector((state) => state.currentStudent);
  const currentStudent = currentStudentObject ? currentStudentObject.currentStudent : 1;
  let quizArray = evaluations_all;
  // if (subject == 1) {
  //   quizArray = evaluations1;
  // } else if (subject == 2) {
  //   quizArray = evaluations2;
  // } else if (subject == 3) {
  //   quizArray = evaluations3;
  // }

  const currentItem = quizArray[currentIndex];
  // console.log(currentItem);
  // console.log(currentItem.answers.length);

  const raspInitialArr = Array(currentItem.answers.length).fill(0);
  const [rasp, SetRasp] = useState([]);
  const initialNoteArray = Array(currentItem.answers.length).fill(0);
  const [nota, setNota] = useState(initialNoteArray);

  const initialSelectedOptions = [];

  currentItem.answers.forEach((element) => {
    const options_element = element.options[0];
    initialSelectedOptions.push({
      option_id: options_element.option_id,
      points: options_element.points,
      evaluation_answer_option_id: options_element.evaluation_answer_id,
      answer_id: element.answer_id,
    });
  });
  const [selectedOptions, setSelectedOptions] = useState(
    initialSelectedOptions
  );
  const [activeTab, setActiveTab] = useState(0);
  const [modalPosition, setModalPosition] = useState({ x: 370, y: 270 });

  useEffect(() => {
    if (idRaspuns !== null) {
      SetRasp(Array(currentItem.answers.length).fill(0));
    } else SetRasp(Array(currentItem.answers.length).fill(0));
  }, []);

  const handleResponse = async () => {
    // console.log(selectedOptions)
    const selectedOptionsToDB = selectedOptions.map((item) => {
      const { option_id, ...rest } = item;
      return { ...rest, student_id: currentStudent };
    });
    const options = [...selectedOptionsToDB];
    // console.log(options)
    await trimiteDateLaBackend(selectedOptionsToDB);
    // console.log(selectedOptionsToDB)
    SetRasp(raspInitialArr);
    setSelectedOptions(initialSelectedOptions);
    const notaResult = nota.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    onClick(notaResult, options);
  };

  const trimiteDateLaBackend = async (selectedOptionsToDB) => {
    try {
      for (const element of selectedOptionsToDB) {
        const response = await axios.post(
          "http://localhost:8000/api/student-evaluation-answers",
          element
        );

        if (response.status === 200) {
          console.log("Success:", response.data.message);
        } else {
          console.error("Error");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.log("Validation Errors:", error.response.data.errors);
      } else {
        console.error("Error:", error);
      }
    }
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
              style={{
                width: `${(activeTab / currentItem.answers.length) * 100}%`,
              }}
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
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                  idx={idx}
                />
              </div>
            ))}

            <div className="button-nav">
              <button className="btn" onClick={handleResponse}>
                Salveaza nota
              </button>

              <div className="points-nota">
                {nota.reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  0
                )}
              </div>
            </div>
          </div>
          <button
            className="btn-close-modal"
            onClick={() => onClick()}
          ></button>
        </div>
      </DraggableElement>
    </div>
  );
};

export default ModalCalculator_beta;
