import React, { useState, useEffect } from 'react';

const Timer = ({ reset, setResetTimer }) => {
  const initialTime = 3000; // 50 minutes in seconds (50 * 60 = 3000 seconds)
  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem('timer');
    return savedTime !== null ? parseInt(savedTime, 10) : initialTime;
  });

  useEffect(() => {
    const countdown = setInterval(() => {
      setTime(prevTime => {
        const newTime = prevTime - 1;
        localStorage.setItem('timer', newTime); // Save the remaining time in localStorage
        return newTime;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    return () => {
      localStorage.removeItem('timer'); // Clean up localStorage when the component is unmounted
    };
  }, []);

  useEffect(() => {
    if (reset) {
      setTime(initialTime);
      setResetTimer(prev => !prev)
    }
  }, [reset]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      {formatTime(time)}
    </div>
  );
};

export default Timer;
