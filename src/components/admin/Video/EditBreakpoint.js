import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import * as XLSX from 'xlsx';
import InputMask from 'react-input-mask';
import { Link, useHistory } from 'react-router-dom';


import Swal from 'sweetalert2'

function EditBreakpoint(props) {

  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [videoList, setVideoList] = useState([]);
  const [errorList, setErrors] = useState([]);
  const [breakpointInput, setBreakpointInput] = useState({
    name: '',
    time: '',
    video_id: '',
  })

  const [allCheckboxes, setAllCheckboxes] = useState({
    status: false,
  })

  useEffect(() => {

    axios.get('http://localhost:8000/api/all-videos').then(res=>{
      if(res.data.status === 200){
        setVideoList(res.data.video);
      }

    });
    const breakpoint_id = props.match.params.id;
    axios.get(`http://localhost:8000/api/edit-breakpoint/${breakpoint_id}`).then(res=>{
      // console.log(res.data.breakpoint)
      if(res.data.status === 200){
        setBreakpointInput(res.data.breakpoint)
        setAllCheckboxes(res.data.breakpoint)
      }
      else if(res.data.status === 404)
      {
        Swal.fire({
          title: "404 Error",
          text: res.data.message,
          icon: "error",
        });
        history.push("/admin/view-breakpoint");
      }
      setLoading(false);
    })
  },[props.match.params.id,history])

  const handleInput = (e) => {
    e.persist();
    setBreakpointInput({...breakpointInput, [e.target.name]: e.target.value})
  }

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({...allCheckboxes, [e.target.name]: e.target.checked})
  }

  const updateBreakpoint = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name',breakpointInput.name );
    formData.append('time',breakpointInput.time );
    formData.append('video_id',breakpointInput.video_id );
    formData.append('status',allCheckboxes.status == true ? 1 : 0);

    // console.log(formData)

    const breakpoint_id = props.match.params.id;
    axios.post(`http://localhost:8000/api/update-breakpoint/${breakpoint_id}`, formData).then(res => {
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
        history.push("/admin/view-breakpoint");
      }
    });
  }

  if(loading) {
    return <h4>Loading Edited Breakpoint ...</h4>
  }
  return (
    <div className="container-fluid px4">
      <h2 className="m-3">Edit Breakpoint
        <Link to="/admin/view-breakpoint" type="button" className="btnBts btn-primary text-white px-4 m-3 float-end">BACK to List</Link>
      </h2>

        <ul className="navSide nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-linkSide active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
          </li>
          {/* <li className="nav-item" role="presentation">
            <button className="nav-linkSide" id="import-excel-tab" data-bs-toggle="tab" data-bs-target="#import-excel-tags" type="button" role="tab" aria-controls="import-excel-tags" aria-selected="false">Import from Excel</button>
          </li> */}
        </ul>
        <div className="tab-content" id="myTabContent">
        
          <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <form className="form-group custom-form" onSubmit={updateBreakpoint} >
            <div className="form-group m-3">
              <label>Title</label>
              <input type="text" name="name" onChange={handleInput} value={breakpointInput.name} className="form-control" />
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.name}</span>
            </div>
            <div className="rowBts">
              <div className="col-md-6">
                <div className="form-group m-3">
                  <label>Time</label>
                  <InputMask
                      name="time"
                      mask="99:99:99"
                      maskChar="_"
                      placeholder="HH:MM:SS"
                      className="form-control"
                      onChange={handleInput} 
                      value={breakpointInput.time}
                    />
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.time}</span>
                </div>
              </div>  
              <div className="col-md-6">          
                <div className="form-group m-3">
                  <label>Select Video</label>
                  <select name="video_id" onChange={handleInput} value={breakpointInput.video_id} className="form-control">  
                    <option>Select Video</option>
                    {
                      videoList.map((item)=> {
                        return (
                          <option value={item.id} key={item.id}>{item.title}</option>
                        )
                      })
                    }
                  </select>            
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.video_id}</span>
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

export default EditBreakpoint;
