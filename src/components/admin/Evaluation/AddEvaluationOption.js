import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';


import Swal from 'sweetalert2'

function AddEvaluationOption() {

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
        label: excelData[index]?.label || '', // Verificăm dacă există date pentru index în excelData
        points: excelData[index]?.points || '',
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

  const submitVideos = (e) => {
    e.preventDefault();
    if (excelData && excelData.length > 0) {
      const selectedData = additionalData.filter(item => item.chosen);
      if (selectedData.length > 0) {
        const formDataArray = selectedData.map(selectedItem => {
          const formData = new FormData();
          formData.append('label', selectedItem.label);
          formData.append('points', parseInt(selectedItem.points || "0", 10));
          formData.append('status', 0); 
          return formData;
        });
        console.log(formDataArray)
        // Trimitem fiecare set de date către server utilizând axios.all
        axios.all(formDataArray.map(formData => axios.post(`http://localhost:8000/api/store-evaluation-option`, formData)))
            .then(axios.spread((...responses) => {
              const successResponses = responses.filter(response => response.data.status === 201);
              const errorResponses = responses.filter(response => response.data.status === 422);
              // console.log(responses)
              // console.log(successResponses.length)              
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
        console.log('Niciun rând bifat pentru a fi adăugat în baza de date.');
      }
    } else {
      console.log('Nu există date din Excel disponibile.');
  }
};

  const [evaluationOption, setEvaluationOption] = useState({
    label: '',
    points: '',
    error_list: [],
  })

  const [allCheckboxes, setAllCheckboxes] = useState({
    status: false,
  })

  const handleInput = (e) => {
    e.persist();
    setEvaluationOption({...evaluationOption, [e.target.name]: e.target.value})
  }

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({...allCheckboxes, [e.target.name]: e.target.checked})
  }

  const submitVideo = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('label',evaluationOption.label );
    formData.append('points',evaluationOption.points );
    formData.append('status',allCheckboxes.status == true ? 1 : 0);

    axios.post(`http://localhost:8000/api/store-evaluation-option`, formData).then(res => {
      if(res.data.status === 201)
      {
        Swal.fire({
          title: "Succes",
          text: res.data.message,
          icon: "success"
        });
        setEvaluationOption({
          label: '',
          points: '',
          error_list: [],
        });
        setAllCheckboxes({
          status: false,
        });
      }
      else if(res.data.status === 422)
      {
        setEvaluationOption({...evaluationOption,error_list:res.data.errors});
      }
    });
  }

  return (
    <div className="container-fluid px4">
      <h2 className="m-3">Add Evaluation Option
        <Link to="/admin/view-evaluation-option" type="button" className="btnBts btn-primary text-white px-4 m-3 float-end">BACK to List</Link>
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
          <form className="form-group custom-form" onSubmit={submitVideo} >
            <div className="form-group m-3">
              <label>Label</label>
              <input type="text" name="label" onChange={handleInput} value={evaluationOption.label} className="form-control" />
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{evaluationOption.error_list.label}</span>            
            </div>
            <div className="form-group m-3">
              <label>Points</label>
              <input type="number" name="points" onChange={handleInput} value={evaluationOption.points}className="form-control" />
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{evaluationOption.error_list.points}</span>
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
              <form onSubmit={submitVideos}>
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

export default AddEvaluationOption;