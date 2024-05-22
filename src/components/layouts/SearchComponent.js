import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateSubjectBreadcrumb, 
         updateTopicBreadcrumb, 
         fetchCapitoleRedux, 
         updateCurrentSubject,
         updateCurrentTheme } from '../ReduxComp/actions';
import { useSelector } from 'react-redux';

import axios from 'axios';
import Select from 'react-select';
import Modal from 'react-modal';
import { fetchTheme } from "../../routes/api"

const SearchComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [themes, setThemes] = useState([]);
  const [topics, setTopics] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [details, setDetails] = useState(null);
  const [themePath, setThemePath] = useState(""); 

  const [errorList, setErrors] = useState([]);
  const [itemInput, setItemInput] = useState({
    subject_study_level_id: '',
  })
  const subjectListRedux = useSelector(state => state.disciplineAni);
  const capitole = useSelector(state => state.capitole);
  const currentStudentObject = useSelector(state => state.currentStudent);
  const currentStudent = currentStudentObject ? currentStudentObject.currentStudent : 1; 

  const student_id = localStorage.getItem('auth_role') == 'student' ? currentStudent : 1;


  const handleInput = (e) => {
    e.persist();
    setItemInput({...itemInput, [e.target.name]: e.target.value})
  }

  useEffect(()=>{
    setSubjectList(subjectListRedux)
  }, [subjectListRedux])

  useEffect(() => {
    if (itemInput.subject_study_level_id > 0) {
      const details = getIdDetails(itemInput.subject_study_level_id);
      setDetails(details);
    } else {
      setDetails(null);
    } 
    fetchTags();
  }, [itemInput]);

  const fetchTags = async () => {
    if(itemInput.subject_study_level_id !==""){
      try {
        // console.log(itemInput)
        const response = await axios.post('/api/all-tags', { subject_study_level_id: itemInput.subject_study_level_id });
        const { status, tags } = response.data;

        if (status === 200) {
          const mappedTags = tags.map((tag) => ({ value: tag.id, label: tag.tag_name }));
          setAllTags(mappedTags);
        } else {
          console.error('Eroare la încărcarea tag-urilor. Status:', status);
        }
      } catch (error) {
        console.error('Eroare la încărcarea tag-urilor:', error);
      }
    }
  };

  const fetchCapitoleSearch = async () => {
    // console.log(details)
    // console.log(stateData.disciplineAni)
    try {
        const res = await axios.get(`/api/capitoleDisciplina?level=${details.studyLevelId}&disciplina=${details.subjectId}&student=${student_id}`);
        dispatch(fetchCapitoleRedux(res.data));
        if (res.data.length > 0) {
          dispatch(updateCurrentSubject(res.data[0]))
          const nivelStudiu = details.studyLevelId==1?"examen clasa 9":"BAC";
          const clasa = details.studyLevelId==1?"clasa 9":"clasa 12";
          const newBreadcrumb = {name: `${res.data[0].subject_name}`, path: `/capitole/${details.subjectId}?level=${details.studyLevelId}&year=2022&name=${details.subjectName}&nivel=${nivelStudiu}&clasa=${clasa}`};
          dispatch(updateSubjectBreadcrumb(newBreadcrumb));

        }
     } catch (err) {
        console.error(err);
    }
  } 

  const closeModalFromLink = async (themePath = null) => {
    if (themePath !== null) {
      setThemePath(themePath);
    }
  
    await fetchCapitoleSearch();

    const capitoleStorage = JSON.parse(localStorage.getItem('capitole'))|| []
  
    const tema = capitoleStorage.reduce(
      (result, item) => result || (item.subtitles || []).find(subtitle => subtitle.path_tema === themePath),
      null
    );
  // console.log(tema)
  // console.log(themePath)
    if (tema != null) {
      dispatch(updateCurrentTheme(tema));
  
      const addressPath = `${themePath}?teacher=1&level=${details.studyLevelId}&disciplina=${details.subjectId}&theme=${tema.tema_id}&teachername=userT1%20teacher`;
      const newBreadcrumb = { name: tema.tema_name, path: addressPath };
      dispatch(updateTopicBreadcrumb(newBreadcrumb));
  
      const teacher = 1;
      const theme = tema.tema_id;
      const level_id = details.studyLevelId;
      const subject_id = details.subjectId;
      await new Promise(async (resolve) => {
        await fetchTheme(teacher, theme, subject_id, level_id, dispatch, student_id);
        resolve();
      });
    }
  
    closeModal();
  };

  const handleLinkClick = async (result) => {
    try {
      await fetchCapitoleSearch();
  
      await closeModalFromLink(result.topic.theme_learning_program.theme.path);
  
      const linkTo = `${result.topic.theme_learning_program.theme.path}${result.topic.path}?teacher=1&theme=${result.topic.theme_learning_program.theme.id}&level=${details.studyLevelId}&disciplina=${details.subjectId}&teachername=userT1%20teacher`;
      history.push(linkTo);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    if (modalIsOpen) {
      setModalIsOpen(false);
      setThemes([]);
      setTopics([]);
      setAllTags([]);
      setSelectedTags([]);
      setItemInput({
        subject_study_level_id: '',
      });
    }
  };

  const handleTagChange = (selectedOptions) => {
    // console.log(selectedOptions)
    setSelectedTags(selectedOptions);
  };

  useEffect(() => {
    fetchPostsByTags()
  },[selectedTags])

  const fetchPostsByTags = async () => {
    if (selectedTags.length > 0) {
      try {
        const selectedTagIds = selectedTags.map((tag) => tag.value);
        // console.log(selectedTagIds)
        const response = await axios.post('/api/get-posts-by-tags', { tagIds: selectedTagIds });
        // console.log(response.data)        
        if (response.data.status === 200) {
          setThemes(response.data.themes);
          setTopics(response.data.topics);
        } else {
          console.error('Eroare 200 la obținerea postărilor:', response);
        }
      } catch (error) {
        console.error('Eroare catch la obținerea postărilor:', error);
      }
    } else {
      setThemes([]);
      setTopics([]);
    }
  };

  const getIdDetails = (id) => {
    const item = subjectListRedux.find(item => item.id == id);
  // console.log(subjectList)
  // console.log(stateData.disciplineAni)
  // console.log(item) 
    if (item) {
      const studyLevelId = item.study_level_id;
      const subjectId = item.subject_id;
      const subjectName = item.name;
      return { studyLevelId, subjectId, subjectName };
    }
  
    return null;
  };

  return (
    <div>
      <input
        type="text"
        className="form-control"
        style={{ marginLeft: '120px'}}
        placeholder="Caută..."
        onClick={() => setModalIsOpen(true)}
        id="searchInput"
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Căutare"
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <div style={{ position: 'relative' }}>
          {subjectList.length > 0 && (
            <div className="col-md-12">          
              <div className="form-group">
                <select name="subject_study_level_id" onChange={handleInput} value={itemInput.subject_study_level_id} className="form-control">  
                  <option>Alege disciplina</option>
                  {subjectList.map((item) => (
                    <option value={item.id} key={item.id}>{item.name}</option>
                  ))}
                </select>            
                <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.subject_study_level_id}</span>
              </div>
            </div>
          )}

          <label htmlFor="tagsSelect">Tag-uri:</label>
          <Select
            isMulti
            options={allTags}
            value={selectedTags}
            onChange={handleTagChange}
            id="tagsSelect"
          />

          <div className="search-results-container">
            <h5 className="mt-3">Rezultatele Căutării</h5>
            <div className="search-results-list">
              {themes.length>0 && themes.map((result, idx) => {
                // console.log(itemInput.subject_study_level_id)
                // console.log(subjectList)
                if (!details) {
                  console.log(`Detaliile pentru id-ul ${itemInput.subject_study_level_id} nu au fost găsite.`);
                  return null;
                }
                const linkTo = `${result.theme.path}?teacher=1&theme=${result.theme.id}&level=${details.studyLevelId}&disciplina=${details.subjectId}&teachername=userT1%20teacher`;
                return (
                  <div key={idx}>
                    <h6>{result.theme.chapter.name}</h6>
                    <Link to={linkTo} onClick={() => closeModalFromLink(result.theme.path)}>{result.name}</Link>
                  </div>
                );
              })}
              {topics.length>0 && topics.map((result, idx) => {
                if (!details) {
                  console.log(`Detaliile pentru id-ul ${itemInput.subject_study_level_id} nu au fost găsite.`);
                  return null;
                }
                // console.log(result)
                const linkTo = `${result.topic.theme_learning_program.theme.path}${result.topic.path}?teacher=1&theme=${result.topic.theme_learning_program.theme.id}&level=${details.studyLevelId}&disciplina=${details.subjectId}&teachername=userT1%20teacher`;
                return (
                  <div key={idx}>
                    <h6>{result.topic.theme_learning_program.theme.chapter.name}</h6>
                    <Link to="#" onClick={() => handleLinkClick(result)}>{result.name}</Link>
                  </div>
                );
              })}

              <button className="btn-close-modal" onClick={closeModal} style={{ top: '-28px', right:'-37px'}}></button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SearchComponent;
