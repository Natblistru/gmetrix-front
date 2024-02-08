import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useSelector } from 'react-redux';
import axios from 'axios'; 
import 'aos/dist/aos.css';
import AOS from 'aos';

import SubTopicItem from "./SubTopicItem";
import ProgressBar from "./ProgressBar";

const TopicItem = ({ item,results,allTems }) => {
  const tema = item;
  const teachersForSubtitle = useSelector(state => state.teachersForSubtitle);

  useEffect(() => {
    AOS.init(); 
  }, []);

  const filterTeachersForSubtitle = (themeLearningProgramsId) => {
    if (!teachersForSubtitle || !themeLearningProgramsId) {
      return [];
    }

    return teachersForSubtitle[themeLearningProgramsId] || [];
  };

  return (
    <li className="topic-item" key={tema.id} data-aos="fade-up">
      <div className="topic-header">
        <div className="topic-header-title">
          <span className="num"></span>
          <h3>{tema.capitol_name}</h3>
        </div>
        <ProgressBar proc={tema.capitol_media} />

      </div>
      <ol className="subtopic-list">
        {tema?.subtitles?.map((subtitle, idx) => {

          const teachersForSubtitle = filterTeachersForSubtitle(subtitle.theme_learning_programs_id);
          // console.log(teachersForSubtitle);

          return <SubTopicItem subTit={subtitle} idx={idx} key={idx} teachers={teachersForSubtitle}/>
        })}
      </ol>
    </li>
  );
};

const reduxState = (state) => ({
  results: state.results,
});
export default connect(reduxState, null)(TopicItem);
