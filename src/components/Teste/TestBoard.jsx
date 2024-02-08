import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../DragAndDrop/Column";
import { v4 as uuidv4 } from "uuid";
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
      currentItemIndex,
      setResponseReceived
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = useState([]);
    const [data, setData] = useState([]);
    const [isDragDisabled, setIsDragDisabled] = useState(DragDisable);

    const [selectedOptions, setSelectedOptions] = useState([])
    const currentTests = useSelector(state => state.currentTests);
    const currentIndexTest = useSelector(state => state.currentIndexTest);
    const currentStudentObject = useSelector(state => state.currentStudent);
    const currentStudent = currentStudentObject.currentStudent;

    const [listItems, setListItems] = useState(currentTests[currentIndexTest].order_number_options)

    const [columnArray, setColumnArray] = useState(currentTests[currentIndexTest].column_title.split(", "));
    // console.log(listItems)
    // console.log(listItems[currentItemIndex])

    useEffect(()=>{
      setListItems(currentTests[currentIndexTest].order_number_options);

      // let array = currentTests[currentIndexTest].column_title.split(", ");
      // let columnDBArray = []
      // if (array.length > 2) {
      //     columnDBArray = [array[0], ...array.slice(1).reverse()];
      // } else {
      //   columnDBArray = array;
      // }
      // setColumnArray(columnDBArray)
      setColumnArray(currentTests[currentIndexTest].column_title.split(", "))
      const initialSelectedOptions = [];
      listItems[currentItemIndex].test_item_options.forEach(element => {
        initialSelectedOptions.push({ "option": element.option, 
                                       "score": 0,
                                       "correct": element.correct,
                                       "user_column": 0,
                                       "explanation": (element.explanation !== "") ? element.explanation : "explanation",
                                       "test_item_complexity": listItems[currentItemIndex].test_item_complexity,
                                       "formative_test_id": listItems[currentItemIndex].formative_test_id,
                                       "test_item_id": listItems[currentItemIndex].test_item_id});
      });
      setSelectedOptions(initialSelectedOptions)
      // console.log(initialSelectedOptions)
      setColumns(getColumnsFromBackend());
    },[currentItemIndex])

    const getColumnsFromBackend = () => {

      let columnsFromBackendNext = null;
      // console.log(currentTests[currentIndexTest].order_number_options);
      // temeIstoriArray[0].subtitles[0].subjects[0].teste.forEach(test => {
      //   console.log("test.id", test.id)
      //   console.log("testID", testID)
      //   if(test.id==testID&&test.coloane.length) {
    
          const itemsFromBackendNext = [];
          listItems[currentItemIndex].test_item_options.forEach((answer) => {
              itemsFromBackendNext.push({ id: uuidv4(), content: answer.option });
            });
        
            columnsFromBackendNext = columnArray.reduce((columns, name) => {
              columns[uuidv4()] = {
                name: name,
                items: []
              };
              return columns;
            }, {});
        
            const columnIds = Object.keys(columnsFromBackendNext);
            columnsFromBackendNext[columnIds[0]].items = itemsFromBackendNext;
            
            // console.log(test.id, columnsFromBackendNext);
        // }
      // })
      return columnsFromBackendNext;
    }

    const itemsFromBackend = [];
    listItems[currentItemIndex].test_item_options.forEach((answer) => {
      // console.log(answer.option)
      itemsFromBackend.push({ id: uuidv4(), content: answer.option });
    });


    // console.log(currentTests)
    // console.log(currentIndexTest)
    // console.log(currentTests[currentIndexTest])
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
    // console.log(itemsFromBackend)
    const [columns, setColumns] = useState(columnsFromBackend);

    // console.log(currentTests)

    const currentTest = currentTests[currentIndexTest];

    // console.log(columnArray)
    // console.log(currentTests[currentIndexTest].column_title)

    // console.log(currentTests[currentIndexTest])
    // console.log(currentTests[currentIndexTest].order_number_options[currentItemIndex]);
  
  
    // console.log(currentIndexTest);
  
    let correctAnswers = [];
    if(currentTest.type == "dnd_chrono") {
      correctAnswers = listItems[currentItemIndex].test_item_options;
    } else {
      correctAnswers = listItems[currentItemIndex].test_item_options
      .filter(item => item.correct === 1);
    }
    const correctAnswers1 = listItems[currentItemIndex].test_item_options
    .filter(item => item.correct === 2);

    const correctAnswersValues = correctAnswers.map(item => item.option);
    const correctAnswersValuesConcat = correctAnswersValues.join(', ');

    const correctAnswers1Values = correctAnswers1.map(item => item.option);
    const correctAnswers1ValuesConcat = correctAnswers1Values.join(', ');

    const coloanaRaspuns = (columnArray.length === 1) ? columnArray[0] : columnArray[1];
    const raspunsUltimaColoana = `${coloanaRaspuns}: ${correctAnswersValuesConcat}`

    let coloanaRaspuns1 = null
    let raspunsPenUltimaColoana = ""
    if(currentTest.type ==="dnd_group") {
      coloanaRaspuns1 = columnArray[2];
      raspunsPenUltimaColoana = `${coloanaRaspuns1}: ${correctAnswers1ValuesConcat}`
    }
    // console.log("correctAnswers",correctAnswers);
    // console.log("correctAnswersValues",correctAnswersValues);
    // console.log("correctAnswersValuesConcat",correctAnswersValues);
    // console.log("coloanaRaspuns",coloanaRaspuns);
    // console.log("raspunsUltimaColoana",raspunsUltimaColoana);    

    // console.log("correctAnswers1",correctAnswers1);
    // console.log("correctAnswers1Values",correctAnswers1Values);
    // console.log("correctAnswers1ValuesConcat",correctAnswers1Values);
    // console.log("coloanaRaspuns1",coloanaRaspuns1);
    // console.log("raspunsPenUltimaColoana",raspunsPenUltimaColoana); 

    // let cc = getColumnsFromBackend(list.id);
    // console.log("cc",cc);


    const onDragEnd = (result, columns, setColumns) => {
      if (!result.destination) return;
      const { source, destination } = result;

      // console.log(selectedOptions);
      // console.log(destination);      

      if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        // console.log(sourceItems);
        // console.log(destItems); 
        // console.log(destColumn.name);     
        // console.log(columnArray);     
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

        sourceItems.forEach(sourceItem => {
          const selectedOption = selectedOptions.find(option => option.option === sourceItem.content);
          if (selectedOption) {
            setSelectedOptions(prevOptions => {
              const updatedOptions = prevOptions.map(option =>
                option.option === selectedOption.option ? { ...option, user_column: 0 } : option
              );
              return updatedOptions;
            });
          }
        });

        const columnIndex = columnArray.indexOf(destColumn.name);
        const isChronoDubleTest = currentTest.type === "dnd_chrono_double";

        destItems.forEach((destItem, index) => {
          const selectedOption = selectedOptions.find(option => option.option === destItem.content);
        
          if (selectedOption) {
            setSelectedOptions(prevOptions => {
              const updatedOptions = prevOptions.map(option => {
                if (isChronoDubleTest) {
                  return option.option === selectedOption.option ? { ...option, user_column: index + 1 } : option;
                } else {
                  return option.option === selectedOption.option ? { ...option, user_column: columnIndex } : option;
                }
              });
              return updatedOptions;
            });
          }
        });
      } else {
        const column = columns[source.droppableId];

        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        // console.log(copiedItems); 
        setColumns({
          ...columns,
          [source.droppableId]: {
            ...column,
            items: copiedItems
          }
        });

        copiedItems.forEach((copiedItem, index) => {
          const selectedOption = selectedOptions.find(option => option.option === copiedItem.content);
        
          if (selectedOption) {
            setSelectedOptions(prevOptions => {
              const updatedOptions = prevOptions.map(option =>
                option.option === selectedOption.option ? { ...option, user_column: index + 1 } : option
              );
              return updatedOptions;
            });
          }
        });
      }
    };

    const checkAnswer = () => {

    // console.log(selectedOptions);
    let selectedOptionsCalculate = [];
    // console.log(currentTest)
    if(currentTest.type =="dnd_chrono" || currentTest.type =="dnd_chrono_double") {
      selectedOptionsCalculate = selectedOptions.map(item => {
        let score;
        // console.log(item.explanation == item.user_column)
        if (item.explanation == item.user_column) {
          score = item.test_item_complexity;
        } else {
          score = 0;
        }
        return {
          ...item,
          score: score
        };
      });      
    } else {
      selectedOptionsCalculate = selectedOptions.map(item => {
        let score;
        if (item.correct == item.user_column) {
          score = item.test_item_complexity;
        } else {
          score = 0;
        }
        return {
          ...item,
          score: score
        };
      });
    }

    const selectedOptionsToDB = selectedOptionsCalculate.map(item => {
      const { test_item_complexity, user_column, correct, ...rest } = item;
      return { ...rest, student_id: currentStudent, type: 'check' };
    });
    // console.log(selectedOptionsToDB)
    for (const element of selectedOptionsToDB) {
      trimiteDateLaBackend(element);
    }

    const groupedArray = selectedOptionsToDB.reduce((accumulator, currentObject) => {
      const key = `${currentObject.student_id}_${currentObject.test_item_id}_${currentObject.type}_${currentObject.formative_test_id}`;
      
      if (!accumulator[key]) {
        accumulator[key] = {
          student_id: currentObject.student_id,
          test_item_id: currentObject.test_item_id,
          type: currentObject.type,
          formative_test_id: currentObject.formative_test_id
        };
      }
    
      return accumulator;
    }, {});
    
    const selectedResultsToDB = Object.values(groupedArray);
  
    for (const element of selectedResultsToDB) {
      trimiteResultsLaBackend(element);
    }


    let selectedValuesString="";
    let correctValuesString="";
    let selectedValues1String="";
    let correctValues1String="";
    let correctValues = correctAnswers.map(
      (answer) => answer.option
    );
    if(currentTest.type == "dnd_chrono_double") {
      correctValues = correctAnswers
      .filter(item => item.correct === 1)
      .sort((a, b) => parseInt(a.explanation) - parseInt(b.explanation))
      .map(item => item.option);
    }
    if(currentTest.type == "dnd_chrono") {
      correctValues = correctAnswers
      .sort((a, b) => parseInt(a.explanation) - parseInt(b.explanation))
      .map(item => item.option);
    }
    // console.log(correctValues)
    let selValues = Object.values(columns)
      .filter(column => column.name === coloanaRaspuns)
      .map(column => column.items.map(item => item.content))
      .flat();
    if(currentTest.type!=="dnd_chrono" && currentTest.type!=="dnd_chrono_double" && currentTest.type!=="dnd_group") {
      selectedValuesString = selValues.sort().join(",");
      correctValuesString = correctValues.sort().join(","); 
      // console.log(selectedValuesString);  
      // console.log(correctValuesString);  
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

  const trimiteDateLaBackend = async (element) => {
    try {
        // console.log(element)
        const response = await axios.post('http://localhost:8000/api/student-formative-test-options', element);

        if (response.status === 200) {
          console.log('Success:', response.data.message);
        } else {
          console.error('Error');
        }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.log('Validation Errors:', error.response.data.errors);
      } else {
        console.error('Error:', error);
      }
    }
  };

  const trimiteResultsLaBackend = async (element) => {
    try {
        // console.log(element)
        const response = await axios.post('http://localhost:8000/api/student-formative-test-results', element);

        if (response.status === 200) {
          console.log('Success:', response.data.message);
          setResponseReceived(true);
        } else {
          console.error('Error');
        }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.log('Validation Errors:', error.response.data.errors);
      } else {
        console.error('Error:', error);
      }
    }
  };


  const handleTryAgainClear = (testId) => {
    // console.log("handleTryAgainClear testId",testId);    
    setSelectedValues([]); 
    setCorrectAnswer(null);
    setIsDragDisabled(false);
    // console.log(testId)
    handleTryAgain();
    setColumns(getColumnsFromBackend())
    // setColumns(getColumnsFromBackend(testId));
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
            ? `Cerințele sarcinii (${currentItemIndex + 1}/${
              listItems.length
              }):`
            : `Rezultat (${currentItemIndex + 1}/${listItems.length}):`
        }
        correctAnswer={correctAnswer}
        additionalContent={additionalContent}
        className="non_animation"
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
              }}>{listItems[currentItemIndex].test_item_task}</p>

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
          titlu={`Rezolvarea sarcinii (${currentItemIndex + 1}/${
            listItems.length
          }):`}
          open={true}
          className="non_animation"
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
