import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ViewTeacherTopic() {

  const [loading, setLoading] = useState(true);
  const [teacherVideoList, setTeacherVideoList] = useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/view-teacherVideos`).then(res=> {
      if(res.data.status === 200){
        setTeacherVideoList(res.data.teacherVideos)
      } 
      setLoading(false)
    })
  },[])

  let viewTeacherVideo_HTMLTABLE = "";
  if(loading) {
    return <h4>Loading Teacher Video ...</h4>
  }
  else
  {
    let teacherVideoStatus = '';
    viewTeacherVideo_HTMLTABLE = 
    teacherVideoList.map((item) => {
      if(item.status == 0) {
        teacherVideoStatus = "Shown";
      }
      else if(item.status == 1) {
        teacherVideoStatus = "Hidden";
      }
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.video.source}</td>
          <td>
            <Link to={`/admin/edit-teacher-video/${item.id}`} className="btnBts btn-success btn-small">Edit</Link>
          </td>
          <td>{teacherVideoStatus}</td>
        </tr>
      )
    })
  }

  return (
    <div className="containerBts px-4">
      <div className="cardBts mt-4">
        <div className="card-header">
          <h4>Teacher Video List
            <Link to="/admin/add-teacher-video" className="btnBts btn-primary text-white btn-sm float-end">Add Teacher Video</Link>
          </h4>
        </div>
        <div className="card-body">
        <table className="table table-primary table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Source</th>
              <th>Edit</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {viewTeacherVideo_HTMLTABLE}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
export default ViewTeacherTopic;
