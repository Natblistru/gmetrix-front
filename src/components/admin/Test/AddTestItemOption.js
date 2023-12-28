import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';


import Swal from 'sweetalert2'

function AddTestItemOption() {

  const [learningProgramList, setLearningProgramList] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [teacherTopicList, setTeacherTopicList] = useState([]);
  const [testItemList, setTestItemList] = useState([]);
  
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

    axios.get('http://localhost:8000/api/all-test-items').then(res=>{
      if(res.data.status === 200){
        setTestItemList(res.data.testItems);
      }
    });

  },[])

  const [excelFile, setExcelFile] = useState(null);
  const [allKeys, setAllKeys] = useState(null);
  const [typeError, setTypeError] = useState(null);

  const [excelData, setExcelData] = useState(null);
  const [additionalData, setAdditionalData] = useState([]);

  const handleFile=(e)=>{
    let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
    let selectedFile = e.target.files[0];
    if(selectedFile){
      if(selectedFile&&fileTypes.includes(selectedFile.type)){
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload=(e)=>{
          setExcelFile(e.target.result);
        }
      }
      else{
        setTypeError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else{
      console.log('Please select your file');
    }
  }
  
  const handleFileSubmit=(e)=>{
    e.preventDefault();
    if(excelFile!==null){
      const workbook = XLSX.read(excelFile,{type: 'buffer'});
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const columns = data[0];
      const formattedData = data.slice(1).map((row) => {
        const rowData = {};
        columns.forEach((column, index) => {
          rowData[column] = row[index];
        });
        return rowData;
      });
      const dataRestricted = formattedData.slice(0,50);
      setExcelData(dataRestricted);
      setAllKeys(columns);
    }
  }

  useEffect(() => {
    if (excelData?.length > 0) {
      // Setăm starea inițială a additionalData cu chosen: true pentru fiecare element
      const initialData = excelData.map(() => ({ chosen: true }));
      setAdditionalData(initialData);
  
      initialData.forEach((_, index) => {
        handleCheckboxChange(index, true); 
      });
    }
  }, [excelData]);
  

  const handleCheckboxChange = (index, isChecked) => {
    setAdditionalData((prevAdditionalData) => {
      const updatedAdditionalData = [...prevAdditionalData];
      updatedAdditionalData[index] = {
        chosen: isChecked,
        teacher_topic_name: excelData[index]?.teacher_topic_name || '',
        teacher_topic_id: excelData[index]?.teacher_topic_id || '',
        test_item_task: excelData[index]?.test_item_task || '',
        test_item_id: excelData[index]?.test_item_id || '',
        option: excelData[index]?.option || '',
        explanation: excelData[index]?.explanation || '',
        text_additional: excelData[index]?.text_additional || '',
        correct: excelData[index]?.correct || '',
        status: excelData[index]?.status || '',
      };
      return updatedAdditionalData;
    });
  };

  const handleCheckboxChangeAll = (isChecked) => {
    setAdditionalData((prevAdditionalData) => {
      return prevAdditionalData.map((item) => ({ ...item, chosen: isChecked }));
    });
  };

  const submitTeacherTopics = (e) => {
    e.preventDefault();
    if (excelData && excelData.length > 0) {
      const selectedData = additionalData.filter(item => item.chosen);
      if (selectedData.length > 0) {

        let notFoundTeacherTopics = [];
        let notFoundTestItem = [];

        selectedData.forEach((selectedItem) => {
          const foundTeacherTopic = teacherTopicList.find((teacherTopic) => teacherTopic.name.trim() == selectedItem.teacher_topic_name.trim());
          let foundTestItem = null;

          if (foundTeacherTopic) {
            selectedItem.teacher_topic_id = foundTeacherTopic.id;
            foundTestItem = testItemList.find((item) => item.task.trim() == selectedItem.test_item_task.trim());
          }
          else {
            notFoundTeacherTopics.push(selectedItem.teacher_topic_name);
          }
          if (foundTestItem) {
            selectedItem.test_item_id = foundTestItem.id;
          }
          else {
            notFoundTestItem.push(selectedItem.test_item_task);
          }
        });

        if(notFoundTeacherTopics.length === 0 && notFoundTestItem.length === 0)  {

          const formDataArray = selectedData.map(selectedItem => {
            const formData = new FormData();
            formData.append('option', selectedItem.option);
            formData.append('correct', selectedItem.correct || 0);
            formData.append('explanation', selectedItem.explanation);
            formData.append('text_additional', selectedItem.text_additional);
            formData.append('test_item_id', selectedItem.test_item_id);
            formData.append('status', 0); 
            return formData;
          });
          console.log(formDataArray)
          // Trimitem fiecare set de date către server utilizând axios.all
          axios.all(formDataArray.map(formData => axios.post('http://localhost:8000/api/store-test-item-option', formData)))
              .then(axios.spread((...responses) => {
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
                });
                setExcelData(null);
                setAllKeys(null);
                setAdditionalData([]);
                setExcelFile(null);
                document.getElementById('fileExcel').value = '';
              }))
              .catch(error => {
                console.error(error);
              });
        } else {
          if(notFoundTeacherTopics.length > 0 ){
            Swal.fire({
              title: "Unfound Topic name:",
              text: Object.values(notFoundTeacherTopics).flat().join(' '),
              icon: "error"
            });
          }
          if(notFoundTestItem.length > 0 ){
            Swal.fire({
              title: "Unfound Test Item task:",
              text: Object.values(notFoundTestItem).flat().join(' '),
              icon: "error"
            });
          }
        }
      } else {
        Swal.fire({
          title: "Error",
          text: 'Niciun rând bifat pentru a fi adăugat în baza de date.',
          icon: "error"
        });
      }
    } else {
      Swal.fire({
        title: "Error",
        text: 'Nu există date din Excel disponibile.',
        icon: "error"
      });
    }
  };

  const [errorList, setErrors] = useState([]);
  const [testItemInput, setTestItemInput] = useState({
    learning_program_id: '',
    theme_learning_program_id: '',
    teacher_topic_id: '',
    teacher_id: '',
    test_item_id: '',
    correct: '',
    option: '',
    explanation: '',
    text_additional: '',
  })

  const [allCheckboxes, setAllCheckboxes] = useState({
    status: false,
  })

  const [blockSnapVisible, setBlockSnapVisible] = useState(false);

  const [testSnapInput, setTestSnapInput] = useState({
    text_1_1: '',
    text_2_1: '',
    text_1_2: '',
    text_2_2: '',
    text_1_3: '',
    text_2_3: '',
    text_1_4: '',
    text_2_4: '',
    
    rasp1: '',
    rasp2: '',
    rasp3: '',
    rasp4: '',

    x1: "285",
    y1: "17"
  })

  const [resultTextAdditional1, setResultTextAdditional1] = useState('');
  const [resultTextAdditional2, setResultTextAdditional2] = useState('');
  const [resultTextAdditional3, setResultTextAdditional3] = useState('');

  const handleInput = (e) => {
    e.persist();

    const { name, value } = e.target;
    setTestItemInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

    const selectedTestItem = testItemList.find((item) => item.id == value);
    setBlockSnapVisible(selectedTestItem && selectedTestItem.type === "snap");
  }

  const handleSnap = (e) => {
    e.persist();

    const { name, value } = e.target;
    setTestSnapInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    // const selectedTestItem = testItemList.find((item) => item.id == value);
    // setBlockSnapVisible(selectedTestItem && selectedTestItem.type === "snap");
  }

  const handleConcatenate = () => {
    let combinations = [];

    for (let i = 1; i <= 4; i++) {
      for (let j = 1; j <= 4; j++) {
        const key1 = `text_1_${i}`;
        const key2 = `text_2_${j}`;
        const combination = `${testSnapInput[key1]}|${testSnapInput[key2]}`;
        combinations.push(combination);
      }
    }
    const result = combinations.join('\n');
    setResultTextAdditional1(result);

    combinations = [];

    for (let i = 1; i <= 4; i++) {
      const key1 = `text_1_${i}`;
      const key2 = `text_2_${testSnapInput[`rasp${i}`]}`;

      for (let j = 1; j <= 4; j++) {
        const combination = `${testSnapInput[key1]}|${testSnapInput[key2]}`;
        combinations.push(combination);
      }
    }
    const result2 = combinations.join('\n');
    setResultTextAdditional2(result2);

    combinations = [];

    let y1 = 17; 

    for (let i = 1; i <= 4; i++) {
      for (let j = 1; j <= 4; j++) {
        const x2 = "342"; 
        const y2 = (j - 1) * 92 + 17; 

        const coordinates = {
          x1: "285", 
          y1: y1.toString(),
          x2,
          y2: y2.toString()
        };

        combinations.push(JSON.stringify(coordinates));
        
        if (j % 4 === 0) {
          y1 += 92;
        }
      }
    }
    const result3 = combinations.join('\n');
    setResultTextAdditional3(result3);
  };


  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({...allCheckboxes, [e.target.name]: e.target.checked})
  }

  const submitTeacherTopic = (e) => {
    e.preventDefault();

    const selectedTestItem = testItemList.find((item) => item.id == testItemInput.test_item_id);
    if(selectedTestItem && selectedTestItem.type === "snap") {

      const lines1 = resultTextAdditional1.trim().split('\n');
      const lines2 = resultTextAdditional2.trim().split('\n');
      const lines3 = resultTextAdditional3.trim().split('\n');
  
      if (lines1.length === lines2.length && lines2.length === lines3.length && lines1.length === 16) {
        const formDataArray = [];
  
        for (let i = 0; i < lines1.length; i++) {
          const formData = new FormData();
          formData.append('option', lines1[i]);
          formData.append('explanation', lines2[i]);
          formData.append('correct', lines1[i] === lines2[i] ? 1 : 0);
  
          formData.append('text_additional', lines3[i]);
          formData.append('test_item_id', testItemInput.test_item_id);
          formData.append('status', allCheckboxes.status ? 1 : 0);
  
          formDataArray.push(formData);
        }

        axios.all(formDataArray.map(formData => axios.post('http://localhost:8000/api/store-test-item-option', formData)))
        .then(axios.spread((...responses) => {
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
          });
          setExcelData(null);
          setAllKeys(null);
          setAdditionalData([]);
          setExcelFile(null);
          document.getElementById('fileExcel').value = '';
        }))
        .catch(error => {
          console.error(error);
        });
      } else {
        console.error('Numărul de rânduri nu este egal cu 16 pentru toate textele.');
      }
    }
    else
    {

    const formData = new FormData();
    formData.append('option',testItemInput.option );
    formData.append('correct',testItemInput.correct );
    formData.append('explanation',testItemInput.explanation );
    formData.append('text_additional',testItemInput.text_additional );
    formData.append('test_item_id',testItemInput.test_item_id );
    formData.append('status',allCheckboxes.status == true ? 1 : 0);

    // console.log(formData)

    axios.post(`http://localhost:8000/api/store-test-item-option`, formData).then(res => {
      if(res.data.status === 201)
      {
        Swal.fire({
          title: "Succes",
          text: res.data.message,
          icon: "success"
        });
        setTestItemInput({
          learning_program_id: '',
          theme_learning_program_id: '',
          teacher_topic_id: '',
          test_item_id: '',
          teacher_id: '',
          correct: '',
          option: '',
          explanation: '',
          text_additional: '',
        });
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
        setErrors(res.data.errors);
      }
    });
   }
  }

  return (
    <div className="container-fluid px4">
      <h2 className="m-3">Add Test Item Option
        <Link to="/admin/view-test-item-option" type="button" className="btnBts btn-primary text-white px-4 m-3 float-end">BACK to List</Link>
      </h2>

        <ul className="navSide nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-linkSide active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-linkSide" id="import-excel-tab" data-bs-toggle="tab" data-bs-target="#import-excel-tags" type="button" role="tab" aria-controls="import-excel-tags" aria-selected="false">Import from Excel</button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
        
          <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <form className="form-group custom-form" onSubmit={submitTeacherTopic}>

          <div className="rowBts">
              <div className="col-md-3">
                <div className="form-group m-3">
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
              <div className="col-md-6">          
                <div className="form-group m-3">
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

              <div className="col-md-3">
                <div className="form-group m-3">
                  <label>Teacher</label>
                  <select name="teacher_id" onChange={handleInput} value={testItemInput.teacher_id} className="form-control">  
                    <option>Select Teacher</option>
                    {
                      teacherList.map((item)=> {
                        return (
                          <option value={item.id} key={item.id}>{item.name}</option>
                        )
                      })
                    }
                  </select>            
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.teacher_id}</span>
                </div>
              </div>
            </div>

            <div className="rowBts">
  

              <div className="col-md-6">
                <div className="form-group m-3">
                  <label>Topics</label>
                  <select name="teacher_topic_id" onChange={handleInput} value={testItemInput.teacher_topic_id} className="form-control">  
                    <option>Select Topic</option>
                    {
                      teacherTopicList
                      .filter((item) => item.teacher_id == testItemInput.teacher_id)
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

              <div className="col-md-6">
                <div className="form-group m-3">
                  <label>Test Item</label>
                  <select name="test_item_id" onChange={handleInput} value={testItemInput.test_item_id} className="form-control">  
                    <option>Select Test Item</option>
                    {
                      testItemList
                      .filter((item) => item.teacher_topic_id == testItemInput.teacher_topic_id)
                      .map((item)=> {
                        return (
                          <option value={item.id} key={item.id}>{item.task} ({item.type})</option>
                        )
                      })
                    }
                  </select>            
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.test_item_id}</span>
                </div>
              </div>

            </div>
            <div className="rowBts">
              <div className="col-md-5">          
                <div className="form-group m-3">
                  <label>Option</label>
                  <input type="text" name="option" onChange={handleInput} value={testItemInput.option}className="form-control" />
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.option}</span>
                </div>
              </div>

              <div className="col-md-2">
                <div className="form-group m-3">
                  <label>Correct</label>
                  <input type="number" name="correct" onChange={handleInput} value={testItemInput.correct} className="form-control" />
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.correct}</span>
                </div>
              </div>

              <div className="col-md-5">          
                <div className="form-group m-3">
                  <label>Explanation (correct answer)</label>
                  <input type="text" name="explanation" onChange={handleInput} value={testItemInput.explanation}className="form-control" />
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.explanation}</span>
                </div>
              </div>

              {/* <div className="col-md-12">
                <div className="form-group m-3">
                  <label>Additional Text</label>
                  <textarea name="text_additional" onChange={handleInput} value={testItemInput.text_additional} className="form-control" />
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.text_additional}</span>
                </div>
              </div> */}
            </div>

            {blockSnapVisible && (
            <div id="block_snap" class="border mt-4 mb-4 p-3 rounded shadow-lg">
            <h3 class="text-center p-3" style={{marginBottom: '10px'}}>Date pentru testul de tip SNAP</h3>

              <div className="rowBts">

              <div class="col-md-2">
                <div class="form-group">
                  <label class="visually-hidden"></label>
                </div>
              </div>


                <div className="col-md-2" style={{marginLeft: '64px'}}>
                  <div className="form-group d-flex align-items-center"  >
                    <label>x1</label>
                    <input type="number" name="x1" value={285} readOnly className="form-control" />
                  </div>
                </div>

                <div class="col-md-2">
                <div class="form-group">
                  <label class="visually-hidden" style={{marginRight: '-20px'}}></label>
                </div>
              </div>

                <div className="col-md-2 d-flex align-items-center" style={{marginLeft: '-20px'}}>
                  <div className="form-group">
                    <label>Asociere rând:</label>
                  </div>
                </div>

                <div className="col-md-2" style={{marginLeft: '44px'}}>
                  <div className="form-group d-flex align-items-center">
                    <label>x2</label>
                    <input type="number" name="x2"  value={342} readOnly className="form-control" />
                  </div>
                </div>
              </div>

              {/* randul 1 */}
              <div className="rowBts">
                <div className="col-md-2">
                  <div className="form-group m-3 d-flex align-items-center">
                    <label>y1</label>
                    <input type="number" name="y1" value={17} readOnly class="form-control" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group m-3  d-flex align-items-center">
                    <input type="text" name="text_1_1" onChange={handleSnap} value={testSnapInput.text_1_1} placeholder='Text randul 1 coloana 1' className="form-control" />
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="form-group m-3  d-flex align-items-center">
                    <input type="number" name="rasp1" onChange={handleSnap} value={testSnapInput.rasp1}className="form-control" />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group m-3  d-flex align-items-center">
                    <input type="text" name="text_2_1" onChange={handleSnap} value={testSnapInput.text_2_1} placeholder='Text randul 1 coloana 2' className="form-control" />
                  </div>
                </div>

              </div>

              {/* randul 2 */}
              <div className="rowBts">
                <div className="col-md-2">
                  <div className="form-group m-3 d-flex align-items-center">
                    <label>y2</label>
                    <input type="number" name="y2" value={109} readOnly className="form-control" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group m-3  d-flex align-items-center">
                    <input type="text" name="text_1_2" onChange={handleSnap} value={testSnapInput.text_1_2} placeholder='Text randul 2 coloana 1'className="form-control" />
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="form-group m-3  d-flex align-items-center">
                    <input type="number" name="rasp2" onChange={handleSnap} value={testSnapInput.rasp2}className="form-control" />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group m-3  d-flex align-items-center">
                    <input type="text" name="text_2_2" onChange={handleSnap} value={testSnapInput.text_2_2} placeholder='Text randul 2 coloana 2' className="form-control" />
                  </div>
                </div>

              </div>

              {/* randul 3 */}
              <div className="rowBts">
                <div className="col-md-2">
                  <div className="form-group m-3 d-flex align-items-center">
                    <label>y3</label>
                    <input type="number" name="y2" value={201} readOnly className="form-control" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group m-3  d-flex align-items-center">
                    <input type="text" name="text_1_3" onChange={handleSnap} value={testSnapInput.text_1_3} placeholder='Text randul 3 coloana 1' className="form-control" />
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="form-group m-3  d-flex align-items-center">
                    <input type="number" name="rasp3" onChange={handleSnap} value={testSnapInput.rasp3}className="form-control" />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group m-3  d-flex align-items-center">
                    <input type="text" name="text_2_3" onChange={handleSnap} value={testSnapInput.text_2_3} placeholder='Text randul 3 coloana 2' className="form-control" />
                  </div>
                </div>

              </div>

              {/* randul 4 */}
              <div className="rowBts">
                <div className="col-md-2">
                  <div className="form-group m-3 d-flex align-items-center">
                    <label>y4</label>
                    <input type="number" name="y2" value={293} readOnly className="form-control" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group m-3  d-flex align-items-center">
                    <input type="text" name="text_1_4" onChange={handleSnap} value={testSnapInput.text_1_4} placeholder='Text randul 4 coloana 1' className="form-control" />
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="form-group m-3  d-flex align-items-center">
                    <input type="number" name="rasp4" onChange={handleSnap} value={testSnapInput.rasp4} className="form-control" />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group m-3  d-flex align-items-center">
                    <input type="text" name="text_2_4" onChange={handleSnap} value={testSnapInput.text_2_4} placeholder='Text randul 4 coloana 2' className="form-control" />
                  </div>
                </div>

                <div class="containerBts d-flex justify-content-center">
                  <button type="button" onClick={handleConcatenate} class="btnBts btn-outline-secondary btn-lg">Genereaza cod</button>
                </div>
              </div>

              {/* textareas */}
              <div className="rowBts">

                <div className="col-md-6">
                  <div className="form-group m-3">
                    <label>Options</label>
                    <textarea name="text_additional1" value={resultTextAdditional1} className="form-control" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group m-3">
                    <label>Explanation</label>
                    <textarea name="text_additional2" value={resultTextAdditional2} className="form-control" />
                  </div>
                </div>



              </div>
              <div className="col-md-4">
                  <div className="form-group m-3">
                    <label>text_additional</label>
                    <textarea name="text_additional3" value={resultTextAdditional3}  className="form-control" />
                  </div>
                </div>
            </div>
            )}


            <div className="rowBts">
              <div className="form-group m-3">
                <label>Status</label>
                <input type="checkbox" name="status" onChange={handleCheckbox} defaultChecked={allCheckboxes.status == 1 ? true: false}/> (0=shown, 1=hidden)
              
              </div>
            </div>
            <button type="submit" className="btnBts btn-success px-4 m-3 float-end">Submit</button>
          </form> 
          </div>

          <div className="tab-pane card-body border fade" id="import-excel-tags" role="tabpanel" aria-labelledby="import-excel-tab">
            <form className="form-group custom-form" onSubmit={handleFileSubmit}>
            <div className="containerBts" style={{ marginLeft: "0"}}>

                <div className="rowBts m-1">
                  <div className="col-md-6">
                    <h3 className="m-4">Upload & View Excel Sheets</h3>
                    <input type="file" id="fileExcel" className="form-control" required onChange={handleFile} />
                    </div>
                  </div>
                <button type="submit" className="btnBts btn-secondary btn-sm px-4 m-3 mt-2">UPLOAD</button>
                {typeError&&(
                  <div className="alert alert-danger" role="alert">{typeError}</div>
                )}
            </div>
            </form>
            <div className="containerBts">
              <form onSubmit={submitTeacherTopics}>
              {excelData?(
                <div className="table-responsive">
                  <table className="table table-primary table-bordered table-striped">
                    <thead>
                      <tr>
                        <th style={{width: '105px'}}>
                          <input
                            type="checkbox"
                            checked={additionalData.every((item) => item.chosen)}
                            onChange={(e) => handleCheckboxChangeAll(e.target.checked)}
                          />
                          Check All
                          </th>
                          {allKeys.map((key)=>(
                          <th key={key}>{key}</th>
                        ))}
                      </tr>
                    </thead>
      
                    <tbody>
                      {excelData.map((individualExcelData, index)=>(
                        <tr key={index}>
                            <td>
                            <input 
                                type="checkbox"
                                checked={additionalData[index]?.chosen || false}
                                onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                              />
                              </td>
                              {allKeys.map((key)=>(
                            <td key={key}>{individualExcelData[key]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
      
                  </table>
                <button type="submit" className="btnBts btn-success px-4 m-3 float-end">Submit</button>
                </div>

              ):(
              <div className="text-center p-5">No File is uploaded yet!</div>
              )}

            </form>
            </div>
          </div>
      </div>
   </div>
  )
}

export default AddTestItemOption;
