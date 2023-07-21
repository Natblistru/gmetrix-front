import React from "react";
import { Link } from "react-router-dom";
import "../../index.css";

const TableRow = (props) => {
  const rowData = props.rowData;
  const idx = props.ind;
  const classes = "row " + props.className;
  const dynamicPath = `${rowData.addressTestDisciplina}${rowData.addressTestSubtitle}${rowData.addressTestSubject}${rowData.addressTest}/1`;
  // console.log(dynamicPath)
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
      {/* <div className="tbl-points" title="Cel mai bun rezultat">
        <div className="svg-sprite-vs-points profile-point-full"></div>
        <span className="points">
          <span className="earned"> 1</span> / <span className="max">1</span>
        </span>
      </div> */}
      {/* //test cu raspuns partial (jumatate) */}
      {/* <div className="tbl-points" title="Cel mai bun rezultat">
        <div className="svg-sprite-vs-points profile-point-half"></div>
        <span className="points">
          <span className="earned"> 1</span> / <span className="max">2</span>
        </span>
      </div> */}
      {/* //test cu raspuns minimal=0 */}
      {/* <div className="tbl-points" title="Cel mai bun rezultat">
        <div className="svg-sprite-vs-points profile-point-empty"></div>
        <span className="points">
          <span className="earned"> 0</span> / <span className="max">1</span>
        </span>
      </div> */}
      {/* //test cu fara raspuns */}
      <div className="tbl-points" title="Cel mai bun rezultat">
        <div className="svg-sprite-vs-points profile-point-empty"></div>
        <span className="points">
          <span className="points"> 5</span>
        </span>
      </div>
    </div>
  );
};

const ItemTable = (props) => {
  const data = props.list;
  const classes = "table subjects-container " + props.className;
  return (
    <div className={classes}>
      {data.map((rowData, idx) => {
        rowData.quizArray.forEach((item) =>
          item.answers?.sort(() => Math.random() - 0.5)
        );
        return <TableRow rowData={rowData} ind={idx} key={idx} />;
      })}
    </div>
  );
};
export default ItemTable;
