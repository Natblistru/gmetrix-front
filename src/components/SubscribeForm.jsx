import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import 'aos/dist/aos.css';
import AOS from 'aos';

const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    AOS.init(); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/subscribe', { email });
      setMessage(response.data.message);
      Swal.fire({
        title: "Success",
        text: `Abonare cu succes.`,
        icon: "success"
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Ceva nu a mers bine. Mai încearcă.`,
        icon: "error"
      });
      setMessage('Error subscribing. Please try again.');
    }
  };

  return (
    <div data-aos="fade-up" data-aos-delay="200">
      <div style={{width: '100%', paddingRight: '.75rem', paddingLeft: '.75rem', marginRight: 'auto', marginLeft: 'auto'}}>
        <div className="newsletter-bx wow slideInUp">
        <div className="rowBts">
            <div className="col-md-5">
              <h3>Abonează-te la știrile noasre, la cele mai recente actualizări</h3>
            </div>
            <div className="col-md-7">
              <form onSubmit={handleSubmit}>
                <div className="new-email-bx">
                  <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeForm;