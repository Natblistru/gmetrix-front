import React, { useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2'

function Video() {

  const [videoInput, setVideoInput] = useState({
    title: '',
    source: '',
    error_list: [],
  })

  const [allCheckboxes, setAllCheckboxes] = useState({
    status: false,
  })

  const handleInput = (e) => {
    e.persist();
    setVideoInput({...videoInput, [e.target.name]: e.target.value})
  }

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({...allCheckboxes, [e.target.name]: e.target.checked})
  }

  const submitVideo = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title',videoInput.title );
    formData.append('source',videoInput.source );
    formData.append('status',allCheckboxes.status == true ? 1 : 0);

    axios.post(`http://localhost:8000/api/store-video`, formData).then(res => {
      if(res.data.status === 201)
      {
        Swal.fire({
          title: "Succes",
          text: res.data.message,
          icon: "success"
        });
        setVideoInput({
          title: '',
          source: '',
          error_list: [],
        });
        setAllCheckboxes({
          status: false,
        });
      }
      else if(res.data.status === 422)
      {
        setVideoInput({...videoInput,error_list:res.data.errors});
      }
    });
  }

  return (
    <div className="container-fluid px4">
      <h2 className="m-3">Add Video
        <Link to="/admin/view-video" type="button" className="btnBts btn-primary text-white px-4 m-3 float-end">BACK to List</Link>
      </h2>
      <form onSubmit={submitVideo} >
        <ul className="navSide nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-linkSide active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-linkSide" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <div className="form-group m-3">
              <label>Title</label>
              <input type="text" name="title" onChange={handleInput} value={videoInput.title} className="form-control" />
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{videoInput.error_list.title}</span>            
            </div>
            <div className="form-group m-3">
              <label>Source</label>
              <input type="text" name="source" onChange={handleInput} value={videoInput.source}className="form-control" />
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{videoInput.error_list.source}</span>
            </div>
            <div className="form-group m-3">
              <label>Status</label>
              <input type="checkbox" name="status" onChange={handleCheckbox} defaultChecked={allCheckboxes.status == 1 ? true: false}/> (0=shown, 1=hidden)
            
            </div>
          </div>
          <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">b</div>
        </div>
        <button type="submit" className="btnBts btn-success px-4 m-3 float-end">Submit</button>
      </form>
    </div>
  )
}

export default Video;