import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../index.css";
import "aos/dist/aos.css";
import AOS from "aos";

const TableRow = (props) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const teacherVideo = searchParams.get("teacher");
  const currentThemeObject = useSelector(state => state.currentTheme);
  const currentTheme = currentThemeObject.currentTheme || JSON.parse(localStorage.getItem('currentTheme'));
  const currentSubject = useSelector((state) => state.currentSubject);

  const subject_id =
    currentSubject.subject_id || currentSubject.currentSubject.subject_id;

  const rowData = props.rowData;
  const idx = props.ind;
  const classes = "row " + props.className;

  const parts = currentTheme.path_tema.split("/");
  const addressDisciplina = "/" + parts[1];
  const addressSubtitle = "/" + parts.slice(2).join("/");
  const dynamicPath = `${addressDisciplina}${addressSubtitle}${rowData.path}${rowData.addressTest}/1?teacher=${teacherVideo}&level=1&disciplina=${subject_id}&theme=${currentTheme.tema_id}`;

  useEffect(() => {
    AOS.init();
  }, []);
  // console.log(dynamicPath)
  // const dynamicPath = `${rowData.addressTestDisciplina}${rowData.addressTestSubtitle}${rowData.addressTestSubject}${rowData.addressTest}/1`;

  return (
    <div className={classes} data-aos="fade-up">
      <div className="column">
        <div>
          <span>{idx + 1}. </span>
          <Link to={dynamicPath}> {rowData.name}</Link>
        </div>

        <div className="cursiv">
          <em>Complexitatea: {rowData.complexity}</em>
        </div>
      </div>
      {/* //test cu raspuns maximal */}
      {/* {console.log(rowData)} */}
      {rowData.testResult == 1 && (
        <div className="tbl-points" title="Cel mai bun rezultat">
          <div className="svg-sprite-vs-points profile-point-full"></div>
          <span className="points">
            <span className="earned">
              {" "}
              {rowData.length * rowData.complexityNumber}
            </span>{" "}
            /{" "}
            <span className="max">
              {rowData.length * rowData.complexityNumber}
            </span>
          </span>
        </div>
      )}
      {/* //test cu raspuns partial */}
      {/* {console.log(rowData.testResult < rowData.complexityNumber && rowData.testResult > 0)} */}
      {rowData.testResult < 1 && rowData.testResult > 0 && (
        <div className="tbl-points" title="Continuă să încerci!">
          <div className="svg-sprite-vs-points profile-point-half"></div>
          <span className="points">
            <span className="earned">
              {" "}
              {Math.round(
                rowData.testResult * rowData.length * rowData.complexityNumber
              )}
              {/* {Math.round(rowData.testResult * (rowData.length * rowData.complexityNumber))} */}
            </span>{" "}
            /{" "}
            <span className="max">
              {rowData.length * rowData.complexityNumber}
            </span>
          </span>
        </div>
      )}
      {/* //test cu raspuns minimal=0 */}
      {rowData.testResult == 0 && (
        <div className="tbl-points" title="Incearca, nu rata!">
          <div className="svg-sprite-vs-points profile-point-empty"></div>
          <span className="points">
            <span className="earned"> 0</span> /{" "}
            <span className="max">
              {rowData.length * rowData.complexityNumber}
            </span>
          </span>
        </div>
      )}
      {/* //test cu fara raspuns */}
      {rowData.testResult == null && (
        <div className="tbl-points" title="Cel mai bun rezultat">
          <div className="svg-sprite-vs-points profile-point-empty"></div>
          <span className="points">
            <span className="earned">
              {" "}
              {rowData.length * rowData.complexityNumber}
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

const ItemTable = ({ className, list1 }) => {
  const classes = "table subjects-container " + className;
  const data = list1;
  // console.log(data);
  return (
    <div className={classes}>
      {data.map((rowData, idx) => {
        // rowData.quizArray.forEach((item) =>
        //   item.answers?.sort(() => Math.random() - 0.5)
        // );
        return <TableRow rowData={rowData} ind={idx} key={idx} />;
      })}
    </div>
  );
};

export default ItemTable;
