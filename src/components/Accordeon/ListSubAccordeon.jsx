import { useState } from "react";
import ItemAccordeon from "./ItemAccordeon";
import ItemList from "./ItemList";
import ItemText from "./ItemText";
import SimpleSlider from "../Slider/SimpleSlider";
import Audio from "../Audio";
import ProgressSteps from "../ProgressSteps/ProgressSteps";

const ListSubAccordeon = (props) => {
  const [currentSubject, setCurrentSubject]= useState(0);

  const classes = " " + props.className;
  let arraySubject = props.teme[0].subtitles[0].subjects[0].vomAfla;
  let arrayTests = props.teme[0].subtitles[0].subjects[0].teste;

  const clickSubjectHandler = (idx) => {
    setCurrentSubject(idx);
  }
  return (
    <div className={classes}>
      <ItemAccordeon titlu="La aceasta lectie vom afla:" {...props} >
        <ItemList {...props} list={arraySubject} />
      </ItemAccordeon>
      <ItemAccordeon titlu="Studiaza interactiv" {...props} className="blockPB50">
        <SimpleSlider {...props} images={arraySubject[currentSubject].images} />
        <Audio path={arraySubject[currentSubject].audio}/>
        <ProgressSteps list={arraySubject} onClick={clickSubjectHandler}/>
      </ItemAccordeon>
      {arraySubject?.map((subj) => (
        <ItemAccordeon titlu={subj.name} {...props} key={subj.id} >
          <ItemText {...props}>{subj.raspuns}</ItemText>
        </ItemAccordeon>
      ))}
      <ItemAccordeon titlu="Evaluare (teste)" {...props} >
      <ItemList {...props} list={arrayTests} />
      </ItemAccordeon>
    </div>
  );
};
export default ListSubAccordeon;
