import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaLock, FaUnlock } from "react-icons/fa";
import VideoLumiModal from "./VideoLumiModal";
import ConsultatieModal from "./ConsultatieModal";

const VideoLessonsList = () => {
  const videoLessonsState = useSelector((state) => state.videoLessons);

  const videoLessons = Array.isArray(videoLessonsState)
    ? videoLessonsState
    : [];

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isConsultatieModalOpen, setConsultatieModalOpen] = useState(false);
  const [selectedConsultatieLesson, setSelectedConsultatieLesson] = useState(null);
  const [consultatiiProgramate, setConsultatiiProgramate] = useState({});
  const [consultatiiAnulate, setConsultatiiAnulate] = useState({});

  const currentStudentId = localStorage.getItem("auth_roleId");

  const student_id =
    localStorage.getItem("auth_role") === "student" ? currentStudentId : 1;

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
    setSelectedConsultatieLesson(lectie);
    setConsultatieModalOpen(true);
  };

  const handleConsultatieSuccess = (lectieId) => {
    setConsultatiiProgramate((prev) => ({
      ...prev,
      [lectieId]: true,
    }));
  };

  const handleConsultatieCancelSuccess = (lectieId) => {
    setConsultatiiAnulate((prev) => ({
      ...prev,
      [lectieId]: true,
    }));

    setConsultatiiProgramate((prev) => ({
      ...prev,
      [lectieId]: false,
    }));
  };

  return (
    <>
      <div className="lectii-fixe-container">
        {videoLessons.length === 0 && (
          <p>Nu există lecții pentru această disciplină.</p>
        )}

        {videoLessons.map((lectie, index) => {
          const areAcces = Number(lectie.acces) === 1;
          const esteProgramata =
            (
              Number(lectie.consultatie_programata) === 1 ||
              consultatiiProgramate[lectie.id]
            ) &&
            !consultatiiAnulate[lectie.id];

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
                  className={
                    esteProgramata
                      ? "btn-lectie btn-consultatie-programata"
                      : "btn-lectie btn-cere-consultatie"
                  }
                  onClick={() => cereConsultatie(lectie)}
                >
                  {esteProgramata ? "Consultație programată" : "Solicită consultație"}
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
      <ConsultatieModal
        isOpen={isConsultatieModalOpen}
        onClose={() => setConsultatieModalOpen(false)}
        lectie={selectedConsultatieLesson}
        student_id={student_id}
        onSuccess={handleConsultatieSuccess}
        onCancelSuccess={handleConsultatieCancelSuccess}
      />
    </>
  );
};

export default VideoLessonsList;