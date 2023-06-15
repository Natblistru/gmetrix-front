import React, { useState } from 'react';
import SentenceBox from '../DragWords/SentenceBox';
import AnswerBox from '../DragWords/AnswerBox';
import { getSentence, getAnswers } from '../DragWords/TextConverter';

const text = 'The <brown> fox <jumped> over the <dog>';

const App = () => {
  const [showResults, setShowResults] = useState(false);
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(getAnswers(text));
  const [sentence, setSentence] = useState(getSentence(text));

  const onDrop = (ev, dropId) => {
    const text = ev.dataTransfer.getData('text/plain');
    const updatedSentence = sentence.map(w => {
      if (w.id === dropId) {
        return { ...w, placed: true, displayed: text };
      }
      return w;
    });
    setSentence(updatedSentence);
  };

  const onStart = () => {
    setQuestion('');
    setAnswers(getAnswers(question));
    setSentence(getSentence(question));
  };

  const questionChange = e => {
    setQuestion(e.target.value);
  };

  const toggleResults = () => {
    setShowResults(!showResults);
  };

  return (
    <div className="app-container">
      {/* <h2 className='header'>Word Game</h2>
      <QuestionBox onStart={onStart} questionChange={questionChange} /> */}

      <SentenceBox marked={showResults} onDrop={onDrop} sentence={sentence} />
      <AnswerBox answers={answers} />
      <div>
        <button className="primary-button" onClick={toggleResults}>Test</button>
      </div>
      {/* {showResults && <Results data={sentence} />} */}
    </div>
  );
};

export default App;
