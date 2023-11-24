import React from "react"
import axios from "axios";
import {useState, useEffect} from "react";

import ListDiscipline from "../components/ListDiscipline";
import Titlu from "../components/Titlu";
import Wrapper from "../components/Wrapper";
import ContextData from "../components/context/ContextData";

const Home = () => {
  const {dispatchData} = React.useContext(ContextData)

  useEffect(()=> {
    fetchSubjects();
  },[]);
  const fetchSubjects = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/disciplineani?year=2022");
      console.log(res.data);
      dispatchData({
        type: "FETCH_DISCIPLINE",
        payload: res.data
      })
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Wrapper>
      <Titlu>Disciplinele de absolvire a cursului gimnazial</Titlu>
      <ListDiscipline/>
    </Wrapper>
  );
};
export default Home;
