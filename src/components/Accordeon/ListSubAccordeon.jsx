import { useState } from "react";
import ItemAccordeon from "./ItemAccordeon";
import ItemList from "./ItemList";
import ItemText from "./ItemText";
import ItemTable from "./ItemTable";
import SimpleSlider from "../Slider/SimpleSlider";
import Audio from "../Audio";
import ProgressSteps from "../ProgressSteps/ProgressSteps";

const ListSubAccordeon = (props) => {
  const [currentSubject, setCurrentSubject] = useState(0);

  const classes = " " + props.className;
  // let arraySubject = props.teme[0].subtitles[0].subjects[0].vomAfla;
  // let arrayTests = props.teme[0].subtitles[0].subjects[0].teste;
  let arraySubject = props.subtema.vomAfla;
  let arrayTests = props.subtema.teste;
  console.log(props.subtema);
  const clickSubjectHandler = (idx) => {
    setCurrentSubject(idx);
  };

  if (!arraySubject || !arrayTests) {
    return null; // Возвращаем null или другой компонент-заглушку
  }
  return (
    <div className={classes}>
      <ItemAccordeon titlu="La aceasta lectie vom afla:" {...props} open={true}>
        <ItemList {...props} list={arraySubject} />
      </ItemAccordeon>
      <ItemAccordeon
        titlu="Studiaza interactiv"
        {...props}
        className="blockPB50" open={true}
      >
        <SimpleSlider {...props} images={arraySubject[currentSubject].images} />
        <Audio path={arraySubject[currentSubject].audio} />
        <ProgressSteps list={arraySubject} onClick={clickSubjectHandler} />
      </ItemAccordeon>
      {arraySubject?.map((subj) => (
        <ItemAccordeon titlu={subj.name} {...props} key={subj.id} open={false}>
          <ItemText {...props}>{subj.raspuns}</ItemText>
        </ItemAccordeon>
      ))}
      <ItemAccordeon titlu="Evaluare (teste)" {...props} open={true}>
        <ItemTable {...props} list={arrayTests} />
      </ItemAccordeon>
    </div>
  );
};
export default ListSubAccordeon;
