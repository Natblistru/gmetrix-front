import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ContextData from '../context/ContextData';
import { Link } from 'react-router-dom';
import { fetchCapitole, fetchEvaluation1, fetchEvaluation2, fetchEvaluation3 } from '../../routes/api';
import TreeTable from './TreeTable';

const data = [
  {
    name: 'Primul Război Mondial și formarea statului național român',
    opened: false,
    title: '30%',
    children: [
      {
        name: 'România în Primul Război Mondial',
        title: '10%',
        children: [
          { name: 'Opțiunile politice în perioada neutralității', title: '50%' },
          { name: 'Intrarea României în război', title: '40%' },
          { name: 'Operațiile militare din anul 1917', title: '0%' },
          { name: 'Agravarea situației pe frontul român', title: '0%' },
          { name: 'Armistițiul de la Focșani și Pacea de la București', title: '0%' },
        ],
      },
      {
        name: 'Mișcarea națională a românilor din Basarabia și teritoriile din stânga Nistrului',
        title: '75%',
        children: [
          { name: 'Mișcarea națională a românilor din Basarabia până în octombrie 1917', title: '70%' },
          { name: 'Republica Democratică Moldovenească', title: '90%' },
          { name: 'Mișcarea națională a românilor din stânga Nistrului', title: '90%' },
        ],
      },
      {
        name: 'Formarea Statului Național Unitar Român. Recunoașterea Marii Uniri de la 1918',
        title: '75%',
        children: [
          { name: 'Recunoașterea internațională a Marii Uniri', title: '70%' },
          { name: 'Unirea Basarabiei cu România', title: '90%' },
          { name: 'Unirea Bucovinei cu România', title: '90%' },
          { name: 'Unirea Transilvaniei cu România', title: '90%' },
        ],
      },
      {
        name: 'Conferinţa de Pace de la Paris. Sistemul de la Versailles',
        title: '75%',
        children: [
          { name: 'Conferința de Pace de la Paris (18 ianuarie 1919 - 21 ianuarie 1920)', title: '70%' },
          { name: 'Sistemul Versailles-Washington', title: '90%' },
          { name: 'Noua ordine internațională', title: '90%' },
          { name: 'Conferința de la Washington', title: '90%' },
        ],
      },
    ],
  },
  {
    name: 'Lumea în perioada interbelică',
    title: '10%',
    children: [{ name: 'SUA în perioada interbelică', title: '10%' }],
  },
  {
    name: 'Relațiile internaționale în perioada interbelică',
    title: '10%',
    children: [{ name: 'Europa de Vest în perioada interbelică', title: '10%' }],
  },
]

const dataTeste = [
  {
    name: 'Opțiunile politice în perioada neutralității',
    title: '10%',
    children: [
      { name: 'Alege afirmația corectă', title: '50%' },
      { name: 'Stabilește cauzele evenimentelor', title: '40%' },
      { name: 'Stabilește consecințele evenimentelor', title: '0%' },
      { name: 'Verifică corectitudinea afirmațiilor', title: '0%' },
      { name: 'Formează perechi logice', title: '0%' },
      { name: 'Grupează elementele', title: '50%' },
      { name: 'Caracteristicile evenimentelor', title: '40%' },
      { name: 'Completează propoziția', title: '0%' },
      { name: 'Elaborează un fragment de text', title: '0%' },
      { name: ' Succesiunea cronologică a evenimentelor', title: '0%' },
    ],
  },
  {
    name: 'Intrarea României în război',
    title: '75%',
    children: [
      { name: 'Alege afirmația corectă', title: '50%' },
      { name: 'Stabilește cauzele evenimentelor', title: '40%' },
      { name: 'Stabilește consecințele evenimentelor', title: '0%' },
      { name: 'Verifică corectitudinea afirmațiilor', title: '0%' },
      { name: 'Formează perechi logice', title: '0%' },
      { name: 'Grupează elementele', title: '50%' },
      { name: 'Caracteristicile evenimentelor', title: '40%' },
      { name: 'Completează propoziția', title: '0%' },
      { name: 'Elaborează un fragment de text', title: '0%' },
      { name: ' Succesiunea cronologică a evenimentelor', title: '0%' },
    ],
  },
  {
    name: 'Operațiile militare din anul 1917',
    title: '75%',
    children: [
      { name: 'Alege afirmația corectă', title: '50%' },
      { name: 'Stabilește cauzele evenimentelor', title: '40%' },
      { name: 'Stabilește consecințele evenimentelor', title: '0%' },
      { name: 'Verifică corectitudinea afirmațiilor', title: '0%' },
      { name: 'Formează perechi logice', title: '0%' },
      { name: 'Grupează elementele', title: '50%' },
      { name: 'Caracteristicile evenimentelor', title: '40%' },
      { name: 'Completează propoziția', title: '0%' },
      { name: 'Elaborează un fragment de text', title: '0%' },
      { name: ' Succesiunea cronologică a evenimentelor', title: '0%' },
    ],
  },
  {
    name: 'Agravarea situației pe frontul român',
    title: '75%',
    children: [
      { name: 'Alege afirmația corectă', title: '50%' },
      { name: 'Stabilește cauzele evenimentelor', title: '40%' },
      { name: 'Stabilește consecințele evenimentelor', title: '0%' },
      { name: 'Verifică corectitudinea afirmațiilor', title: '0%' },
      { name: 'Formează perechi logice', title: '0%' },
      { name: 'Grupează elementele', title: '50%' },
      { name: 'Caracteristicile evenimentelor', title: '40%' },
      { name: 'Completează propoziția', title: '0%' },
      { name: 'Elaborează un fragment de text', title: '0%' },
      { name: ' Succesiunea cronologică a evenimentelor', title: '0%' },
    ],
  },
  {
    name: 'Armistițiul de la Focșani și Pacea de la București',
    title: '75%',
    children: [
      { name: 'Alege afirmația corectă', title: '50%' },
      { name: 'Stabilește cauzele evenimentelor', title: '40%' },
      { name: 'Stabilește consecințele evenimentelor', title: '0%' },
      { name: 'Verifică corectitudinea afirmațiilor', title: '0%' },
      { name: 'Formează perechi logice', title: '0%' },
      { name: 'Grupează elementele', title: '50%' },
      { name: 'Caracteristicile evenimentelor', title: '40%' },
      { name: 'Completează propoziția', title: '0%' },
      { name: 'Elaborează un fragment de text', title: '0%' },
      { name: ' Succesiunea cronologică a evenimentelor', title: '0%' },
    ],
  },
]
  
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
                <p className="subject-total-percent">{`${Number(mediaObject.disciplina_media).toFixed(2)}%`}</p>
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
  const [list, setList] = useState(data)
  const [list1, setList1] = useState([])
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

  const fetchEvaluations = async () => {
    const studentId = stateData.currentStudent;
    // let studentResults = []
    // 
    // const orderNumber = 1;
    // try {

    //   const response = await axios.post('http://localhost:8000/api/student-evaluation-results-all-themes', {
    //     subject_id: selectedItem.subject_id,
    //     study_level_id: 1,
    //     order_number: orderNumber,
    //     studentId: studentId,
    //   });
  
    //   studentResults = response.data.studentEvaluationResults;
    //   console.log(studentResults)
    // } catch (error) {
    //   console.error('Error fetching data:', error.message);
  
    // }
    const fetchStudentResults = async (orderNumber) => {
      const response = await axios.post('http://localhost:8000/api/student-evaluation-results-all-themes', {
        subject_id: selectedItem.subject_id,
        study_level_id: 1,
        order_number: orderNumber,
        studentId: studentId,
      });
    
      return response.data.studentEvaluationResults;
    };
    
    const studentResults1 = await fetchStudentResults(1);
    const studentResults2 = await fetchStudentResults(2);
    const studentResults3 = await fetchStudentResults(3);

    console.log(studentResults1)
    console.log(studentResults2)
    console.log(studentResults3)

  };

  useEffect(() => {
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
  
    const transformedData = transformData(stateData.capitole);
    setList1(transformedData);
    console.log(transformedData)
    // console.log(stateData.capitole)

      // Obțineți array-ul de tema_id
    const temaIds = [];

    // Funcție recursivă pentru parcurgerea arborelui
    const traverseTree = (node) => {
      temaIds.push(node.tema_id);

      if (node.children && node.children.length > 0) {
        node.children.forEach(child => traverseTree(child));
      }
    };

    // Parcurgeți arborele pentru a obține tema_id
    transformedData.forEach(node => traverseTree(node));
    const filteredtemaIds = temaIds.filter((value) => value !== undefined);

    console.log(filteredtemaIds);

    fetchEvaluations(filteredtemaIds)
  }, [stateData.capitole]);
  
  useEffect(()=>{
// console.log(list1)
  },[list1])
  

  return (
    <div className='accountsettings'>
      <h1>Însușirea disciplinelor:</h1>
      <ListDisciplineRezultat selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
      <TreeTable list={list1}/>
      <h1 style={{ marginTop: '20px'}}>Rezultatele evaluărilor:</h1>
      <TreeTable list={list}/>
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
