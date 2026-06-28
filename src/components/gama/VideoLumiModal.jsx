import React, { useEffect } from "react";
import ReactModal from "react-modal";

const VideoLumiModal = ({ isOpen, onClose, lectie }) => {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[data-h5p-resizer="true"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://app.lumi.education/api/v1/h5p/core/js/h5p-resizer.js";
      script.charset = "UTF-8";
      script.async = true;
      script.setAttribute("data-h5p-resizer", "true");

      document.body.appendChild(script);
    }
  }, []);

  const handleAfterOpen = () => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  };

  if (!lectie) {
    return null;
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={handleAfterOpen}
      onRequestClose={onClose}
      className="video-lumi-modal"
      overlayClassName="video-lumi-overlay"
      contentLabel="Video interactiv Lumi"
    >
      <div className="video-lumi-modal-header">
        <h3>{lectie.title}</h3>

        <button
          type="button"
          className="video-lumi-close"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <div className="video-lumi-container">
        <iframe
          key={lectie.id}
          title={lectie.title}
          src={lectie.source}
          width="1088"
          height="720"
          frameBorder="0"
          allowFullScreen
          allow="geolocation *; microphone *; camera *; midi *; encrypted-media *"
        ></iframe>
      </div>
    </ReactModal>
  );
};

export default VideoLumiModal;