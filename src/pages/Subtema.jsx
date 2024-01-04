import React, { useState, useEffect } from "react";
import axios from "axios";
import ContextData from "../components/context/ContextData";
import { useParams, useHistory, useLocation } from "react-router-dom";
// import temeIstoriArray from "../data/temeIstoria";
// import temeMatemArray from "../data/temeMatem";
// import temeRomanaArray from "../data/temeRomana";
import Navbar from "../components/layouts/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import Wrapper from "../components/Wrapper";
import TitleBox from "../components/TitleBox";
import ListSubAccordeon from "../components/Accordeon/ListSubAccordeon";
import StateData from "../components/context/StateData";

const Subtema = ({results})  => {
  const {stateData, dispatchData} = React.useContext(ContextData)
  const { address1, disciplina } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const teacherVideo = searchParams.get('teacher');

  const [item, setItem] = useState(null);
  const [topic, setTopic] = useState(null);
  const history = useHistory();
  let subElement = null;

  const temaCurrenta = stateData.topics;
  const parts = stateData.currentTheme.path_tema.split("/");
  const subject_id = stateData.currentSubject.subject_id;
  const tema_id = stateData.currentTheme.tema_id;
   
  useEffect(() => {
    // console.log(stateData.topics)
    const addressToFind = "/"+address1;
    const mainElement = temaCurrenta?.find(element => element.path === addressToFind);
// console.log(temaCurrenta)
// console.log(mainElement)
// console.log(address1)
     dispatchData({
      type: "UPDATE_CURRENT_TOPIC",
      payload: mainElement
    });

    const addressDisciplina = "/" + parts[1];
    const addressSubtitle = "/" + parts.slice(2).join("/");

    const addressPath = `/${disciplina}${addressSubtitle}${mainElement.path}?teacher=${teacherVideo}&level=1&disciplina=${subject_id}&theme=${tema_id}`;
    const newBreadcrumb = {name: mainElement.name, path: addressPath};
    dispatchData({
      type: "UPDATE_SUBTOPIC_BREADCRUMB",
      payload: newBreadcrumb
    });
    setTopic(mainElement);
  }, []);

  const handleProgressTopicRecorded = (updatedTopicProgress) => {
    if (topic !== null) {
      setTopic(prevTopic => ({
        ...prevTopic,
        procentTopic: updatedTopicProgress
      }));
    }
  };

  return (
    <div>
      <Navbar />
      <Wrapper>
        {topic &&
        (
          <>
            <Breadcrumb step={2} />
            <TitleBox className="teme-container" proc={topic.procentTopic}>{topic.name}</TitleBox>
            <ListSubAccordeon onProgressTopicRecorded={handleProgressTopicRecorded}/>
          </>
        )
        }
      </Wrapper>
    </div>
  );
 };


export default Subtema;
