import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

function ViewSummativeTestItem() {

  const [loading, setLoading] = useState(true);
  const [teacherTopicList, setTeacherTopicList] = useState([]);

  const columns_header = ["ID", "Order",        "Task",           "Type",           "Test Summative",       "Topic",              "Edit",     "Status"];
  const columns =        ['id', 'order_number', 'test_item_task', 'test_item_type', 'summative_test_title', 'teacher_topic_name', 'editLink', 'status'];
  const mapReactColumnToDBColumn = (reactColumnName) => {
    const columnMap = {
      'ID': 'id',
      'Order': 'order_number',
      'Task': 'test_item_task',
      'Type': 'test_item_type',
      'Test Summative': 'summative_test_title',
      'Topic': 'teacher_topic_name',
      'Status': 'status',
    };
  
    return columnMap[reactColumnName] || reactColumnName;
  };
  
  const [sortColumn, setSortColumn] = useState(columns[0]);
  const [sortOrder, setSortOrder] = useState("asc"); 

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder((currentSortOrder) => (currentSortOrder === SORT_ASC ? SORT_DESC : SORT_ASC));
    } else {
      setSortColumn(column);
      setSortOrder(SORT_ASC);
    }
  };

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const params = {
          sortColumn: mapReactColumnToDBColumn(sortColumn),
          sortOrder: sortOrder,
        };
        const response = await axios.get('http://localhost:8000/api/view-summative-test-item', { params });
          if (response.data.status === 200) {
            setTeacherTopicList(response.data.summativeTestItem);
        }
          setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, [sortColumn, sortOrder]);

  const commonColumns = {
    'editLink': (item) => (
      <Link to={`/admin/edit-summative-test-item/${item.id}`} className="btnBts btn-success btn-small">
        Edit
      </Link>
    ),
    'status': (item) => (item.status === 0 ? 'Shown' : 'Hidden'),
  };

  return (
    <div className="containerBts px-4">
      <div className="cardBts mt-4">
        <div className="card-header">
          <h4>Summative Test Item List
            <Link to="/admin/add-summative-test-item" className="btnBts btn-primary text-white btn-sm float-end">Add Summative Test Items</Link>
          </h4>
        </div>
        <div className="card-body">
        <table className="table table-primary table-bordered  table-striped">
          <TableHeader
            columns={columns_header}
            handleSort={handleSort}
            sortColumn={sortColumn}
            sortOrder={sortOrder}
          />
          <DynamicTable data={teacherTopicList} columns={columns} commonColumns={commonColumns} loading={loading}/>
        </table>
        </div>
      </div>
    </div>
  );
}
export default ViewSummativeTestItem;
