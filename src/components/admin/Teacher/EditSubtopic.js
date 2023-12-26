import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import * as XLSX from 'xlsx';
import { Link, useHistory  } from 'react-router-dom';


import Swal from 'sweetalert2'

function EditSubtopic(props) {

  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const [learningProgramList, setLearningProgramList] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [teacherTopicList, setTeacherTopicList] = useState([]);

  const [errorList, setErrors] = useState([]);
  const [subtopicInput, setSubtopicInput] = useState({
    learning_program_id: '',
    theme_learning_program_id: '',
    teacher_topic_id: '',
    teacher_id: '',
    name: '',
    audio_path: '',
  })

  const [audio, setAudio] = useState([])

  const handleAudio = (e) => {
    const file = e.target.files[0];
    console.log(file)
    setAudio(file);
  }

  const [allCheckboxes, setAllCheckboxes] = useState({
    status: false,
  })
  
  useEffect(() => {

    axios.get('http://localhost:8000/api/all-learningPrograms').then(res=>{
      if(res.data.status === 200){
        setLearningProgramList(res.data.learningProgram);
      }
    });

    axios.get('http://localhost:8000/api/all-themeLearningPrograms').then(res=>{
      if(res.data.status === 200){
        setThemeList(res.data.theme);
      }
    });

    axios.get('http://localhost:8000/api/all-topics').then(res=>{
      if(res.data.status === 200){
        setTopicList(res.data.topics);
      }
    });

    axios.get('http://localhost:8000/api/all-teachers').then(res=>{
      if(res.data.status === 200){
        setTeacherList(res.data.teachers);
      }
    });

    axios.get('http://localhost:8000/api/all-teacher-topics').then(res=>{
      if(res.data.status === 200){
        setTeacherTopicList(res.data.teacherTopics);
      }
    });

    const subtopic_id = props.match.params.id;
    axios.get(`http://localhost:8000/api/edit-subtopic/${subtopic_id}`).then(res=>{
      if(res.data.status === 200){
        const teacherTopicData = res.data.subtopics;
        console.log(teacherTopicData)
        setSubtopicInput({
          ...teacherTopicData,
          learning_program_id: teacherTopicData.teacher_topic.topic.theme_learning_program.learning_program_id,
          theme_learning_program_id: teacherTopicData.teacher_topic.topic.theme_learning_program.id,
          teacher_id: teacherTopicData.teacher_topic.teacher_id,
          teacher_topic_id: teacherTopicData.teacher_topic_id,
        });

        setAllCheckboxes(res.data.subtopics)
      }
      else if(res.data.status === 404)
      {
        Swal.fire({
          title: "404 Error",
          text: res.data.message,
          icon: "error",
        });
        history.push("/admin/view-subtopic");
      }
      setLoading(false);
    })
  },[props.match.params.id,history])



  const handleInput = (e) => {
    e.persist();
    setSubtopicInput({...subtopicInput, [e.target.name]: e.target.value})
  }

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({...allCheckboxes, [e.target.name]: e.target.checked})
  }

  const submitTeacherTopic = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name',subtopicInput.name );
    formData.append('teacher_topic_id',subtopicInput.teacher_topic_id );
    formData.append('audio',audio );  
    formData.append('audio_path',subtopicInput.audio_path );
    formData.append('status',allCheckboxes.status == true ? 1 : 0);

    // console.log(formData)
    const subtopic_id = props.match.params.id;
    axios.post(`http://localhost:8000/api/update-subtopic/${subtopic_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(res => {
      if(res.data.status === 200)
      {
        Swal.fire({
          title: "Succes",
          text: res.data.message,
          icon: "success"
        });
        setErrors([]);
      }
      else if(res.data.status === 422)
      {
        Swal.fire({
          title: "All fields are mandatory",
          text: Object.values(res.data.errors).flat().join(' '),
          icon: "error",
        });
        setErrors(res.data.errors);
      }
      else if(res.data.status === 404)
      {
        Swal.fire({
          title: "404 Error",
          text: res.data.message,
          icon: "error",
        });
        history.push("/admin/view-evaluation");
      }
    });
  }

  if(loading) {
    return <h4>Loading Edited Subopic ...</h4>
  }

  return (
    <div className="container-fluid px4">
      <h2 className="m-3">Edit Subtopic
        <Link to="/admin/view-subtopic" type="button" className="btnBts btn-primary text-white px-4 m-3 float-end">BACK to List</Link>
      </h2>

        <ul className="navSide nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-linkSide active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
        
          <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <form className="form-group custom-form" onSubmit={submitTeacherTopic} encType="multipart/form-data">

          <div className="rowBts">
              <div className="col-md-4">
                <div className="form-group m-3">
                  <label>Learn Program</label>
                  <select name="learning_program_id" onChange={handleInput} value={subtopicInput.learning_program_id} className="form-control">  
                    <option>Select program</option>
                    {
                      learningProgramList.map((item)=> {
                        return (
                          <option value={item.id} key={item.id}>{item.name}</option>
                        )
                      })
                    }
                  </select>            
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.learning_program_id}</span>
                </div>
              </div>  
              <div className="col-md-8">          
                <div className="form-group m-3">
                  <label>Theme</label>
                  <select name="theme_learning_program_id" onChange={handleInput} value={subtopicInput.theme_learning_program_id} className="form-control">  
                    <option>Select Theme</option>
                    {themeList
                      .filter((item) => item.learning_program_id == subtopicInput.learning_program_id)
                      .map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                    ))}
                  </select>            
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.theme_learning_program_id}</span>
                </div>
              </div>
            </div>

            <div className="rowBts">
              <div className="col-md-4">
                <div className="form-group m-3">
                  <label>Teacher</label>
                  <select name="teacher_id" onChange={handleInput} value={subtopicInput.teacher_id} className="form-control">  
                    <option>Select Teacher</option>
                    {
                      teacherList.map((item)=> {
                        return (
                          <option value={item.id} key={item.id}>{item.name}</option>
                        )
                      })
                    }
                  </select>            
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.teacher_id}</span>
                </div>
              </div>  

              <div className="col-md-8">
                <div className="form-group m-3">
                  <label>Topics</label>
                  <select name="teacher_topic_id" onChange={handleInput} value={subtopicInput.teacher_topic_id} className="form-control">  
                    <option>Select Topic</option>
                    {
                      teacherTopicList
                      .filter((item) => item.teacher_id == subtopicInput.teacher_id)
                      .filter((item) => item.topic.theme_learning_program_id == subtopicInput.theme_learning_program_id)                      
                      .map((item)=> {
                        return (
                          <option value={item.id} key={item.id}>{item.name}</option>
                        )
                      })
                    }
                  </select>            
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.teacher_topic_id}</span>
                </div>
              </div> 

            </div>
            <div className="rowBts">
              <div className="col-md-8">          
                <div className="form-group m-3">
                  <label>Subtopic Title</label>
                  <input type="text" name="name" onChange={handleInput} value={subtopicInput.name}className="form-control" />
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.name}</span>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group m-3">
                  <label>Audio</label>
                  <input type="file" accept="audio/*" name="audio" onChange={handleAudio} className="form-control" />
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.audio}</span>
                  {subtopicInput.audio_path && subtopicInput.audio_path.startsWith('uploads/audioSubtopic/') ? (
                    <div>
                      <audio controls>
                        <source src={`http://localhost:8000/${subtopicInput.audio_path}`} type="audio/mp3" />
                        Your browser does not support the audio element.
                      </audio>
                      <br />
                    </div>
                  ) : <span>{subtopicInput.audio_path}</span>}
                </div>
              </div>


            </div>

            

            <div className="form-group m-3">
              <label>Status</label>
              <input type="checkbox" name="status" onChange={handleCheckbox} defaultChecked={allCheckboxes.status == 1 ? true: false}/> (0=shown, 1=hidden)
           
            </div>
            <button type="submit" className="btnBts btn-success px-4 m-3 float-end">Submit</button>
          </form> 
          </div>

      </div>
   </div>
  )
}

export default EditSubtopic;
