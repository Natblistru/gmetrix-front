import { useState } from "react";
import { scroller } from 'react-scroll'
import ItemAccordeon from "./ItemAccordeon";
import ItemList from "./ItemList";
import ItemText from "./ItemText";
import ItemTable from "./ItemTable";
import SimpleSlider from "../Slider/SimpleSlider";
import Audio from "../AudioPlayer";
import ProgressSteps from "../ProgressSteps/ProgressSteps";

const ListSubAccordeon = (props) => {
const [currentSubject, setCurrentSubject] = useState(0);

const classes = " " + props.className;
let arraySubject = props.subtema.vomAfla;
let arrayTests = props.subtema.teste;

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
        titlu="Studiaza interactiv"
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
      {arraySubject?.map((subj) => (
        <ItemAccordeon titlu={subj.name} {...props} key={subj.id} open={false}>
          {subj.raspuns.split('\n').map((line, index) => (
            <ItemText {...props} key={index} className="text-raspuns">{line}</ItemText>
          ))}
        </ItemAccordeon>
      ))}
      <ItemAccordeon titlu="Evaluare (teste)" {...props} open={true}>
        <ItemTable {...props} list={arrayTests} />
      </ItemAccordeon>
    </div>
  );
};

export default ListSubAccordeon;
