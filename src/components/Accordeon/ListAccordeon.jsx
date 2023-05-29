import ItemAccordeon from "./ItemAccordeon";
import ItemList from "./ItemList";
import ItemText from "./ItemText";

const ListAccordeon = (props) => {
const classes = " " + props.className;
return <div className={classes}>
            <ItemAccordeon titlu="Teorie" {...props}>
               <ItemList {...props} list={props.teme[0].subtitles[0].subjects}/>
            </ItemAccordeon>
            <ItemAccordeon titlu="Schemă recapitulativă" {...props}>
               <ItemText {...props}/>
            </ItemAccordeon>
            <ItemAccordeon titlu="Repere cronoligice" {...props}>
               <ItemText {...props}/>
            </ItemAccordeon>
            <ItemAccordeon titlu="Termeni-cheie" {...props}>
               <ItemText {...props}/>
            </ItemAccordeon>
            <ItemAccordeon titlu="Aplicații (teste de examen)" {...props}>
               <ItemText {...props}/>
            </ItemAccordeon>
       </div>;
};
export default ListAccordeon;