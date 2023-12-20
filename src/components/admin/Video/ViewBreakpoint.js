import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ViewBreakpoint() {

  const [loading, setLoading] = useState(true);
  const [breakpointList, setBreakpointList] = useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/view-breakpoints`).then(res=> {
      if(res.data.status === 200){
        setBreakpointList(res.data.breakpoints)
      } 
      setLoading(false)
    })
  },[])

  let viewBreakpoint_HTMLTABLE = "";
  if(loading) {
    return <h4>Loading Breakpoints ...</h4>
  }
  else
  {
    let breakpointStatus = '';
    viewBreakpoint_HTMLTABLE = 
    breakpointList.map((item) => {
      if(item.status == 0) {
        breakpointStatus = "Shown";
      }
      else if(item.status == 1) {
        breakpointStatus = "Hidden";
      }
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.time}</td>
          <td>{item.video.title}</td>
          <td>
            <Link to={`/admin/edit-breakpoint/${item.id}`} className="btnBts btn-success btn-small">Edit</Link>
          </td>
          <td>{breakpointStatus}</td>
        </tr>
      )
    })
  }

  return (
    <div className="containerBts px-4">
      <div className="cardBts mt-4">
        <div className="card-header">
          <h4>Breakpoint List
            <Link to="/admin/add-breakpoint" className="btnBts btn-primary text-white btn-sm float-end">Add Breakpoint</Link>
          </h4>
        </div>
        <div className="card-body">
        <table className="table table-primary table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Time</th>
              <th>Video</th>
              <th>Edit</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {viewBreakpoint_HTMLTABLE}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
export default ViewBreakpoint;
