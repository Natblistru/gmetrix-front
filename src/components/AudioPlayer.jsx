import React, { useEffect, useRef, useState } from 'react';

const AudioPlayer = (props) => {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    audioRef.current.src = process.env.PUBLIC_URL + props.path;
    setProgress(0);
    const interval = setInterval(calculateProgress, 3000);
    return () => clearInterval(interval); 
  }, [props.currentSubject, props.path]);

  const calculateProgress = () => {
    const audioElement = audioRef.current;
    const currentTime = audioElement.currentTime;
    const duration = audioElement.duration;

    // Рассчитываем процент прогресса
    const progressPercentage = (currentTime / duration) * 100;
    setProgress(progressPercentage);
  };

  return (
    <div className="audio">
      <audio ref={audioRef} controls preload="none">
        <source src={process.env.PUBLIC_URL +props.path} type="audio/mpeg" />
      </audio>
      {console.log(progress.toFixed(2))}

    </div>
  );
};

export default AudioPlayer;
