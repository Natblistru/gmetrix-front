import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import * as XLSX from 'xlsx';
import { Link, useHistory  } from 'react-router-dom';

import Swal from 'sweetalert2'

function EditEvaluationAnswerOption(props) {

  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const [subjectList, setSubjectList] = useState([]);
  const [chapterList, setChapterList] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [evaluationSubjectList, setEvaluationSubjectList] = useState([]);
  const [evaluationItemList, setEvaluationItemList] = useState([]);
  const [evaluationAnswerList, setEvaluationAnswerList] = useState([]);
  const [evaluationOptionList, setEvaluationOptionList] = useState([]);

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
    const evaluationAnswerOption_id = props.match.params.id;
    axios.get(`http://localhost:8000/api/edit-evaluation-answer-option/${evaluationAnswerOption_id}`).then(res=>{
    if(res.data.status === 200){
        const evaluationItemData = res.data.evaluationAnswerOption;

        console.log(evaluationItemData);
        setEvaluationItemInput({
          ...evaluationItemData,
          subject_study_level_id: evaluationItemData.evaluation_answer.evaluation_item.evaluation_subject.evaluation.subject_study_level_id,
          year: evaluationItemData.evaluation_answer.evaluation_item.evaluation_subject.evaluation.year,
          evaluation_subject_id: evaluationItemData.evaluation_answer.evaluation_item.evaluation_subject_id,
          chapter_id: evaluationItemData.evaluation_answer.evaluation_item.theme.chapter_id,
          theme_id: evaluationItemData.evaluation_answer.evaluation_item.theme_id,
        });
        setAllCheckboxes(res.data.evaluationAnswerOption)
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

    const evaluationAnswerOption_id = props.match.params.id;
    axios.post(`http://localhost:8000/api/update-evaluation-answer-option/${evaluationAnswerOption_id}`, formData).then(res => {
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

  if(loading) {
    return <h4>Loading Edited Evaluation Item...</h4>
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
      </div>
   </div>
  )
}

export default EditEvaluationAnswerOption;
