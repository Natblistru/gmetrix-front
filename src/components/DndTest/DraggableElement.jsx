import React, { useRef } from 'react';

function DraggableElement({children}) {
  const divRef = useRef(null);
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    divRef.current.style.top = `${divRef.current.offsetTop - pos2}px`;
    divRef.current.style.left = `${divRef.current.offsetLeft - pos1}px`;
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }

  function makeDraggable(child) {
    return React.cloneElement(child, {
      onMouseDown: dragMouseDown
    });
  }
  return (
    <div
      ref={divRef}
      style={{ position: 'absolute', top: 0, left: 0 }}
      onMouseDown={dragMouseDown}
    >
      {React.Children.map(children, makeDraggable)}
    </div>
  );
}

export default DraggableElement;
