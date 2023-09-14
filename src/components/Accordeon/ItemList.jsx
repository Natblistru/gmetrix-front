import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const ItemList = ({ list, className, results }) => {
  let listItems = list;
  const classes = "subjects-container " + className;
  let procProgress = 0;

  const proc = (subjectId, audioId) => {
    const user = "Current user";
    const userItems = results.items.find((item) => item.user === user);
    if (!userItems) return 0;
    const vomAfla = userItems.subject.find(
      (item) => item.id == subjectId && item.audio == audioId
    );
    if (vomAfla) return vomAfla.proc;
    return 0;
  };

  const sumProc = (subjectId,subtitle) => {
    const user = "Current user";
    const userItems = results.items.find((item) => item.user === user);
    if (!userItems) return 0;
    // console.log(userItems.subject);
    // console.log(subjectId);
    // console.log(subtitle);   
    const filteredItems = userItems.subject.filter(item =>
      subtitle.vomAfla.some(subtitleItem =>
        item.id == subtitleItem.subjectID && item.audio == subtitleItem.id
      )
    );
    const procSum = filteredItems.reduce((acc, item) => acc + item.proc, 0);

    return procSum / filteredItems.length;
  };

  return (
    <div className={classes}>
      {listItems?.map((subtitle, idx) => {
        const dynamicPath = `${subtitle.addressDisciplina}${subtitle.addressSubtitle}${subtitle.addressSubject}`;
        return (
          <div key={idx} className="subject-item">
            <div className="title-item">
              <div className="num-item">{subtitle.id}.</div>
              <div className="name-item">
                {console.log(subtitle, dynamicPath)}
                {console.log(subtitle.name)}
                {subtitle.path == null ? (
                  subtitle.anul == null ? (
                    <div className="text-block">{subtitle.name}</div>
                  ) : (
                    <div className="text-block">
                      <strong>{subtitle.anul}</strong> - {subtitle.eveniment}
                    </div>
                  )
                ) : (

                  <Link to={dynamicPath}>{subtitle.name}</Link>
                )}
              </div>
            </div>
            {subtitle.path && subtitle.vomAfla && sumProc(subtitle.subjectID,subtitle) == 100 && (
              <div className="svg-sprite-vs-small result-perfect"></div>
            )}
            {!subtitle.anul &&
              !subtitle.path &&
              proc(subtitle.subjectID, subtitle.id) == 100 && (
                <div className="svg-sprite-vs-small result-perfect"></div>
              )}
          </div>
        );
      })}
    </div>
  );
};

const reduxState = (state) => ({
  results: state.results,
});
export default connect(reduxState, null)(ItemList);
