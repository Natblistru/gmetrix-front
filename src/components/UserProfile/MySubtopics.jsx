import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import ViewMySubtopics from './ViewMySubtopics';
import AddMySubtopic from './AddMySubtopic';
import EditMySubtopic from './EditMySubtopic';


function MySubtopics(props) {
  const [showAddSubtopic, setShowAddSubtopic] = useState(false);
  const [showEditSubtopic, setShowEditSubtopic] = useState(false);
  const [subtopicId, setSubtopicId] = useState(null);

  const handleShowAddSubtopic = () => {
    setShowAddSubtopic(true);
  };

  const handleHideAddSubtopic = () => {
    setShowAddSubtopic(false);
  };

  const handleShowEditSubtopic = (item_id) => {
    setSubtopicId(item_id)
    setShowEditSubtopic(true);
  };

  const handleHideEditSubtopic = () => {
    setShowEditSubtopic(false);
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

      <CSSTransition
        in={showEditSubtopic}
        timeout={500}
        classNames="my-topic-transition"
        unmountOnExit
      >
        <EditMySubtopic {...props} id={subtopicId} onBackToList={handleHideEditSubtopic} />
      </CSSTransition>

        <ViewMySubtopics onAddSubtopic={handleShowAddSubtopic} onEditSubtopic={handleShowEditSubtopic}/>
    </div>
  );
}

export default MySubtopics;