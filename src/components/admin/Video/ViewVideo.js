import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function ViewVideo() {

  const [loading, setLoading] = useState(true);
  const [videoList, setVideoList] = useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/view-videos`).then(res=> {
      // console.log(res.data.video);
      if(res.data.status === 200){
        setVideoList(res.data.video)
      } else {

      }
      setLoading(false)
    })
  },[])

  let viewVideo_HTMLTABLE = "";
  if(loading) {
    return <h4>Loading Videos ...</h4>
  }
  else
  {
    let prodStatus = '';
    viewVideo_HTMLTABLE = 
    videoList.map((item) => {
      if(item.status == 0) {
        prodStatus = "Shown";
      }
      else if(item.status == 1) {
        prodStatus = "Hidden";
      }
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.title}</td>
          <td>{item.source}</td>
          <td>
            <Link to={`/admin/edit-video/${item.id}`} className="btnBts btn-success btn-small">Edit</Link>
          </td>
          <td>
            {prodStatus}
          </td>
        </tr>
      )
    })
  }

  return (
    <div className="containerBts px-4">
      <div className="cardBts mt-4">
        <div className="card-header">
          <h4>Video List
            <Link to="/admin/add-video" className="btnBts btn-primary text-white btn-sm float-end">Add Video</Link>
          </h4>
        </div>
        <div className="card-body">
        <div className="table-responsive" style={{ width: '100%' }}>
          <table className="table table-primary table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Source</th>
                <th>Edit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {viewVideo_HTMLTABLE}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
  );
}
export default ViewVideo;