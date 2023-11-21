import React from "react";
import { Link } from 'react-router-dom';
const ListDiscipline = (props) => {
  console.log(props.list);
  return (
    <div className="manuale-container">
      {props.list.map((item) => (
        <div className="manual-item" key={item.id}>
          <Link to={item.path}>

          {/* Dupa Deploy */}
          {/* <Link to={`/capitole/${item.subject_id}`}> */}

            <img src={process.env.PUBLIC_URL + item.img} alt="" />
            <p>{item.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};
export default ListDiscipline;
