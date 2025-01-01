import React, { useState } from 'react';
import { useSelector } from "react-redux";


const VerticalTestMenu = ({
  quizArray,
  indexAllItems, 
  setIndexAllItems,
  handleSliderClick,
  handleTryAgain,
  finishExam
}) => {
  const [menuWidth, setMenuWidth] = useState('0');
  let currentId = parseInt(window.location.pathname.split('/').pop(), 10);
  const [activeSlide, setActiveSlide] = useState(currentId-1);
  const allTeacherTests = useSelector((state) => state.allTeacherTests);

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

  const resetState = () => {
    setActiveSlide(null);
    handleTryAgain();
    handleClick(0);
    closeNav();
  };

  const handleReset = () => {
    const confirmation = window.confirm(
      "Intradevar doriti sa resetati? Toate rezultatele vor fi sterse!"
    );
    if (confirmation) {
      resetState(); // Apelează funcția de resetare doar dacă utilizatorul confirmă
    }
  };
  

  return (
    <div>
      <div id="mySidenav" className="vertical-sidenav" style={{ width: menuWidth }} onMouseLeave={closeNav}>
        <span className="closebtn" onClick={closeNav}>&times;</span>
        {quizArray
          .map((quiz, index) => (
            <React.Fragment key={quiz.order_item_test}>
              <a 
                onClick={() => handleClick(index)} 
                href="#" 
                className={index === 0 ? 'firstTest' : ''}
              >
                <span 
                  className={activeSlide === index ? "active-test" : ""} 
                  style={{ marginRight: '12px' }}
                >
                  Test
                </span>
                <span className={activeSlide === index ? "active-test" : ""}>
                  {index+1}
                </span>
              </a>
              <input 
                type="checkbox" 
                className="option-input" 
                style={{ marginLeft: activeSlide === index ? '24px' : '28px' }}
                checked={Math.round(quiz.student_procent) === 100}
                readOnly
              />
              <br />
            </React.Fragment>
          ))}


        <div className="button-container">
        <button onClick={handleReset} className="reset-button">Reset</button>
        <button onClick={finishExam}className="reset-button finish">Finish</button>
        </div>
      </div>

      <span style={{ fontSize: '30px', cursor: 'pointer', position: 'fixed', top: '97px', right: '50px' }} onClick={openNav}>&#9776; Lista teste</span>
    </div>
  );
};

export default VerticalTestMenu;