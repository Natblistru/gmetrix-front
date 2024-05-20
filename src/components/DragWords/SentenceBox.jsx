import React from 'react';
import Droppable from './Droppable';

const SentenceBox = ({ marked, onDrop, sentence }) => {
  const handleDrop = (e, id) => {
    onDrop(e, id);
  };

  const renderSentence = () => {
    let correctAnswer = true;
    return sentence.map((w, i) => {
      console.log(w.text,w.id,w.displayed,w.placed);
      if (w.type === 'word') {
        const textWithBreaks = w.text.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {index > 0 && <br />} {/* Adaugă <br /> între liniile de text */}
            {line}
          </React.Fragment>
        ));
        return <div className="word-box-inline" data-testid={'word'} key={i}>{textWithBreaks}</div>;
      }
      
      let bgcolor;
      if (marked) {
        bgcolor = w.text === w.displayed ? 'lightgreen' : '#F77';
        if (w.text !== w.displayed) {
          correctAnswer = false;
        }
      } else if(!marked && w.displayed !== "") {
        bgcolor =  '#00b4d8' ;
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
