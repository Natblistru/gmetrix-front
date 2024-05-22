import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Link, useHistory } from 'react-router-dom';

import Swal from 'sweetalert2'

function EditVideo(props) {

  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [errorList, setErrors] = useState([]);
  const [videoInput, setVideoInput] = useState({
    title: '',
    source: '',
  });

  const [allCheckboxes, setAllCheckboxes] = useState([])

  useEffect(()=> {
    const video_id = props.match.params.id;
    axios.get(`/api/edit-video/${video_id}`).then(res=>{
      // console.log(res.data.video)
      if(res.data.status === 200){
        setVideoInput(res.data.video)
        setAllCheckboxes(res.data.video)
      }
      else if(res.data.status === 404)
      {
        Swal.fire({
          title: "404 Error",
          text: res.data.message,
          icon: "error",
        });
        history.push("/admin/view-video");
      }
      setLoading(false);

    })

  },[props.match.params.id,history])

  const handleInput = (e) => {
    e.persist();
    setVideoInput({...videoInput, [e.target.name]: e.target.value})
  }

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({...allCheckboxes, [e.target.name]: e.target.checked})
  }

  const updateVideo = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title',videoInput.title );
    formData.append('source',videoInput.source );
    formData.append('status',allCheckboxes.status ? 1 : 0);

    const video_id = props.match.params.id;
    // console.log(video_id);
    axios.post(`/api/update-video/${video_id}`, formData).then(res=>{
      // console.log(res)
      if(res.data.status === 200) {
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
        history.push("/admin/view-video");
      }
    });
  }

  if(loading) {
    return <h4>Loading Edited Video ...</h4>
  }
  return (
    <div className="container-fluid px4">
      <h2 className="m-3">Edit Video
        <Link to="/admin/view-video" type="button" className="btnBts btn-primary text-white px-4 m-3 float-end">BACK to List</Link>
      </h2>
      <form onSubmit={updateVideo} >
        <ul className="navSide nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-linkSide active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
          </li>
          {/* <li className="nav-item" role="presentation">
            <button className="nav-linkSide" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
          </li> */}
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <div className="form-group m-3">
              <label>Title</label>
              <input type="text" name="title" onChange={handleInput} value={videoInput.title} className="form-control" />
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.title}</span>            
            </div>
            <div className="form-group m-3">
              <label>Source</label>
              <input type="text" name="source" onChange={handleInput} value={videoInput.source}className="form-control" />
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.source}</span>
            </div>
            <div className="form-group m-3">
              <label>Status</label>
              <input type="checkbox" name="status" onChange={handleCheckbox} defaultChecked={allCheckboxes.status == 1 ? true: false}/> (0=shown, 1=hidden)
            </div>
          </div>
          {/* <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">b</div> */}
        </div>
        <button type="submit" className="btnBts btn-success px-4 m-3 float-end">Update</button>
      </form>
    </div>
  );
}
export default EditVideo;