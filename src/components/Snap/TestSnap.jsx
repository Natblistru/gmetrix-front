import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import ContextData from "../context/ContextData";
import Snap from "snapsvg-cjs";
import "./TestSnap.css";
import ItemAccordeon from "../Accordeon/ItemAccordeon";
import ItemText from "../Accordeon/ItemText";
import Pinzone from "./Pinzone";

const RowText = ({ indx, text }) => {
  return (
    <div key={indx} className="box-raspuns">
      <div>
        <span>
          <span>
            <span>{text}</span>
          </span>
        </span>
      </div>
    </div>
  );
};

const TestSnap = ({
  list,
  currentIndex,
  correctAnswer,
  setCorrectAnswer,
  additionalContent,
  handleTryAgain,
}) => {
  const svgboxRef = useRef();
  const {stateData, dispatchData} = React.useContext(ContextData)

  // console.log(stateData.currentTests)
  // console.log(stateData.currentTests[stateData.currentIndexTest].order_number_options);

  // console.log(stateData.currentIndexTest);

  const listItems = stateData.currentTests[stateData.currentIndexTest].order_number_options;

  const textAdditionalArray = listItems[currentIndex].test_item_options.map(option => JSON.parse(option.text_additional));

  // console.log(textAdditionalArray);

    // Creează array-ul de forma dorită
  const transformedArray = textAdditionalArray.reduce((acc, item) => {
    // Adaugă perechea x, y pentru x1, y1
    acc.push({ x: parseInt(item.x1), y: parseInt(item.y1) });

    // Adaugă perechea x, y pentru x2, y2
    acc.push({ x: parseInt(item.x2), y: parseInt(item.y2) });

    return acc;
  }, []);

  // Sortează array-ul în funcție de x și apoi de y
  transformedArray.sort((a, b) => {
    if (a.x !== b.x) {
      return a.x - b.x;
    } else {
      return a.y - b.y;
    }
  });

  // console.log(transformedArray);

  // Creează matricea răspunsurilor corecte
  const matriceRaspunsuri = textAdditionalArray.map(coordonate => {
    const indexStart = transformedArray.findIndex(punct => punct.x === parseInt(coordonate.x1) && punct.y === parseInt(coordonate.y1));
    const indexEnd = transformedArray.findIndex(punct => punct.x === parseInt(coordonate.x2) && punct.y === parseInt(coordonate.y2));

    return [indexStart, indexEnd];
  });

  //console.log(matriceRaspunsuri);

  const sortedOptions = listItems[currentIndex].test_item_options.map(item => {
    const parts = item.option.split('|').map(part => part.trim());
    return parts;
  }).flat();
  
  // Sortează array-ul în funcție de primul caracter al fiecărui element
  sortedOptions.sort((a, b) => {
    const aFirstChar = a.charAt(0);
    const bFirstChar = b.charAt(0);

    if (aFirstChar.match(/[0-9]/) && bFirstChar.match(/[0-9]/)) {
      return aFirstChar - bFirstChar;
    } else {
      return a.localeCompare(b);
    }
  });

  // console.log(sortedOptions);


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
    setConnectedZones([]);
  }, [currentIndex]);

  useEffect(() => {
    // console.log(connectedZones);
  }, [connectedZones]);

  useEffect(() => {
    if (correctAnswer !== null) {
      repaintLines();
    }
  }, [correctAnswer]);

  const repaintLines = () => {
    connectedZones.map(({ zone1, zone2 }) => {
      const { x: x1, y: y1 } = getCentre(zone1);
      const { x: x2, y: y2 } = getCentre(zone2);
       gRef.current.append(Snap(svgboxRef.current).line(x1, y1, x2, y2).attr({ strokeWidth: 2, stroke: "black" }));
    });
  };
  const getPinZoneIndex = (x, y) => {
    for (let i = 0; i < transformedArray.length; i++) {
      const point = transformedArray[i];
      if (x > point.x && x < point.x + 48 && y > point.y && y < point.y + 48) {
        return i;
      }
    }
    return null;
  };

  const getCentre = (idx) => {
    if (idx >= 0 && idx < transformedArray.length) {
      const originX = transformedArray[idx].x;
      const originY = transformedArray[idx].y;
      const width = 48;
      const X = originX + width / 2;
      const Y = originY + width / 2;

      return { x: X, y: Y };
    } else {
      return { x: 0, y: 0 };
    }
  };

  const isCorrespondingZone = (index1, index2) => {
    const halfLength = transformedArray.length / 2;

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
    const centrePoints = [];

    for (let i = 0; i < transformedArray.length; i++) {
      centrePoints.push(getCentre(i));
    }

    lines = lines.filter((el) => {
      for (let i = 0; i < centrePoints.length; i++) {
        const { x, y } = centrePoints[i];
        if (el.x1 === x && el.y1 === y) {
          for (let j = 0; j < centrePoints.length; j++) {
            const { x: x2, y: y2 } = centrePoints[j];
            if (el.x2 === x2 && el.y2 === y2) {
              return true;
            }
          }
        }
      }
      return false;
    });

    setConnectedZones((prevConnectedZones) => {
      const newConnectedZones = lines.map((el) => {
        const x1 = Number(el.line.node.attributes[0].value);
        const y1 = Number(el.line.node.attributes[2].value);
        const x2 = Number(el.line.node.attributes[1].value);
        const y2 = Number(el.line.node.attributes[3].value);

        const zone1 = getPinZoneIndex(x1, y1);
        const zone2 = getPinZoneIndex(x2, y2);

        return { zone1, zone2 };
      });

      const uniqueConnectedZones = newConnectedZones.filter(
        (obj, index, self) =>
          index ===
          self.findIndex(
            (item) => item.zone1 === obj.zone1 && item.zone2 === obj.zone2
          )
      );

      return [...uniqueConnectedZones];
    });
  };

  const handlePointMousedown = (event, index) => {
    if (correctAnswer === null) {
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
    }
  };

  const checkAnswer = () => {
    // const correctAnswers = [
    //   [0, 5],
    //   [3, 4],
    //   [1, 6],
    //   [2, 7],
    // ];

    const isAnswersCorrect = matriceRaspunsuri.every(
      (correctAnswer) =>
        connectedZones.some(
          (userAnswer) =>
            (userAnswer.zone1 === correctAnswer[0] &&
              userAnswer.zone2 === correctAnswer[1]) ||
            (userAnswer.zone1 === correctAnswer[1] &&
              userAnswer.zone2 === correctAnswer[0])
        )
    );

    if (isAnswersCorrect) {
      setCorrectAnswer(true);
    } else {
      setCorrectAnswer(false);
    }
  };

  const halfIndex = Math.ceil(sortedOptions.length / 2);
// console.log(halfIndex);
// console.log(sortedOptions);
// console.log(Math.ceil(sortedOptions.length / 2));
  return (
    <>
      <ItemAccordeon
        titlu={
          correctAnswer === null
            ? `Cerințele sarcinii (${currentIndex + 1}/${
              listItems.length
              }):`
            : `Rezultat (${currentIndex + 1}/${listItems.length}):`
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
          <p>Formează perechi logice, unind prin săgeţi, conţinuturile din prima și a doua coloană:</p>

          <div className="content-snap">
            <div>
              <div className="grid-container-snap">
                <div>
                  <div>
                    {sortedOptions
                      .slice(0, halfIndex)
                      .map((text, index) => (
                        <RowText key={index} indx={index} text={text} />
                      ))}
                  </div>
                </div>
                <div>
                  <div>
                    <span>
                      <span>
                        <span>
                          ﻿<br />
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
                <div>
                  <div>
                    {sortedOptions
                      .slice(halfIndex)
                      .map((text, index) => (
                        <RowText
                          key={halfIndex + index}
                          indx={halfIndex + index}
                          text={text}
                        />
                      ))}
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
              <g ref={gRef}>
                {/* {correctAnswer !== null && (
                  <>
                    {(() => {
                      const { x: x1, y: y1 } = getCentre(
                        connectedZones[0].zone1
                      );
                      const { x: x2, y: y2 } = getCentre(
                        connectedZones[0].zone2
                      );
                      const line = Snap.parse(
                        `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" strokeWidth="2" stroke="black"/>`
                      );
                      return line;
                    })()}
                  </>
                )} */}
              </g>
              {transformedArray.map((p, index) => (
                <Pinzone
                  key={index}
                  transformMatrix={`matrix(1, 0, 0, 1, ${transformedArray[index].x}, ${transformedArray[index].y})`}
                  onPointMousedown={(event) =>
                    handlePointMousedown(event, index)
                  }
                  index={index}
                />
              ))}
            </svg>
          </div>
        </ItemText>
        {correctAnswer === null && (
          <button onClick={checkAnswer} className="btn-test">
            Verifică răspunsul
          </button>
        )}
      </ItemAccordeon>
      {correctAnswer !== null && (
        <ItemAccordeon
          titlu={`Rezolvarea sarcinii (${currentIndex + 1}/${
            listItems.length
          }):`}
          open={true}
        >
          <ItemText classNameChild="">
            {matriceRaspunsuri.map(
              ([index1, index2]) => {
                const answer1 =
                  sortedOptions[Math.min(index1, index2)];
                const answer2 =
                  sortedOptions[Math.max(index1, index2)];
                return (
                  <p key={`${index1}-${index2}`}>
                    {answer1} - {answer2}
                  </p>
                );
              }
            )}
          </ItemText>
          <button onClick={handleTryAgain} className="btn-test">
            Încearcă din nou!
          </button>
        </ItemAccordeon>
      )}
    </>
  );
};

export default TestSnap;
