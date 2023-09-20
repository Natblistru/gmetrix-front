import { useState } from "react";
import '../FlipCards/flipCardNou.scss';

function FlipCardNou(props) {
  const [flipped, setFlipped] = useState(false);
  const [clicked, setClicked] = useState(false);

  const flip = () => {
    setFlipped(!flipped);
    setClicked(true);
  };
  let flippedCSS = flipped ? ' Card-Back-Flip' : ' Card-Front-Flip';
  if (!clicked) flippedCSS =  "";

  const contentHTML = props.dangerousHTML; 
  return (
    <div className="Card" onClick={flip}>
      <div className={'Card-Front' + flippedCSS}>
        <h3>{props.title}</h3>
      </div>
      <div className={'Card-Back' + flippedCSS}>
        {props.children}
        <div dangerouslySetInnerHTML={{ __html: contentHTML }} />
      </div>
    </div>
  );
}
export default FlipCardNou;