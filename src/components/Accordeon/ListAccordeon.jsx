import React, { useState, useEffect, useRef } from 'react';

import ContextData from '../context/ContextData';
import { withRouter, Link } from "react-router-dom";
import '../../index.css';
import ParentComponent from "../Modal/ParentComponent";
import VideoLesson from '../VideoLesson';
import VideoBreakpoints from '../VideoBreakpoints';
import ItemAccordeon from "./ItemAccordeon";
import ItemList from "./ItemList";
import { scroller } from 'react-scroll';

const ListAccordeon = (props) => {
  const {stateData, dispatchData} = React.useContext(ContextData)

  const [videoBreakpoints, setVideoBreakpoints] = useState();
  const [videoSource, setVideoSource] = useState("");
  const [videoTitle, setVideoTitle] = useState("");

  const classes = " " + props.className;
  let titleList = stateData.topics;

  useEffect(() => {
    if (props.onProgressThemaRecorded) {
      if(stateData.topics.length > 0) {
        props.onProgressThemaRecorded(stateData.topics[0].procentTema);
      }
    }
  },[stateData.topics])

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
  let aplicatiiListBD = stateData.evaluations;
  // let termeniList = props.teme.termeni;
  // let diagramData = props.teme.diagramData;

  // console.log(stateData.topics); 
  // console.log(aplicatiiList); 

  useEffect(() => {
    // console.log(stateData.themeVideo); 

    if (stateData.themeVideo && stateData.themeVideo.length > 0) {
      setVideoBreakpoints(stateData.themeVideo[0].breakpoints);
      setVideoSource(stateData.themeVideo[0].video_source);
      setVideoTitle(stateData.themeVideo[0].video_title);
    }
  }, [stateData.themeVideo]);

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




// <div id="ani"></div>
//<ItemAccordeon titlu="Repere cronoligice" {...props} open={true}>
//  <ItemList {...props} list={repereList} />
//  <Link to={{ pathname: props.teme.addressDisciplina + props.teme.address+"/flipCards/ani", state: { list: repereList, anchor: "ani", item: props.teme } }} className="custom-link">Exerseaza</Link>
//  {/* <Link to={{ pathname: props.teme.addressDisciplina + props.teme.address+"/flipCards", state: { list: termeniList, anchor: "termeni", item: props.teme} }} className="custom-link">Exerseaza</Link>      */}
//</ItemAccordeon>
//<div id="termeni"></div>
//<ItemAccordeon titlu="Termeni-cheie" {...props} open={true}>
//  {/* {console.log(props.teme.addressDisciplina + props.teme.address)} */}
//  <ItemList {...props} list={termeniList} />
//  <Link to={{ pathname: props.teme.addressDisciplina + props.teme.address+"/flipCards/termeni", state: { list: termeniList, anchor: "termeni", item: props.teme} }} className="custom-link">Exerseaza</Link>
//</ItemAccordeon> 
