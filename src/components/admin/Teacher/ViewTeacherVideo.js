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

function ViewTeacherTopic() {

  const [loading, setLoading] = useState(true);
  const [teacherTopicList, setTeacherTopicList] = useState([]);

  const columns_header = ["ID", "Title", "Source", "Edit",     "Status"];
  const columns =        ['id', 'name', 'source', 'editLink', 'status'];
  const mapReactColumnToDBColumn = (reactColumnName) => {
    const columnMap = {
      'ID': 'id',
      'Title': 'name',
      'Source': 'source',
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
  const [chapterList, setChapterList] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [themeProgramList, setThemeProgramList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [themeIds, setThemeIds] = useState([])

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
    teacher_id: '',
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
        // console.log(selectedLearningProgram)
        // console.log(selectedLearningProgram?.subject_study_level_id)
      } else if (name === 'chapter_id') {
        updatedFilter[name] = value;
  
        const themeIds = themeList
          .filter((theme) => theme.chapter_id == value)
          .map((theme) => theme.id);
  
        setThemeIds(themeIds);
  
        updatedFilter.theme_learning_program_id = '';
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
        setThemeProgramList(res.data.theme);
      }
    });

    axios.get('/api/all-themes').then(res=>{
      if(res.data.status === 200){
        setThemeList(res.data.themes);
      }
    });

    axios.get('/api/all-chapters').then(res=>{
      if(res.data.status === 200){
        setChapterList(res.data.chapters);
      }
    });

    axios.get('/api/all-teachers').then(res=>{
      if(res.data.status === 200){
        setTeacherList(res.data.teachers);
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
          filterChapter: filter.chapter_id,
          filterTeacher: filter.teacher_id,
        };
        const response = await axios.get('/api/view-teacherVideos', { params });
          if (response.data.status === 200) {
            // console.log(response.data)
            setTeacherTopicList(response.data.teacherVideos);
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
      <Link to={`/admin/edit-teacher-video/${item.id}`} className="btnBts btn-success btn-small">
        Edit
      </Link>
    ),
    'status': (item) => (item.status === 0 ? 'Shown' : 'Hidden'),
  };

  const getLearningProgramById = (learningProgramId) => {
    return learningProgramList.find((program) => program.id == learningProgramId);
  };

  return (
    <div className="containerBts px-4">
      <div className="cardBts mt-4">
      <div className="card-title m-3">
        <h2>Teacher Video List</h2>
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

        <Link to="/admin/add-teacher-video" className="btnBts btn-primary text-white float-end">Add Teacher Video</Link>
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
            <div className="col-md-8">
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
                  <select name="teacher_id" onChange={handleInput} value={filter.teacher_id} className="form-control">  
                    <option value="">Select Teacher</option>
                    {
                      teacherList.map((item)=> {
                        return (
                          <option value={item.id} key={item.id}>{item.name}</option>
                        )
                      })
                    }
                  </select>            
                </div>
              </div> 
              <div className="col-md-8">          
                <div className="form-group">
                  <select name="theme_learning_program_id" onChange={handleInput} value={filter.theme_learning_program_id} className="form-control">  
                    <option value="">Select Theme</option>
                    {themeProgramList
                      .filter((item) => themeIds.includes(item.theme_id))
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
export default ViewTeacherTopic;
