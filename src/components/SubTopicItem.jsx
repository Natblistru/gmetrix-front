import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import axios from 'axios'; 
import ReactModal from 'react-modal';
import ProgressBar from "./ProgressBar";

const SubTopicItem = ({subTit,idx, teachers, results,tests,exams, allTems}) => {
  const subtitle = subTit;
// console.log(teachers)
  const [isModalOpen, setModalOpen] = useState(false);
  const currentSubject = useSelector(state => state.currentSubject);

  const subject_id = currentSubject.subject_id || currentSubject.currentSubject.subject_id;

  const [selectedTeacher, setSelectedTeacher] = useState({
    id: teachers && teachers[0] ? teachers[0].teacher_id : '',
    teacher_name: teachers && teachers[0] ? teachers[0].teacher_name : ''
  });

  useEffect(() => {
    if (teachers && teachers.length > 0) {
      setSelectedTeacher({
        id: teachers[0].teacher_id,
        teacher_name: teachers[0].teacher_name
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
    const selectedTeacherInfo = teachers.find(teacher => teacher.teacher_id == selectedId);
  // console.log(selectedTeacherInfo)
  // console.log(teachers)
  // console.log(selectedId)

    setSelectedTeacher({
      id: selectedId,
      teacher_name: selectedTeacherInfo ? selectedTeacherInfo.teacher_name : ''
    });
  };

  const handleFormSubmit = () => {
    setModalOpen(false);
  };

  
  // console.log(teachers)

  let linkTo = `${subtitle.path_tema}?theme=${subtitle.tema_id}&level=1&disciplina=${subject_id}`;

  if (teachers.length === 1) {
    linkTo = `${subtitle.path_tema}?teacher=${teachers[0].teacher_id}&theme=${subtitle.tema_id}&level=1&disciplina=${subject_id}&teachername=${teachers[0].teacher_name}`;
  }

  return (
    <li key={idx}>
      <div className="subtopic-header">
        <span className="num"></span>
        <h4>
        {teachers.length > 1 ? (
            <Link to={location => ({ ...location })} onClick={handleLinkClick}>
              {subtitle.tema_name}
            </Link>
          ) : (
            <Link to={linkTo}>
              {subtitle.tema_name}
            </Link>
          )}
        </h4>
      </div>
      <ProgressBar proc={subtitle.tema_media} />

      {teachers.length > 1 && isModalOpen && (
        <ReactModal isOpen={isModalOpen} onRequestClose={handleModalClose} className="Modal" overlayClassName="Modal__Overlay" contentLabel="Example Modal">
          <form className="form-group custom-form">
          <div className="form-group m-3">
            <label>Alege profesorul care a pregatit tema dată:</label>
            <select onChange={handleTeacherSelect} value={selectedTeacher.id} className="form-control">
            {teachers.map((teacher) => (
              <option key={teacher.teacher_id} value={teacher.teacher_id}>{teacher.teacher_name}</option>
            ))}
            </select>
          </div>
          <button onClick={handleFormSubmit} type="button" className="btnBts btn-outline-secondary mx-auto d-block">
            {/* {console.log(`${subtitle.path_tema}?teacher=${selectedTeacher}&theme=${subtitle.tema_id}&level=1&disciplina=${subject_id}`)} */}
            <Link
              to={`${subtitle.path_tema}?teacher=${selectedTeacher.id}&theme=${subtitle.tema_id}&level=1&disciplina=${subject_id}&teachername=${selectedTeacher.teacher_name}`}
            >
              Confirmă
            </Link>
          </button>
          <button className="btn-close-modal" onClick={handleModalClose}></button>
        </form>
      </ReactModal>
      )}
    </li>
  );
};
const reduxState = (state) => ({
  results: state.results,
  tests: state.tests,
  exams: state.exams
});
export default connect(reduxState, null)(SubTopicItem);
