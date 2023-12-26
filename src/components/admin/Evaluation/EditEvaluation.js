import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import * as XLSX from 'xlsx';
import InputMask from 'react-input-mask';
import { Link, useHistory  } from 'react-router-dom';


import Swal from 'sweetalert2'

function EditEvaluation(props) {

  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const [subjectList, setSubjectList] = useState([]);
  const [errorList, setErrors] = useState([]);
  const [evaluationInput, setEvaluationInput] = useState({
    year: '',
    type: '',
    subject_study_level_id: '',
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

    const evaluation_id = props.match.params.id;
    axios.get(`http://localhost:8000/api/edit-evaluation/${evaluation_id}`).then(res=>{
      if(res.data.status === 200){
        setEvaluationInput(res.data.evaluations)
        setAllCheckboxes(res.data.evaluations)
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

    console.log(formData)

    const evaluation_id = props.match.params.id;
    axios.post(`http://localhost:8000/api/update-evaluation/${evaluation_id}`, formData).then(res => {
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
        history.push("/admin/view-evaluation-answer");
      }
    });
  }

  if(loading) {
    return <h4>Loading Edited Evaluation ...</h4>
  }
  return (
    <div className="container-fluid px4">
      <h2 className="m-3">Edit Evaluation
        <Link to="/admin/view-evaluation" type="button" className="btnBts btn-primary text-white px-4 m-3 float-end">BACK to List</Link>
      </h2>

        <ul className="navSide nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-linkSide active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
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
                    <option value="Testare de baza">Testare de baza</option>
                    <option value="Pretestare">Pretestare</option>
                    <option value="Teste pentru exersare1">Teste pentru exersare1</option>
                    <option value="Teste pentru exersare2">Teste pentru exersare2</option>
                    <option value="Evaluare suplimentara">Evaluare suplimentara</option>
                  </select>
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

export default EditEvaluation;
