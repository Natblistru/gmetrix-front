const TitleBox = (props) => {
const classes = "title-box " + props.className; 
  return (
    <div className={classes}>
      <div className="title-img">
        <img src={process.env.PUBLIC_URL + '/images/parchment.png'} alt="" />
        <h1>{props.children}</h1>
      </div>
      <div className="progress-box">
        <span>0%</span>
        <div className="progress">
          <div className="bar"></div>
        </div>
      </div>
    </div>
  );
};
export default TitleBox;
