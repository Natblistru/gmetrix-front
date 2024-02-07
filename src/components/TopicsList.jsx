import React from "react";
import { useSelector } from 'react-redux';
import TopicItem from "./TopicItem";

const TopicsList = () => {
    const capitole = useSelector(state => state.capitole);
    return (                
    <ol className="topic-list" type="I">
        {capitole.map((tema, idx) => {
            // console.log(tema);
            return <TopicItem item={tema} key={idx} />;
        })}
    </ol>)
    };
export default TopicsList;