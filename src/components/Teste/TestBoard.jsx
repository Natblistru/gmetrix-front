import React, { useState, forwardRef, useImperativeHandle } from "react";
import ContextData from "../context/ContextData";
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
      DragDisable,
      currentItemIndex
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = useState([]);
    const [data, setData] = useState([]);
    const [isDragDisabled, setIsDragDisabled] = useState(DragDisable);

    const {stateData, dispatchData} = React.useContext(ContextData)
    const listItems = stateData.currentTests[stateData.currentIndexTest].order_number_options;
    // console.log(listItems)
    // console.log(listItems[currentIndex])
    const itemsFromBackend = [];
    listItems[currentIndex].test_item_options.forEach((answer) => {
      itemsFromBackend.push({ id: uuidv4(), content: answer.option });
    });

    const columnArray = stateData.currentTests[stateData.currentIndexTest].column_title.split(", ");
    // console.log(stateData.currentTests)
    // console.log(stateData.currentIndexTest)
    // console.log(stateData.currentTests[stateData.currentIndexTest])
    // console.log(columnArray)
 
    
    const columnsFromBackend = columnArray.reduce((columns, name) => {
      columns[uuidv4()] = {
        name: name,
        items: []
      };
      return columns;
    }, {});

    const columnIds = Object.keys(columnsFromBackend);
    columnsFromBackend[columnIds[0]].items = itemsFromBackend;
    const [columns, setColumns] = useState(columnsFromBackend);

    // console.log(stateData.currentTests)

    const currentTest = stateData.currentTests[stateData.currentIndexTest];

    // console.log(stateData.currentTests[stateData.currentIndexTest].column_title)

    // console.log(stateData.currentTests[stateData.currentIndexTest])
    // console.log(stateData.currentTests[stateData.currentIndexTest].order_number_options[currentIndex]);
  
  
    // console.log(stateData.currentIndexTest);
  
    const correctAnswers = listItems[currentIndex].test_item_options
      .filter(item => item.correct === 1);

    const correctAnswers1 = listItems[currentIndex].test_item_options
    .filter(item => item.correct === 2);

    const correctAnswersValues = correctAnswers.map(item => item.option);
    const correctAnswersValuesConcat = correctAnswersValues.join(', ');

    const correctAnswers1Values = correctAnswers1.map(item => item.option);
    const correctAnswers1ValuesConcat = correctAnswers1Values.join(', ');

    const coloanaRaspuns = columnArray[columnArray.length - 1];
    const raspunsUltimaColoana = `${coloanaRaspuns}: ${correctAnswersValuesConcat}`

    const coloanaRaspuns1 = columnArray[columnArray.length - 2];
    const raspunsPenUltimaColoana = `${coloanaRaspuns1}: ${correctAnswers1ValuesConcat}`

    // console.log(correctAnswers);

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
    let selectedValues1String="";
    let correctValues1String="";
    let correctValues = correctAnswers.map(
      (answer) => answer.option
    );
    if(currentTest.type!=="dnd_chrono" || currentTest.type!=="dnd_chronoDuble") {
      correctValues = correctAnswers
      .filter(item => item.correct === 1)
      .sort((a, b) => parseInt(a.explanation) - parseInt(b.explanation))
      .map(item => item.option);
    }
    // console.log(correctValues)
    let selValues = Object.values(columns)
      .filter(column => column.name === coloanaRaspuns)
      .map(column => column.items.map(item => item.content))
      .flat();
    if(currentTest.type!=="dnd_chrono" && currentTest.type!=="dnd_chronoDuble" && currentTest.type!=="dnd_group") {
      selectedValuesString = selValues.sort().join(",");
      correctValuesString = correctValues.sort().join(","); 
      // console.log(correctValuesString);  
      // console.log(correctValues);  
    } if(currentTest.type ==="dnd_group") {
      //col.III
      selectedValuesString = selValues.sort().join("");
      correctValuesString = correctValues.sort().join(""); 
      //col.II
      let selValues1 = Object.values(columns)
        .filter(column => column.name === coloanaRaspuns1)
        .map(column => column.items.map(item => item.content))
        .flat();
      let correctValues1 = correctAnswers1.map(
        (answer) => answer.option
      );
      selectedValues1String = selValues1.sort().join("");
      correctValues1String = correctValues1.sort().join(""); 
    } else {
      selectedValuesString = selValues.join(",");
      correctValuesString = correctValues.join(",");     
    }
    setSelectedValues(selValues);


    // selectedValuesString = selValues.join(",");
    // correctValuesString = correctValues.sort().join(","); 
    if(currentTest.type ==="dnd_group") {
      setCorrectAnswer(selectedValuesString === correctValuesString && selectedValues1String === correctValues1String);
    } else {
      setCorrectAnswer(selectedValuesString === correctValuesString);
    }

    setIsDragDisabled(true);
  };

  const handleTryAgainClear = (testId) => {
    // console.log("handleTryAgainClear testId",testId);    
    setSelectedValues([]); 
    setCorrectAnswer(null);
    setIsDragDisabled(false);
    // console.log(testId)
    setColumns(getColumnsFromBackend(testId));
    handleTryAgain();
  };
  useImperativeHandle(ref, () => ({
    handleTryAgainClear: handleTryAgainClear
  }));

  // console.log(columns)
  // console.log(currentTest)

  return columns && (

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
        <p style={{
                paddingBottom: "20px",
                // textAlign: "center",
                fontWeight: "500",
              }}>{listItems[currentIndex].test_item_task}</p>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      {/* {console.log("columns",columns)} */}
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
              typeList={currentTest.type}
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
            listItems.length
          }):`}
          open={true}
        >
          <ItemText classNameChild="">
            {/* {console.log(correctAnswers)} */}
            {currentTest.type !== "dnd_group" ? (
              correctAnswers.map((answer, idx) => (
                <div className="cardChrono" key={idx}>{answer.option}</div>
              ))
            ) : (
              <>
                <div className="cardChrono">{raspunsUltimaColoana}</div>
                <div className="cardChrono">{raspunsPenUltimaColoana}</div>
              </>
            )}
          </ItemText>
          <button onClick={()=> handleTryAgainClear(currentTest.formative_test_id)} className="btn-test">
            Încearcă din nou!
          </button>
        </ItemAccordeon>
      )}
    </>
    );
  }
);

export default TestBoard;
