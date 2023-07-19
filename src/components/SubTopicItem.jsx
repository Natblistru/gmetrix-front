import React from "react";
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const SubTopicItem = (props) => {
  const subtitle = props.subTit;
  return (
    <li key={props.idx}>
      <div className="subtopic-header">
        <span className="num"></span>
        <h4>
          {/* <Link to='/tema1'>{subtitle.name}</Link> */}
          <Link to={`${subtitle.addressDisciplina}${subtitle.address}`}>
            {subtitle.name}
          </Link>
        </h4>
      </div>
      <ProgressBar proc={20} nota={10}/>
    </li>
  );
};
export default SubTopicItem;
