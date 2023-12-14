import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Redirect, useHistory } from 'react-router-dom';
import MasterLayout from '../layouts/admin/MasterLayout';
import Swal from 'sweetalert2'

function AdminPrivateRoute({...rest}) {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)  
  const history = useHistory();
  useEffect(()=>{
    axios.get('http://localhost:8000/api/checkingAuthenticated').then( res => {
      if(res.status === 200) 
      {
        setAuthenticated(true)
      }
      setLoading(false);
    });

    return () => {
      setAuthenticated(false);
    }
  },[])

  axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err){
    if(err.response.status === 401){
      Swal.fire({
        title: "Unauthorized",
        text: err.response.data.message,
        icon: "warning",
      });
      history.push("/");
      return Promise.resolve({ redirectTo: "/" });
    }
    return Promise.reject(err);
  });

  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error){
    if(error.response.status === 403){
      Swal.fire({
        title: "Forbidden",
        text: error.response.data.message,
        icon: "warning",
      });
      history.push("/");
      return Promise.resolve({ redirectTo: "/" });
    }
    else if(error.response.status === 404)
    {
      Swal.fire({
        title: "404 Error",
        text: "URL/Page not found",
        icon: "warning",
      });
      history.push("/");
      return Promise.resolve({ redirectTo: "/" });
    }
    return Promise.reject(error);
  });

  if(loading) {
    return <h1>loading...</h1>
  }



  return (
    <Route {...rest}
      render={ ({props, location}) =>
        authenticated ?
        ( <MasterLayout {...props}/> ) :
        ( <Redirect to={{pathname: "/login", state: {from: location}} }/> )
      }
    />
  )
}

export default AdminPrivateRoute;