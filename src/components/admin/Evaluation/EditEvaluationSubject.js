import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import * as XLSX from 'xlsx';
import InputMask from 'react-input-mask';
import { Link, useHistory  } from 'react-router-dom';


import Swal from 'sweetalert2'

function EditEvaluationSubject(props) {

  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [subjectList, setSubjectList] = useState([]);
  const [evaluationList, setEvaluationList] = useState([]);

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

  useEffect(() => {

    axios.get('/api/all-subject-study-level').then(res=>{
      if(res.data.status === 200){
        setSubjectList(res.data.subject);
      }
    });

    axios.get('/api/all-evaluations').then(res=>{
      if(res.data.status === 200){
        setEvaluationList(res.data.evaluations);
      }
    });

    const evaluationSubject_id = props.match.params.id;
    axios.get(`/api/edit-evaluation-subject/${evaluationSubject_id}`).then(res=>{
      if(res.data.status === 200){
        const evaluationSubjectData = res.data.evaluationSubjects;
        setEvaluationSubjectInput({
          ...evaluationSubjectData,
          subject_study_level_id: evaluationSubjectData.evaluation.subject_study_level_id,
          year: evaluationSubjectData.evaluation.year,
        });
        setAllCheckboxes(res.data.evaluationSubjects)
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
    setEvaluationSubjectInput({...evaluationSubjectInput, [e.target.name]: e.target.value})
  }

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({...allCheckboxes, [e.target.name]: e.target.checked})
  }

  const submitEvaluationSubject = (e) => {
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

    // console.log(formData)

    const evaluationSubject_id = props.match.params.id;
    axios.post(`/api/update-evaluation-subject/${evaluationSubject_id}`, formData).then(res => {
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
        history.push("/admin/view-evaluation-subject");
      }
    });
  }

  if(loading) {
    return <h4>Loading Edited Evaluation Subject...</h4>
  }
  return (
    <div className="container-fluid px4">
      <h2 className="m-3">Edit Evaluation Subject
        <Link to="/admin/view-evaluation-subject" type="button" className="btnBts btn-primary text-white px-4 m-3 float-end">BACK to List</Link>
      </h2>

        <ul className="navSide nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-linkSide active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
        
          <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <form className="form-group custom-form" onSubmit={submitEvaluationSubject} >
          <div className="rowBts">
          <div className="col-md-4">          
            <div className="form-group m-3">
              <label>Select Subject Study Level</label>
              {/* {
                console.log(evaluationSubjectInput.subject_study_level_id)
              } */}
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
              {/* {
                console.log(evaluationSubjectInput.year)
              } */}
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

      </div>
   </div>
  )
}

export default EditEvaluationSubject;
