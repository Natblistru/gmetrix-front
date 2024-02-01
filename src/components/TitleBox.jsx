import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
// import temeIstoriArray from "../data/temeIstoria";
import ProgressBar from "./ProgressBar";
import { connect } from "react-redux";

const TitleBox = ({
  className,
  subjectId,
  subtitleId,
  list,
  children,
  proc
}) => {
  const classes = "title-box " + className;
  const location = useLocation();
  const [prof, setProf] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    let teacherName = searchParams.get("teachername");
    if (!teacherName) {
      teacherName = searchParams.get("teacher");
    }
    setProf(teacherName);
  }, [location.search]);

  return (
    <div className={classes}>
      <div className="title-img">
        <img src={process.env.PUBLIC_URL + "/images/parchment.png"} alt="" />
        <div>
          <h1>{children}</h1>
          {/* {console.log(prof)} */}
          {prof !== null && (
            <p>(elaborat de profesorul {prof})</p>
          )}
        </div>
      </div>
      <ProgressBar proc={proc} />
    </div>
  );
};
export default TitleBox;
