import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { debounce } from "lodash"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Paginator from '../../components/admin/Paginator';
import TableHeader from '../../components/admin/TableHeader';
import DynamicTable from '../../components/admin/DynamicTable';

const SORT_ASC = "asc"
const SORT_DESC = "desc"
const PER_PAGE_OPTIONS = [5,10,20,50,100]

function ViewMyTopics({ onAddTopic, onEditTopic }) {

  const [loading, setLoading] = useState(true);
  const [teacherTopicList, setTeacherTopicList] = useState([]);

  const columns_header = ["ID", "Order",        "Title", "Theme",  "Edit",     "Status"];
  const columns =        ['id', 'order_number', 'name',  'theme_name',  'editLink', 'status'];
  const mapReactColumnToDBColumn = (reactColumnName) => {
    const columnMap = {
      'ID': 'id',
      'Order': 'order_number',
      'Title': 'name',
      'Theme': 'theme_name',
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
  const [themeList, setThemeList] = useState([]);
  const [chapterList, setChapterList] = useState([]);

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
    learning_program_id: '',
    theme_learning_program_id: '',
    chapter_id: '',
    subject_study_level_id: '',
  })

  const handleInput = (e) => {
    e.persist();
    const { name, value } = e.target;
  
    setFilter((prevFilter) => {
      const updatedFilter = { ...prevFilter };
  
      if (name === 'learning_program_id') {
        updatedFilter[name] = value;
        updatedFilter.theme_learning_program_id = '';
        const selectedLearningProgram = getLearningProgramById(value);
        updatedFilter.subject_study_level_id = selectedLearningProgram?.subject_study_level_id || ''; 
        console.log(selectedLearningProgram)
        console.log(selectedLearningProgram?.subject_study_level_id)
      } else {
        updatedFilter[name] = value;
      }
  
      return updatedFilter;
    });
  };

  useEffect(() => {

    axios.get('http://localhost:8000/api/all-learningPrograms').then(res=>{
      if(res.data.status === 200){
        setLearningProgramList(res.data.learningProgram);
      }
    });

    axios.get('http://localhost:8000/api/all-themeLearningPrograms').then(res=>{
      if(res.data.status === 200){
        setThemeList(res.data.theme);
      }
    });

    axios.get('http://localhost:8000/api/all-chapters').then(res=>{
      if(res.data.status === 200){
        setChapterList(res.data.chapters);
      }
    });

  },[])

  useEffect(()=>{
    console.log(localStorage.getItem('auth_roleId'))
    const fetchData = async () => {
      try {
        const params = {
          search,
          sortColumn: mapReactColumnToDBColumn(sortColumn),
          sortOrder: sortOrder,
          perPage: perPage,
          page: currentPage,
          filterProgram: filter.learning_program_id,
          filterTheme: filter.theme_learning_program_id,
          filterChapter: filter.chapter_id,
          paramTeacher: localStorage.getItem('auth_roleId'),
        };
        const response = await axios.get('http://localhost:8000/api/view-myTopics', { params });
          if (response.data.status === 200) {
            // console.log(response.data)
            setTeacherTopicList(response.data.teacherTopics)
            setPagination(response.data.pagination)
        }
          setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, [sortColumn, sortOrder, search, perPage, currentPage, filter ]);

  const commonColumns = {
    'editLink': (item) => (
      <button onClick={() => handleEditTopic(item.id)} className="btnBts btn-success btn-small">Edit</button>
    ),
    'status': (item) => (item.status === 0 ? 'Shown' : 'Hidden'),
  };

  const handleAddTopic = () => {
    onAddTopic();
  };

  const handleEditTopic = (item_id) => {
    onEditTopic(item_id);
  };

  const getLearningProgramById = (learningProgramId) => {
    return learningProgramList.find((program) => program.id == learningProgramId);
  };

  return (
    <div className="containerBts px-4">
      <div className="cardBts mt-4">
        <div className="card-header">
          <h4>Teacher Topic List</h4>
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

            <button onClick={handleAddTopic} className="btnBts btn-primary text-white btn-sm float-end">Add My Topic</button>
          </div>
        </div>
        {blockFilterVisible && 
            <div className="rowBts mx-4 mt-2">
              <div className="col-md-4">
                  <div className="form-group">
                    <select name="learning_program_id" onChange={handleInput} value={filter.learning_program_id} className="form-control">  
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
              <div className="col-md-4">
                <div className="form-group">
                  <select name="chapter_id" onChange={handleInput} value={filter.chapter_id} className="form-control">  
                    <option value="">Select Chapter</option>
                    {
                      chapterList
                      .filter((item) => item.subject_study_level_id == filter.subject_study_level_id)
                      .map((item)=> {
                        return (
                          <option value={item.id} key={item.id}>{item.name}</option>
                        )
                      })
                    }
                  </select>            
                </div>
              </div> 
              <div className="col-md-4">          
                  <div className="form-group">
                    <select name="theme_learning_program_id" onChange={handleInput} value={filter.theme_learning_program_id} className="form-control">  
                      <option value="">Select Theme</option>
                      {themeList
                        .filter((item) => item.learning_program_id == filter.learning_program_id)
                        .map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                      ))}
                    </select>            
                  </div>
                </div>


            </div>
          }

        <div className="rowBts m-2">
          <div className="col-md-12">
            <div className="card-body">
            <table className={`table table-primary table-bordered table-responsive table-striped ${teacherTopicList.length == 0 ? 'table-fixed' : ''}`}>
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
export default ViewMyTopics;
