import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import * as XLSX from 'xlsx';
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';


import Swal from 'sweetalert2'

function AddEvaluationSubject() {

  const [subjectList, setSubjectList] = useState([]);
  const [evaluationList, setEvaluationList] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:8000/api/all-subject-study-level').then(res=>{
      if(res.data.status === 200){
        setSubjectList(res.data.subject);
      }
    });

    axios.get('http://localhost:8000/api/all-evaluations').then(res=>{
      if(res.data.status === 200){
        setEvaluationList(res.data.evaluations);
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
      const data = XLSX.utils.sheet_to_json(worksheet);
      const dataRestricted = data.slice(0,50);
      setExcelData(dataRestricted);
      setAllKeys([...new Set(dataRestricted.flatMap(row => Object.keys(row)))]);
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
        name: excelData[index]?.name || '', 
        evaluation_id: excelData[index]?.evaluation_id || '',
        evaluation_name: excelData[index]?.evaluation_name || '',
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

  const submitEvaluations = (e) => {
    e.preventDefault();
    if (excelData && excelData.length > 0) {
      const selectedData = additionalData.filter(item => item.chosen);
      if (selectedData.length > 0) {

        let notFoundEvaluation = [];

        selectedData.forEach((selectedItem) => {
          const foundEvaluation = evaluationList.find((evaluation) => evaluation.name === selectedItem.evaluation_name);
        
          if (foundEvaluation) {
            selectedItem.evaluation_id = foundEvaluation.id;
          }
          else {
            notFoundEvaluation.push(selectedItem.evaluation_name);
          }
        });

        if(notFoundEvaluation.length === 0) {

          const formDataArray = selectedData.map(selectedItem => {

            let order_number = null;
            let path = "";
            if(selectedItem.name == "Subiectul I") {
              order_number = 1;
              path = "/examen-subiect1";
            } else if(selectedItem.name == "Subiectul II") {
              order_number = 2;
              path = "/examen-subiect2";
            } else if(selectedItem.name == "Subiectul III") {
              order_number = 3;
              path = "/examen-subiect3";
            }
            const formData = new FormData();
            formData.append('name', selectedItem.name );
            formData.append('evaluation_id', selectedItem.evaluation_id );
            formData.append('order_number', order_number );
            formData.append('path', path );
            formData.append('status', 0); 
            return formData;
          });
          console.log(formDataArray)
          // Trimitem fiecare set de date către server utilizând axios.all
          axios.all(formDataArray.map(formData => axios.post('http://localhost:8000/api/store-evaluation-subject', formData)))
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
          Swal.fire({
            title: "Unfound evaluations:",
            text: Object.values(notFoundEvaluation).flat().join(' '),
            icon: "error"
          });
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
  const [evaluationSubjectInput, setEvaluationSubjectInput] = useState({
    year: '',
    evaluation_id: '',
    subject_study_level_id: '',
    name: '',
  })

  const [allCheckboxes, setAllCheckboxes] = useState({
    status: false,
  })

  const handleInput = (e) => {
    e.persist();
    setEvaluationSubjectInput({...evaluationSubjectInput, [e.target.name]: e.target.value})
  }

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({...allCheckboxes, [e.target.name]: e.target.checked})
  }

  const submitEvaluation = (e) => {
    e.preventDefault();

    let subject_study_level_name = "";
    const foundEvaluation = subjectList.find((subject) => subject.id == evaluationSubjectInput.subject_study_level_id);
        
    if (foundEvaluation) {
      subject_study_level_name = foundEvaluation.name;
    }
    let order_number = null;
    let path = "";
    if(evaluationSubjectInput.name == "Subiectul I") {
      order_number = 1;
      path = "/examen-subiect1";
    } else if(evaluationSubjectInput.name == "Subiectul II") {
      order_number = 2;
      path = "/examen-subiect2";
    } else if(evaluationSubjectInput.name == "Subiectul III") {
      order_number = 3;
      path = "/examen-subiect3";
    }

    const formData = new FormData();
    formData.append('name', evaluationSubjectInput.name );
    formData.append('evaluation_id',evaluationSubjectInput.evaluation_id );
    formData.append('order_number',order_number );
    formData.append('path',path );
    formData.append('status',allCheckboxes.status == true ? 1 : 0);

    console.log(formData)

    axios.post(`http://localhost:8000/api/store-evaluation-subject`, formData).then(res => {
      if(res.data.status === 201)
      {
        Swal.fire({
          title: "Succes",
          text: res.data.message,
          icon: "success"
        });
        setEvaluationSubjectInput({
          year: '',
          evaluation_id: '',
          subject_study_level_id: '',
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
      <h2 className="m-3">Add Evaluation Subject
        <Link to="/admin/view-evaluation-subject" type="button" className="btnBts btn-primary text-white px-4 m-3 float-end">BACK to List</Link>
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
          <form className="form-group custom-form" onSubmit={submitEvaluation} >
          <div className="rowBts">
          <div className="col-md-4">          
            <div className="form-group m-3">
              <label>Select Subject Study Level</label>
              <select name="subject_study_level_id" onChange={handleInput} value={evaluationSubjectInput.subject_study_level_id} className="form-control">  
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
              <input type="text" name="year" onChange={handleInput} value={evaluationSubjectInput.year} className="form-control" />
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.year}</span>
            </div>
          </div>

          <div className="col-md-6">          
            <div className="form-group m-3">
              <label>Select Evaluation</label>
              <select name="evaluation_id" onChange={handleInput} value={evaluationSubjectInput.evaluation_id} className="form-control">  
                <option>Select Evaluation</option>
                {
                  evaluationList
                  .filter((item) => item.subject_study_level_id == evaluationSubjectInput.subject_study_level_id)
                  .filter((item) => item.year == evaluationSubjectInput.year)
                  .map((item)=> {
                    return (
                      <option value={item.id} key={item.id}>{item.name}</option>
                    )
                  })
                }
              </select>            
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.evaluation_id}</span>
            </div>
          </div>

          </div> 
          <div className="rowBts">   
            <div className="col-md-4">
              <div className="form-group m-3">
                <label>Select Subject</label>
                  <select name="name" onChange={handleInput} value={evaluationSubjectInput.name} className="form-control">
                    <option>Select Subject</option>
                    <option value="Subiectul I">Subiectul I</option>
                    <option value="Subiectul II">Subiectul II</option>
                    <option value="Subiectul III">Subiectul III</option>
                  </select>
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.name}</span>
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
              <form onSubmit={submitEvaluations}>
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

export default AddEvaluationSubject;
