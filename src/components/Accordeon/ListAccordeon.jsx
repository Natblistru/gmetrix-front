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
  let titleList = props.teme.subjects;
  let repereList = props.teme.repere;
  let aplicatiiList = props.teme.aplicatii;
  let termeniList = props.teme.termeni;
  let diagramData = props.teme.diagramData;

  return (
    <div className={classes}>
      <ItemAccordeon titlu="Teorie" {...props} open={true}>
        <ItemList {...props} list={titleList} />
      </ItemAccordeon>
      <ItemAccordeon titlu="Schemă recapitulativă" {...props} className="schema-recapitulativa" open={true}>
         <ParentComponent className="subjects-container" list={diagramData}/>
        {/* <DiagramTable className="subjects-container" list={diagramData}/> */}
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
