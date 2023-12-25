import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Link, useHistory } from 'react-router-dom';


import Swal from 'sweetalert2'

function EditEvaluationOption(props) {

  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [errorList, setErrors] = useState([]);
  const [evaluationOption, setEvaluationOption] = useState({
    label: '',
    points: '',
    error_list: [],
  })

  const [allCheckboxes, setAllCheckboxes] = useState({
    status: false,
  })

  useEffect(()=> {
    const evaluationOption_id = props.match.params.id;
    axios.get(`http://localhost:8000/api/edit-evaluation-option/${evaluationOption_id}`).then(res=>{
      // console.log(res.data.video)
      if(res.data.status === 200){
        setEvaluationOption(res.data.evaluationOption)
        setAllCheckboxes(res.data.evaluationOption)
      }
      else if(res.data.status === 404)
      {
        Swal.fire({
          title: "404 Error",
          text: res.data.message,
          icon: "error",
        });
        history.push("/admin/view-video");
      }
      setLoading(false);

    })

  },[props.match.params.id,history])

  const handleInput = (e) => {
    e.persist();
    setEvaluationOption({...evaluationOption, [e.target.name]: e.target.value})
  }

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({...allCheckboxes, [e.target.name]: e.target.checked})
  }

  const submitEvaluationOption = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('label',evaluationOption.label );
    formData.append('points',evaluationOption.points );
    formData.append('status',allCheckboxes.status == true ? 1 : 0);

    const evaluationOption_id = props.match.params.id;
    axios.post(`http://localhost:8000/api/update-evaluation-option/${evaluationOption_id}`, formData).then(res => {
      if(res.data.status === 200) {
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
        history.push("/admin/view-evaluation-option");
      }
    });
  }

  if(loading) {
    return <h4>Loading Edited Evaluation Option ...</h4>
  }

  return (
    <div className="container-fluid px4">
      <h2 className="m-3">Edit Evaluation Option
        <Link to="/admin/view-evaluation-option" type="button" className="btnBts btn-primary text-white px-4 m-3 float-end">BACK to List</Link>
      </h2>

        <ul className="navSide nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-linkSide active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
        
          <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <form className="form-group custom-form" onSubmit={submitEvaluationOption} >
            <div className="form-group m-3">
              <label>Label</label>
              <input type="text" name="label" onChange={handleInput} value={evaluationOption.label} className="form-control" />
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.label}</span>            
            </div>
            <div className="form-group m-3">
              <label>Points</label>
              <input type="number" name="points" onChange={handleInput} value={evaluationOption.points}className="form-control" />
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.points}</span>
            </div>
            <div className="form-group m-3">
              <label>Status</label>
              <input type="checkbox" name="status" onChange={handleCheckbox} defaultChecked={allCheckboxes.status == 1 ? true: false}/> (0=shown, 1=hidden)
           
            </div>
            <button type="submit" className="btnBts btn-success px-4 m-3 float-end">Submit</button>
          </form> 
          </div>

        </div>
    </div>
  )
}

export default EditEvaluationOption;