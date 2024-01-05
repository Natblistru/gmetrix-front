import React from "react";
import ContextData from "../components/context/ContextData";
import axios from "axios";

import { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import Wrapper from "../components/Wrapper";
import TitleBox from "../components/TitleBox";
import ListAccordeon from "../components/Accordeon/ListAccordeon";
import { fetchTheme } from "../routes/api"
import "../index.css";

const Tema = () => {

  const {stateData, dispatchData} = React.useContext(ContextData)
  const { address, disciplina } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const teacherVideo = searchParams.get('teacher');
 
  const [temaObject, setTemaObject] = useState(null);
  const [item, setItem] = useState(null);
  const [proc, setProc] = useState(0);
  const history = useHistory();
  let theme;
  let teacher;
  useEffect(() => {
    if (!stateData.currentSubject) {
      return;
    }
  
    const searchParams = new URLSearchParams(location.search);
    teacher = searchParams.get("teacher");
 
    theme = searchParams.get("theme");

    const subject_id = stateData.currentSubject.subject_id;
    const level_id = 1;

    fetchTheme(teacher, theme, subject_id, level_id, dispatchData);
    fetchThemeVideo(theme);
    fetchEvaluations(theme);
    fetchEvaluation1(theme);
    fetchEvaluation2(theme);
    fetchEvaluation3(theme);
console.log("FETCH THEME")
    const pathToFind = `/${disciplina}/${address}`;

    const tema = stateData.capitole.reduce(
      (result, item) => result || (item.subtitles || []).find(subtitle => subtitle.path_tema === pathToFind),
      null
    );
    setTemaObject(tema);

    setProc(tema? tema.tema_media : 0)

    if (tema!=null) {
      dispatchData({
        type: "UPDATE_CURRENT_THEME",
        payload: tema
      })

      const temaName = tema.tema_name;
      const temaid = tema.tema_id;

      const addressPath = `/${disciplina}/${address}?teacher=${teacherVideo}&level=1&disciplina=${stateData.currentSubject.subject_id}&theme=${temaid}`;
      const newBreadcrumb = {name: temaName, path: addressPath};
      dispatchData({
        type: "UPDATE_TOPIC_BREADCRUMB",
        payload: newBreadcrumb
      });
    }
  },[stateData.currentSubject, location.search]);

const fetchThemeVideo = async (theme) => {
  try {
      const res = await axios.get(`http://localhost:8000/api/teacherthemevideo?level=1&disciplina=${stateData.currentSubject.subject_id}&teacher=${teacherVideo}&theme=${theme}`);

      // console.log(res.data);
      dispatchData({
          type: "FETCH_THEME_VIDEO",
          payload: res.data
      })
   } catch (err) {
      console.error(err);
  }
}

const fetchEvaluations = async (theme) => {
  try {
     const res = await axios.get(`http://localhost:8000/api/themeevaluations?level=1&disciplina=${stateData.currentSubject.subject_id}&theme=${theme}`);

      dispatchData({
          type: "FETCH_EVALUATIONS",
          payload: res.data
      })
  } catch (err) {
      console.error(err);
  }
}

const fetchEvaluation1 = async (theme) => {
  try {

      const res = await axios.get(`http://localhost:8000/api/themeevaluation1?level=1&disciplina=${stateData.currentSubject.subject_id}&theme=${theme}`);
      dispatchData({
          type: "FETCH_EVALUATIONS_1",
          payload: res.data
      })
  } catch (err) {
      console.error(err);
  }
}

const fetchEvaluation2 = async (theme) => {
  try {

      const res = await axios.get(`http://localhost:8000/api/themeevaluation2?level=1&disciplina=${stateData.currentSubject.subject_id}&theme=${theme}`);

      dispatchData({
          type: "FETCH_EVALUATIONS_2",
          payload: res.data
      })
  } catch (err) {
      console.error(err);
  }
}

const fetchEvaluation3 = async (theme) => {
  try {

      const res = await axios.get(`http://localhost:8000/api/themeevaluation3?level=1&disciplina=${stateData.currentSubject.subject_id}&theme=${theme}`);
      dispatchData({
          type: "FETCH_EVALUATIONS_3",
          payload: res.data
      })
  } catch (err) {
      console.error(err);
  }
}

  const handleProgressThemaRecorded = (updatedThemaProgress) => {
    if(temaObject)
      setProc(updatedThemaProgress);
  };

  return (
    <>
      <Navbar />
      <Wrapper>
        {temaObject && (
          <>
            <Breadcrumb step={1}/>
            <TitleBox className="teme-container" proc={proc}>{temaObject.tema_name}</TitleBox>
            <ListAccordeon onProgressThemaRecorded={handleProgressThemaRecorded}/>
          </>
        )}
      </Wrapper>
    </>
  );
};
export default Tema;
