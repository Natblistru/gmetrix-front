import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

const AccountSettings = ({ userData, setUserData }) => {
  const [errorList, setErrors] = useState([]);

  const handleInput = (e) => {
    e.persist();
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
  };

    const user_id = userData.id;
    axios.patch(`http://localhost:8000/api/update-user/${user_id}`, requestData).then(res => {
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
      }
    });
  };

  return (
    <div className='accountsettings'>
      <h1 className='mainhead1'>Personal Information</h1>

      <form onSubmit={handleSubmit}>
        <div className='form'>
          <div className='form-group'>
            <label htmlFor='first_name'>Your First Name <span>*</span></label>
            <input type="text" name="first_name" onChange={handleInput} value={userData.first_name} className="form-control" id='first_name'/>
            <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.first_name}</span>
          </div>
          <div className='form-group'>
            <label htmlFor='last_name'>Your Last Name <span>*</span></label>
            <input type="text" name="last_name" onChange={handleInput} value={userData.last_name} className="form-control" id='last_name'/>
            <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.last_name}</span>
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email <span>*</span></label>
            <input type="email" name="email" onChange={handleInput} value={userData.email} className="form-control" id='email'/>
            <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.email}</span>
          </div>
          <div className='form-group justify-content-end align-items-center' style={{ paddingBottom: '12px' }}>
            <label>{userData && userData.role}</label>
          </div>
        </div>
        <button type="submit" className='btnBts btn-outline-secondary d-block mx-auto'>Save Changes</button>
      </form>

    </div>
  );
}

export default AccountSettings