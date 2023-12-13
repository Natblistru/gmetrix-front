import React from 'react';
import Navbar from '../layouts/Navbar';

import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
      <Navbar />
      <div class="containerBts">
          <div class="rowBts justify-content-center">
              <div class="col-lg-5">
                  <div class="cardBts shadow-lg border-0 rounded-lg mt-5">
                      <div class="card-header"><h3 class="text-center font-weight-light my-4">Login</h3></div>
                      <div class="card-body">
                          <form>
                              <div class="form-floating mb-3">
                                  <input class="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                                  <label htmlFor="inputEmail">Email address</label>
                              </div>
                              <div class="form-floating mb-3">
                                  <input class="form-control" id="inputPassword" type="password" placeholder="Password" />
                                  <label htmlFor="inputPassword">Password</label>
                              </div>
                              <div class="form-check mb-3">
                                  <input class="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                  <label class="form-check-label" htmlFor="inputRememberPassword">Remember Password</label>
                              </div>
                              <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                                  <Link class="small" to="/password">Forgot Password?</Link>
                                  <Link class="btnBts btn-primary" to="#">Login</Link>
                              </div>
                          </form>
                      </div>
                      <div class="card-footer text-center py-3">
                          <div class="small"><Link to="/register">Need an account? Sign up!</Link></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
    
  )
}

export default Login;