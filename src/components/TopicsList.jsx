import React from "react";
import ContextData from "../components/context/ContextData";

import TopicItem from "./TopicItem";

const TopicsList = (props) => {
    const {stateData} = React.useContext(ContextData)
    console.log(props.teme)
    return (                
    <ol className="topic-list" type="I">
      {/* Dupa Deploy */}      
      {/* {stateData.capitole.map((item) => ( */}
        {props.teme.map((tema,idx) => (
            <TopicItem item={tema} key={idx} allTems={props.teme}/>
        ))}  
    </ol>)
    };
export default TopicsList;