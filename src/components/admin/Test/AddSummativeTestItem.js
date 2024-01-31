import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';


import Swal from 'sweetalert2'

function AddSummativeTestItem() {

  const [learningProgramList, setLearningProgramList] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [teacherTopicList, setTeacherTopicList] = useState([]);
  const [testItemList, setTestItemList] = useState([]);
  const [summativeTestList, setSummativeTestList] = useState([]);
  
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

    axios.get('http://localhost:8000/api/all-summative-tests').then(res=>{
      if(res.data.status === 200){
        setSummativeTestList(res.data.summativeTests);
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
        summative_test_id: excelData[index]?.summative_test_id || '',
        summative_test_title: excelData[index]?.summative_test_title || '',        
        order_number: excelData[index]?.order_number || '',
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
        let notFoundSummativeTest = [];

        selectedData.forEach((selectedItem) => {
          const foundTeacherTopic = teacherTopicList.find((teacherTopic) => teacherTopic.name.trim() == selectedItem.teacher_topic_name.trim());
          let foundTestItem = null;
          let foundFirmativeTest = null;

          if (foundTeacherTopic) {
            selectedItem.teacher_topic_id = foundTeacherTopic.id;
            foundTestItem = testItemList.find((item) => item.task.trim() == selectedItem.test_item_task.trim() && item.teacher_topic_id == selectedItem.teacher_topic_id);
            foundFirmativeTest = summativeTestList.find((item) => item.title.trim() == selectedItem.summative_test_title.trim() && item.teacher_topic_id == selectedItem.teacher_topic_id);
         
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
          if (foundFirmativeTest) {
            selectedItem.summative_test_id = foundFirmativeTest.id;
          }
          else {
            notFoundSummativeTest.push(selectedItem.summative_test_title);
          }
        });

        if(notFoundTeacherTopics.length === 0 && notFoundTestItem.length === 0 && notFoundSummativeTest.length === 0)  {

          const formDataArray = selectedData.map(selectedItem => {
            const formData = new FormData();
            formData.append('order_number', selectedItem.order_number || 0);
            formData.append('test_item_id', selectedItem.test_item_id);
            formData.append('summative_test_id', selectedItem.summative_test_id);
            formData.append('status', 0); 
            return formData;
          });
          // console.log(formDataArray)
          // Trimitem fiecare set de date către server utilizând axios.all
          axios.all(formDataArray.map(formData => axios.post('http://localhost:8000/api/store-summative-test-item', formData)))
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
    summative_test_id: '',
    order_number: '',
    type: '',
  })

  const [allCheckboxes, setAllCheckboxes] = useState({
    status: false,
  })

  const handleInput = (e) => {
    e.persist();
    setTestItemInput({...testItemInput, [e.target.name]: e.target.value})
  }

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({...allCheckboxes, [e.target.name]: e.target.checked})
  }

  const submitTeacherTopic = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('order_number',testItemInput.order_number );
    formData.append('test_item_id',testItemInput.test_item_id );
    formData.append('summative_test_id',testItemInput.summative_test_id );
    formData.append('status',allCheckboxes.status == true ? 1 : 0);

    // console.log(formData)

    axios.post(`http://localhost:8000/api/store-summative-test-item`, formData).then(res => {
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
          summative_test_id: '',
          test_item_id: '',
          teacher_id: '',
          order_number: '',
          type: '',
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

  return (
    <div className="container-fluid px4">
      <h2 className="m-3">Add Summative Test Item
        <Link to="/admin/view-summative-test-item" type="button" className="btnBts btn-primary text-white px-4 m-3 float-end">BACK to List</Link>
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
              <div className="col-md-5">
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
              <div className="col-md-7">          
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
            </div>

            <div className="rowBts">
              <div className="col-md-5">
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

              <div className="col-md-7">
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

            </div>
            <div className="rowBts">
              {/* <div className="col-md-4">          
                <div className="form-group m-3">
                  <label>Column Title</label>
                  <input type="text" name="title" onChange={handleInput} value={testItemInput.title}className="form-control" />
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.title}</span>
                </div>
              </div> */}

              <div className="col-md-12">
                <div className="form-group m-3">
                  <label>Summative Test</label>
                  <select name="summative_test_id" onChange={handleInput} value={testItemInput.summative_test_id} className="form-control">  
                    <option>Select Summative Test</option>
                    {
                      summativeTestList
                      .filter((item) => item.teacher_topic_id == testItemInput.teacher_topic_id)
                      // .filter((item) => item.topic.theme_learning_program_id == testItemInput.theme_learning_program_id)                      
                      .map((item)=> {
                        return (
                          <option value={item.id} key={item.id}>{item.title}</option>
                        )
                      })
                    }
                  </select>            
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.summative_test_id}</span>
                </div>
              </div> 

              <div className="col-md-2">
                <div className="form-group m-3">
                  <label>Order number</label>
                  <input type="number" name="order_number" onChange={handleInput} value={testItemInput.order_number} className="form-control" />
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.order_number}</span>
                </div>
              </div>

              <div className="col-md-3">
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
              </div>

              <div className="col-md-7">
                <div className="form-group m-3">
                  <label>Test Item</label>
                  <select name="test_item_id" onChange={handleInput} value={testItemInput.test_item_id} className="form-control">  
                    <option>Select Test Item</option>
                    {
                      testItemList
                      .filter((item) => item.teacher_topic_id == testItemInput.teacher_topic_id)
                      .filter((item) => item.type == testItemInput.type)
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

          <div className="form-group m-3">
              <label>Status</label>
              <input type="checkbox" name="status" onChange={handleCheckbox} defaultChecked={allCheckboxes.status == 1 ? true: false}/> (0=shown, 1=hidden)
           
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

export default AddSummativeTestItem;
