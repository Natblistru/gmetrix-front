import React, { useState, useEffect } from 'react';

function Timer({ initialTime, onFinish,  isFinished }) {
  const [time, setTime] = useState(initialTime);
  const [timerInterval, setTimerInterval] = useState(null); 
  const [timeCheltuit, setTimeCheltuit] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);

    setTimerInterval(interval); 

    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatCheltTime = (timeChelt) => {
    const hours = Math.floor(timeChelt / 3600);
    const minutes = Math.floor((timeChelt % 3600) / 60);
    const seconds = timeChelt % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (time === 0) {
      setTimeCheltuit(initialTime - time);
      onFinish(); // Вызываем функцию onFinish из пропсов, если время достигло нуля
    }
  }, [time, onFinish]);

  useEffect(() => {
    if (isFinished) {
      setTimeCheltuit(initialTime - time);
      clearInterval(timerInterval); // Останавливаем таймер при изменении значения isFinished
    }
  }, [isFinished, time, timerInterval, timeCheltuit]);

  return <span>{!isFinished && formatTime()} {isFinished && `Timp cheltuit:  ${formatCheltTime(timeCheltuit)}`}</span>;;
}

export default Timer;
