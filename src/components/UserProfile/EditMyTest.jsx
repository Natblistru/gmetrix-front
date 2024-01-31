import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Link, useHistory  } from 'react-router-dom';


import Swal from 'sweetalert2'

function EditMyTest({id,  onBackToList}) {

  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const [learningProgramList, setLearningProgramList] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [teacherTopicList, setTeacherTopicList] = useState([]);
  const [testComplexityList, setTestComplexityList] = useState([]);

  const [errorList, setErrors] = useState([]);
  const [testItemInput, setTestItemInput] = useState({
    learning_program_id: '',
    theme_learning_program_id: '',
    teacher_topic_id: '',
    teacher_id: '',
    test_complexity_id: '',
    type: '',
    title: '',
    order_number: '',
    path: '',
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

    axios.get('http://localhost:8000/api/all-test-complexities').then(res=>{
      if(res.data.status === 200){
        setTestComplexityList(res.data.testComplexities);
      }
    });

    const formativeTest_id = id;
    axios.get(`http://localhost:8000/api/edit-myformative-test/${formativeTest_id}`).then(res=>{
      if(res.data.status === 200){
        const formativeTestData = res.data.formativeTest;
        // console.log(formativeTestData)
        setTestItemInput({
          ...formativeTestData,
          learning_program_id: formativeTestData.teacher_topic.topic.theme_learning_program.learning_program_id,
          theme_learning_program_id: formativeTestData.teacher_topic.topic.theme_learning_program.id,
          teacher_id: formativeTestData.teacher_topic.teacher_id,
          topic_id: formativeTestData.teacher_topic_id,
        });

        setAllCheckboxes(res.data.formativeTest)
      }
      else if(res.data.status === 404)
      {
        Swal.fire({
          title: "404 Error",
          text: res.data.message,
          icon: "error",
        });
        history.push("/admin/view-formative-test");
      }
      setLoading(false);
    })
  },[id,history])


  const handleInput = (e) => {
    e.persist();
    setTestItemInput({...testItemInput, [e.target.name]: e.target.value})
  }

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({...allCheckboxes, [e.target.name]: e.target.checked})
  }

  const submitTeacherTopic = (e) => {
    e.preventDefault();
    let succesTotal = true

    const formData = new FormData();
    formData.append('order_number',testItemInput.order_number );
    formData.append('title',testItemInput.title );
    formData.append('path',testItemInput.path );
    formData.append('type',testItemInput.type );
    formData.append('test_complexity_id',testItemInput.test_complexity_id );
    formData.append('teacher_topic_id',testItemInput.teacher_topic_id );
    formData.append('status',allCheckboxes.status == true ? 1 : 0);

    // console.log(formData)
    const formativeTest_id = id;
    axios.post(`http://localhost:8000/api/update-myformative-test/${formativeTest_id}`, formData).then(res => {
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
        succesTotal = false
      }
      else if(res.data.status === 404)
      {
        Swal.fire({
          title: "404 Error",
          text: res.data.message,
          icon: "error",
        });
        succesTotal = false
        history.push("/user/tests");
      }
    });
    if(succesTotal) {onBackToList()}
  }

  const handleBackToList = () => {
    onBackToList();
  };

  if(loading) {
    return <h4>Loading Edited Formative Test ...</h4>
  }

  return (
    <div className="container-fluid px4">
      <h2 className="m-3">Edit Formative Test
        <button onClick={handleBackToList} type="button" className="btnBts btn-primary text-white px-4 m-3 float-end">BACK to List</button>
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
              <div className="col-md-4">
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
              <div className="col-md-8">          
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
            </div>

            <div className="rowBts">
              <div className="col-md-4">
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

              <div className="col-md-8">
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

            </div>
            <div className="rowBts">
              <div className="col-md-8">          
                <div className="form-group m-3">
                  <label>Title</label>
                  <input type="text" name="title" onChange={handleInput} value={testItemInput.title}className="form-control" />
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.title}</span>
                </div>
              </div>

              <div className="col-md-4">
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





          </div>

          <div className="rowBts">

              <div className="col-md-8">          
                <div className="form-group m-3">
                  <label>Path</label>
                  <input type="text" name="path" onChange={handleInput} value={testItemInput.path}className="form-control" />
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.path}</span>
                </div>
              </div>

            <div className="col-md-2">
              <div className="form-group m-3">
                <label>Test Complexity</label>
                <select name="test_complexity_id" onChange={handleInput} value={testItemInput.test_complexity_id} className="form-control">  
                  <option>Select Test Complexity</option>
                  {
                    testComplexityList
                    .map((item)=> {
                      return (
                        <option value={item.id} key={item.id}>{item.name}</option>
                      )
                    })
                  }
                </select>            
                <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.test_complexity_id}</span>
              </div>
            </div>

            <div className="col-md-2">
                <div className="form-group m-3">
                  <label>Order number</label>
                  <input type="number" name="order_number" onChange={handleInput} value={testItemInput.order_number} className="form-control" />
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.order_number}</span>
                </div>
              </div>

          </div>
          <div className="rowBts">
            <div className="col-md-5">
              <div className="form-group m-3">
                  <label>Status</label>
                  <input type="checkbox" name="status" onChange={handleCheckbox} defaultChecked={allCheckboxes.status == 1 ? true: false}/> (0=shown, 1=hidden)
              </div>
            </div>
            <div className="col-md-7">
              <button type="submit" className="btnBts btn-success px-4 m-3 float-end">Submit</button>
            </div>
          </div>
          </form> 
          </div>
      </div>
   </div>
  )
}

export default EditMyTest;
