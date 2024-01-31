import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import * as XLSX from 'xlsx';
import { Link, useHistory  } from 'react-router-dom';


import Swal from 'sweetalert2'

function EditTestItemOption(props) {

  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const [learningProgramList, setLearningProgramList] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [teacherTopicList, setTeacherTopicList] = useState([]);
  const [testItemList, setTestItemList] = useState([]);
  
  const [errorList, setErrors] = useState([]);
  const [testItemInput, setTestItemInput] = useState({
    learning_program_id: '',
    theme_learning_program_id: '',
    teacher_topic_id: '',
    teacher_id: '',
    test_item_id: '',
    correct: '',
    option: '',
    explanation: '',
    text_additional: '',

    type: '',

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

    axios.get('http://localhost:8000/api/all-teacher-topics').then(res=>{
      if(res.data.status === 200){
        setTeacherTopicList(res.data.teacherTopics);
      }
    });

    axios.get('http://localhost:8000/api/all-test-items').then(res=>{
      if(res.data.status === 200){
        setTestItemList(res.data.testItems);
      }
    });

    const testItemOption_id = props.match.params.id;
    axios.get(`http://localhost:8000/api/edit-test-item-option/${testItemOption_id}`).then(res=>{
      if(res.data.status === 200){
        const testItemOptionData = res.data.testItemOption;
        // console.log(testItemOptionData)
        setTestItemInput({
          ...testItemOptionData,
          learning_program_id: testItemOptionData.test_item.teacher_topic.topic.theme_learning_program.learning_program_id,
          theme_learning_program_id: testItemOptionData.test_item.teacher_topic.topic.theme_learning_program_id,
          teacher_id: testItemOptionData.test_item.teacher_topic.teacher_id,
          teacher_topic_id: testItemOptionData.test_item.teacher_topic_id,
        });

        setAllCheckboxes(res.data.testItemOption)
      }
      else if(res.data.status === 404)
      {
        Swal.fire({
          title: "404 Error",
          text: res.data.message,
          icon: "error",
        });
        history.push("/admin/view-test-item");
      }
      setLoading(false);
    })
  },[props.match.params.id,history])



  const handleInput = (e) => {
    e.persist();

    const { name, value } = e.target;
    setTestItemInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));      
  }

  const handleTypeTest = (e) => {
    e.persist();

    const { name, value } = e.target;
    setTestItemInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));     
  }

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({...allCheckboxes, [e.target.name]: e.target.checked})
  }

  const submitTeacherTopic = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('option',testItemInput.option );
    formData.append('correct',testItemInput.correct );
    formData.append('explanation',testItemInput.explanation );
    if(testItemInput.text_additional !== null){
      formData.append('text_additional',testItemInput.text_additional );
    }
    formData.append('test_item_id',testItemInput.test_item_id );
    formData.append('status',allCheckboxes.status == true ? 1 : 0);

    // console.log(formData)
    const testItemOption_id = props.match.params.id;
    axios.post(`http://localhost:8000/api/update-test-item-option/${testItemOption_id}`, formData).then(res => {
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
        history.push("/admin/view-test-item-option");
      }
    });

  }

  if(loading) {
    return <h4>Loading Edited Test Item Option...</h4>
  }

  return (
    <div className="container-fluid px4">
      <h2 className="m-3">Edit Test Item Option
        <Link to="/admin/view-test-item-option" type="button" className="btnBts btn-primary text-white px-4 m-3 float-end">BACK to List</Link>
      </h2>

        <ul className="navSide nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-linkSide active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
        
          <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <form className="form-group custom-form" onSubmit={submitTeacherTopic}>

          <div className="rowBts">
              <div className="col-md-3">
                <div className="form-group m-3">
                  <label>Learn Program</label>
                  <select name="learning_program_id" onChange={handleInput} value={testItemInput.learning_program_id} className="form-control">  
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
              <div className="col-md-6">          
                <div className="form-group m-3">
                  <label>Theme</label>
                  <select name="theme_learning_program_id" onChange={handleInput} value={testItemInput.theme_learning_program_id} className="form-control">  
                    <option>Select Theme</option>
                    {themeList
                      .filter((item) => item.learning_program_id == testItemInput.learning_program_id)
                      .map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                    ))}
                  </select>            
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.theme_learning_program_id}</span>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group m-3">
                  <label>Teacher</label>
                  <select name="teacher_id" onChange={handleInput} value={testItemInput.teacher_id} className="form-control">  
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
            </div>

            <div className="rowBts">
  

              <div className="col-md-4">
                <div className="form-group m-3">
                  <label>Topics</label>
                  <select name="teacher_topic_id" onChange={handleInput} value={testItemInput.teacher_topic_id} className="form-control">  
                    <option>Select Topic</option>
                    {
                      teacherTopicList
                      .filter((item) => item.teacher_id == testItemInput.teacher_id)
                      .filter((item) => item.topic.theme_learning_program_id == testItemInput.theme_learning_program_id)                      
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

              <div className="col-md-3">
                <div className="form-group m-3">
                  <label>Test Type</label>
                    <select name="type" onChange={handleInput} value={testItemInput.type} className="form-control">
                      <option>Select Type</option>
                      <option value="quiz">Quiz</option>
                      <option value="check">Check</option>
                      <option value="snap">Asocierea textelor</option>
                      <option value="words">Completarea lacunelor</option>
                      <option value="dnd">Drag'n'drop</option>
                      <option value="dnd_chrono">Drag'n'drop (chrono)</option>
                      <option value="dnd_chrono_double">Drag'n'drop (chrono double)</option>
                      <option value="dnd_group">Drag'n'drop group</option>
                    </select>
                </div>
              </div>

              <div className="col-md-5">
                <div className="form-group m-3">
                  <label>Test Item</label>
                  <select name="test_item_id" onChange={handleTypeTest} value={testItemInput.test_item_id} className="form-control">  
                    <option>Select Test Item</option>
                    {
                      testItemList
                      .filter((item) => item.teacher_topic_id == testItemInput.teacher_topic_id)
                      .filter((item) => item.type == testItemInput.type)
                      
                      .map((item)=> {
                        return (
                          <option value={item.id} key={item.id}>{item.task} ({item.type})</option>
                        )
                      })
                    }
                  </select>            
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.test_item_id}</span>
                </div>
              </div>

            </div>
            <div className="rowBts">
              <div className="col-md-5">          
                <div className="form-group m-3">
                  <label>Option</label>
                  <input type="text" name="option" onChange={handleInput} value={testItemInput.option}className="form-control" />
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.option}</span>
                </div>
              </div>

              <div className="col-md-2">
                <div className="form-group m-3">
                  <label>Correct</label>
                  <input type="number" name="correct" onChange={handleInput} value={testItemInput.correct} className="form-control" />
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.correct}</span>
                </div>
              </div>

              <div className="col-md-5">          
                <div className="form-group m-3">
                  <label>Explanation (correct answer)</label>
                  <input type="text" name="explanation" onChange={handleInput} value={testItemInput.explanation}className="form-control" />
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.explanation}</span>
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group m-3">
                  <label>Additional Text</label>
                  <textarea name="text_additional" onChange={handleInput} value={testItemInput.text_additional} className="form-control" />
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.text_additional}</span>
                </div>
              </div>
            </div>

            <div className="rowBts">
              <div className="form-group m-3">
                <label>Status</label>
                <input type="checkbox" name="status" onChange={handleCheckbox} defaultChecked={allCheckboxes.status == 1 ? true: false}/> (0=shown, 1=hidden)
              
              </div>
            </div>

            <button type="submit" className="btnBts btn-success px-4 m-3 float-end">Submit</button>
          </form> 
          </div>

      </div>
   </div>
  )
}

export default EditTestItemOption;
