import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";
import ProgressBar from "../ProgressBar";
import { fetchTheme } from "../../routes/api"

const SubTopicItem_beta = ({ subTit, idx, teachers }) => {
  const dispatch = useDispatch();
  const subtitle = subTit;
  // console.log(subtitle)
  const [isModalOpen, setModalOpen] = useState(false);
  const currentSubject = useSelector((state) => state.currentSubject);
  const currentStudentObject = useSelector(state => state.currentStudent);
  const currentStudent = currentStudentObject ? currentStudentObject.currentStudent : 1; 
  // console.log(currentSubject)
  // console.log(currentSubject.currentSubject)

  const subject_id =
    currentSubject.subject_id || currentSubject.currentSubject?.subject_id;
    // console.log(subject_id)
  const [selectedTeacher, setSelectedTeacher] = useState({
    id: teachers && teachers[0] ? teachers[0].teacher_id : "",
    teacher_name: teachers && teachers[0] ? teachers[0].teacher_name : "",
  });

  useEffect(() => {
    if (teachers && teachers.length > 0) {
      setSelectedTeacher({
        id: teachers[0].teacher_id,
        teacher_name: teachers[0].teacher_name,
      });
    }
  }, [teachers]);

  const handleLinkClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleTeacherSelect = (event) => {
    const selectedId = event.target.value;
    const selectedTeacherInfo = teachers.find(
      (teacher) => teacher.teacher_id == selectedId
    );
    // console.log(selectedTeacherInfo)
    // console.log(teachers)
    // console.log(selectedId)

    setSelectedTeacher({
      id: selectedId,
      teacher_name: selectedTeacherInfo ? selectedTeacherInfo.teacher_name : "",
    });
  };

  const handleFormSubmit = () => {
    setModalOpen(false);
  };

  // console.log(teachers)

  let linkTo = `${subtitle.path_tema}/examen-subiect-all?theme=${subtitle.tema_id}&level=1&disciplina=${subject_id}`;

  if (teachers.length === 1) {
    linkTo = `${subtitle.path_tema}/examen-subiect-all?teacher=${teachers[0].teacher_id}&theme=${subtitle.tema_id}&level=1&disciplina=${subject_id}&teachername=${teachers[0].teacher_name}`;
  }
  console.log(linkTo)

  const handleTemaClick = () => {
    const teacher = teachers[0].teacher_id;
    const student_id = localStorage.getItem('auth_role') == 'student' ? currentStudent : 1;
    const theme = subtitle.tema_id;
    const level_id = 1;

    fetchTheme(teacher, theme, subject_id, level_id, dispatch, student_id);
  };

  return (
    <li key={idx}>
      <div className="subtopic-header">
        <span className="num"></span>
        <h4>
          {teachers.length > 1 ? (
            <Link
              to={(location) => ({ ...location })}
              onClick={handleLinkClick}
            >
              {subtitle.tema_name}
            </Link>
          ) : (
            <Link to={linkTo} onClick={handleTemaClick}>{subtitle.tema_name}</Link>
          )}
        </h4>
      </div>
      <ProgressBar proc={subtitle.tema_media} />

      {teachers.length > 1 && isModalOpen && (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          className="Modal"
          overlayClassName="Modal__Overlay"
          contentLabel="Example Modal"
        >
          <form className="form-group custom-form">
            <div className="form-group m-3">
              <label>Alege profesorul care a pregatit tema dată:</label>
              <select
                onChange={handleTeacherSelect}
                value={selectedTeacher.id}
                className="form-control"
              >
                {teachers.map((teacher) => (
                  <option key={teacher.teacher_id} value={teacher.teacher_id}>
                    {teacher.teacher_name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleFormSubmit}
              type="button"
              className="btnBts btn-outline-secondary mx-auto d-block"
            >
              {/* {console.log(`${subtitle.path_tema}?teacher=${selectedTeacher}&theme=${subtitle.tema_id}&level=1&disciplina=${subject_id}`)} */}
              <Link
                to={`${subtitle.path_tema}?teacher=${selectedTeacher.id}&theme=${subtitle.tema_id}&level=1&disciplina=${subject_id}&teachername=${selectedTeacher.teacher_name}`}
              >
                Confirmă
              </Link>
            </button>
            <button
              className="btn-close-modal"
              onClick={handleModalClose}
            ></button>
          </form>
        </ReactModal>
      )}
    </li>
  );
};

export default SubTopicItem_beta;