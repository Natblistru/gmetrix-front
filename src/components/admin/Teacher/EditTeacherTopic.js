import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import * as XLSX from 'xlsx';
import { Link, useHistory  } from 'react-router-dom';


import Swal from 'sweetalert2'

function EditTeacherTopic(props) {

  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const [learningProgramList, setLearningProgramList] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);

  const [errorList, setErrors] = useState([]);
  const [teacherTopicInput, setTeacherTopicInput] = useState({
    learning_program_id: '',
    theme_learning_program_id: '',
    topic_id: '',
    teacher_id: '',
    name: '',
  })

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

    const teacherTopic_id = props.match.params.id;
    axios.get(`http://localhost:8000/api/edit-teacherTopic/${teacherTopic_id}`).then(res=>{
      if(res.data.status === 200){
        const teacherTopicData = res.data.teacherTopics;
        setTeacherTopicInput({
          ...teacherTopicData,
          learning_program_id: teacherTopicData.topic.theme_learning_program.learning_program_id,
          theme_learning_program_id: teacherTopicData.topic.theme_learning_program.id,
          topic_id: teacherTopicData.topic.id,
        });

        setAllCheckboxes(res.data.teacherTopics)
      }
      else if(res.data.status === 404)
      {
        Swal.fire({
          title: "404 Error",
          text: res.data.message,
          icon: "error",
        });
        history.push("/admin/view-teacher-topic");
      }
      setLoading(false);
    })
  },[props.match.params.id,history])


  useEffect(() => {
    const selectedTopic = topicList.find((topic) => topic.id == teacherTopicInput.topic_id);
    const topicName = selectedTopic ? selectedTopic.name : '';
    const selectedTeacher = teacherList.find((teacher) => teacher.id == teacherTopicInput.teacher_id);
    const teacherName = selectedTeacher ? selectedTeacher.name : '';

    const concatenatedName =
    topicName !== '' && teacherName !== '' ? `${topicName} (${teacherName})` : '';
    setTeacherTopicInput((prevInput) => ({
      ...prevInput,
      name: concatenatedName,
    }));
  }, [teacherTopicInput.topic_id, teacherTopicInput.teacher_id]);



  const handleInput = (e) => {
    e.persist();
    setTeacherTopicInput({...teacherTopicInput, [e.target.name]: e.target.value})
  }

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({...allCheckboxes, [e.target.name]: e.target.checked})
  }

  const submitTeacherTopic = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name',teacherTopicInput.name );
    formData.append('teacher_id',teacherTopicInput.teacher_id );
    formData.append('topic_id',teacherTopicInput.topic_id );
    formData.append('status',allCheckboxes.status == true ? 1 : 0);

    console.log(formData)

    axios.post(`http://localhost:8000/api/store-teacherTopic`, formData).then(res => {
      if(res.data.status === 201)
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
    });
  }
  if(loading) {
    return <h4>Loading Edited Teacher Topic ...</h4>
  }
  return (
    <div className="container-fluid px4">
      <h2 className="m-3">Edit Teacher Topic
        <Link to="/admin/view-teacher-topic" type="button" className="btnBts btn-primary text-white px-4 m-3 float-end">BACK to List</Link>
      </h2>

        <ul className="navSide nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-linkSide active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
        
          <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <form className="form-group custom-form" onSubmit={submitTeacherTopic} >

          <div className="rowBts">
              <div className="col-md-4">
                <div className="form-group m-3">
                  <label>Learn Program</label>
                  <select name="learning_program_id" onChange={handleInput} value={teacherTopicInput.learning_program_id} className="form-control">  
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
                  <select name="theme_learning_program_id" onChange={handleInput} value={teacherTopicInput.theme_learning_program_id} className="form-control">  
                    <option>Select Theme</option>
                    {themeList
                      .filter((item) => item.learning_program_id == teacherTopicInput.learning_program_id)
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
              <div className="col-md-12">
              <div className="form-group m-3">
                  <label>Topic</label>
                  <select name="topic_id" onChange={handleInput} value={teacherTopicInput.topic_id} className="form-control">  
                    <option>Select Topic</option>
                    {topicList
                      .filter((item) => item.theme_learning_program_id == teacherTopicInput.theme_learning_program_id)
                      .map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                    ))}
                  </select>            
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.topic_id}</span>
                </div>
              </div>  
            </div>

            <div className="rowBts">
              <div className="col-md-4">
                <div className="form-group m-3">
                  <label>Teacher</label>
                  <select name="teacher_id" onChange={handleInput} value={teacherTopicInput.teacher_id} className="form-control">  
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
                  <label>Teacher's Topic Title</label>
                  <input type="text" name="name" onChange={handleInput} value={teacherTopicInput.name}className="form-control" />
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.name}</span>
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

export default EditTeacherTopic;
