import TopicItem from "./TopicItem";

const TopicsList = (props) => {
    console.log(props.teme)
    return (                
    <ol className="topic-list" type="I">
        {props.teme.map((tema,idx) => (
            <TopicItem item={tema} key={idx} allTems={props.teme}/>
        ))}  
    </ol>)
    };
export default TopicsList;