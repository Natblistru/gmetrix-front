import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'


const ChangePassword = ({ userData }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleOldPasswordInput = (e) => {
        setOldPassword(e.target.value);
      };
    
      const handleNewPasswordInput = (e) => {
        setNewPassword(e.target.value);
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        const requestData = {
          oldPassword,
          newPassword,
        };
        // console.log(oldPassword)
        // console.log(newPassword)
    
        const user_id = userData.id;
        // const authToken = localStorage.getItem('auth_token');
        axios.patch(`/api/change-password-user/${user_id}`, requestData)
          .then(res => {
            Swal.fire({
              title: "Succes",
              text: res.data.message,
              icon: "success",
            });
          })
          .catch(error => {
            console.error('Error changing password:', error);
            Swal.fire({
              title: "Error",
              text: "An error occurred while changing the password",
              icon: "error",
            });
          });
      };

    return (
        <div className='accountsettings'>
            <h1 className='mainhead1'>Change Password</h1>
            <form onSubmit={handleSubmit} className="w-100">
                <div className='form rowBts'>
                    <div className='form-group col-md-6'>
                        <label htmlFor='oldpass'>Old Password <span>*</span></label>
                        <input type="password" onChange={handleOldPasswordInput} value={oldPassword} />
                    </div>

                    <div className='form-group col-md-6'>
                        <label htmlFor='newpass'>New Password <span>*</span></label>
                        <input type="password" onChange={handleNewPasswordInput} value={newPassword} />
                    </div>
                </div>
                <button type="submit" className='btnBts btn-outline-secondary d-block mx-auto'>Save Changes</button>
            </form>
        </div>
    )
}

export default ChangePassword