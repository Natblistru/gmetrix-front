import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import ContextData from '../context/ContextData';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCapitole, fetchEvaluation1, fetchEvaluation2, fetchEvaluation3 } from '../../routes/api';
import TreeTable from './TreeTable';
import UserSidebarMaterials from './UserSidebarMaterials';
import MyTopics from './MyTopics';
import MySubtopics from './MySubtopics';
import MyTests from './MyTests';

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
  
const ListDisciplineMateria = () => {
  const [mediaDisciplina, setMediaDisciplina] = useState([])
  // console.log(stateData.disciplineAni);
  const disciplineAni = useSelector(state => state.disciplineAni);
  const dispatch = useDispatch();

  const handleItemClick = (item) => {
    const { subject_id } = item;
    const level_id = 1;

    fetchCapitole(subject_id, level_id, dispatch);

  };

  useEffect(() => {
    let allMediaDisciplina = [];
  
    disciplineAni.forEach((item) => {
      const level_id = 1;
  
      axios.get(`http://localhost:8000/api/capitoleDisciplina?level=${level_id}&disciplina=${item.subject_id}&student=1`)
        .then(res => {
          if (res.status === 200) {
            allMediaDisciplina.push(res.data[0].disciplina_media);
          }
        });
    });

      setMediaDisciplina(allMediaDisciplina);

  }, []);
  
  
  return (
    <div>
      <div className="manuale-container-result">
      {disciplineAni.map((item, idx) => {
        const nivelStudiu = item.study_level_id === 1 ? "examen clasa 9" : "BAC";
        const clasa = item.study_level_id === 1 ? "clasa 9" : "clasa 12";
        const name = item.name.split(',')[0];
        // console.log(item)
        return (
          <div className="manual-item-result" key={item.id} onClick={() => handleItemClick(item)}>
            <img src={process.env.PUBLIC_URL + item.img} alt="" />
            <p>{item.name}</p>
          </div>
        );
      })}
      </div>
    </div>
    
  );
};

function MyMaterials(props) {
  const {activepage} = useParams()
  const [list, setList] = useState(data)
  const [list1, setList1] = useState([])
  const [learningProgramList, setLearningProgramList] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [filter, setFilter] = useState({
    learning_program_id: '',
    theme_learning_program_id: '',
  })
  const capitole = useSelector(state => state.capitole);

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
  
    const transformedData = transformData(capitole);
    setList1(transformedData);
  }, [capitole]);
  
  useEffect(()=>{
// console.log(list1)
  },[list1])
  

  return (
    <div className='accountsettings'>
      <h1>Materiale didactice pe disciplini:</h1>
      <ListDisciplineMateria />
      <div className='userprofilein'>
        <div className='left'>
          <UserSidebarMaterials activepage={activepage} />
        </div>
        <div className='right'>
          {activepage === 'topics' && <MyTopics userData={props.userData} />}
          {activepage === 'subtopics' && <MySubtopics userData={props.userData} />}
          {activepage === 'tests' && <MyTests userData={props.userData} />}
        </div>
      </div>
   </div>
  );
}

export default MyMaterials;
