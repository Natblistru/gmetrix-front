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