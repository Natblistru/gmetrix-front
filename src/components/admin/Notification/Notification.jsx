import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'

const Notification = () => {
  const formInitialDetails = {
    message: "",
  };
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Trimite");
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Se trimite...");

    try {
      const response = await axios.post("/api/notify-all-subscribers", {
        letterText: formDetails.message,
      });

      setButtonText("Trimite");
      const result = response.data;
      setFormDetails(formInitialDetails);
      Swal.fire({
        title: "Success",
        text: `Messaj trimis cu succes.`,
        icon: "success"
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Ceva nu a mers bine. Mai încearcă.`,
        icon: "error"
      });
      console.error("Error sending request:", error);
      setButtonText("Trimite");
    }
  };

  return (
    <section className="contact" id="connect">
      <div style={{ width: "100%", paddingRight: ".75rem", paddingLeft: ".75rem", marginRight: "auto", marginLeft: "auto" }}>
        <div className="rowBts align-items-center">
          <h2>Notificarea abonatiolor</h2>
          <form onSubmit={handleSubmit}>
            <div className="rowBts">
              <div className="col-md-12 px-1">
                <textarea
                  rows="6"
                  value={formDetails.message}
                  placeholder="Message"
                  onChange={(e) => onFormUpdate("message", e.target.value)}
                ></textarea>
                <button type="submit"><span>{buttonText}</span></button>
              </div>
              {/* {status.message && (
                <div className="col-md-12">
                  <p className={status.success ? "success" : "danger"}>{status.message}</p>
                </div>
              )} */}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default Notification;