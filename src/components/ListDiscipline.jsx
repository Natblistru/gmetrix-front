import React from "react";
import ContextData from "../components/context/ContextData";
import { Link } from 'react-router-dom';
const ListDiscipline = (props) => {
  const {stateData} = React.useContext(ContextData)
  console.log(stateData);
  return (
    <div className="manuale-container">
      {/* Dupa Deploy */}      
      {/* {stateData.disciplineAni.map((item) => ( */}
        
        {props.list.map((item) => ( 
        <div className="manual-item" key={item.id}>

          {/* Dupa Deploy */}
          {/* <Link to={`/capitole/${item.subject_id}`}> */}
          
          <Link to={item.path}>
            <img src={process.env.PUBLIC_URL + item.img} alt="" />
            <p>{item.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};
export default ListDiscipline;
