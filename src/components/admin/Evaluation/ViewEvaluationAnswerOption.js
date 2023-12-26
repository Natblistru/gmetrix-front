import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ViewEvaluationAnswerOption() {

  const [loading, setLoading] = useState(true);
  const [evaluationItemList, setEvaluationItemList] = useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/view-evaluation-answer-option`).then(res=> {
      if(res.data.status === 200){
        setEvaluationItemList(res.data.evaluationAnswerOption)
      } 
      setLoading(false)
    })
  },[])

  let viewEvaluationSubject_HTMLTABLE = "";
  if(loading) {
    return <h4>Loading Evaluation Answers Options...</h4>
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
          <td>{item.evaluation_answer.task}</td>
          <td>{item.evaluation_option.label}</td>
          <td>{item.evaluation_option.points}</td>
          <td>{item.evaluation_answer.evaluation_item.task}</td>
          <td>{item.evaluation_answer.evaluation_item.evaluation_subject.title}</td>
          <td>{item.evaluation_answer.evaluation_item.theme.name}</td>
          <td>
            <Link to={`/admin/edit-evaluation-answer-option/${item.id}`} className="btnBts btn-success btn-small">Edit</Link>
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
          <h4>Evaluation Answers Option List
            <Link to="/admin/add-evaluation-answer-option" className="btnBts btn-primary text-white btn-sm float-end">Add Evaluation Answer Option</Link>
          </h4>
        </div>
        <div className="card-body">
        <table className="table table-primary table-bordered table-striped">
          <thead>
            <tr>
            <th>ID</th>
              <th>Task</th>
              <th>Label</th>
              <th>Points</th>
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
export default ViewEvaluationAnswerOption;
