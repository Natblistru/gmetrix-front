import React, { useEffect, useRef, useState } from 'react';
import { connect } from "react-redux";

const AudioPlayer = ({currentSubject,path,subjectID,results}) => {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    audioRef.current.src = process.env.PUBLIC_URL + path;
    setProgress(0);
    // const interval = setInterval(calculateProgress, 3000);
    // return () => clearInterval(interval); 
  }, [currentSubject, path]);

  const calculateProgress = () => {
    const audioElement = audioRef.current;
    const currentTime = audioElement.currentTime;
    const duration = audioElement.duration;

    // Рассчитываем процент прогресса
    const progressPercentage = (currentTime / duration) * 100;
    // console.log(currentTime)    
    // console.log(duration) 
    // console.log(isNaN(progressPercentage)) 
    if(!isNaN(progressPercentage)) setProgress(progressPercentage);

  };

  const handleTimeUpdate = () => {
    const audioElement = audioRef.current;
    const currentTime = audioElement.currentTime;
    const duration = audioElement.duration;

    // Рассчитываем процент прогресса
    const progressPercentage = (currentTime / duration) * 100;
    setProgress(progressPercentage);
  };

   
  useEffect(() => {

    // console.log(progress.toFixed(2));
    // console.log("results", results.items);
    // setProgressUp(progress);
  }, [progress]);

  return (
    <div className="audio">
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} controls preload="none">
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
});

export default connect(reduxState, reduxFunctions)(AudioPlayer);
