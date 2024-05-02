import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2'

const Navbar = () => {

  const history = useHistory();

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

    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          <Link to="/admin" className="navbar-brand ps-3">GMEtrix.md</Link>
          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
                <Link to="#" className="nav-linkSide dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></Link>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="/">Home</Link></li>                    
                    <li><hr className="dropdown-divider" /></li>
                    <button type="link" onClick={logoutSubmit} style={{color: '#2bbbf1', fontSize: '1rem'}} className="dropdown-item">Logout</button>
                </ul>
            </li>
          </ul>
        </nav>
    );

}

export default Navbar;