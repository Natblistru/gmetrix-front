import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateStudentProcent, updateStudentAnswer } from "../ReduxComp/actions";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../DragAndDrop/Column";
import { v4 as uuidv4 } from "uuid";
import { decodeDiacritics } from "../DragWords/TextConverter";
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
    const currentIndexTestObject = useSelector(state => state.currentIndexTest);
    const currentStudentObject = useSelector(state => state.currentStudent);
    const currentStudent = currentStudentObject ? currentStudentObject.currentStudent : 1;
    const language = useSelector(state => state.language);

    const dispatch = useDispatch();
    const allTeacherTests = useSelector((state) => state.allTeacherTests);

    let currentIndexTest;

    if (typeof currentIndexTestObject === 'object') {
        currentIndexTest = currentIndexTestObject.currentIndexTest;
    } else {
        currentIndexTest = currentIndexTestObject;
    }

    const [listItems, setListItems] = useState(currentTests[currentIndexTest].order_number_options)

    const [columnArray, setColumnArray] = useState(listItems[currentItemIndex].column_title.split(", "));
    // console.log(listItems)
    // console.log(listItems[currentItemIndex])

    // let columnArray = listItems[currentItemIndex].column_title.split(", ")
    let colArray;

    useEffect(() => {
      const updatedListItems = currentTests[currentIndexTest]?.order_number_options || [];
      setListItems(updatedListItems);

    }, [currentIndexTest, currentTests]);
    
    useEffect(()=>{
      // setListItems(currentTests[currentIndexTest].order_number_options);

      // let array = currentTests[currentIndexTest].column_title.split(", ");
      // let columnDBArray = []
      // if (array.length > 2) {
      //     columnDBArray = [array[0], ...array.slice(1).reverse()];
      // } else {
      //   columnDBArray = array;
      // }
      // setColumnArray(columnDBArray)

      // console.log("allTeacherTests[currentIndex]",allTeacherTests[currentIndex])
      setColumnArray(listItems[currentItemIndex].column_title.split(", "))
      // columnArray = listItems[currentItemIndex].column_title.split(", ")

      const index = allTeacherTests.findIndex(
        (item) => item.test_item_id === listItems[currentItemIndex]?.test_item_id
      );
      let studentOptions = []
      if (index !== -1) {
        studentOptions = allTeacherTests[index]?.student_options || [];
        // console.log("studentOptions",studentOptions);
      }
  
      const sourceOptions = studentOptions.length > 0 
      ? studentOptions 
      : listItems[currentItemIndex].test_item_options;

      const initialSelectedOptions = [];
      sourceOptions.forEach(element => {
        initialSelectedOptions.push({ "option": element.option, 
                                       "score": 0,
                                       "correct": element.correct,
                                       "user_column": studentOptions.length > 0 ? element.user_column : 0,
                                       "explanation": studentOptions.length > 0 ? element.explanation : (element.explanation !== "") ? element.explanation : "explanation",
                                       "test_item_complexity": listItems[currentItemIndex].test_item_complexity,
                                       "formative_test_id": listItems[currentItemIndex].formative_test_id,
                                       "test_item_id": listItems[currentItemIndex].test_item_id});
      });
      setSelectedOptions(initialSelectedOptions)
      setColumns(getColumnsFromBackend());
    },[currentItemIndex, listItems ])

    const getColumnsFromBackend = () => {

      let columnsFromBackendNext = null;
      // console.log(currentTests[currentIndexTest].order_number_options);
      // temeIstoriArray[0].subtitles[0].subjects[0].teste.forEach(test => {
      //   console.log("test.id", test.id)
      //   console.log("testID", testID)
      colArray = listItems[currentItemIndex].column_title.split(", ")
      // console.log(colArray)
      // console.log(listItems[currentItemIndex])
      // console.log(currentItemIndex)
      // console.log(listItems)
      // console.log(currentTests[currentIndexTest])
              // console.log(columnArray)
      //   if(test.id==testID&&test.coloane.length) {
    
          const itemsFromBackendNext = [];
          const itemsFromBackendNext0 = [];

          if (!allTeacherTests[currentIndex].student_options || allTeacherTests[currentIndex].student_options.length === 0) {
      
            listItems[currentItemIndex].test_item_options.forEach((answer) => {
                itemsFromBackendNext.push({ id: uuidv4(), content: answer.option });
              });
          
              columnsFromBackendNext = colArray.reduce((columns, name) => {
                columns[uuidv4()] = {
                  name: name,
                  items: []
                };
                return columns;
              }, {});
          
              const columnIds = Object.keys(columnsFromBackendNext);
              columnsFromBackendNext[columnIds[0]].items = itemsFromBackendNext;

          } else {

            // Creează o copie cu elementele unde user_column = 0
            const filteredOptionsUserColumnZero = allTeacherTests[currentIndex].student_options.filter(
              (item) => item.user_column === 0
            );
            
            // Creează o copie fără elementele unde user_column = 0 și sortează după user_column
            const sortedOptionsByUserColumn = allTeacherTests[currentIndex].student_options
              .filter((item) => item.user_column !== 0)
              .sort((a, b) => parseInt(a.user_column, 10) - parseInt(b.user_column, 10));

            sortedOptionsByUserColumn.forEach((answer) => {
              itemsFromBackendNext.push({ id: uuidv4(), content: answer.option });
            });
            filteredOptionsUserColumnZero.forEach((answer) => {
              itemsFromBackendNext0.push({ id: uuidv4(), content: answer.option });
            });

            columnsFromBackendNext = colArray.reduce((columns, name) => {
              columns[uuidv4()] = {
                name: name,
                items: []
              };
              return columns;
            }, {});
        
            const columnIds = Object.keys(columnsFromBackendNext);
            columnsFromBackendNext[columnIds[0]].items = itemsFromBackendNext0; 
            columnsFromBackendNext[columnIds[1]].items = itemsFromBackendNext;            
            // console.log(columnsFromBackendNext);
          }
        // }
      // })
      return columnsFromBackendNext;
    }

    const itemsFromBackend = [];
    listItems[currentItemIndex].test_item_options.forEach((answer) => {
      // console.log(answer.option)
      itemsFromBackend.push({ id: uuidv4(), content: answer.option });
    });

    const jsonString = listItems[currentItemIndex]?.test_item_content;
    const decodedString = decodeDiacritics(jsonString);
    
    // Parsează JSON-ul pentru a obține obiectul
    const jsonObject = JSON.parse(decodedString);
    
    const task_en = jsonObject.en;
    const task_ro = jsonObject.ro;
    
    // console.log(task_en); 
    // console.log(task_ro); 
    
    const test_task = language === "ro" ? task_ro : task_en;


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

    // const currentTest = currentTests[currentIndexTest];
    const currentTest = allTeacherTests[currentItemIndex];
    

    // console.log(columnArray)
    // console.log(currentTests[currentIndexTest].column_title)

    // console.log("currentTests",currentTests)
    // console.log("currentIndexTest",currentIndexTest)
    // console.log("currentTests[currentIndexTest]",currentTests[currentIndexTest])
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

      // console.log(result);
      // console.log(columns);      

      if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        // console.log("sourceItems",sourceItems);
        // console.log("destItems",destItems); 
        // console.log("sourceColumn",sourceColumn);    
        // console.log("sourceColumnName",sourceColumn.name);     
        // console.log("destColumn",destColumn);     
        // console.log("columnArray", columnArray);     
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
                option.option === selectedOption.option ? { ...option, user_column: sourceColumn.name === coloanaRaspuns ? 1 : 0 } : option
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
                // if (isChronoDubleTest) {
                //   return option.option === selectedOption.option ? { ...option, user_column: index + 1 } : option;
                // } 
                if (isChronoDubleTest) {
                  return option.option === selectedOption.option ? { ...option, user_column: destColumn.name === coloanaRaspuns ? 1 : 0 } : option;
                } 
                else {
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
                option.option === selectedOption.option ? { ...option, user_column: column.name === coloanaRaspuns ? 1 : 0 } : option
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
      correctAnswers.sort((a, b) => parseInt(a.explanation) - parseInt(b.explanation));
    }
    // console.log("currentTest.type",currentTest.type)
    if(currentTest.type == "dnd_chrono") {
      correctValues = correctAnswers
      .sort((a, b) => parseInt(a.explanation) - parseInt(b.explanation))
      .map(item => item.option);
    }
    correctAnswers.sort((a, b) => parseInt(a.explanation) - parseInt(b.explanation));
    let selValues = Object.values(columns)
      .filter(column => column.name === coloanaRaspuns)
      .map(column => column.items.map(item => item.content))
      .flat();
    if(currentTest.type!=="dnd_chrono" && currentTest.type!=="dnd_chrono_double" && currentTest.type!=="dnd_group") {
      selectedValuesString = selValues.sort().join(",");
      correctValuesString = correctValues.sort().join(","); 
      // console.log('selectedValuesString',selectedValuesString);  
      // console.log('correctValuesString',correctValuesString);  
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
      const index = allTeacherTests.findIndex(
        (item) => item.test_item_id === listItems[currentItemIndex].test_item_id
      );
      
      if (index !== -1) {
        const newProcent = (selectedValuesString === correctValuesString && selectedValues1String === correctValues1String) ? "100.000000" : "0.000000";
        dispatch(updateStudentProcent(index, newProcent));
        dispatch(updateStudentAnswer(index, selectedOptions));   
      }
    } else {
      setCorrectAnswer(selectedValuesString === correctValuesString);
      const index = allTeacherTests.findIndex(
        (item) => item.test_item_id === listItems[currentItemIndex].test_item_id
      );
      
      if (index !== -1) {
        const newProcent = selectedValuesString === correctValuesString ? "100.000000" : "0.000000";
        dispatch(updateStudentProcent(index, newProcent));
        dispatch(updateStudentAnswer(index, selectedOptions));   
      }
    }

    setIsDragDisabled(true);
  };

  const trimiteDateLaBackend = async (element) => {
    if (currentTests[0].path == "/test-de-totalizare") {
      const token = localStorage.getItem('auth_token');
      try {
        // console.log(element)
        const response = await axios.post('/api/student-summative-test-options', element
          // ,
          // {
          //   headers: {
          //     "Content-Type": "application/json",       
          //     "Authorization": token ? `Bearer ${token}` : '' 
          //   },
          // }
        );

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
    } else {
      try {
        // console.log(element)
        const response = await axios.post('/api/student-formative-test-options', element);

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
    }

  };

  const trimiteResultsLaBackend = async (element) => {
    if (currentTests[0].path == "/test-de-totalizare") {
      try {
        // console.log(element)
        const response = await axios.post('/api/student-summative-test-results', element);

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
    } else {
      try {
        // console.log(element)
        const response = await axios.post('/api/student-formative-test-results', element);

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
            ? `Cerințele sarcinii (${currentIndex + 1}/${
              list.length
              }):`
            : `Rezultat (${currentIndex + 1}/${list.length}):`
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
        {/* <p style={{
                paddingBottom: "20px",
                // textAlign: "center",
                fontWeight: "500",
              }}>{listItems[currentItemIndex].test_item_task}</p> */}

        <div dangerouslySetInnerHTML={{ __html: test_task }} />

        <img
          className="img-subject"
          src={
            listItems[currentItemIndex]?.image_path === null 
              ? "" 
              : `${process.env.REACT_APP_API_BASE_URL}/${listItems[currentItemIndex]?.image_path}`
          }
          alt=""
          style={{
            width: isNaN(
              parseInt(listItems[currentItemIndex]?.procent_paper, 10)
            )
              ? "40%"
              : `${
                  100 - parseInt(listItems[currentItemIndex]?.procent_paper, 10)
                }%`,
          }}
        />

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
            list.length
          }):`}
          open={true}
          className="non_animation"
        >
          <ItemText classNameChild="">
            {currentTest.type !== "dnd_group" ? (
                (currentTest.type === "dnd_chrono" || currentTest.type === "dnd_chrono_double"
                  ? correctAnswers.slice().sort((a, b) => parseInt(a.explanation) - parseInt(b.explanation))
                  : correctAnswers
                ).map((answer, idx) => (
                  <div className="cardChrono" key={idx}>{answer.option}</div>
                ))
              ) : (
              <>
                <div className="cardChrono">{raspunsUltimaColoana}</div>
                <div className="cardChrono">{raspunsPenUltimaColoana}</div>
              </>
            )}
          </ItemText>
          {/* <button onClick={()=> handleTryAgainClear(currentTest.formative_test_id)} className="btn-test">
            Încearcă din nou!
          </button> */}
        </ItemAccordeon>
      )}
    </>
    );
  }
);

export default TestBoard;
