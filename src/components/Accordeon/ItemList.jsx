import React from "react";
import { Link } from "react-router-dom";

const ItemList = (props) => {
  let listItems = props.list;
  const classes = "subjects-container " + props.className;

  return (
    <div className={classes}>
      {listItems?.map((subtitle, idx) => {
        // console.log(subtitle);
        const dynamicPath = `${subtitle.addressDisciplina}${subtitle.addressSubtitle}${subtitle.addressSubject}`;
        return (
          <div key={idx} className="subject-item">
            <div className="title-item">
              <div className="num-item">{subtitle.id}.</div>
              <div className="name-item">
                {subtitle.path == null ? (
                  subtitle.anul == null ? (
                    <div className="text-block">{subtitle.name}</div>
                  ) : (
                    <div className="text-block">
                      <strong>{subtitle.anul}</strong> - {subtitle.eveniment}
                    </div>
                  )
                ) : (
                  <Link to={{ pathname: dynamicPath, state: { list: subtitle } }}>
                    {subtitle.name}
                  </Link>
                )}
              </div>
            </div>
            <div className="points">V</div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
