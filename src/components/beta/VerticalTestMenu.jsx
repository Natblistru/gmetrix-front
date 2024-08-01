import React, { useState } from 'react';

const VerticalTestMenu = ({
  quizArray,
  indexAllItems, 
  setIndexAllItems,
  // slidesToShow,
  // setShowResponse,
  // setShowCards,
  // setCurrentTextIndex,
  // setIdRaspuns,
  // setIsAnswered,
  // destination,
  handleSliderClick

}) => {
  const [menuWidth, setMenuWidth] = useState('0');

  let currentId = parseInt(window.location.pathname.split('/').pop(), 10);
  const [activeSlide, setActiveSlide] = useState(currentId-1);

  const openNav = () => {
    setMenuWidth('250px');
    currentId = parseInt(window.location.pathname.split('/').pop(), 10);
    setActiveSlide(currentId-1);
  };

  const closeNav = () => {
    setMenuWidth('0');
  };

  const handleClick = (index) => {
    setActiveSlide(index)
    setIndexAllItems(index)
    handleSliderClick(index+1);
  };

  return (
    <div>
      <div id="mySidenav" className="verticalSidenav" style={{ width: menuWidth }} onMouseLeave={closeNav}>
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
        {quizArray.map((quiz, index) => (
          <>
            <a  key={quiz.order_item_test} onClick={() => handleClick(index)} href="#" className={index === 0 ? 'firstTest' : ''}>
              <span  className={activeSlide === index ? "active-test" : ""} style={{ marginRight: '12px' }}>Test</span>  <span className={activeSlide === index ? "active-test" : ""}>{quiz.order_item_test}</span></a> 
              <input type="checkbox" class="option-input" style={{ marginLeft: activeSlide === index ? '24px' : '28px' }}></input>
            <br/>
          </>
        ))}
      </div>

      <span style={{ fontSize: '30px', cursor: 'pointer', position: 'fixed', top: '97px', right: '50px' }} onClick={openNav}>&#9776; Lista teste</span>
    </div>
  );
};

export default VerticalTestMenu;