import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { debounce } from "lodash"

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

  const columns_header = ["ID", "Order",        "Task", "Type", "Test Summative","Topic", "Edit",     "Status"];
  const columns =        ['id', 'order_number', 'task', 'type', 'title',          'name', 'editLink', 'status'];
  const mapReactColumnToDBColumn = (reactColumnName) => {
    const columnMap = {
      'ID': 'id',
      'Order': 'order_number',
      'Task': 'task',
      'Type': 'type',
      'Test Summative': 'title',
      'Topic': 'name',
      'Status': 'status',
    };
  
    return columnMap[reactColumnName] || reactColumnName;
  };
  
  const [sortColumn, setSortColumn] = useState(columns[0]);
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [search, setSearch] = useState("")
  const [perPage, setPerPage] = useState(10)

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder((currentSortOrder) => (currentSortOrder === SORT_ASC ? SORT_DESC : SORT_ASC));
    } else {
      setSortColumn(column);
      setSortOrder(SORT_ASC);
    }
  };

  const handleSearch = useRef(
    debounce((query) => {
        setSearch(query)
        // setCurrentPage(1)
        setSortOrder(SORT_ASC)
        setSortColumn(columns[0])
    }, 500)
  ).current

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const params = {
          search,
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
  }, [sortColumn, sortOrder, search]);

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
      <div className="card-title m-3">
        <h2>Summative Test Item List</h2>
      </div>
      <div className="rowBts m-2">

          <div className="col-md-3">
              <div className="input-group">
                  <input
                      className="form-control"
                      placeholder="Search..."
                      type="search"
                      onChange={(e) => handleSearch(e.target.value)}
                  />
              </div>
          </div>
          <div className="col-md-2">
              <div className="input-group">
                  <label className="mt-2 me-2">Per page</label>
                  <select className="form-select" value={perPage} onChange={() => {}}>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                  </select>
              </div>
          </div>
          <div className="col-md-7">
          <Link to="/admin/add-summative-test-item" className="btnBts btn-primary text-white float-end">Add Summative Test Items</Link>
          </div>
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
