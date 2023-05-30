import React from "react";
import { withRouter } from "react-router-dom";
import FlipCard from "./FlipCard";
import "./flipCards.css";
import temeIstoriArray from '../../data/temeIstoria';

const FlipCards = (props) => {
//  let repereList = temeIstoriArray[0].subtitles[0].repere;
  const { list } = props.location.state;
  let counter = -1;
  const arrayColor = ["--city", "--ski", "--beach", "--camping"];
  return (
    <main className="main">
      <section className="card-area">
        {list.map((ev) => {
          counter = counter === 3 ? 0 : counter + 1;
          return (
            <FlipCard
              key={ev.id}
              anul={ev.anul}
              eveniment={ev.eveniment}
              textColor={arrayColor[counter]}
            />
          );
        })}
      </section>
    </main>
  );
};
export default withRouter(FlipCards);
