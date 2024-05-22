import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ViewSummativeTest() {

  const [loading, setLoading] = useState(true);
  const [teacherTopicList, setTeacherTopicList] = useState([]);

  useEffect(()=>{
    axios.get(`/api/view-summative-test`).then(res=> {
      if(res.data.status === 200){
        setTeacherTopicList(res.data.summativeTest)
      } 
      setLoading(false)
    })
  },[])

  let viewTeacherTopic_HTMLTABLE = "";
  if(loading) {
    return <h4>Loading Flip Card ...</h4>
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
          <td>{item.title}</td>
          <td>{item.time}</td>
          <td>{item.test_complexity.name}</td>
          <td>{item.teacher_topic.name}</td>
          <td>
            <Link to={`/admin/edit-summative-test/${item.id}`} className="btnBts btn-success btn-small">Edit</Link>
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
          <h4>Formative Test List
            <Link to="/admin/add-summative-test" className="btnBts btn-primary text-white btn-sm float-end">Add Summative Test</Link>
          </h4>
        </div>
        <div className="card-body">
        <table className="table table-primary table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Time</th>              
              <th>Complexity</th>
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
export default ViewSummativeTest;
