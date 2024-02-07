import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import ContextData from "../components/context/ContextData";
import AOS from "aos";

// import temeMatem from '../data/temeMatem';
import Navbar from "../components/layouts/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import Titlu from "../components/Titlu";
import Wrapper from "../components/Wrapper";
import TitleBox from "../components/TitleBox";
import TopicsList from "../components/TopicsList";
import Card from "../components/Card";
import { fetchCapitole } from "../routes/api";
import "../index.css";

const Capitole = (props) => {
  const { stateData, dispatchData } = React.useContext(ContextData);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subject_id = id;
        const level_id = 1;

        const res = await fetchCapitole(subject_id, level_id, dispatchData);
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
        dispatchData({
          type: "FETCH_THEME_VIDEO",
          payload: null,
        });

        // console.log(stateData.capitole);

        if (stateData.capitole.length > 0) {
          dispatchData({
            type: "UPDATE_CURRENT_SUBJECT",
            payload: stateData.capitole[0],
          });

          const newBreadcrumb = {
            name: `${stateData.capitole[0].subject_name}`,
            path: `/capitole/${id}?level=1&year=2022&name=${name}&nivel=${nivel}&clasa=${clasa}`,
          };

          dispatchData({
            type: "UPDATE_SUBJECT_BREADCRUMB",
            payload: newBreadcrumb,
          });

          setProc(stateData.capitole[0].disciplina_media);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCurrentData();
  }, [stateData.capitole, id, name, nivel, clasa]);

  const updateBreadcrumb = () => {
    const newBreadcrumb = {name: "Discipline", path: "/"};
    dispatchData({
      type: "ADD_BREADCRUMB",
      payload: newBreadcrumb
    });
  };

  useEffect(() => {
    console.log(stateData.breadcrumb)
    // updateBreadcrumb();
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
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
          {stateData.currentSubject !== null && <TopicsList />}
        </Card>
      </Wrapper>
    </>
  );
};
export default Capitole;
