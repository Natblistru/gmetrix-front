import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import * as XLSX from 'xlsx';
import { Link, useHistory   } from 'react-router-dom';

import Swal from 'sweetalert2'

function EditTeacherVideo(props) {

  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const [learningProgramList, setLearningProgramList] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);

  const [errorList, setErrors] = useState([]);
  const [teacherVideoInput, setTeacherVideoInput] = useState({
    learning_program_id: '',
    theme_learning_program_id: '',
    video_id: '',
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

    axios.get('http://localhost:8000/api/all-videos').then(res=>{
      if(res.data.status === 200){
        setVideoList(res.data.video);
      }
    });

    axios.get('http://localhost:8000/api/all-teachers').then(res=>{
      if(res.data.status === 200){
        setTeacherList(res.data.teachers);
      }
    });

    const teacherVideo_id = props.match.params.id;
    axios.get(`http://localhost:8000/api/edit-teacherVideo/${teacherVideo_id}`).then(res=>{
      if(res.data.status === 200){
        console.log(res.data.teacherVideos)
        const teacherVideoData = res.data.teacherVideos;

        setTeacherVideoInput({
          ...teacherVideoData,
          learning_program_id: res.data.learning_program_id,
          teacher_id: teacherVideoData.teacher_id,
          theme_learning_program_id: teacherVideoData.theme_learning_program_id,
          video_id: teacherVideoData.video_id,
          name: teacherVideoData.name,
        });

        setAllCheckboxes(res.data.teacherVideos)
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
    const selectedTopic = videoList.find((video) => video.id == teacherVideoInput.video_id);
    const videoName = selectedTopic ? selectedTopic.title : '';
    const selectedTeacher = teacherList.find((teacher) => teacher.id == teacherVideoInput.teacher_id);
    const teacherName = selectedTeacher ? selectedTeacher.name : '';
    const selectedStudyLevel = learningProgramList.find((program) => program.id == teacherVideoInput.learning_program_id);
    const studyLevelName = selectedStudyLevel ? selectedStudyLevel.name : '';


    const concatenatedName =
    videoName !== '' && teacherName !== '' && studyLevelName !== '' ? `${videoName} (${studyLevelName}, ${teacherName})` : '';
    setTeacherVideoInput((prevInput) => ({
      ...prevInput,
      name: concatenatedName,
    }));
  }, [teacherVideoInput.video_id, teacherVideoInput.teacher_id], teacherVideoInput.learning_program_id);

  const handleInput = (e) => {
    e.persist();
    setTeacherVideoInput({...teacherVideoInput, [e.target.name]: e.target.value})
  }

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({...allCheckboxes, [e.target.name]: e.target.checked})
  }

  const submitTeacherVideo = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name',teacherVideoInput.name );
    formData.append('teacher_id',teacherVideoInput.teacher_id );
    formData.append('video_id',teacherVideoInput.video_id );
    formData.append('theme_learning_program_id',teacherVideoInput.theme_learning_program_id );
    formData.append('status',allCheckboxes.status == true ? 1 : 0);

    console.log(formData)

    const teacherVideo_id = props.match.params.id;
    axios.post(`http://localhost:8000/api/update-teacherVideo/${teacherVideo_id}`, formData).then(res => {
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
    });
  }

  if(loading) {
    return <h4>Loading Edited Teacher Video ...</h4>
  }
  return (
    <div className="container-fluid px4">
      <h2 className="m-3">Edit Teacher Video
        <Link to="/admin/view-teacher-video" type="button" className="btnBts btn-primary text-white px-4 m-3 float-end">BACK to List</Link>
      </h2>

        <ul className="navSide nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-linkSide active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
        
          <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <form className="form-group custom-form" onSubmit={submitTeacherVideo} >

          <div className="rowBts">
              <div className="col-md-4">
                <div className="form-group m-3">
                  <label>Learn Program</label>
                  <select name="learning_program_id" onChange={handleInput} value={teacherVideoInput.learning_program_id} className="form-control">  
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
                  <select name="theme_learning_program_id" onChange={handleInput} value={teacherVideoInput.theme_learning_program_id} className="form-control">  
                    <option>Select Theme</option>
                    {themeList
                      .filter((item) => item.learning_program_id == teacherVideoInput.learning_program_id)
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
                  <label>Video</label>
                  <select name="video_id" onChange={handleInput} value={teacherVideoInput.video_id} className="form-control">  
                    <option>Select Video</option>
                    {videoList
                      // .filter((item) => item.theme_learning_program_id == teacherVideoInput.theme_learning_program_id)
                      .map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.title} (source - {item.source})
                        </option>
                    ))}
                  </select>            
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.video_id}</span>
                </div>
              </div>  
            </div>

            <div className="rowBts">
              <div className="col-md-4">
                <div className="form-group m-3">
                  <label>Teacher</label>
                  <select name="teacher_id" onChange={handleInput} value={teacherVideoInput.teacher_id} className="form-control">  
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
                  <input type="text" name="name" onChange={handleInput} value={teacherVideoInput.name}className="form-control" />
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

export default EditTeacherVideo;
