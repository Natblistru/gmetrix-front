import React,  { useState } from 'react';
import axios from "axios";
import Swal from 'sweetalert2'

import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Register() {

  const history = useHistory();
  const [registerInput, setRegisterInput] = useState({
    first_name: '',
    last_name: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
    error_list: [],
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleInput = (e) => {
    e.persist();
    setRegisterInput({...registerInput, [e.target.name]: e.target.value});
  }

  const registerSubmit = (e) => {
    e.preventDefault();

    if (registerInput.password === registerInput.confirmPassword) {

      const data = {
        first_name: registerInput.first_name,
        last_name: registerInput.last_name,
        email: registerInput.email,
        role: registerInput.role,
        password: registerInput.password,
      }

      axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post('/api/register', data).then(res => {
          if(res.data.status === 201){
            localStorage.setItem('auth_token', res.data.token);
            localStorage.setItem('auth_name', res.data.username);
            Swal.fire({
              title: "Succes",
              text: res.data.message,
              icon: "success"
            });
            history.push("/login")
          }else {
            setRegisterInput({...registerInput, error_list: res.data.validation_errors })
          }
        });
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
      <div className="containerBts">
          <div className="rowBts justify-content-center">
              <div className="col-lg-7">
                  <div className="cardBts shadow-lg border-0 rounded-lg mt-3">
                      <div className="card-header"><h3 className="text-center font-weight-light my-4">Create Account</h3></div>
                      <div className="card-body">
                          <form onSubmit={registerSubmit}>
                              <div className="rowBts mb-3">
                                  <div className="col-md-6">
                                      <div className="form-floating mb-3 mb-md-0">
                                          <input name="first_name" onChange={handleInput} value={registerInput.first_name} className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" />
                                          <label htmlFor="inputFirstName">First name</label>
                                          <span style={{ color: 'red', fontSize: '0.8rem' }}>{registerInput.error_list.first_name}</span>
                                      </div>
                                  </div>
                                  <div className="col-md-6">
                                      <div className="form-floating">
                                          <input name="last_name" onChange={handleInput} value={registerInput.last_name} className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" />
                                          <label htmlFor="inputLastName">Last name</label>
                                          <span style={{ color: 'red', fontSize: '0.8rem' }}>{registerInput.error_list.last_name}</span>
                                      </div>
                                  </div>
                              </div>
                              <div className="rowBts mb-3">
                                <div className="col-md-6">
                                  <div className="form-floating mb-3">
                                      <input name="email" onChange={handleInput} value={registerInput.email} className="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                                      <label htmlFor="inputEmail">Email address</label>
                                      <span style={{ color: 'red', fontSize: '0.8rem' }}>{registerInput.error_list.email}</span>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-floating mb-3">
                                    <select name="role" onChange={handleInput} value={registerInput.name} className="form-control" style={{color: '#4e4e3f', paddingTop: '2px'}}>  
                                      <option>Select role</option>
                                      <option value="student">Student</option>
                                      <option value="teacher" disabled>Teacher</option>
                                    </select> 
                                      <span style={{ color: 'red', fontSize: '0.8rem' }}>{registerInput.error_list.role}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="rowBts mb-3">
                                  <div className="col-md-6">
                                      <div className="form-floating mb-3 mb-md-0">
                                          <input name="password" onChange={handleInput} value={registerInput.password} className="form-control" onFocus={handleFocus} onBlur={handleBlur} id="inputPassword" type="password" placeholder="Create a password" />
                                          <label htmlFor="inputPassword">{passwordFocused ? 'Password (at least 8 characters)': 'Password'}</label>
                                          <span style={{ color: 'red', fontSize: '0.8rem' }}>{registerInput.error_list.password}</span>
                                      </div>
                                  </div>
                                  <div className="col-md-6">
                                      <div className="form-floating mb-3 mb-md-0">
                                          <input name="confirmPassword" onChange={handleInput} value={registerInput.confirmPassword} className="form-control" id="inputPasswordConfirm" type="password" placeholder="Confirm password" />
                                          <label htmlFor="inputPasswordConfirm">Confirm Password</label>
                                          {!passwordMatch && <p style={{ color: 'red', fontSize: '0.8rem' }}>Parolele nu se potrivesc!</p>}
                                      </div>
                                  </div>
                              </div>
                              <div className="mt-4 mb-0">
                                  <div className="d-grid"><button type="submit" className="btnBts btn-primary btn-block">Create Account</button></div>
                              </div>
                          </form>
                      </div>
                      <div className="card-footer text-center py-3">
                          <div className="small"><Link to="/login">Have an account? Go to login</Link></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

    </div>
    
  )
}

export default Register;