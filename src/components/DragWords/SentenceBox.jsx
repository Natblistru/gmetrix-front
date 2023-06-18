import React from 'react';
import Droppable from './Droppable';

const SentenceBox = ({ marked, onDrop, sentence }) => {
  const handleDrop = (e, id) => {
    onDrop(e, id);
  };

  const renderSentence = () => {
    let correctAnswer = true;
    return sentence.map((w, i) => {
      // console.log(w.text,w.id,w.displayed,w.placed);
      if (w.type === 'word') {

        return <div className="word-box-inline" data-testid={'word'} key={i}>{w.text}</div>;
      }
      
      let bgcolor;
      if (marked) {
        bgcolor = w.text === w.displayed ? 'lightgreen' : '#F77';
        if (w.text !== w.displayed) {
          correctAnswer = false;
        }
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
      {/* <p>Completați spațiile libere cu cuvintele de mai jos</p> */}
      <div className="word-wrapper">
        {renderSentence()}
      </div>
    </div>
  );
};

export default SentenceBox;
