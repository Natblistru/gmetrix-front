import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ViewEvaluation() {

  const [loading, setLoading] = useState(true);
  const [evaluationList, setEvaluationList] = useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/view-evaluations`).then(res=> {
      if(res.data.status === 200){
        setEvaluationList(res.data.evaluations)
      } 
      setLoading(false)
    })
  },[])

  let viewEvaluation_HTMLTABLE = "";
  if(loading) {
    return <h4>Loading Evaluation ...</h4>
  }
  else
  {
    let evaluationStatus = '';
    viewEvaluation_HTMLTABLE = 
    evaluationList.map((item) => {
      if(item.status == 0) {
        evaluationStatus = "Shown";
      }
      else if(item.status == 1) {
        evaluationStatus = "Hidden";
      }
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.year}</td>
          <td>{item.subject_study_level.name}</td>
          <td>{item.type}</td>
          <td>
            <Link to={`/admin/edit-evaluation/${item.id}`} className="btnBts btn-success btn-small">Edit</Link>
          </td>
          <td>{evaluationStatus}</td>
        </tr>
      )
    })
  }

  return (
    <div className="containerBts px-4">
      <div className="cardBts mt-4">
        <div className="card-header">
          <h4>Evaluation List
            <Link to="/admin/add-evaluation" className="btnBts btn-primary text-white btn-sm float-end">Add Evaluation</Link>
          </h4>
        </div>
        <div className="card-body">
        <table className="table table-primary table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Year</th>
              <th>Disciplina</th>
              <th>Type</th>
              <th>Edit</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {viewEvaluation_HTMLTABLE}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
export default ViewEvaluation;
