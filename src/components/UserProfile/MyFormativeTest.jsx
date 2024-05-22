import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; 
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';
import { Editor, EditorState, RichUtils, convertToRaw, Modifier } from 'draft-js';
import { useSelector } from 'react-redux';

import Swal from 'sweetalert2'
import MyQuizTest from './MyQuizTest';
import MyTestDnD from './MyTestDnD';
import MyTestDnDGroup from './MyTestDnDGroup';
import MyTestDnDOrder from './MyTestDnDOrder';
import MyTestDnDOrderText from './MyTestDnDOrderText';
import MyTestSnap from './MyTestSnap';
import MyTestWords from './MyTestWords';

function MyFormativeTest({title, userData, onBackToList, selectedType }) {

  const language = useSelector(state => state.language);

  const [learningProgramList, setLearningProgramList] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [teacherTopicList, setTeacherTopicList] = useState([]);
  const [testComplexityList, setTestComplexityList] = useState([]);

  const [newTestItems, setNewTestItems] = useState([]);
  const lastUpdatedArrayRef = useRef([]);
  const lastUpdatedFormativeTestRef = useRef([]);
  const lastAddText1 = useRef([]);
  const lastAddText2 = useRef([]);
  const lastAddText3 = useRef([]);

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

    axios.get('/api/all-topics').then(res=>{
      if(res.data.status === 200){
        setTopicList(res.data.topics);
      }
    });

    axios.get('/api/all-teachers').then(res=>{
      if(res.data.status === 200){
        setTeacherList(res.data.teachers);
      }
    });

    axios.get('/api/all-teacher-topics').then(res=>{
      if(res.data.status === 200){
        setTeacherTopicList(res.data.teacherTopics);
      }
    });

    axios.get('/api/all-test-complexities').then(res=>{
      if(res.data.status === 200){
        setTestComplexityList(res.data.testComplexities);
      }
    });

  },[])

  const formRef = useRef(null);

  const [tabs, setTabs] = useState([
    {
      title: 'Item 1',
      testContent: {
        task: '',
        test_complexity_id: '',
        image_path: '',
        column1: '', 
        column2: '',
        column3: '',
        //snap
        text_1_1: '',
        text_2_1: '',
        text_1_2: '',
        text_2_2: '',
        text_1_3: '',
        text_2_3: '',
        text_1_4: '',
        text_2_4: '',
        
        rasp1: '',
        rasp2: '',
        rasp3: '',
        rasp4: '',
    
        x1: "285",
        y1: "17",
        resultTextAdditional1: '',
        resultTextAdditional2: '',
        resultTextAdditional3: '',
        //words
        explanationWords: '',
        testRows: [
          { option: '', correct: false, correct1: false, explanation: '' },
          { option: '', correct: false, correct1: false, explanation: '' },
          { option: '', correct: false, correct1: false, explanation: '' },
          { option: '', correct: false, correct1: false, explanation: '' },
        ]
      }
    },
  ]);
  const [activeTab, setActiveTab] = useState(0);

  const addTab = () => {
    setTabs(prevTabs => [
      ...prevTabs,
      {
        title: `Item ${prevTabs.length + 1}`,
        testContent: {
          task: '', 
          test_complexity_id: '', 
          column1: '', 
          column2: '',
          column3: '',
          //snap
          text_1_1: '',
          text_2_1: '',
          text_1_2: '',
          text_2_2: '',
          text_1_3: '',
          text_2_3: '',
          text_1_4: '',
          text_2_4: '',
          
          rasp1: '',
          rasp2: '',
          rasp3: '',
          rasp4: '',
      
          x1: "285",
          y1: "17",
          resultTextAdditional1: '',
          resultTextAdditional2: '',
          resultTextAdditional3: '',
          explanationWords: '',
          testRows: [
            { option: '', correct: false, correct1: false, explanation: '' },
            { option: '', correct: false, correct1: false, explanation: '' },
            { option: '', correct: false, correct1: false, explanation: '' },
            { option: '', correct: false, correct1: false, explanation: '' },
          ]
        }
      }
    ]);
  };

  const removeTab = (index) => {
    const newTabs = tabs.slice();
    newTabs.splice(index, 1);
    setTabs(newTabs);
  };

  useEffect(()=>{
    setActiveTab(tabs.length - 1);
  },[tabs])

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleInputTest = (tabIndex, rowIndex, event) => {
    event.persist();
    const { name, value, type, checked } = event.target;
    const newTabs = [...tabs];
    const newTestRows = [...newTabs[tabIndex].testContent.testRows];
  
    if (name === 'task' || 
        name === 'test_complexity_id' || 
        name === 'column1' || 
        name === 'column2' || 
        name === 'column3' ||
        name === 'text_1_1' ||
        name === 'text_2_1' ||
        name === 'text_1_2' ||
        name === 'text_2_2' ||
        name === 'text_1_3' ||
        name === 'text_2_3' ||
        name === 'text_1_4' ||
        name === 'text_2_4' ||
        
        name === 'rasp1' ||
        name === 'rasp2' ||
        name === 'rasp3' ||
        name === 'rasp4' ||
    
        name === 'x1' ||
        name === 'y1'||
        name === 'resultTextAdditional1' ||
        name === 'resultTextAdditional2' ||
        name === 'resultTextAdditional3' 
        ) {
      newTabs[tabIndex].testContent[name] = value;
    } else {  
      newTestRows[rowIndex][name] = type === 'checkbox' ? checked : value;
    }
    
    newTabs[tabIndex].testContent.testRows = newTestRows;
    setTabs(newTabs);
  };


  const handleRemoveTestRow = (tabIndex, rowIndex) => {
    const newTabs = [...tabs];
    const newTestRows = [...newTabs[tabIndex].testContent.testRows];
    newTestRows.splice(rowIndex, 1);
    newTabs[tabIndex].testContent.testRows = newTestRows;
    setTabs(newTabs);
  };

  const handleAddTestRow = (tabIndex) => {
    const newTabs = [...tabs];
    const newTestRows = [...newTabs[tabIndex].testContent.testRows];
    newTestRows.push({ option: '', correct: false, explanation: '' });
    newTabs[tabIndex].testContent.testRows = newTestRows;
    setTabs(newTabs);
  };

  const initialEditorStates = [];
  for (let i = 0; i < 10; i++) {
    initialEditorStates.push(EditorState.createEmpty());
  }

  const initialEditorStatesWords = [];
  for (let i = 0; i < 10; i++) {
    initialEditorStatesWords.push(EditorState.createEmpty());
  }
  
  // const [editorStates, setEditorStates] = useState(() => tabs.map(() => EditorState.createEmpty()));
  const [editorStates, setEditorStates] = useState(initialEditorStates);

  const [editorStatesWords, setEditorStatesWords] = useState(initialEditorStatesWords);


  const [errorList, setErrors] = useState([]);

  const [pictures, setPictures] = useState([]);

  const [testItemInput, setTestItemInput] = useState({
    learning_program_id: '',
    theme_learning_program_id: '',
    teacher_topic_id: '',
    teacher_id: '',
    test_complexity_id: '',
    type: '',
    title: '',
    order_number: '',
    path: '',
  })

  const [allCheckboxes, setAllCheckboxes] = useState({
    status: false,
  })

  const [path, setPath] = useState('');

  const handleInput = (e) => {
    e.persist();
    if (e.target.name === 'title') {
      const transformedText = transformText(e.target.value);
      setPath(transformedText);
    }
    setTestItemInput({...testItemInput, [e.target.name]: e.target.value})
  }

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({...allCheckboxes, [e.target.name]: e.target.checked})
  }

  function transformText(text) {
    text = text.trim();
    text = text.toLowerCase();
  
    const diacritics = ['ă', 'â', 'ș', 'ț', 'î', ' ', 'ă', 'â', 'ș', 'ț', 'î'];
    const replacements = ['a', 'a', 's', 't', 'i', '-', 'a', 'a', 's', 't', 'i'];
  
    for (let i = 0; i < diacritics.length; i++) {
      text = text.replace(new RegExp(diacritics[i], 'g'), replacements[i]);
    }
  
    text = text.replace(/[^a-z0-9-]/g, '');
  
    return '/' + text;
  }

  const updateStateAndWorkWithNewArray = (newArray) => {
    setNewTestItems(newArray);
    lastUpdatedArrayRef.current = newArray;
  };

  const handleConcatenate = () => {
    tabs.forEach((tab, tabIndex) => {
      let combinations1 = [];
      let combinations2 = [];
      let combinations3 = [];
      let y1 = 17;
  
      for (let i = 1; i <= 4; i++) {
        for (let j = 1; j <= 4; j++) {
          const key1 = `text_1_${i}`;
          const key2 = `text_2_${j}`;
          const combination = `${tab.testContent[key1]}|${tab.testContent[key2]}`;
          combinations1.push(combination);
        }
      }
  
      const result1 = combinations1.join('\n');
      // console.log(result1)
      setTabs((prevTabs) => {
        const updatedTabs = [...prevTabs];
        updatedTabs[tabIndex].testContent.resultTextAdditional1 = result1;
        return updatedTabs;
      });
      lastAddText1.current = [...lastAddText1.current, result1];
  
      for (let i = 1; i <= 4; i++) {
        const key1 = `text_1_${i}`;
        const key2 = `text_2_${tab.testContent[`rasp${i}`]}`;
  
        for (let j = 1; j <= 4; j++) {
          const combination = `${tab.testContent[key1]}|${tab.testContent[key2]}`;
          combinations2.push(combination);
        }
      }
  
      const result2 = combinations2.join('\n');
      setTabs((prevTabs) => {
        const updatedTabs = [...prevTabs];
        updatedTabs[tabIndex].testContent.resultTextAdditional2 = result2;
        return updatedTabs;
      });
      lastAddText2.current = [...lastAddText2.current, result2];
  
      for (let i = 1; i <= 4; i++) {
        for (let j = 1; j <= 4; j++) {
          const x2 = "342";
          const y2 = (j - 1) * 92 + 17;
  
          const coordinates = {
            x1: "285",
            y1: y1.toString(),
            x2,
            y2: y2.toString(),
          };
  
          combinations3.push(JSON.stringify(coordinates));
  
          if (j % 4 === 0) {
            y1 += 92;
          }
        }
      }
  
      const result3 = combinations3.join('\n');
      setTabs((prevTabs) => {
        const updatedTabs = [...prevTabs];
        updatedTabs[tabIndex].testContent.resultTextAdditional3 = result3;
        return updatedTabs;
      });
      lastAddText3.current = [...lastAddText3.current, result3];
    });
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
              currentStil = ''

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
              currentStil = ''
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

        if (style === "CODE") {
          inlineStyles += 'font-family: monospace; background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; ';
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

  const handleButtonClick = async () => {

    let succesTotal = true;
    lastAddText1.current = []
    lastAddText2.current = []
    lastAddText3.current = []

    let resultObjectWordsArray = []
    let resultHtmlArray = []
    if (selectedType == "words") {
      tabs.map((tab, index) => {

        const currentContent = editorStatesWords[index].getCurrentContent();
        const contentWithStyles = convertToRaw(currentContent);
        const html = convertContentStateToHTML(contentWithStyles.blocks);

        const htmlplainP = html.replace(/<p>/g, '').replace(/<\/p>/g, '\n');

        const htmlSpec = htmlplainP.replace(/<span style="font-weight: bold; ">/g, '`~#').replace(/<\/span>/g, '#~');
        const textWithQuotes = '"' + htmlSpec + '"';

        const htmlplain = htmlplainP.replace(/<span style="font-weight: bold; ">/g, '').replace(/<\/span>/g, '');

        const regex = /<span style="font-weight: bold; ">(.*?)<\/span>/g;

        const matches = htmlplainP.match(regex);
        
        let wordsArray = null;
        if (matches) {
          wordsArray = matches.map(match => {
            const spanRegex = /<span style="font-weight: bold; ">(.*?)<\/span>/;
            const spanMatch = match.match(spanRegex);
            return spanMatch ? spanMatch[1] : match;
          });
        } else {
          console.log('Nu s-au găsit cuvinte evidentiate.');
        }

        resultObjectWordsArray = [...resultObjectWordsArray, {
          htmlSpec: textWithQuotes,
          htmlplain: htmlplain,
          wordsArray: wordsArray || []
        }];
      });
    }

    // console.log(selectedType)
    tabs.map((tab, index) => {

      const currentContent = editorStates[index].getCurrentContent();
      const contentWithStyles = convertToRaw(currentContent);

      const html = convertContentStateToHTML(contentWithStyles.blocks);
      // console.log(html)

      resultHtmlArray = [...resultHtmlArray, {
        TaskHtml: html,
      }];
    });
    

    if(selectedType=="snap") {
      handleConcatenate();
    }

    await processFormativeTest(succesTotal);

    await processTestItems(succesTotal,resultHtmlArray);

    if(selectedType === 'dnd_chrono' || 
      selectedType === 'dnd' || 
      selectedType === 'dnd_chrono_double' || 
      selectedType === 'dnd_group'){
      await processTestColumns(succesTotal);
     }
    await processTestOptions(succesTotal, resultObjectWordsArray);

    await processFormativeTestItems(succesTotal);

    if(succesTotal) {onBackToList()}
  };

  async function processFormativeTest (succesTotal) {

    const formData = new FormData();
    formData.append('order_number',testItemInput.order_number );
    formData.append('title',testItemInput.title );
    formData.append('path',path );
    formData.append('type', selectedType );
    formData.append('test_complexity_id',testItemInput.test_complexity_id );
    formData.append('teacher_topic_id',testItemInput.teacher_topic_id );
    formData.append('status',0);

    axios.post(`/api/store-myformative-test`, formData).then(res => {
      if(res.data.status === 201)
      {
        Swal.fire({
          title: "Succes",
          text: res.data.message,
          icon: "success"
        });
        lastUpdatedFormativeTestRef.current =  res.data.formativeTest;
        setTestItemInput({
          learning_program_id: '',
          theme_learning_program_id: '',
          teacher_topic_id: '',
          test_complexity_id: '',
          teacher_id: '',
          order_number: '',
          type: '',
          title: '',
          path: '',
        });
        setPath('');
        setAllCheckboxes({
          status: false,
        });
        setErrors([]);
      }
      else if(res.data.status === 422)
      {
        Swal.fire({
          title: "All fields are mandatory",
          text: Object.values(res.data.errors).flat().join(' '),
          icon: "error",
        });
        succesTotal = false;
        setErrors(res.data.errors);
      }
    });
  }

  async function processTestItems(succesTotal,resultHtmlArray) {
    let listItems = []

    try {
      for (let tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
        const tab = tabs[tabIndex];
  
        // Construiește obiectul FormData pentru fiecare rând
        const formData = new FormData();
        formData.append('task', tab.testContent.task);
        formData.append('content', resultHtmlArray[tabIndex].TaskHtml);  
        formData.append('image',pictures[tabIndex] );
        formData.append('image_path',tab.testContent.image_path );      
        formData.append('type', selectedType);
        formData.append('test_complexity_id', tab.testContent.test_complexity_id);
        formData.append('teacher_topic_id', testItemInput.teacher_topic_id);
        formData.append('language', language);
        formData.append('status', 0);
  
        // Trimite FormData către server pentru fiecare rând
        const response = await axios.post(`/api/store-mytest-item`, formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
  
        if (response.data.status === 201) {
          Swal.fire({
            title: "Success",
            text: "Successfully processed the request.",
            icon: "success"
          });

          listItems = [...listItems, response.data.testItem];
          console.log(listItems)
        } else {
          Swal.fire({
            title: "Error",
            text: response.data.message,
            icon: "error"
          });
          succesTotal = false;
        }
      }
    } catch (error) {
      console.error('Eroare în timpul procesării datelor:', error);
      succesTotal = false;
    } finally {
      if (!succesTotal) {
        Swal.fire({
          title: "Error",
          text: "An error occurred during data processing.",
          icon: "error"
        });
      }
    }
    updateStateAndWorkWithNewArray(listItems);
  }

  async function processTestColumns(succesTotal) {

    const testItems = lastUpdatedArrayRef.current;
    const formDataArray = [];

    if(selectedType === 'dnd_chrono') {
      tabs.forEach((tab, tabIndex) => {
        ['column1'].forEach((columnName, orderNumber) => {
          const formData = new FormData();
          // console.log(orderNumber)
          formData.append('order_number', orderNumber);
          formData.append('test_item_id', testItems[tabIndex].id);
          formData.append('title', tab.testContent[columnName]);
          formData.append('status', 0);
      
          formDataArray.push(formData);
        });
      });
    } else if(selectedType === 'dnd' || selectedType === 'dnd_chrono_double' ) {
      tabs.forEach((tab, tabIndex) => {
        ['column1', 'column2'].forEach((columnName, orderNumber) => {
          const formData = new FormData();
          // console.log(orderNumber)
          formData.append('order_number', orderNumber);
          formData.append('test_item_id', testItems[tabIndex].id);
          formData.append('title', tab.testContent[columnName]);
          formData.append('status', 0);
      
          formDataArray.push(formData);
        });
      });
    } else if(selectedType === 'dnd_group') {
      tabs.forEach((tab, tabIndex) => {
        ['column1', 'column2', 'column3'].forEach((columnName, orderNumber) => {
          const formData = new FormData();
          // console.log(orderNumber)
          formData.append('order_number', orderNumber);
          formData.append('test_item_id', testItems[tabIndex].id);
          formData.append('title', tab.testContent[columnName]);
          formData.append('status', 0);
      
          formDataArray.push(formData);
        });
      });
    }
    // console.log(formDataArray)

    try {
      const responses = await Promise.all(formDataArray.map(async (formData) => {
        return axios.post('/api/store-mytest-item-column', formData);
      }));

      const successResponses = responses.filter(response => response.data.status === 201);
      const errorResponses = responses.filter(response => response.data.status === 422);
 
      if (successResponses.length > 0) {
        Swal.fire({
          title: "Success",
          text: `Successfully processed ${successResponses.length} out of ${responses.length} requests.`,
          icon: "success"
        });
      }
      errorResponses.forEach(response => {
        Swal.fire({
          title: "Error",
          text: Object.values(response.data.errors).flat().join(' '),
          icon: "error"
        });
        succesTotal = false;
      });
    } catch (error) {
      console.error(error);
      succesTotal = false;
    } finally {
      if (!succesTotal) {
        Swal.fire({
          title: "Error",
          text: "An error occurred during data processing.",
          icon: "error"
        });
      }
    }   
  }
  
  async function processTestOptions(succesTotal, resultObjectWordsArray) {

    const testItems = lastUpdatedArrayRef.current;
    // console.log(testItems);
    let notFoundTestItem = [];
    const formDataArray = [];
    if(selectedType === 'snap') {
      tabs.forEach((tab, index) => {
        const lines1 = lastAddText1.current[index].trim().split('\n');
        const lines2 = lastAddText2.current[index].trim().split('\n');
        const lines3 = lastAddText3.current[index].trim().split('\n');
        // console.log(lines1)
        // console.log(lines2)
        // console.log(lines3)        
        if (lines1.length === lines2.length && lines2.length === lines3.length && lines1.length === 16) {
    
          for (let i = 0; i < lines1.length; i++) {
            const formData = new FormData();
            formData.append('option', lines1[i]);
            formData.append('explanation', lines2[i]);
            formData.append('correct', lines1[i] === lines2[i] ? 1 : 0);
            formData.append('text_additional', lines3[i]);
            formData.append('test_item_id', testItems[index].id);
            formData.append('status', 0);
    
            formDataArray.push(formData);
          }
        }
      })
    } else if(selectedType === 'words') {
      tabs.forEach((tab, index) => {
        resultObjectWordsArray[index].wordsArray.forEach((word,wordIndex) => {
          const formData = new FormData();
          formData.append('option', word )
          formData.append('explanation', resultObjectWordsArray[index].htmlplain);
          formData.append('correct', wordIndex + 1);
          formData.append('text_additional', JSON.stringify(resultObjectWordsArray[index].htmlSpec));
          formData.append('test_item_id', testItems[index].id);
          formData.append('status', 0);
  
          formDataArray.push(formData);
        })
        if(resultObjectWordsArray.length > 0 ) {
          tab.testContent.testRows.forEach((row, rowIndex) => {
            const formData = new FormData();
            formData.append('option', row.option )
            formData.append('explanation', resultObjectWordsArray[0].htmlplain);
            formData.append('correct', 0);
            formData.append('text_additional', JSON.stringify(resultObjectWordsArray[0].htmlSpec));
            formData.append('test_item_id', testItems[index].id);
            formData.append('status', 0);
    
            formDataArray.push(formData);
          })
        }
      })
    }
    else {
      tabs.forEach((tab, index) => {
        const testRows = tab.testContent.testRows;
        for (let rowIndex = 0; rowIndex < testRows.length; rowIndex++) {
          const row = testRows[rowIndex];
      
          const formData = new FormData();
          formData.append('option', row.option);
          // console.log(selectedType)

          if(selectedType === 'dnd_group') {
            formData.append('correct', row.correct ? 1 : row.correct1 ? 2 : 0);
            formData.append('explanation', row.option);    
          } else if(selectedType === 'dnd_chrono'){
            formData.append('correct', 0);
            formData.append('explanation', row.explanation);     
          } else if(selectedType === "dnd"){
            formData.append('correct', row.correct == true? 1 : 0);
            formData.append('explanation', row.option); 
            // console.log(row.option)    
          } else {
            formData.append('correct', row.correct == true? 1 : 0);
            formData.append('explanation', row.explanation);     
          }

   
          // formData.append('text_additional', JSON.stringify(textWithQuotes));
          console.log(testItems)
          formData.append('test_item_id', testItems[index].id);
          formData.append('status', 0);
      
          formDataArray.push(formData);
        }
      });
    }
    // console.log(formDataArray)
  
    if (notFoundTestItem.length === 0) {
      try {
        const responses = await Promise.all(formDataArray.map(async (formData) => {
          return axios.post('/api/store-mytest-item-option', formData);
        }));
  
        const successResponses = responses.filter(response => response.data.status === 201);
        const errorResponses = responses.filter(response => response.data.status === 422);
   
        if (successResponses.length > 0) {
          Swal.fire({
            title: "Success",
            text: `Successfully processed ${successResponses.length} out of ${responses.length} requests.`,
            icon: "success"
          });
        }
  
        errorResponses.forEach(response => {
          Swal.fire({
            title: "Error",
            text: Object.values(response.data.errors).flat().join(' '),
            icon: "error"
          });
          succesTotal = false;
        });
      } catch (error) {
        console.error(error);
        succesTotal = false;
      }
    } else {
      if (notFoundTestItem.length > 0) {
        Swal.fire({
          title: "Unfound test item task:",
          text: Object.values(notFoundTestItem).flat().join(' '),
          icon: "error"
        });
        succesTotal = false;
      }
    }
  }

  async function processFormativeTestItems(succesTotal) {

    const formativeTest = lastUpdatedFormativeTestRef.current;
    const testItems = lastUpdatedArrayRef.current;

    try {
      for (let tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
        const tab = tabs[tabIndex];
  
        const formData = new FormData();
        formData.append('order_number', tabIndex + 1 );
        formData.append('test_item_id',testItems[tabIndex].id );
        formData.append('formative_test_id',formativeTest.id );
        formData.append('status', 0);
  
        // Trimite FormData către server pentru fiecare rând
        const response = await axios.post(`/api/store-myformative-test-item`, formData);
  
        if (response.data.status === 201) {
          Swal.fire({
            title: "Success",
            text: "Successfully processed the request.",
            icon: "success"
          });
        } else {
          Swal.fire({
            title: "Error",
            text: response.data.message,
            icon: "error"
          });
          succesTotal = false;
        }
      }
    } catch (error) {
      console.error('Eroare în timpul procesării datelor:', error);
      succesTotal = false;
    } finally {
      if (!succesTotal) {
        Swal.fire({
          title: "Error",
          text: "An error occurred during data processing.",
          icon: "error"
        });
      }
    }   
  }

  return (
    <div className="container-fluid px4 shadow-lg rounded p-1" style={{position: 'relative'}}>
      <h2 className="m-3">{title}</h2>

      <form className="form-group custom-form" ref={formRef} >

        <div className="rowBts">
          <div className="col-md-4">
            <div className="form-group mx-3 my-1">
              <label>Learn Program</label>
              <select name="learning_program_id" onChange={handleInput} value={testItemInput.learning_program_id} className="form-control">  
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
            <div className="form-group mx-3 my-1">
              <label>Theme</label>
              <select name="theme_learning_program_id" onChange={handleInput} value={testItemInput.theme_learning_program_id} className="form-control">  
                <option>Select Theme</option>
                {themeList
                  .filter((item) => item.learning_program_id == testItemInput.learning_program_id)
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

        <div className="rowBts">

          <div className="col-md-12">
            <div className="form-group mx-3">
              <label>Topics</label>
              <select name="teacher_topic_id" onChange={handleInput} value={testItemInput.teacher_topic_id} className="form-control">  
                <option>Select Topic</option>
                {
                  teacherTopicList
                  .filter((item) => item.teacher_id == userData.teacher.id)
                  .filter((item) => item.topic.theme_learning_program_id == testItemInput.theme_learning_program_id)                      
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

        </div>
        <div className="rowBts">
          <div className="col-md-6">          
            <div className="form-group mx-3 my-1">
              <label>Title</label>
              <input type="text" name="title" onChange={handleInput} value={testItemInput.title}className="form-control" />
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.title}</span>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group mx-3 my-1">
              <label>Complexity</label>
              <select name="test_complexity_id" onChange={handleInput} value={testItemInput.test_complexity_id} className="form-control">  
                <option>Select Test Complexity</option>
                {
                  testComplexityList
                  .map((item)=> {
                    return (
                      <option value={item.id} key={item.id}>{item.name}</option>
                    )
                  })
                }
              </select>            
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.test_complexity_id}</span>
            </div>
          </div>

        <div className="col-md-2">
            <div className="form-group mx-3 my-1">
              <label>№ ord.</label>
              <input type="number" name="order_number" onChange={handleInput} value={testItemInput.order_number} className="form-control" />
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.order_number}</span>
            </div>
          </div>
      </div>

      <div className="rowBts">

          <div className="col-md-8">          
            <div className="form-group mx-3" style={{ marginBottom: '10px'}}>
              <label style={{ color: '#8d99ae', fontSize: '0.8rem', paddingLeft: '10px' }}>Path: {path}</label>
              {/* <input type="text" name="path" onChange={handleInput} value={testItemInput.path}className="form-control" />
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{errorList.path}</span> */}
            </div>
          </div>

      </div>
      </form>
      {(selectedType === "quiz" ||
        selectedType === "check" ) && (
        <MyQuizTest
          tabs={tabs}
          addTab={addTab}
          removeTab={removeTab}
          onRemoveTab={removeTab}
          activeTab={activeTab}
          onTabClick={handleTabClick}
          tabContent={tabs.map(tab => tab.testContent)}
          handleInputTest={handleInputTest}
          handleRemoveTestRow={handleRemoveTestRow}
          handleAddTestRow={handleAddTestRow}
          errorList={errorList}
          testComplexityList={testComplexityList}
          editorStates = {editorStates}
          setEditorStates = {setEditorStates}
          pictures={pictures}
          setPictures={setPictures}
        />
      )}
      {(selectedType === "dnd" ) && (
        <MyTestDnD
          tabs={tabs}
          addTab={addTab}
          removeTab={removeTab}
          onRemoveTab={removeTab}
          activeTab={activeTab}
          onTabClick={handleTabClick}
          tabContent={tabs.map(tab => tab.testContent)}
          handleInputTest={handleInputTest}
          handleRemoveTestRow={handleRemoveTestRow}
          handleAddTestRow={handleAddTestRow}
          errorList={errorList}
          testComplexityList={testComplexityList}
          editorStates = {editorStates}
          setEditorStates = {setEditorStates}
          pictures={pictures}
          setPictures={setPictures}
        />
      )}
      {(selectedType === "dnd_group" ) && (
        <MyTestDnDGroup
          tabs={tabs}
          addTab={addTab}
          removeTab={removeTab}
          onRemoveTab={removeTab}
          activeTab={activeTab}
          onTabClick={handleTabClick}
          tabContent={tabs.map(tab => tab.testContent)}
          handleInputTest={handleInputTest}
          handleRemoveTestRow={handleRemoveTestRow}
          handleAddTestRow={handleAddTestRow}
          errorList={errorList}
          testComplexityList={testComplexityList}
          editorStates = {editorStates}
          setEditorStates = {setEditorStates}
          pictures={pictures}
          setPictures={setPictures}
        />
      )}
      {(selectedType === "dnd_chrono" ) && (
        <MyTestDnDOrder
          tabs={tabs}
          addTab={addTab}
          removeTab={removeTab}
          onRemoveTab={removeTab}
          activeTab={activeTab}
          onTabClick={handleTabClick}
          tabContent={tabs.map(tab => tab.testContent)}
          handleInputTest={handleInputTest}
          handleRemoveTestRow={handleRemoveTestRow}
          handleAddTestRow={handleAddTestRow}
          errorList={errorList}
          testComplexityList={testComplexityList}
          editorStates = {editorStates}
          setEditorStates = {setEditorStates}
          pictures={pictures}
          setPictures={setPictures}
        />
      )}
      {(selectedType === "dnd_chrono_double" ) && (
        <MyTestDnDOrderText
          tabs={tabs}
          addTab={addTab}
          removeTab={removeTab}
          onRemoveTab={removeTab}
          activeTab={activeTab}
          onTabClick={handleTabClick}
          tabContent={tabs.map(tab => tab.testContent)}
          handleInputTest={handleInputTest}
          handleRemoveTestRow={handleRemoveTestRow}
          handleAddTestRow={handleAddTestRow}
          errorList={errorList}
          testComplexityList={testComplexityList}
          editorStates = {editorStates}
          setEditorStates = {setEditorStates}
          pictures={pictures}
          setPictures={setPictures}
        />
      )}
      {(selectedType === "snap" ) && (
        <MyTestSnap
          tabs={tabs}
          addTab={addTab}
          removeTab={removeTab}
          onRemoveTab={removeTab}
          activeTab={activeTab}
          onTabClick={handleTabClick}
          tabContent={tabs.map(tab => tab.testContent)}
          handleInputTest={handleInputTest}
          handleRemoveTestRow={handleRemoveTestRow}
          handleAddTestRow={handleAddTestRow}
          errorList={errorList}
          testComplexityList={testComplexityList}
          editorStates = {editorStates}
          setEditorStates = {setEditorStates}
          pictures={pictures}
          setPictures={setPictures}
        />
      )}
      {(selectedType === "words" ) && (
        <MyTestWords
          tabs={tabs}
          addTab={addTab}
          removeTab={removeTab}
          onRemoveTab={removeTab}
          activeTab={activeTab}
          onTabClick={handleTabClick}
          tabContent={tabs.map(tab => tab.testContent)}
          handleInputTest={handleInputTest}
          handleRemoveTestRow={handleRemoveTestRow}
          handleAddTestRow={handleAddTestRow}
          errorList={errorList}
          testComplexityList={testComplexityList}
          editorStatesWords = {editorStatesWords}
          setEditorStatesWords = {setEditorStatesWords}
          editorStates = {editorStates}
          setEditorStates = {setEditorStates}
          pictures={pictures}
          setPictures={setPictures}
        />
      )}
      <button type="button" className="btnBts btn-success px-4 m-3 float-end" onClick={handleButtonClick} style={{position: 'absolute', bottom: '0px', right: '30px'}}>
        Submit
      </button>
   </div>
  )
}

export default MyFormativeTest;
