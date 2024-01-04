import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { debounce } from "lodash"
import { BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Paginator from './Paginator';
import TableHeader from './TableHeader';
import DynamicTable from './DynamicTable';

const data = [
    {
      name: 'Ian.',
      teste: 400,
      utilizatori: 240,
      amt: 2400,
    },
    {
      name: 'Febr.',
      teste: 300,
      utilizatori: 139,
      amt: 2210,
    },
    {
      name: 'Martie',
      teste: 200,
      utilizatori: 980,
      amt: 2290,
    },
    {
      name: 'Aprilie',
      teste: 278,
      utilizatori: 390,
      amt: 2000,
    },
    {
      name: 'Mai',
      teste: 189,
      utilizatori: 480,
      amt: 2181,
    },
    {
      name: 'Iunie',
      teste: 239,
      utilizatori: 380,
      amt: 2500,
    },
    {
      name: 'Iulie',
      teste: 349,
      utilizatori: 430,
      amt: 2100,
    },
  ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
    };

    const SORT_ASC = "asc"
    const SORT_DESC = "desc"
    const PER_PAGE_OPTIONS = [5,10,20,50,100]

function Dashboard() {

    const [loading, setLoading] = useState(true);
    const [userList, setUserList] = useState([]);

    const columns_header = ["ID", "First Name", "Last Name", "Email", "Role"];
    const columns =        ['id', 'first_name', 'last_name', 'email', 'role'];
    const mapReactColumnToDBColumn = (reactColumnName) => {
      const columnMap = {
        'ID': 'id',
        'First Name': 'first_name',
        'Last Name': 'last_name',
        'Email': 'email',
        'Role': 'role',
      };
      return columnMap[reactColumnName] || reactColumnName;
    };
    const [sortColumn, setSortColumn] = useState(columns[0]);
    const [sortOrder, setSortOrder] = useState("asc"); 
    const [search, setSearch] = useState("")
    const [perPage, setPerPage] = useState(10)
    const [pagination, setPagination] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [countUsers, setCountUsers] = useState([
        { name: 'teacher', value: 0 },
        { name: 'student', value: 0 },
        { name: 'undef', value: 0 },
    ]);

    const [themeList, setThemeList] = useState([]);
    const [testList, setTestList] = useState([]);
    const [evaluationItemList, setEvaluationItemList] = useState([]);

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

    useEffect(() => {

        axios.get('http://localhost:8000/api/all-themes').then(res=>{
          if(res.data.status === 200){
            setThemeList(res.data.themes);
          }
        });

        axios.get('http://localhost:8000/api/all-tests').then(res=>{
            if(res.data.status === 200){
              setTestList(res.data.tests);
            }
          });

        axios.get('http://localhost:8000/api/all-evaluation-items').then(res=>{
        if(res.data.status === 200){
            setEvaluationItemList(res.data.evaluationItems);
        }
        });
       
      },[])

    useEffect(()=>{
    const fetchData = async () => {
        try {
        const params = {
            search,
            sortColumn: mapReactColumnToDBColumn(sortColumn),
            sortOrder: sortOrder,
            perPage: perPage,
            page: currentPage,
        };
        const response = await axios.get('http://localhost:8000/api/all-users', { params });
            if (response.data.status === 200) {
            // console.log(response.data)
            setUserList(response.data.users)
            setPagination(response.data.pagination)
            const updatedCountUsers = countUsers.map((user) => {
                const name = user.name;
                return { ...user, value: parseInt(response.data.counts[name]) || 0 };
              });
    
              setCountUsers(updatedCountUsers);
        }
            setLoading(false);
        } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        }
    }
    fetchData();
    }, [sortColumn, sortOrder, search, perPage, currentPage ]);

    const commonColumns = {};
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4 mb-4">Dashboard</h1>
      <div className="rowBts">
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card text-white h-100" style={{backgroundColor:"#27a300"}}>
                    <div className="card-body pt-3" >
                        <div className="rotate">
                            <i className="fa fa-user fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Users</h6>
                        <h1 className="display-4">{pagination.total}</h1>
                    </div>
                </div>
            </div>
          <div className="col-xl-3 col-sm-6 py-2">
              <div className="card text-white h-100" style={{backgroundColor:"#d00000"}}>
                  <div className="card-body pt-3">
                      <div className="rotate">
                          <i className="fa fa-list fa-4x"></i>
                      </div>
                      <h6 className="text-uppercase">Themes</h6>
                      <h1 className="display-4">{themeList.length}</h1>
                  </div>
              </div>
          </div>
          <div className="col-xl-3 col-sm-6 py-2">
                <div className="card text-white h-100" style={{backgroundColor:"#219ebc"}}>
                    <div className="card-body pt-3">
                        <div className="rotate">
                          <i className="fab fa-twitter fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">examination items</h6>
                        <h1 className="display-4">{evaluationItemList.length}</h1>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card text-white h-100"  style={{backgroundColor:"#ffb703"}}>
                    <div className="card-body pt-3">
                        <div className="rotate">
                            <i className="fa fa-share fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Tests</h6>
                        <h1 className="display-4">{testList.length}</h1>
                    </div>
                </div>
            </div>
      </div>
      <div className="rowBts mt-4 mb-4">
          <div className="col-xl-6">
              <div className="card mb-4">
                  <div className="card-header pt-4 pb-4">
                      <i className="fas fa-chart-area me-1"></i>
                      Dinamica numărului de utilizatori
                  </div>
                  <div className="card-body">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 0,
                        bottom: 5,
                    }}
                    barSize={30}
                    animationDuration={1000} 
                    >
                    <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="utilizatori" fill="#8884d8" background={{ fill: '#eee' }} />
                    </BarChart>
                </ResponsiveContainer>
                  </div>
              </div>
          </div>
          <div className="col-xl-6">
              <div className="card mb-4">
                  <div className="card-header  pt-4 pb-4">
                      <i className="fas fa-chart-bar me-1"></i>
                      Numărul de teste trecute de elevi
                  </div>
                  <div className="card-body">
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="teste" stroke="#82ca9d" fill="#82ca9d" />
                        </AreaChart>
                    </ResponsiveContainer>
                  </div>
              </div>
          </div>
      </div>
      <div  className="rowBts mt-4 mb-4">
        <div className="card mb-4 col-md-9">
          <div className="card-header  pt-4 pb-2 px-3">
              <i className="fas fa-table me-1"></i>
              Users
          </div>
          <div className="containerBts">
            <div className="cardBts pt-3">
                <div className="rowBts mx-4">

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
                    <div className="col-md-4">
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
                </div>
                <div className="rowBts mx-2">
                <div className="col-md-12">
                    <div className="card-body">
                    <div className="table-responsive" style={{ width: '100%' }}>
                        <table className={`table table-primary table-bordered table-striped ${userList.length === 0 ? 'table-fixed' : ''}`} style={{ width: '100%' }}>
                        <TableHeader
                            columns={columns_header}
                            handleSort={handleSort}
                            sortColumn={sortColumn}
                            sortOrder={sortOrder}
                        />
                        <DynamicTable data={userList} columns={columns} commonColumns={commonColumns} loading={loading} />
                        </table>
                    </div>
                    </div>
                </div>
                </div>
                {userList.length > 0 && !loading ? (
                <div className="my-2 mx-3">
                    <Paginator
                        pagination={pagination}
                        pageChanged={(page) => setCurrentPage(page)}
                        totalItems={userList.length}
                    />
                </div>
                    ) : null}
            </div>
          </div>

        </div>
        <div className="col-md-3">
        {Object.values(countUsers).some(value => value != 0) && (
            <div className="card mb-4">
                    <div className="card-header  pt-4 pb-4">
                        <i className="fas fa-chart-bar me-1"></i>
                        Numarul de elevi si profesori (%)
                    </div>
                    <div className="card-body">
                    {/* {console.log(countUsers)} */}
                    <ResponsiveContainer width="100%" height={200}>
                    <PieChart width={300} height={300}>
                    <Pie
                        data={countUsers}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {countUsers.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend
                        verticalAlign="bottom"
                        align="center"
                        layout="horizontal"
                        iconType="circle"
                        payload={countUsers.map((entry) => ({
                            value: entry.name,
                            type: 'circle',
                            color: COLORS[countUsers.findIndex((user) => user.name === entry.name) % COLORS.length],
                        }))}
                        />
                    </PieChart>
                </ResponsiveContainer>
                    </div>
            </div> 
        )}
      </div>
      </div>


  </div>
  )
}

export default Dashboard;