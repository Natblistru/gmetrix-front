import React, { useState, useEffect} from 'react';
import axios from "axios";
import Swal from 'sweetalert2'

import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import './../../assets/admin/css/stylesBootstrap.css';
import './../../assets/admin/js/scripts.js'

function Navbar() {

  const history = useHistory();
  const [authName, setAuthName] = useState('');

  const isAuthenticated = localStorage.getItem('auth_log') !== null;

  useEffect(() => {
    const storedAuthName = localStorage.getItem('auth_name');
    setAuthName(storedAuthName);
  }, []);

  const logoutSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/logout').then(res => {
      if(res.data.status === 200)
      {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        localStorage.removeItem('auth_log');

        Swal.fire({
          title: "Succes",
          text: res.data.message,
          icon: "success"
        });
        history.push("/")
      }
    });
  }

  let AuthButtons = '';
  if(!localStorage.getItem('auth_token')){
    AuthButtons = (
      <>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
      </>
    )
  } else {
      AuthButtons = (
        <li className="nav-item">
          <button type="button" onClick={logoutSubmit} className="nav-link btnBts btn-danger btn-sm text-white">Logout</button>
        </li>
      )
  }

  return (
    <nav className="navbar navbar-expand-lg shadow sticky-top" style={{backgroundColor: '#e3f2fd'}}>
      <div className="containerBts">
        <Link className="navbar-brand" to="#">ExamenGimnazial.md</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 lh-lg gap-3">
            <li className="nav-item">
            {isAuthenticated && <span>Bine ai venit, {authName}!</span>}
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Collection</Link>
            </li>
            {AuthButtons}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;