import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Link, useHistory  } from 'react-router-dom';

import Swal from 'sweetalert2'

function EditEvaluationFormPage(props) {

  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const [subjectList, setSubjectList] = useState([]);
  const [chapterList, setChapterList] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [evaluationSubjectList, setEvaluationSubjectList] = useState([]);
  const [evaluationItemList, setEvaluationItemList] = useState([]);

  useEffect(() => {

    axios.get('/api/all-subject-study-level').then(res=>{
      if(res.data.status === 200){
        setSubjectList(res.data.subject);
      }
    });

    axios.get('/api/all-chapters').then(res=>{
      if(res.data.status === 200){
        setChapterList(res.data.chapters);
      }
    });

    axios.get('/api/all-themes').then(res=>{
      if(res.data.status === 200){
        setThemeList(res.data.themes);
      }
    });

    axios.get('/api/all-evaluation-subjects').then(res=>{
      if(res.data.status === 200){
        setEvaluationSubjectList(res.data.evaluationSubjects);
      }
    });

    axios.get('/api/all-evaluation-items').then(res=>{
      if(res.data.status === 200){
        setEvaluationItemList(res.data.evaluationItems);
      }
    });

    const evaluationFormPage_id = props.match.params.id;
    axios.get(`/api/edit-evaluation-form-page/${evaluationFormPage_id}`).then(res=>{
    if(res.data.status === 200){
        const evaluationItemData = res.data.evaluationFormPage;
        try {
          const parsedData = JSON.parse(evaluationItemData.hint);
          const formattedTextArray = Object.values(parsedData);
          const joinedText = formattedTextArray.join('\n');

          setEvaluationItemInput({
            ...evaluationItemData,
            hint: joinedText,
            subject_study_level_id: evaluationItemData.evaluation_item.evaluation_subject.evaluation.subject_study_level_id,
            year: evaluationItemData.evaluation_item.evaluation_subject.evaluation.year,
            evaluation_subject_id: evaluationItemData.evaluation_item.evaluation_subject_id,
            chapter_id: evaluationItemData.evaluation_item.theme.chapter_id,
            theme_id: evaluationItemData.evaluation_item.theme_id,
          });

        } catch (error) {
          Swal.fire({
            title: "Eroare la parsarea JSON (hint)",
            text: error,
            icon: "error",
          });
          // console.error('Eroare la parsarea JSON:', error);
        }
        setAllCheckboxes(res.data.evaluationFormPage)
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

  const [errorList, setErrors] = useState([]);
  const [evaluationItemInput, setEvaluationItemInput] = useState({
    subject_study_level_id: '',
    chapter_id: '',
    theme_id: '',
    year: '',
    evaluation_subject_id: '',
    evaluation_item_id: '',
    order_number: '',
    task: '',
    hint: '',
  })

  const [allCheckboxes, setAllCheckboxes] = useState({
    status: false,
  })

  const handleInput = (e) => {
    e.persist();
    setEvaluationItemInput({...evaluationItemInput, [e.target.name]: e.target.value})
  }

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({...allCheckboxes, [e.target.name]: e.target.checked})
  }

  const submitEvaluationAnswer = (e) => {
    e.preventDefault();
    const formData = new FormData();

    const lines = evaluationItemInput.hint.split('\n');

    const hintObject = {};
    lines.forEach((line, index) => {
      hintObject[index + 1] = line.trim();
    });

    formData.append('evaluation_item_id',evaluationItemInput.evaluation_item_id );
    formData.append('order_number',evaluationItemInput.order_number );
    formData.append('task',evaluationItemInput.task );
    formData.append('hint', JSON.stringify(hintObject));
    formData.append('status',allCheckboxes.status == true ? 1 : 0);

    // console.log(formData)

    const evaluationFormPage_id = props.match.params.id;
    axios.post(`/api/update-evaluation-form-page/${evaluationFormPage_id}`, formData).then(res => {
      // console.log(res)
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
        console.log(res.data.errors);
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
        history.push("/admin/view-evaluation-form-page");
      }
    });
  }

  if(loading) {
    return <h4>Loading Edited Evaluation Form Page...</h4>
  }

  return (
    <div className="container-fluid px4">
      <h2 className="m-3">Edit Evaluation Form Page
        <Link to="/admin/view-evaluation-form-page" type="button" className="btnBts btn-primary text-white px-4 m-3 float-end">BACK to List</Link>
      </h2>

        <ul className="navSide nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-linkSide active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
        
          <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <form className="form-group custom-form" onSubmit={submitEvaluationAnswer} encType="multipart/form-data">
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

          <div className="col-md-12">          
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
              <input type="number" name="order_number" onChange={handleInput} value={evaluationItemInput.order_number} className="form-control" />
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.order_number}</span>
            </div>
          </div>

          </div> 
          <div className="rowBts">   

          <div className="col-md-12">
              <div className="form-group m-3">
                <label>Hint</label>
                <textarea name="hint" onChange={handleInput} value={evaluationItemInput.hint} className="form-control" />
                <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.hint}</span>
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

export default EditEvaluationFormPage;