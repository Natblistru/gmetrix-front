import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from './../ReduxComp/languageActions';
import axios from "axios";
import Swal from 'sweetalert2'

import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import './../../assets/admin/css/stylesBootstrap.css';
import './../../assets/admin/js/scripts.js'
import SearchComponent from './SearchComponent.js';

function Navbar() {

  const dispatch = useDispatch();
  const language = useSelector(state => state.language);

  const navbarRef = useRef(null);
  const history = useHistory();
  const [authName, setAuthName] = useState('');

  const isAuthenticated = localStorage.getItem('auth_log') !== null;

  const disciplineAni = useSelector(state => state.disciplineAni);
  const nivelStudiu = disciplineAni[1]?.study_level_id==1?"examen clasa 9":"BAC";
  const clasa = disciplineAni[1]?.study_level_id==1?"clasa 9":"clasa 12";
  const name = disciplineAni[1]?.name.split(',')[0];
  const subject_id = disciplineAni[1]?.subject_id;

  useEffect(() => {
    const storedAuthName = localStorage.getItem('auth_name');
    setAuthName(storedAuthName);

    var prevScrollpos = window.pageYOffset;

    if (navbarRef.current) {
      window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
          navbarRef.current.style.top = "0";
          navbarRef.current.style.transition = 'top 0.5s ease';
        } else {
          navbarRef.current.style.top = "-70px";
          navbarRef.current.style.transition = 'top 0.5s ease';
        }
        prevScrollpos = currentScrollPos;
      };
    }

    return () => {
      window.onscroll = null;
    };
  }, [navbarRef]); 

  const handleLanguageChange = (e) => {
    dispatch(setLanguage(e.target.value));
  }

  const logoutSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/logout').then(res => {
      if(res.data.status === 200)
      {
        const keysToRemove = [
          'auth_log',
          'auth_name',
          'auth_role',
          'auth_roleId',
          'auth_token',
          'breadcrumbs',
          'capitole',
          'currentIndexTest',
          'currentStudent',
          'currentSubject',
          'currentTests',
          'currentTheme',
          'currentTopic',
          'disciplineAni',
          'evaluations',
          'evaluations1',
          'evaluations2',
          'evaluations3',
          'evaluations_all',
          'teachersForSubtitle',
          'themeVideo',
          'topics',
        ];
        
        keysToRemove.forEach(key => {
            localStorage.removeItem(key);
        });

        Swal.fire({
          title: "Succes",
          text: res.data.message,
          icon: "success"
        });
        history.push("/")
        window.location.reload();
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
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li className="nav-item dropdown">
            <Link to="#" className="nav-linkSide dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></Link>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/">Home</Link></li>                    
                <li><Link className="dropdown-item" to="/user/accountsettings">Profile</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <button type="link" onClick={logoutSubmit} style={{color: '#2bbbf1', fontSize: '1rem'}} className="dropdown-item">Logout</button>
                <li><Link className="dropdown-item" to={`/capitole_beta/${subject_id}?level=1&year=2022&name=${name}&nivel=${nivelStudiu}&clasa=${clasa}`}>Beta Version</Link></li>            
            </ul>
        </li>
      </ul>
      )
  }

  return (
    <nav ref={navbarRef} id="navbar" className="navbar navbar-expand-lg shadow sticky-top" style={{backgroundColor: '#e3f2fd'}}>
      <div className="containerBts">
        <Link className="navbar-brand" to="#">GMetrix1.md</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <SearchComponent />
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 lh-lg gap-3">
            <li className="nav-item">
            {isAuthenticated && <span>Bine ai venit, {authName}!</span>}
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="#">Collection</Link>
            </li> */}
            {AuthButtons}
            <select className="form-select-little" value={language} onChange={handleLanguageChange}>
              <option value="en">EN</option>
              <option value="ro">RO</option>
            </select>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;