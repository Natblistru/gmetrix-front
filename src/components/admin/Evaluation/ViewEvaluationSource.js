import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ViewEvaluationSource() {

  const [loading, setLoading] = useState(true);
  const [evaluationSourceList, setEvaluationSourceList] = useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/view-evaluation-source`).then(res=> {
      if(res.data.status === 200){
        setEvaluationSourceList(res.data.evaluationSources)
      } 
      setLoading(false)
    })
  },[])

  let viewEvaluationSource_HTMLTABLE = "";
  if(loading) {
    return <h4>Loading Evaluation Source...</h4>
  }
  else
  {
    let evaluationSourceStatus = '';
    viewEvaluationSource_HTMLTABLE = 
    evaluationSourceList.map((item) => {
      if(item.status == 0) {
        evaluationSourceStatus = "Shown";
      }
      else if(item.status == 1) {
        evaluationSourceStatus = "Hidden";
      }
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.theme.name}</td>
          <td>
            <Link to={`/admin/edit-evaluation-source/${item.id}`} className="btnBts btn-success btn-small">Edit</Link>
          </td>
          <td>{evaluationSourceStatus}</td>
        </tr>
      )
    })
  }

  return (
    <div className="containerBts px-4">
      <div className="cardBts mt-4">
        <div className="card-header">
          <h4>Evaluation Source List
            <Link to="/admin/add-evaluation-source" className="btnBts btn-primary text-white btn-sm float-end">Add Evaluation Source</Link>
          </h4>
        </div>
        <div className="card-body">
        <table className="table table-primary table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Theme</th>
              <th>Edit</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {viewEvaluationSource_HTMLTABLE}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
export default ViewEvaluationSource;
