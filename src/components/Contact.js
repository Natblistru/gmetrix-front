import { useState } from "react";
import contactImg from "../assets/img/contact-img.svg";
import axios from 'axios';
import Swal from 'sweetalert2'
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Contact = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  }
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Trimite');
  const [status, setStatus] = useState({});
  const [isVisible, setIsVisible] = useState(true);

  const onFormUpdate = (category, value) => {
      setFormDetails({
        ...formDetails,
        [category]: value
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formDetails.message.length < 10) {
      Swal.fire({
        title: "Error",
        text: `Mesajul trebuie să contina cel puțin 10 caractere.`,
        icon: "error"
      });
      setStatus({ success: false, message: 'Message must be at least 3 characters long.' });
      return;
    }

    setButtonText("Se trimite...");

    try {
      const response = await axios.post("/api/contact", formDetails, {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      setButtonText("Trimite");
      const result = response.data;

      setFormDetails(formInitialDetails);

      if (result.code === 200) {
        Swal.fire({
          title: "Success",
          text: `Messaj trimis cu succes.`,
          icon: "success"
        });
        setStatus({ success: true, message: 'Message sent successfully' });
      } else {
        Swal.fire({
          title: "Error",
          text: `Ceva nu a mers bine. Mai încearcă.`,
          icon: "error"
        });
        setStatus({ success: false, message: 'Something went wrong, please try again later.' });
      }
    } catch (error) {
      console.error("Error sending request:", error);
      setButtonText("Trimite");
      setStatus({ success: false, message: 'An error occurred while sending the message.' });
    }
  };

  return (
    <section className="contact" id="connect">
      <div style={{width: '100%', paddingRight: '.75rem', paddingLeft: '.75rem', marginRight: 'auto', marginLeft: 'auto'}}>
        <div className="rowBts align-items-center">
          <div className="col-md-6">
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us"/>
               }
            </TrackVisibility> }
          </div>
          <div className="col-md-6">
            {/* <TrackVisibility>
              {({ isVisible }) => */}
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h2>Contactează-ne</h2>
                <form onSubmit={handleSubmit}>
                  <div className="rowBts">
                    <div className="col-md-6 px-1">
                      <input type="text" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                    </div>
                    <div className="col-md-6 px-1">
                      <input type="text" value={formDetails.lastName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)}/>
                    </div>
                    <div className="col-md-6 px-1">
                      <input type="email" value={formDetails.email} placeholder="Email Address" onChange={(e) => onFormUpdate('email', e.target.value)} />
                    </div>
                    <div className="col-md-6 px-1">
                      <input type="tel" value={formDetails.phone} placeholder="Phone No." onChange={(e) => onFormUpdate('phone', e.target.value)}/>
                    </div>
                    <div className="col-md-12 px-1">
                      <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                      <button type="submit"><span>{buttonText}</span></button>
                    </div>
                    {/* {
                      status.message &&
                      <div className="col-md-12">
                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                      </div>
                    } */}
                  </div>
                </form>
              </div>
              {/* }
            </TrackVisibility> */}
          </div>
        </div>
      </div>
    </section>
  )
}
