import React, { useState } from 'react';
import ContextData from '../context/ContextData';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';


const TreeTableItem = ({ item, level }) => {
  const [opened, setOpened] = useState(item.opened || false);

  const toggleOpened = () => {
    if (item.children) {
      setOpened(!opened);
    }
  };

  return (
    <React.Fragment key={item.name}>
      <tr className={`${
          item.children ? 'parent' : ''
        } ${level === 1 ? 'top-level-parent' : ''} ${
          level === 2 ? 'level-two' : ''
        }`} 
        onClick={toggleOpened}>
        <td className="cell-name">
          <span style={{ paddingLeft: `${15 * level}px` }}>
            {item.children && item.children.length > 0 && (
              <FontAwesomeIcon icon={faAngleRight} rotation={opened ? 90 : 0} style={{ paddingRight: '5px' }}/>
            )}
            {item.name}
          </span>
        </td>
        {/* <td className="cell-members">{item.children ? item.children.length : 0}</td> */}
        <td style={{width: '10%', paddingLeft: '20px'}}>{item.title}</td>
      </tr>
      {item.children && item.children.length > 0 && opened && (
        <tr>
          <td colSpan="4">
            <table className="table-nested-child">
              <tbody>
                {item.children.map((child, idx) => (
                  <TreeTableItem key={idx} item={child} level={level + 1} />
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

const TreeTable = ({list}) => {

  const toggleChildren = (parentItem) => {
    for (const child of parentItem.children) {
      child.selected = parentItem.selected;
      if (child.children) {
        toggleChildren(child);
      }
    }
  };

  const toggleParent = (parentItem) => {
    const children = parentItem.children;
    parentItem.selected = children.every((child) => child.selected);
    if (parentItem.parent) {
      toggleParent(parentItem.parent);
    }
  };

  return (
    <div>
      <table className="table-nested">
        <thead>
          <tr>
            <th style={{width: '90%', paddingLeft: '15px'}}>Denumire</th>
            <th style={{width: '10%'}}>Rezultat</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item,idx) => (
            <TreeTableItem
              key={idx}
              item={item}
              level={1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TreeTable;