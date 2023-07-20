import React, { useEffect, useRef, useState } from 'react';

const AudioPlayer = (props) => {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    audioRef.current.src = process.env.PUBLIC_URL + props.path;
    setProgress(0);
  }, [props.currentSubject, props.path]);
  const handleTimeUpdate = () => {
    const audioElement = audioRef.current;
    const currentTime = audioElement.currentTime;
    const duration = audioElement.duration;

    // Рассчитываем процент прогресса
    const progressPercentage = (currentTime / duration) * 100;
    setProgress(progressPercentage);
  };

  return (
    <div className="audio">
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} controls preload="none">
        <source src={process.env.PUBLIC_URL +props.path} type="audio/mpeg" />
      </audio>
      {console.log(progress.toFixed(2))/* <div>{progress.toFixed(2)}%</div> */}
    </div>
  );
};

export default AudioPlayer;
