import React, { useState, useEffect } from 'react';

import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  Modifier,
} from "draft-js";

const TabList = ({ tabs, onTabClick, onAddTab, onRemoveTab, activeTab }) => {
  return (
    <ul className="navSide nav-tabs mx-3">
      {tabs.map((tab, index) => (
        <li key={index} className={`nav-item ${index === activeTab ? 'active' : ''}`} role="presentation" onClick={() => onTabClick(index)} style={{ position: 'relative' }}>
          <button className={`nav-linkSide ${index === activeTab ? 'active' : ''}`}>
            {tab.title}
          </button>
          <button type="button" onClick={() => onRemoveTab(index)} className="closeButton">x</button>
        </li>
      ))}
      <li className="nav-linkSide" role="presentation">
        <button type="button" onClick={onAddTab} className="addButton">+</button>
      </li>
    </ul>
  );
};

const TabContent = ({ activeTab, content, handleInputTest, handleRemoveTestRow, handleAddTestRow, errorList, testComplexityList, editorStates, setEditorStates, pictures, setPictures }) => {
  const key = `tab-content-${activeTab}`;

  const onChangeFormat = (index, newEditorState) => {
    if (editorStates[index]) {
      const newEditorStates = [...editorStates];
      newEditorStates[index] = newEditorState;
      setEditorStates(newEditorStates);
    }
  };

  const handleBoldClick = (index) => {
    const newEditorState = RichUtils.toggleInlineStyle(
      editorStates[index],
      "BOLD"
    );
    onChangeFormat(index, newEditorState);
  };

  const handleItalicClick = (index) => {
    const newEditorState = RichUtils.toggleInlineStyle(
      editorStates[index],
      "ITALIC"
    );
    onChangeFormat(index, newEditorState);
  };

  const handleUnderlineClick = (index) => {
    const newEditorState = RichUtils.toggleInlineStyle(
      editorStates[index],
      "UNDERLINE"
    );
    onChangeFormat(index, newEditorState);
  };

  const handleCodeClick = (index) => {
    const newEditorState = RichUtils.toggleInlineStyle(
      editorStates[index],
      "CODE"
    );
    onChangeFormat(index, newEditorState);
  };

  const handlePicture = (e, index) => {
    const file = e.target.files[0];
    setPictures((prevPictures) => {
      const newPictures = [...prevPictures];
      newPictures[index] = file;
      return newPictures;
    });
  };

  const handleDeletePicture = (index) => {
    setPictures((prevPictures) => {
      const newPictures = [...prevPictures];
      newPictures[index] = null; 
      return newPictures;
    });
  };

  return (
  <div key={key}>
    {content[activeTab] && (
      <div id="block_quiz" className="border mx-3 p-3 shadow-sm">
          <div className="rowBts">

            <div className="white-background col-md-8">
              <label style={{ marginBottom: "10px", display: "block" }}>
                Task
              </label>
              <div className="d-flex gap-1">
                <button
                  type="button"
                  className="small-button"
                  onClick={() => handleBoldClick(activeTab)}
                >
                  Bold
                </button>
                <button
                  type="button"
                  className="small-button"
                  onClick={() => handleItalicClick(activeTab)}
                >
                  Italic
                </button>
                <button
                  type="button"
                  className="small-button"
                  onClick={() => handleUnderlineClick(activeTab)}
                >
                  Underline
                </button>
                <button
                  type="button"
                  className="small-button"
                  onClick={() => handleCodeClick(activeTab)}
                >
                  Code
                </button>
              </div>
              <Editor
                editorState={editorStates[activeTab]}
                onChange={(newEditorState) =>
                  onChangeFormat(activeTab, newEditorState)
                }
              />
            </div>

            <div className="col-md-4">
              <div className="form-group mx-3 mt-4 mb-1">
                <label>Complexity</label>
                <select name="test_complexity_id" onChange={(event) => handleInputTest(activeTab, null, event)} value={content[activeTab].test_complexity_id} className="form-control">
                  <option>Select Test Complexity</option>
                  {
                    testComplexityList
                    .map((item)=> {
                      return (
                        <option value={item.id} key={item.id}>{item.name}</option>
                      )
                    })
                  }
                </select>
                <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.test_complexity_id}</span>
              </div>

              <div className="form-group mx-3 my-1">
                <label>Photo Path</label>
                <input
                  type="file"
                  accept="image/*"
                  name="picture"
                  onChange={(e) => handlePicture(e, activeTab)}
                  className="form-control"
                />
                <span style={{ color: "red", fontSize: "0.8rem" }}>
                  {errorList.photo_path}
                </span>

                {pictures[activeTab] && (
                  <div style={{ marginTop: "10px", position: "relative" }}>
                  <img
                    src={URL.createObjectURL(pictures[activeTab])}
                    alt="Selected Picture"
                    style={{ width: "100px", height: "100px" }}
                  />
                  {/* <button
                    type="button"
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => handleDeletePicture(activeTab)}
                  >
                    Delete
                  </button> */}
                  <button
                    className="btn-close-modal"
                    style={{ background: "transparent", right: "22px" }}
                    onClick={() => handleDeletePicture(activeTab)}
                  ></button>

                </div>
                )}
              </div>
            </div>

          </div>  
          <div className="rowBts">
            <div className="col-md-7">
              <div className="form-group">
                <label>Column 1</label>
                <input
                  type="text"
                  name="column1"
                  onChange={(event) => handleInputTest(activeTab, null, event)}
                  value={content[activeTab].column1}
                  className="form-control"
                />
                <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.column1}</span>
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group">
                <label>Column 2</label>
                <input
                  type="text"
                  name="column2"
                  onChange={(event) => handleInputTest(activeTab, null, event)}
                  value={content[activeTab].column2}
                  className="form-control"
                />
                <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.column2}</span>
              </div>
            </div>
          </div>  
          {content[activeTab].testRows.map((row, index) => (
            <div className="rowBts" key={index} style={{ alignItems: 'end' }}>
              <div className="col-md-7">
                <div className="form-group">
                  {index === 0 && <label>Option</label>}
                  <input
                    type="text"
                    name="option"
                    onChange={event => handleInputTest(activeTab, index, event)}
                    value={row.option}
                    className="form-control"
                  />
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.option}</span>
                </div>
              </div>

              <div className="col-md-2">
                <div className="form-group">
                  {index === 0 && <label>Order</label>}
                  <input
                    type="text"
                    name="explanation"
                    onChange={event => handleInputTest(activeTab, index, event)}
                    value={row.explanation}
                    className="form-control"
                  />
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.explanation}</span>
                </div>
              </div>

              <div className="col-md-2 align-self-start" style={{ marginRight: '-35px' }}>
                <div className="form-group">
                  {index === 0 && (
                    <>
                      <label>Correct</label>
                      <br />
                    </>
                  )}
                  <input
                    type="checkbox"
                    name="correct"
                    onChange={event => handleInputTest(activeTab, index, event)}
                    defaultChecked={row.correct == 1 ? true: false}
                    style={{ marginTop: '15px', marginLeft: '15px' }}
                  />
                </div>
              </div>

            <div className="col-md-2" style={{ marginLeft: '-25px' }}>
              <button
                type="button"
                className="btnBts btn-danger btn-sm mx-3 my-2"
                onClick={() => handleRemoveTestRow(activeTab, index)}
              >
                Remove
              </button>
            </div>
          </div>
          ))}
          <button
            type="button"
            className="btnBts btn-success btn-sm px-4 mx-3 my-2"
            onClick={() => handleAddTestRow(activeTab)}
          >
            Add Row
          </button>
      </div>
    )}
  </div>
)}
;

function MyTestDnDOrderText({ tabs, addTab, removeTab, onRemoveTab, activeTab, onTabClick, tabContent, handleInputTest, handleRemoveTestRow, handleAddTestRow, errorList, testComplexityList, editorStates, setEditorStates, pictures, setPictures }) {
  return (
    <>
      <TabList
        tabs={tabs}
        onTabClick={onTabClick}
        onAddTab={addTab}
        onRemoveTab={onRemoveTab} 
        activeTab={activeTab}
      />
      <TabContent
        activeTab={activeTab}
        content={tabContent}
        handleInputTest={handleInputTest}
        handleRemoveTestRow={handleRemoveTestRow}
        handleAddTestRow={handleAddTestRow}
        errorList={errorList}
        testComplexityList={testComplexityList}
        editorStates={editorStates} 
        setEditorStates={setEditorStates} 
        pictures={pictures}
        setPictures={setPictures}
      />
    </>
  );
}
export default MyTestDnDOrderText;