import ItemAccordeon from "./ItemAccordeon";
import ItemList from "./ItemList";
import ItemText from "./ItemText";

const ListSubAccordeon = (props) => {
const classes = " " + props.className;
let arraySubject = props.teme[0].subtitles[0].subjects[0].vomAfla;
return <div className={classes}>
            <ItemAccordeon titlu="La aceasta lectie vom afla:" {...props}>
               <ItemList {...props} list={arraySubject}/>
            </ItemAccordeon>
            <ItemAccordeon titlu="Studiaza interactiv" {...props}>
               <ItemText {...props}/>
            </ItemAccordeon>
            {
               arraySubject?.map(subj => (
                  <ItemAccordeon titlu={subj.name} {...props} key={subj.id}>
                     <ItemText {...props}/>
                  </ItemAccordeon>
               ))
            }
            <ItemAccordeon titlu="Evaluare (teste)" {...props}>
               <ItemText {...props}/>
            </ItemAccordeon>
       </div>;
};
export default ListSubAccordeon;