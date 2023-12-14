import React from 'react';
import { Link } from 'react-router-dom';
import Svg404Page from '../svg/Svg404Page';


function Page404() {
  return(
    <div className="containerBts">
      <div className="rowBtn justify-content-center">
          <div className="col-lg-6" style={{ width: '100%'}}>
              <div className="text-center mt-4">
                  {/* <h1 className="display-1">401</h1> */}
                  <Svg404Page />
                  <p className="lead">Not Found</p>
                  <p>This requested URL was not found on this server.</p>
                  <Link to="/">
                      <i className="fas fa-arrow-left me-1"></i>
                      Return to home
                  </Link>
              </div>
          </div>
      </div>
  </div>
  )
}

export default Page404;