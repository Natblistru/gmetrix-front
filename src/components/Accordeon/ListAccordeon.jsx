import React, { useEffect, useRef } from 'react';
import { withRouter, Link } from "react-router-dom";
import '../../index.css';
import ParentComponent from "../Modal/ParentComponent";
import VideoLesson from '../VideoLesson';
import VideoBreakpoints from '../VideoBreakpoints';
import ItemAccordeon from "./ItemAccordeon";
import ItemList from "./ItemList";
import { scroller } from 'react-scroll';

const ListAccordeon = (props) => {
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

  const classes = " " + props.className;
  let titleList = props.teme.subjects;
  let repereList = props.teme.repere;
  let aplicatiiList = props.teme.aplicatii;
  let termeniList = props.teme.termeni;
  let diagramData = props.teme.diagramData;

  let breakpoints = [
    {"time":"0:17:40","seconds":"1060","name":"Repere"},
    {"time":"0:17:54","seconds":"1074","name":"Keywords"},
    {"time":"0:19:11","seconds":"1151","name":"1914-1916"},
    {"time":"0:20:31","seconds":"1231","name":"Dilema Ramâniei"},
    {"time":"0:22:04","seconds":"1324","name":"Aderarea României la Tripla Alianță"},
    {"time":"0:23:42","seconds":"1422","name":"Politica de neutralitate"},
    {"time":"0:24:21","seconds":"1461","name":"Aderarea României la Antanta (1916)"},
    {"time":"0:24:53","seconds":"1493","name":"Victoria de la Turtucaia (1916)"},
    {"time":"0:25:29","seconds":"1529","name":"Lupte la Mărăști, Mărășești, Oituz"},
    {"time":"0:26:52","seconds":"1612","name":"Pacea de la București 1918"},
    {"time":"0:28:36","seconds":"1716","name":"Actul Unirii"}
  ];

  return (
    <div className={classes}>
      <ItemAccordeon titlu="Teorie" {...props} open={true}>
        <ItemList {...props} list={titleList} />
      </ItemAccordeon>


      <ItemAccordeon titlu="Lecție video" {...props} /*className="schema-recapitulativa"*/ open={true}>
        <VideoLesson video="https://www.youtube.com/embed/qV2PSgIK-c4" title="România în Primul Război Mondial" breakpoints={breakpoints} />
      </ItemAccordeon>

      <div id="ani"></div>
      <ItemAccordeon titlu="Repere cronoligice" {...props} open={true}>
        <ItemList {...props} list={repereList} />
        <Link to={{ pathname: props.teme.addressDisciplina + props.teme.address+"/flipCards/ani", state: { list: repereList, anchor: "ani", item: props.teme } }} className="custom-link">Exerseaza</Link>
        {/* <Link to={{ pathname: props.teme.addressDisciplina + props.teme.address+"/flipCards", state: { list: termeniList, anchor: "termeni", item: props.teme} }} className="custom-link">Exerseaza</Link>      */}
      </ItemAccordeon>
      <div id="termeni"></div>
      <ItemAccordeon titlu="Termeni-cheie" {...props} open={true}>
        {/* {console.log(props.teme.addressDisciplina + props.teme.address)} */}
        <ItemList {...props} list={termeniList} />
        <Link to={{ pathname: props.teme.addressDisciplina + props.teme.address+"/flipCards/termeni", state: { list: termeniList, anchor: "termeni", item: props.teme} }} className="custom-link">Exerseaza</Link>
      </ItemAccordeon>
      <ItemAccordeon titlu="Aplicații (teste de examen)" {...props} open={true}>
        <ItemList {...props} list={aplicatiiList} />
      </ItemAccordeon>
    </div>
  );
};
export default withRouter(ListAccordeon);
