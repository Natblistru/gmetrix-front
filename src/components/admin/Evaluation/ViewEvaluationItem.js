import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ViewEvaluationItem() {

  const [loading, setLoading] = useState(true);
  const [evaluationItemList, setEvaluationItemList] = useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/view-evaluation-item`).then(res=> {
      if(res.data.status === 200){
        setEvaluationItemList(res.data.evaluationItem)
      } 
      setLoading(false)
    })
  },[])

  let viewEvaluationSubject_HTMLTABLE = "";
  if(loading) {
    return <h4>Loading Evaluation Item...</h4>
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
          <td>{item.task}</td>
          <td>
            {item.image_path && (
              item.image_path.startsWith('uploads/evaluationItem/') ? (
                <img src={`http://localhost:8000/${item.image_path}`} width='50px' alt={item.image_path || ''} />
              ) : (
                <span>{item.image_path || ''}</span>
              )
            )}
          </td>
          <td>
            {item.editable_image_path && (
              item.editable_image_path.startsWith('uploads/evaluationItem/') ? (
                <img src={`http://localhost:8000/${item.editable_image_path}`} width='50px' alt={item.editable_image_path || ''} />
              ) : (
                <span>{item.editable_image_path || ''}</span>
              )
            )}
          </td>
          <td>{item.evaluation_subject.title}</td>
          <td>{item.order_number}</td>
          <td>{item.theme.name}</td>

          <td>
            <Link to={`/admin/edit-evaluation-item/${item.id}`} className="btnBts btn-success btn-small">Edit</Link>
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
          <h4>Evaluation Item List
            <Link to="/admin/add-evaluation-item" className="btnBts btn-primary text-white btn-sm float-end">Add Evaluation Item</Link>
          </h4>
        </div>
        <div className="card-body">
        <table className="table table-primary table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Task</th>
              <th>Image</th>
              <th>Editable Image</th>
              <th>Evaluation Subject</th>
              <th>Order</th>
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
export default ViewEvaluationItem;
