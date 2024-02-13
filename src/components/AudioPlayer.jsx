import React, { useRef, useState, useEffect } from 'react';
import axios from "axios";
import { useSelector } from "react-redux";

const AudioPlayer = ({currentSubject, arraySubtitles, path, onProgressRecorded}) => {
  const currentStudentObject = useSelector(state => state.currentStudent);
  const currentStudent = currentStudentObject ? currentStudentObject.currentStudent : 1;
  
  const audioRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  // console.log(currentSubject)
  // console.log(arraySubtitles) 
    const currentSubtitle = arraySubtitles[currentSubject]; 
  // console.log(currentSubtitle)

  useEffect(() => {
    // Verificăm dacă există un subiect curent și o cale audio asociată
    if (currentSubtitle && currentSubtitle.audio_path && audioRef.current) {
      // Setăm proprietatea currentSrc a elementului audio folosind calea audio asociată
     
      audioRef.current.src = `http://localhost:8000/${currentSubtitle.audio_path}` ;
      console.log(currentSubtitle.audio_path)
      console.log(audioRef.current.src)
      console.log(audioRef.current) 
    }
  }, [currentSubject, arraySubtitles]);

  const handleTimeUpdate = () => {
    const audioElement = audioRef.current;
    const currentTime = audioElement.currentTime;
    const duration = audioElement.duration;

    const progressPercentage = (currentTime / duration) * 100;
    // setProgress(progressPercentage);

    if (progressPercentage === 100 && !isRecording) {
      recordProgressInDatabase();
      setIsRecording(true);
    }
  };

  const recordProgressInDatabase = async () => {
    console.log(currentStudent)
    console.log(currentSubtitle.subtopic_id)
    try {
      const response = await axios.post('http://localhost:8000/api/student-subtopic-progress', {
        student_id: currentStudent,
        subtopic_id: currentSubtitle.subtopic_id,
        progress_percentage: 100
      });
      // console.log('Progres înregistrat în baza de date:', response.data)
      if (onProgressRecorded) {

        // console.log(currentSubject)
        // console.log(arraySubtitles) 
        // console.log(currentSubtitle)
        const updatedArraySubtitles = arraySubtitles.map((item) => {
          if (item.subtopic_id === currentSubtitle.subtopic_id) {
            return { ...item, procentSubtopic: 100 };
          }
          return item;
        });
        onProgressRecorded(updatedArraySubtitles);
        setIsRecording(false);
      }
    } catch (error) {
      console.error('Eroare la înregistrarea progresului în baza de date:', error);
    }
  };
console.log(`http://localhost:8000/${path}`)
console.log(audioRef)
  return (
    <div className="audio">
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} controls preload="auto">
        <source src={`http://localhost:8000/${path}`} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default AudioPlayer;
