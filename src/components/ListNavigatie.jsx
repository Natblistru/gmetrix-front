import React from "react";
import temeIstoriArray from "../data/temeIstoria";
import '../index.css'
import { Link } from 'react-router-dom';
const ListNavigatie = (props) => {
  const primul = props.list.id == 1;
  const ultimul = props.list.id == temeIstoriArray[0].subtitles[0].subjects[0].teste.length;

  const testUrmator = temeIstoriArray[0].subtitles[0].subjects[0].teste[props.list.id];
  const testPrecedent = temeIstoriArray[0].subtitles[0].subjects[0].teste[props.list.id-2]; 
  return (
    <div className="nav-container">
        <div className={`nav-link ${primul ? 'invizible' : ''}`}>
          <Link to={{ pathname: props.list.path, state: { list: testPrecedent} }}>
            <img src={process.env.PUBLIC_URL + "/images/navigation-left.png"} alt="" />
            <p>Sarcina precedentă</p>
          </Link>
        </div>
        <div className={`nav-link ${ultimul? 'invizible' : ''}`}>
        <Link to={{ pathname: props.list.path, state: { list: testUrmator} }}>
            <img src={process.env.PUBLIC_URL + "/images/navigation-right.png"} alt="" />
            <p>Sarcina următoare</p>
          </Link>
        </div>
    </div>
  );
};
export default ListNavigatie;