import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import { Editor, EditorState, RichUtils, convertToRaw, Modifier } from 'draft-js';


import Swal from 'sweetalert2'

function AddMySubtopic({ onBackToList, userData }) {

  const [learningProgramList, setLearningProgramList] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [teacherTopicList, setTeacherTopicList] = useState([]);
  
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

    axios.get('http://localhost:8000/api/all-topics').then(res=>{
      if(res.data.status === 200){
        setTopicList(res.data.topics);
      }
    });

    axios.get('http://localhost:8000/api/all-myteachers').then(res=>{
      if(res.data.status === 200){
        setTeacherList(res.data.teachers);
      }
    });

    axios.get('http://localhost:8000/api/all-myteacher-topics').then(res=>{
      if(res.data.status === 200){
        setTeacherTopicList(res.data.teacherTopics);
      }
    });

  },[])

  const [errorList, setErrors] = useState([]);
  const [teacherTopicInput, setTeacherTopicInput] = useState({
    learning_program_id: '',
    theme_learning_program_id: '',
    teacher_topic_id: '',
    topic_id: '',
    teacher_id: '',
    order_number: '',
    name: '', //name la subtopic
    title: '',  //title la video
    source: '',
  })

  useEffect(() => {
    const selectedTopic = topicList.find((topic) => topic.id == teacherTopicInput.topic_id);
    const topicName = selectedTopic ? selectedTopic.name : '';
    const selectedTeacher = teacherList.find((teacher) => teacher.id == teacherTopicInput.teacher_id);
    const teacherName = selectedTeacher ? selectedTeacher.name : '';

    const concatenatedName =
    topicName !== '' && teacherName !== '' ? `${topicName} (${teacherName})` : '';
    setTeacherTopicInput((prevInput) => ({
      ...prevInput,
      name: concatenatedName,
    }));
  }, [teacherTopicInput.topic_id, teacherTopicInput.teacher_id]);

  const [allCheckboxes, setAllCheckboxes] = useState({
    status: false,
  })

  const handleInput = (e) => {
    e.persist();
    setTeacherTopicInput({...teacherTopicInput, [e.target.name]: e.target.value})
  }

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({...allCheckboxes, [e.target.name]: e.target.checked})
  }


  const [subtopicRows, setSubtopicRows] = useState([
    { name_subtopic: '', audio_path: '' },
    { name_subtopic: '', audio_path: '' },
    { name_subtopic: '', audio_path: '' },
    { name_subtopic: '', audio_path: '' },
  ]);

  const handleAddSubtopicRow = () => {
    setSubtopicRows([...subtopicRows, { name_subtopic: '', audio_path: '' }]);
  };

  const handleRemoveSubtopicRow = index => {
    const newRows = [...subtopicRows];
    newRows.splice(index, 1);
    setSubtopicRows(newRows);
  };

  const handleInputSubtopic = (index, event) => {
    event.persist();
    const { name, value } = event.target;
    const newRows = [...subtopicRows];
    newRows[index][name] = value;
    setSubtopicRows(newRows);
  };


  const [photoRows, setPhotoRows] = useState([
    { photo_path: '', name_subtopic: '' },
    { photo_path: '', name_subtopic: '' },
    { photo_path: '', name_subtopic: '' },
    { photo_path: '', name_subtopic: '' },
  ]);

  const handleAddPhotoRow = () => {
    setPhotoRows([...photoRows, { photo_path: '', name_subtopic: '' }]);
  };

  const handleRemovePhotoRow = index => {
    const newRows = [...photoRows];
    newRows.splice(index, 1);
    setPhotoRows(newRows);
  };

  const handleInputPhoto = (index, event) => {
    event.persist();
    const { name, value } = event.target;
    const newRows = [...photoRows];
    newRows[index][name] = value;
    setPhotoRows(newRows);
  };

  const [flipRows, setFlipRows] = useState([
    { flip_title: '', flip_answer: '' },
  ]);
  const [editorStates, setEditorStates] = useState(() => flipRows.map(() => EditorState.createEmpty()));
 

  const handleAddFlipRow = () => {
     setFlipRows([...flipRows, { flip_title: '', flip_answer: '' }]);
     setEditorStates([...editorStates, EditorState.createEmpty()]);
  };

  const handleRemoveFlipRow = index => {
    const newRows = [...flipRows];
    newRows.splice(index, 1);
    
    const newEditorStates = [...editorStates];
    newEditorStates.splice(index, 1);
  
    setFlipRows(newRows);
    setEditorStates(newEditorStates);
  };

  const handleInputFlip = (index, event) => {
    const { name, value } = event.target;
    const newRows = [...flipRows];
    newRows[index] = { ...newRows[index], [name]: value };
    setFlipRows(newRows);
  };
  
    const onChangeFormat = (index, newEditorState) => {
      if (editorStates[index]) {
        const newEditorStates = [...editorStates];
        newEditorStates[index] = newEditorState;
        setEditorStates(newEditorStates);
      }
    };
  
  
    const handleBoldClick = (index) => {
      const newEditorState = RichUtils.toggleInlineStyle(editorStates[index], 'BOLD');
      onChangeFormat(index, newEditorState);
    };
    
    const handleItalicClick = (index) => {
      const newEditorState = RichUtils.toggleInlineStyle(editorStates[index], 'ITALIC');
      onChangeFormat(index, newEditorState);
    };
    
    const handleUnderlineClick = (index) => {
      const newEditorState = RichUtils.toggleInlineStyle(editorStates[index], 'UNDERLINE');
      onChangeFormat(index, newEditorState);
    };
    

    const handleColorClick = (rowIndex, color) => {
      const currentEditorState = editorStates[rowIndex];
      const contentState = currentEditorState.getCurrentContent();
      const selection = currentEditorState.getSelection();
    
      if (!selection.isCollapsed()) {
        const contentWithColor = Modifier.applyInlineStyle(
          contentState,
          selection,
          color
        );
    
        const newEditorState = EditorState.push(currentEditorState, contentWithColor, 'change-inline-style');
        onChangeFormat(rowIndex, newEditorState);
      }
    };

    const styleMap = {
      'color-red': {
        color: 'red',
      },
      'color-green': {
        color: 'green',
      },
      'color-blue': {
        color: 'blue',
      },
      'color-yellow': {
        color: 'yellow',
      },
      'color-cyan': {
        color: 'cyan',
      },
      'color-magenta': {
        color: 'magenta',
      },
      'color-black': {
        color: 'black',
      },
    };

  const colorButtons = [
    { hex: '#ff0000', name: 'color-red' },
    { hex: '#00ff00', name: 'color-green' },
    { hex: '#0000ff', name: 'color-blue' },
    { hex: '#ffff00', name: 'color-yellow' },
    { hex: '#00ffff', name: 'color-cyan' },
    { hex: '#ff00ff', name: 'color-magenta' },
    { hex: '#4e4e3f', name: 'color-black' },
  ];

  const findTextBetweenLastSpanAndParagraph = (paragraph) => {

    const endIndex = paragraph.lastIndexOf('</p>');
    let startIndex = endIndex;
    while (startIndex >= 0 && paragraph[startIndex] !== '>') {
      startIndex--;
    }
    const textBetween = paragraph.slice(startIndex + 1, endIndex).trim();
      return textBetween;
  };

  const groupStyledText = (html) => {
    const paragraphsWithoutPClose = html.split('</p>\n');

    const paragraphs = paragraphsWithoutPClose.map(paragraph => paragraph + '</p>');
    paragraphs.pop();
  
    const result = [];
    let textResult = ""

    paragraphs.forEach((paragraph) => {
      if (paragraph.trim() !== '') {
        const textBeforeSpanMatch = paragraph.match(/<p[^>]*>(.*?)<span/);
        const textBeforeSpan = textBeforeSpanMatch ? textBeforeSpanMatch[1] : '';
        let i = 0;
        let lungime = paragraph.length;
        let currentStil = ''
        let inceputBlocCuStil = 0

        if (textBeforeSpan == '' && paragraph.substring(3, 8) !== '<span') {
          result.push(paragraph);
          textResult=""
          i = lungime;
        }
        else {
          textResult += `<p>${textBeforeSpan}`;

          inceputBlocCuStil = '<p>'.length + textBeforeSpan.length;
        }
        
        while (i < lungime) {

          let sfarsitBlocStil = paragraph.indexOf('>', inceputBlocCuStil);


          let blocCuStil = paragraph.substring(inceputBlocCuStil, sfarsitBlocStil+1);
          if(blocCuStil == '</p>') {
            textResult+='</span></p>'
            result.push(textResult);
            textResult=""
            i = lungime
            break
          }
         
          if(blocCuStil !== currentStil) {

            currentStil = blocCuStil

            textResult +=currentStil

            let pozitiaInceputSfarsitSpanTag = paragraph.indexOf('</span>', sfarsitBlocStil+1);
    
            let innerHtml = paragraph.substring(sfarsitBlocStil+1, pozitiaInceputSfarsitSpanTag)
            textResult +=innerHtml

            let sfarsitTotSpan = pozitiaInceputSfarsitSpanTag + '</span>'.length
            let totSpan = paragraph.substring(inceputBlocCuStil, sfarsitTotSpan);

            let urmatorSimbolDupaBlocSpan = paragraph[sfarsitTotSpan]
            let sfarsitBlocFaraStil = sfarsitTotSpan
            let blocFlaraStil=""
            if(urmatorSimbolDupaBlocSpan !=='<') {
              sfarsitBlocFaraStil = paragraph.indexOf('<span', sfarsitTotSpan);

              if(sfarsitBlocFaraStil == -1) {
                sfarsitBlocFaraStil = paragraph.indexOf('</p', sfarsitTotSpan);      
                blocFlaraStil = paragraph.substring(sfarsitTotSpan, sfarsitBlocFaraStil);
                textResult += '</span>' + blocFlaraStil + '</p>'  
                result.push(textResult);
                textResult=""
                i = lungime
                 
              }
              else {
                blocFlaraStil = paragraph.substring(sfarsitTotSpan, sfarsitBlocFaraStil);
                textResult += '</span>' + blocFlaraStil
              }
            }
            else if(paragraph.substring(urmatorSimbolDupaBlocSpan, urmatorSimbolDupaBlocSpan+4)){}

            inceputBlocCuStil = sfarsitBlocFaraStil

          }
          else {
            let pozitiaInceputSfarsitSpanTag = paragraph.indexOf('</span>', inceputBlocCuStil + currentStil.length);
            let innerHtml = paragraph.substring(inceputBlocCuStil + currentStil.length, pozitiaInceputSfarsitSpanTag)
            textResult +=innerHtml
            
            let sfarsitTotSpan = pozitiaInceputSfarsitSpanTag + '</span>'.length
            let totSpan = paragraph.substring(inceputBlocCuStil, sfarsitTotSpan);


            let urmatorSimbolDupaBlocSpan = paragraph[sfarsitTotSpan]
            let sfarsitBlocFaraStil = sfarsitTotSpan
            let blocFlaraStil=""
            if(urmatorSimbolDupaBlocSpan !=='<') {
              sfarsitBlocFaraStil = paragraph.indexOf('<span', sfarsitTotSpan);

              if(sfarsitBlocFaraStil == -1) {
                sfarsitBlocFaraStil = paragraph.indexOf('</p', sfarsitTotSpan);      
                blocFlaraStil = paragraph.substring(sfarsitTotSpan, sfarsitBlocFaraStil);
                textResult += '</span>' + blocFlaraStil + '</p>'  
                result.push(textResult);
                textResult=""
                i = lungime
              }
              else {
                blocFlaraStil = paragraph.substring(sfarsitTotSpan, sfarsitBlocFaraStil);
                textResult += '</span>' + blocFlaraStil
              }
            } 
            inceputBlocCuStil = sfarsitBlocFaraStil
          }
          i=i+1
        }
      }
    });
    
    console.log(result);
    return result.join('');
  }
  

    const convertStylesToInlineCSS = (styles) => {
      let inlineStyles = '';
    
      styles.forEach(style => {
        if (style === "BOLD") {
          inlineStyles += 'font-weight: bold; ';
        }
    
        if (style === "ITALIC") {
          inlineStyles += 'font-style: italic; ';
        }
    
        if (style === "UNDERLINE") {
          inlineStyles += 'text-decoration: underline; ';
        }
    
        if (style.startsWith("color")) {
          const color = style.replace('color-', '');
          inlineStyles += `color: ${color}; `;
        }
      });
    
      return inlineStyles;
    };
  
    const convertContentStateToHTML = (content) => {
      let html = '';
    
      content.forEach((block) => {
        const text = block.text;
        const spans = [];
        let currentStyles = {};
    
        block.inlineStyleRanges.forEach(style => {
          for (let i = style.offset; i < style.offset + style.length; i++) {
            const styleKey = i.toString();
            currentStyles[styleKey] = currentStyles[styleKey] || [];
            currentStyles[styleKey].push(style.style);
          }
        });
    
        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          const styleKey = i.toString();
          const charStyles = currentStyles[styleKey];
    
          if (charStyles && charStyles.length > 0) {
            // Dacă există stiluri pentru această poziție, le adăugăm
            const charStylesCSS = convertStylesToInlineCSS(charStyles);
            spans.push(`<span style="${charStylesCSS}">${char}</span>`);
          } else {
            // Dacă nu există stiluri, adăugăm litera ca atare
            spans.push(char);
          }
        }
    
        if (spans.length > 0) {
          html += `<p>${spans.join('')}</p>\n`;
        } else if (text.trim() !== '') {
          html += `<p>${text}</p>\n`;
        }
      });
    
      const groupedHTML = groupStyledText(html);
      return groupedHTML;
    };
    
  
  
  
  

  const submitTeacherTopic = (e) => {
    e.preventDefault();

    const formattedFlipRows = flipRows.map((row, index) => {
      const currentContent = editorStates[index].getCurrentContent();
      const contentWithStyles = convertToRaw(currentContent);
      // const stylingResult = extractStylingFromContent(contentWithStyles.blocks);
      // console.log(stylingResult)
      console.log(contentWithStyles.blocks)
      const html = convertContentStateToHTML(contentWithStyles.blocks);
      console.log(html)

      return {
        flip_title: row.flip_title,
        flip_answer: row.flip_answer,
        editorText: html,
      };
    });
      
    console.log(formattedFlipRows);
    



    // const formData = new FormData();
    // formData.append('name',teacherTopicInput.name );
    // formData.append('order_number',teacherTopicInput.order_number );
    // formData.append('teacher_id',teacherTopicInput.teacher_id );
    // formData.append('topic_id',teacherTopicInput.topic_id );
    // formData.append('status',allCheckboxes.status == true ? 1 : 0);

    // // console.log(formData)

    // axios.post(`http://localhost:8000/api/store-myteacherTopic`, formData).then(res => {
    //   if(res.data.status === 201)
    //   {
    //     Swal.fire({
    //       title: "Succes",
    //       text: res.data.message,
    //       icon: "success"
    //     });
    //     setTeacherTopicInput({
    //       learning_program_id: '',
    //       theme_learning_program_id: '',
    //       teacher_topic_id: '',
    //       topic_id: '',
    //       teacher_id: '',
    //       order_number: '',
    //       name: '',
    //     });
    //     setAllCheckboxes({
    //       status: false,
    //     });
    //     setErrors([]);
    //   }
    //   else if(res.data.status === 422)
    //   {
    //     Swal.fire({
    //       title: "All fields are mandatory",
    //       text: Object.values(res.data.errors).flat().join(' '),
    //       icon: "error",
    //     });
    //     setErrors(res.data.errors);
    //   }
    // });
  }

  const handleBackToList = () => {
    onBackToList();
  };

  return (
    <div className="container-fluid px4">
      <h2 className="m-3">Adaugarea subtemei profesorului
        <button onClick={handleBackToList} type="button" className="btnBts btn-primary text-white px-4 m-3 float-end">BACK to List</button>
      </h2>

        <ul className="navSide nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-linkSide active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
        
          <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <form className="form-group custom-form" onSubmit={submitTeacherTopic} >

          <div className="rowBts">
              <div className="col-md-4">
                <div className="form-group m-3">
                  <label>Learn Program</label>
                  <select name="learning_program_id" onChange={handleInput} value={teacherTopicInput.learning_program_id} className="form-control">  
                    <option>Select program</option>
                    {
                      learningProgramList.map((item)=> {
                        return (
                          <option value={item.id} key={item.id}>{item.name}</option>
                        )
                      })
                    }
                  </select>            
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.learning_program_id}</span>
                </div>
              </div>  
              <div className="col-md-8">          
                <div className="form-group m-3">
                  <label>Theme</label>
                  <select name="theme_learning_program_id" onChange={handleInput} value={teacherTopicInput.theme_learning_program_id} className="form-control">  
                    <option>Select Theme</option>
                    {themeList
                      .filter((item) => item.learning_program_id == teacherTopicInput.learning_program_id)
                      .map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                    ))}
                  </select>            
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.theme_learning_program_id}</span>
                </div>
              </div>
            </div>

            <div className="col-md-12">
                <div className="form-group m-3">
                  <label>Topics</label>
                  <select name="teacher_topic_id" onChange={handleInput} value={teacherTopicInput.teacher_topic_id} className="form-control">  
                    <option>Select Topic</option>
                    {
                      teacherTopicList
                      .filter((item) => item.teacher_id == userData.teacher.id)
                      .filter((item) => item.topic.theme_learning_program_id == teacherTopicInput.theme_learning_program_id)                      
                      .map((item)=> {
                        return (
                          <option value={item.id} key={item.id}>{item.name}</option>
                        )
                      })
                    }
                  </select>            
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.teacher_topic_id}</span>
                </div>
              </div> 


            <div className="border p-3">
              {subtopicRows.map((row, index) => (
                <div className="rowBts no-gutters" key={index} style={{alignItems: 'end'}}>
                  <div className="col-md-6">
                    <div className="form-group mx-3 my-1">
                    {index === 0 && (<label>Subtopic</label>)}
                      <input
                        type="text"
                        name="name_subtopic"
                        onChange={event => handleInputSubtopic(index, event)}
                        value={row.name_subtopic}
                        className="form-control"
                      />
                      <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.name_subtopic}</span>            
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group mx-3 my-1">
                      {index === 0 && (<label>Audio Path</label>)}
                      <input type="file" accept="audio/*" name="audio_path" onChange={event => handleInputSubtopic(index, event)} className="form-control custom-file-input" />
                      <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.audio_path}</span>
                    </div>
                  </div>

                  <div className="col-md-2">
                    <button type="button" className="btnBts btn-danger btn-sm mx-3" onClick={() => handleRemoveSubtopicRow(index)} style={{marginBottom: '12px'}}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <button type="button" className="btnBts btn-success btn-sm px-4 mx-3 my-3" onClick={handleAddSubtopicRow}>
                Add Row
              </button>
            </div>

            <div className="border p-3">
              {photoRows.map((row, index) => (
                <div className="rowBts no-gutters" key={index} style={{alignItems: 'end'}}>
                  <div className="col-md-6">
                    <div className="form-group mx-3 my-1">
                    {index === 0 && (<label>Subtopic</label>)}
                      <input
                        type="text"
                        name="name_subtopic"
                        onChange={event => handleInputPhoto(index, event)}
                        value={row.name_subtopic}
                        className="form-control"
                      />
                      <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.name_subtopic}</span>            
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group mx-3 my-1">
                      {index === 0 && (<label>Photo Path</label>)}
                      <input type="file" accept="image/*" name="photo_path" onChange={event => handleInputPhoto(index, event)} className="form-control" />
                      <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.photo_path}</span>
                    </div>
                  </div>

                  <div className="col-md-2">
                    <button type="button" className="btnBts btn-danger btn-sm mx-3" onClick={() => handleRemovePhotoRow(index)} style={{marginBottom: '12px'}}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <button type="button" className="btnBts btn-success btn-sm px-4 mx-3 my-3" onClick={() => handleAddPhotoRow()}>
                Add Row
              </button>
            </div>

            <div className="border p-3">
              {flipRows.map((row, rowIndex) => (
                <div className="rowBts" key={rowIndex} style={{alignItems: 'end'}}>
                  <div className="col-md-4">
                    <div className="form-group mx-3 my-1">
                    {rowIndex === 0 && (<label>Flip Card Title</label>)}
                      <input
                        type="text"
                        name="flip_title"
                        onChange={(event) => handleInputFlip(rowIndex, event, editorStates[rowIndex].getCurrentContent().getPlainText())}
                        value={row.flip_title}
                        className="form-control"
                      />
                      <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.flip_title}</span>            
                    </div>
                  </div>

                  <div className="white-background col-md-6">
                    {rowIndex === 0 && (<label>Flip Card Answer</label>)}
                    <div className="d-flex gap-1">
                      <button type="button" onClick={() => handleBoldClick(rowIndex)}>Bold</button>
                      <button type="button" onClick={() => handleItalicClick(rowIndex)}>Italic</button>
                      <button type="button" onClick={() => handleUnderlineClick(rowIndex)}>Underline</button>

                      {colorButtons.map((color, colorIndex) => (
                        <button
                          key={colorIndex}
                          type="button"
                          onClick={() => handleColorClick(rowIndex, color.name)}
                          style={{ backgroundColor: color.hex, width: '20px', height: '20px', border: 'none', marginRight: '5px' }}
                        />
                      ))}
                      {/* <button type="button" onClick={handleSaveClick}>Save</button> */}
                    </div>
                  <Editor
                    editorState={editorStates[rowIndex]}
                    onChange={(newEditorState) => onChangeFormat(rowIndex, newEditorState)}
                    customStyleMap={styleMap}
                  />

                  </div>

                  <div className="col-md-2">
                    <button type="button" className="btnBts btn-danger btn-sm mx-3 my-2" onClick={() => handleRemoveFlipRow(rowIndex)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <button type="button" className="btnBts btn-success btn-sm px-4 mx-3 my-2" onClick={handleAddFlipRow}>
                Add Row
              </button>
            </div>







            <div className="rowBts">
              <div className="col-md-3">
                <div className="form-group m-3">
                  <label>Teacher</label>
                  <select name="teacher_id" onChange={handleInput} value={teacherTopicInput.teacher_id} className="form-control">  
                    <option>Select Teacher</option>
                    {
                      teacherList.map((item)=> {
                        return (
                          <option value={item.id} key={item.id}>{item.name}</option>
                        )
                      })
                    }
                  </select>            
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.teacher_id}</span>
                </div>
              </div>  
              <div className="col-md-7">          
                <div className="form-group m-3">
                  <label>Teacher's Topic Title</label>
                  <input type="text" name="name" onChange={handleInput} value={teacherTopicInput.name}className="form-control" />
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.name}</span>
                </div>
              </div>


            </div>


            <button type="submit" className="btnBts btn-success px-4 m-3 float-end">Submit</button>
          </form> 
          </div>

      </div>
   </div>
  )
}

export default AddMySubtopic;
