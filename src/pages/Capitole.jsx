import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSubjectBreadcrumb,
  fetchThemeVideoSuccess,
  fetchThemePresentationSuccess,
  updateCurrentSubject,
  fetchCurrentTestsSuccess, 
  fetchCurrentIndexTest } from "../components/ReduxComp/actions";
import AOS from "aos";

// import temeMatem from '../data/temeMatem';
import Navbar from "../components/layouts/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import Titlu from "../components/Titlu";
import Wrapper from "../components/Wrapper";
import TitleBox from "../components/TitleBox";
import TopicsList from "../components/TopicsList";
import Card from "../components/Card";
import { fetchCapitole, fetchSummativeTests, fetchAllTeacherTestsSuccess } from "../routes/api";
import "../index.css";

const Capitole = (props) => {
  const dispatch = useDispatch();
  //   console.log("Parametrul id:", props.match.params.id); //parametru din adresa /:id
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const year = searchParams.get("year");
  const name = searchParams.get("name");
  const nivel = searchParams.get("nivel");
  const clasa = searchParams.get("clasa");

  const [loading, setLoading] = useState(true);

  const [proc, setProc] = useState(0);
  const capitole = useSelector((state) => state.capitole);
  const currentSubject = useSelector(state => state.currentSubject);
  const currentStudentObject = useSelector(state => state.currentStudent);
  const currentStudent = currentStudentObject ? currentStudentObject.currentStudent : 1;  

  const currentSubject_name = currentSubject.currentSubject.subject_name.toLowerCase();

  const student_id = localStorage.getItem('auth_role') == 'student' ? currentStudent : 1;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const subject_id = id;
        const level_id = 1;

        const res = await fetchCapitole(subject_id, level_id, dispatch, student_id);
        const tests = await fetchSummativeTests(subject_id, level_id, dispatch);
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
    const fetchCurrentData = async () => {
      try {
        dispatch(fetchThemeVideoSuccess([]));
        dispatch(fetchThemePresentationSuccess([]));

        if (capitole.length > 0) {
          dispatch(updateCurrentSubject(capitole[0]));

          const newBreadcrumb = {
            name: `${capitole[0].subject_name}`,
            path: `/capitole/${id}?level=1&year=2022&name=${name}&nivel=${nivel}&clasa=${clasa}`,
          };
          dispatch(updateSubjectBreadcrumb(newBreadcrumb));

          setProc(capitole[0].disciplina_media);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCurrentData();
  }, [capitole, id, name, nivel, clasa]);

  useEffect(() => {
    fetchAllTeacherTests();
    fetchTest();
  }, []);

  const fetchTest = async () => {

    try {
        const res = await axios.get(`/api/summativetest_exam`);
        console.log(res.data);
        dispatch(fetchCurrentTestsSuccess(res.data));
        dispatch(fetchCurrentIndexTest(0));
    } catch (err) {
        console.error(err);
    }
  }

  const fetchAllTeacherTests = async () => {
    try {
      const res = await fetchAllTeacherTestsSuccess(0, currentStudent, dispatch);
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
            {/* {name} - pregătire pentru {nivel} ({year}) */}
            {name} - pregătire pentru BAC (2024)
          </Titlu>
          <TitleBox className="teme-container" proc={proc}>
            {name}
          </TitleBox>
          {currentSubject !== null && <TopicsList />}
        </Card>
        
        <Link to="/examen-final/1" style={{color: 'white'}}>
        <Card className="titlu titlu-card title-examen">Examen final</Card>
         
        </Link>
      </Wrapper>
    </>
  );
};
export default Capitole;
