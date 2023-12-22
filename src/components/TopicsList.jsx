import React from "react";

import ContextData from "../components/context/ContextData";

import TopicItem from "./TopicItem";

const TopicsList = () => {
    const {stateData} = React.useContext(ContextData)
    return (                
    <ol className="topic-list" type="I">
        {stateData.capitole.map((tema, idx) => {
            // console.log(tema);
            return <TopicItem item={tema} key={idx} />;
        })}
    </ol>)
    };
export default TopicsList;