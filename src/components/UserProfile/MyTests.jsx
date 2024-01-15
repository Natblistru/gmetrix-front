import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';


import ViewMyTests from './ViewMyTests';
import AddMyTest from './AddMyTest';



function MyTests(props) {
  const [showAddTest, setShowAddTest] = useState(false);

  const handleShowAddTest = () => {
    setShowAddTest(true);
  };

  const handleHideAddTest = () => {
    setShowAddTest(false);
  };


  return (
    <div>
      <CSSTransition
        in={showAddTest}
        timeout={500}
        classNames="my-topic-transition"
        unmountOnExit
      >
        <AddMyTest {...props} onBackToList={handleHideAddTest} />
      </CSSTransition>

        <ViewMyTests onAddTest={handleShowAddTest} />
    </div>
  );
}

export default MyTests;