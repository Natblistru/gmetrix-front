import React,  { useState } from 'react';
import axios from "axios";
import Navbar from '../layouts/Navbar';

import { Link } from 'react-router-dom';

function ForgotPassword() {

  const [forgotInput, setForgotInput] = useState({
    email: '',
    error_list: [],
  });
  const [message, setMessage] = useState('Enter your email address and we will send you a link to reset your password.');
  const [messageIsChanged, setMessageIsChanged] = useState(false);
  const [status, setStatus] = useState("");


  const handleInput = (e) => {
    e.persist();
    setForgotInput({...forgotInput, [e.target.name]: e.target.value});
  }

  const forgotSubmit = (e) => {
    e.preventDefault();

      const data = {
        email: forgotInput.email,
      }

      axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
        axios.post('http://localhost:8000/api/forgot-password', data).then(res => {
            console.log(res);
          if(res.data.status === 200){
            console.log(res.data.message);
            setMessage(res.data.message);
            setStatus("200");
            setMessageIsChanged(true)
          }else if(res.data.status === 404){
            console.log(res.data.message);
            setMessage(res.data.message);
            setMessageIsChanged(true);
            setStatus("error");
          } 
          else
          {
            setForgotInput({...forgotInput, error_list: res.data.validation_errors })
          }
        });
      });
  }

  return (
    <div>
      <Navbar />
      <div className="containerBts">
        <div className="rowBts justify-content-center">
            <div className="col-lg-5">
                <div className="cardBts shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Password Recovery</h3></div>
                    <div className="card-body">
                        <div
                            className={`small mb-3 ${
                            status === '200' ? 'bg-success' :
                            status === 'error' ? 'bg-danger' : 'text-muted'
                            }`}
                            style={messageIsChanged ? { padding: '5px', color: 'white'} : {}}
                            >
                        {message}
                        </div>
                        <form onSubmit={forgotSubmit}>
                            <div className="form-floating mb-3">
                                <input  type="email" name="email" onChange={handleInput} value={forgotInput.email}  className="form-control" id="inputEmail" placeholder="name@example.com" />
                                <label htmlFor="inputEmail">Email address</label>
                                <span style={{ color: 'red', fontSize: '0.8rem' }}>{forgotInput.error_list.email}</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                <Link className="small" to="/login">Return to login</Link>
                                <button type="submit" className="btnBts btn-primary" >Send Link</button>
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

export default ForgotPassword;