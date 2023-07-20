import { useState, useEffect } from "react";
import temeIstoriArray from "../data/temeIstoria";
import ProgressBar from "./ProgressBar";
import { connect } from "react-redux";

const TitleBox = ({ className, subjectId, subtitleId, children, results }) => {
  const classes = "title-box " + className;
  const [procent, setProcent] = useState(0);

  useEffect(() => {
    console.log(results.items);
    console.log("subjectId", subjectId);

    if (subjectId !== null && subjectId !== undefined) {
      const foundObject = results.items.find((item) => {
        return item.subject.find((subItem) => subItem.id === subjectId);
      });

      let procValue = null;

      if (foundObject) {
        procValue = foundObject.subject.find(
          (subItem) => subItem.id === subjectId
        )?.proc;
      }
      if (procValue !== null && procValue !== undefined) setProcent(procValue);
    } else if (subtitleId !== null && subtitleId !== undefined) {
      const filteredIds = temeIstoriArray
        .flatMap((item) =>
          item.subtitles.flatMap((subItem) => subItem.subjects)
        )
        .filter((subjectItem) => subjectItem.subtitleID == subtitleId)
        .map((subjectItem) => subjectItem.id);
      
      let SumProcValue = 0;

      filteredIds.forEach((id) => {
        const foundObject = results.items.find((item) => {
          return item.subject.find((subItem) => subItem.id === id);
        });

        let procValue = null;

        if (foundObject) {
          procValue = foundObject.subject.find(
            (subItem) => subItem.id === id
          )?.proc;
        }
        if (procValue !== null && procValue !== undefined)
        SumProcValue+=procValue;
      });
      SumProcValue = SumProcValue/filteredIds.length;
      setProcent(SumProcValue);
    }
  }, [results.items]);

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
