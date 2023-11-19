import axios from "axios";
import {useState, useEffect} from "react";

import ListDiscipline from "../components/ListDiscipline";
import Titlu from "../components/Titlu";
import Wrapper from "../components/Wrapper";
import discipline from "../data/discipline";

const Home = () => {
  const [chapters,setChapters] = useState([]);
  useEffect(()=> {
    fetchChapters();
  },[]);
  const fetchChapters = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/subject_study_levels");
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Wrapper>
      <Titlu>Disciplinele de absolvire a cursului gimnazial</Titlu>
      <ListDiscipline list={discipline} />
    </Wrapper>
  );
};
export default Home;
