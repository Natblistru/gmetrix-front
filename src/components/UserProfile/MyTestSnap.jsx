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

  const renderRow = (rowIndex, label1, name1, resp, label2, name2) => (
    <div className="rowBts" key={rowIndex}>
      <div className="col-md-5">
        <div className="form-group my-3  d-flex align-items-center">
          <input
            type="text"
            name={name1}
            onChange={(event) => handleInputTest(activeTab, null, event)}
            value={content[activeTab][name1]}
            placeholder={label1}
            className="form-control"
          />
        </div>
      </div>
  
      <div className="col-md-2">
        <div className="form-group my-3  d-flex align-items-center">
          <input
            type="number"
            name={resp}
            onChange={(event) => handleInputTest(activeTab, null, event)}
            value={content[activeTab][resp]}
            className="form-control"
          />
        </div>
      </div>
  
      <div className="col-md-5">
        <div className="form-group my-3  d-flex align-items-center">
          <input
            type="text"
            name={name2}
            onChange={(event) => handleInputTest(activeTab, null, event)}
            value={content[activeTab][name2]}
            placeholder={label2}
            className="form-control"
          />
        </div>
      </div>
    </div>
  );

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
          <div className="rowBts" style={{ marginTop: '20px'}}>


            <div className="col-md-2" style={{marginLeft: '64px'}}>
              <div className="form-group d-flex align-items-center"  >
                <label>Coloana I</label>
              </div>
            </div>

            <div className="col-md-2">
              <div className="form-group">
                <label className="visually-hidden" style={{marginRight: '-20px'}}></label>
              </div>
            </div>

            <div className="col-md-3 d-flex align-items-center" style={{marginLeft: '-20px'}}>
              <div className="form-group">
                <label>Asociere rând:</label>
              </div>
            </div>

            <div className="col-md-2" style={{marginLeft: '44px'}}>
              <div className="form-group d-flex align-items-center">
                <label>Coloana 2</label>
              </div>
            </div>
          </div>
          {renderRow(1, 'Text randul 1 coloana 1', 'text_1_1', 'rasp1', 'Text randul 1 coloana 2', 'text_2_1')}
          {renderRow(2, 'Text randul 2 coloana 1', 'text_1_2', 'rasp2', 'Text randul 2 coloana 2', 'text_2_2')}
          {renderRow(3, 'Text randul 3 coloana 1', 'text_1_3', 'rasp3', 'Text randul 3 coloana 2', 'text_2_3')}
          {renderRow(4, 'Text randul 4 coloana 1', 'text_1_4', 'rasp4', 'Text randul 4 coloana 2', 'text_2_4')}
          <div className="rowBts">
            <div className="form-group" style={{height: '40px'}}>
            </div>
          </div>
      </div>
    )}
  </div>
)}
;

function MyTestSnap({ tabs, addTab, removeTab, onRemoveTab, activeTab, onTabClick, tabContent, handleInputTest, handleRemoveTestRow, handleAddTestRow, errorList, testComplexityList }) {
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
export default MyTestSnap;