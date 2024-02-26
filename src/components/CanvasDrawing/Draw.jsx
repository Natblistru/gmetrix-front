import React, { useState } from "react";
import Canvas from "./Canvas";
const Draw = (props) => {
  console.log(props.item)
  return (
    <section>
      <Canvas {...props}/>
    </section>
  )
} 
export default Draw;