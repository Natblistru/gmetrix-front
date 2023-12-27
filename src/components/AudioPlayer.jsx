import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import ContextData from './context/ContextData';
import { connect } from "react-redux";

const AudioPlayer = ({currentSubject, arraySubtitles, path,subjectID,arrayAudioLength, results,update, add, onProgressRecorded}) => {
  const {stateData, dispatchData} = React.useContext(ContextData)
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [currentResult, setCurrentResult] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  // console.log(currentSubject)
  // console.log(arraySubtitles) 
  // const currentSubtitle = arraySubtitles.filter((item) => item.subtopic_id === currentSubject)[0];
  const currentSubtitle = arraySubtitles[currentSubject]; 
  // console.log(currentSubtitle)

  useEffect(() => {
    audioRef.current.src = `http://localhost:8000/${process.env.PUBLIC_URL + path}`;
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
      }
    } else {
      setCurrentResult(null); 
    }
  }, [currentSubject, path]);

  useEffect(()=> {
    //console.log(results.items)
  },[results.items])


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
    // console.log(stateData.currentStudent)
    // console.log(currentSubtitle.subtopic_id)
    try {
      const response = await axios.post('http://localhost:8000/api/student-subtopic-progress', {
        student_id: stateData.currentStudent,
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
        <source src={`http://localhost:8000/${process.env.PUBLIC_URL + path}`} type="audio/mpeg" />
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
