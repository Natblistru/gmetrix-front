import React, { useState, useEffect } from "react";
import ContextData from "../context/ContextData";
import { scroller } from 'react-scroll'
import ItemAccordeon from "./ItemAccordeon";
import ItemList from "./ItemList";
import ItemText from "./ItemText";
import ItemTable from "./ItemTable";
import SimpleSlider from "../Slider/SimpleSlider";
import Audio from "../AudioPlayer";
import ProgressSteps from "../ProgressSteps/ProgressSteps";
import FlipCardNou from "../FlipCards/FlipCardNou";
import '../FlipCards/flipCardNou.scss';

const ListSubAccordeon = (props) => {
const {stateData, dispatchData} = React.useContext(ContextData)
const [currentSubject, setCurrentSubject] = useState(0);

const classes = " " + props.className;
let arraySubject = props.subtema.vomAfla;
let arrayTests = props.subtema.teste;

useEffect(()=> {

// console.log(stateData.currentTopic)

},[]);

const clickSubjectHandler = (idx) => {
  setCurrentSubject(idx);
};

const handleItemClick = (idx) => {
  setCurrentSubject(idx);

  scroller.scrollTo('video', {
    duration: 800,
    delay: 0,
    smooth: 'easeInOutQuart'
  });
};
  if (!arraySubject || !arrayTests) {
    return null; // Возвращаем null или другой компонент-заглушку
  }

  return (
    <div className={classes}>
      <ItemAccordeon titlu="La aceasta lectie vom afla:" {...props} open={true}>

        <ItemList {...props} list={arraySubject} onItemClick={handleItemClick}/>
      </ItemAccordeon>
      <ItemAccordeon
        titlu="Studiaza prin scheme"
        {...props}
        className="blockPB50" open={true}
        name="video"
      > 
        <div id="video">
          <SimpleSlider {...props} images={arraySubject[currentSubject].images} />
          <Audio path={arraySubject[currentSubject].audio} currentSubject={currentSubject} subjectID={props.subtema.id} arrayAudioLength={arraySubject.length}/>
          <ProgressSteps list={arraySubject} onClick={clickSubjectHandler} activeCircle={currentSubject+1}/>
        </div>
      </ItemAccordeon>
      <ItemAccordeon titlu="Repetă cu cartele-flip" {...props} open={true}>
      <div className="Cards">
        {arraySubject.map((subject, subjectIndex) => (
          subject.raspuns.map((line, lineIndex) => (
            <FlipCardNou title={line.sarcina} key={lineIndex} dangerousHTML={line.rezolvare}/>
          ))
        ))}
      </div>
      </ItemAccordeon>
      <ItemAccordeon titlu="Evaluare (teste)" {...props} open={true}>
        <ItemTable {...props} list={arrayTests} />
      </ItemAccordeon>
    </div>
  );
};

export default ListSubAccordeon;
