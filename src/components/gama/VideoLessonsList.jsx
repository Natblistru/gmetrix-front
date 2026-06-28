import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaLock, FaUnlock } from "react-icons/fa";
import VideoLumiModal from "./VideoLumiModal";

const VideoLessonsList = () => {
  const videoLessonsState = useSelector((state) => state.videoLessons);

  const videoLessons = Array.isArray(videoLessonsState)
    ? videoLessonsState
    : [];

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const accesMateriale = (lectie) => {
    if (Number(lectie.acces) === 1) {
      setSelectedLesson(lectie);
      setModalOpen(true);
      return;
    }

    alert(`${lectie.title}: accesul la materiale este blocat până la achitare.`);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedLesson(null);
  };

  const cereConsultatie = (lectie) => {
    alert(`Ai solicitat consultație pentru ${lectie.title}.`);
  };

  return (
    <>
      <div className="lectii-fixe-container">
        {videoLessons.length === 0 && (
          <p>Nu există lecții pentru această disciplină.</p>
        )}

        {videoLessons.map((lectie, index) => {
          const areAcces = Number(lectie.acces) === 1;

          return (
            <div className="lectie-fixa-item" key={lectie.id}>
              <div className="lectie-fixa-title">
                <span className="lectie-numar">{index + 1}.</span>
                <span>{lectie.title}</span>
              </div>

              <div className="lectie-fixa-actions">
                <button
                  type="button"
                  className={
                    areAcces
                      ? "btn-lectie btn-acces-materiale-activ"
                      : "btn-lectie btn-acces-materiale-blocat"
                  }
                  onClick={() => accesMateriale(lectie)}
                  title={
                    areAcces
                      ? "Acces permis la materiale"
                      : "Acces blocat până la achitare"
                  }
                >
                  Acces materiale{" "}
                  {areAcces ? (
                    <FaUnlock className="access-icon" />
                  ) : (
                    <FaLock className="lock-icon" />
                  )}
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
          );
        })}
      </div>

      {selectedLesson && (
        <VideoLumiModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          lectie={selectedLesson}
        />
      )}
    </>
  );
};

export default VideoLessonsList;