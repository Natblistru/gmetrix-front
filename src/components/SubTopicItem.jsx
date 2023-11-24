import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ContextData from "../components/context/ContextData";
import ProgressBar from "./ProgressBar";

const SubTopicItem = ({subTit,idx,results,tests,exams, allTems}) => {
  const {stateData} = React.useContext(ContextData)
  const subtitle = subTit;

  return (
    <li key={idx}>
      <div className="subtopic-header">
        <span className="num"></span>
        <h4>
          <Link to={`${subtitle.path_tema}?teacher=1&program=${subtitle.theme_learning_programs_id}`}>

          {/* <Link to={`${subtitle.addressDisciplina}${subtitle.address}`}> */}
            {subtitle.tema_name}
            {/* {subtitle.name} */}
          </Link>
        </h4>
      </div>
      <ProgressBar proc={subtitle.tema_media} />

      {/* <ProgressBar proc={procent} nota={nota}/> */}
    </li>
  );
};
const reduxState = (state) => ({
  results: state.results,
  tests: state.tests,
  exams: state.exams
});
export default connect(reduxState, null)(SubTopicItem);
