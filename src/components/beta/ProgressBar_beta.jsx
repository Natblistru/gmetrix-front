import React from "react";

const ProgressBar_beta = (props) => {

  return (
    <div className="topic-progress1">
      <div className="progress-wrap1 progress1" title={props.proc !== 0 ? `Ai realizat ${Math.round(props.proc)}%` : null}>
        <div className="progress-bar1 progress1" style={{ left: `${props.proc}%` }}></div>
      </div>
    </div>
  );
};
export default ProgressBar_beta;
