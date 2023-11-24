import React from "react";
import ContextData from "../components/context/ContextData";
import { Link } from 'react-router-dom';
const ListDiscipline = () => {
  const {stateData} = React.useContext(ContextData)
  console.log(stateData);
  return (
    <div className="manuale-container">
      {stateData.disciplineAni.map((item) => (
        
        <div className="manual-item" key={item.id}>

          <Link to={`/capitole/${item.subject_id}`}>
          
            <img src={process.env.PUBLIC_URL + item.img} alt="" />
            <p>{item.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};
export default ListDiscipline;
