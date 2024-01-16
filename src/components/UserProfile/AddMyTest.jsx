import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import MyFormativeTest from './MyFormativeTest';

function AddMyTest({ onBackToList, userData }) {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [testListVisible, setTestListVisible] = useState(true);

  const handleToolClick = (tool) => {
    switch (tool) {
      case "quiz":
        setSelectedType(tool);
        setSelectedTitle("Quiz");
        break;
      case "check":
        setSelectedType(tool);
        setSelectedTitle("Check");
        break;
      case "snap":
        setSelectedType(tool);
        setSelectedTitle("Asocierea textelor");
        break;
      case "words":
        setSelectedType(tool);
        setSelectedTitle("Completarea lacunelor");
        break;
      case "dnd":
        setSelectedType(tool);
        setSelectedTitle("Drag'n'drop");
        break;
      case "dnd_chrono":
        setSelectedType(tool);
        setSelectedTitle("Drag'n'drop (chrono)");
        break;
      case "dnd_chrono_double":
        setSelectedType(tool);
        setSelectedTitle("Drag'n'drop (chrono double)");
        break;
      case "dnd_group":
        setSelectedType(tool);
        setSelectedTitle("Drag'n'drop group");
        break;
      default:
        setSelectedType(tool);
        setSelectedTitle("Quiz");
        break;
    }
    setTestListVisible(false);
  };
  
  const handleBackToList = () => {
    onBackToList();
  };

  return (
    <div className="container-fluid my-2">
      <h2 style={{ paddingLeft: '50px'}}>
        Adaugarea testului formativ
        <button
          onClick={handleBackToList}
          type="button"
          className="btnBts btn-primary text-white px-4 float-end"
        >
          BACK to List
        </button>
      </h2>
      <div className="clearfix" id="myTabContent" style={{ marginTop: '40px'}}>

      <CSSTransition
        in={testListVisible}
        timeout={300}
        classNames="my-topic-transition"
        unmountOnExit
      >
      <div className="test-list">
        <div className="toolboxContainer" onClick={() => handleToolClick('quiz')}>
          <div className="minor toolbox">
            <img
              className="toolPreviewImage"
              src={process.env.PUBLIC_URL + "/images/quiz.png"}
              // onClick={openModal}
              alt=""
            />
            <div className="toolboxTitle">Quiz</div>
          </div>
        </div>

        <div className="toolboxContainer" onClick={() => handleToolClick('check')}>
          <div className="minor toolbox">
            <img
              className="toolPreviewImage"
              src={process.env.PUBLIC_URL + "/images/check.png"}
              // onClick={openModal}
              alt=""
            />
            <div className="toolboxTitle">Check</div>
          </div>
        </div>

        <div className="toolboxContainer" onClick={() => handleToolClick('words')}>
          <div className="minor toolbox">
            <img
              className="toolPreviewImage"
              src={process.env.PUBLIC_URL + "/images/words.png"}
              // onClick={openModal}
              alt=""
            />
            <div className="toolboxTitle">Close text</div>
          </div>
        </div>

        <div className="toolboxContainer" onClick={() => handleToolClick('snap')}>
          <div className="minor toolbox">
            <img
              className="toolPreviewImage"
              src={process.env.PUBLIC_URL + "/images/pairs.png"}
              // onClick={openModal}
              alt=""
            />
            <div className="toolboxTitle">Matching pairs</div>
          </div>
        </div>

        <div className="toolboxContainer" onClick={() => handleToolClick('dnd_chrono')}>
          <div className="minor toolbox">
            <img
              className="toolPreviewImage"
              src={process.env.PUBLIC_URL + "/images/order.png"}
              // onClick={openModal}
              alt=""
            />
            <div className="toolboxTitle">Order</div>
          </div>
        </div>     

        <div className="toolboxContainer" onClick={() => handleToolClick('dnd_chrono_double')}>
          <div className="minor toolbox">
            <img
              className="toolPreviewImage"
              src={process.env.PUBLIC_URL + "/images/order2.png"}
              // onClick={openModal}
              alt=""
            />
            <div className="toolboxTitle">Order (2 col)</div>
          </div>
        </div>     

        <div className="toolboxContainer" onClick={() => handleToolClick('dnd')}>
          <div className="minor toolbox">
            <img
              className="toolPreviewImage"
              src={process.env.PUBLIC_URL + "/images/group.png"}
              // onClick={openModal}
              alt=""
            />
            <div className="toolboxTitle">Group</div>
          </div>
        </div> 

        <div className="toolboxContainer" onClick={() => handleToolClick('dnd_group')}>
          <div className="minor toolbox">
            <img
              className="toolPreviewImage"
              src={process.env.PUBLIC_URL + "/images/group3.png"}
              // onClick={openModal}
              alt=""
            />
            <div className="toolboxTitle">Group (3 col)</div>
          </div>
        </div> 
      </div>
      </CSSTransition>

      <CSSTransition
        in={selectedType !== null}
        timeout={300}
        classNames="my-topic-transition"
        unmountOnExit
      >
        <div id="test-quiz">
        <MyFormativeTest title={selectedTitle} selectedType={selectedType} userData={userData} onBackToList={handleBackToList} />
        </div>
      </CSSTransition>

      </div>
    </div>
  );  
}
export default AddMyTest;