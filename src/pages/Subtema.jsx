import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateSubTopicBreadcrumb, updateCurrentTopic  } from '../components/ReduxComp/actions';

import { useParams, useHistory, useLocation } from "react-router-dom";
// import temeIstoriArray from "../data/temeIstoria";
// import temeMatemArray from "../data/temeMatem";
// import temeRomanaArray from "../data/temeRomana";
import Navbar from "../components/layouts/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import Wrapper from "../components/Wrapper";
import TitleBox from "../components/TitleBox";
import ListSubAccordeon from "../components/Accordeon/ListSubAccordeon";

const Subtema = ()  => {
  const dispatch = useDispatch();
  const { address1, disciplina } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const teacherVideo = searchParams.get('teacher');
  const [item, setItem] = useState(null);
  const [topic, setTopic] = useState(null);
  const history = useHistory();
  let subElement = null;
  const currentThemeObject = useSelector(state => state.currentTheme);
  const currentTheme = currentThemeObject.currentTheme || JSON.parse(localStorage.getItem('currentTheme'));

  const currentSubject = useSelector(state => state.currentSubject);
  const topics = useSelector(state => state.topics);
console.log(topics)

  const subject_id = currentSubject.subject_id || currentSubject.currentSubject.subject_id;

  useEffect(() => {
    const temaCurrenta = topics;
    const parts = currentTheme?.path_tema.split("/");
    const tema_id = currentTheme?.tema_id;


    if (temaCurrenta && subject_id && tema_id) {
      const addressToFind = "/" + address1;
      const mainElement = temaCurrenta.find(element => element.path === addressToFind);

      if (mainElement) {
        dispatch(updateCurrentTopic(mainElement));

        const addressDisciplina = "/" + parts[1];
        const addressSubtitle = "/" + parts.slice(2).join("/");

        const addressPath = `/${disciplina}${addressSubtitle}${mainElement.path}?teacher=${teacherVideo}&level=1&disciplina=${subject_id}&theme=${tema_id}`;
        const newBreadcrumb = { name: mainElement.name, path: addressPath };
        dispatch(updateSubTopicBreadcrumb(newBreadcrumb));
        setTopic(mainElement);
      }
    }

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);

  }, [topics, currentTheme, currentSubject, address1, disciplina, teacherVideo]);


  const handleProgressTopicRecorded = (updatedTopicProgress) => {
    if (topic !== null) {
      setTopic(prevTopic => ({
        ...prevTopic,
        procentTopic: updatedTopicProgress
      }));
    }
  };
  console.log(topic)
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
