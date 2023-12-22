import React from "react";
import ContextData from "../components/context/ContextData";
import { Link } from 'react-router-dom';
const ListDiscipline = () => {
  const {stateData} = React.useContext(ContextData)
  // console.log(stateData);
  return (
    <div className="manuale-container">
      {stateData.disciplineAni.map((item) => {
        const nivelStudiu = item.study_level_id==1?"examen clasa 9":"BAC";
        const clasa = item.study_level_id==1?"clasa 9":"clasa 12";
        const name = item.name.split(',')[0];

        return <div className="manual-item" key={item.id}>
          <Link to={`/capitole/${item.subject_id}?level=1&year=2022&name=${name}&nivel=${nivelStudiu}&clasa=${clasa}`}>
          
            <img src={process.env.PUBLIC_URL + item.img} alt="" />
            <p>{item.name}</p>
          </Link>
        </div>
      })}
    </div>
  );
};
export default ListDiscipline;
