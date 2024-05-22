import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';


import Swal from 'sweetalert2'

function AddTeacherTopic() {

  const [learningProgramList, setLearningProgramList] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  
  useEffect(() => {

    axios.get('/api/all-learningPrograms').then(res=>{
      if(res.data.status === 200){
        setLearningProgramList(res.data.learningProgram);
      }
    });

    axios.get('/api/all-themeLearningPrograms').then(res=>{
      if(res.data.status === 200){
        setThemeList(res.data.theme);
      }
    });

    axios.get('/api/all-topics').then(res=>{
      if(res.data.status === 200){
        setTopicList(res.data.topics);
      }
    });

    axios.get('/api/all-teachers').then(res=>{
      if(res.data.status === 200){
        setTeacherList(res.data.teachers);
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
        order_number: excelData[index]?.order_number || '', 
        topic_name: excelData[index]?.topic_name || '',
        topic_id: excelData[index]?.topic_id || '',
        teacher_name: excelData[index]?.teacher_name || '',
        teacher_id: excelData[index]?.teacher_id || '',
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

        let notFoundTeachers = [];
        let notFoundTopics = [];

        selectedData.forEach((selectedItem) => {
          const foundTeacher = teacherList.find((teacher) => teacher.name.trim() == selectedItem.teacher_name.trim());
          const foundTopic = topicList.find((topic) => topic.name.trim() == selectedItem.topic_name.trim());
        
          if (foundTeacher) {
            selectedItem.teacher_id = foundTeacher.id;
          }
          else {
            notFoundTeachers.push(selectedItem.teacher_name);
          }
          if (foundTopic) {
            selectedItem.topic_id = foundTopic.id;
          }
          else {
            notFoundTopics.push(selectedItem.topic_name);
          }
        });

        if(notFoundTeachers.length === 0  && notFoundTopics.length === 0)  {
          // console.log(selectedData)
          const formDataArray = selectedData.map(selectedItem => {
            const formData = new FormData();
            formData.append('name', `${selectedItem.topic_name} (${selectedItem.teacher_name})`);
            formData.append('order_number', selectedItem.order_number);
            formData.append('teacher_id', selectedItem.teacher_id);
            formData.append('topic_id', selectedItem.topic_id );
            formData.append('status', 0); 
            return formData;
          });
          // console.log(formDataArray)
          // Trimitem fiecare set de date către server utilizând axios.all
          axios.all(formDataArray.map(formData => axios.post('/api/store-teacherTopic', formData)))
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
          if(notFoundTeachers.length > 0 ) {
            Swal.fire({
              title: "Unfound teacher name:",
              text: Object.values(notFoundTeachers).flat().join(' '),
              icon: "error"
            });
          }
          if(notFoundTopics.length > 0 ){
            Swal.fire({
              title: "Unfound topic name:",
              text: Object.values(notFoundTopics).flat().join(' '),
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
  const [teacherTopicInput, setTeacherTopicInput] = useState({
    learning_program_id: '',
    theme_learning_program_id: '',
    topic_id: '',
    teacher_id: '',
    order_number: '',
    name: '',
  })

  useEffect(() => {
    const selectedTopic = topicList.find((topic) => topic.id == teacherTopicInput.topic_id);
    const topicName = selectedTopic ? selectedTopic.name : '';
    const selectedTeacher = teacherList.find((teacher) => teacher.id == teacherTopicInput.teacher_id);
    const teacherName = selectedTeacher ? selectedTeacher.name : '';

    const concatenatedName =
    topicName !== '' && teacherName !== '' ? `${topicName} (${teacherName})` : '';
    setTeacherTopicInput((prevInput) => ({
      ...prevInput,
      name: concatenatedName,
    }));
  }, [teacherTopicInput.topic_id, teacherTopicInput.teacher_id]);

  const [allCheckboxes, setAllCheckboxes] = useState({
    status: false,
  })

  const handleInput = (e) => {
    e.persist();
    setTeacherTopicInput({...teacherTopicInput, [e.target.name]: e.target.value})
  }

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({...allCheckboxes, [e.target.name]: e.target.checked})
  }

  const submitTeacherTopic = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name',teacherTopicInput.name );
    formData.append('order_number',teacherTopicInput.order_number );
    formData.append('teacher_id',teacherTopicInput.teacher_id );
    formData.append('topic_id',teacherTopicInput.topic_id );
    formData.append('status',allCheckboxes.status == true ? 1 : 0);

    // console.log(formData)

    axios.post(`/api/store-teacherTopic`, formData).then(res => {
      if(res.data.status === 201)
      {
        Swal.fire({
          title: "Succes",
          text: res.data.message,
          icon: "success"
        });
        setTeacherTopicInput({
          learning_program_id: '',
          theme_learning_program_id: '',
          topic_id: '',
          teacher_id: '',
          order_number: '',
          name: '',
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
      <h2 className="m-3">Add Teacher Topic
        <Link to="/admin/view-teacher-topic" type="button" className="btnBts btn-primary text-white px-4 m-3 float-end">BACK to List</Link>
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
          <form className="form-group custom-form" onSubmit={submitTeacherTopic} >

          <div className="rowBts">
              <div className="col-md-3">
                <div className="form-group m-3">
                  <label>Learn Program</label>
                  <select name="learning_program_id" onChange={handleInput} value={teacherTopicInput.learning_program_id} className="form-control">  
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
              <div className="col-md-9">          
                <div className="form-group m-3">
                  <label>Theme</label>
                  <select name="theme_learning_program_id" onChange={handleInput} value={teacherTopicInput.theme_learning_program_id} className="form-control">  
                    <option>Select Theme</option>
                    {themeList
                      .filter((item) => item.learning_program_id == teacherTopicInput.learning_program_id)
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
              <div className="form-group m-3">
                  <label>Topic</label>
                  <select name="topic_id" onChange={handleInput} value={teacherTopicInput.topic_id} className="form-control">  
                    <option>Select Topic</option>
                    {topicList
                      .filter((item) => item.theme_learning_program_id == teacherTopicInput.theme_learning_program_id)
                      .map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                    ))}
                  </select>            
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.topic_id}</span>
                </div>
              </div>  
            </div>

            <div className="rowBts">
              <div className="col-md-3">
                <div className="form-group m-3">
                  <label>Teacher</label>
                  <select name="teacher_id" onChange={handleInput} value={teacherTopicInput.teacher_id} className="form-control">  
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
                  <label>Teacher's Topic Title</label>
                  <input type="text" name="name" onChange={handleInput} value={teacherTopicInput.name}className="form-control" />
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.name}</span>
                </div>
              </div>

              <div className="col-md-2">
                <div className="form-group m-3">
                  <label>Order number</label>
                  <input type="number" name="order_number" onChange={handleInput} value={teacherTopicInput.order_number} className="form-control" />
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.order_number}</span>
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

export default AddTeacherTopic;
