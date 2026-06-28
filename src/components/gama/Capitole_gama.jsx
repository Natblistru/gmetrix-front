import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSubjectBreadcrumb,
  fetchThemeVideoSuccess,
  fetchThemePresentationSuccess,
  updateCurrentSubject,
  fetchCurrentTestsSuccess, 
  fetchCurrentIndexTest } from "../ReduxComp/actions";

import { fetchCapitole, fetchSummativeTests, fetchAllTeacherTestsSuccess } from "../../routes/api";
import AOS from "aos";

import Navbar from "../layouts/Navbar";
import Breadcrumb from "../Breadcrumb";
import Titlu from "../Titlu";
import Wrapper from "../Wrapper";
import TitleBox from "../TitleBox";
import Card from "../Card";
import { FaLock } from "react-icons/fa";

const Capitole_gama = (props) => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const year = searchParams.get("year");
  const name = searchParams.get("name");
  const nivel = searchParams.get("nivel");
  const clasa = searchParams.get("clasa");
  const [programId, setProgramId] = useState(1);

  const [loading, setLoading] = useState(true);
  const [proc, setProc] = useState(0);

  const capitole = useSelector((state) => state.capitole);
  const currentStudentObject = useSelector((state) => state.currentStudent);
  const currentStudent = currentStudentObject
    ? currentStudentObject.currentStudent
    : 1;

    const currentStudentId = localStorage.getItem("auth_roleId");
    const redirectPath = currentStudentId ? "/examen-final/1" : "/login";

  const student_id =
    localStorage.getItem("auth_role") === "student" ? currentStudent : 1;
  const currentSubject = useSelector(state => state.currentSubject);

  useEffect(() => {
    const pid = currentSubject?.currentSubject?.program_id;
    if (pid) setProgramId(pid);
  }, [currentSubject]);


  const lectiiFixe = [
    "Lecția 1: Introducere în baza de date",
    "Lecția 2: Model relațional",
    "Lecția 3: Selectarea datelor",
    "Lecția 4: Agregarea datelor",
    "Lecția 5: Combinarea datelor",
    "Lecția 6: Proiectarea BD, crearea tabelelor",
    "Lecția 7: Normalizarea BD, modificarea tabelelor",
    "Lecția 8: Modificarea datelor - INSERT, UPDATE, DELETE",
    "Lecția 9: Indecșii",
    "Lecția 10: Vederi",
    "Lecția 11: Proceduri și funcții",
    "Lecția 12: Utilizatorii SQL",
    "Lecția 13: Backup și restaurare",
    "Lecția 14: Securitatea datelor",
  ];

  const accesMateriale = (lectie) => {
    alert(`${lectie}: accesul la materiale este blocat până la achitare.`);
  };

  const cereConsultatie = (lectie) => {
    alert(`Ai solicitat consultație pentru ${lectie}.`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subject_id = id;
        const level_id = 1;

        await fetchCapitole(subject_id, level_id, dispatch, student_id);

        setLoading(false);
        AOS.refresh();
      } catch (error) {
        console.error("Eroare la preluarea datelor:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, dispatch, student_id]);

  useEffect(() => {
    const fetchCurrentData = async () => {
      try {
        dispatch(fetchThemeVideoSuccess([]));
        dispatch(fetchThemePresentationSuccess([]));

        if (capitole.length > 0) {
          dispatch(updateCurrentSubject(capitole[0]));

          const newBreadcrumb = {
            name: `${capitole[0].subject_name}`,
            path: `/capitole_gama/${id}?level=1&year=2022&name=${name}&nivel=${nivel}&clasa=${clasa}`,
          };

          dispatch(updateSubjectBreadcrumb(newBreadcrumb));
          setProc(capitole[0].disciplina_media);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCurrentData();
  }, [capitole, id, name, nivel, clasa, dispatch]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const subject_id = id;
          const level_id = 1;

          const res = await fetchCapitole(subject_id, level_id, dispatch, student_id);
  //        const tests = await fetchSummativeTests(subject_id, level_id, dispatch);
          fetchTest();
          setLoading(false);
          AOS.refresh();
        } catch (error) {
          console.error("Eroare la preluarea datelor:", error);
          setLoading(false);
        }
      };
      
      fetchData();
    }, [id]);

  useEffect(() => {
    fetchAllTeacherTests();
    fetchTest();
  }, []);

  const fetchTest = async () => {
    let indexSubject;
    if (id == 2) indexSubject = 1
    else if(id == 1) indexSubject = 3
    else if(id == 3) indexSubject = 2
    else indexSubject = id;
    console.log(id)
    console.log(currentSubject?.currentSubject?.program_id)
    try {
        const res = await axios.get('/api/summativetest_exam');
        console.log(res.data);
        dispatch(fetchCurrentTestsSuccess(res.data));
        dispatch(fetchCurrentIndexTest(indexSubject-1));
    } catch (err) {
        console.error(err);
    }
  }

  const fetchAllTeacherTests = async () => {
    try {
      const res = await fetchAllTeacherTestsSuccess(0, currentStudent, dispatch, name);
    } catch (error) {
      console.error("Eroare la preluarea datelor:", error);
    }
  };



  return (
    <>
      {loading && <div className="edica-loader"></div>}

      <Navbar />

      <Wrapper className="large">
        <Breadcrumb step={0} />

        <Card>
          <Titlu className="titlu-card">
            {name} - pregătire pentru Examen
          </Titlu>

          <TitleBox className="teme-container" proc={proc}>
            Temele disciplinei {name}
          </TitleBox>

          <div className="lectii-fixe-container">
            {lectiiFixe.map((lectie, index) => (
              <div className="lectie-fixa-item" key={index}>
                <div className="lectie-fixa-title">
                  <span className="lectie-numar">{index + 1}.</span>
                  <span>{lectie}</span>
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
                    Solicită consultație
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Link to={redirectPath} style={{ color: "white" }}>
          <Card className="titlu titlu-card title-examen">Examen final</Card>
        </Link>
      </Wrapper>
    </>
  );
};

export default Capitole_gama;
