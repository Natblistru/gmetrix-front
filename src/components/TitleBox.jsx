import ProgressBar from "./ProgressBar";

const TitleBox = (props) => {
const classes = "title-box " + props.className; 
  return (
    <div className={classes}>
      <div className="title-img">
        <img src={process.env.PUBLIC_URL + '/images/parchment.png'} alt="" />
        <h1>{props.children}</h1>
      </div>
      <ProgressBar proc={50}/>
    </div>
  );
};
export default TitleBox;
