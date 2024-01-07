import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import * as XLSX from 'xlsx';
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2'

function AddEvaluationAnswerOption() {

  const [subjectList, setSubjectList] = useState([]);
  const [chapterList, setChapterList] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [evaluationSubjectList, setEvaluationSubjectList] = useState([]);
  const [evaluationItemList, setEvaluationItemList] = useState([]);
  const [evaluationAnswerList, setEvaluationAnswerList] = useState([]);
  const [evaluationOptionList, setEvaluationOptionList] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:8000/api/all-subject-study-level').then(res=>{
      if(res.data.status === 200){
        setSubjectList(res.data.subject);
      }
    });

    axios.get('http://localhost:8000/api/all-chapters').then(res=>{
      if(res.data.status === 200){
        setChapterList(res.data.chapters);
      }
    });

    axios.get('http://localhost:8000/api/all-themes').then(res=>{
      if(res.data.status === 200){
        setThemeList(res.data.themes);
      }
    });

    axios.get('http://localhost:8000/api/all-evaluation-subjects').then(res=>{
      if(res.data.status === 200){
        setEvaluationSubjectList(res.data.evaluationSubjects);
      }
    });

    axios.get('http://localhost:8000/api/all-evaluation-items').then(res=>{
      if(res.data.status === 200){
        setEvaluationItemList(res.data.evaluationItems);
      }
    });

    axios.get('http://localhost:8000/api/all-evaluation-answers').then(res=>{
      if(res.data.status === 200){
        setEvaluationAnswerList(res.data.evaluationAnswers);
      }
    });

    axios.get('http://localhost:8000/api/all-evaluation-options').then(res=>{
      if(res.data.status === 200){
        setEvaluationOptionList(res.data.evaluationOptions);
      }
    });

  },[])

  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  const [excelData, setExcelData] = useState(null);
  const [allKeys, setAllKeys] = useState(null);
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
        evaluation_answer_task: excelData[index]?.evaluation_answer_task || '', 
        evaluation_answer_id: excelData[index]?.evaluation_answer_id || '', 
        evaluation_item_task: excelData[index]?.evaluation_item_task || '',
        evaluation_item_id: excelData[index]?.evaluation_item_id || '',
        evaluation_subject_title: excelData[index]?.evaluation_subject_title || '',
        evaluation_subject_id: excelData[index]?.evaluation_subject_id || '',
        evaluation_option_label: excelData[index]?.evaluation_option_label || '',
        evaluation_option_id: excelData[index]?.evaluation_option_id || '',
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

  const submitEvaluationAnswerOptions = (e) => {
    e.preventDefault();
    if (excelData && excelData.length > 0) {
      const selectedData = additionalData.filter(item => item.chosen);
      if (selectedData.length > 0) {

        let notFoundEvaluationSubject = [];  
        let notFoundEvaluationItem = [];  
        let notFoundEvaluationAnswer = [];  
        let notFoundEvaluationOption = [];          

        selectedData.forEach((selectedItem) => {
          const foundEvaluationSubject = evaluationSubjectList.find((item) => item.title === selectedItem.evaluation_subject_title );
          let foundEvaluationItem = null;
          let foundEvaluationAnswer = null;
          const foundEvaluationOption = evaluationOptionList.find((item) => item.label === selectedItem.evaluation_option_label );

          if (foundEvaluationSubject) {
            selectedItem.evaluation_subject_id = foundEvaluationSubject.id;
            foundEvaluationItem = evaluationItemList.find((item) => item.task === selectedItem.evaluation_item_task && item.evaluation_subject_id == selectedItem.evaluation_subject_id );
          }
          else {
            notFoundEvaluationSubject.push(selectedItem.evaluation_subject_title);
          }

          if (foundEvaluationItem) {
            selectedItem.evaluation_item_id = foundEvaluationItem.id;
            foundEvaluationAnswer = evaluationAnswerList.find((item) => item.task == selectedItem.evaluation_answer_task && item.evaluation_item_id == selectedItem.evaluation_item_id );
          }
          else {
            notFoundEvaluationItem.push(selectedItem.evaluation_item_task);
          }
          if (foundEvaluationAnswer) {
            selectedItem.evaluation_answer_id = foundEvaluationAnswer.id;
          }
          else {
            notFoundEvaluationAnswer.push(selectedItem.evaluation_answer_task);
          }
          console.log(foundEvaluationAnswer)
          if (foundEvaluationOption) {
            selectedItem.evaluation_option_id = foundEvaluationOption.id;
          }
          else {
            notFoundEvaluationOption.push(selectedItem.evaluation_option_label);
          }
        });

        if(notFoundEvaluationSubject.length === 0 && notFoundEvaluationItem.length === 0 && notFoundEvaluationAnswer.length === 0 && notFoundEvaluationOption.length === 0) {

          const formDataArray = selectedData.map(selectedItem => {
            const formData = new FormData();
            formData.append('evaluation_answer_id', selectedItem.evaluation_answer_id );
            formData.append('evaluation_option_id', selectedItem.evaluation_option_id );
            formData.append('status', 0); 
            return formData;
          });
          console.log(formDataArray)
          // Trimitem fiecare set de date către server utilizând axios.all
          axios.all(formDataArray.map(formData => axios.post('http://localhost:8000/api/store-evaluation-answer-option', formData)))
              .then(axios.spread((...responses) => {
                const successResponses = responses.filter(response => response.data.status === 201);
                const errorResponses = responses.filter(response => response.data.status === 422);
                console.log(successResponses)
                console.log(errorResponses)                
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
          if(notFoundEvaluationSubject.length > 0 ) {
            Swal.fire({
              title: "Unfound evaluation subject name:",
              text: Object.values(notFoundEvaluationSubject).flat().join(' '),
              icon: "error"
            });
          }
          if(notFoundEvaluationItem.length > 0 ) {
            Swal.fire({
              title: "Unfound evaluation item name:",
              text: Object.values(notFoundEvaluationItem).flat().join(' '),
              icon: "error"
            });
          }
          if(notFoundEvaluationAnswer.length > 0 ) {
            Swal.fire({
              title: "Unfound evaluation answer:",
              text: Object.values(notFoundEvaluationAnswer).flat().join(' '),
              icon: "error"
            });
          }
          if(notFoundEvaluationOption.length > 0 ) {
            Swal.fire({
              title: "Unfound evaluation item name:",
              text: Object.values(notFoundEvaluationOption).flat().join(' '),
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
  const [evaluationItemInput, setEvaluationItemInput] = useState({
    subject_study_level_id: '',
    chapter_id: '',
    theme_id: '',
    year: '',
    evaluation_subject_id: '',
    evaluation_item_id: '',
    evaluation_answer_id: '',
    evaluation_option_id: '',
  })

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const [allCheckboxes, setAllCheckboxes] = useState({
    status: false,
  })

  const handleInput = (e) => {
    e.persist();
    const { name, value } = e.target;
    setEvaluationItemInput({...evaluationItemInput, [name]: value })
  
    if (name === 'evaluation_answer_id') {
      const selectedAnswer = evaluationAnswerList.find((item) => item.id === parseInt(value, 10));
      setSelectedAnswer(selectedAnswer);
    }

    if (name === 'evaluation_option_id') {
      const selectedOption = evaluationOptionList.find((item) => item.id === parseInt(value, 10));
      setSelectedOption(selectedOption);
    }
  }

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({...allCheckboxes, [e.target.name]: e.target.checked})
  }

  const submitEvaluationAnswerOption = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('evaluation_answer_id',evaluationItemInput.evaluation_answer_id );
    formData.append('evaluation_option_id',evaluationItemInput.evaluation_option_id );
    formData.append('status',allCheckboxes.status == true ? 1 : 0);

    console.log(formData)

    axios.post(`http://localhost:8000/api/store-evaluation-answer-option`, formData).then(res => {
      console.log(res)
      if(res.data.status === 201)
      {
        Swal.fire({
          title: "Succes",
          text: res.data.message,
          icon: "success"
        });
        setEvaluationItemInput({
          subject_study_level_id: '',
          chapter_id: '',
          theme_id: '',
          year: '',
          evaluation_subject_id: '',
          evaluation_item_id: '',
          evaluation_answer_id: '',
          evaluation_option_id: '',
        });
        setAllCheckboxes({
          status: false,
        });
        setErrors([]);
      }
      else if(res.data.status === 422)
      {
        console.log(res.data.errors);
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
      <h2 className="m-3">Add Evaluation Answer Option
        <Link to="/admin/view-evaluation-answer-option" type="button" className="btnBts btn-primary text-white px-4 m-3 float-end">BACK to List</Link>
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
            <form className="form-group custom-form" onSubmit={submitEvaluationAnswerOption} encType="multipart/form-data">
              <div className="rowBts">

                <div className="col-md-3">          
                  <div className="form-group m-3">
                    <label>Select Subject Study Level</label>
                    <select name="subject_study_level_id" onChange={handleInput} value={evaluationItemInput.subject_study_level_id} className="form-control">  
                      <option>Select Subject Study Level</option>
                      {
                        subjectList.map((item)=> {
                          return (
                            <option value={item.id} key={item.id}>{item.name}</option>
                          )
                        })
                      }
                    </select>            
                    <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.subject_study_level_id}</span>
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="form-group m-3">
                    <label>Year</label>
                    <input type="text" name="year" onChange={handleInput} value={evaluationItemInput.year} className="form-control" />
                    <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.year}</span>
                  </div>
                </div>

                <div className="col-md-7">          
                  <div className="form-group m-3">
                    <label>Select Evaluation Subject</label>
                    <select name="evaluation_subject_id" onChange={handleInput} value={evaluationItemInput.evaluation_subject_id} className="form-control">  
                      <option>Select Evaluation Subject</option>
                      {
                        evaluationSubjectList
                        .filter((item) => item.evaluation.subject_study_level_id == evaluationItemInput.subject_study_level_id)
                        .filter((item) => item.evaluation.year == evaluationItemInput.year)                  
                        .map((item)=> {
                          return (
                            <option value={item.id} key={item.id}>{item.title}</option>
                          )
                        })
                      }
                    </select>            
                    <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.evaluation_subject_id}</span>
                  </div>
                </div>

                <div className="col-md-5">          
                  <div className="form-group m-3">
                    <label>Select Chapter</label>
                    <select name="chapter_id" onChange={handleInput} value={evaluationItemInput.chapter_id} className="form-control">  
                      <option>Select Chapter</option>
                      {
                        chapterList
                        .filter((item) => item.subject_study_level_id == evaluationItemInput.subject_study_level_id)
                        .map((item)=> {
                          return (
                            <option value={item.id} key={item.id}>{item.name}</option>
                          )
                        })
                      }
                    </select>            
                    <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.chapter_id}</span>
                  </div>
                </div>

                <div className="col-md-7">          
                  <div className="form-group m-3">
                    <label>Select Theme</label>
                    <select name="theme_id" onChange={handleInput} value={evaluationItemInput.theme_id} className="form-control">  
                      <option>Select Theme</option>
                      {
                        themeList
                        .filter((item) => item.chapter_id == evaluationItemInput.chapter_id)
                        .map((item)=> {
                          return (
                            <option value={item.id} key={item.id}>{item.name}</option>
                          )
                        })
                      }
                    </select>            
                    <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.theme_id}</span>
                  </div>
                </div>

                <div className="col-md-5">          
                  <div className="form-group m-3">
                    <label>Select Evaluation Item</label>
                    <select name="evaluation_item_id" onChange={handleInput} value={evaluationItemInput.evaluation_item_id} className="form-control">  
                      <option>Select Evaluation Item</option>
                      {
                        evaluationItemList
                        .filter((item) => item.theme_id == evaluationItemInput.theme_id)
                        .filter((item) => item.evaluation_subject_id == evaluationItemInput.evaluation_subject_id)
                        .map((item)=> {
                          return (
                            <option value={item.id} key={item.id}>{item.order_number}. {item.task}</option>
                          )
                        })
                      }
                    </select>            
                    <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.evaluation_item_id}</span>
                  </div>
                </div>

                <div className="col-md-5">          
                  <div className="form-group m-3">
                    <label>Select Answer Task</label>
                    <select name="evaluation_answer_id" onChange={handleInput} value={evaluationItemInput.evaluation_answer_id} className="form-control">  
                      <option>Select Answer Task</option>
                      {
                        evaluationAnswerList
                        .filter((item) => item.evaluation_item_id == evaluationItemInput.evaluation_item_id)
                        .map((item)=> {
                          return (
                            <option value={item.id} key={item.id}>{item.order_number}. {item.task}</option>
                          )
                        })
                      }
                    </select>            
                    <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.evaluation_answer_id}</span>
                  </div>
                </div>

                <div className="col-md-2">
                    <div className="form-group" style={{ border: '1px solid #ccc', padding: '10px', margin: '37px 20px 0 0' }}>
                      <label>Max. Points: </label>
                      {selectedAnswer && (                
                      <label>{selectedAnswer.max_points}</label>
                      )}
                    </div>
                </div>
              </div> 

              <div className="rowBts">

                <div className="col-md-10">          
                  <div className="form-group m-3">
                    <label>Select Option</label>
                    <select name="evaluation_option_id" onChange={handleInput} value={evaluationItemInput.evaluation_option_id} className="form-control">  
                      <option>Select Answer Task</option>
                      {
                        evaluationOptionList
                        .map((item)=> {
                          return (
                            <option value={item.id} key={item.id}>{item.label}</option>
                          )
                        })
                      }
                    </select>            
                    <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.evaluation_option_id}</span>
                  </div>
                </div>

                <div className="col-md-2">
                    <div className="form-group" style={{ border: '1px solid #ccc', padding: '10px', margin: '37px 20px 0 0' }}>
                      <label>Points: </label>
                      {selectedOption && (                
                      <label>{selectedOption.points}</label>
                      )}
                    </div>
                </div>
              </div>

              <div className="rowBts">   
                <div className="col-md-4">
                  <div className="form-group m-3">
                    <label>Status</label>
                    <input type="checkbox" name="status" onChange={handleCheckbox} defaultChecked={allCheckboxes.status == 1 ? true: false}/> (0=shown, 1=hidden)
                  </div>
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
              <form onSubmit={submitEvaluationAnswerOptions}>
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

export default AddEvaluationAnswerOption;
