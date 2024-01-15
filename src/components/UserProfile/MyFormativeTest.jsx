import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; 
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';


import Swal from 'sweetalert2'
import MyQuizTest from './MyQuizTest';

function MyFormativeTest({title, userData }) {

  const [learningProgramList, setLearningProgramList] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [teacherTopicList, setTeacherTopicList] = useState([]);
  const [testComplexityList, setTestComplexityList] = useState([]);
  
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
    { title: 'Item 1', testContent: { testRows: [{ option: '', correct: false, explanation: '' },
                                                 { option: '', correct: false, explanation: '' },
                                                 { option: '', correct: false, explanation: '' },
                                                 { option: '', correct: false, explanation: '' },] } },
  ]);
  const [activeTab, setActiveTab] = useState(0);

  const addTab = () => {
    setTabs([...tabs, { title: `Item ${tabs.length + 1}`, 
                        testContent: { testRows: [{ option: '', correct: false, explanation: '' },
                                                  { option: '', correct: false, explanation: '' },
                                                  { option: '', correct: false, explanation: '' },
                                                  { option: '', correct: false, explanation: '' },] } }]);
  };

  const removeTab = (index) => {
    const newTabs = tabs.slice();
    newTabs.splice(index, 1);
    setTabs(newTabs);
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleInputTest = (tabIndex, rowIndex, event) => {
    event.persist();
    const { name, value, type, checked } = event.target;
    const newTabs = [...tabs];
    const newTestRows = [...newTabs[tabIndex].testContent.testRows];
    newTestRows[rowIndex][name] = type === 'checkbox' ? checked : value;
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



  const handleButtonClick = async () => {
    try {
      await sendFormDataToServer();
  
      // Verifică existența formRef și declanșează evenimentul de submit
      if (formRef.current) {
        formRef.current.dispatchEvent(new Event('submit', { cancelable: true }));
      }
  
    } catch (error) {
      console.error('Eroare în timpul manipulării butonului:', error);
    }
  };

  const sendFormDataToServer = async () => {
    try {
      // Iterează prin fiecare tab
      for (let tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
        const tab = tabs[tabIndex];
        const testRows = tab.testContent.testRows;
  
        // Iterează prin fiecare rând din testRows
        for (let rowIndex = 0; rowIndex < testRows.length; rowIndex++) {
          const row = testRows[rowIndex];
  
          // Construiește obiectul FormData pentru fiecare rând
          const formData = new FormData();
          formData.append('option', row.option);
          formData.append('correct', row.correct);
          formData.append('explanation', row.explanation);
  
          // Adaugă alte date în FormData, dacă este necesar
          formData.append('test_item_id', testItemInput.test_item_id);
          formData.append('status', allCheckboxes.status === true ? 1 : 0);
  
          // Trimite FormData către server pentru fiecare rând
          const response = await axios.post(`http://localhost:8000/api/update-test-item-option/${testItemInput.test_item_id}`, formData);
  
          if (response.ok) {
            console.log(`Datele pentru tab-ul ${tabIndex + 1}, rândul ${rowIndex + 1} au fost trimise cu succes către server!`);
          } else {
            console.error(`Eroare în timpul trimiterii datelor pentru tab-ul ${tabIndex + 1}, rândul ${rowIndex + 1} către server.`);
          }
        }
      }
    } catch (error) {
      console.error('Eroare în timpul procesării datelor:', error);
      throw error; // Aruncă eroarea pentru a fi prinsă în funcția de apelare
    }
  };
  
  const submitTeacherTopic = (e) => {
    e.preventDefault();

  //   const formData = new FormData();
  //   formData.append('order_number',testItemInput.order_number );
  //   formData.append('title',testItemInput.title );
  //   formData.append('path',testItemInput.path );
  //   formData.append('type',testItemInput.type );
  //   formData.append('test_complexity_id',testItemInput.test_complexity_id );
  //   formData.append('teacher_topic_id',testItemInput.teacher_topic_id );
  //   formData.append('status',allCheckboxes.status == true ? 1 : 0);

  //   // console.log(formData)

  //   axios.post(`http://localhost:8000/api/store-formative-test`, formData).then(res => {
  //     if(res.data.status === 201)
  //     {
  //       Swal.fire({
  //         title: "Succes",
  //         text: res.data.message,
  //         icon: "success"
  //       });
  //       setTestItemInput({
  //         learning_program_id: '',
  //         theme_learning_program_id: '',
  //         teacher_topic_id: '',
  //         test_complexity_id: '',
  //         teacher_id: '',
  //         order_number: '',
  //         type: '',
  //         title: '',
  //         path: '',
  //       });
  //       setAllCheckboxes({
  //         status: false,
  //       });
  //       setErrors([]);
  //     }
  //     else if(res.data.status === 422)
  //     {
  //       Swal.fire({
  //         title: "All fields are mandatory",
  //         text: Object.values(res.data.errors).flat().join(' '),
  //         icon: "error",
  //       });
  //       setErrors(res.data.errors);
  //     }
  //   });
  }

  return (
    <div className="container-fluid px4 shadow-lg rounded p-1">
      <h2 className="m-3">{title}</h2>

      <form className="form-group custom-form" ref={formRef} onSubmit={submitTeacherTopic}>

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

          {/* <div className="col-md-4">
            <div className="form-group m-3">
              <label>Test Type</label>
                <select name="type" onChange={handleInput} value={testItemInput.type} className="form-control">
                  <option>Select Type</option>
                  <option value="quiz">Quiz</option>
                  <option value="check">Check</option>
                  <option value="snap">Asocierea textelor</option>
                  <option value="words">Completarea lacunelor</option>
                  <option value="dnd">Drag'n'drop</option>
                  <option value="dnd_chrono">Drag'n'drop (chrono)</option>
                  <option value="dnd_chrono_double">Drag'n'drop (chrono double)</option>
                  <option value="dnd_group">Drag'n'drop group</option>
                </select>
            </div>
          </div> */}
      </div>

      <div className="rowBts">

          <div className="col-md-8">          
            <div className="form-group mx-3">
              <label>Path: {path}</label>
              {/* <input type="text" name="path" onChange={handleInput} value={testItemInput.path}className="form-control" />
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.path}</span> */}
            </div>
          </div>

      </div>
      </form>
 
      <MyQuizTest
        tabs={tabs}
        addTab={addTab}
        removeTab={removeTab}
        activeTab={activeTab}
        onTabClick={handleTabClick}
        tabContent={tabs.map(tab => tab.testContent)}
        handleInputTest={handleInputTest}
        handleRemoveTestRow={handleRemoveTestRow}
        handleAddTestRow={handleAddTestRow}
        errorList={errorList}
      />

      <button type="button" className="btnBts btn-success px-4 m-3 float-end" onClick={handleButtonClick}>
        Submit (Outside Form)
      </button>
   </div>
  )
}

export default MyFormativeTest;
