import '../index.css';

const Titlu = (props) => {
const classes = "titlu " + props.className;        
return <h2 className={classes}>
                    {props.children}
        </h2>;
};
export default Titlu;