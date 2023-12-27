import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ViewSubtopicImage() {

  const [loading, setLoading] = useState(true);
  const [teacherTopicList, setTeacherTopicList] = useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/view-subtopic-image`).then(res=> {
      if(res.data.status === 200){
        setTeacherTopicList(res.data.subtopicImage)
      } 
      setLoading(false)
    })
  },[])

  let viewTeacherTopic_HTMLTABLE = "";
  if(loading) {
    return <h4>Loading Subopic Images ...</h4>
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
          <td>
            {item.path && (
              item.path.startsWith('uploads/imageSubtopic/') ? (
                <img src={`http://localhost:8000/${item.path}`} width='200px' alt={item.path || ''} />
              ) : (
                <span>{item.path || ''}</span>
              )
            )}
          </td>
          
          <td>{item.subtopic.name}</td>
          <td>{item.subtopic.teacher_topic.name}</td>
          <td>{item.subtopic.teacher_topic.topic.theme_learning_program.name}</td>
          <td>
            <Link to={`/admin/edit-subtopic-image/${item.id}`} className="btnBts btn-success btn-small">Edit</Link>
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
          <h4>Subtopic List
            <Link to="/admin/add-subtopic-image" className="btnBts btn-primary text-white btn-sm float-end">Add Subopic Image</Link>
          </h4>
        </div>
        <div className="card-body">
        <table className="table table-primary table-bordered table-striped">
          <thead>
            <tr>
            <th>ID</th>
              <th>Path</th>
              <th>Subtopic</th>
              <th>TeacherTopic</th>
              <th>Theme</th>
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
export default ViewSubtopicImage;
