import React, { useState } from "react";
import Canvas from "./Canvas";
const Draw = (props) => {
  return (
    <section>
      <Canvas {...props}/>
    </section>
  )
} 
export default Draw;