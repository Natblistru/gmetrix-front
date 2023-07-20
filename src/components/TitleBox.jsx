import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import { connect } from "react-redux";

const TitleBox = ({className,subtemaId,children,results}) => {
const classes = "title-box " + className; 
const [procent, setProcent] = useState(0)

useEffect(() => {
  console.log(results.items);

  const foundObject = results.items.find(item => {
    return item.teme.find(subItem => subItem.id === subtemaId);
  });
  
  let procValue = null;
  
  if (foundObject) {
    procValue = foundObject.teme.find(subItem => subItem.id === subtemaId)?.proc;
  }
  if(procValue !== null && procValue !== undefined) setProcent(procValue)
  
}, [results.items]);

  return (
    <div className={classes}>
      <div className="title-img">
        <img src={process.env.PUBLIC_URL + '/images/parchment.png'} alt="" />
        <h1>{children}</h1>
      </div>
      <ProgressBar proc={procent}/>
    </div>
  );
};
const reduxState = (state) => ({
  results: state.results,
});
export default connect(reduxState, null)(TitleBox);
