import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ item, index,  isDragDisabled }) => {  
  return (
    <Draggable draggableId={String(item.id)} index={index} isDragDisabled={isDragDisabled}> 
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          key={String(item.id)}
          style={{
            userSelect: "none",
            // padding: 16,
            margin: "0 auto 8px",
            minHeight: "50px",
            backgroundColor: snapshot.isDragging
              ? "#eaf4f4"
              : "#f6fff8",
            // color: "white",
            ...provided.draggableProps.style
          }}
          className="cardChrono"
        >
          {item.content}
         </div>
      )}
    </Draggable>
  );
};

export default Task;