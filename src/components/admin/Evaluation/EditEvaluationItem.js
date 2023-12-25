import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import * as XLSX from 'xlsx';
import InputMask from 'react-input-mask';
import { Link, useHistory  } from 'react-router-dom';


import Swal from 'sweetalert2'

function EditEvaluationItem(props) {

  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [subjectList, setSubjectList] = useState([]);
  const [chapterList, setChapterList] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [evaluationSubjectList, setEvaluationSubjectList] = useState([]);
  const [errorList, setErrors] = useState([]);
  const [evaluationItemInput, setEvaluationItemInput] = useState({
    subject_study_level_id: '',
    chapter_id: '',
    theme_id: '',
    year: '',
    evaluation_subject_id: '',
    order_number: '',
    task: '',
    statement: '',
    image_path: '',
    editable_image_path: '',
    procent_paper: '',
    nota: '',
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

    const evaluationItem_id = props.match.params.id;
    axios.get(`http://localhost:8000/api/edit-evaluation-item/${evaluationItem_id}`).then(res=>{
    if(res.data.status === 200){
        const evaluationItemData = res.data.evaluationItem;

        console.log(res.data);
        setEvaluationItemInput({
          ...evaluationItemData,
          subject_study_level_id: evaluationItemData.evaluation_subject.evaluation.subject_study_level_id,
          year: evaluationItemData.evaluation_subject.evaluation.year,
          evaluation_subject_id: evaluationItemData.evaluation_subject_id,
          chapter_id: evaluationItemData.theme.chapter_id,
          theme_id: evaluationItemData.theme_id,
        });
        setAllCheckboxes(res.data.evaluationItem)
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
    setEvaluationItemInput({...evaluationItemInput, [e.target.name]: e.target.value})
  }

  const [picture, setPicture] = useState([])
  const [editablePicture, setEditablePicture] = useState([])

  const handleImage = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  }

  const handleEditableImage = (e) => {
    const file = e.target.files[0];
    setEditablePicture(file);
  }

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({...allCheckboxes, [e.target.name]: e.target.checked})
  }

  const submitEvaluationInput = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('evaluation_subject_id',evaluationItemInput.evaluation_subject_id );
    formData.append('theme_id',evaluationItemInput.theme_id );
    formData.append('order_number',evaluationItemInput.order_number );
    formData.append('task',evaluationItemInput.task );
    formData.append('statement',evaluationItemInput.statement );
    formData.append('image',picture );
    formData.append('image_path',evaluationItemInput.image_path );
    formData.append('editableImage',editablePicture ); 
    formData.append('editable_image_path',evaluationItemInput.editable_image_path );
    formData.append('procent_paper',evaluationItemInput.procent_paper );
    formData.append('nota',evaluationItemInput.nota );
    formData.append('status',allCheckboxes.status == true ? 1 : 0);

    console.log(formData)

    const evaluationItem_id = props.match.params.id;
    axios.post(`http://localhost:8000/api/update-evaluation-item/${evaluationItem_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(res => {
      console.log(res)
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
      else if(res.data.status === 404)
      {
        Swal.fire({
          title: "404 Error",
          text: res.data.message,
          icon: "error",
        });
        history.push("/admin/view-evaluation-item");
      }
    });
  }

  if(loading) {
    return <h4>Loading Edited Evaluation Item...</h4>
  }

  return (
    <div className="container-fluid px4">
      <h2 className="m-3">Edit Evaluation Item
        <Link to="/admin/view-evaluation-item" type="button" className="btnBts btn-primary text-white px-4 m-3 float-end">BACK to List</Link>
      </h2>

        <ul className="navSide nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-linkSide active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
        
          <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <form className="form-group custom-form" onSubmit={submitEvaluationInput} encType="multipart/form-data">
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

          {/* <div className="col-md-10">          
            <div className="form-group m-3">
              <label>Select Source</label>
              <select name="evaluation_source_id" onChange={handleInput} value={evaluationItemInput.evaluation_source_id} className="form-control">  
                <option>Select Source</option>
                {
                  evaluationSourceList
                  .filter((item) => item.theme_id == evaluationItemInput.theme_id)
                  .map((item)=> {
                    return (
                      <option value={item.id} key={item.id}>{item.name}</option>
                    )
                  })
                }
              </select>            
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.evaluation_source_id}</span>
            </div>
          </div> */}

          <div className="col-md-10">
            <div className="form-group m-3">
              <label>Task</label>
              <input type="text" name="task" onChange={handleInput} value={evaluationItemInput.task} className="form-control" />
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.task}</span>
            </div>
          </div>
  
          <div className="col-md-2">
            <div className="form-group m-3">
              <label>Order number</label>
              <input type="text" name="order_number" onChange={handleInput} value={evaluationItemInput.order_number} className="form-control" />
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.order_number}</span>
            </div>
          </div>

          </div> 
          <div className="rowBts">   
            <div className="col-md-10">
              <div className="form-group m-3">
                <label>Statement</label>
                <input type="text" name="statement" onChange={handleInput} value={evaluationItemInput.statement} className="form-control" />
                <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.statement}</span>
              </div>
            </div>

            <div className="col-md-2">
              <div className="form-group m-3">
                <label>% Paper</label>
                <input type="text" name="procent_paper" onChange={handleInput} value={evaluationItemInput.procent_paper} className="form-control" />
                <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.procent_paper}</span>
              </div>
            </div>

          </div> 

          <div className="rowBts">   
            <div className="col-md-3">
              <div className="form-group m-3">
                <label>Image</label>
                <input type="file" accept="image/*" name="image" onChange={handleImage} className="form-control" />
                <img
                  src={`http://localhost:8000/${evaluationItemInput.image_path}`}
                  width='50px'
                  alt={evaluationItemInput.image_path || ''}
                />
                <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.image_path}</span>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group m-3">
                <label>Editable Image</label>
                <input type="file" accept="image/*" name="editableImage" onChange={handleEditableImage} className="form-control" />
                <img
                  src={`http://localhost:8000/${evaluationItemInput.editable_image_path}`}
                  width='50px'
                  alt={evaluationItemInput.editable_image_path || ''}
                />
                <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.editable_image_path}</span>
              </div>
            </div>

            <div className="col-md-5">
              <div className="form-group m-3">
                <label>Nota</label>
                <textarea name="nota" onChange={handleInput} value={evaluationItemInput.nota} className="form-control" />
                <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.nota}</span>
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
      </div>
   </div>
  )
}

export default EditEvaluationItem;
