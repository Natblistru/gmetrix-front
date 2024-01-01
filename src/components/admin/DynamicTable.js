import React from 'react';

const DynamicTable = ({ data, columns, commonColumns, loading }) => {
  const getValue = (item, column) => {
    if (commonColumns[column]) {
      return commonColumns[column](item);
    }

    const keys = column.split('.');
    let value = item;

    for (const key of keys) {
      if (value && value[key] !== undefined) {
        value = value[key];
      } else {
        value = '';
        break;
      }
    }

    return value;
  };

  return (
    <tbody>
    {!loading ? (
      data.map((item, index) => (
        <tr key={index}>
          {columns.map((column) => (
            <td key={column}>{getValue(item, column)}</td>
          ))}
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={columns.length + 1}>
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </td>
      </tr>
    )}
  </tbody>
  );
};
export default DynamicTable;