import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import temeIstoriArray from "../data/temeIstoria";
import ProgressBar from "./ProgressBar";

const SubTopicItem = ({subTit,idx,results}) => {
  const subtitle = subTit;
  const [procent, setProcent] = useState(0);

  useEffect(() => {
    if (subtitle.id !== null && subtitle.id !== undefined) {
      const filteredIds = temeIstoriArray
        .flatMap((item) =>
          item.subtitles.flatMap((subItem) => subItem.subjects)
        )
        .filter((subjectItem) => subjectItem.subtitleID == subtitle.id)
        .map((subjectItem) => subjectItem.id);
      
      let SumProcValue = 0;
      let result;
      const user = "Current user";

      filteredIds.forEach((id) => {
        result = sumProc(results.items, user, id);
        if (result !== null && result !== undefined && !isNaN(result)) SumProcValue += result;
      });
      SumProcValue = Math.round(SumProcValue / filteredIds.length);
      setProcent(SumProcValue);
    }
  }, [results.items]);

  const sumProc = (items, user, id) => {
    const userItems = items.find(item => item.user === user);
    if (!userItems) return 0;
  
    const filteredItems = userItems.subject.filter(item => item.id == id);
    const procSum = filteredItems.reduce((acc, item) => acc + item.proc, 0);
  
    return procSum / filteredItems.length;
  };

  return (
    <li key={idx}>
      <div className="subtopic-header">
        <span className="num"></span>
        <h4>
          {/* <Link to='/tema1'>{subtitle.name}</Link> */}
          <Link to={`${subtitle.addressDisciplina}${subtitle.address}`}>
            {subtitle.name}
          </Link>
        </h4>
      </div>
      <ProgressBar proc={procent} nota={10}/>
    </li>
  );
};
const reduxState = (state) => ({
  results: state.results,
});
export default connect(reduxState, null)(SubTopicItem);
