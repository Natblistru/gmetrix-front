import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import temeIstoriArray from "../../data/temeIstoria";
import "../../index.css";

const TableRow = (props) => {
  const rowData = props.rowData;
  const idx = props.ind;
  const classes = "row " + props.className;
  const dynamicPath = `${rowData.addressTestDisciplina}${rowData.addressTestSubtitle}${rowData.addressTestSubject}${rowData.addressTest}/1`;

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
    console.log(allQuizArray);
    const filteredQuizArray = allQuizArray.filter(
      (item) => item.testID == testID && item.subjectID == subjectId
    );

    console.log(filteredQuizArray);
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
    console.log(SumProcValue)
    if (foundedItem == undefined && SumProcValue==0) return null;
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
      {sumProc(rowData.subjectID, rowData.id, rowData) == 100 && (
        <div className="tbl-points" title="Cel mai bun rezultat">
          <div className="svg-sprite-vs-points profile-point-full"></div>
          <span className="points">
            <span className="earned">
              {" "}
              {rowData.quizArray.length * rowData.complexityNumber}
            </span>{" "}
            /{" "}
            <span className="max">
              {rowData.quizArray.length * rowData.complexityNumber}
            </span>
          </span>
        </div>
      )}
      {/* //test cu raspuns partial */}
      {sumProc(rowData.subjectID, rowData.id, rowData) > 0 &&
        sumProc(rowData.subjectID, rowData.id, rowData) < 100 &&
          (
            <div className="tbl-points" title="Cel mai bun rezultat">
              <div className="svg-sprite-vs-points profile-point-half"></div>
              <span className="points">
                <span className="earned">
                  {" "}
                  {Math.round(sumProc(rowData.subjectID, rowData.id, rowData) * (rowData.quizArray.length * rowData.complexityNumber) / 100)}
                </span>{" "}
                /{" "}
                <span className="max">
                  {rowData.quizArray.length * rowData.complexityNumber}
                </span>
              </span>
            </div>
          )}
      {/* //test cu raspuns minimal=0 */}
      {sumProc(rowData.subjectID, rowData.id, rowData) == 0 && (
        <div className="tbl-points" title="Cel mai bun rezultat">
          <div className="svg-sprite-vs-points profile-point-empty"></div>
          <span className="points">
            <span className="earned"> 0</span> /{" "}
            <span className="max">
              {rowData.quizArray.length * rowData.complexityNumber}
            </span>
          </span>
        </div>
      )}
      {/* //test cu fara raspuns */}
      {sumProc(rowData.subjectID, rowData.id, rowData) == null && (
        <div className="tbl-points" title="Cel mai bun rezultat">
          <div className="svg-sprite-vs-points profile-point-empty"></div>
          <span className="points">
            <span className="earned">
              {" "}
              {rowData.quizArray.length * rowData.complexityNumber}
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

const ItemTable = ({ list, className, tests }) => {
  const data = list;
  const classes = "table subjects-container " + className;

  return (
    <div className={classes}>
      {data.map((rowData, idx) => {
        rowData.quizArray.forEach((item) =>
          item.answers?.sort(() => Math.random() - 0.5)
        );
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
