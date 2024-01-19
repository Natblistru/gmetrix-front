import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import ViewMyTopics from './ViewMyTopics';
import AddMyTopic from './AddMyTopic';
import EditMyTopic from './EditMyTopic';
import ViewMyVideos from './ViewMyVideos';

function MyTopics(props) {
  const [showAddTopic, setShowAddTopic] = useState(false);
  const [showEditTopic, setShowEditTopic] = useState(false);
  const [topicId, setTopicId] = useState(null);

  const handleShowAddTopic = () => {
    setShowAddTopic(true);
  };

  const handleHideAddTopic = () => {
    setShowAddTopic(false);
  };

  const handleShowEditTopic = (item_id) => {
    setTopicId(item_id)
    setShowEditTopic(true);
  };

  const handleHideEditTopic = () => {
    setShowEditTopic(false);
  };

  return (
    <div>
      <CSSTransition
        in={showAddTopic}
        timeout={500}
        classNames="my-topic-transition"
        unmountOnExit
      >
        <AddMyTopic {...props} onBackToList={handleHideAddTopic} />
      </CSSTransition>

      <CSSTransition
        in={showEditTopic}
        timeout={500}
        classNames="my-topic-transition"
        unmountOnExit
      >
        <EditMyTopic {...props} id={topicId} onBackToList={handleHideEditTopic} />
      </CSSTransition>

        <ViewMyTopics onAddTopic={handleShowAddTopic} onEditTopic={handleShowEditTopic}/>
    </div>
  );
}

export default MyTopics;
