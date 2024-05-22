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

function ViewMyTests({ onAddTest, onEditTest }) {

  const [loading, setLoading] = useState(true);
  const [teacherTopicList, setTeacherTopicList] = useState([]);

  const columns_header = ["ID", "№",       "Title", "Type", "Level", "Topic",       "Edit",     "Status"];
  const columns =        ['id', 'order_number', 'title', 'type', 'name',      'topic_name',  'editLink', 'status'];
  const mapReactColumnToDBColumn = (reactColumnName) => {
    const columnMap = {
      'ID': 'id',
      'Title': 'title',
      'Type': 'type',
      'Level': 'name',
      'Topic': 'topic_name',   
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
  const [teacherList, setTeacherList] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [allTeacherTopicList, setAllTeacherTopicList] = useState([]);

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
    teacher_topic_id: '',
    associatedTopicIds: [],
  })

  const handleInput = (e) => {
    e.persist();
    const { name, value } = e.target;
  
    setFilter((prevFilter) => {
      const updatedFilter = { ...prevFilter };
  
      if (name === 'learning_program_id') {
        updatedFilter[name] = value;
        updatedFilter.theme_learning_program_id = '';
        updatedFilter.associatedTopicIds = [];
      } else if (name === 'theme_learning_program_id') {
        updatedFilter[name] = value;

        const associatedTopics = topicList.filter((topic) => topic.theme_learning_program_id == value);
        const topicIds = associatedTopics.map((topic) => topic.id);

        updatedFilter.associatedTopicIds = topicIds;
        updatedFilter.teacher_topic_id = ''; 
      } else {
        updatedFilter[name] = value;
      }
  
      return updatedFilter;
    });
  };

  useEffect(() => {

    axios.get('/api/all-learningPrograms').then(res=>{
      if(res.data.status === 200){
        setLearningProgramList(res.data.learningProgram);
      }
    });

    axios.get('/api/all-themeLearningPrograms').then(res=>{
      if(res.data.status === 200){
        setThemeList(res.data.theme);
      }
    });

    axios.get('/api/all-teacher-topics').then(res=>{
      if(res.data.status === 200){
        setAllTeacherTopicList(res.data.teacherTopics);
      }
    });

    axios.get('/api/all-topics').then(res=>{
      if(res.data.status === 200){
        setTopicList(res.data.topics);
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
          filterProgram: filter.learning_program_id,
          filterTheme: filter.theme_learning_program_id,
          filterTopic: filter.teacher_topic_id,
          paramTeacher: localStorage.getItem('auth_roleId'),
        };
        const response = await axios.get('/api/view-myTests', { params });
          if (response.data.status === 200) {
            // console.log(response.data)
            setTeacherTopicList(response.data.formativeTest)
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
      <button onClick={() => handleEditTest(item.id)} className="btnBts btn-success btn-small">Edit</button>
    ),
    'status': (item) => (item.status === 0 ? 'Shown' : 'Hidden'),
  };

  const handleAddTest = () => {
    onAddTest();
  };

  const handleEditTest = (item_id) => {
    onEditTest(item_id);
  };

  return (
    <div className="containerBts w-100">
      <div className="cardBts mt-4">

        <div className="card-header">
          <h4>Formative Test List
          </h4>
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

            <button onClick={handleAddTest}  className="btnBts btn-primary text-white btn-sm float-end">Add Test</button>
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
                <div className="col-md-4">
                  <div className="form-group">
                    <select name="teacher_topic_id" onChange={handleInput} value={filter.teacher_topic_id} className="form-control">  
                      <option value="">Select Topic</option>
                      {
                        allTeacherTopicList
                        .filter((item) => item.teacher_id == localStorage.getItem('auth_roleId'))
                        .filter((item) => filter.associatedTopicIds.includes(item.topic_id))
                        .map((item)=> {
                          return (
                            <option value={item.id} key={item.id}>{item.name}</option>
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
              <div className="table-responsive">
              <table className={`table table-primary table-bordered table-striped ${teacherTopicList.length == 0 ? 'table-fixed' : ''}`} style={{ width: '100%' }}>
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
export default ViewMyTests;
