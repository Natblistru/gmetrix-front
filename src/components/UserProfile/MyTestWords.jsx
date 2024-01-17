import React, { useState, useEffect } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, Modifier } from 'draft-js';

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

const TabContent = ({ activeTab, content, handleInputTest, handleRemoveTestRow, handleAddTestRow, errorList, testComplexityList, editorStates, setEditorStates }) => {
  const key = `tab-content-${activeTab}`;



  const onChangeFormat = (index, newEditorState) => {
    if (editorStates[index]) {
      const newEditorStates = [...editorStates];
      newEditorStates[index] = newEditorState;
      setEditorStates(newEditorStates);
    }
  };

  const handleBoldClick = (index) => {
    const newEditorState = RichUtils.toggleInlineStyle(editorStates[index], 'BOLD');
    onChangeFormat(index, newEditorState);
  };

  return (
  <div key={key}>
    {content[activeTab] && (
      <div id="block_quiz" className="border mx-3 p-3 shadow-sm" style={{ paddingBottom: '20px'}}>
          <div className="rowBts">
            <div className="col-md-8">
              <div className="form-group">
                <label>Task</label>
                <input
                  type="text"
                  name="task"
                  onChange={(event) => handleInputTest(activeTab, null, event)}
                  value={content[activeTab].task}
                  className="form-control"
                />
                <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.task}</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group mx-3 my-1">
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
            </div>
          </div>  
          <div className="rowBts my-3" >
            <div className="col-md-8" >
              <p className="text-center">Scrie fraza. Evidențiaza (prin bold) cuvintele - lacune</p>
            </div>

            <div className="col-md-4" >
              <p>Incorrect options</p>
            </div>
          </div>
          <div className="d-flex flex-row gap-3" >
            <div className="rowBts w-100" >
              <div className="white-background col-md-12">
                <div className="d-flex gap-1">
                  <button type="button" className="small-button py-1 px-2" onClick={() => handleBoldClick(activeTab)}><b>Bold</b></button>
                </div>
                <Editor
                  editorState={editorStates[activeTab]}
                  onChange={(newEditorState) => onChangeFormat(activeTab, newEditorState)}
                />
              </div>
            </div>
            <div>
              {content[activeTab].testRows.map((row, index) => (
                <div className="rowBts" key={index} style={{ alignItems: 'end' }}>
                <div className="col-md-7" style={{ marginLeft: '15px', marginRight: '-20px'}}>
                  <div className="form-group">
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
                <div className="col-md-4">
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
                className="btnBts btn-success btn-sm px-2 mx-3 my-2"
                onClick={() => handleAddTestRow(activeTab)}
              >
                Add Row
              </button>
            </div>
          </div>

          <div className="rowBts">
            <div className="form-group" style={{height: '40px'}}>
            </div>
          </div>
      </div>
    )}
  </div>
)}
;

function MyTestWords({ tabs, addTab, removeTab, onRemoveTab, activeTab, onTabClick, tabContent, handleInputTest, handleRemoveTestRow, handleAddTestRow, errorList, testComplexityList, editorStates, setEditorStates }) {
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
        editorStates = {editorStates}
        setEditorStates = {setEditorStates}
      />
    </>
  );
}
export default MyTestWords;