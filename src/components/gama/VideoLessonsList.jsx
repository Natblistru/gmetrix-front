import React from "react";
import { useSelector } from "react-redux";
import { FaLock } from "react-icons/fa";

const VideoLessonsList = () => {
  const videoLessonsState = useSelector((state) => state.videoLessons);

  const videoLessons = Array.isArray(videoLessonsState)
    ? videoLessonsState
    : [];

  const accesMateriale = (lectie) => {
    if (lectie.status === "open" && lectie.source) {
      window.location.href = lectie.source;
    } else {
      alert(`${lectie.title}: accesul la materiale este blocat până la achitare.`);
    }
  };

  const cereConsultatie = (lectie) => {
    alert(`Ai solicitat consultație pentru ${lectie.title}.`);
  };

  return (
    <div className="lectii-fixe-container">
      {videoLessons.length === 0 && (
        <p>Nu există lecții pentru această disciplină.</p>
      )}

      {videoLessons.map((lectie, index) => (
        <div className="lectie-fixa-item" key={lectie.id}>
          <div className="lectie-fixa-title">
            <span className="lectie-numar">{index + 1}.</span>
            <span>{lectie.title}</span>
          </div>

          <div className="lectie-fixa-actions">
            <button
              type="button"
              className="btn-lectie btn-acces-materiale-blocat"
              onClick={() => accesMateriale(lectie)}
              title="Acces blocat până la achitare"
            >
              Acces materiale <FaLock className="lock-icon" />
            </button>

            <button
              type="button"
              className="btn-lectie btn-cere-consultatie"
              onClick={() => cereConsultatie(lectie)}
            >
              Cere consultație
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoLessonsList;