import React, { useState } from 'react';
import axios from "axios";
import Navbar from '../layouts/Navbar';

import Swal from 'sweetalert2'

import { useParams, useHistory, useLocation } from "react-router-dom";

function ResetPassword() {

  const history = useHistory();
  const { token } = useParams();
  const [resetInput, setResetInput] = useState({
    password: '',
    password_confirm: '',
    error_list: [],
  });
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(true);

  console.log(token)

  const handleInput = (e) => {
    e.persist();
    setResetInput({...resetInput, [e.target.name]: e.target.value })
  }

  const resetSubmit = (e) => {
    e.preventDefault();

    if (resetInput.password === resetInput.password_confirm) {

      const data = {
        password: resetInput.password,
      }
      axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
        axios.post(`http://localhost:8000/api/reset-password/${token}`, data).then(res => {
          if(res.data.status === 200)
          {
            history.push("/login");
          }
          else if(res.data.status === 404)
          {
            Swal.fire({
              title: "Warning",
              text: res.data.message,
              icon: "warning"
            });
          }
          else
          {
            setResetInput({...resetInput, error_list: res.data.validation_errors })
          }
        })
      });
    } 
    else
    {
      console.error('Parolele nu se potrivesc');
      setPasswordMatch(false);
    }
  }

  const handleFocus = () => {
    setPasswordFocused(true)
  };

  const handleBlur = () => {
    setPasswordFocused(false)
  };

  return (
    <div>
      <Navbar />
      <div className="containerBts">
          <div className="rowBts justify-content-center">
              <div className="col-lg-5">
                  <div className="cardBts shadow-lg border-0 rounded-lg mt-5">
                      <div className="card-header"><h3 className="text-center font-weight-light my-4">Password Reset</h3></div>
                      <div className="card-body">
                          <form onSubmit={resetSubmit}>
                              <div className="form-floating mb-3">
                                  <input type="password" name="password" onChange={handleInput} value={resetInput.password} className="form-control" onFocus={handleFocus} onBlur={handleBlur} id="inputPassword" placeholder="New password (at least 8 characters)" />
                                  <label htmlFor="inputPassword">{passwordFocused ? 'New password (at least 8 characters)': 'New password'}</label>
                                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{resetInput.error_list.password}</span>
                              </div>
                              <div className="form-floating mb-3">
                                  <input type="password" name="password_confirm" onChange={handleInput} value={resetInput.password_confirm} className="form-control" id="inputPasswordConfirm" placeholder="Confirm new password" />
                                  <label htmlFor="inputPasswordConfirm">Confirm new password</label>
                                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{resetInput.error_list.password_confirm}</span>
                              </div>
                              <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                  <button type="submit" className="btnBts btn-primary" >Set password</button>
                                  {!passwordMatch && <p style={{ color: 'red', fontSize: '0.8rem' }}>Parolele nu se potrivesc!</p>}
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
    
  )
}

export default ResetPassword;