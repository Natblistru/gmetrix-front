import React, { useState, useEffect, useRef } from 'react';

import { withRouter, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import '../../index.css';
import VideoLesson from '../VideoLesson';
import ItemAccordeon from "./ItemAccordeon";
import ItemList from "./ItemList";
import { scroller } from 'react-scroll';

const ListAccordeon = (props) => {
  const [videoBreakpoints, setVideoBreakpoints] = useState();
  const [videoSource, setVideoSource] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const themeVideo = useSelector(state => state.themeVideo);
  const aplicatiiListBD = useSelector(state => state.evaluations);
  const topics = useSelector(state => state.topics);

  const classes = " " + props.className;
  let titleList = topics;

  useEffect(() => {
    if (props.onProgressThemaRecorded) {
      if(topics.length > 0) {
        props.onProgressThemaRecorded(topics[0].procentTema);
      }
    }
  },[topics])

  useEffect(() => {
    if (props.location.hash === '#ani') {
        scroller.scrollTo('ani', {
          smooth: true,
          duration: 500,
        });
    } else if (props.location.hash === '#termeni') {
      scroller.scrollTo('termeni', {
        smooth: true,
        duration: 500,
      });
  }
  }, [props.location.hash]);


  
  // let repereList = props.teme.repere;
  // let aplicatiiList = props.teme.aplicatii;
  // let aplicatiiListBD = stateData.evaluations;

  // console.log(aplicatiiListBD)
  // let termeniList = props.teme.termeni;
  // let diagramData = props.teme.diagramData;

  // console.log(topics); 
  // console.log(aplicatiiList); 

  useEffect(() => {
    // console.log(themeVideo); 

    if (themeVideo && themeVideo.length > 0) {
      // console.log(themeVideo[0].breakpoints)
      setVideoBreakpoints(themeVideo[0].breakpoints);
      setVideoSource(themeVideo[0].video_source);
      setVideoTitle(themeVideo[0].video_title);
    }
  }, [themeVideo]);

  return (
    <div className={classes}>
      <ItemAccordeon titlu="Teorie" {...props} open={true}>
        <ItemList list={titleList} type={"topic"}/>
      </ItemAccordeon>

      {videoBreakpoints && (
        <>
        <ItemAccordeon titlu="Lecție video" {...props} /*className="schema-recapitulativa"*/ open={true}>
          <VideoLesson video= {videoSource} title={videoTitle} breakpoints={videoBreakpoints} />
        </ItemAccordeon>
        </>
      )}

      <ItemAccordeon titlu="Itemii examenului de absolvire (conform temei)" {...props} open={true}>
        <ItemList {...props} list={aplicatiiListBD} type={"exam"}/>
      </ItemAccordeon>
    </div>
  );
};
export default withRouter(ListAccordeon);