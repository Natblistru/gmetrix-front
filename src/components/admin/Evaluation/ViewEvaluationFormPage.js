import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ViewEvaluationFormPage() {

  const [loading, setLoading] = useState(true);
  const [evaluationItemList, setEvaluationItemList] = useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/view-evaluation-form-page`).then(res=> {
      if(res.data.status === 200){
        setEvaluationItemList(res.data.evaluationFormPage)
      } 
      setLoading(false)
    })
  },[])

  let viewEvaluationSubject_HTMLTABLE = "";
  if(loading) {
    return <h4>Loading Evaluation Form Pages...</h4>
  }
  else
  {
    let evaluationSubjectStatus = '';
    viewEvaluationSubject_HTMLTABLE = 
    evaluationItemList.map((item) => {
      if(item.status == 0) {
        evaluationSubjectStatus = "Shown";
      }
      else if(item.status == 1) {
        evaluationSubjectStatus = "Hidden";
      }
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.order_number}</td>
          <td>{item.task}</td>
          <td>{item.evaluation_item.task}</td>
          <td>{item.evaluation_item.evaluation_subject.title}</td>
          <td>{item.evaluation_item.theme.name}</td>
          <td>
            <Link to={`/admin/edit-evaluation-form-page/${item.id}`} className="btnBts btn-success btn-small">Edit</Link>
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
          <h4>Evaluation Form Pages List
            <Link to="/admin/add-evaluation-form-page" className="btnBts btn-primary text-white btn-sm float-end">Add Evaluation Form Page</Link>
          </h4>
        </div>
        <div className="card-body">
        <table className="table table-primary table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Order</th>
              <th>Task</th>
              <th>Evaluation Item</th>
              <th>Evaluation Subject</th>
              <th>Theme</th>
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
export default ViewEvaluationFormPage;
