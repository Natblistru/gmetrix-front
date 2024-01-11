import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; 
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { Editor, EditorState, RichUtils, convertToRaw, Modifier } from 'draft-js';
import 'draft-js/dist/Draft.css';


import Swal from 'sweetalert2'

function AddMySubtopic() {

  const [learningProgramList, setLearningProgramList] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [topicList, setTopicList] = useState([]);
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

  const [errorList, setErrors] = useState([]);
  const [teacherTopicInput, setTeacherTopicInput] = useState({
    learning_program_id: '',
    theme_learning_program_id: '',
    topic_id: '',
    teacher_id: '',
    order_number: '',
    name: '', //name la teacher_topic
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
    { breakpoint_title: '', time: '' }
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




    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  
    const onChangeFormat = (newEditorState) => {
      setEditorState(newEditorState);
    };
  
    const handleBoldClick = () => {
      onChangeFormat(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    };
  
    const handleItalicClick = () => {
      onChangeFormat(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
    };

    const handleUnderlineClick = () => {
      onChangeFormat(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
    };

    const handleColorClick = (color) => {
      const contentState = editorState.getCurrentContent();
      const selection = editorState.getSelection();
  
      if (!selection.isCollapsed()) {
        const contentWithColor = Modifier.applyInlineStyle(
          contentState,
          selection,
          color
        );
  
        onChangeFormat(EditorState.push(editorState, contentWithColor, 'change-inline-style'));
      }
    };

    const styleMap = {
      'color-red': {
        color: 'red',
      },
      'color-green': {
        color: 'green',
      },
      'color-blue': {
        color: 'blue',
      },
      'color-yellow': {
        color: 'yellow',
      },
      'color-cyan': {
        color: 'cyan',
      },
      'color-magenta': {
        color: 'magenta',
      },
      'color-black': {
        color: 'black',
      },
    };

    const handleSaveClick = () => {
      const contentState = editorState.getCurrentContent();
      const contentRaw = convertToRaw(contentState);
      const formattedText = JSON.stringify(contentRaw);
  
      // Trimite formattedText către server sau salvează în baza de date
      console.log(formattedText);
    };

  const colorButtons = [
    { hex: '#ff0000', name: 'color-red' },
    { hex: '#00ff00', name: 'color-green' },
    { hex: '#0000ff', name: 'color-blue' },
    { hex: '#ffff00', name: 'color-yellow' },
    { hex: '#00ffff', name: 'color-cyan' },
    { hex: '#ff00ff', name: 'color-magenta' },
    { hex: '#4e4e3f', name: 'color-black' },
  ];


  const submitTeacherTopic = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name',teacherTopicInput.name );
    formData.append('order_number',teacherTopicInput.order_number );
    formData.append('teacher_id',teacherTopicInput.teacher_id );
    formData.append('topic_id',teacherTopicInput.topic_id );
    formData.append('status',allCheckboxes.status == true ? 1 : 0);

    // console.log(formData)

    axios.post(`http://localhost:8000/api/store-myteacherTopic`, formData).then(res => {
      if(res.data.status === 201)
      {
        Swal.fire({
          title: "Succes",
          text: res.data.message,
          icon: "success"
        });
        setTeacherTopicInput({
          learning_program_id: '',
          theme_learning_program_id: '',
          topic_id: '',
          teacher_id: '',
          order_number: '',
          name: '',
        });
        setAllCheckboxes({
          status: false,
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

  return (
    <div className="container-fluid px4">
      <h2 className="m-3">Add Teacher Topic
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
                      {/* <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.topic_id}</span> */}
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
                      <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.order_number}</span>
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


            <div className="white-background">
              <div className="d-flex gap-1">
                <button type="button" onClick={handleBoldClick}>Bold</button>
                <button type="button" onClick={handleItalicClick}>Italic</button>
                <button type="button" onClick={handleUnderlineClick}>Underline</button>
                {colorButtons.map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleColorClick(color.name)}
                    style={{ backgroundColor: color.hex, width: '20px', height: '20px', border: 'none', marginRight: '5px' }}
                  />
                ))}
              <button type="button" onClick={handleSaveClick}>Save</button>
              </div>
                <Editor
                  editorState={editorState}
                  onChange={onChangeFormat}
                  customStyleMap={styleMap}
                />
            </div>




            <div className="rowBts">
              <div className="col-md-3">
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
              <div className="col-md-7">          
                <div className="form-group m-3">
                  <label>Teacher's Topic Title</label>
                  <input type="text" name="name" onChange={handleInput} value={teacherTopicInput.name}className="form-control" />
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.name}</span>
                </div>
              </div>


            </div>


            <button type="submit" className="btnBts btn-success px-4 m-3 float-end">Submit</button>
          </form> 
          </div>

      </div>
   </div>
  )
}

export default AddMySubtopic;
