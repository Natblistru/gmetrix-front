import React, { useState, useEffect } from 'react';
import headerImg from "../assets/img/boy-sysadmin_03.svg";

function Banner() {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [index, setIndex] = useState(1);
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const toRotate = [ "vizionare video", "ascultare audio", "slide-uri imagini", "carduri memo" ];
  const period = 1000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => isDeleting ? prevDelta / 2 : prevDelta * 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(200);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }
  return (
    <section className="banner" id="home">
      <div className="rowBts align-items-center" style={{ width: '1200px', margin: '10px auto'}}>
        <div className="col-md-7">
          <span className="tagline">Bun venit pe Platformă</span>
          <h1>{`Examen pe 10 - usor, prin `} <span className="txt-rotate"><span className="wrap">{text}</span></span></h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          <button className="btn">Inregistrează-te </button>
        </div>

        <div className="col-md-5">
          <img src={headerImg} alt="Header Img" style={{width: '500px', height: '375px'}}/>
        </div>
      </div>
    </section>
  );
}
export default Banner;