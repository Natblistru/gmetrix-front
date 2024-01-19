import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ViewSubtopic({ onAddSubtopic, onEditSubtopic }) {

  const [loading, setLoading] = useState(true);
  const [teacherTopicList, setTeacherTopicList] = useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/view-mySubtopics`).then(res=> {
      if(res.data.status === 200){
        setTeacherTopicList(res.data.subtopics)
      } 
      setLoading(false)
    })
  },[])

  let viewTeacherTopic_HTMLTABLE = "";
  if(loading) {
    return <h4>Loading TeacherTopic ...</h4>
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
          <td>{item.name}</td>
          <td>{item.teacher_topic.topic.name}</td>
          <td>{item.teacher_topic.teacher.name}</td>
          <td>{item.teacher_topic.topic.theme_learning_program.name}</td>
          <td>  
          {item.audio_path && (
            item.audio_path.startsWith('uploads/audioSubtopic/') ? (
              <audio controls style={{ width: '100%', maxWidth: '200px' }}>
                <source src={`http://localhost:8000/${item.audio_path}`} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <span>{item.audio_path}</span>
            )
          )}
          </td>
          <td>
            <button onClick={() => handleEditSubtopic(item.id)} className="btnBts btn-success btn-small">Edit</button>
          </td>
          <td>{teacherTopicStatus}</td>
        </tr>
      )
    })
  }

  const handleAddSubtopic = () => {
    onAddSubtopic();
  };

  const handleEditSubtopic = (item_id) => {
    onEditSubtopic(item_id);
  };

  return (
    <div className="containerBts px-4">
      <div className="cardBts mt-4">
        <div className="card-header">
          <h4>Subtopic List
            <button onClick={handleAddSubtopic}  className="btnBts btn-primary text-white btn-sm float-end">Add Subopic</button>
          </h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-primary table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Topic</th>
                  <th>Teacher</th>
                  <th>Theme</th>
                  <th>Audio</th>
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
export default ViewSubtopic;
