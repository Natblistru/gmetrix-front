import React, { useState } from "react";
import { Link, useLocation  } from "react-router-dom";
import { useSelector } from "react-redux";

const ItemList = ({ list, className, type, onItemClick }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const teacherVideo = searchParams.get('teacher');
  const currentThemeObject = useSelector(state => state.currentTheme);
  const currentTheme = currentThemeObject.currentTheme || JSON.parse(localStorage.getItem('currentTheme'));

  const currentSubject = useSelector(state => state.currentSubject);

  const evaluations = useSelector(state => [
    state.evaluations1,
    state.evaluations2,
    state.evaluations3
  ]);

  const subject_id = currentSubject.subject_id || currentSubject.currentSubject.subject_id;

  let listItems = [...list];
  // console.log(listItems)
  const classes = "subjects-container " + className;

  //  console.log(currentTheme); 
  //  console.log(listItems);

  const parts = currentTheme.path_tema.split("/");
  const addressDisciplina = "/" + parts[1];
  const addressSubtitle = "/" + parts.slice(2).join("/");

  function getTitle(averageStudentProcent) {
    if (averageStudentProcent == 100) {
      return "Cel mai bun rezultat";
    } else if (averageStudentProcent > 0) {
      return "Continuă să încerci!";
    } else {
      return "Incearca, nu rata!";
    }
  }
  
  function getPointType(averageStudentProcent) {
    if (averageStudentProcent == 100) {
      return "full";
    } else if (averageStudentProcent > 0) {
      return "half";
    } else {
      return "empty";
    }
  }
  
  function getEarnedPoints(averageStudentProcent, totalPoints) {
    if (averageStudentProcent > 0) {
      return Math.round(averageStudentProcent * totalPoints / 100);
    } else {
      return 0;
    }
  }
  

  // console.log(evaluations1)
  // console.log(listItems)
  return (
    <div className={classes}>
      {listItems
        ?.map((subtitle, idx) => {
        // const dynamicPath = `${subtitle.addressDisciplina}${subtitle.addressSubtitle}${subtitle.addressSubject}`;
        let subtitle_path = subtitle.path;
        
        let procent = 0;
        let classNameProcent = "";
        if(type == "topic") {
          procent = subtitle.procentTopic;
        } else if(type == "subtopic") {
          procent = subtitle.procentSubtopic;
        } else if (type == "exam") {
          // classNameProcent = "svg-sprite-vs-small result-perfect";
        }
        if(procent == 100) {
          classNameProcent = "svg-sprite-vs-small result-perfect";
        }
        // console.log(evaluations1)
        const dynamicPath = `${addressDisciplina}${addressSubtitle}${subtitle_path}?teacher=${teacherVideo}&level=1&disciplina=${subject_id}&theme=${currentTheme.tema_id}`;       
        return (
          <div key={idx} className="subject-item" onClick={() => onItemClick && onItemClick(idx)}>
            <div className="title-item"> 
              <div className="num-item">{idx+1}.</div>
              {/* <div className="num-item">{type === "subtopic" ? subtitle.subtopic_id : subtitle.id}.</div>               */}
              <div className="name-item">
              {subtitle.path == null ? (
                  subtitle.anul == null ? (
                    <div className="text-block">{subtitle.subtopic_name}</div>
                  ) : (
                    <div className="text-block">
                      <strong>{subtitle.anul}</strong> - {subtitle.eveniment}
                    </div>
                  )
                ) : (

                  <Link to={dynamicPath}>{type == "subtopic" ? subtitle.subtopic_name : subtitle.name}</Link>
                )}
              </div>
            </div>
            <div className={classNameProcent}>
              {subtitle.path && subtitle.path.includes("/examen-subiect") && (
                <>
                  {(() => {
                     const evaluationsArray = evaluations[subtitle.id - 1];

                    // Calculăm media student_procent pentru evaluationsArray
                    const totalStudentProcent = evaluationsArray.reduce((sum, evalItem) => sum + parseFloat(evalItem.student_procent), 0);
                    const averageStudentProcent = totalStudentProcent / evaluationsArray.length;

                    return (
                      <div key={idx} className="tbl-points" title={getTitle(averageStudentProcent)} style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                        <div className={`svg-sprite-vs-points profile-point-${getPointType(averageStudentProcent)}`}></div>
                        <span className="points">
                          <span className="earned"> {getEarnedPoints(averageStudentProcent, evaluationsArray.length)}</span> /{" "}
                          <span className="max">{evaluationsArray.length}</span>
                        </span>
                      </div>
                    );
                  })()}
                </>
              )}
            </div>

          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
