import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentTestsSuccess } from '../ReduxComp/actions';
import { scroller } from 'react-scroll'
import ItemAccordeon from "./ItemAccordeon";
import ItemList from "./ItemList";
import ItemTable from "./ItemTable";
import SimpleSlider from "../Slider/SimpleSlider";
import Audio from "../AudioPlayer";
import ProgressSteps from "../ProgressSteps/ProgressSteps";
import FlipCardNou from "../FlipCards/FlipCardNou";
import '../FlipCards/flipCardNou.scss';

const ListSubAccordeon = (props) => {
const dispatch = useDispatch();
const [currentSubject, setCurrentSubject] = useState(0);
const currentTopicObject = useSelector(state => state.currentTopic);
const currentTopic = currentTopicObject.currentTopic;

const [arraySubtitles, setArraySubtitles] = useState(currentTopic.subtitles);
// console.log(currentTopic)

const restImpartire = currentTopic.flip_cards.length % 3;
const lungimeCards = currentTopic.flip_cards.length;

// console.log(arraySubtitles)
const handleProgressRecorded = (updatedTopic) => {
  // console.log(updatedTopic)
  setArraySubtitles(updatedTopic);
  if (props.onProgressTopicRecorded) {
    const sum = updatedTopic.reduce((acc, current) => acc + current.procentSubtopic, 0);
    const average = sum / updatedTopic.length;
    props.onProgressTopicRecorded(average);
  }
};

const classes = " " + props.className;
// let arraySubject = props.subtema.vomAfla;

// let arrayTests = props.subtema.teste;
// console.log(currentTopic)
// let arraySubtitles = currentTopic.subtitles; 
// console.log(arraySubtitles);
// console.log(arraySubtitles[currentSubject].images);
let transformedArrayImages = arraySubtitles[currentSubject].images.map(function(item) {
  return item.path;
});

useEffect(()=>{
  fetchTest();
  // fetchSummativeTest();
},[])

const fetchTest = async () => {

  const teacher_topic_id = currentTopic.teacher_topic_id;
  try {
      const res = await axios.get(`/api/formativetest?topic=${teacher_topic_id}`);
      // console.log(res.data);
      dispatch(fetchCurrentTestsSuccess(res.data));
  } catch (err) {
      console.error(err);
  }
}

useEffect(()=> {

},[currentSubject]);

const clickSubjectHandler = (idx) => {
  setCurrentSubject(idx);
};

const handleItemClick = (idx) => {
  setCurrentSubject(idx);

  scroller.scrollTo('video', {
    duration: 800,
    delay: 0,
    smooth: 'easeInOutQuart'
  });
};
  // if (!currentTopic || !arrayTests) {
  //   return null; // Возвращаем null или другой компонент-заглушку
  // }
// console.log(transformedArrayImages)
  return (
    <div className={classes}>
      <ItemAccordeon titlu="La aceasta lectie vom afla:" {...props} open={true}>

        <ItemList {...props} list={arraySubtitles} type={"subtopic"} onItemClick={handleItemClick}/>
      </ItemAccordeon>
      <ItemAccordeon
        titlu="Studiaza prin scheme"
        {...props}
        className="blockPB50" open={true}
        name="video"
      > 
        <div id="video">
          <SimpleSlider {...props} images={transformedArrayImages} />
          <Audio 
            path={arraySubtitles[currentSubject].audio_path} 
            currentSubject={currentSubject} 
            arraySubtitles = {arraySubtitles}
            onProgressRecorded={handleProgressRecorded}/>
          <ProgressSteps list={arraySubtitles} onClick={clickSubjectHandler} activeCircle={currentSubject+1}/>
        </div>
      </ItemAccordeon>
      <ItemAccordeon titlu="Repetă cu cartele-flip" {...props} open={true}>
      <div className="Cards">
        {currentTopic.flip_cards.map((subject, subjectIndex) => (
           <FlipCardNou title={subject.sarcina} 
                        key={subjectIndex} 
                        dangerousHTML={subject.rezolvare}
                        ultimul={
                          (restImpartire === 0 && subjectIndex >= lungimeCards - 3) ||
                          (restImpartire === 1 && subjectIndex === lungimeCards - 1) ||
                          (restImpartire === 2 && subjectIndex >= lungimeCards - 2)
                        } 
            />
        ))}
      </div>
      </ItemAccordeon>
      <ItemAccordeon titlu="Evaluare (teste)" {...props} open={true}>
        <ItemTable {...props} list1={currentTopic.tests} />
      </ItemAccordeon>
    </div>
  );
};

export default ListSubAccordeon;

{/* <ItemTable {...props} list={arrayTests} list1={currentTopic.tests} /> */}
