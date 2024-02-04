import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { debounce } from "lodash"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Paginator from '../Paginator';
import TableHeader from '../TableHeader';
import DynamicTable from '../DynamicTable';

const SORT_ASC = "asc"
const SORT_DESC = "desc"
const PER_PAGE_OPTIONS = [5,10,20,50,100]

function ViewEvaluationSubject() {

  const [loading, setLoading] = useState(true);
  const [evaluationSubjectList, setEvaluationSubjectList] = useState([]);
  const [teacherTopicList, setTeacherTopicList] = useState([]);

  const columns_header = ["ID", "Name", "Evaluation", "Edit",     "Status"];
  const columns =        ['id', 'name', 'evaluation_name', 'editLink', 'status'];
  const mapReactColumnToDBColumn = (reactColumnName) => {
    const columnMap = {
      'ID': 'id',
      'Name': 'name',
      'Evaluation': 'evaluation_name',
      'Status': 'status',
    };
  
    return columnMap[reactColumnName] || reactColumnName;
  };

  const [sortColumn, setSortColumn] = useState(columns[0]);
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [search, setSearch] = useState("")
  const [perPage, setPerPage] = useState(10)
  const [pagination, setPagination] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [blockFilterVisible, setBlockFilterVisible] = useState(false);
  const [learningProgramList, setLearningProgramList] = useState([]);
  const [evaluationList, setEvaluationList] = useState([]);
  const [yearsList, setYearsList] = useState([]);
  const [typesList, setTypesList] = useState([]);

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
        setCurrentPage(1)
        setSortOrder(SORT_ASC)
        setSortColumn(columns[0])
    }, 500)
  ).current

  const handlePerPage = (perPage) => {
    setCurrentPage(1)
    setPerPage(perPage)
  }

  const toggleblockVisible = () => {
    setBlockFilterVisible(!blockFilterVisible);
  };

  const [filter, setFilter] = useState({
    subject_study_level_id: '',
    evaluation_id: '',
    year: '',
    type: '',
  })

  const handleInput = (e) => {
    e.persist();
    const { name, value } = e.target;
  
    setFilter((prevFilter) => {
      const updatedFilter = { ...prevFilter };
  
      if (name === 'subject_study_level_id') {
        updatedFilter[name] = value;
        updatedFilter.year = '';
        updatedFilter.type = '';
      } else {
        updatedFilter[name] = value;
      }
  
      return updatedFilter;
    });
  };

  useEffect(() => {

    axios.get('http://localhost:8000/api/all-subject-study-level').then(res=>{
      if(res.data.status === 200){
        setLearningProgramList(res.data.subject);
      }
    });

    axios.get(`http://localhost:8000/api/all-evaluations`).then(res=> {
      if(res.data.status === 200){
        setEvaluationList(res.data.evaluations)
        setYearsList(res.data.years);
        setTypesList(res.data.types);

      }
    });


  },[])

  useEffect(()=>{
    // console.log(currentPage)
    const fetchData = async () => {
      try {
        const params = {
          search,
          sortColumn: mapReactColumnToDBColumn(sortColumn),
          sortOrder: sortOrder,
          perPage: perPage,
          page: currentPage,
          filterProgram: filter.subject_study_level_id,
          filterEvaluation: filter.evaluation_id,
          filterYear: filter.year,
          filterType: filter.type,
        };
        const response = await axios.get('http://localhost:8000/api/view-evaluation-subjects', { params });
          if (response.data.status === 200) {
            // console.log(response.data)
            setTeacherTopicList(response.data.evaluationSubjects);
            setPagination(response.data.pagination)
        }
          setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }
    fetchData();
  },[sortColumn, sortOrder, search, perPage, currentPage, filter])

  const commonColumns = {
    'editLink': (item) => (
      <Link to={`/admin/edit-evaluation-subject/${item.id}`} className="btnBts btn-success btn-small">
        Edit
      </Link>
    ),
    'status': (item) => (item.status === 0 ? 'Shown' : 'Hidden'),
  };

  return (
    <div className="containerBts px-4">
      <div className="cardBts mt-4">
      <div className="card-title m-3">
        <h2>Evaluation Subject List</h2>
      </div>
      <div className="rowBts mx-4 mt-2">

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
        <div className="col-md-3">
            <div className="input-group">
                <label className="mt-2 me-2">Per page</label>
                <select className="form-select" value={perPage} onChange={(e) => handlePerPage(e.target.value)}>
                    {PER_PAGE_OPTIONS.map((perPage) => {
                      return (
                        <option key={perPage}>{perPage}</option>
                      )
                    })}

                </select>
            </div>
        </div>
        <div className="col-md-2">
          <FontAwesomeIcon icon={faFilter} onClick={toggleblockVisible} className="btnBts btn-outline-secondary mt-1" style={{ borderColor: '#cdd2d6'}}/>
        </div>
        <div className="col-md-4">

        <Link to="/admin/add-evaluation-subject" className="btnBts btn-primary text-white float-end">Add Evaluation Subject</Link>
        </div>
      </div>
        {blockFilterVisible && 
          <div className="rowBts mx-4 mt-2">
            <div className="col-md-3">
                <div className="form-group">
                  <select name="subject_study_level_id" onChange={handleInput} value={filter.subject_study_level_id} className="form-control">  
                    <option value="">Select program</option>
                    {
                      learningProgramList.map((item)=> {
                        return (
                          <option value={item.id} key={item.id}>{item.name}</option>
                        )
                      })
                    }
                  </select>            
                </div>
            </div>
            <div className="col-md-5">
                <div className="form-group">
                  <select name="evaluation_id" onChange={handleInput} value={filter.evaluation_id} className="form-control">  
                    <option value="">Select evaluation</option>
                    {
                      evaluationList.map((item)=> {
                        return (
                          <option value={item.id} key={item.id}>{item.name}</option>
                        )
                      })
                    }
                  </select>            
                </div>
            </div>
            <div className="col-md-2">          
                <div className="form-group">
                  <select name="year" onChange={handleInput} value={filter.year} className="form-control">  
                    <option value="">Select Year</option>
                    {yearsList
                      .map((item,idx) => (
                        <option value={item} key={idx}>
                          {item}
                        </option>
                    ))}
                  </select>            
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <select name="type" onChange={handleInput} value={filter.type} className="form-control">  
                    <option value="">Select Type</option>
                    {
                      typesList.map((item,idx)=> {
                        return (
                          <option value={item} key={idx}>{item}</option>
                        )
                      })
                    }
                  </select>            
                </div>
              </div> 

          </div>
        }
        <div className="rowBts m-2">
          <div className="col-md-12">
            <div className="card-body">
              <table className={`table table-primary table-bordered table-responsive table-striped ${teacherTopicList.length == 0 ? 'table-fixed' : ''}` } style={{ width: '100%'}}>
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
        {teacherTopicList.length > 0 && !loading ? (
          <div className="my-2 mx-3">
              <Paginator
                  pagination={pagination}
                  pageChanged={(page) => setCurrentPage(page)}
                  totalItems={teacherTopicList.length}
              />
          </div>
            ) : null}
      </div>
    </div>
  );
}
export default ViewEvaluationSubject;
