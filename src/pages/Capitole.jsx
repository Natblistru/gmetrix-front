import axios from "axios";
import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

// import temeMatem from '../data/temeMatem';
import Breadcrumb from "../components/Breadcrumb";
import Titlu from "../components/Titlu";
import Wrapper from "../components/Wrapper";
import TitleBox from '../components/TitleBox';
import TopicsList from '../components/TopicsList';
import Card from '../components/Card';
import '../index.css';

const Capitole = (props) => {
  console.log("Parametrul id:", props.match.params.id); //parametru din adresa /:id
  //***DUPĂ DEPLOY
  const { id } = useParams();
  const [capitole,setCapitole] = useState([]);
  const [denumireDisciplina,setDenumireDisciplina] = useState("");
  const [nivelStudiu,setNivelStudiu] = useState("");
  const [clasa,setClasa] = useState("");
  const [year,setYear] = useState("");
  const [proc,setProc] = useState(0);

    useEffect(()=> {
      console.log(id);
        fetchTodos();
    },[]);

    const fetchTodos = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/capitoleDisciplina?level=1&disciplina=${id}&student=1`);
            console.log(res.data);
            //***DUPĂ DEPLOY
            setCapitole(res.data);
            if (res.data.length > 0) {
              // Accesează denumirea subiectului din primul element al array-ului
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
    console.log(capitole);
    
    return (
        <Wrapper className="large">
            <Breadcrumb list={[{name: "Discipline", path: "/"}]}/>
            <Card>
                <Titlu className="titlu-card">{denumireDisciplina} - pregătire pentru {nivelStudiu} ({year})</Titlu>
                <TitleBox className="teme-container" proc={proc}>{clasa}</TitleBox>
                <TopicsList teme={capitole}/>
            </Card>
        </Wrapper>
    )
}
export default Capitole;