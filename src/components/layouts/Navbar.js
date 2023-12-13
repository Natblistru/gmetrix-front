import React from 'react';
import { Link } from 'react-router-dom';

import './../../assets/admin/css/stylesBootstrap.css';
import './../../assets/admin/js/scripts.js'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg shadow sticky-top" style={{backgroundColor: '#e3f2fd'}}>
      <div className="containerBts">
        <Link className="navbar-brand" to="#">Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
          <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Collection</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;