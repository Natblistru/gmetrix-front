import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import FlipCard from "./FlipCard";
import "./flipCards.css";
// import temeIstoriArray from "../../data/temeIstoria";
import Switch from "../Switch";
import { Link } from 'react-router-dom';

const FlipCards = (props) => {
  //  let repereList = temeIstoriArray[0].subtitles[0].repere;
  const [isChecked, setIsChecked] = useState(false);
  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
  };
  const { list, anchor, item } = props.location.state;
  let counter = -1;
  const arrayColor = ["--city", "--ski", "--beach", "--camping"];
  return (
    <div style={{ background: 'linear-gradient( to bottom right, #eee8dd, #e3d9c6 )'}}>

      <div className="nav">
          <Link to={`${item.addressDisciplina}${item.address}#${anchor}`} className="custom-link_7"><span>Înapoi</span></Link>
          {/* <Link to={`${item.addressDisciplina}${item.address}`}></Link> */}
          <Switch label="Definitie" onChange={handleSwitchChange}/>
      </div>
      <main className="main">
       <section className="card-area">
        {list.map((ev) => {
          counter = counter === 3 ? 0 : counter + 1;
          return (
            <FlipCard
              key={ev.id}
              anul={isChecked? ev.eveniment : ev.anul}
              eveniment={isChecked? ev.anul : ev.eveniment}
              img={ev.img}
              detaliiPath={ev.detaliiPath}
              textColor={arrayColor[counter]}
            />
          );
        })}
      </section>
    </main>
    </div>

  );
};
export default withRouter(FlipCards);
