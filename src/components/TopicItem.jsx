import React from "react";
import SubTopicItem from "./SubTopicItem";

const TopicItem = (props) => {
    const tema = props.item;
    return (
    <li className="topic-item" key={tema.id}>
        <div className="topic-header">
            <div className="topic-header-title">
                <span className="num"></span>
                <h3>{tema.title}</h3>                
            </div>
            <div className="progress-box">
                <span>0%</span>
                <div className="progress">
                    <div className="bar"></div>
                </div>
            </div>
        </div>
        <ol className="subtopic-list">
            {
            tema?.subtitles?.map((subtitle,idx) => (
                <SubTopicItem subTit={subtitle} idx={idx} key={idx}/>
            ))}
        </ol>
    </li>)
    };
    export default TopicItem;