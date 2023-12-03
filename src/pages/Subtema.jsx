import React, { useState, useEffect } from "react";
import axios from "axios";
import ContextData from "../components/context/ContextData";
import { useParams, useHistory } from "react-router-dom";
import temeIstoriArray from "../data/temeIstoria";
import temeMatemArray from "../data/temeMatem";
import temeRomanaArray from "../data/temeRomana";
import Breadcrumb from "../components/Breadcrumb";
import Wrapper from "../components/Wrapper";
import TitleBox from "../components/TitleBox";
import ListSubAccordeon from "../components/Accordeon/ListSubAccordeon";
import StateData from "../components/context/StateData";

const Subtema = ({results})  => {
  const {stateData, dispatchData} = React.useContext(ContextData)
  const { address1, disciplina } = useParams();
  const [item, setItem] = useState(null);
  const [topic, setTopic] = useState(null);
  // console.log("address1", address1);
  // console.log(stateData.currentSubject.subject_name == "Limba română"); 
  const history = useHistory();
  let subElement = null;

  // useEffect(()=> {
  //   const temaCurrenta = stateData.topics;
  //   console.log(temaCurrenta)
  // },[]);





  // dispatchData({
  //   type: "UPDATE_CURRENT_TOPIC",
  //   payload: subElement
  // });


  const disciplinaNume = stateData.currentSubject.subject_name;
  let teme;
  if(disciplinaNume == "Istoria") {
    teme = temeIstoriArray;
  } else if(disciplinaNume == "Matematica") {
    teme = temeMatemArray;    
  } else if(disciplinaNume == "Limba română") {
    teme = temeRomanaArray;    
  }

  function findObjectWithAddress(obj) {
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        const found = findObjectWithAddress(obj[key]);
        if (found) {
          return found;
        }
      } else if (key === "addressSubject" && obj[key] === "/" + address1) {
        return obj;
      }
    }
    return null;
  }

  useEffect(() => {
    const temaCurrenta = stateData.topics;
    console.log(temaCurrenta)
    const addressToFind = "/"+address1;
    // console.log(addressToFind)
    const mainElement = temaCurrenta?.find(element => element.path === addressToFind);
    // console.log(mainElement)
    // if (mainElement && mainElement.subtitles && mainElement.subtitles.length > 0) {
    //   subElement = mainElement.subtitles.find(sub => sub.path === "/"+address1);
    //   console.log(subElement);
    // }
    dispatchData({
      type: "UPDATE_CURRENT_TOPIC",
      payload: mainElement
    });

    console.log(mainElement);
    setTopic(mainElement);

    fetchTest()

    const foundItem = findObjectWithAddress(teme);
    if (foundItem) {
      setItem(foundItem);
    } else {
      history.push("/error");
    }
  }, []);

  const fetchTest = async (theme) => {
    try {
  
        const res = await axios.get(`http://localhost:8000/api/formativetest?topic=15`);
  
        console.log(res.data);
        dispatchData({
            type: "FETCH_CURRENT_TESTS",
            payload: res.data
        })
    } catch (err) {
        console.error(err);
    }
  }

  return (
    <Wrapper>
      {topic && 
      (
        <>
          <Breadcrumb step={2} />
          <TitleBox className="teme-container" proc={topic.procentTopic}>{topic.name}</TitleBox>
          <ListSubAccordeon teme={teme} subtema={item}/>
        </>
      )
      }
    </Wrapper>
  );
  // return (
  //   <Wrapper>


  //       <>
  //         <Breadcrumb step={2} />
  //         <TitleBox className="teme-container" subjectId={subElement.id}>{subElement.name}</TitleBox>
  //         <ListSubAccordeon teme={teme} subtema={subElement}/>
  //       </>


  //   </Wrapper>
  // );
};


export default Subtema;
