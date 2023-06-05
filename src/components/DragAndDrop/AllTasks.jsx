import React, { useEffect } from "react";
import Task from "./Task";

const AllTasks = React.memo(({ tasks,  isDragDisabled }) => {
  useEffect(() => {}, [tasks]);
  return tasks?.map((task, index) => (
    <Task key={task.id} item={task} index={index}  isDragDisabled={isDragDisabled}/>
  ));
});


export default AllTasks;