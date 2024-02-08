import React, { useState } from "react";
// import temeIstoriArray from "../data/temeIstoria";
import '../index.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ListNavigatie = (props) => {
  const { list, handleClearTestBoard } = props
  const currentTheme = useSelector(state => state.currentTheme);
  const currentSubject = useSelector(state => state.currentSubject);
  const currentTests = useSelector(state => state.currentTests);
  const currentIndexTest = useSelector(state => state.currentIndexTest);
  const currentTopicObject = useSelector(state => state.currentTopic);
  const currentTopic = currentTopicObject.currentTopic;

  const subject_id = currentSubject.subject_id || currentSubject.currentSubject.subject_id;

  const parts = currentTheme.path_tema.split("/");
  const addressDisciplina = "/" + parts[1];
  const addressSubtitle = "/" + parts.slice(2).join("/");



  const primul = list.id == 1;
  const ultimul = list.id == currentTopic.tests.length;
  const utilmul_dnd = list.id == currentTests.length;
  // console.log(currentTopic.tests.length)
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
  };
  let dynamicPathTestPrecedent = "";
  let dynamicPathTestUrmator = "";
  let testPrecedent = list;
  let testUrmator = list;

  let testPrecedent1 = currentTopic.tests[currentIndexTest];
  let testUrmator1 = currentTopic.tests[currentIndexTest];
  if (!primul) {
  
    testPrecedent1 = currentTopic.tests[currentIndexTest-1];

    testPrecedent = currentTopic.tests[list.id-2]; 
    dynamicPathTestPrecedent = `${addressDisciplina}${addressSubtitle}${testPrecedent.path}${testPrecedent.addressTest}/1?teacher=1&level=1&disciplina=${subject_id}&theme=${currentTheme.tema_id}`;       

  //  dynamicPathTestPrecedent = `${testPrecedent.addressTestDisciplina}${testPrecedent.addressTestSubtitle}${testPrecedent.addressTestSubject}${testPrecedent.addressTest}/1`;
  }
  if(!ultimul) {
    if(!utilmul_dnd) {
      testUrmator1 = currentTopic.tests[currentIndexTest+1];
      // console.log(testUrmator1.id);
    }

    testUrmator = currentTopic.tests[list.id];
    // console.log(testUrmator)
    dynamicPathTestUrmator = `${addressDisciplina}${addressSubtitle}${testUrmator.path}${testUrmator.addressTest}/1?teacher=1&level=1&disciplina=${subject_id}&theme=${currentTheme.tema_id}`;       

    // dynamicPathTestUrmator = `${testUrmator.addressTestDisciplina}${testUrmator.addressTestSubtitle}${testUrmator.addressTestSubject}${testUrmator.addressTest}/1`;
  }


  // console.log("dynamicPathTestUrmator",dynamicPathTestUrmator);
  return (
    <div className="nav-container">
        <div className={`nav-link ${primul ? 'invizible' : ''}`} >
        {/* <Link to={{ pathname: list.path, state: { list: testPrecedent, correctAns:null, currInd:0} }} onClick={() => navigateToTest(testPrecedent)}> */}
          <Link to={dynamicPathTestPrecedent} onClick={() => {props.setCorrectAnswer(null);handleClearTestBoard(testPrecedent1.id)}}>
            <img src={process.env.PUBLIC_URL + "/images/navigation-left.png"} alt="" />
            <p>Sarcina precedentă</p>
          </Link>
        </div>
        <div className={`nav-link ${ultimul? 'invizible' : ''}`} >
          {/* <Link to={{ pathname: list.path, state: { list: testUrmator, correctAns:null, currInd:0} }} onClick={() => navigateToTest(testUrmator)}> */}
          <Link to={dynamicPathTestUrmator} onClick={() => {props.setCorrectAnswer(null);handleClearTestBoard(testUrmator1.id)}} >        
            <img src={process.env.PUBLIC_URL + "/images/navigation-right.png"} alt="" />
            <p>Sarcina următoare</p>
          </Link>
        </div>
    </div>
  );
};
export default ListNavigatie;