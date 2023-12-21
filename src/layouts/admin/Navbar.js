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
          <Link to="/admin" className="navbar-brand ps-3">ExamenGimnazial.md</Link>
          {/* <button className="btnBts btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button> */}
          <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div className="input-group">
                <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                <button className="btnBts btn-primary mt-1 mb-1" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
            </div>
          </form>
          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
                <Link to="#" className="nav-linkSide dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></Link>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="/">Home</Link></li>                    
                    <li><Link className="dropdown-item" to="#!">Settings</Link></li>
                    <li><Link className="dropdown-item" to="#!">Activity Log</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <button type="link" onClick={logoutSubmit} style={{color: '#2bbbf1', fontSize: '1rem'}} className="dropdown-item">Logout</button>
                    {/* <li><Link className="dropdown-item" to="#!">Logout</Link></li> */}
                </ul>
            </li>
          </ul>
        </nav>
    );

}

export default Navbar;