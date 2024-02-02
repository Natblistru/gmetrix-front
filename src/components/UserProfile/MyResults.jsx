import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ContextData from '../context/ContextData';
import { Link } from 'react-router-dom';
import { fetchCapitole, fetchEvaluation1, fetchEvaluation2, fetchEvaluation3 } from '../../routes/api';
import TreeTable from './TreeTable';

const ListDisciplineRezultat = ({selectedItem, setSelectedItem}) => {
  const [mediaDisciplina, setMediaDisciplina] = useState([])
  const { stateData, dispatchData } = React.useContext(ContextData);
  // console.log(stateData.disciplineAni);

  const handleItemClick = (item) => {
    const { subject_id } = item;
    setSelectedItem(item);
    const level_id = 1;

    fetchCapitole(subject_id, level_id, dispatchData);

  };

  useEffect(() => {
    let allMediaDisciplina = [];
  
    stateData.disciplineAni.forEach((item) => {
      const level_id = 1;
  
      axios.get(`http://localhost:8000/api/capitoleDisciplina?level=${level_id}&disciplina=${item.subject_id}&student=1`)
        .then(res => {
          if (res.status === 200) {
            // console.log(res.data)
            allMediaDisciplina.push({
              disciplina_media: res.data[0].disciplina_media,
              subject_id: res.data[0].subject_id
            });
          }
        });
    });
    // console.log(allMediaDisciplina)
      setMediaDisciplina(allMediaDisciplina);

      const level_id = 1;

      fetchCapitole(selectedItem.subject_id, level_id, dispatchData);

  }, []);
  

  return (
    <div>
      <div className="manuale-container-result">
        {stateData.disciplineAni.map((item, idx) => {
          // console.log(item);
          const isSelected = selectedItem && selectedItem.id === item.id;

          const mediaObject = mediaDisciplina.find(obj => obj.subject_id === item.subject_id);
          const hasMediaValue = mediaObject && mediaObject.disciplina_media !== undefined;
  
          return (
              <div
                className={`manual-item-result ${isSelected ? 'selected' : ''}`}
                key={item.id}
                onClick={() => handleItemClick(item)}
              >
              <img src={process.env.PUBLIC_URL + item.img} alt="" />
              <p>{item.name}</p>
              {hasMediaValue && (
                <p className="subject-total-percent">{`${Number(mediaObject.disciplina_media).toFixed(1)}%`}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

function MyResults() {
  const { stateData, dispatchData } = React.useContext(ContextData);
  const [discipline, setDiscipline] = useState([])
  const [evaluari, setEvaluari] = useState([])
  const [learningProgramList, setLearningProgramList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(stateData.disciplineAni[0]);
  const [themeList, setThemeList] = useState([]);
  const [filter, setFilter] = useState({
    learning_program_id: '',
    theme_learning_program_id: '',
  })
  const [teste, setTeste] = useState([])

  const fetchData = async (themeId) => {

    const teachersForSubtitles = stateData.teachersForSubtitle[themeId];
    // console.log(teachersForSubtitles)

     try {
      const studentId = 1;
      const level_id = 1;
      const promises = teachersForSubtitles.map(teachertheme => axios.get(`http://localhost:8000/api/teachertheme?level=${level_id}&disciplina=${selectedItem.subject_id}&teacher=${teachertheme.teacher_id}&student=1&theme=${themeId}`));
      const responses = await axios.all(promises);
      const successResponses = responses.filter(response => response.status === 200);
      const errorResponses = responses.filter(response => response.status === 404);
      // console.log(responses)
      // console.log(successResponses)
      // console.log(errorResponses)            
      // if (successResponses.length > 0) {
      //   const totalScore = successResponses.reduce((accumulator, response) => {
      //     const score = parseFloat(response.data.score);

      //     return accumulator + score;
      //   }, 0);
        
      //   const averageScore = totalScore * 100 / (successResponses.length*firstTestItemComplexity);
      //   setProc(averageScore)

      // }
      const dataTesteRequest = successResponses.map((response) => {
        if (response.data) {

          const sortedData = response.data.slice().sort((a, b) => a.id - b.id);

          return sortedData.map((temaData) => {
            const testsData = temaData.tests.map((test) => ({
              name: test.name,
              title: test.testResult ? `${(parseFloat(test.testResult) * 100).toFixed(0)}%` : '0%',
            }));
      
            const temaResult = temaData.tests.reduce((acc, test) => acc + parseFloat(test.testResult), 0) / temaData.tests.length;
      
            return {
              name: temaData.name,
              title: temaResult ? `${(temaResult * 100).toFixed(0)}%` : '0%',
              children: testsData,
            };
          });
        } else {
          return []; 
        }
      });
      
      const flattenedDataTeste = dataTesteRequest.flat();
      
      // console.log(flattenedDataTeste);
      setTeste(flattenedDataTeste);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInput = (e) => {
    e.persist();
    setFilter({...filter, [e.target.name]: e.target.value })
    if(e.target.name == 'theme_learning_program_id') {
      fetchData(e.target.value);
    }
  }

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

  },[])

  const fetchStudentResults = async () => {
    const studentId = stateData.currentStudent;
    
    const response = await axios.post('http://localhost:8000/api/student-evaluation-results-all-themes', {
      subject_id: selectedItem.subject_id,
      study_level_id: 1,
      studentId: studentId,
    });
  
    return response.data.studentEvaluationResults;
  };
  
  const fetchStudentProgress = async () => {
    const studentId = stateData.currentStudent;
    
    const response = await axios.post('http://localhost:8000/api/student-subtopic-progress-all-themes', {
      subject_id: selectedItem.subject_id,
      study_level_id: 1,
      studentId: studentId,
    });
  
    return response.data.studentProgress;
  };

  const transformData = (initialData) => {
    const result = [];
  
    initialData.forEach((item) => {
      const { capitol_id, capitol_name, capitol_media, tema_id, subtitles } = item;
  
      if (subtitles && subtitles.length > 0) {
        // Este un nod părinte
        const capitolNode = {
          name: capitol_name,
          id: capitol_id,
          opened: false,
          title: Math.round(capitol_media) + "%",
          children: [],
        };
  
        subtitles.forEach(subtitle => {
          const temaNode = {
            name: subtitle.tema_name,
            id: subtitle.tema_id,
            capitol_id: capitol_id,
            tema_id: subtitle.tema_id,
            title: Math.round(subtitle.tema_media) + "%",
            children: [],
          };
  
          capitolNode.children.push(temaNode);
        });
  
        result.push(capitolNode);
      } else {
        // Este un nod copil
        const temaNode = {
          name: item.tema_name,
          id: item.tema_id,
          capitol_id: capitol_id,
          title: Math.round(item.tema_media) + "%",
          children: [],
        };
  
        const parent = result.find(parent => parent.id === capitol_id);
        if (parent) {
          parent.children.push(temaNode);
        }
      }
    });
  
    return result;
  };

  const addEvaluations = (initialData, studentResults) => {
    const result = [...initialData]; 
  
    result.forEach((capitolNode) => {
      capitolNode.children.forEach((temaNode) => {
        const temaTitleValues = []; 
  
        Object.keys(studentResults).forEach((evaluationKey, index) => {
          const evaluationData = studentResults[evaluationKey][0];
          
          if (evaluationData && evaluationData.theme_id === temaNode.tema_id) {
            const maxPoints = parseInt(evaluationData.total_max_points, 10);
            const points = parseInt(evaluationData.points, 10);
  
            const percentage = maxPoints !== 0 ? (points * 100 / maxPoints).toFixed(1) + "%" : "0%";
            
            temaNode.children.push({
              name: `Evaluare (subiectul ${index + 1})`,
              capitol_id: temaNode.capitol_id,
              tema_id: temaNode.tema_id,
              title: percentage,
              evaluationKey: evaluationData, 
            });
  
            temaTitleValues.push(parseFloat(percentage)); 
          }
        });
  
        const temaTitleMedia = temaTitleValues.length > 0
          ? (temaTitleValues.reduce((sum, value) => sum + value, 0) / temaTitleValues.length).toFixed(1) + "%"
          : "0%";
  
        temaNode.title = temaTitleMedia;
      });
  
      const capitolTitleValues = capitolNode.children.map((temaNode) => parseFloat(temaNode.title.replace("%", "")));
  
      const capitolTitleMedia = capitolTitleValues.length > 0
        ? (capitolTitleValues.reduce((sum, value) => sum + value, 0) / capitolTitleValues.length).toFixed(1) + "%"
        : "0%";
  
      capitolNode.title = capitolTitleMedia;
    });
  
    return result;
  };

  const addProgress = (initialData, studentProgress) => {
    const result = [...initialData]; 
    console.log(studentProgress)
  
    result.forEach((capitolNode) => {
      capitolNode.children.forEach((temaNode) => {
        const temaTitleValues = []; 

        studentProgress.forEach((progressData, index) => {
          // console.log(progressData)
          
          if (progressData && progressData.theme_id === temaNode.tema_id) {
            const maxPoints = parseInt(progressData.subtopic_total, 10);
            const points = parseInt(progressData.topic_pased, 10);
  
            const percentage = maxPoints !== 0 ? (points * 100 / maxPoints).toFixed(1) + "%" : "0%";
            
            temaNode.children.push({
              name: progressData.teacher_topic_name,
              capitol_id: temaNode.capitol_id,
              tema_id: temaNode.tema_id,
              title: percentage,
              progressElement: progressData, 
            });
  
            temaTitleValues.push(parseFloat(percentage)); 
          }
        });
  
        const temaTitleMedia = temaTitleValues.length > 0
          ? (temaTitleValues.reduce((sum, value) => sum + value, 0) / temaTitleValues.length).toFixed(1) + "%"
          : "0%";
  
        temaNode.title = temaTitleMedia;
      });
  
      const capitolTitleValues = capitolNode.children.map((temaNode) => parseFloat(temaNode.title.replace("%", "")));
  
      const capitolTitleMedia = capitolTitleValues.length > 0
        ? (capitolTitleValues.reduce((sum, value) => sum + value, 0) / capitolTitleValues.length).toFixed(1) + "%"
        : "0%";
  
      capitolNode.title = capitolTitleMedia;
    });
  
    return result;
  };
  
  const fetchDataAndTransform = async () => {
    try {
      const studentResults = await fetchStudentResults();

      const studentProgress = await fetchStudentProgress();
  
      const transformedData = transformData(stateData.capitole);
      const transformedDataCopy = JSON.parse(JSON.stringify(transformedData));
      const transformedDataProgress = JSON.parse(JSON.stringify(transformedData));
      const transformedDataWithProgress = addProgress(transformedDataProgress, studentProgress);
      const transformedDataWithEvaluations = addEvaluations(transformedDataCopy, studentResults);
        
      setDiscipline(transformedDataWithProgress);
      setEvaluari(transformedDataWithEvaluations);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataAndTransform();
  }, [stateData.capitole]);
 
 

  return (
    <div className='accountsettings'>
      <h1>Însușirea disciplinelor:</h1>
      <ListDisciplineRezultat selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
      <TreeTable list={discipline}/>
      <h1 style={{ marginTop: '20px'}}>Rezultatele evaluărilor:</h1>
      <TreeTable list={evaluari}/>
      <h1 style={{ marginTop: '20px'}}>Rezultatele testelor:</h1>
      <div className="rowBts mx-4 mt-2">
        <div className="col-md-12">          
          <div className="form-group d-flex align-items-center">
            <label htmlFor="tema" style={{ width: '150px' }}>Alege tema:</label>
            <select name="theme_learning_program_id" onChange={handleInput} value={filter.theme_learning_program_id} className="form-control" id="tema">  
              <option value="">Select Theme</option>
              {/* {console.log("Selected Item:", selectedItem,"Selected Item Id:", selectedItem.id )} */}
              {selectedItem && (
                themeList
                  .filter((item) => {
                    // console.log("Filtered Item:", item);
                    return item.learning_program.subject_study_level_id === selectedItem.id;
                  })
                  .map((filteredItem) => (
                    <option value={filteredItem.id} key={filteredItem.id}>
                      {filteredItem.name}
                    </option>
                  ))
              )}
            </select>            
          </div>
        </div>
      </div>
      <TreeTable list={teste}/>

    </div>
  );
}

export default MyResults;
