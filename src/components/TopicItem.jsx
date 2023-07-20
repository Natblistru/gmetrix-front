import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import temeIstoriArray from "../data/temeIstoria";
import SubTopicItem from "./SubTopicItem";
import ProgressBar from "./ProgressBar";

const TopicItem = ({ item,results }) => {
  const tema = item;
  const [procent, setProcent] = useState(0);
  useEffect(() => {
    console.log(results.items);
    if (tema.id !== null && tema.id !== undefined) {
      const filteredIds = temeIstoriArray
        .flatMap((item) =>
          item.subtitles.flatMap((subItem) => subItem.subjects)
        )
        .filter((subjectItem) => subjectItem.titleID == tema.id)
        .map((subjectItem) => subjectItem.id);

      let SumProcValue = 0;
      console.log(filteredIds);

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
          SumProcValue += procValue;
      });
      SumProcValue = Math.round(SumProcValue / filteredIds.length);
      setProcent(SumProcValue);
    }
  }, [results.items]);

  return (
    <li className="topic-item" key={tema.id}>
      <div className="topic-header">
        <div className="topic-header-title">
          <span className="num"></span>
          <h3>{tema.title}</h3>
        </div>
        <ProgressBar proc={procent} />
      </div>
      <ol className="subtopic-list">
        {tema?.subtitles?.map((subtitle, idx) => (
          <SubTopicItem subTit={subtitle} idx={idx} key={idx} />
        ))}
      </ol>
    </li>
  );
};

const reduxState = (state) => ({
  results: state.results,
});
export default connect(reduxState, null)(TopicItem);
