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

  const handleFlipEnd = () => {
    if(props.ultimul) {
      if (flipped) {
        const nextSection = document.querySelector('section.block:last-of-type');
        if (nextSection) {
          nextSection.style.top = '280px';
          nextSection.style.transition = 'top 0.5s ease';
        }
      } else {
        const nextSection = document.querySelector('section.block:last-of-type');
        console.log(nextSection)
        if (nextSection) {
          nextSection.style.top = '0px';
          nextSection.style.transition = 'top 0.5s ease';
        }
      }
    }
  };

  const contentHTML = props.dangerousHTML; 
  // console.log('Content HTML:', contentHTML);
  return (
    <div className="Card" onClick={flip} onAnimationEnd={handleFlipEnd}>
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