import React from "react";
import AllTasks from "./AllTasks";
import { Droppable } from "react-beautiful-dnd";
import "../../index.css"

const Column = React.memo(({ tasks, column, columnId, isDragDisabled, typeList }) => {
  return (
    <div className={`column ${typeList==="dnd_chrono"? 'one' : typeList==="dnd_group"? 'three' :''}`}>
      <div className="card card-radius ">
        
        <div className="card-content">
        <p className="title-card">{column.name}</p>
          <Droppable droppableId={columnId} >
            {(provided, snapshot) => (
              <div
                className="list is-hoverable"
                {...provided.droppableProps}
                ref={provided.innerRef}
                key={columnId}
                style={{
                  // background: snapshot.isDraggingOver
                  //   ? "lightblue"
                  //   : "lightgrey",
                  padding: 4,
                  flex: 1,
                  minWidth: typeList==="dnd_group"? "190px" :"300px",
                  width: typeList==="dnd_chrono"
                     ? "100%"
                     : typeList==="dnd_group"
                     ? "190px" 
                     : "300px",
                  // width: 300,
                  minHeight: 500
                }}
              >
                <AllTasks tasks={column.items}  isDragDisabled={isDragDisabled} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </div>
  );
});

export default Column;