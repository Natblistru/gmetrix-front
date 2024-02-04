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
        {columns.map((column) => {
          const cellValue = getValue(item, column);

          // Adăugare condiție pentru word-break: break-all
          const shouldApplyWordBreak = typeof cellValue === 'string' && cellValue.length > 12;
          const cellStyle = shouldApplyWordBreak ? { wordBreak: 'break-all' } : {};

          // console.log('Column:', column, 'Value:', cellValue);

          return <td key={column} style={cellStyle}>{cellValue}</td>;
        })}
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