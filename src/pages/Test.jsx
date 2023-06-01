import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import temeIstoriArray from "../data/temeIstoria";
import Breadcrumb from "../components/Breadcrumb";
import Wrapper from "../components/Wrapper";
import TitleBox from "../components/TitleBox";
import ItemAccordeon from "../components/Accordeon/ItemAccordeon";
import ItemText from "../components/Accordeon/ItemText";
import "../index.css";
import RadioButton from "../components/RadioButton";

const Test = (props) => {
  const { list } = props.location.state;
  const [selectedValue, setSelectedValue] = useState("");
  const handleRadioButtonChange = (value) => {
    setSelectedValue(value);
  };
  const checkAnswer = () => {
    if (selectedValue === list.quizArray[0].correctAnswer) {
      console.log("Corect!!!");
    } else {
      console.log("Gresit!!");
    }
  };
  return (
    <Wrapper>
      <Breadcrumb
        list={temeIstoriArray[0].subtitles[0].subjects[0].breadcrumb}
      />
      <TitleBox className="teme-container">{list.name}</TitleBox>
      <ItemAccordeon titlu="Cerințele sarcinii:">
        <ItemText>
          {list.quizArray[0].answers.map((answer) => (
            <RadioButton
              key={answer}
              value={answer}
              checked={selectedValue === answer}
              onChange={handleRadioButtonChange}
              correctAnswer={list.quizArray[0].correctAnswer}
            />
          ))}{" "}
        </ItemText>
        <button onClick={checkAnswer} className="btn-test">Verifică răspunsul</button>
      </ItemAccordeon>
    </Wrapper>
  );
};
export default withRouter(Test);
