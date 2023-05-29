import React from 'react';
import DiagramItem from './DiagramItem';

const DiagramTable = (props) => {
  const classes = 'tree ' + props.className;
  let diagramData = props.list;
  const renderDiagramItems = (items) => {
    return items.map((item) => (
      <DiagramItem key={item.text} text={item.text}>
        {item.children.length > 0 && renderDiagramItems(item.children)}
      </DiagramItem>
    ));
  };

  return (
    <div>
      <ul className={classes}>
        {renderDiagramItems(diagramData)}
      </ul>
    </div>
  );
};

export default DiagramTable;
