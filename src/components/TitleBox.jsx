import { useState, useEffect } from "react";
import temeIstoriArray from "../data/temeIstoria";
import ProgressBar from "./ProgressBar";
import { connect } from "react-redux";

const TitleBox = ({ className, subjectId, subtitleId, children, results }) => {
  const classes = "title-box " + className;
  const [procent, setProcent] = useState(0);

  useEffect(() => {
    if (subjectId !== null && subjectId !== undefined) {

      const user = "Current user";
      const result = sumProc(results.items, user, subjectId);
      if (result !== null && result !== undefined) setProcent(Math.round(result));
  
    } else if (subtitleId !== null && subtitleId !== undefined) {
      const filteredIds = temeIstoriArray
        .flatMap((item) =>
          item.subtitles.flatMap((subItem) => subItem.subjects)
        )
        .filter((subjectItem) => subjectItem.subtitleID == subtitleId)
        .map((subjectItem) => subjectItem.id);

      let SumProcValue = 0;
      let result;
      const user = "Current user";

      filteredIds.forEach((id) => {
        result = sumProc(results.items, user, id);
        if (result !== null && result !== undefined && !isNaN(result)) SumProcValue += result;
      });
      SumProcValue = Math.round(SumProcValue / filteredIds.length);
      setProcent(SumProcValue);

    } else {
      const filteredIds = temeIstoriArray
        .flatMap((item) =>
          item.subtitles.flatMap((subItem) => subItem.subjects)
        )
        .map((subjectItem) => subjectItem.id);

      let SumProcValue = 0;
      let result;
      const user = "Current user";

      filteredIds.forEach((id) => {
        result = sumProc(results.items, user, id);
        if (result !== null && result !== undefined && !isNaN(result)) SumProcValue += result;
      });
      SumProcValue = Math.round(SumProcValue / filteredIds.length);
      setProcent(SumProcValue);
    }
  }, [results.items]);

  const sumProc = (items, user, id) => {
    const userItems = items.find(item => item.user === user);
    if (!userItems) return 0;
  
    const filteredItems = userItems.subject.filter(item => item.id == id);
    const procSum = filteredItems.reduce((acc, item) => acc + item.proc, 0);
  
    return procSum / filteredItems.length;
  };


  return (
    <div className={classes}>
      <div className="title-img">
        <img src={process.env.PUBLIC_URL + "/images/parchment.png"} alt="" />
        <h1>{children}</h1>
      </div>
      <ProgressBar proc={procent} />
    </div>
  );
};
const reduxState = (state) => ({
  results: state.results,
});
export default connect(reduxState, null)(TitleBox);
