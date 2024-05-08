import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  updateTopicBreadcrumb,
  updateCurrentTheme,
  fetchThemeVideoSuccess,
  fetchThemeVideoFailure,
  fetchEvaluationsSuccess,
  fetchThemePresentationSuccess,
  fetchThemePresentationFailure,
} from "../components/ReduxComp/actions";

import axios from "axios";

import { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import Wrapper from "../components/Wrapper";
import TitleBox from "../components/beta/TitleBox_beta";
import ListAccordeon from "../components/Accordeon/ListAccordeon";
import {
  fetchTheme,
  fetchEvaluation1,
  fetchEvaluation2,
  fetchEvaluation3,
} from "../routes/api";
import "../index.css";

const Tema = () => {
  const dispatch = useDispatch();
  const { address, disciplina } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const teacherVideo = searchParams.get("teacher");

  const [temaObject, setTemaObject] = useState(null);
  const [item, setItem] = useState(null);
  const [proc, setProc] = useState(0);

  const [linkTo, setLinkTo] = useState("");
  const history = useHistory();
  let theme;
  let teacher;
  const capitole = useSelector((state) => state.capitole);
  const currentSubject = useSelector(state => state.currentSubject);

  const subject_id = currentSubject.subject_id || currentSubject.currentSubject.subject_id;

  const currentStudentObject = useSelector(state => state.currentStudent);
  const currentStudent = currentStudentObject ? currentStudentObject.currentStudent : 1; 

  const student_id = localStorage.getItem('auth_role') == 'student' ? currentStudent : 1;

  useEffect(() => {
    if (!currentSubject) {
      return;
    }
    const searchParams = new URLSearchParams(location.search);
    teacher = searchParams.get("teacher");

    theme = searchParams.get("theme");

    const level_id = 1;

    fetchTheme(teacher, theme, subject_id, level_id, dispatch, student_id);
    fetchEvaluations(theme);
    fetchEvaluation1(theme, subject_id, level_id, dispatch);
    fetchEvaluation2(theme, subject_id, level_id, dispatch);
    fetchEvaluation3(theme, subject_id, level_id, dispatch);
    // console.log("FETCH THEME")
    const pathToFind = `/${disciplina}/${address}`;

    const tema = capitole.reduce(
      (result, item) =>
        result ||
        (item.subtitles || []).find(
          (subtitle) => subtitle.path_tema === pathToFind
        ),
      null
    );
    setLinkTo(`${pathToFind}/examen-subiect-all?teacher=1&theme=${theme}&level=1&disciplina=${subject_id}`);
    setTemaObject(tema);

    setProc(tema ? tema.tema_media : 0);

    if (tema != null) {
      dispatch(updateCurrentTheme(tema));

      const temaName = tema.tema_name;
      const temaid = tema.tema_id;
      const addressPath = `/${disciplina}/${address}?teacher=${teacherVideo}&level=1&disciplina=${subject_id}&theme=${temaid}`;
      const newBreadcrumb = { name: temaName, path: addressPath };
      dispatch(updateTopicBreadcrumb(newBreadcrumb));
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/teacherthemevideo?level=1&disciplina=${subject_id}&teacher=${teacherVideo}&theme=${theme}`
        );
        dispatch(fetchThemeVideoSuccess(res.data));
      } catch (err) {
        console.error(err);
        dispatch(fetchThemeVideoFailure());
      }

      try {
        const res = await axios.get(
          `http://localhost:8000/api/teacherThemePresentation?level=1&disciplina=${subject_id}&teacher=${teacherVideo}&theme=${theme}`
        );
        dispatch(fetchThemePresentationSuccess(res.data));
      } catch (err) {
        console.error(err);
        dispatch(fetchThemePresentationFailure());
      }
    };
    fetchData();
  }, [currentSubject, location.search]);

  const fetchEvaluations = async (theme) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/themeevaluations?level=1&disciplina=${subject_id}&theme=${theme}`
      );
      dispatch(fetchEvaluationsSuccess(res.data));
      // console.log(res.data)
    } catch (err) {
      console.error(err);
    }
  };

  const handleProgressThemaRecorded = (updatedThemaProgress) => {
    if (temaObject) setProc(updatedThemaProgress);
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <>
      <Navbar />
      <Wrapper>
        {temaObject && (
          <>
            <Breadcrumb step={1} />
            <TitleBox className="teme-container" proc={proc}>
              {temaObject.tema_name}
            </TitleBox>
            <ListAccordeon
              onProgressThemaRecorded={handleProgressThemaRecorded}
            />
            <div className="nav-container d-flex align-items-center justify-content-center">
              <div className="d-flex align-items-center justify-content-center">
                <button className="btn">
                  <Link className="small" to={linkTo}>PRACTICĂ EVALUARILE</Link>
                </button>
              </div>
            </div>
            
          </>
        )}
      </Wrapper>
    </>
  );
};
export default Tema;
