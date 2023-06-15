import React, { useState, forwardRef, useImperativeHandle } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../DragAndDrop/Column";
import { v4 as uuidv4 } from "uuid";
import temeIstoriArray from "../../data/temeIstoria";
import getColumnsFromBackend from "../../utils/getColumnsFromBackend";



import ItemAccordeon from "../Accordeon/ItemAccordeon";
import ItemText from "../Accordeon/ItemText";

const TestBoard = forwardRef(
  (
    {
      list,
      currentIndex,
      correctAnswer,
      setCorrectAnswer,
      additionalContent,
      handleTryAgain,
      DragDisable
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = useState([]);
    const [data, setData] = useState([]);
    const [isDragDisabled, setIsDragDisabled] = useState(DragDisable);

    const itemsFromBackend = [];
    list.quizArray[currentIndex].answers.forEach((answer) => {
      itemsFromBackend.push({ id: uuidv4(), content: answer.text });
    });

    const columnsFromBackend = list.coloane.reduce((columns, name) => {
      columns[uuidv4()] = {
        name: name,
        items: []
      };
      return columns;
    }, {});

    const columnIds = Object.keys(columnsFromBackend);
    columnsFromBackend[columnIds[0]].items = itemsFromBackend;
    const [columns, setColumns] = useState(columnsFromBackend);

    // let cc = getColumnsFromBackend(list.id);
    // console.log("cc",cc);


    const onDragEnd = (result, columns, setColumns) => {
      if (!result.destination) return;
      const { source, destination } = result;

      if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
          ...columns,
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems
          }
        });
      } else {
        const column = columns[source.droppableId];

        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
          ...columns,
          [source.droppableId]: {
            ...column,
            items: copiedItems
          }
        });
      }
    };

    const checkAnswer = () => {
    let selectedValuesString="";
    let correctValuesString="";
    const correctValues = list.quizArray[currentIndex].correctAnswer.map(
      (answer) => answer.text
    );
    let selValues = Object.values(columns)
      .filter(column => column.name === list.coloanaRaspuns)
      .map(column => column.items.map(item => item.content))
      .flat();
    if(list.type!=="chrono" && list.type!=="chronoDuble") {
      selectedValuesString = selValues.sort().join(",");
      correctValuesString = correctValues.sort().join(","); 
    } else {
      selectedValuesString = selValues.join(",");
      correctValuesString = correctValues.join(",");       
    }
    setSelectedValues(selValues)

    // selectedValuesString = selValues.join(",");
    // correctValuesString = correctValues.sort().join(","); 
    setCorrectAnswer(selectedValuesString === correctValuesString);
    setIsDragDisabled(true);
  };

  const handleTryAgainClear = (testId) => {
    // console.log("handleTryAgainClear testId",testId);    
    setSelectedValues([]); 
    setCorrectAnswer(null);
    setIsDragDisabled(false);
    setColumns(getColumnsFromBackend(testId));
    handleTryAgain();
  };
  useImperativeHandle(ref, () => ({
    handleTryAgainClear: handleTryAgainClear
  }));

  return columns && (

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
        <p style={{
                paddingBottom: "20px",
                // textAlign: "center",
                fontWeight: "500",
              }}>{list.quizArray[currentIndex].cerinte}</p>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      {console.log("columns",columns)}
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <Column
              key={columnId}
              columnId={columnId}
              tasks={column.items}
              index={index}
              column={column}
              isDragDisabled={isDragDisabled}
              typeList={list.type}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",

              }}
            />
          );
        })}
      </DragDropContext>
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
            list.quizArray.length
          }):`}
          open={true}
        >
          <ItemText classNameChild="">
            {list.quizArray[currentIndex].correctAnswer.map((answer, idx) => (
              <div className="cardChrono" key={idx}>{answer.text}</div>
            ))}
          </ItemText>
          <button onClick={()=> handleTryAgainClear(list.id)} className="btn-test">
            Încearcă din nou!
          </button>
        </ItemAccordeon>
      )}
    </>
    );
  }
);

export default TestBoard;
