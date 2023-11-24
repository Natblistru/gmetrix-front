import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SubTopicItem from "./SubTopicItem";
import ProgressBar from "./ProgressBar";

const TopicItem = ({ item,results,allTems }) => {
  const tema = item;
  return (
    <li className="topic-item" key={tema.id}>
      <div className="topic-header">
        <div className="topic-header-title">
          <span className="num"></span>
          <h3>{tema.capitol_name}</h3>
        </div>
        <ProgressBar proc={tema.capitol_media} />

      </div>
      <ol className="subtopic-list">
        {tema?.subtitles?.map((subtitle, idx) => (
          <SubTopicItem subTit={subtitle} idx={idx} key={idx}/>
        ))}
      </ol>
    </li>
  );
};

const reduxState = (state) => ({
  results: state.results,
});
export default connect(reduxState, null)(TopicItem);
