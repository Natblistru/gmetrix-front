import React from "react";
import { Link } from "react-router-dom";
const ItemList = (props) => {
  let listItems = props.list;
  const classes = "subjects-container " + props.className;
  return (
    <div className={classes}>
      {listItems?.map((subtitle) => (
        <div key={subtitle.id} className="subject-item">
          <div className="title-item">
            <div className="num-item">{subtitle.id}.</div>
            <div className="name-item">
              {subtitle.path == null ? (
                subtitle.anul == null ? (
                  <div className="text-block">{subtitle.name}</div>
                ) : (
                  <div className="text-block"><strong>{subtitle.anul}</strong> - {subtitle.eveniment}</div>
                )
              ) : (<Link to={{ pathname: subtitle.path, state: { list: subtitle} }}>{subtitle.name}</Link>)}
            </div>
          </div>
          <div className="points">V</div>
        </div>
      ))}
    </div>
  );
};
export default ItemList;
