import React from "react";
import { Link } from "react-router-dom";
import "../../index.css";

const TableRow = (props) => {
  const rowData = props.rowData;
  const idx = props.ind;
  const classes = "row " + props.className;
  return (
    <div className={classes}>
      <div className="column">
        <div>
            <span>{idx + 1}. </span><Link to={{ pathname: rowData.path, state: { list: rowData} }}> {rowData.name}</Link>
        </div>
        
        <div className="cursiv"><em>Complexitatea: {rowData.complexity}</em></div>
      </div>
      <div>  V </div>
    </div>
  );
};

const ItemTable = (props) => {
  const data = props.list;
  const classes = "table subjects-container " + props.className;

  return (
    <div className={classes}>
      {data.map((rowData, idx) => {
        rowData.quizArray.forEach((item)=> item.answers.sort(() => Math.random() - 0.5));
        return <TableRow rowData={rowData} ind={idx} key={rowData.id}/>;
      })}
    </div>
  );
};
export default ItemTable;
