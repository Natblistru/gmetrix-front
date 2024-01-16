import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; 
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';


import Swal from 'sweetalert2'
import MyQuizTest from './MyQuizTest';
import MyTestDnD from './MyTestDnD';
import MyTestDnDGroup from './MyTestDnDGroup';
import MyTestDnDOrder from './MyTestDnDOrder';
import MyTestDnDOrderText from './MyTestDnDOrderText';

function MyFormativeTest({title, userData, onBackToList, selectedType }) {

  const [learningProgramList, setLearningProgramList] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [teacherTopicList, setTeacherTopicList] = useState([]);
  const [testComplexityList, setTestComplexityList] = useState([]);

  const [newTestItems, setNewTestItems] = useState([]);
  const lastUpdatedArrayRef = useRef([]);
  const lastUpdatedFormativeTestRef = useRef([]);
  
  useEffect(() => {

    axios.get('http://localhost:8000/api/all-learningPrograms').then(res=>{
      if(res.data.status === 200){
        setLearningProgramList(res.data.learningProgram);
      }
    });

    axios.get('http://localhost:8000/api/all-themeLearningPrograms').then(res=>{
      if(res.data.status === 200){
        setThemeList(res.data.theme);
      }
    });

    axios.get('http://localhost:8000/api/all-topics').then(res=>{
      if(res.data.status === 200){
        setTopicList(res.data.topics);
      }
    });

    axios.get('http://localhost:8000/api/all-teachers').then(res=>{
      if(res.data.status === 200){
        setTeacherList(res.data.teachers);
      }
    });

    axios.get('http://localhost:8000/api/all-teacher-topics').then(res=>{
      if(res.data.status === 200){
        setTeacherTopicList(res.data.teacherTopics);
      }
    });

    axios.get('http://localhost:8000/api/all-test-complexities').then(res=>{
      if(res.data.status === 200){
        setTestComplexityList(res.data.testComplexities);
      }
    });

  },[])

  const formRef = useRef(null);

  const [tabs, setTabs] = useState([
    {
      title: 'Item 1',
      testContent: {
        task: 'Succesiunea cronologică a evenimentelor (Romania in primul RM)',
        test_complexity_id: '',
        column1: 'Evenimentele', 
        column2: 'Text in ordine cronoligică',
        column3: '',
        testRows: [
          { option: 'România a intrat în Primul Război Mondial', correct: false, correct1: false, explanation: '1' },
          { option: 'România a semnat Tratatul de la București', correct: false, correct1: false, explanation: '4' },
          { option: 'România a câștigat o victorie importantă în Bătălia de la Mărăști', correct: false, correct1: false, explanation: '3' },
          { option: 'Ocuparea Bucureștelui', correct: false, correct1: false, explanation: '2' },
        ]
      }
    },
  ]);
  const [activeTab, setActiveTab] = useState(0);

  const addTab = () => {
    setTabs(prevTabs => [
      ...prevTabs,
      {
        title: `Item ${prevTabs.length + 1}`,
        testContent: {
          task: '', 
          test_complexity_id: '', 
          column1: '', 
          column2: '',
          column3: '',
          testRows: [
            { option: '', correct: false, correct1: false, explanation: '' },
            { option: '', correct: false, correct1: false, explanation: '' },
            { option: '', correct: false, correct1: false, explanation: '' },
            { option: '', correct: false, correct1: false, explanation: '' },
          ]
        }
      }
    ]);
  };

  const removeTab = (index) => {
    const newTabs = tabs.slice();
    newTabs.splice(index, 1);
    setTabs(newTabs);
  };

  useEffect(()=>{
    setActiveTab(tabs.length - 1);
  },[tabs])

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleInputTest = (tabIndex, rowIndex, event) => {
    event.persist();
    const { name, value, type, checked } = event.target;
    const newTabs = [...tabs];
    const newTestRows = [...newTabs[tabIndex].testContent.testRows];
  
    if (name === 'task' || name === 'test_complexity_id' || name === 'column1' || name === 'column2' || name === 'column3') {
      newTabs[tabIndex].testContent[name] = value;
    } else {  
      newTestRows[rowIndex][name] = type === 'checkbox' ? checked : value;
    }
    
    newTabs[tabIndex].testContent.testRows = newTestRows;
    setTabs(newTabs);
  };


  const handleRemoveTestRow = (tabIndex, rowIndex) => {
    const newTabs = [...tabs];
    const newTestRows = [...newTabs[tabIndex].testContent.testRows];
    newTestRows.splice(rowIndex, 1);
    newTabs[tabIndex].testContent.testRows = newTestRows;
    setTabs(newTabs);
  };

  const handleAddTestRow = (tabIndex) => {
    const newTabs = [...tabs];
    const newTestRows = [...newTabs[tabIndex].testContent.testRows];
    newTestRows.push({ option: '', correct: false, explanation: '' });
    newTabs[tabIndex].testContent.testRows = newTestRows;
    setTabs(newTabs);
  };
  
  

  const [errorList, setErrors] = useState([]);



  const [testItemInput, setTestItemInput] = useState({
    learning_program_id: '',
    theme_learning_program_id: '',
    teacher_topic_id: '',
    teacher_id: '',
    test_complexity_id: '',
    type: '',
    title: '',
    order_number: '',
    path: '',
  })

  const [allCheckboxes, setAllCheckboxes] = useState({
    status: false,
  })

  const [path, setPath] = useState('');

  const handleInput = (e) => {
    e.persist();
    if (e.target.name === 'title') {
      const transformedText = transformText(e.target.value);
      setPath(transformedText);
    }
    setTestItemInput({...testItemInput, [e.target.name]: e.target.value})
  }

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({...allCheckboxes, [e.target.name]: e.target.checked})
  }

  function transformText(text) {
    text = text.trim();
    text = text.toLowerCase();
  
    const diacritics = ['ă', 'â', 'ș', 'ț', 'î', ' ', 'ă', 'â', 'ș', 'ț', 'î'];
    const replacements = ['a', 'a', 's', 't', 'i', '-', 'a', 'a', 's', 't', 'i'];
  
    for (let i = 0; i < diacritics.length; i++) {
      text = text.replace(new RegExp(diacritics[i], 'g'), replacements[i]);
    }
  
    text = text.replace(/[^a-z0-9-]/g, '');
  
    return '/' + text;
  }

  const updateStateAndWorkWithNewArray = (newArray) => {
    setNewTestItems(newArray);
    lastUpdatedArrayRef.current = newArray;
  };

  const handleButtonClick = async () => {

    let succesTotal = true;

    await processFormativeTest(succesTotal);

    await processTestItems(succesTotal);

    await processTestColumns(succesTotal);

    await processTestOptions(succesTotal);

    await processFormativeTestItems(succesTotal);

    if(succesTotal) {onBackToList()}
  };

  async function processFormativeTest (succesTotal) {

    const formData = new FormData();
    formData.append('order_number',testItemInput.order_number );
    formData.append('title',testItemInput.title );
    formData.append('path',path );
    formData.append('type', selectedType );
    formData.append('test_complexity_id',testItemInput.test_complexity_id );
    formData.append('teacher_topic_id',testItemInput.teacher_topic_id );
    formData.append('status',0);

    axios.post(`http://localhost:8000/api/store-myformative-test`, formData).then(res => {
      if(res.data.status === 201)
      {
        Swal.fire({
          title: "Succes",
          text: res.data.message,
          icon: "success"
        });
        lastUpdatedFormativeTestRef.current =  res.data.formativeTest;
        setTestItemInput({
          learning_program_id: '',
          theme_learning_program_id: '',
          teacher_topic_id: '',
          test_complexity_id: '',
          teacher_id: '',
          order_number: '',
          type: '',
          title: '',
          path: '',
        });
        setPath('');
        setAllCheckboxes({
          status: false,
        });
        setErrors([]);
      }
      else if(res.data.status === 422)
      {
        Swal.fire({
          title: "All fields are mandatory",
          text: Object.values(res.data.errors).flat().join(' '),
          icon: "error",
        });
        succesTotal = false;
        setErrors(res.data.errors);
      }
    });
  }

  async function processTestItems(succesTotal) {
    let listItems = []

    try {
      for (let tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
        const tab = tabs[tabIndex];
  
        // Construiește obiectul FormData pentru fiecare rând
        const formData = new FormData();
        formData.append('task', tab.testContent.task);
        formData.append('type', selectedType);
        formData.append('test_complexity_id', tab.testContent.test_complexity_id);
        formData.append('teacher_topic_id', testItemInput.teacher_topic_id);
        formData.append('status', 0);
  
        // Trimite FormData către server pentru fiecare rând
        const response = await axios.post(`http://localhost:8000/api/store-mytest-item`, formData);
  
        if (response.data.status === 201) {
          Swal.fire({
            title: "Success",
            text: "Successfully processed the request.",
            icon: "success"
          });

          listItems = [...listItems, response.data.testItem];
        } else {
          Swal.fire({
            title: "Error",
            text: response.data.message,
            icon: "error"
          });
          succesTotal = false;
        }
      }
    } catch (error) {
      console.error('Eroare în timpul procesării datelor:', error);
      succesTotal = false;
    } finally {
      if (!succesTotal) {
        Swal.fire({
          title: "Error",
          text: "An error occurred during data processing.",
          icon: "error"
        });
      }
    }
    updateStateAndWorkWithNewArray(listItems);
  }

  async function processTestColumns(succesTotal) {

    const testItems = lastUpdatedArrayRef.current;
    const formDataArray = [];

    if(selectedType === 'dnd_chrono') {
      tabs.forEach((tab, tabIndex) => {
        ['column1'].forEach((columnName, orderNumber) => {
          const formData = new FormData();
          console.log(orderNumber)
          formData.append('order_number', orderNumber);
          formData.append('test_item_id', testItems[tabIndex].id);
          formData.append('title', tab.testContent[columnName]);
          formData.append('status', 0);
      
          formDataArray.push(formData);
        });
      });
    } else if(selectedType === 'dnd' || selectedType === 'dnd_chrono_double' ) {
      tabs.forEach((tab, tabIndex) => {
        ['column1', 'column2'].forEach((columnName, orderNumber) => {
          const formData = new FormData();
          console.log(orderNumber)
          formData.append('order_number', orderNumber);
          formData.append('test_item_id', testItems[tabIndex].id);
          formData.append('title', tab.testContent[columnName]);
          formData.append('status', 0);
      
          formDataArray.push(formData);
        });
      });
    } else if(selectedType === 'dnd_group') {
      tabs.forEach((tab, tabIndex) => {
        ['column1', 'column2', 'column3'].forEach((columnName, orderNumber) => {
          const formData = new FormData();
          console.log(orderNumber)
          formData.append('order_number', orderNumber);
          formData.append('test_item_id', testItems[tabIndex].id);
          formData.append('title', tab.testContent[columnName]);
          formData.append('status', 0);
      
          formDataArray.push(formData);
        });
      });
    }
    console.log(formDataArray)

    try {
      const responses = await Promise.all(formDataArray.map(async (formData) => {
        return axios.post('http://localhost:8000/api/store-mytest-item-column', formData);
      }));

      const successResponses = responses.filter(response => response.data.status === 201);
      const errorResponses = responses.filter(response => response.data.status === 422);
 
      if (successResponses.length > 0) {
        Swal.fire({
          title: "Success",
          text: `Successfully processed ${successResponses.length} out of ${responses.length} requests.`,
          icon: "success"
        });
      }
      errorResponses.forEach(response => {
        Swal.fire({
          title: "Error",
          text: Object.values(response.data.errors).flat().join(' '),
          icon: "error"
        });
        succesTotal = false;
      });
    } catch (error) {
      console.error(error);
      succesTotal = false;
    } finally {
      if (!succesTotal) {
        Swal.fire({
          title: "Error",
          text: "An error occurred during data processing.",
          icon: "error"
        });
      }
    }   
  }
  
  async function processTestOptions(succesTotal) {

    const testItems = lastUpdatedArrayRef.current;
    let notFoundTestItem = [];
    const formDataArray = [];
    tabs.forEach((tab, index) => {
      const testRows = tab.testContent.testRows;
      for (let rowIndex = 0; rowIndex < testRows.length; rowIndex++) {
        const row = testRows[rowIndex];
    
        const formData = new FormData();
        formData.append('option', row.option);
        if(selectedType === 'dnd_group') {
          formData.append('correct', row.correct ? 1 : row.correct1 ? 2 : 0);
        } else if(selectedType === 'dnd_chrono'){
          formData.append('correct', 0);
        } else {
          formData.append('correct', row.correct == true? 1 : 0);
        }
        formData.append('explanation', row.explanation);
        // formData.append('text_additional', JSON.stringify(textWithQuotes));
        formData.append('test_item_id', testItems[index].id);
        formData.append('status', 0);
    
        formDataArray.push(formData);
      }
    });
  
    if (notFoundTestItem.length === 0) {
      try {
        const responses = await Promise.all(formDataArray.map(async (formData) => {
          return axios.post('http://localhost:8000/api/store-mytest-item-option', formData);
        }));
  
        const successResponses = responses.filter(response => response.data.status === 201);
        const errorResponses = responses.filter(response => response.data.status === 422);
   
        if (successResponses.length > 0) {
          Swal.fire({
            title: "Success",
            text: `Successfully processed ${successResponses.length} out of ${responses.length} requests.`,
            icon: "success"
          });
        }
  
        errorResponses.forEach(response => {
          Swal.fire({
            title: "Error",
            text: Object.values(response.data.errors).flat().join(' '),
            icon: "error"
          });
          succesTotal = false;
        });
      } catch (error) {
        console.error(error);
        succesTotal = false;
      }
    } else {
      if (notFoundTestItem.length > 0) {
        Swal.fire({
          title: "Unfound test item task:",
          text: Object.values(notFoundTestItem).flat().join(' '),
          icon: "error"
        });
        succesTotal = false;
      }
    }
  }

  async function processFormativeTestItems(succesTotal) {

    const formativeTest = lastUpdatedFormativeTestRef.current;
    const testItems = lastUpdatedArrayRef.current;

    try {
      for (let tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
        const tab = tabs[tabIndex];
  
        const formData = new FormData();
        formData.append('order_number', tabIndex + 1 );
        formData.append('test_item_id',testItems[tabIndex].id );
        formData.append('formative_test_id',formativeTest.id );
        formData.append('status', 0);
  
        // Trimite FormData către server pentru fiecare rând
        const response = await axios.post(`http://localhost:8000/api/store-myformative-test-item`, formData);
  
        if (response.data.status === 201) {
          Swal.fire({
            title: "Success",
            text: "Successfully processed the request.",
            icon: "success"
          });
        } else {
          Swal.fire({
            title: "Error",
            text: response.data.message,
            icon: "error"
          });
          succesTotal = false;
        }
      }
    } catch (error) {
      console.error('Eroare în timpul procesării datelor:', error);
      succesTotal = false;
    } finally {
      if (!succesTotal) {
        Swal.fire({
          title: "Error",
          text: "An error occurred during data processing.",
          icon: "error"
        });
      }
    }   
  }

  return (
    <div className="container-fluid px4 shadow-lg rounded p-1" style={{position: 'relative'}}>
      <h2 className="m-3">{title}</h2>

      <form className="form-group custom-form" ref={formRef} >

        <div className="rowBts">
          <div className="col-md-4">
            <div className="form-group mx-3 my-1">
              <label>Learn Program</label>
              <select name="learning_program_id" onChange={handleInput} value={testItemInput.learning_program_id} className="form-control">  
                <option>Select program</option>
                {
                  learningProgramList.map((item)=> {
                    return (
                      <option value={item.id} key={item.id}>{item.name}</option>
                    )
                  })
                }
              </select>            
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.learning_program_id}</span>
            </div>
          </div>  
          <div className="col-md-8">          
            <div className="form-group mx-3 my-1">
              <label>Theme</label>
              <select name="theme_learning_program_id" onChange={handleInput} value={testItemInput.theme_learning_program_id} className="form-control">  
                <option>Select Theme</option>
                {themeList
                  .filter((item) => item.learning_program_id == testItemInput.learning_program_id)
                  .map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                ))}
              </select>            
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.theme_learning_program_id}</span>
            </div>
          </div>
        </div>

        <div className="rowBts">

          <div className="col-md-12">
            <div className="form-group mx-3">
              <label>Topics</label>
              <select name="teacher_topic_id" onChange={handleInput} value={testItemInput.teacher_topic_id} className="form-control">  
                <option>Select Topic</option>
                {
                  teacherTopicList
                  .filter((item) => item.teacher_id == userData.teacher.id)
                  .filter((item) => item.topic.theme_learning_program_id == testItemInput.theme_learning_program_id)                      
                  .map((item)=> {
                    return (
                      <option value={item.id} key={item.id}>{item.name}</option>
                    )
                  })
                }
              </select>            
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.teacher_topic_id}</span>
            </div>
          </div> 

        </div>
        <div className="rowBts">
          <div className="col-md-6">          
            <div className="form-group mx-3 my-1">
              <label>Title</label>
              <input type="text" name="title" onChange={handleInput} value={testItemInput.title}className="form-control" />
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.title}</span>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group mx-3 my-1">
              <label>Complexity</label>
              <select name="test_complexity_id" onChange={handleInput} value={testItemInput.test_complexity_id} className="form-control">  
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

        <div className="col-md-2">
            <div className="form-group mx-3 my-1">
              <label>№ ord.</label>
              <input type="number" name="order_number" onChange={handleInput} value={testItemInput.order_number} className="form-control" />
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.order_number}</span>
            </div>
          </div>
      </div>

      <div className="rowBts">

          <div className="col-md-8">          
            <div className="form-group mx-3" style={{ marginBottom: '10px'}}>
              <label style={{ color: '#8d99ae', fontSize: '0.8rem', paddingLeft: '10px' }}>Path: {path}</label>
              {/* <input type="text" name="path" onChange={handleInput} value={testItemInput.path}className="form-control" />
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.path}</span> */}
            </div>
          </div>

      </div>
      </form>
      {(selectedType === "quiz" ||
        selectedType === "check" ) && (
        <MyQuizTest
          tabs={tabs}
          addTab={addTab}
          removeTab={removeTab}
          onRemoveTab={removeTab}
          activeTab={activeTab}
          onTabClick={handleTabClick}
          tabContent={tabs.map(tab => tab.testContent)}
          handleInputTest={handleInputTest}
          handleRemoveTestRow={handleRemoveTestRow}
          handleAddTestRow={handleAddTestRow}
          errorList={errorList}
          testComplexityList={testComplexityList}
        />
      )}
      {(selectedType === "dnd" ) && (
        <MyTestDnD
          tabs={tabs}
          addTab={addTab}
          removeTab={removeTab}
          onRemoveTab={removeTab}
          activeTab={activeTab}
          onTabClick={handleTabClick}
          tabContent={tabs.map(tab => tab.testContent)}
          handleInputTest={handleInputTest}
          handleRemoveTestRow={handleRemoveTestRow}
          handleAddTestRow={handleAddTestRow}
          errorList={errorList}
          testComplexityList={testComplexityList}
        />
      )}
      {(selectedType === "dnd_group" ) && (
        <MyTestDnDGroup
          tabs={tabs}
          addTab={addTab}
          removeTab={removeTab}
          onRemoveTab={removeTab}
          activeTab={activeTab}
          onTabClick={handleTabClick}
          tabContent={tabs.map(tab => tab.testContent)}
          handleInputTest={handleInputTest}
          handleRemoveTestRow={handleRemoveTestRow}
          handleAddTestRow={handleAddTestRow}
          errorList={errorList}
          testComplexityList={testComplexityList}
        />
      )}
      {(selectedType === "dnd_chrono" ) && (
        <MyTestDnDOrder
          tabs={tabs}
          addTab={addTab}
          removeTab={removeTab}
          onRemoveTab={removeTab}
          activeTab={activeTab}
          onTabClick={handleTabClick}
          tabContent={tabs.map(tab => tab.testContent)}
          handleInputTest={handleInputTest}
          handleRemoveTestRow={handleRemoveTestRow}
          handleAddTestRow={handleAddTestRow}
          errorList={errorList}
          testComplexityList={testComplexityList}
        />
      )}
      {(selectedType === "dnd_chrono_double" ) && (
        <MyTestDnDOrderText
          tabs={tabs}
          addTab={addTab}
          removeTab={removeTab}
          onRemoveTab={removeTab}
          activeTab={activeTab}
          onTabClick={handleTabClick}
          tabContent={tabs.map(tab => tab.testContent)}
          handleInputTest={handleInputTest}
          handleRemoveTestRow={handleRemoveTestRow}
          handleAddTestRow={handleAddTestRow}
          errorList={errorList}
          testComplexityList={testComplexityList}
        />
      )}
      <button type="button" className="btnBts btn-success px-4 m-3 float-end" onClick={handleButtonClick} style={{position: 'absolute', bottom: '0px', right: '30px'}}>
        Submit
      </button>
   </div>
  )
}

export default MyFormativeTest;
