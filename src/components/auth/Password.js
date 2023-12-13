import React from 'react';
import Navbar from '../layouts/Navbar';

import { Link } from 'react-router-dom';

function Password() {
  return (
    <div>
      <Navbar />
      <div className="containerBts">
        <div className="rowBts justify-content-center">
            <div className="col-lg-5">
                <div className="cardBts shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Password Recovery</h3></div>
                    <div className="card-body">
                        <div className="small mb-3 text-muted">Enter your email address and we will send you a link to reset your password.</div>
                        <form>
                            <div className="form-floating mb-3">
                                <input className="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                                <label htmlFor="inputEmail">Email address</label>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                <Link className="small" to="/login">Return to login</Link>
                                <Link className="btnBts btn-primary" to="#">Reset Password</Link>
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

export default Password;