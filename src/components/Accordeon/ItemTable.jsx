import React, { useEffect } from "react";
import ContextData from "../context/ContextData";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import temeIstoriArray from "../../data/temeIstoria";
import "../../index.css";

const TableRow = (props) => {
  const {stateData, dispatchData} = React.useContext(ContextData)

  const rowData = props.rowData;
  const idx = props.ind;
  const classes = "row " + props.className;

  const parts = stateData.currentTheme.path_tema.split("/");
  const addressDisciplina = "/" + parts[1];
  const addressSubtitle = "/" + parts.slice(2).join("/");

  const dynamicPath = `${addressDisciplina}${addressSubtitle}${rowData.path}${rowData.addressTest}/1?teacher=1&level=1&disciplina=${stateData.currentSubject.subject_id}&theme=${stateData.currentTheme.tema_id}`;       
  // const dynamicPath = `${rowData.addressTestDisciplina}${rowData.addressTestSubtitle}${rowData.addressTestSubject}${rowData.addressTest}/1`;

  const sumProc = (subjectId, testID, subtitle) => {
    const user = "Current user";
    const userItems = props.testsItems.find((item) => item.user === user);
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
      (item) => item.testID == testID && item.subjectID == subjectId
    );

    //console.log("userItems.tests",userItems.tests);
    //console.log("filteredQuizArray",filteredQuizArray)
    let SumProcValue = 0;
    let iterration = 0;
    let foundedItem;
    filteredQuizArray.forEach((el) => {
      foundedItem = userItems.tests.find(
        (item) =>
          item.id == el.subjectID &&
          item.quiz == el.testID &&
          item.item == el.id
      );
      if (foundedItem) {SumProcValue += foundedItem.proc; iterration++}
    });
   // console.log("userItems.tests",userItems.tests)
    // console.log("idx",idx)
    if (foundedItem == undefined && iterration==0) return null;
    return Math.round(SumProcValue / filteredQuizArray.length);
  };

  return (
    <div className={classes}>
      <div className="column">
        <div>
          <span>{idx + 1}. </span>
          <Link to={dynamicPath}> {rowData.name}</Link>
        </div>

        <div className="cursiv">
          <em>Complexitatea: {rowData.complexity}</em>
        </div>
      </div>
      {/* //test cu raspuns maximal */}
      {rowData.testResult == (rowData.length * rowData.complexityNumber) && (
        <div className="tbl-points" title="Cel mai bun rezultat">
          <div className="svg-sprite-vs-points profile-point-full"></div>
          <span className="points">
            <span className="earned">
              {" "}
              {rowData.length * rowData.complexityNumber}
            </span>{" "}
            /{" "}
            <span className="max">
              {rowData.length * rowData.complexityNumber}
            </span>
          </span>
        </div>
      )}
      {/* //test cu raspuns partial */}
      {rowData.testResult < (rowData.length** rowData.complexityNumber) && rowData.testResult > 0 && (
            <div className="tbl-points" title="Cel mai bun rezultat">
              <div className="svg-sprite-vs-points profile-point-half"></div>
              <span className="points">
                <span className="earned">
                  {" "}
                  {Math.round(rowData.testResult * (rowData.length * rowData.complexityNumber) / 100)}
                  {/* {Math.round(sumProc(rowData.subjectID, rowData.id, rowData) * (rowData.quizArray.length * rowData.complexityNumber) / 100)} */}
                </span>{" "}
                /{" "}
                <span className="max">
                  {rowData.length * rowData.complexityNumber}
                </span>
              </span>
            </div>
          )}
      {/* //test cu raspuns minimal=0 */}
      {rowData.testResult == 0 && (
        <div className="tbl-points" title="Cel mai bun rezultat">
          <div className="svg-sprite-vs-points profile-point-empty"></div>
          <span className="points">
            <span className="earned"> 0</span> /{" "}
            <span className="max">
              {rowData.length * rowData.complexityNumber}
            </span>
          </span>
        </div>
      )}
      {/* //test cu fara raspuns */}
      {rowData.testResult == null && (
        <div className="tbl-points" title="Cel mai bun rezultat">
          <div className="svg-sprite-vs-points profile-point-empty"></div>
          <span className="points">
            <span className="earned">
              {" "}
              {rowData.length * rowData.complexityNumber}
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

const ItemTable = ({ list, className, tests, list1 }) => {
  // const data = list;
  const classes = "table subjects-container " + className;
  const data = list1;
  console.log(data);
  return (
    <div className={classes}>
      {data.map((rowData, idx) => {
        // rowData.quizArray.forEach((item) =>
        //   item.answers?.sort(() => Math.random() - 0.5)
        // );
        return (
          <TableRow
            rowData={rowData}
            ind={idx}
            key={idx}
            testsItems={tests.items}
          />
        );
      })}
    </div>
  );
};

const reduxState = (state) => ({
  tests: state.tests,
});
export default connect(reduxState, null)(ItemTable);
