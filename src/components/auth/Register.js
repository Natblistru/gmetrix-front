import React,  { useState } from 'react';
import Navbar from '../layouts/Navbar';
import axios from "axios";
import Swal from 'sweetalert2'

import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Register() {

  const history = useHistory();
  const [registerInput, setRegisterInput] = useState({
    name: '',
    email: '',
    password: '',
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setRegisterInput({...registerInput, [e.target.name]: e.target.value});
  }

  const registerSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
    }

    axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
      axios.post('http://localhost:8000/api/register', data).then(res => {
        if(res.data.status === 200){
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          Swal.fire({
            title: "Succes",
            text: res.data.message,
            icon: "success"
          });
          history.push("/")
        }else {
          setRegisterInput({...registerInput, error_list: res.data.validation_errors })
        }
      });
    });


  }
  return (
    <div>
      <Navbar />
      <div className="containerBts">
          <div className="rowBts justify-content-center">
              <div className="col-lg-7">
                  <div className="cardBts shadow-lg border-0 rounded-lg mt-5">
                      <div className="card-header"><h3 className="text-center font-weight-light my-4">Create Account</h3></div>
                      <div className="card-body">
                          <form onSubmit={registerSubmit}>
                              <div className="rowBts mb-3">
                                  <div className="col-md-6">
                                      <div className="form-floating mb-3 mb-md-0">
                                          <input name="name" onChange={handleInput} value={registerInput.name} className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" />
                                          <label htmlFor="inputFirstName">First name</label>
                                          <span>{registerInput.error_list.name}</span>
                                      </div>
                                  </div>
                                  <div className="col-md-6">
                                      <div className="form-floating">
                                          <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" />
                                          <label htmlFor="inputLastName">Last name</label>
                                      </div>
                                  </div>
                              </div>
                              <div className="form-floating mb-3">
                                  <input name="email" onChange={handleInput} value={registerInput.email} className="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                                  <label htmlFor="inputEmail">Email address</label>
                                  <span>{registerInput.error_list.email}</span>
                              </div>
                              <div className="rowBts mb-3">
                                  <div className="col-md-6">
                                      <div className="form-floating mb-3 mb-md-0">
                                          <input name="password" onChange={handleInput} value={registerInput.password} className="form-control" id="inputPassword" type="password" placeholder="Create a password" />
                                          <label htmlFor="inputPassword">Password</label>
                                          <span>{registerInput.error_list.password}</span>
                                      </div>
                                  </div>
                                  <div className="col-md-6">
                                      <div className="form-floating mb-3 mb-md-0">
                                          <input className="form-control" id="inputPasswordConfirm" type="password" placeholder="Confirm password" />
                                          <label htmlFor="inputPasswordConfirm">Confirm Password</label>
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