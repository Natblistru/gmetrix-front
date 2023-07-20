import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import temeIstoriArray from "../data/temeIstoria";
import ProgressBar from "./ProgressBar";

const SubTopicItem = ({subTit,idx,results}) => {
  const subtitle = subTit;
  const [procent, setProcent] = useState(0);

  useEffect(() => {
    console.log(results.items);
    if (subtitle.id !== null && subtitle.id !== undefined) {
      const filteredIds = temeIstoriArray
        .flatMap((item) =>
          item.subtitles.flatMap((subItem) => subItem.subjects)
        )
        .filter((subjectItem) => subjectItem.subtitleID == subtitle.id)
        .map((subjectItem) => subjectItem.id);
      
      let SumProcValue = 0;

      filteredIds.forEach((id) => {
        const foundObject = results.items.find((item) => {
          return item.subject.find((subItem) => subItem.id === id);
        });

        let procValue = null;

        if (foundObject) {
          procValue = foundObject.subject.find(
            (subItem) => subItem.id === id
          )?.proc;
        }
        if (procValue !== null && procValue !== undefined)
        SumProcValue+=procValue;
      });
      SumProcValue = SumProcValue/filteredIds.length;
      setProcent(SumProcValue);
    }
  }, [results.items]);

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
