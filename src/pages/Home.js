import React from "react"
import axios from "axios";
import {useState, useEffect} from "react";


import ListDiscipline from "../components/ListDiscipline";
import Titlu from "../components/Titlu";
import Wrapper from "../components/Wrapper";
import ContextData from "../components/context/ContextData";
import Navbar from "../components/layouts/Navbar";
import Banner from "../components/Banner";

const Home = () => {
  const {dispatchData} = React.useContext(ContextData)

  useEffect(()=> {
    updateBreadcrumb();
    fetchSubjects();
    fetchSubtitleTeachers();
  },[]);

  const updateBreadcrumb = () => {
    const newBreadcrumb = {name: "Discipline", path: "/"};
    dispatchData({
      type: "ADD_BREADCRUMB",
      payload: newBreadcrumb
    });
  };

  const fetchSubjects = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/disciplineani?year=2022");
      // console.log(res.data);
      dispatchData({
        type: "FETCH_DISCIPLINE",
        payload: res.data
      })
    } catch (err) {
      console.error(err);
    }
  }

  const fetchSubtitleTeachers = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/teachers-with-themes`);
      // console.log(res.data);
      dispatchData({
        type: "FETCH_SUBTITLE_TEACHERS",
        payload: res.data.groupedTeacherThemes
      })
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ background: `linear-gradient(to left, #2a1a3e, #4a3851, #5d4781)` }}>
    <Navbar />
    <Banner/>
    <Wrapper className="skill">
      <Titlu>Disciplinele de absolvire a cursului gimnazial</Titlu>
      <ListDiscipline/>
    </Wrapper>
    </div>

  );
};
export default Home;
