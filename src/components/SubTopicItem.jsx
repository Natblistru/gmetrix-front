import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import temeIstoriArray from "../data/temeIstoria";
import ProgressBar from "./ProgressBar";

const SubTopicItem = ({subTit,idx,results,tests,exams, allTems}) => {
  const subtitle = subTit;
  const [procent, setProcent] = useState(0);
  const [nota, setNota] = useState(0);

  useEffect(() => {
    if (subtitle.id !== null && subtitle.id !== undefined) {
   //   console.log(allTems);
      const filteredIds = allTems
        .flatMap((item) =>
          item.subtitles.flatMap((subItem) => subItem.subjects)
        )
        .filter((subjectItem) => subjectItem.subtitleID == subtitle.id)
        .map((subjectItem) => subjectItem.id);
      
      let SumProcValue = 0;
      let result;
      const user = "Current user";

      filteredIds.forEach((id) => {
        result = sumProc(results.items, user, id);
        if (result !== null && result !== undefined && !isNaN(result)) SumProcValue += result;
      });
      SumProcValue = Math.round(SumProcValue / filteredIds.length);
      setProcent(SumProcValue);
    }
  }, [results.items]);

  useEffect(()=>{
    if (subtitle.id !== null && subtitle.id !== undefined) {
      const user = "Current user";
      const userItems = tests.items.find((item) => item.user === user);
      if (!userItems) setNota(0);
      // Используем метод flatMap() для получения всех элементов quizArray у тестов
      const allQuizArray = allTems.flatMap((item) =>
        item.subtitles.flatMap((subtitle) =>
          subtitle.subjects.flatMap((subject) =>
            subject.teste.flatMap((test) => test.quizArray)
          )
        )
      );
      const filteredQuizArray = allQuizArray.filter(
        (item) => item.subtitleID == subtitle.id
      );
      //console.log("filteredQuizArray",filteredQuizArray)
      let SumProcValue = 0;
      let foundedItem;
      let numLength = 0;
      filteredQuizArray.forEach((el) => {
   //     console.log(userItems.tests)
        foundedItem = userItems.tests.find(
          (item) =>
            item.id == el.subjectID &&
            item.quiz == el.testID &&
            item.item == el.id
        );
        if (foundedItem) {SumProcValue += foundedItem.proc; numLength++};
      });

      // Используем метод flatMap() для получения всех элементов quizArray у Subject I,III
      const userItemsExams = exams.items.find((item) => item.user === user);
      if (!userItemsExams) setNota(0);      
      // const allQuizArray_1_3 = allTems.flatMap((item) =>
      //   item.subtitles.flatMap((subtitle) =>
      //     subtitle.aplicatii.flatMap((app) => app.quizArray)
      //     )
      // );
      let allowedAppNames = ["/examen-subiect1", "/examen-subiect3"];
      const allQuizArray_1_3 = allTems.flatMap((item) =>
        item.subtitles.flatMap((subtit) =>
        subtit.id == subtitle.id
            ? subtit.aplicatii.flatMap((app) =>
                allowedAppNames.includes(app.addressSubject)
                  ? app.quizArray
                  : []
              )
            : []
        )
      );





      const filteredQuizArray_1_3 = allQuizArray_1_3.filter(
        (item) => item.subtitleID == subtitle.id
      );
      //console.log("filteredQuizArray",filteredQuizArray)
      // let SumProcValue = 0;
      foundedItem = null;
      // let numLength = 0;
      filteredQuizArray_1_3.forEach((el) => {
   //     console.log(userItemsExams.exams)
        foundedItem = userItemsExams.exams.find(
          (item) =>
          item.id == el.subtitleID &&
          item.subiect == el.subiect &&
          item.superitem == el.id &&
          item.item == el.id
        );
        if (foundedItem) {SumProcValue += foundedItem.proc; numLength++};
      });

            // Используем метод flatMap() для получения всех элементов quizArray у Subject II
              // const allQuizArray_2 = allTems.flatMap((item) =>
              // item.subtitles.flatMap((subtitle) =>
              //   subtitle.aplicatii.flatMap((app) => 
              //   app.quizArray.flatMap((el) => el.item))
              //   )
              // )
              allowedAppNames = ["/examen-subiect2"];
              const allQuizArray_2 = allTems.flatMap((item) =>
              item.subtitles.flatMap((subtit) =>
                subtit.id === subtitle.id
                  ? subtit.aplicatii.flatMap((app) =>
                      allowedAppNames.includes(app.addressSubject)
                        ? app.quizArray.flatMap((el) => el.item)
                        : []
                    )
                  : []
              )
            );


            const filteredQuizArray_2 = allQuizArray_2.filter(
              (item) => item.subtitleID == subtitle.id
            );
            //console.log("filteredQuizArray",filteredQuizArray)
            // let SumProcValue = 0;
            foundedItem = null;
            // let numLength = 0;
            filteredQuizArray_2.forEach((el) => {
              foundedItem = userItemsExams.exams.find(
                (item) =>
                item.id == el.subtitleID &&
                item.subiect == el.subiect &&
                item.superitem == el.superitem &&
                item.item == el.id
              );
              if (foundedItem) {SumProcValue += foundedItem.proc; numLength++};
            });
      
     //       console.log("SumProcValue",SumProcValue)
     //       console.log("numLength",numLength) 
      if(numLength>0) SumProcValue = Math.round(SumProcValue / numLength / 10);
     
      setNota(SumProcValue);
    }
  },[tests.items,exams.items])

  const sumProc = (items, user, id) => {
    const userItems = items.find(item => item.user === user);
    if (!userItems) return 0;
  
    const filteredItems = userItems.subject.filter(item => item.id == id);
    const procSum = filteredItems.reduce((acc, item) => acc + item.proc, 0);
  
    return procSum / filteredItems.length;
  };
// console.log(subtitle.addressDisciplina);
// console.log(subtitle.address);
  return (
    <li key={idx}>
      <div className="subtopic-header">
        <span className="num"></span>
        <h4>
          {/* <Link to='/tema1'>{subtitle.name}</Link> */}
          <Link to={`${subtitle.addressDisciplina}${subtitle.address}`}>
            {subtitle.name}
          </Link>
        </h4>
      </div>
      <ProgressBar proc={procent} nota={nota}/>
    </li>
  );
};
const reduxState = (state) => ({
  results: state.results,
  tests: state.tests,
  exams: state.exams
});
export default connect(reduxState, null)(SubTopicItem);
