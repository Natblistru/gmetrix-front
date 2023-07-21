import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import temeIstoriArray from "../data/temeIstoria";
import SubTopicItem from "./SubTopicItem";
import ProgressBar from "./ProgressBar";

const TopicItem = ({ item,results }) => {
  const tema = item;
  const [procent, setProcent] = useState(0);
  useEffect(() => {
   // console.log(results.items);
    if (tema.id !== null && tema.id !== undefined) {
      const filteredIds = temeIstoriArray
        .flatMap((item) =>
          item.subtitles.flatMap((subItem) => subItem.subjects)
        )
        .filter((subjectItem) => subjectItem.titleID == tema.id)
        .map((subjectItem) => subjectItem.id);

      let SumProcValue = 0;
      let result;
      const user = "Current user";
    console.log(filteredIds);

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
