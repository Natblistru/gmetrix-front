import React from 'react';

const SORT_ASC = "asc"
const SORT_DESC = "desc"

const TableHeader = ({ columns, handleSort, sortColumn, sortOrder}) => {
  return (
    <thead key={`${sortColumn}_${sortOrder}`}>
      <tr>
        {columns.map((column) => (
          <th key={column} onClick={(e) => handleSort(column)}>
            {column.toUpperCase().replace("_", " ")}
            {column === sortColumn ? (
              <span>
                {sortOrder === SORT_ASC ? (
                  <i className="ms-1 fa fa-arrow-up" aria-hidden="true"></i>
                ) : (
                  <i className="ms-1 fa fa-arrow-down" aria-hidden="true"></i>
                )}
              </span>
            ): null}
          </th>
        ))}
      </tr>
    </thead>
  );
};
export default TableHeader;