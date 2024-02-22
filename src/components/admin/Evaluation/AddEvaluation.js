import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import * as XLSX from 'xlsx';
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';


import Swal from 'sweetalert2'

function AddEvaluation() {

  const [subjectList, setSubjectList] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:8000/api/all-subject-study-level').then(res=>{
      if(res.data.status === 200){
        setSubjectList(res.data.subject);
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
        year: excelData[index]?.year || '', 
        type: excelData[index]?.type || '',
        subject_study_level_id: excelData[index]?.subject_study_level_id || '',
        subject_study_level_name: excelData[index]?.subject_study_level_name || '',
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

        let notFoundTitles = [];

        selectedData.forEach((selectedItem) => {
          const foundSubject = subjectList.find((subject) => subject.name === selectedItem.subject_study_level_name);
        
          if (foundSubject) {
            selectedItem.subject_study_level_id = foundSubject.id;
          }
          else {
            notFoundTitles.push(selectedItem.subject_study_level_name);
          }
        });

        if(notFoundTitles.length === 0) {

          // console.log(selectedData)
          const formDataArray = selectedData.map(selectedItem => {
            const formData = new FormData();
            formData.append('name', `${selectedItem.type}, ${selectedItem.subject_study_level_name}, (${selectedItem.year})` );
            formData.append('year', selectedItem.year);
            formData.append('type', selectedItem.type);
            formData.append('subject_study_level_id', selectedItem.subject_study_level_id );
            formData.append('status', 0); 
            return formData;
          });
          // console.log(formDataArray)
          // Trimitem fiecare set de date către server utilizând axios.all
          axios.all(formDataArray.map(formData => axios.post('http://localhost:8000/api/store-evaluation', formData)))
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
            title: "Unfound subect titles:",
            text: Object.values(notFoundTitles).flat().join(' '),
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
  const [evaluationInput, setEvaluationInput] = useState({
    year: '',
    type: '',
    subject_study_level_id: '',
  })

  const [allCheckboxes, setAllCheckboxes] = useState({
    status: false,
  })

  const handleInput = (e) => {
    e.persist();
    setEvaluationInput({...evaluationInput, [e.target.name]: e.target.value})
  }

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({...allCheckboxes, [e.target.name]: e.target.checked})
  }

  const submitEvaluation = (e) => {
    e.preventDefault();

    let subject_study_level_name = "";
    const foundSubject = subjectList.find((subject) => subject.id == evaluationInput.subject_study_level_id);
        
    if (foundSubject) {
      subject_study_level_name = foundSubject.name;
    }

    const formData = new FormData();
    formData.append('name', `${evaluationInput.type}, ${subject_study_level_name}, (${evaluationInput.year})` );
    formData.append('year',evaluationInput.year );
    formData.append('type',evaluationInput.type );
    formData.append('subject_study_level_id',evaluationInput.subject_study_level_id );
    formData.append('status',allCheckboxes.status == true ? 1 : 0);

    // console.log(formData)

    axios.post(`http://localhost:8000/api/store-evaluation`, formData).then(res => {
      if(res.data.status === 201)
      {
        Swal.fire({
          title: "Succes",
          text: res.data.message,
          icon: "success"
        });
        setEvaluationInput({
          year: '',
          type: '',
          subject_study_level_id: '',
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
      <h2 className="m-3">Add Evaluation
        <Link to="/admin/view-evaluation" type="button" className="btnBts btn-primary text-white px-4 m-3 float-end">BACK to List</Link>
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
            <div className="col-md-2">
              <div className="form-group m-3">
                <label>Year</label>
                <input type="text" name="year" onChange={handleInput} value={evaluationInput.year} className="form-control" />
                <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.year}</span>
              </div>
            </div>
            <div className="col-md-4">          
                <div className="form-group m-3">
                  <label>Select Subject</label>
                  <select name="subject_study_level_id" onChange={handleInput} value={evaluationInput.subject_study_level_id} className="form-control">  
                    <option>Select Subject</option>
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
            <div className="col-md-4">
              <div className="form-group m-3">
                <label>Select Type</label>
                  <select name="type" onChange={handleInput} value={evaluationInput.type} className="form-control">
                    <option>Select Type</option>
                    <option value="Testare de baza">Testare de baza</option>
                    <option value="Pretestare">Pretestare</option>
                    <option value="Teste pentru exersare1">Teste pentru exersare1</option>
                    <option value="Teste pentru exersare2">Teste pentru exersare2</option>
                    <option value="Evaluare suplimentara">Evaluare suplimentara</option>
                    <option value="Teste preparatorii">Teste preparatorii</option>
                    <option value="Teste preparatorii2">Teste preparatorii2</option>
                    <option value="Teste preparatorii3">Teste preparatorii3</option>
                  </select>
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.type}</span>
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

export default AddEvaluation;
