import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; 
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { Editor, EditorState, RichUtils, convertToRaw, Modifier } from 'draft-js';
import 'draft-js/dist/Draft.css';


import Swal from 'sweetalert2'

function AddMyTopic({ onBackToList, userData }) {

  const [learningProgramList, setLearningProgramList] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [videoAdded, setVideoAdded] = useState(false);
  const [topicAdded, setTopicAdded] = useState(false);
  const [teacherList, setTeacherList] = useState([]);

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

    axios.get('http://localhost:8000/api/all-myteachers').then(res=>{
      if(res.data.status === 200){
        setTeacherList(res.data.teachers);
      }
    });

  },[])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/view-myvideos`);
        setVideoList(response.data.video);
        console.log(response.data.video)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (userData.teacher || videoAdded) {
      fetchData();
      setVideoAdded(false);
    }

  }, [userData, videoAdded]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8000/api/all-myvideo/${userData.teacher.id}`);
  //       setVideoList(response.data.videos);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   if (userData.teacher || topicAdded) {
  //     fetchData();
  //     setTopicAdded(false);
  //   }

  // }, [userData, topicAdded]);

  const [errorList, setErrors] = useState([]);
  const [teacherTopicInput, setTeacherTopicInput] = useState({
    learning_program_id: '',
    theme_learning_program_id: '',
    title: '',  //title la video
    source: '',
  })

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

  const [allCheckboxes, setAllCheckboxes] = useState({
    status: false,
  })

  const handleInput = (e) => {
    e.persist();
    setTeacherTopicInput({...teacherTopicInput, [e.target.name]: e.target.value})
  }

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({...allCheckboxes, [e.target.name]: e.target.checked})
  }


  const [topicRows, setTopicRows] = useState([
    { topic_id: '', order_number: '' },
    { topic_id: '', order_number: '' },
    { topic_id: '', order_number: '' },
    { topic_id: '', order_number: '' }
  ]);

  const handleAddTopicRow = () => {
    setTopicRows([...topicRows, { topic_id: '', order_number: '' }]);
  };

  const handleRemoveTopicRow = index => {
    const newRows = [...topicRows];
    newRows.splice(index, 1);
    setTopicRows(newRows);
  };

  const handleInputTopic = (index, event) => {
    event.persist();
    const { name, value } = event.target;
    const newRows = [...topicRows];
    newRows[index][name] = value;
    setTopicRows(newRows);
  };



  const [breackpointRows, setBreackpointRows] = useState([
    { breakpoint_title: '', time: '' },
    { breakpoint_title: '', time: '' },
    { breakpoint_title: '', time: '' },
    { breakpoint_title: '', time: '' }, 
  ]);

  const handleAddBreackpointRow = () => {
    setBreackpointRows([...breackpointRows, { topic_id: '', order_number: '' }]);
  };

  const handleRemoveBreackpointRow = index => {
    const newRows = [...breackpointRows];
    newRows.splice(index, 1);
    setBreackpointRows(newRows);
  };

  const handleInputBreackpoint = (index, event) => {
    event.persist();
    const { name, value } = event.target;
    const newRows = [...breackpointRows];
    newRows[index][name] = value;
    setBreackpointRows(newRows);
  };

  const submitTeacherTopic = async (e) => {
    e.preventDefault();
    let succesTotal = true;

    console.log(topicRows)
    if (topicRows && topicRows.length > 0) {

      const formDataArray = topicRows.map(item => {
        const selectedTopic = topicList.find((topic) => topic.id == item.topic_id);
        const topicName = selectedTopic ? selectedTopic.name : '';
        const teacherName = userData.teacher ? userData.teacher.name : '';

        const concatenatedName =
        topicName !== '' && teacherName !== '' ? `${topicName} (${teacherName})` : '';

        const formData = new FormData();
        formData.append('name', concatenatedName );
        formData.append('order_number', item.order_number);
        formData.append('teacher_id', userData.teacher.id);
        formData.append('topic_id', item.topic_id );
        formData.append('status', 0); 
        return formData;
      });


      axios.all(formDataArray.map(formData => axios.post('http://localhost:8000/api/store-myteacherTopic', formData)))
           .then(axios.spread((...responses) => {
             const successResponses = responses.filter(response => response.data.status === 201);
             const errorResponses = responses.filter(response => response.data.status === 422);
             if (successResponses.length > 0) {
               Swal.fire({
                 title: "Success",
                 text: `Successfully processed ${successResponses.length} out of ${responses.length} requests.`,
                 icon: "success"
               });
             }
             errorResponses.forEach(response => {
               Swal.fire({
                 title: "Error",
                 text: Object.values(response.data.errors).flat().join(' '),
                 icon: "error"
               });
               succesTotal=false;
             });
           }))
           .catch(error => {
             console.error(error);
             succesTotal=false;
       });
    }

    let formData = new FormData();
    formData.append('title',teacherTopicInput.title );
    formData.append('source',teacherTopicInput.source );
    formData.append('status', 0);

    axios.post(`http://localhost:8000/api/store-myvideo`, formData).then(res => {
      if(res.data.status === 201)
      {
        Swal.fire({
          title: "Succes",
          text: res.data.message,
          icon: "success"
        });
        setVideoAdded(true)
        // setVideoInput({
        //   title: '',
        //   source: '',
        //   error_list: [],
        // });
      }
      else if(res.data.status === 422)
      {
        Swal.fire({
          title: "All fields are mandatory",
          text: Object.values(res.data.errors).flat().join(' '),
          icon: "error",
        });
        succesTotal=false;
        // setErrors(res.data.errors);
      }
    });
  
    const videoName = teacherTopicInput.title;
    console.log(videoList)
    const selectedVideo = videoList.find((item) => item.title == teacherTopicInput.title);
    console.log(selectedVideo)
    const teacherName = userData.teacher ? userData.teacher.name : '';
    const selectedStudyLevel = learningProgramList.find((program) => program.id == teacherTopicInput.learning_program_id);
    const studyLevelName = selectedStudyLevel ? selectedStudyLevel.name : '';

    const concatenatedName =
    videoName !== '' && teacherName !== '' && studyLevelName !== '' ? `${videoName} (${studyLevelName}, ${teacherName})` : '';

  formData = new FormData();
  formData.append('name',concatenatedName );
  formData.append('teacher_id', userData.teacher.id );
  formData.append('video_id',selectedVideo.id );
  formData.append('theme_learning_program_id',teacherTopicInput.theme_learning_program_id );
  formData.append('status', 0);

  // console.log(formData)

  axios.post(`http://localhost:8000/api/store-myteacherVideo`, formData).then(res => {
    if(res.data.status === 201)
    {
      Swal.fire({
        title: "Succes",
        text: res.data.message,
        icon: "success"
      });
      // setTeacherVideoInput({
      //   learning_program_id: '',
      //   theme_learning_program_id: '',
      //   video_id: '',
      //   teacher_id: '',
      //   name: '',
      // });
      setErrors([]);
    }
    else if(res.data.status === 422)
    {
      Swal.fire({
        title: "All fields are mandatory",
        text: Object.values(res.data.errors).flat().join(' '),
        icon: "error",
      });
      succesTotal=false;
      setErrors(res.data.errors);
    }
  });

  if (breackpointRows && breackpointRows.length > 0) {

      const formDataArray = breackpointRows.map(item => {
        console.log(item.time)
        const formData = new FormData();
        formData.append('name',item.breakpoint_title );
        formData.append('time',item.time );
        formData.append('video_id',selectedVideo.id );
        formData.append('status', 0); 
        return formData;
      });

      axios.all(formDataArray.map(formData => axios.post('http://localhost:8000/api/store-mybreakpoint', formData)))
        .then(axios.spread((...responses) => {
          const successResponses = responses.filter(response => response.data.status === 201);
          const errorResponses = responses.filter(response => response.data.status === 422);
          if (successResponses.length > 0) {
            Swal.fire({
              title: "Success",
              text: `Successfully processed ${successResponses.length} out of ${responses.length} requests.`,
              icon: "success"
            });
          }
          errorResponses.forEach(response => {
            Swal.fire({
              title: "Error",
              text: Object.values(response.data.errors).flat().join(' '),
              icon: "error"
            });
            succesTotal=false;
          });
        }))
        .catch(error => {
          console.error(error);
          succesTotal=false;
    });
  }
if(succesTotal) {onBackToList()}
}

const handleBackToList = () => {
  onBackToList();
};


  return (
    <div className="container-fluid px4">
      <h2 className="m-3">Adaugarea temei profesorului
        <button onClick={handleBackToList} type="button" className="btnBts btn-primary text-white px-4 m-3 float-end">BACK to List</button>
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
              <div className="col-md-3">
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
              <div className="col-md-9">          
                <div className="form-group m-3">
                  <label>Theme</label>
                  <select name="theme_learning_program_id" onChange={handleInput} value={teacherTopicInput.theme_learning_program_id} className="form-control">  
                    <option value="">Select Theme</option>
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

            <div className="border p-3">
              {topicRows.map((row, index) => (
                <div className="rowBts" key={index} style={{alignItems: 'end'}}>
                  <div className="col-md-7">
                    <div className="form-group mx-3">
                      {index === 0 && (<label>Topic</label>)}
                      <select
                        name="topic_id"
                        onChange={e => handleInputTopic(index, e)}
                        value={row.topic_id}
                        className="form-control"
                      >
                        <option>Select Topic</option>
                        {topicList
                          .filter(item => item.theme_learning_program_id == teacherTopicInput.theme_learning_program_id)
                          .map(item => (
                            <option value={item.id} key={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                      <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.topic_id}</span>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="form-group mx-3">
                    {index === 0 && (<label>№ ord.</label>)}
                      <input
                        type="number"
                        name="order_number"
                        onChange={event => handleInputTopic(index, event)}
                        value={row.order_number}
                        className="form-control"
                      />
                      <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.order_number}</span>
                    </div>
                  </div>

                  <div className="col-md-2">
                    <button type="button" className="btnBts btn-danger btn-sm mx-3 my-2" onClick={() => handleRemoveTopicRow(index)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <button type="button" className="btnBts btn-success btn-sm px-4 mx-3 my-2" onClick={handleAddTopicRow}>
                Add Row
              </button>
            </div>

            <div className="rowBts">
              <div className="col-md-6">
                <div className="form-group m-3">
                  <label>Video Title</label>
                  <input type="text" name="title" onChange={handleInput} value={teacherTopicInput.title} className="form-control" />
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.title}</span>            
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group m-3">
                  <label>Video Source</label>
                  <input type="text" name="source" onChange={handleInput} value={teacherTopicInput.source}className="form-control" />
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.source}</span>
                </div>
              </div>
            </div>

            <div className="border p-3">
              {breackpointRows.map((row, index) => (
                <div className="rowBts" key={index} style={{alignItems: 'end'}}>
                  <div className="col-md-7">
                    <div className="form-group mx-3">
                      {index === 0 && (<label>Breackpoint title</label>)}
                       <input type="text" name="breakpoint_title" onChange={e => handleInputBreackpoint(index, e)} value={row.breakpoint_title} className="form-control" />
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.title}</span>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="form-group mx-3">
                    {index === 0 && (<label>Time</label>)}
                  <InputMask
                      name="time"
                      mask="99:99:99"
                      maskChar="_"
                      placeholder="HH:MM:SS"
                      className="form-control"
                      onChange={e => handleInputBreackpoint(index, e)} 
                      value={row.time}
                    />
                      <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.time}</span>
                    </div>
                  </div>

                  <div className="col-md-2">
                    <button type="button" className="btnBts btn-danger btn-sm mx-3 my-2" onClick={() => handleRemoveBreackpointRow(index)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <button type="button" className="btnBts btn-success btn-sm px-4 mx-3 my-2" onClick={handleAddBreackpointRow}>
                Add Row
              </button>
            </div>

            <div className="col-md-12 d-flex justify-content-end">
              <button type="submit" className="btnBts btn-success px-4 m-3">Submit</button>
            </div>
          </form> 
          </div>

      </div>
   </div>
  )
}

export default AddMyTopic;
