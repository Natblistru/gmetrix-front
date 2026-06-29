import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import axios from "axios";

const ConsultatieModal = ({
  isOpen,
  onClose,
  lectie,
  student_id,
  onSuccess,
  onCancelSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    scheduled_at: "",
  });

  const [loading, setLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const esteProgramata = Number(lectie?.consultatie_programata) === 1;

  useEffect(() => {
    if (!lectie) return;

    if (esteProgramata) {
      setFormData({
        name: lectie.consultation_name || "",
        phone: lectie.consultation_phone || "",
        email: lectie.consultation_email || "",
        scheduled_at: lectie.consultation_scheduled_at_input || "",
      });
    } else {
      setFormData({
        name: localStorage.getItem("auth_name") || "",
        phone: "",
        email: localStorage.getItem("auth_email") || "",
        scheduled_at: "",
      });
    }

    setErrorMessage("");
  }, [lectie, esteProgramata]);

  if (!lectie) {
    return null;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    try {
      await axios.post("/api/consultation-requests", {
        videoLesson_id: lectie.id,
        student_id: student_id,
        lesson_title: lectie.title,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        scheduled_at: formData.scheduled_at,
      });

      setLoading(false);
      onSuccess(lectie.id);
      onClose();
    } catch (error) {
      console.error("Eroare la trimiterea cererii:", error);
      setErrorMessage("A apărut o eroare. Verifică datele și încearcă din nou.");
      setLoading(false);
    }
  };

  const handleCancelConsultation = async () => {
    const confirmed = window.confirm(
      "Într-adevăr doriți să anulați consultația programată?"
    );

    if (!confirmed) return;

    if (!lectie.consultation_request_id) {
      setErrorMessage("Nu a fost găsită consultația pentru anulare.");
      return;
    }

    setCancelLoading(true);
    setErrorMessage("");

    try {
      await axios.put(
        `/api/consultation-requests/${lectie.consultation_request_id}/cancel`
      );

      setCancelLoading(false);
      onCancelSuccess(lectie.id);
      onClose();
    } catch (error) {
      console.error("Eroare la anularea consultației:", error);
      setErrorMessage("A apărut o eroare la anularea consultației.");
      setCancelLoading(false);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="consultatie-modal"
      overlayClassName="consultatie-overlay"
      contentLabel="Programare consultație"
    >
      <div className="consultatie-modal-header">
        <h3>
          {esteProgramata
            ? "Consultație programată"
            : "Programare consultație"}
        </h3>

        <button type="button" className="consultatie-close" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="consultatie-lesson-title">{lectie.title}</div>

      <form className="consultatie-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Numele</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            readOnly={esteProgramata}
          />
        </div>

        <div className="form-group">
          <label>Telefonul</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            readOnly={esteProgramata}
          />
        </div>

        <div className="form-group">
          <label>Email-ul</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            readOnly={esteProgramata}
          />
        </div>

        <div className="form-group">
          <label>Data și ora consultației</label>
          <input
            type="datetime-local"
            name="scheduled_at"
            value={formData.scheduled_at}
            onChange={handleChange}
            required
            readOnly={esteProgramata}
          />
        </div>

        {errorMessage && (
          <div className="consultatie-error">{errorMessage}</div>
        )}

        {!esteProgramata && (
          <button
            type="submit"
            className="btn-trimite-consultatie"
            disabled={loading}
          >
            {loading ? "Se trimite..." : "Trimite"}
          </button>
        )}

        {esteProgramata && (
          <button
            type="button"
            className="btn-anuleaza-consultatie"
            onClick={handleCancelConsultation}
            disabled={cancelLoading}
          >
            {cancelLoading ? "Se anulează..." : "Anulează consultația"}
          </button>
        )}
      </form>
    </ReactModal>
  );
};

export default ConsultatieModal;