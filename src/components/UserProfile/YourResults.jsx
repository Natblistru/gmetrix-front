import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ContextData from '../context/ContextData';
import { Link } from 'react-router-dom';
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
  

const ListDisciplineRezultat = () => {
  const { stateData } = React.useContext(ContextData);
  console.log(stateData.disciplineAni);
  return (
    <div>
      <div className="manuale-container-result">
        {stateData.disciplineAni.map((item) => {
          const nivelStudiu = item.study_level_id === 1 ? "examen clasa 9" : "BAC";
          const clasa = item.study_level_id === 1 ? "clasa 9" : "clasa 12";
          const name = item.name.split(',')[0];
          return (
            <div className="manual-item-result" key={item.id}>
              <Link to={`/capitole/${item.subject_id}?level=1&year=2022&name=${name}&nivel=${nivelStudiu}&clasa=${clasa}`}>
                <img src={process.env.PUBLIC_URL + item.img} alt="" />
                <p>{item.name}</p>
                <p className="subject-total-percent">0%</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
    
  );
};

function YourResults() {
  const [list, setList] = useState(data)
  const [learningProgramList, setLearningProgramList] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [filter, setFilter] = useState({
    learning_program_id: '',
    theme_learning_program_id: '',
  })

  const handleInput = (e) => {
    e.persist();
    setFilter({...filter, [e.target.name]: e.target.value })
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

  return (
    <div className='accountsettings'>
      <h1>Însușirea disciplinelor:</h1>
      <ListDisciplineRezultat />
      <TreeTable list={list}/>
      <h1 style={{ marginTop: '20px'}}>Rezultatele evaluărilor:</h1>
      <TreeTable list={list}/>
      <h1 style={{ marginTop: '20px'}}>Rezultatele testelor:</h1>
      <div className="rowBts mx-4 mt-2">
        <div className="col-md-4">          
          <div className="form-group d-flex align-items-center">
            <label for="tema" style={{ width: '150px' }}>Alege tema:</label>
            <select name="theme_learning_program_id" onChange={handleInput} value={filter.theme_learning_program_id} className="form-control" id="tema">  
              <option option value="">Select Theme</option>
              {themeList
                // .filter((item) => item.learning_program_id == filter.learning_program_id)
                .map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
              ))}
            </select>            
          </div>
        </div>
      </div>
      <TreeTable list={dataTeste}/>

    </div>
  );
}

export default YourResults;
