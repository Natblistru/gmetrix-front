import React from 'react';
import { Link } from 'react-router-dom';
import Svg403Page from '../svg/Svg403Page';

function Page403() {

  return(
    <div className="containerBts">
      <div className="rowBtn justify-content-center">
          <div className="col-lg-6" style={{ width: '100%'}}>
              <div className="text-center mt-4">
                  {/* <h1 className="display-1">403</h1> */}
                  <Svg403Page />
                    <p className="lead">Forbidden</p>
                  <p>Access is denied. As you are not an Admin</p>
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

export default Page403;