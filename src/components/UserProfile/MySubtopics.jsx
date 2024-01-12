import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import ViewMySubtopics from './ViewMySubtopics';
import AddMySubtopic from './AddMySubtopic';


function MySubtopics(props) {
  const [showAddSubtopic, setShowAddSubtopic] = useState(false);

  const handleShowAddSubtopic = () => {
    setShowAddSubtopic(true);
  };

  const handleHideAddSubtopic = () => {
    setShowAddSubtopic(false);
  };

  return (
    <div>
      <CSSTransition
        in={showAddSubtopic}
        timeout={500}
        classNames="my-topic-transition"
        unmountOnExit
      >
        <AddMySubtopic {...props} onBackToList={handleHideAddSubtopic} />
      </CSSTransition>

        <ViewMySubtopics onAddSubtopic={handleShowAddSubtopic} />
    </div>
  );
}

export default MySubtopics;