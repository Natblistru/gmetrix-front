import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import * as XLSX from 'xlsx';
import InputMask from 'react-input-mask';
import { Link, useHistory  } from 'react-router-dom';


import Swal from 'sweetalert2'

function EditEvaluationSubjectSource(props) {

  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [subjectList, setSubjectList] = useState([]);
  const [chapterList, setChapterList] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [evaluationSubjectList, setEvaluationSubjectList] = useState([]);
  const [evaluationSourceList, setEvaluationSourceList] = useState([]);

  const [errorList, setErrors] = useState([]);
  const [evaluationSubjectSourceInput, setEvaluationSubjectSourceInput] = useState({
    subject_study_level_id: '',
    chapter_id: '',
    theme_id: '',
    year: '',
    evaluation_subject_id: '',
    evaluation_source_id: '',
    order_number: '',
  })

  const [allCheckboxes, setAllCheckboxes] = useState({
    status: false,
  })

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

    axios.get('http://localhost:8000/api/all-evaluation-sources').then(res=>{
      if(res.data.status === 200){
        setEvaluationSourceList(res.data.evaluationSources);
      }
    });

    const evaluationSubjectSource_id = props.match.params.id;
    axios.get(`http://localhost:8000/api/edit-evaluation-subject-source/${evaluationSubjectSource_id}`).then(res=>{
    if(res.data.status === 200){
        const evaluationSubjectSourceData = res.data.evaluationSubjectSources;
        console.log(res.data);
        setEvaluationSubjectSourceInput({
          ...evaluationSubjectSourceData,
          subject_study_level_id: evaluationSubjectSourceData.evaluation_subject.evaluation.subject_study_level_id,
          year: evaluationSubjectSourceData.evaluation_subject.evaluation.year,
          evaluation_subject_id: evaluationSubjectSourceData.evaluation_subject.id,
          chapter_id: evaluationSubjectSourceData.evaluation_source.theme.chapter_id,
          theme_id: evaluationSubjectSourceData.evaluation_source.theme.id,
          evaluation_source_id: evaluationSubjectSourceData.evaluation_source.id,
        });
        setAllCheckboxes(res.data.evaluationSubjectSources)
      }
      else if(res.data.status === 404)
      {
        Swal.fire({
          title: "404 Error",
          text: res.data.message,
          icon: "error",
        });
        history.push("/admin/view-evaluation");
      }
      setLoading(false);
    })
  },[props.match.params.id,history])

  const handleInput = (e) => {
    e.persist();
    setEvaluationSubjectSourceInput({...evaluationSubjectSourceInput, [e.target.name]: e.target.value})
  }

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({...allCheckboxes, [e.target.name]: e.target.checked})
  }

  const submitEvaluationSource = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('evaluation_subject_id',evaluationSubjectSourceInput.evaluation_subject_id );
    formData.append('evaluation_source_id',evaluationSubjectSourceInput.evaluation_source_id );
    formData.append('order_number',evaluationSubjectSourceInput.order_number );
    formData.append('status',allCheckboxes.status == true ? 1 : 0);

    console.log(formData)

    const evaluationSubjectSource_id = props.match.params.id;
    axios.post(`http://localhost:8000/api/update-evaluation-subject-source/${evaluationSubjectSource_id}`, formData).then(res => {
      if(res.data.status === 200)
      {
        Swal.fire({
          title: "Succes",
          text: res.data.message,
          icon: "success"
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

  if(loading) {
    return <h4>Loading Edited Evaluation Subject...</h4>
  }

  return (
    <div className="container-fluid px4">
      <h2 className="m-3">Edit Evaluation Subject Source
        <Link to="/admin/view-evaluation-subject-source" type="button" className="btnBts btn-primary text-white px-4 m-3 float-end">BACK to List</Link>
      </h2>

        <ul className="navSide nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-linkSide active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
        
          <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <form className="form-group custom-form" onSubmit={submitEvaluationSource} >
          <div className="rowBts">

          <div className="col-md-3">          
            <div className="form-group m-3">
              <label>Select Subject Study Level</label>
              <select name="subject_study_level_id" onChange={handleInput} value={evaluationSubjectSourceInput.subject_study_level_id} className="form-control">  
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
              <input type="text" name="year" onChange={handleInput} value={evaluationSubjectSourceInput.year} className="form-control" />
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.year}</span>
            </div>
          </div>

          <div className="col-md-7">          
            <div className="form-group m-3">
              <label>Select Evaluation Subject</label>
              <select name="evaluation_subject_id" onChange={handleInput} value={evaluationSubjectSourceInput.evaluation_subject_id} className="form-control">  
                <option>Select Evaluation Subject</option>
                {
                  evaluationSubjectList
                  .filter((item) => item.evaluation.subject_study_level_id == evaluationSubjectSourceInput.subject_study_level_id)
                  .filter((item) => item.evaluation.year == evaluationSubjectSourceInput.year)                  
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
              <select name="chapter_id" onChange={handleInput} value={evaluationSubjectSourceInput.chapter_id} className="form-control">  
                <option>Select Chapter</option>
                {
                  chapterList
                  .filter((item) => item.subject_study_level_id == evaluationSubjectSourceInput.subject_study_level_id)
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
              <select name="theme_id" onChange={handleInput} value={evaluationSubjectSourceInput.theme_id} className="form-control">  
                <option>Select Theme</option>
                {
                  themeList
                  .filter((item) => item.chapter_id == evaluationSubjectSourceInput.chapter_id)
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

          <div className="col-md-10">          
            <div className="form-group m-3">
              <label>Select Source</label>
              <select name="evaluation_source_id" onChange={handleInput} value={evaluationSubjectSourceInput.evaluation_source_id} className="form-control">  
                <option>Select Source</option>
                {
                  evaluationSourceList
                  .filter((item) => item.theme_id == evaluationSubjectSourceInput.theme_id)
                  .map((item)=> {
                    return (
                      <option value={item.id} key={item.id}>{item.name}</option>
                    )
                  })
                }
              </select>            
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.evaluation_source_id}</span>
            </div>
          </div>

  
          <div className="col-md-2">
              <div className="form-group m-3">
                <label>Order number</label>
                <input type="text" name="order_number" onChange={handleInput} value={evaluationSubjectSourceInput.order_number} className="form-control" />
                <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.order_number}</span>
              </div>
            </div>

          </div> 
          <div className="rowBts">   



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

      </div>
   </div>
  )
}

export default EditEvaluationSubjectSource;
