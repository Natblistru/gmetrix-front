import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import ViewMyTopics from './ViewMyTopics';
import AddMyTopic from './AddMyTopic';
import ViewMyVideos from './ViewMyVideos';

function MyTopics(props) {
  const [showAddTopic, setShowAddTopic] = useState(false);

  const handleShowAddTopic = () => {
    setShowAddTopic(true);
  };

  const handleHideAddTopic = () => {
    setShowAddTopic(false);
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

        <ViewMyTopics onAddTopic={handleShowAddTopic} />
        <ViewMyVideos/>
    </div>
  );
}

export default MyTopics;
