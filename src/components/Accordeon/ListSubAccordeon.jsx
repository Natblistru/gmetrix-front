import ItemAccordeon from "./ItemAccordeon";
import ItemList from "./ItemList";
import ItemText from "./ItemText";
import SimpleSlider from "../SimpleSlider";
import Audio from "../Audio";

const ListSubAccordeon = (props) => {
  const classes = " " + props.className;
  let arraySubject = props.teme[0].subtitles[0].subjects[0].vomAfla;
  let arrayTests = props.teme[0].subtitles[0].subjects[0].teste;
  return (
    <div className={classes}>
      <ItemAccordeon titlu="La aceasta lectie vom afla:" {...props}>
        <ItemList {...props} list={arraySubject} />
      </ItemAccordeon>
      <ItemAccordeon titlu="Studiaza interactiv" {...props}>
        <SimpleSlider {...props} />
        <Audio />
      </ItemAccordeon>
      {arraySubject?.map((subj) => (
        <ItemAccordeon titlu={subj.name} {...props} key={subj.id}>
          <ItemText {...props}>{subj.raspuns}</ItemText>
        </ItemAccordeon>
      ))}
      <ItemAccordeon titlu="Evaluare (teste)" {...props}>
      <ItemList {...props} list={arrayTests} />
      </ItemAccordeon>
    </div>
  );
};
export default ListSubAccordeon;
