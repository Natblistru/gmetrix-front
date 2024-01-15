import React from 'react';

function AddMyTest({ onBackToList, userData }) {
  
  const handleBackToList = () => {
    onBackToList();
  };

  return (
    <div className="container-fluid my-2">
      <h2 style={{ paddingLeft: '50px'}}>
        Adaugarea testului profesorului
        <button
          onClick={handleBackToList}
          type="button"
          className="btnBts btn-primary text-white px-4 float-end"
        >
          BACK to List
        </button>
      </h2>
      <div className="tab-content clearfix" id="myTabContent" style={{ marginTop: '40px'}}>
        <div className="toolboxContainer" data-toolid="100">
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

        <div className="toolboxContainer" data-toolid="301">
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
        {/* Adaugă restul toolbox-urilor aici */}
      </div>
    </div>
  );  
}
export default AddMyTest;