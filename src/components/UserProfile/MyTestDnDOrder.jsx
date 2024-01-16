import React, { useState, useEffect } from 'react';

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

const TabContent = ({ activeTab, content, handleInputTest, handleRemoveTestRow, handleAddTestRow, errorList, testComplexityList }) => {
  const key = `tab-content-${activeTab}`;
  return (
  <div key={key}>
    {content[activeTab] && (
      <div id="block_quiz" className="border mx-3 p-3 shadow-sm">
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
          <div className="rowBts">
            <div className="col-md-8">
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
          </div>  
          {content[activeTab].testRows.map((row, index) => (
            <div className="rowBts" key={index} style={{ alignItems: 'end' }}>
            <div className="col-md-8">
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
  </div>
)}
;

function MyTestDnDOrder({ tabs, addTab, removeTab, onRemoveTab, activeTab, onTabClick, tabContent, handleInputTest, handleRemoveTestRow, handleAddTestRow, errorList, testComplexityList }) {
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
      />
    </>
  );
}
export default MyTestDnDOrder;