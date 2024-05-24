import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateSubTopicBreadcrumb, updateCurrentTopic  } from '../components/ReduxComp/actions';
import { Link } from "react-router-dom";

import { useParams, useHistory, useLocation } from "react-router-dom";
// import temeIstoriArray from "../data/temeIstoria";
// import temeMatemArray from "../data/temeMatem";
// import temeRomanaArray from "../data/temeRomana";
import Navbar from "../components/layouts/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import Wrapper from "../components/Wrapper";
import TitleBox from "../components/beta/TitleBox_beta";
import ListSubAccordeon from "../components/beta/ListSubAccordeon_beta";

const Subtema = ()  => {
  const dispatch = useDispatch();
  const { address1, disciplina } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const teacherVideo = searchParams.get('teacher');
  const [item, setItem] = useState(null);
  const [topic, setTopic] = useState(null);

  const [linkToEvaluari, setLinkToEvaluari] = useState("");
  const [linkToMemo, setLinkToMemo] = useState("");
  const [linkToTests, setLinkToTests] = useState("");

  const history = useHistory();
  let subElement = null;
  const currentThemeObject = useSelector(state => state.currentTheme);
  const currentTheme = currentThemeObject.currentTheme || JSON.parse(localStorage.getItem('currentTheme'));

  const currentSubject = useSelector(state => state.currentSubject);
  const topics = useSelector(state => state.topics);
// console.log(topics)

  const subject_id = currentSubject.subject_id || currentSubject.currentSubject.subject_id;

  useEffect(() => {
    const temaCurrenta = topics;
    const parts = currentTheme?.path_tema.split("/");
    const tema_id = currentTheme?.tema_id;


    if (temaCurrenta && subject_id && tema_id) {
      const addressToFind = "/" + address1;
      const mainElement = temaCurrenta.find(element => element.path === addressToFind);
      // console.log(mainElement)
      // console.log(address1)
      // console.log(disciplina)

      if (mainElement) {
        dispatch(updateCurrentTopic(mainElement));

        const addressDisciplina = "/" + parts[1];
        const addressSubtitle = "/" + parts.slice(2).join("/");

        // console.log(addressDisciplina)
        // console.log(addressSubtitle)

        setLinkToEvaluari(`${addressDisciplina}${addressSubtitle}/examen-subiect-all?teacher=1&theme=${tema_id}&level=1&disciplina=${subject_id}`);

        const addressPath = `/${disciplina}${addressSubtitle}${mainElement.path}?teacher=${teacherVideo}&level=1&disciplina=${subject_id}&theme=${tema_id}`;
        const newBreadcrumb = { name: mainElement.name, path: addressPath };
        dispatch(updateSubTopicBreadcrumb(newBreadcrumb));
        setTopic(mainElement);
        
        setLinkToMemo(`${addressDisciplina}${addressSubtitle}${mainElement.path}/memo?teacher=1&theme=${tema_id}&level=1&disciplina=${subject_id}`);
        setLinkToTests(`${addressDisciplina}${addressSubtitle}${mainElement.path}${mainElement.tests[0].addressTest}/1?teacher=1&theme=${tema_id}&level=1&disciplina=${subject_id}`);
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
  // console.log(topic)
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
            <div className="nav-container d-flex align-items-center justify-content-center">
              <div className="d-flex align-items-center justify-content-center">
                <button className="btn">
                  <Link className="small" to={linkToMemo}>CARDURI PENTRU MEMORARE</Link>
                </button>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <button className="btn">
                  <Link className="small" to={linkToTests}>TESTEAZĂ CUNOȘTINȚELE</Link>
                </button>
              </div>
            </div>
          </>
        )
        }
      </Wrapper>
    </div>
  );
 };


export default Subtema;
