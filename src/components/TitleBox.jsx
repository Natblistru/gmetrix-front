import { useState, useEffect } from "react";
import temeIstoriArray from "../data/temeIstoria";
import ProgressBar from "./ProgressBar";
import { connect } from "react-redux";

const TitleBox = ({
  className,
  subjectId,
  subtitleId,
  list,
  children,
  results,
  tests,
  exams,
}) => {
  const classes = "title-box " + className;
  const [procent, setProcent] = useState(0);

  useEffect(() => {
    // console.log(results.items);
    // console.log("subjectId", subjectId);
    // console.log("subtitleId", subtitleId);
    // console.log("list", list);

    if (subtitleId !== null && subtitleId !== undefined) {
      const filteredIds = temeIstoriArray
        .flatMap((item) =>
          item.subtitles.flatMap((subItem) => subItem.subjects)
        )
        .filter((subjectItem) => subjectItem.subtitleID == subtitleId)
        .map((subjectItem) => subjectItem.id);

      let SumProcValue = 0;
      let result;
      const user = "Current user";
      //console.log("filteredIds", filteredIds);
      filteredIds.forEach((id) => {
        result = sumProc(results.items, user, id);
        if (result !== null && result !== undefined && !isNaN(result))
          SumProcValue += result;
      });
      SumProcValue = Math.round(SumProcValue / filteredIds.length);
      setProcent(SumProcValue);
    } else if (list == undefined) {
      const filteredIds = temeIstoriArray
        .flatMap((item) =>
          item.subtitles.flatMap((subItem) => subItem.subjects)
        )
        .map((subjectItem) => subjectItem.id);

      let SumProcValue = 0;
      let result;
      const user = "Current user";

      filteredIds.forEach((id) => {
        result = sumProc(results.items, user, id);
        if (result !== null && result !== undefined && !isNaN(result))
          SumProcValue += result;
      });
      SumProcValue = Math.round(SumProcValue / filteredIds.length);
      setProcent(SumProcValue);
    }
  }, []);

  useEffect(() => {
    console.log(list);
    if (list !== undefined && !list.barem) {
      const user = "Current user";
      const userItems = tests.items.find((item) => item.user === user);
      if (!userItems) setProcent(0);
      // Используем метод flatMap() для получения всех элементов quizArray
      const allQuizArray = temeIstoriArray.flatMap((item) =>
        item.subtitles.flatMap((subtitle) =>
          subtitle.subjects.flatMap((subject) =>
            subject.teste.flatMap((test) => test.quizArray)
          )
        )
      );

      const filteredQuizArray = allQuizArray.filter(
        (item) => item.testID == list.id && item.subjectID == list.subjectID
      );
      //console.log("filteredQuizArray",filteredQuizArray)
      let SumProcValue = 0;
      let foundedItem;
      filteredQuizArray.forEach((el) => {
        foundedItem = userItems.tests.find(
          (item) =>
            item.id == el.subjectID &&
            item.quiz == el.testID &&
            item.item == el.id
        );
        if (foundedItem) SumProcValue += foundedItem.proc;
      });
      SumProcValue = Math.round(SumProcValue / filteredQuizArray.length);
      //console.log("SumProcValue",SumProcValue)
      setProcent(SumProcValue);
    } else if (list !== undefined && list.barem) {
      const user = "Current user";
      const userItems = exams.items.find((item) => item.user === user);
      if (!userItems) setProcent(0);
      else if (list.subiect == "1" || list.subiect == "3") {
        // Используем метод flatMap() для получения всех элементов quizArray
        const allowedAppNames = ["/examen-subiect1", "/examen-subiect3"];

        const allQuizArray_1_3 = temeIstoriArray.flatMap((item) =>
          item.subtitles.flatMap((subtitle) =>
            subtitle.id == list.subtitleID
              ? subtitle.aplicatii.flatMap((app) =>
                  allowedAppNames.includes(app.addressSubject)
                    ? app.quizArray
                    : []
                )
              : []
          )
        );
        const filteredQuizArray = allQuizArray_1_3.filter(
          (item) =>
            item.subiect == list.subiect && item.subjectID == list.subjectID
        );
        console.log(filteredQuizArray);
        let SumProcValue = 0;
        let foundedItem;
        filteredQuizArray.forEach((el) => {
          foundedItem = userItems.exams.find(
            (item) =>
              item.id == el.subtitleID &&
              item.subiect == el.subiect &&
              item.superitem == el.id &&
              item.item == el.id
          );
          if (foundedItem) SumProcValue += foundedItem.proc;
        });
        SumProcValue = Math.round(SumProcValue / filteredQuizArray.length);
        setProcent(SumProcValue);
        console.log(SumProcValue);
      } else if (list.subiect == "2") {
        // Используем метод flatMap() для получения всех элементов quizArray
        const allowedAppNames = ["/examen-subiect2"];

        const allQuizArray_2 = temeIstoriArray.flatMap((item) =>
          item.subtitles.flatMap((subtitle) =>
            subtitle.id == list.subtitleID
              ? subtitle.aplicatii.flatMap((app) =>
                  allowedAppNames.includes(app.addressSubject)
                    ? app.quizArray
                    : []
                )
              : []
          )
        );
        console.log(userItems);
        console.log(list);
        const filteredQuizArray = allQuizArray_2.filter(
          (item) =>
            item.subiect == list.subiect && item.subjectID == list.subjectID
        );
        console.log(filteredQuizArray);
        let SumProcValue = 0;
        let countItem = 0;
        filteredQuizArray.forEach((item) => {
          item.item.forEach((el) => {
            const foundedItem = userItems.exams.find(
              (examItem) =>
                examItem.id == el.subtitleID &&
                examItem.subiect == el.subiect &&
                examItem.superitem == el.superitem &&
                examItem.item == el.id
            ); 
            countItem++;
            if (foundedItem) SumProcValue += foundedItem.proc;
          });
        });
        
        SumProcValue = Math.round(SumProcValue / countItem);
        setProcent(SumProcValue);
        console.log(SumProcValue);
      }
    }
  }, [list]);

  useEffect(() => {
    if (subjectId !== null && subjectId !== undefined) {
      const user = "Current user";
      const result = sumProc(results.items, user, subjectId);
      if (result !== null && result !== undefined)
        setProcent(Math.round(result));
    } else if (subtitleId !== null && subtitleId !== undefined) {
      const filteredIds = temeIstoriArray
        .flatMap((item) =>
          item.subtitles.flatMap((subItem) => subItem.subjects)
        )
        .filter((subjectItem) => subjectItem.subtitleID == subtitleId)
        .map((subjectItem) => subjectItem.id);

      let SumProcValue = 0;
      let result;
      const user = "Current user";

      filteredIds.forEach((id) => {
        result = sumProc(results.items, user, id);
        if (result !== null && result !== undefined && !isNaN(result))
          SumProcValue += result;
      });
      SumProcValue = Math.round(SumProcValue / filteredIds.length);
      setProcent(SumProcValue);
    } else if (list == undefined) {
      const filteredIds = temeIstoriArray
        .flatMap((item) =>
          item.subtitles.flatMap((subItem) => subItem.subjects)
        )
        .map((subjectItem) => subjectItem.id);

      let SumProcValue = 0;
      let result;
      const user = "Current user";

      filteredIds.forEach((id) => {
        result = sumProc(results.items, user, id);
        if (result !== null && result !== undefined && !isNaN(result))
          SumProcValue += result;
      });
      SumProcValue = Math.round(SumProcValue / filteredIds.length);
      setProcent(SumProcValue);
    }
    if (list !== undefined && !list.barem) {
      const user = "Current user";
      const userItems = tests.items.find((item) => item.user === user);
      if (!userItems) return null;
      // Используем метод flatMap() для получения всех элементов quizArray
      const allQuizArray = temeIstoriArray.flatMap((item) =>
        item.subtitles.flatMap((subtitle) =>
          subtitle.subjects.flatMap((subject) =>
            subject.teste.flatMap((test) => test.quizArray)
          )
        )
      );
      const filteredQuizArray = allQuizArray.filter(
        (item) => item.testID == list.id && item.subjectID == list.subjectID
      );

      let SumProcValue = 0;
      let foundedItem;
      filteredQuizArray.forEach((el) => {
        foundedItem = userItems.tests.find(
          (item) =>
            item.id == el.subjectID &&
            item.quiz == el.testID &&
            item.item == el.id
        );
        if (foundedItem) SumProcValue += foundedItem.proc;
      });
      SumProcValue = Math.round(SumProcValue / filteredQuizArray.length);
      console.log("SumProcValue", SumProcValue);
      setProcent(SumProcValue);
    } else if (list !== undefined && list.barem) {
      const user = "Current user";
      const userItems = exams.items.find((item) => item.user === user);
      if (!userItems) setProcent(0);
      else if (list.subiect == "1" || list.subiect == "3") {
        // Используем метод flatMap() для получения всех элементов quizArray
        const allowedAppNames = ["/examen-subiect1", "/examen-subiect3"];

        const allQuizArray_1_3 = temeIstoriArray.flatMap((item) =>
          item.subtitles.flatMap((subtitle) =>
            subtitle.id == list.subtitleID
              ? subtitle.aplicatii.flatMap((app) =>
                  allowedAppNames.includes(app.addressSubject)
                    ? app.quizArray
                    : []
                )
              : []
          )
        );
        const filteredQuizArray = allQuizArray_1_3.filter(
          (item) =>
            item.subiect == list.subiect && item.subjectID == list.subjectID
        );
        let SumProcValue = 0;
        let foundedItem;
        filteredQuizArray.forEach((el) => {
          foundedItem = userItems.exams.find(
            (item) =>
              item.id == el.subtitleID &&
              item.subiect == el.subiect &&
              item.superitem == el.id &&
              item.item == el.id
          );
          if (foundedItem) SumProcValue += foundedItem.proc;
        });
        SumProcValue = Math.round(SumProcValue / filteredQuizArray.length);
        setProcent(SumProcValue);
      } else if (list.subiect == "2") {
        // Используем метод flatMap() для получения всех элементов quizArray
        const allowedAppNames = ["/examen-subiect2"];

        const allQuizArray_2 = temeIstoriArray.flatMap((item) =>
          item.subtitles.flatMap((subtitle) =>
            subtitle.id == list.subtitleID
              ? subtitle.aplicatii.flatMap((app) =>
                  allowedAppNames.includes(app.addressSubject)
                    ? app.quizArray
                    : []
                )
              : []
          )
        );
        console.log(userItems);
        console.log(list);
        const filteredQuizArray = allQuizArray_2.filter(
          (item) =>
            item.subiect == list.subiect && item.subjectID == list.subjectID
        );
        console.log(filteredQuizArray);
        let SumProcValue = 0;
        let countItem = 0;
        filteredQuizArray.forEach((item) => {
          item.item.forEach((el) => {
            const foundedItem = userItems.exams.find(
              (examItem) =>
                examItem.id == el.subtitleID &&
                examItem.subiect == el.subiect &&
                examItem.superitem == el.superitem &&
                examItem.item == el.id
            ); 
            countItem++;
            if (foundedItem) SumProcValue += foundedItem.proc;
          });
        });
        
        SumProcValue = Math.round(SumProcValue / countItem);
        setProcent(SumProcValue);
        console.log(SumProcValue);
      }
    }
  }, [results.items, tests.items, exams.items]);

  const sumProc = (items, user, id) => {
    const userItems = items.find((item) => item.user === user);
    if (!userItems) return 0;

    const filteredItems = userItems.subject.filter((item) => item.id == id);
    const procSum = filteredItems.reduce((acc, item) => acc + item.proc, 0);

    return procSum / filteredItems.length;
  };

  return (
    <div className={classes}>
      <div className="title-img">
        <img src={process.env.PUBLIC_URL + "/images/parchment.png"} alt="" />
        <h1>{children}</h1>
      </div>
      <ProgressBar proc={procent} />
    </div>
  );
};
const reduxState = (state) => ({
  results: state.results,
  tests: state.tests,
  exams: state.exams,
});
export default connect(reduxState, null)(TitleBox);
