import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSubjectBreadcrumb,
  fetchThemeVideoSuccess,
  fetchThemePresentationSuccess,
  updateCurrentSubject,
} from "../ReduxComp/actions";
import AOS from "aos";

// import temeMatem from '../data/temeMatem';
import Navbar from "../layouts/Navbar";
import Breadcrumb from "../Breadcrumb";
import Titlu from "../Titlu";
import Wrapper from "../Wrapper";
import TitleBox from "../TitleBox";
import TopicsList from "./TopicsList_beta";
import Card from "../Card";
import { fetchCapitole } from "../../routes/api";


const Capitole_beta = (props) => {
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

  const student_id = localStorage.getItem('auth_role') == 'student' ? currentStudent : 1;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const subject_id = id;
        const level_id = 1;

        const res = await fetchCapitole(subject_id, level_id, dispatch, student_id);
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
    // console.log(stateData.breadcrumb)
    // updateBreadcrumb();
    // const handleBeforeUnload = (event) => {
    //   event.preventDefault();
    //   event.returnValue = "";
    // };
    // window.addEventListener("beforeunload", handleBeforeUnload);
    // return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <>
      {loading && <div className="edica-loader"></div>}
      <Navbar />
      <Wrapper className="large">
        <Breadcrumb step={0} />
        <Card>
          <Titlu className="titlu-card">
            {name} - pregătire pentru {nivel} ({year})
          </Titlu>
          <TitleBox className="teme-container" proc={proc}>
            {clasa}
          </TitleBox>
          {currentSubject !== null && <TopicsList />}
        </Card>
      </Wrapper>
    </>
  );
};
export default Capitole_beta;
