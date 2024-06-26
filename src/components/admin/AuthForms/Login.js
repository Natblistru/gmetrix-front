import React, { useState } from 'react';
import axios from "axios";

import Swal from 'sweetalert2'

import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Login() {

  const history = useHistory();
  const [loginInput, setLoginInput] = useState({
    email: '',
    password: '',
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setLoginInput({...loginInput, [e.target.name]: e.target.value })
  }

  const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    }
    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('/api/login', data).then(res => {
        if(res.data.status === 200)
        {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          localStorage.setItem('auth_log', res.data.token);
          Swal.fire({
            title: "Succes",
            text: res.data.message,
            icon: "success"
          });
          if(res.data.role === 'admin'){
            history.push("/admin/dashboard");
          }
          else {
            history.push("/");
          }
        }
        else if(res.data.status === 401)
        {
          Swal.fire({
            title: "Warning",
            text: res.data.message,
            icon: "warning"
          });
        }
        else
        {
          setLoginInput({...loginInput, error_list: res.data.validation_errors })
        }
      })
    });
  }

  return (
    <div>
      <div className="containerBts">
          <div className="rowBts justify-content-center">
              <div className="col-lg-5">
                  <div className="cardBts shadow-lg border-0 rounded-lg mt-5">
                      <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                      <div className="card-body">
                          <form onSubmit={loginSubmit}>
                              <div className="form-floating mb-3">
                                  <input type="email" name="email" onChange={handleInput} value={loginInput.email} className="form-control" id="inputEmail"  placeholder="name@example.com" />
                                  <label htmlFor="inputEmail">Email address</label>
                                  <span>{loginInput.error_list.email}</span>
                              </div>
                              <div className="form-floating mb-3">
                                  <input type="password" name="password" onChange={handleInput} value={loginInput.password} className="form-control" id="inputPassword" placeholder="Password" />
                                  <label htmlFor="inputPassword">Password</label>
                                  <span>{loginInput.error_list.password}</span>
                              </div>
                              {/* <div className="form-check mb-3">
                                  <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                  <label className="form-check-label" htmlFor="inputRememberPassword">Remember Password</label>
                              </div> */}
                              <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                  <Link className="small" to="/forgot-password">Forgot Password?</Link>
                                  <button type="submit" className="btnBts btn-primary" >Login</button>
                              </div>
                          </form>
                      </div>
                      <div className="card-footer text-center py-3">
                          <div className="small"><Link to="/register">Need an account? Sign up!</Link></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
    
  )
}

export default Login;