import React, { useEffect, useRef } from 'react';
import { withRouter, Link } from "react-router-dom";
import '../../index.css';
import ParentComponent from "../Modal/ParentComponent";
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
  let titleList = props.teme[0].subtitles[0].subjects;
  let repereList = props.teme[0].subtitles[0].repere;
  let aplicatiiList = props.teme[0].subtitles[0].aplicatii;
  let termeniList = props.teme[0].subtitles[0].termeni;
  let diagramData = props.teme[0].subtitles[0].diagramData;

  return (
    <div className={classes}>
      <ItemAccordeon titlu="Teorie" {...props} >
        <ItemList {...props} list={titleList} />
      </ItemAccordeon>
      <ItemAccordeon titlu="Schemă recapitulativă" {...props} className="schema-recapitulativa">
         <ParentComponent className="subjects-container" list={diagramData}/>
        {/* <DiagramTable className="subjects-container" list={diagramData}/> */}
      </ItemAccordeon>
      <div id="ani"></div>
      <ItemAccordeon titlu="Repere cronoligice" {...props} >
        <ItemList {...props} list={repereList} />
        <Link to={{ pathname: "/flipCards", state: { list: repereList, anchor: "ani" } }} className="custom-link">Exerseaza</Link>
      </ItemAccordeon>
      <div id="termeni"></div>
      <ItemAccordeon titlu="Termeni-cheie" {...props} >
        <ItemList {...props} list={termeniList} />
        <Link to={{ pathname: "/flipCards", state: { list: termeniList, anchor: "termeni" } }} className="custom-link">Exerseaza</Link>
      </ItemAccordeon>
      <ItemAccordeon titlu="Aplicații (teste de examen)" {...props} >
        <ItemList {...props} list={aplicatiiList} />
      </ItemAccordeon>
    </div>
  );
};
export default withRouter(ListAccordeon);
