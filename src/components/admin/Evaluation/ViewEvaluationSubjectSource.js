import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ViewEvaluationSubjectSource() {

  const [loading, setLoading] = useState(true);
  const [evaluationSubjectList, setEvaluationSubjectList] = useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/view-evaluation-subject-sourse`).then(res=> {
      if(res.data.status === 200){
        setEvaluationSubjectList(res.data.evaluationSubjectSources)
      } 
      setLoading(false)
    })
  },[])

  let viewEvaluationSubject_HTMLTABLE = "";
  if(loading) {
    return <h4>Loading Evaluation Subject...</h4>
  }
  else
  {
    let evaluationSubjectStatus = '';
    viewEvaluationSubject_HTMLTABLE = 
    evaluationSubjectList.map((item) => {
      if(item.status == 0) {
        evaluationSubjectStatus = "Shown";
      }
      else if(item.status == 1) {
        evaluationSubjectStatus = "Hidden";
      }
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.evaluation_source.name}</td>
          <td>{item.evaluation_subject.title}</td>
          <td>{item.order_number}</td>
          <td>
            <Link to={`/admin/edit-evaluation-subject-source/${item.id}`} className="btnBts btn-success btn-small">Edit</Link>
          </td>
          <td>{evaluationSubjectStatus}</td>
        </tr>
      )
    })
  }

  return (
    <div className="containerBts px-4">
      <div className="cardBts mt-4">
        <div className="card-header">
          <h4>Evaluation Subject Sources List
            <Link to="/admin/add-evaluation-subject-source" className="btnBts btn-primary text-white btn-sm float-end">Add Evaluation Subject Source</Link>
          </h4>
        </div>
        <div className="card-body">
        <table className="table table-primary table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Source</th>
              <th>Subject</th>
              <th>Order</th>
              <th>Edit</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {viewEvaluationSubject_HTMLTABLE}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
export default ViewEvaluationSubjectSource;
