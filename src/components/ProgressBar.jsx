import React from "react";

const ProgressBar = (props) => {
  return (
    <span className="topic-progress">
      {props.nota !== null && props.nota !== undefined && (
        <span className="crc-mark" title="nota">
          {props.nota}
        </span>
      )}
      <span
        className="progres-prcnt"
        title={props.proc !== 0 ? `Ai studiat ${props.proc}%` : null}
      >
        <span className="back-progress"></span>
        <span className="value-progress" style={{ width: props.proc }}>
          <span className="for-progress"></span>
        </span>
      </span>
    </span>
  );
};
export default ProgressBar;
