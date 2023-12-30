import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ViewSummativeTestItem() {

  const [loading, setLoading] = useState(true);
  const [teacherTopicList, setTeacherTopicList] = useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/view-summative-test-item`).then(res=> {
      if(res.data.status === 200){
        setTeacherTopicList(res.data.summativeTestItem)
      } 
      setLoading(false)
    })
  },[])

  let viewTeacherTopic_HTMLTABLE = "";
  if(loading) {
    return <h4>Loading Summative Test Item ...</h4>
  }
  else
  {
    let teacherTopicStatus = '';
    viewTeacherTopic_HTMLTABLE = 
    teacherTopicList.map((item) => {
      if(item.status == 0) {
        teacherTopicStatus = "Shown";
      }
      else if(item.status == 1) {
        teacherTopicStatus = "Hidden";
      }
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.order_number}</td>
          <td>{item.test_item.task}</td>
          <td>{item.test_item.type}</td>  
          <td>{item.summative_test.title}</td>                   
          <td>{item.summative_test.teacher_topic.name}</td>
          <td>
            <Link to={`/admin/edit-summative-test-item/${item.id}`} className="btnBts btn-success btn-small">Edit</Link>
          </td>
          <td>{teacherTopicStatus}</td>
        </tr>
      )
    })
  }

  return (
    <div className="containerBts px-4">
      <div className="cardBts mt-4">
        <div className="card-header">
          <h4>Formative Test Item List
            <Link to="/admin/add-summative-test-item" className="btnBts btn-primary text-white btn-sm float-end">Add Summative Test Items</Link>
          </h4>
        </div>
        <div className="card-body">
        <table className="table table-primary table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Order</th>
              <th>Task</th>
              <th>Type</th> 
              <th>Test Summative</th>              
              <th>Topic</th>
              <th>Edit</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {viewTeacherTopic_HTMLTABLE}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
export default ViewSummativeTestItem;
