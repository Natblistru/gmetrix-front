import React, { useEffect, useRef, useState } from 'react';
import { connect } from "react-redux";

const AudioPlayer = ({currentSubject,path,subjectID,arrayAudioLength, results,update, add}) => {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [currentResult, setCurrentResult] = useState(null);

  useEffect(() => {
    audioRef.current.src = process.env.PUBLIC_URL + path;
    // audioRef.current.currentTime = 10;
    setProgress(0);
    const userItems = results.items.find(item => item.user === "Current user");
    if (userItems) {
      const resultItem = userItems.subject.find(subjectItem => subjectItem.id == subjectID && subjectItem.audio == (currentSubject+1));
      if (resultItem) {
        audioRef.current.addEventListener('loadedmetadata', () => {
          const currentTimeInSeconds = (resultItem.proc / 100) * audioRef.current.duration;
          audioRef.current.currentTime = currentTimeInSeconds;
        });
        setCurrentResult(resultItem);
      } else {
        setCurrentResult(            {
          id: subjectID,
          audio: currentSubject+1,
          proc: 0
         });
         for (let i = 0; i < arrayAudioLength; i++) {
          add(           {
            id: subjectID,
            audio: currentSubject+1+i,
            proc: 0
           })
        }
        //  add(           {
        //   id: subjectID,
        //   audio: currentSubject+1,
        //   proc: 0
        //  })
      }
    } else {
      setCurrentResult(null); 
    }
  }, [currentSubject, path]);

  useEffect(()=> {
    console.log(results.items)
  },[results.items])


  const handleTimeUpdate = () => {
    const audioElement = audioRef.current;
    const currentTime = audioElement.currentTime;
    const duration = audioElement.duration;

    // Рассчитываем процент прогресса
    const progressPercentage = (currentTime / duration) * 100;
    setProgress(progressPercentage);
  };

   
  useEffect(() => {
     if (currentResult && currentResult.proc < progress) {
      const updatedResult = { ...currentResult, proc: Math.round(progress) };
      setCurrentResult(updatedResult);
      update(updatedResult);
    }
  }, [progress]); 

  return (
    <div className="audio">
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} controls preload="auto">
        <source src={process.env.PUBLIC_URL + path} type="audio/mpeg" />
      </audio>
    </div>
  );
};

const reduxState = (state) => ({
  results: state.results,
});

const reduxFunctions = (dispatch) => ({
  update: (item) => dispatch({ type: "UPDATE_RESULT", payload: item }),
  add: (item) => dispatch({ type: "ADD_RESULT", payload: item }),
});

export default connect(reduxState, reduxFunctions)(AudioPlayer);