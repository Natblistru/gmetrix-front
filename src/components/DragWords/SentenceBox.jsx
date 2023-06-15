import React from 'react';
import Droppable from './Droppable';

const SentenceBox = ({ marked, onDrop, sentence }) => {
  const handleDrop = (e, id) => {
    onDrop(e, id);
  };

  const renderSentence = () => {
    return sentence.map((w, i) => {
      if (w.type === 'word') {
        return <div className="word-box" data-testid={'word'} key={i}>{w.text}</div>;
      }
      
      let bgcolor;
      if (marked) {
        bgcolor = w.text === w.displayed ? 'lightgreen' : '#F77';
      }

      return (
        <Droppable
          bgcolor={bgcolor}
          groupName={w.id}
          key={i}
          ndx={i}
          onDrop={handleDrop}
        >
          {w.placed ? w.displayed : ' '}
        </Droppable>
      );
    });
  };

  return (
    <div className="block-styled">
      Fill in the blanks with the words below
      <div className="word-wrapper">
        {renderSentence()}
      </div>
    </div>
  );
};

export default SentenceBox;
