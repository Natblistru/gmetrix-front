import React, { useState } from "react";
import temeIstoriArray from "../data/temeIstoria";
import '../index.css'
import { Link } from 'react-router-dom';
const ListNavigatie = (props) => {
  const { list, handleClearTestBoard } = props
  const primul = list.id == 1;
  const ultimul = list.id == temeIstoriArray[0].subtitles[0].subjects[0].teste.length;
  // props.setCurrentIndex(0);
  // console.log("currentIndex din ListNavigare - 0 urm") 
  // const NavigateHandle = () => {
  //   props.setCorrectAnswer(null);
  //   handleClearTestBoard();
  // }
  const navigateToTest = (testData) => {

      props.setCorrectAnswer(null);
      props.setCurrentIndex(0);
      props.setCurrentList(testData);

    // console.log("onclick navigare")
    handleClearTestBoard(testData.id);
    // Здесь вы можете выполнить дополнительные действия перед переходом, если это необходимо
  };
  const testUrmator = temeIstoriArray[0].subtitles[0].subjects[0].teste[list.id];
  const testPrecedent = temeIstoriArray[0].subtitles[0].subjects[0].teste[list.id-2]; 
  return (
    <div className="nav-container">
        <div className={`nav-link ${primul ? 'invizible' : ''}`} >
          <Link to={{ pathname: list.path, state: { list: testPrecedent, correctAns:null, currInd:0} }} onClick={() => navigateToTest(testPrecedent)}>
            <img src={process.env.PUBLIC_URL + "/images/navigation-left.png"} alt="" />
            <p>Sarcina precedentă</p>
          </Link>
        </div>
        <div className={`nav-link ${ultimul? 'invizible' : ''}`} >
        <Link to={{ pathname: list.path, state: { list: testUrmator, correctAns:null, currInd:0} }} onClick={() => navigateToTest(testUrmator)}>
            <img src={process.env.PUBLIC_URL + "/images/navigation-right.png"} alt="" />
            <p>Sarcina următoare</p>
          </Link>
        </div>
    </div>
  );
};
export default ListNavigatie;