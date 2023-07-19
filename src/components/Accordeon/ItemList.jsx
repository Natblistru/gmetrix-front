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
                {/* {console.log(subtitle, dynamicPath)} */}
                {subtitle.path == null ? (
                  subtitle.anul == null ? (
                    <div className="text-block">{subtitle.name}</div>
                  ) : (
                    <div className="text-block">
                      <strong>{subtitle.anul}</strong> - {subtitle.eveniment}
                    </div>
                  )
                ) : (
                  <Link to={dynamicPath}>
                    {subtitle.name}
                  </Link>
                )}
              </div>
            </div>
            <div className="svg-sprite-vs-small result-perfect"></div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
