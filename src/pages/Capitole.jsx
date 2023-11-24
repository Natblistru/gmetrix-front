import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import ContextData from "../components/context/ContextData";

// import temeMatem from '../data/temeMatem';
import Breadcrumb from "../components/Breadcrumb";
import Titlu from "../components/Titlu";
import Wrapper from "../components/Wrapper";
import TitleBox from '../components/TitleBox';
import TopicsList from '../components/TopicsList';
import Card from '../components/Card';
import '../index.css';

const Capitole = (props) => {
  const {stateData, dispatchData} = React.useContext(ContextData)
  console.log("Parametrul id:", props.match.params.id); //parametru din adresa /:id
  const { id } = useParams();
  const [denumireDisciplina,setDenumireDisciplina] = useState("");
  const [nivelStudiu,setNivelStudiu] = useState("");
  const [clasa,setClasa] = useState("");
  const [year,setYear] = useState("");
  const [proc,setProc] = useState(0);

    useEffect(()=> {
      console.log(id);
        updateLevel(id);
        fetchCapitole();
    },[]);

    const updateLevel = (id) => {
        dispatchData({
          type: "UPDATE_CURRENT_SUBJECT",
          payload: id
        });
      };

    const fetchCapitole = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/capitoleDisciplina?level=1&disciplina=${id}&student=1`);

            console.log(res.data);
            dispatchData({
                type: "FETCH_CAPITOLE",
                payload: res.data
            })
            if (res.data.length > 0) {
                dispatchData({
                    type: "UPDATE_SUBJECTNAME",
                    payload: res.data[0].subject_name
                })
                dispatchData({
                    type: "UPDATE_CURRENT_SUBJECT",
                    payload: res.data[0].subject_id
                })
                const newBreadcrumb = {name: `${res.data[0].subject_name}`, path: `/capitole/${id}?level=1&year=2022`};
                dispatchData({
                  type: "UPDATE_SUBJECT_BREADCRUMB",
                  payload: newBreadcrumb
                });
                setDenumireDisciplina(res.data[0].subject_name);
                setNivelStudiu(res.data[0].study_level_id==1?"examen clasa 9":"BAC");
                setClasa(res.data[0].study_level_id==1?"clasa 9":"clasa 12");
                setYear(res.data[0].year);
                setProc(res.data[0].disciplina_media);
          }
        } catch (err) {
            console.error(err);
        }
    }
    
    return (
        <Wrapper className="large">
            <Breadcrumb step={0}/>
            <Card>
                <Titlu className="titlu-card">{denumireDisciplina} - pregătire pentru {nivelStudiu} ({year})</Titlu>
                <TitleBox className="teme-container" proc={proc}>{clasa}</TitleBox>
                <TopicsList />
            </Card>
        </Wrapper>
    )
}
export default Capitole;