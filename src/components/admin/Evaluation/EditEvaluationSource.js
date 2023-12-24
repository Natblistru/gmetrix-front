import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import * as XLSX from 'xlsx';
import InputMask from 'react-input-mask';
import { Link, useHistory  } from 'react-router-dom';


import Swal from 'sweetalert2'

function EditEvaluationSource(props) {

  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const [subjectList, setSubjectList] = useState([]);
  const [chapterList, setChapterList] = useState([]);
  const [themeList, setThemeList] = useState([]);

  const [errorList, setErrors] = useState([]);
  const [evaluationSourceInput, setEvaluationSourceInput] = useState({
    subject_study_level_id: '',
    chapter_id: '',
    theme_id: '',
    name: '',
    title: '',
    content: '',
    author: '',
    text_sourse: '',
  })

  const [allCheckboxes, setAllCheckboxes] = useState({
    status: false,
  })

  useEffect(() => {

    axios.get('http://localhost:8000/api/all-subject-study-level').then(res=>{
      if(res.data.status === 200){
        setSubjectList(res.data.subject);
      }
    });

    axios.get('http://localhost:8000/api/all-chapters').then(res=>{
      if(res.data.status === 200){
        setChapterList(res.data.chapters);
      }
    });

    axios.get('http://localhost:8000/api/all-themes').then(res=>{
      if(res.data.status === 200){
        setThemeList(res.data.themes);
      }
    });

    const evaluation_source_id = props.match.params.id;
    axios.get(`http://localhost:8000/api/edit-evaluation-source/${evaluation_source_id}`).then(res=>{
      if(res.data.status === 200){
        console.log(res.data.evaluationSource)
        console.log(res.data)

        const evaluationSourceData = res.data.evaluationSource;
        try {
          const parsedData = JSON.parse(evaluationSourceData.content);
          const formattedTextArray = Object.values(parsedData);
          const joinedText = formattedTextArray.join('\n');

          setEvaluationSourceInput({
            ...evaluationSourceData,
            content: joinedText,
            chapter_id: evaluationSourceData.theme.chapter_id,
            subject_study_level_id: res.data.subject_study_level_id,
          });

        } catch (error) {
          Swal.fire({
            title: "Eroare la parsarea JSON (content)",
            text: error,
            icon: "error",
          });
          // console.error('Eroare la parsarea JSON:', error);
        }



        // setEvaluationSourceInput(res.data.evaluationSource)
        setAllCheckboxes(res.data.evaluationSource)
      }
      else if(res.data.status === 404)
      {
        Swal.fire({
          title: "404 Error",
          text: res.data.message,
          icon: "error",
        });
        history.push("/admin/view-evaluation-source");
      }
      setLoading(false);
    })
  },[props.match.params.id,history])



  const handleInput = (e) => {
    e.persist();
    setEvaluationSourceInput({...evaluationSourceInput, [e.target.name]: e.target.value})
  }

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({...allCheckboxes, [e.target.name]: e.target.checked})
  }

  const submitEvaluationSource = (e) => {
    e.preventDefault();

    const lines = evaluationSourceInput.content.split('\n');

    const contentObject = {};
    lines.forEach((line, index) => {
      contentObject[index + 1] = line.trim();
    });

    const formData = new FormData();
    // formData.append('subject_study_level_id', evaluationSourceInput.subject_study_level_id );
    // formData.append('chapter_id',evaluationSourceInput.chapter_id );
    formData.append('theme_id',evaluationSourceInput.theme_id );
    formData.append('name',evaluationSourceInput.name );
    formData.append('title',evaluationSourceInput.title );
    formData.append('content', JSON.stringify(contentObject));
    formData.append('author',evaluationSourceInput.author );
    formData.append('text_sourse',evaluationSourceInput.text_sourse );
    formData.append('status',allCheckboxes.status == true ? 1 : 0);

    console.log(formData)

    const evaluation_source_id = props.match.params.id;
    axios.post(`http://localhost:8000/api/update-evaluation-source/${evaluation_source_id}`, formData).then(res => {
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
        history.push("/admin/view-evaluation-source");
      }
    });
  }

  if(loading) {
    return <h4>Loading Edited Evaluation Source...</h4>
  }

  return (
    <div className="container-fluid px4">
      <h2 className="m-3">Add Evaluation Source
        <Link to="/admin/view-evaluation-source" type="button" className="btnBts btn-primary text-white px-4 m-3 float-end">BACK to List</Link>
      </h2>

        <ul className="navSide nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-linkSide active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
        
          <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <form className="form-group custom-form" onSubmit={submitEvaluationSource} >
          <div className="rowBts">

          <div className="col-md-3">          
            <div className="form-group m-3">
              <label>Select Subject Study Level</label>
              <select name="subject_study_level_id" onChange={handleInput} value={evaluationSourceInput.subject_study_level_id} className="form-control">  
                <option>Select Subject Study Level</option>
                {
                  subjectList.map((item)=> {
                    return (
                      <option value={item.id} key={item.id}>{item.name}</option>
                    )
                  })
                }
              </select>            
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.subject_study_level_id}</span>
            </div>
          </div>

          <div className="col-md-4">          
            <div className="form-group m-3">
              <label>Select Chapter</label>
              <select name="chapter_id" onChange={handleInput} value={evaluationSourceInput.chapter_id} className="form-control">  
                <option>Select Chapter</option>
                {
                  chapterList
                  .filter((item) => item.subject_study_level_id == evaluationSourceInput.subject_study_level_id)
                  .map((item)=> {
                    return (
                      <option value={item.id} key={item.id}>{item.name}</option>
                    )
                  })
                }
              </select>            
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.chapter_id}</span>
            </div>
          </div>

          <div className="col-md-5">          
            <div className="form-group m-3">
              <label>Select Theme</label>
              <select name="theme_id" onChange={handleInput} value={evaluationSourceInput.theme_id} className="form-control">  
                <option>Select Theme</option>
                {
                  themeList
                  .filter((item) => item.chapter_id == evaluationSourceInput.chapter_id)
                  .map((item)=> {
                    return (
                      <option value={item.id} key={item.id}>{item.name}</option>
                    )
                  })
                }
              </select>            
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.theme_id}</span>
            </div>
          </div>



          </div> 
          <div className="rowBts">   

            <div className="col-md-7">
              <div className="form-group m-3">
                <label>Name</label>
                <input type="text" name="name" onChange={handleInput} value={evaluationSourceInput.name} className="form-control" />
                <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.name}</span>
              </div>
            </div>

            <div className="col-md-5">
              <div className="form-group m-3">
                <label>Title</label>
                <input type="text" name="title" onChange={handleInput} value={evaluationSourceInput.title} className="form-control" />
                <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.title}</span>
              </div>
            </div>

          </div> 
          <div className="rowBts">  

            <div className="col-md-12">
              <div className="form-group m-3">
                <label>Content</label>
                <textarea name="content" onChange={handleInput} value={evaluationSourceInput.content} className="form-control" />
                <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.content}</span>
              </div>
            </div>
          </div> 
          <div className="rowBts">  

            <div className="col-md-3">
              <div className="form-group m-3">
                <label>Author</label>
                <input type="text" name="author" onChange={handleInput} value={evaluationSourceInput.author} className="form-control" />
                <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.author}</span>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group m-3">
                <label>Text-source</label>
                <input type="text" name="text_sourse" onChange={handleInput} value={evaluationSourceInput.text_sourse} className="form-control" />
                <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.text_sourse}</span>
              </div>
            </div>

          </div>
          <div className="rowBts">   
          <div className="col-md-4">
              <div className="form-group m-3">
                <label>Status</label>
                <input type="checkbox" name="status" onChange={handleCheckbox} defaultChecked={allCheckboxes.status == 1 ? true: false}/> (0=shown, 1=hidden)
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

export default EditEvaluationSource;
