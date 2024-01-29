import logo from "../assets/img/logo.svg";
import { Link } from "react-router-dom";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
import SubscribeForm from "./SubscribeForm";



const Footer = () => {
  return (
    <footer className="footer">
      <div  style={{width: '1140px', paddingRight: '.75rem', paddingLeft: '.75rem', marginRight: 'auto', marginLeft: 'auto'}}>
        <div className="rowBts  align-items-center">
          <SubscribeForm />
          <div className="col-md-6 logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="col-md-6 text-center text-sm-end">
            <div className="social-icon">
              <Link to="#"><img src={navIcon1} alt="Icon" /></Link>
              <Link to="#"><img src={navIcon2} alt="Icon" /></Link>
              <Link to="#"><img src={navIcon3} alt="Icon" /></Link>
            </div>
            <p>Copyright 2024. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
