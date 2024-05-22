import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addBreadcrumb,
  fetchDiscipline,
  fetchSubtitleTeachers,
} from "../components/ReduxComp/actions";
import "aos/dist/aos.css";
import AOS from "aos";

import ListDiscipline from "../components/ListDiscipline";
import Titlu from "../components/Titlu";
import Wrapper from "../components/Wrapper";
import Navbar from "../components/layouts/Navbar";
import Banner from "../components/Banner";
import Projects from "../components/Projects";
import { Contact } from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    updateBreadcrumb();
    fetchSubjects();
    fetchInitialSubtitleTeachers();
  }, []);

  const updateBreadcrumb = () => {
    const newBreadcrumb = { name: "Discipline", path: "/" };
    dispatch(addBreadcrumb(newBreadcrumb));
  };

  const fetchSubjects = async () => {
    try {
      const res = await axios.get(
        "/api/disciplineani?year=2022"
      );
      dispatch(fetchDiscipline(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchInitialSubtitleTeachers = async () => {
    try {
      const res = await axios.get(
        `/api/teachers-with-themes`
      );
      dispatch(fetchSubtitleTeachers(res.data.groupedTeacherThemes));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        background: `linear-gradient(to left, #2a1a3e, #4a3851, #5d4781)`,
      }}
    >
      <Navbar />
      <Banner />
      <Wrapper className="skill">
        <Titlu>Disciplinele de absolvire a cursului gimnazial</Titlu>
        <ListDiscipline />
      </Wrapper>
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};
export default Home;
