import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import MyFormativeTest from './MyFormativeTest';

function AddMyTest({ onBackToList, userData }) {
  const [selectedTool, setSelectedTool] = useState(null);
  const [testListVisible, setTestListVisible] = useState(true);

  const handleToolClick = (toolId) => {
    setSelectedTool(toolId);
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
        <div className="toolboxContainer" data-toolid="test-quiz" onClick={() => handleToolClick('test-quiz')}>
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

        <div className="toolboxContainer" data-toolid="test-check" onClick={() => handleToolClick('test-check')}>
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

        <div className="toolboxContainer" data-toolid="301">
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

        <div className="toolboxContainer" data-toolid="301">
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

        <div className="toolboxContainer" data-toolid="301">
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

        <div className="toolboxContainer" data-toolid="301">
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

        <div className="toolboxContainer" data-toolid="301">
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

        <div className="toolboxContainer" data-toolid="301">
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
        in={selectedTool === 'test-quiz'}
        timeout={300}
        classNames="my-topic-transition"
        unmountOnExit
      >
        <div id="test-quiz">
        <MyFormativeTest title="Quiz" userData={userData} onBackToList={handleBackToList} />
        </div>
      </CSSTransition>

      <CSSTransition
        in={selectedTool === 'test-check'}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div id="test-check">
          <p>test check</p>
        </div>
      </CSSTransition>

      </div>
    </div>
  );  
}
export default AddMyTest;