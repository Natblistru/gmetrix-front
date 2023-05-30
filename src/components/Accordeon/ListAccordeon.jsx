// import DiagramTable from "../DiagramTable";
import ParentComponent from "../Modal/ParentComponent";
import ItemAccordeon from "./ItemAccordeon";
import ItemList from "./ItemList";

const ListAccordeon = (props) => {
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
      <ItemAccordeon titlu="Schemă recapitulativă" {...props} >
         <ParentComponent className="subjects-container" list={diagramData}/>
        {/* <DiagramTable className="subjects-container" list={diagramData}/> */}
      </ItemAccordeon>
      <ItemAccordeon titlu="Repere cronoligice" {...props} >
        <ItemList {...props} list={repereList} />
      </ItemAccordeon>
      <ItemAccordeon titlu="Termeni-cheie" {...props} >
        <ItemList {...props} list={termeniList} />
      </ItemAccordeon>
      <ItemAccordeon titlu="Aplicații (teste de examen)" {...props} >
        <ItemList {...props} list={aplicatiiList} />
      </ItemAccordeon>
    </div>
  );
};
export default ListAccordeon;
