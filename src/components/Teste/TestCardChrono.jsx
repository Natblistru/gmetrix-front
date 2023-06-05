import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import ItemAccordeon from "../Accordeon/ItemAccordeon";
import ItemText from "../Accordeon/ItemText";

const TestCardChrono = ({
  list,
  currentIndex,
  correctAnswer,
  setCorrectAnswer,
  additionalContent,
  handleTryAgain,
}) => {
//   const [selectedValues, setSelectedValues] = useState([]);
  const [data, setData] = useState(list.quizArray[currentIndex].answers);
  const [isDragDisabled, setIsDragDisabled] = useState(false);


  const checkAnswer = () => {
    const selectedValues = data.map((answer) => answer.text);
    const correctValues = list.quizArray[currentIndex].correctAnswer.map(
      (answer) => answer.text
    );
    const selectedValuesString = selectedValues.join(",");
    const correctValuesString = correctValues.join(","); 
    setCorrectAnswer(selectedValuesString === correctValuesString);
    setIsDragDisabled(true);
  };

  const handleTryAgainClear = () => {
//     setSelectedValues([]);
    setIsDragDisabled(false);
    handleTryAgain();
  };


  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setData(items);
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
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="list">
              {(provided) => (
                <div
                  className="wrapperChrono"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  {data &&
                    data.map((item, index) => {
                      return (
                        <Draggable
                          isDragDisabled={isDragDisabled}
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="cardChrono"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {item.text}
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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
              <div className="cardChrono" key={idx}>{answer.text} ({answer.anul})</div>
            ))}
          </ItemText>
          <button onClick={handleTryAgainClear} className="btn-test">
            Încearcă din nou!
          </button>
        </ItemAccordeon>
      )}
    </>
  );
};

export default TestCardChrono;
