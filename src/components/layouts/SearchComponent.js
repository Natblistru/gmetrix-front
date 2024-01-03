import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import Modal from 'react-modal';
import ContextData from '../context/ContextData';

const SearchComponent = () => {
  const {stateData, dispatchData} = React.useContext(ContextData)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [themes, setThemes] = useState([]);
  const [topics, setTopics] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [details, setDetails] = useState(null);

  const [errorList, setErrors] = useState([]);
  const [itemInput, setItemInput] = useState({
    subject_study_level_id: '',
  })

  const handleInput = (e) => {
    e.persist();
    setItemInput({...itemInput, [e.target.name]: e.target.value})
    if (e.target.name === "subject_study_level_id" && e.target.value > 0) {
      const details = getIdDetails(e.target.value);
      setDetails(details);
    } else {
      setDetails(null);
    }
    console.log(details)
    console.log(e.target.name)
    console.log(e.target.value)   
  }

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    fetchTags();
  }, [itemInput]);

  const fetchTags = async () => {
    if(itemInput.subject_study_level_id !==""){
      try {
        console.log(itemInput)
        const response = await axios.post('http://localhost:8000/api/all-tags', { subject_study_level_id: itemInput.subject_study_level_id });
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

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/all-subject-study-level');
      const { status, tags } = response.data;

      if (status === 200) {
        setSubjectList(response.data.subject);
      } else {
        console.error('Eroare la încărcarea tag-urilor. Status:', status);
      }
    } catch (error) {
      console.error('Eroare la încărcarea tag-urilor:', error);
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
    console.log(selectedOptions)
    setSelectedTags(selectedOptions);
  };

  useEffect(() => {
    fetchPostsByTags()
  },[selectedTags])

  const fetchPostsByTags = async () => {
    if (selectedTags.length > 0) {
      try {
        const selectedTagIds = selectedTags.map((tag) => tag.value);
        console.log(selectedTagIds)
        const response = await axios.post('http://localhost:8000/api/get-posts-by-tags', { tagIds: selectedTagIds });
        console.log(response.data)        
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
    const item = subjectList.find(item => item.id == id);
  console.log(subjectList)
  console.log(item) 
    if (item) {
      const studyLevelId = item.study_level_id;
      const subjectId = item.subject_id;
      return { studyLevelId, subjectId };
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
                console.log(itemInput.subject_study_level_id)
                console.log(subjectList)
                if (!details) {
                  console.log(`Detaliile pentru id-ul ${itemInput.subject_study_level_id} nu au fost găsite.`);
                  return null;
                }
                const linkTo = `${result.theme.path}?teacher=1&theme=${result.theme.id}&level=${details.studyLevelId}&disciplina=${details.subjectId}&teachername=userT1%20teacher`;
                return (
                  <div key={idx}>
                    <h6>{result.theme.chapter.name}</h6>
                    <Link to={linkTo} onClick={closeModal}>{result.name}</Link>
                  </div>
                );
              })}
              {topics.length>0 && topics.map((result, idx) => {

                if (!details) {
                  console.log(`Detaliile pentru id-ul ${itemInput.subject_study_level_id} nu au fost găsite.`);
                  return null;
                }

                const linkTo = `${result.topic.theme_learning_program.theme.path}${result.topic.path}?teacher=1&theme=${result.topic.theme_learning_program.theme.id}&level=${details.studyLevelId}&disciplina=${details.subjectId}&teachername=userT1%20teacher`;
                return (
                  <div key={idx}>
                    <h6>{result.topic.theme_learning_program.theme.chapter.name}</h6>
                    <Link to={linkTo}>{result.name}</Link>
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
