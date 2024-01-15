import React, { useState, useEffect } from 'react';

const Tab = ({ tab, onRemove, onTabClick }) => (
  <li className="nav-item" role="presentation" onClick={onTabClick} style={{position: 'relative'}}>
    <button className="nav-linkSide active" href="#">{tab.title}</button>
    <button type="button" onClick={onRemove} className="closeButton">x</button>
  </li>
);

const TabList = ({ tabs, onTabClick, onAddTab, onRemoveTab }) => (
  <ul className="navSide nav-tabs mx-3">
    {tabs.map((tab, index) => (
      <Tab key={index} tab={tab} onTabClick={() => onTabClick(index)} onRemove={() => onRemoveTab(index)} />
    ))}
    <li className="nav-linkSide" role="presentation">
      <button type="button" onClick={onAddTab} className="addButton">+</button>
    </li>
  </ul>
);

const TabContent = ({ activeTab, content, handleInputTest, handleRemoveTestRow, handleAddTestRow, errorList }) => (
  <>
    {content[activeTab] && (
      <div id="block_quiz" className="border mx-3 p-3">
          {content[activeTab].testRows.map((row, index) => (
            <div className="rowBts" key={index} style={{ alignItems: 'end' }}>
            <div className="col-md-4">
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
                  name="status"
                  onChange={event => handleInputTest(activeTab, index, event)}
                  style={{ marginTop: '15px', marginLeft: '15px' }}
                />
              </div>
            </div>

            <div className="col-md-5" style={{ marginRight: '-25px' }}>
              <div className="form-group">
                {index === 0 && <label>Explanation</label>}
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

            <div className="col-md-2">
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
  </>
);

function MyQuizTest({ tabs, addTab, removeTab, activeTab, onTabClick, tabContent, handleInputTest, handleRemoveTestRow, handleAddTestRow, errorList }) {

  return (
    <>
      <TabList
        tabs={tabs}
        onTabClick={onTabClick}
        onAddTab={addTab}
        onRemoveTab={removeTab}
      />
      <TabContent
        activeTab={activeTab}
        content={tabContent}
        handleInputTest={handleInputTest}
        handleRemoveTestRow={handleRemoveTestRow}
        handleAddTestRow={handleAddTestRow}
        errorList={errorList}
      />
    </>
  );
}
export default MyQuizTest;