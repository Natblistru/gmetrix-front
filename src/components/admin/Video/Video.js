import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';


import Swal from 'sweetalert2'

function Video() {

  const [excelFile, setExcelFile] = useState(null);
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
      setExcelData(data.slice(0,50));
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
        title: excelData[index]?.title || '', // Verificăm dacă există date pentru index în excelData
        source: excelData[index]?.source || '',
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
          formData.append('title', selectedItem.title);
          formData.append('source', selectedItem.source);
          formData.append('status', 0); 
          return formData;
        });
        // console.log(formDataArray)
        // Trimitem fiecare set de date către server utilizând axios.all
        axios.all(formDataArray.map(formData => axios.post('http://localhost:8000/api/store-video', formData)))
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

  const [videoInput, setVideoInput] = useState({
    title: '',
    source: '',
    error_list: [],
  })

  const [allCheckboxes, setAllCheckboxes] = useState({
    status: false,
  })

  const handleInput = (e) => {
    e.persist();
    setVideoInput({...videoInput, [e.target.name]: e.target.value})
  }

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({...allCheckboxes, [e.target.name]: e.target.checked})
  }

  const submitVideo = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title',videoInput.title );
    formData.append('source',videoInput.source );
    formData.append('status',allCheckboxes.status == true ? 1 : 0);

    axios.post(`http://localhost:8000/api/store-video`, formData).then(res => {
      if(res.data.status === 201)
      {
        Swal.fire({
          title: "Succes",
          text: res.data.message,
          icon: "success"
        });
        setVideoInput({
          title: '',
          source: '',
          error_list: [],
        });
        setAllCheckboxes({
          status: false,
        });
      }
      else if(res.data.status === 422)
      {
        setVideoInput({...videoInput,error_list:res.data.errors});
      }
    });
  }

  return (
    <div className="container-fluid px4">
      <h2 className="m-3">Add Video
        <Link to="/admin/view-video" type="button" className="btnBts btn-primary text-white px-4 m-3 float-end">BACK to List</Link>
      </h2>

        <ul className="navSide nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-linkSide active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
          </li>
          {/* <li className="nav-item" role="presentation">
            <button className="nav-linkSide" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
          </li> */}
          <li className="nav-item" role="presentation">
            <button className="nav-linkSide" id="import-excel-tab" data-bs-toggle="tab" data-bs-target="#import-excel-tags" type="button" role="tab" aria-controls="import-excel-tags" aria-selected="false">Import from Excel</button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
        
          <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <form className="form-group custom-form" onSubmit={submitVideo} >
            <div className="form-group m-3">
              <label>Title</label>
              <input type="text" name="title" onChange={handleInput} value={videoInput.title} className="form-control" />
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{videoInput.error_list.title}</span>            
            </div>
            <div className="form-group m-3">
              <label>Source</label>
              <input type="text" name="source" onChange={handleInput} value={videoInput.source}className="form-control" />
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{videoInput.error_list.source}</span>
            </div>
            <div className="form-group m-3">
              <label>Status</label>
              <input type="checkbox" name="status" onChange={handleCheckbox} defaultChecked={allCheckboxes.status == 1 ? true: false}/> (0=shown, 1=hidden)
           
            </div>
            <button type="submit" className="btnBts btn-success px-4 m-3 float-end">Submit</button>
          </form> 
          </div>
          {/* <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">b</div> */}


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
                        {Object.keys(excelData[0]).map((key)=>(
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
                          {Object.keys(individualExcelData).map((key)=>(
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

export default Video;