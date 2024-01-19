import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';


import ViewMyTests from './ViewMyTests';
import AddMyTest from './AddMyTest';
import EditMyTest from './EditMyTest';



function MyTests(props) {
  const [showAddTest, setShowAddTest] = useState(false);
  const [showEditTest, setShowEditTest] = useState(false);
  const [testId, setTestId] = useState(null);

  const handleShowAddTest = () => {
    setShowAddTest(true);
  };

  const handleHideAddTest = () => {
    setShowAddTest(false);
  };

  const handleShowEditTest = (item_id) => {
    setTestId(item_id)
    setShowEditTest(true);
  };

  const handleHideEditTest = () => {
    setShowEditTest(false);
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

      <CSSTransition
        in={showEditTest}
        timeout={500}
        classNames="my-topic-transition"
        unmountOnExit
      >
        <EditMyTest {...props} id={testId}  onBackToList={handleHideEditTest} />
      </CSSTransition>

        <ViewMyTests onAddTest={handleShowAddTest} onEditTest={handleShowEditTest} />
    </div>
  );
}

export default MyTests;