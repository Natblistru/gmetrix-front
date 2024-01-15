import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ViewMyTests({ onAddTest }) {

  const [loading, setLoading] = useState(true);
  const [teacherTopicList, setTeacherTopicList] = useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/view-myTests`).then(res=> {
      if(res.data.status === 200){
        setTeacherTopicList(res.data.formativeTest)
      } 
      setLoading(false)
    })
  },[])

  let viewTeacherTopic_HTMLTABLE = "";
  if(loading) {
    return <h4>Loading Tests ...</h4>
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
          <td>{item.title}</td>
          <td>{item.type}</td>
          <td>{item.test_complexity.name}</td>
          <td>{item.teacher_topic.name}</td>
          <td>
            <Link to={`/admin/edit-formative-test/${item.id}`} className="btnBts btn-success btn-small">Edit</Link>
          </td>
          <td>{teacherTopicStatus}</td>
        </tr>
      )
    })
  }

  const handleAddTest = () => {
    onAddTest();
  };

  return (
    <div className="containerBts w-100">
      <div className="cardBts mt-4">
        <div className="card-header">
          <h4>Formative Test List
            <button onClick={handleAddTest}  className="btnBts btn-primary text-white btn-sm float-end">Add Test</button>

          </h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-primary table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Order</th>
                  <th>Title</th>
                  <th>Type</th>              
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
    </div>
  );
}
export default ViewMyTests;
