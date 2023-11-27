import React from "react";
import ContextData from "../components/context/ContextData";
import axios from "axios";

import { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import temeIstoriArray from "../data/temeIstoria";
import temeMatemArray from "../data/temeMatem";
import temeRomanaArray from "../data/temeRomana";
import Breadcrumb from "../components/Breadcrumb";
import Wrapper from "../components/Wrapper";
import TitleBox from "../components/TitleBox";
import ListAccordeon from "../components/Accordeon/ListAccordeon";
import "../index.css";

const Tema = () => {
  const {stateData, dispatchData} = React.useContext(ContextData)
  const { address, disciplina } = useParams();
  const location = useLocation();
  console.log(address);
  console.log(disciplina); 

  const [item, setItem] = useState(null);
  const [proc, setProc] = useState(0);
  // const [theme,setTheme] = useState(null);
//  console.log(disciplina);
  const history = useHistory();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    // setTheme(searchParams.get("theme"));
    const teacher = searchParams.get("teacher");

    // console.log("Parametrul theme:", theme);
    console.log("Parametrul teacher:", teacher);
  }, [location.search]);
  
  useEffect(()=> {
    const searchParams = new URLSearchParams(location.search);
    const theme = searchParams.get("theme");
    // setTheme(theme);
    const teacher = searchParams.get("teacher");

    console.log("Parametrul theme:", theme);
    console.log("Parametrul teacher:", teacher);
    fetchTheme(theme);
    fetchThemeVideo(theme);

    const pathToFind = `/${disciplina}/${address}`;
    const foundElement = stateData.capitole.find(element => element.path_tema === pathToFind);
    // const tema = foundElement ? foundElement : null;

    const tema = stateData.capitole.reduce(
      (result, item) => result || (item.subtitles || []).find(subtitle => subtitle.path_tema === pathToFind),
      null
    );
    
    console.log(tema);
    setProc(tema? tema.tema_media : 0)

    dispatchData({
      type: "UPDATE_CURRENT_THEME",
      payload: tema
    })
    const temaName = tema ? tema.tema_name : "";
    console.log(tema);
    console.log(pathToFind);
    console.log(stateData.capitole);

    const addressPath = `/${disciplina}/${address}?teacher=1&level=1&disciplina=${stateData.currentSubject.subject_id}&theme=${tema.tema_id}`;
    const newBreadcrumb = {name: temaName, path: addressPath};
    dispatchData({
      type: "UPDATE_TOPIC_BREADCRUMB",
      payload: newBreadcrumb
    });
  },[]);


  const fetchTheme = async (theme) => {
    try {
        const res = await axios.get(`http://localhost:8000/api/teachertheme?level=1&disciplina=${stateData.currentSubject.subject_id}&teacher=1&student=1&theme=${theme}`);

        console.log("Parametrul disciplina(currentSubject):", stateData.currentSubject);
        console.log("Parametrul theme:", theme);
        console.log(res.data);
        dispatchData({
            type: "FETCH_TOPICS",
            payload: res.data
        })
      //   if (res.data.length > 0) {
      //       dispatchData({
      //           type: "UPDATE_SUBJECTNAME",
      //           payload: res.data[0].subject_name
      //       })
      //       const newBreadcrumb = {name: `${res.data[0].subject_name}`, path: `/capitole/${id}?level=1&year=2022`};
      //       dispatchData({
      //         type: "UPDATE_SUBJECT_BREADCRUMB",
      //         payload: newBreadcrumb
      //       });
      // }
    } catch (err) {
        console.error(err);
    }
}

const fetchThemeVideo = async (theme) => {
  try {
      const res = await axios.get(`http://localhost:8000/api/teacherthemevideo?level=1&disciplina=${stateData.currentSubject.subject_id}&teacher=1&theme=${theme}`);

      console.log(res.data);
      dispatchData({
          type: "FETCH_THEME_VIDEO",
          payload: res.data
      })
    //   if (res.data.length > 0) {
    //       dispatchData({
    //           type: "UPDATE_SUBJECTNAME",
    //           payload: res.data[0].subject_name
    //       })
    //       const newBreadcrumb = {name: `${res.data[0].subject_name}`, path: `/capitole/${id}?level=1&year=2022`};
    //       dispatchData({
    //         type: "UPDATE_SUBJECT_BREADCRUMB",
    //         payload: newBreadcrumb
    //       });
    // }
  } catch (err) {
      console.error(err);
  }
}




  let teme;
  if(disciplina == "istoria") {
    teme = temeIstoriArray;
  } else if(disciplina == "matem") {
    teme = temeMatemArray;    
  } else if(disciplina == "romana") {
    teme = temeRomanaArray;    
  }
  console.log(stateData.topics);

  function findObjectWithAddress(obj) {
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        const found = findObjectWithAddress(obj[key]);
        if (found) {
          return found;
        }
      } else if (key === "address" && obj[key] === "/" + address) {
        return obj;
      }
    }
    return null;
  }

  useEffect(() => {
    // addBreadcrumb();
    const foundItem = findObjectWithAddress(teme);
    if (foundItem) {
      setItem(foundItem);
    } else {
      history.push("/error");
    }
  }, []);



  return (
    <Wrapper>
      {item && (
        <>
          <Breadcrumb step={1}/>
          <TitleBox className="teme-container" proc={proc} subtitleId={item.id} teme={teme}>{item.name}</TitleBox>
          <ListAccordeon teme={item} />
        </>
      )}
    </Wrapper>
  );
};
export default Tema;
