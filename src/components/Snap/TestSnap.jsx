import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import Snap from "snapsvg-cjs";
import "./TestSnap.css";
import ItemAccordeon from "../Accordeon/ItemAccordeon";
import ItemText from "../Accordeon/ItemText";
import Pinzone from "./Pinzone";

const TestSnap = ({
  list,
  currentIndex,
  correctAnswer,
  setCorrectAnswer,
  additionalContent,
  handleTryAgain,
}) => {
  const svgboxRef = useRef();

  const gRef = useRef(null);
  const [connectedZones, setConnectedZones] = useState([]);
  let lines = [];
  let s;
  let g;

  useEffect(() => {
    const svgElement = svgboxRef.current;
    s = Snap(svgElement);
    const gElement = gRef.current;
    g = Snap(gElement);
  }, []);

  useEffect(() => {
    console.log(connectedZones);
  }, [connectedZones]);

  const getPinZoneIndex = (x, y) => {
    if (x > list.points[0].x && x < (list.points[0].x +48) && y > list.points[0].y && y < (list.points[0].y+48)) return 0;
    if (x > list.points[1].x && x < (list.points[1].x +48) && y > list.points[1].y && y < (list.points[1].y+48)) return 1;
    if (x > list.points[2].x && x < (list.points[2].x +48) && y > list.points[2].y && y < (list.points[2].y+48)) return 2;
    if (x > list.points[3].x && x < (list.points[3].x +48) && y > list.points[3].y && y < (list.points[3].y+48)) return 3;
    return null;
  };

  const getCentre = (idx) => {
    if (idx === 0) {
      const originX = list.points[0].x;
      const originY = list.points[0].y;
      const width = 48;
      const X = originX + width / 2; //= 234.5;
      const Y = originY + width / 2; // = 18

      return { x: X, y: Y }; //{x: 234, y1: 18} //0 zone
    } else if (idx === 1) {
      const originX = list.points[1].x;
      const originY = list.points[1].y;
      const width = 48;
      const X = originX + width / 2; //= 234.5;
      const Y = originY + width / 2; // = 215

      return { x: X, y: Y }; //{x: 234, y1: 215} //1 zone
    } else if (idx === 2) {
      const originX = list.points[2].x;
      const originY = list.points[2].y;
      const width = 48;
      const X = originX + width / 2; //= 330.5;
      const Y = originY + width / 2; // = 31

      return { x: X, y: Y }; //{x: 330.5, y: 31} //2 zone
    } else if (idx === 3) {
      const originX = list.points[3].x;
      const originY = list.points[3].y;
      const width = 48;
      const X = originX + width / 2; //= 234.5;
      const Y = originY + width / 2; // = 215

      return { x: X, y: Y }; //{x: 330.5, y1: 105} //3 zone
    } else {
      return { x: 0, y: 0 };
    }
  };

  const isCorrespondingZone = (index1, index2) => {
    const arr = [0, 1, 2, 3];
    const halfLength = arr.length / 2;

    if (
      (index1 < halfLength && index2 >= halfLength) ||
      (index1 >= halfLength && index2 < halfLength)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const pointIsFree = (x, y) => {
    const hasDuplicate = lines.some((el) => {
      return (
        (el.x1 === x && el.y1 === y && el.hasOwnProperty("line")) ||
        (el.x2 === x && el.y2 === y && el.hasOwnProperty("line"))
      );
    });
    return !hasDuplicate;
  };

  const getLineByCenter1 = (x, y) => {
    const foundLine = lines.find((line) => line.x1 === x && line.y1 === y);

    return foundLine ? foundLine.line : null;
  };
  const getLineByCenter2 = (x, y) => {
    const foundLine = lines.find((line) => line.x2 === x && line.y2 === y);

    return foundLine ? foundLine.line : null;
  };

  function updateLine(x, y, newX, newY, newline) {
    const updatedLines = lines.map((line) => {
      if (line.x1 === x && line.y1 === y) {
        return { x1: line.x1, y1: line.y1, x2: newX, y2: newY, line: newline };
      } else if (line.x2 === newX && line.y2 === newY) {
        return { x1: x, y1: y, x2: line.x2, y2: line.y2, line: newline };
      }
      return line;
    });

    lines = updatedLines;
  }

  function deleteLine(x, y) {
    const updatedLines = lines.filter((obj) => {
      return !(
        (obj.x1 === x && obj.y1 === y) ||
        (obj.x2 === x && obj.y2 === y)
      );
    });

    lines = updatedLines;
  }

  const checkLines = () => {
    let { x: x1, y: y1 } = getCentre(0);
    let { x: x2, y: y2 } = getCentre(1);
    let { x: x3, y: y3 } = getCentre(2);
    let { x: x4, y: y4 } = getCentre(3);
    lines = lines.filter((el) => {
      return (
        ((el.x1 == x1 && el.y1 == y1) ||
          (el.x1 == x2 && el.y1 == y2) ||
          (el.x1 == x3 && el.y1 == y3) ||
          (el.x1 == x4 && el.y1 == y4)) &&
        ((el.x2 == x1 && el.y2 == y1) ||
          (el.x2 == x2 && el.y2 == y2) ||
          (el.x2 == x3 && el.y2 == y3) ||
          (el.x2 == x4 && el.y2 == y4))
      );
    });

    setConnectedZones((prevConnectedZones) => {
      const newConnectedZones = lines.map((el) => {
        return {
          zone1: getPinZoneIndex(
            Number(el.line.node.attributes[0].value),
            Number(el.line.node.attributes[2].value)
          ),
          zone2: getPinZoneIndex(
            Number(el.line.node.attributes[1].value),
            Number(el.line.node.attributes[3].value)
          ),
        };
      });

      const uniqueConnectedZones = newConnectedZones.filter(
        (obj, index, self) => {
          const firstIndex = self.findIndex(
            (item) => item.zone1 === obj.zone1 && item.zone2 === obj.zone2
          );
          return index === firstIndex;
        }
      );

      return [...uniqueConnectedZones];
    });
  };

  const handlePointMousedown = (event, index) => {
    const { offsetX, offsetY } = event;
    const { x, y } = getCentre(index);
    if (pointIsFree(x, y)) {
      if (x < 258) {
        //pointIsFree, xCentru < 258(centru)
        const newLine = { x1: x, y1: y, x2: offsetX, y2: offsetY };
        lines.push(newLine);
        const line = s
          .line(x, y, offsetX, offsetY)
          .attr({ strokeWidth: 2, stroke: "black" });

        g.append(line);

        s.mousemove(function (event) {
          line.attr({ x2: event.offsetX, y2: event.offsetY });
          console.log("event.offsetX",event.offsetX)
          console.log("event.offsetY",event.offsetY)
        });

        s.mouseup(function (evUp) {
          const indexTargetZone = getPinZoneIndex(evUp.offsetX, evUp.offsetY);
          if (
            indexTargetZone !== null &&
            isCorrespondingZone(indexTargetZone, index)
          ) {
            const { x: xUp, y: yUp } = getCentre(indexTargetZone);
            if (!pointIsFree(xUp, yUp)) {
              const currentLine1 = getLineByCenter1(xUp, yUp);
              const currentLine2 = getLineByCenter2(xUp, yUp);
              if (currentLine1) {
                currentLine1.remove();
              }
              if (currentLine2) {
                currentLine2.remove();
              }
              deleteLine(xUp, yUp);
            }
            line.attr({ x2: xUp, y2: yUp });
            updateLine(newLine.x1, newLine.y1, xUp, yUp, line);
          } else {
            line.remove();
            deleteLine(newLine.x1, newLine.y1);
          }
          checkLines();
          s.unmousemove();
          s.unmouseup();
        });
      } else {
        //pointIsFree, xCentru > 258(centru)
        const newLine = { x1: offsetX, y1: offsetY, x2: x, y2: y }; //x1: 234, y1: 18
        lines.push(newLine);
        const line = s
          .line(offsetX, offsetY, x, y)
          .attr({ strokeWidth: 2, stroke: "black" });

        g.append(line);

        s.mousemove(function (event) {
          line.attr({ x1: event.offsetX, y1: event.offsetY });
          // point.animate({ transform: "s1.33,1.33" }, 100, mina.easeout);
          // dot.animate({ r: "3.5" }, 100, mina.easeout);
        });
        s.mouseup(function (evUp) {
          const indexTargetZone = getPinZoneIndex(evUp.offsetX, evUp.offsetY);
          if (
            indexTargetZone !== null &&
            isCorrespondingZone(indexTargetZone, index)
          ) {
            const { x: xUp, y: yUp } = getCentre(indexTargetZone);
            if (!pointIsFree(xUp, yUp)) {
              const currentLine1 = getLineByCenter1(xUp, yUp);
              const currentLine2 = getLineByCenter2(xUp, yUp);
              if (currentLine1) {
                currentLine1.remove();
              }
              if (currentLine2) {
                currentLine2.remove();
              }
              deleteLine(xUp, yUp);
            }
            line.attr({ x1: xUp, y1: yUp });
            updateLine(xUp, yUp, newLine.x2, newLine.y2, line);
          } else {
            line.remove();
            deleteLine(newLine.x2, newLine.y2);
          }
          checkLines();
          s.unmousemove();
          s.unmouseup();
        });
      }
    } else {
      const currentLine1 = getLineByCenter1(x, y);
      const currentLine2 = getLineByCenter2(x, y);
      if (currentLine1) {
        //pointNOTFree, xCentru < 258(mijloc)
        index = getPinZoneIndex(
          currentLine1.node.attributes[1].value,
          currentLine1.node.attributes[3].value
        );
        currentLine1.attr({ x1: event.offsetX, y1: event.offsetY });
        s.mousemove(function (event) {
          currentLine1.attr({ x1: event.offsetX, y1: event.offsetY });
          // point.animate({ transform: "s1.33,1.33" }, 100, mina.easeout);
          // dot.animate({ r: "3.5" }, 100, mina.easeout);
        });

        s.mouseup(function (evUp) {
          const indexTargetZone = getPinZoneIndex(evUp.offsetX, evUp.offsetY);
          if (
            indexTargetZone !== null &&
            isCorrespondingZone(indexTargetZone, index)
          ) {
            const { x, y } = getCentre(indexTargetZone);

            if (!pointIsFree(x, y)) {
              const primLine = getLineByCenter1(x, y);
              const secLine = getLineByCenter2(x, y);
              if (primLine) {
                primLine.remove();
              }
              if (secLine) {
                secLine.remove();
              }
              deleteLine(x, y);
            }
            currentLine1.attr({ x1: x, y1: y });
            updateLine(
              x,
              y,
              Number(currentLine1.node.attributes[1].value),
              Number(currentLine1.node.attributes[3].value),
              currentLine1
            );
          } else {
            deleteLine(
              Number(currentLine1.node.attributes[1].value),
              Number(currentLine1.node.attributes[3].value)
            );
            currentLine1.remove();
          }
          // if (evUp.offsetX > 320 && evUp.offsetX < 340) {
          //   line.attr({ x2: 330, y2: 30 });
          // } else {
          //   line.remove();
          // }
          checkLines();
          s.unmousemove();
          s.unmouseup();
        });
      }
      if (currentLine2) {
        //pointNOTFree, xCentru > 258(mijloc)
        index = getPinZoneIndex(
          currentLine2.node.attributes[0].value,
          currentLine2.node.attributes[2].value
        );
        currentLine2.attr({ x2: event.offsetX, y2: event.offsetY });
        s.mousemove(function (event) {
          currentLine2.attr({ x2: event.offsetX, y2: event.offsetY });
          // point.animate({ transform: "s1.33,1.33" }, 100, mina.easeout);
          // dot.animate({ r: "3.5" }, 100, mina.easeout);
        });

        s.mouseup(function (evUp) {
          const indexTargetZone = getPinZoneIndex(evUp.offsetX, evUp.offsetY);
          if (
            indexTargetZone !== null &&
            isCorrespondingZone(indexTargetZone, index)
          ) {
            const { x, y } = getCentre(indexTargetZone);
            if (!pointIsFree(x, y)) {
              const primLine = getLineByCenter1(x, y);
              const secLine = getLineByCenter2(x, y);
              if (primLine) {
                primLine.remove();
              }
              if (secLine) {
                secLine.remove();
              }
              deleteLine(x, y);
            }
            currentLine2.attr({ x2: x, y2: y });
            updateLine(
              Number(currentLine2.node.attributes[0].value),
              Number(currentLine2.node.attributes[2].value),
              x,
              y,
              currentLine2
            );
          } else {
            deleteLine(
              Number(currentLine2.node.attributes[0].value),
              Number(currentLine2.node.attributes[2].value)
            );
            currentLine2.remove();
          }
          checkLines();
          s.unmousemove();
          s.unmouseup();
        });
      }
    }
  };

  return (
    <>
      <ItemAccordeon
        titlu={
          correctAnswer === null
            ? `Cerințele sarcinii (${currentIndex + 1}/${
                list.quizArray.length
              }):`
            : `Rezultat (${currentIndex + 1}/${list.quizArray.length}):`
        }
        correctAnswer={correctAnswer}
        additionalContent={additionalContent}
        open={true}
      >
        <ItemText
          classNameChild={
            correctAnswer === null
              ? ""
              : correctAnswer
              ? " correct"
              : " incorrect"
          }
        >
          <p>{list.quizArray[currentIndex].cerinte}</p>

          <div className="content-snap">
            <div>
              <div className="grid-container-snap">
              <div>
                  <div data-slate-node="element">
                    <div data-slate-node="element" className="box-raspuns">
                      <div data-slate-node="element">
                        <span data-slate-node="text">
                          <span data-slate-leaf="true">
                            <span data-slate-string="true">
                              Обладает кинетической энергией
                            </span>
                          </span>
                        </span>
                      </div>
                    </div>
                    <div data-slate-node="element" className="box-raspuns">
                      <div data-slate-node="element">
                        <span data-slate-node="text">
                          <span data-slate-leaf="true">
                            <span data-slate-string="true">
                              Обладает потенциальной энергией
                            </span>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div data-slate-node="element">
                    <span data-slate-node="text">
                      <span data-slate-leaf="true">
                        <span data-slate-zero-width="n" data-slate-length="0">
                          ﻿<br />
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
                <div>
                  <div data-slate-node="element">
                    <div data-slate-node="element" className="box-raspuns">
                      <div data-slate-node="element">
                        <span data-slate-node="text">
                          <span data-slate-leaf="true">
                            <span data-slate-string="true">
                              Обладает кинетической энергией
                            </span>
                          </span>
                        </span>
                      </div>
                    </div>
                    <div data-slate-node="element" className="box-raspuns">
                      <div data-slate-node="element">
                        <span data-slate-node="text">
                          <span data-slate-leaf="true">
                            <span data-slate-string="true">
                              Обладает потенциальной энергией
                            </span>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <svg
              ref={svgboxRef}
              height="100%"
              width="100%"
              className="main-svg"
            >
              {/* {lines.map((line, index) => (
        <g><line
          key={index}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          strokeWidth="2"
          stroke="black"
        /></g>
      ))} */}
              <g ref={gRef}></g>
              <Pinzone
                transformMatrix={`matrix(1, 0, 0, 1, ${list.points[0].x}, ${list.points[0].y})`}
                onPointMousedown={(event) => handlePointMousedown(event, 0)}
                index={0}
              />
              <Pinzone
                transformMatrix={`matrix(1, 0, 0, 1, ${list.points[1].x}, ${list.points[1].y})`}
                onPointMousedown={(event) => handlePointMousedown(event, 1)}
                index={1}
              />
              <Pinzone
                transformMatrix={`matrix(1, 0, 0, 1, ${list.points[2].x}, ${list.points[2].y})`}
                onPointMousedown={(event) => handlePointMousedown(event, 2)}
                index={2}
              />
              <Pinzone
                transformMatrix={`matrix(1, 0, 0, 1, ${list.points[3].x}, ${list.points[3].y})`}
                onPointMousedown={(event) => handlePointMousedown(event, 3)}
                index={3}
              />
            </svg>
          </div>
        </ItemText>
      </ItemAccordeon>
    </>
  );
};

export default TestSnap;
