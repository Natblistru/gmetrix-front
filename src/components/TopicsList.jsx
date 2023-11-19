import axios from "axios";
import {useEffect} from "react";
import TopicItem from "./TopicItem";

const TopicsList = (props) => {
    useEffect(()=> {
        fetchTodos();
    },[]);

    const fetchTodos = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/chapters?subject_study_level_id=1");
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    }
    return (                
    <ol className="topic-list" type="I">
        {props.teme.map((tema,idx) => (
            <TopicItem item={tema} key={idx} allTems={props.teme}/>
        ))}  
    </ol>)
    };
export default TopicsList;