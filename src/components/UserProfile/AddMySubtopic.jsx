import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  Modifier,
} from "draft-js";

import Swal from "sweetalert2";

function AddMySubtopic({ onBackToList, userData }) {
  const [learningProgramList, setLearningProgramList] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [teacherTopicList, setTeacherTopicList] = useState([]);
  const [tags, setTags] = useState(["Unirea României"], ["Unirea Basarabiei"]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/all-learningPrograms").then((res) => {
      if (res.data.status === 200) {
        setLearningProgramList(res.data.learningProgram);
      }
    });

    axios
      .get("http://localhost:8000/api/all-themeLearningPrograms")
      .then((res) => {
        if (res.data.status === 200) {
          setThemeList(res.data.theme);
        }
      });

    axios.get("http://localhost:8000/api/all-topics").then((res) => {
      if (res.data.status === 200) {
        setTopicList(res.data.topics);
      }
    });

    axios.get("http://localhost:8000/api/all-myteachers").then((res) => {
      if (res.data.status === 200) {
        setTeacherList(res.data.teachers);
      }
    });

    axios.get("http://localhost:8000/api/all-myteacher-topics").then((res) => {
      if (res.data.status === 200) {
        setTeacherTopicList(res.data.teacherTopics);
      }
    });
  }, []);

  const [errorList, setErrors] = useState([]);
  const [teacherTopicInput, setTeacherTopicInput] = useState({
    learning_program_id: "",
    theme_learning_program_id: "",
    teacher_topic_id: "",
    topic_id: "",
    // teacher_id: '',
    order_number: "",
    name: "", //name la subtopic
    title: "", //title la video
    source: "",
  });

  const [allCheckboxes, setAllCheckboxes] = useState({
    status: false,
  });

  const handleInput = (e) => {
    e.persist();
    setTeacherTopicInput({
      ...teacherTopicInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckboxes({ ...allCheckboxes, [e.target.name]: e.target.checked });
  };

  const [subtopicRows, setSubtopicRows] = useState([
    { name_subtopic: "", audio_path: "" },
    { name_subtopic: "", audio_path: "" },
    { name_subtopic: "", audio_path: "" },
    { name_subtopic: "", audio_path: "" },
  ]);

  const handleAddSubtopicRow = () => {
    setSubtopicRows([...subtopicRows, { name_subtopic: "", audio_path: "" }]);
  };

  const handleRemoveSubtopicRow = (index) => {
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

  const [audioFiles, setAudioFiles] = useState([]);

  const handleAudio = (e, index) => {
    const file = e.target.files[0];
    // console.log(e.target)
    setAudioFiles((prevAudioFiles) => {
      const newAudioFiles = [...prevAudioFiles];
      newAudioFiles[index] = file;
      return newAudioFiles;
    });
  };

  const [photoRows, setPhotoRows] = useState([
    { photo_path: "", name_subtopic: "" },
    { photo_path: "", name_subtopic: "" },
    { photo_path: "", name_subtopic: "" },
    { photo_path: "", name_subtopic: "" },
  ]);

  const handleAddPhotoRow = () => {
    setPhotoRows([...photoRows, { photo_path: "", name_subtopic: "" }]);
  };

  const handleRemovePhotoRow = (index) => {
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

  const [pictures, setPictures] = useState([]);

  const handlePicture = (e, index) => {
    const file = e.target.files[0];
    // console.log(e.target)
    setPictures((prevAudioFiles) => {
      const newAudioFiles = [...prevAudioFiles];
      newAudioFiles[index] = file;
      return newAudioFiles;
    });
  };

  const [flipRows, setFlipRows] = useState([
    { flip_title: "", flip_answer: "" },
  ]);
  const [editorStates, setEditorStates] = useState(() =>
    flipRows.map(() => EditorState.createEmpty())
  );

  const handleAddFlipRow = () => {
    setFlipRows([...flipRows, { flip_title: "", flip_answer: "" }]);
    setEditorStates([...editorStates, EditorState.createEmpty()]);
  };

  const handleRemoveFlipRow = (index) => {
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
    const newEditorState = RichUtils.toggleInlineStyle(
      editorStates[index],
      "BOLD"
    );
    onChangeFormat(index, newEditorState);
  };

  const handleItalicClick = (index) => {
    const newEditorState = RichUtils.toggleInlineStyle(
      editorStates[index],
      "ITALIC"
    );
    onChangeFormat(index, newEditorState);
  };

  const handleUnderlineClick = (index) => {
    const newEditorState = RichUtils.toggleInlineStyle(
      editorStates[index],
      "UNDERLINE"
    );
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

      const newEditorState = EditorState.push(
        currentEditorState,
        contentWithColor,
        "change-inline-style"
      );
      onChangeFormat(rowIndex, newEditorState);
    }
  };

  const styleMap = {
    "color-red": {
      color: "red",
    },
    "color-green": {
      color: "green",
    },
    "color-blue": {
      color: "blue",
    },
    "color-yellow": {
      color: "yellow",
    },
    "color-cyan": {
      color: "cyan",
    },
    "color-magenta": {
      color: "magenta",
    },
    "color-black": {
      color: "black",
    },
  };

  const colorButtons = [
    { hex: "#ff0000", name: "color-red" },
    { hex: "#00ff00", name: "color-green" },
    { hex: "#0000ff", name: "color-blue" },
    { hex: "#ffff00", name: "color-yellow" },
    { hex: "#00ffff", name: "color-cyan" },
    { hex: "#ff00ff", name: "color-magenta" },
    { hex: "#4e4e3f", name: "color-black" },
  ];

  const groupStyledText = (html) => {
    const paragraphsWithoutPClose = html.split("</p>\n");

    const paragraphs = paragraphsWithoutPClose.map(
      (paragraph) => paragraph + "</p>"
    );
    paragraphs.pop();

    const result = [];
    let textResult = "";

    paragraphs.forEach((paragraph) => {
      if (paragraph.trim() !== "") {
        const textBeforeSpanMatch = paragraph.match(/<p[^>]*>(.*?)<span/);
        const textBeforeSpan = textBeforeSpanMatch
          ? textBeforeSpanMatch[1]
          : "";
        let i = 0;
        let lungime = paragraph.length;
        let currentStil = "";
        let inceputBlocCuStil = 0;

        if (textBeforeSpan == "" && paragraph.substring(3, 8) !== "<span") {
          result.push(paragraph);
          textResult = "";
          i = lungime;
        } else {
          textResult += `<p>${textBeforeSpan}`;

          inceputBlocCuStil = "<p>".length + textBeforeSpan.length;
        }

        while (i < lungime) {
          let sfarsitBlocStil = paragraph.indexOf(">", inceputBlocCuStil);

          let blocCuStil = paragraph.substring(
            inceputBlocCuStil,
            sfarsitBlocStil + 1
          );
          if (blocCuStil == "</p>") {
            textResult += "</span></p>";
            result.push(textResult);
            textResult = "";
            i = lungime;
            break;
          }

          if (blocCuStil !== currentStil) {
            currentStil = blocCuStil;

            textResult += currentStil;

            let pozitiaInceputSfarsitSpanTag = paragraph.indexOf(
              "</span>",
              sfarsitBlocStil + 1
            );

            let innerHtml = paragraph.substring(
              sfarsitBlocStil + 1,
              pozitiaInceputSfarsitSpanTag
            );
            textResult += innerHtml;

            let sfarsitTotSpan =
              pozitiaInceputSfarsitSpanTag + "</span>".length;
            let totSpan = paragraph.substring(
              inceputBlocCuStil,
              sfarsitTotSpan
            );

            let urmatorSimbolDupaBlocSpan = paragraph[sfarsitTotSpan];
            let sfarsitBlocFaraStil = sfarsitTotSpan;
            let blocFlaraStil = "";
            if (urmatorSimbolDupaBlocSpan !== "<") {
              sfarsitBlocFaraStil = paragraph.indexOf("<span", sfarsitTotSpan);
              currentStil = "";

              if (sfarsitBlocFaraStil == -1) {
                sfarsitBlocFaraStil = paragraph.indexOf("</p", sfarsitTotSpan);
                blocFlaraStil = paragraph.substring(
                  sfarsitTotSpan,
                  sfarsitBlocFaraStil
                );
                textResult += "</span>" + blocFlaraStil + "</p>";
                result.push(textResult);
                textResult = "";
                i = lungime;
              } else {
                blocFlaraStil = paragraph.substring(
                  sfarsitTotSpan,
                  sfarsitBlocFaraStil
                );
                textResult += "</span>" + blocFlaraStil;
              }
            } else if (
              paragraph.substring(
                urmatorSimbolDupaBlocSpan,
                urmatorSimbolDupaBlocSpan + 4
              )
            ) {
            }

            inceputBlocCuStil = sfarsitBlocFaraStil;
          } else {
            let pozitiaInceputSfarsitSpanTag = paragraph.indexOf(
              "</span>",
              inceputBlocCuStil + currentStil.length
            );
            let innerHtml = paragraph.substring(
              inceputBlocCuStil + currentStil.length,
              pozitiaInceputSfarsitSpanTag
            );
            textResult += innerHtml;

            let sfarsitTotSpan =
              pozitiaInceputSfarsitSpanTag + "</span>".length;
            let totSpan = paragraph.substring(
              inceputBlocCuStil,
              sfarsitTotSpan
            );

            let urmatorSimbolDupaBlocSpan = paragraph[sfarsitTotSpan];
            let sfarsitBlocFaraStil = sfarsitTotSpan;
            let blocFlaraStil = "";
            if (urmatorSimbolDupaBlocSpan !== "<") {
              sfarsitBlocFaraStil = paragraph.indexOf("<span", sfarsitTotSpan);
              currentStil = "";
              if (sfarsitBlocFaraStil == -1) {
                sfarsitBlocFaraStil = paragraph.indexOf("</p", sfarsitTotSpan);
                blocFlaraStil = paragraph.substring(
                  sfarsitTotSpan,
                  sfarsitBlocFaraStil
                );
                textResult += "</span>" + blocFlaraStil + "</p>";
                result.push(textResult);
                textResult = "";
                i = lungime;
              } else {
                blocFlaraStil = paragraph.substring(
                  sfarsitTotSpan,
                  sfarsitBlocFaraStil
                );
                textResult += "</span>" + blocFlaraStil;
              }
            }
            inceputBlocCuStil = sfarsitBlocFaraStil;
          }
          i = i + 1;
        }
      }
    });

    // console.log(result);
    return result.join("");
  };

  const convertStylesToInlineCSS = (styles) => {
    let inlineStyles = "";

    styles.forEach((style) => {
      if (style === "BOLD") {
        inlineStyles += "font-weight: bold; ";
      }

      if (style === "ITALIC") {
        inlineStyles += "font-style: italic; ";
      }

      if (style === "UNDERLINE") {
        inlineStyles += "text-decoration: underline; ";
      }

      if (style.startsWith("color")) {
        const color = style.replace("color-", "");
        inlineStyles += `color: ${color}; `;
      }
    });

    return inlineStyles;
  };

  const convertContentStateToHTML = (content) => {
    let html = "";

    content.forEach((block) => {
      const text = block.text;
      const spans = [];
      let currentStyles = {};

      block.inlineStyleRanges.forEach((style) => {
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
        html += `<p>${spans.join("")}</p>\n`;
      } else if (text.trim() !== "") {
        html += `<p>${text}</p>\n`;
      }
    });

    const groupedHTML = groupStyledText(html);
    return groupedHTML;
  };

  async function processSubtopicImages(succesTotal) {
    let notFoundSubtopic = [];
    const formDataArray = await Promise.all(
      photoRows.map(async (item, index) => {
        let subtopicId = null;

        if (item.name_subtopic) {
          try {
            const response = await axios.get(
              `http://localhost:8000/api/get-mysubtopic/${item.name_subtopic}`
            );
            subtopicId = response.data.subtopic.id;
          } catch (error) {
            console.error("Eroare la căutarea subtopicului:", error);
          }
        }

        if (!subtopicId) {
          notFoundSubtopic.push(item.name_subtopic);
        }

        const formData = new FormData();
        formData.append("subtopic_id", subtopicId);
        formData.append("image", pictures[index]);
        formData.append("path", item.image_path);
        formData.append("status", 0);
        return formData;
      })
    );

    if (notFoundSubtopic.length === 0) {
      try {
        const responses = await Promise.all(
          formDataArray.map(async (formData) => {
            // console.log('FormData:', formData);
            return axios.post(
              "http://localhost:8000/api/store-mysubtopic-image",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          })
        );

        const successResponses = responses.filter(
          (response) => response.data.status === 201
        );
        const errorResponses = responses.filter(
          (response) => response.data.status === 422
        );

        // console.log(errorResponses);

        if (successResponses.length > 0) {
          Swal.fire({
            title: "Success",
            text: `Successfully processed ${successResponses.length} out of ${responses.length} requests.`,
            icon: "success",
          });
        }

        errorResponses.forEach((response) => {
          Swal.fire({
            title: "Error",
            text: Object.values(response.data.errors).flat().join(" "),
            icon: "error",
          });
          succesTotal = false;
        });
      } catch (error) {
        console.error(error);
        succesTotal = false;
      }
    } else {
      if (notFoundSubtopic.length > 0) {
        Swal.fire({
          title: "Unfound subtopic name:",
          text: Object.values(notFoundSubtopic).flat().join(" "),
          icon: "error",
        });
      }
    }
  }

  const submitTeacherTopic = (e) => {
    e.preventDefault();
    let succesTotal = true;
    // console.log(subtopicRows.length)
    if (subtopicRows && subtopicRows.length > 0) {
      const formDataArray = subtopicRows.map((item, index) => {
        console.log(audioFiles[index])
        console.log(item.audio_path)        
        const formData = new FormData();
        formData.append("name", item.name_subtopic);
        formData.append("order_number", index+1);
        formData.append("teacher_topic_id", teacherTopicInput.teacher_topic_id);
        if(item.audio_path.trim().length !== 0) {
          formData.append("audio", audioFiles[index]);
          formData.append("audio_path", item.audio_path);
        }
        formData.append("status", 0);
        return formData;
      });

      axios
        .all(
          formDataArray.map((formData) => {
            // console.log('FormData:', formData);
            return axios.post(
              "http://localhost:8000/api/store-mysubtopic",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          })
        )
        .then(
          axios.spread((...responses) => {
            const successResponses = responses.filter(
              (response) => response.data.status === 201
            );
            const errorResponses = responses.filter(
              (response) => response.data.status === 422
            );
            // console.log(errorResponses)
            if (successResponses.length > 0) {
              Swal.fire({
                title: "Success",
                text: `Successfully processed ${successResponses.length} out of ${responses.length} requests.`,
                icon: "success",
              });
            }
            errorResponses.forEach((response) => {
              Swal.fire({
                title: "Error",
                text: Object.values(response.data.errors).flat().join(" "),
                icon: "error",
              });
              succesTotal = false;
            });
          })
        )
        .catch((error) => {
          console.error(error);
          succesTotal = false;
        });
    }

    if (photoRows && photoRows.length > 0) {
      processSubtopicImages(succesTotal);
    }

    if (flipRows && flipRows.length > 0) {
      const formattedDataArray = flipRows.map((row, index) => {
        const currentContent = editorStates[index].getCurrentContent();
        const contentWithStyles = convertToRaw(currentContent);
        const html = convertContentStateToHTML(contentWithStyles.blocks);
        // console.log(html)

        const formData = new FormData();
        formData.append("task", row.flip_title);
        formData.append("teacher_topic_id", teacherTopicInput.teacher_topic_id);
        formData.append("answer", html.replace(/\n/g, "<br/>"));
        formData.append("status", 0);
        return formData;
      });

      // console.log(formattedDataArray);
      axios
        .all(
          formattedDataArray.map((formData) => {
            // console.log('FormData:', formData);
            return axios.post(
              "http://localhost:8000/api/store-myflip-card",
              formData
            );
          })
        )
        .then(
          axios.spread((...responses) => {
            const successResponses = responses.filter(
              (response) => response.data.status === 201
            );
            const errorResponses = responses.filter(
              (response) => response.data.status === 422
            );
            // console.log(errorResponses)
            if (successResponses.length > 0) {
              Swal.fire({
                title: "Success",
                text: `Successfully processed ${successResponses.length} out of ${responses.length} requests.`,
                icon: "success",
              });
            }
            errorResponses.forEach((response) => {
              Swal.fire({
                title: "Error",
                text: Object.values(response.data.errors).flat().join(" "),
                icon: "error",
              });
              succesTotal = false;
            });
          })
        )
        .catch((error) => {
          console.error(error);
          succesTotal = false;
        });
    }

    if (tags.length > 0) {
      const formDataArray = tags.map((tag) => {
        const selectedTeacherTopic = teacherTopicList.find(
          (item) => item.id == teacherTopicInput.teacher_topic_id
        );
        const topicId = selectedTeacherTopic
          ? selectedTeacherTopic.topic_id
          : null;

        const selectedLearningProgram = learningProgramList.find(
          (item) => item.id == teacherTopicInput.learning_program_id
        );
        const subjectStudyLevelId = selectedLearningProgram
          ? selectedLearningProgram.subject_study_level_id
          : null;
        // console.log(learningProgramList)
        // console.log(selectedLearningProgram)
        // console.log(teacherTopicInput.learning_program_id)

        const formData = new FormData();
        formData.append("tag_name", tag);
        formData.append("taggable_id", topicId);
        formData.append("taggable_type", "App\\Models\\Topic");
        formData.append("subject_study_level_id", subjectStudyLevelId);
        formData.append("status", 0);
        return formData;
      });

      axios
        .all(
          formDataArray.map((formData) =>
            axios.post("http://localhost:8000/api/store-mytag", formData)
          )
        )
        .then(
          axios.spread((...responses) => {
            const successResponses = responses.filter(
              (response) => response.data.status === 201
            );
            const errorResponses = responses.filter(
              (response) => response.data.status === 422
            );
            if (successResponses.length > 0) {
              Swal.fire({
                title: "Success",
                text: `Successfully processed ${successResponses.length} out of ${responses.length} requests.`,
                icon: "success",
              });
            }
            errorResponses.forEach((response) => {
              Swal.fire({
                title: "Error",
                text: Object.values(response.data.errors).flat().join(" "),
                icon: "error",
              });
              succesTotal = false;
            });
          })
        )
        .catch((error) => {
          console.error(error);
          succesTotal = false;
        });
    }
    if (succesTotal) {
      onBackToList();
    }
  };

  const handleBackToList = () => {
    onBackToList();
  };

  const removeTags = (indexToRemote) => {
    setTags(tags.filter((_, index) => index !== indexToRemote));
  };

  const addTags = (event) => {
    event.preventDefault();
    if (event.target.value.trim() !== "") {
      // console.log(event.target.value)
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };

  return (
    <div
      className="container-fluid px4"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <h2 className="m-3">
        Adaugarea subtemei profesorului
        <button
          onClick={handleBackToList}
          type="button"
          className="btnBts btn-primary text-white px-4 m-3 float-end"
        >
          BACK to List
        </button>
      </h2>

      <ul className="navSide nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-linkSide active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            Home
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane card-body border fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <form
            className="form-group custom-form"
            onSubmit={submitTeacherTopic}
            encType="multipart/form-data"
          >
            <div className="rowBts">
              <div className="col-md-4">
                <div className="form-group m-3">
                  <label>Learn Program</label>
                  <select
                    name="learning_program_id"
                    onChange={handleInput}
                    value={teacherTopicInput.learning_program_id}
                    className="form-control"
                  >
                    <option>Select program</option>
                    {learningProgramList.map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  <span style={{ color: "red", fontSize: "0.8rem" }}>
                    {errorList.learning_program_id}
                  </span>
                </div>
              </div>
              <div className="col-md-8">
                <div className="form-group m-3">
                  <label>Theme</label>
                  <select
                    name="theme_learning_program_id"
                    onChange={handleInput}
                    value={teacherTopicInput.theme_learning_program_id}
                    className="form-control"
                  >
                    <option>Select Theme</option>
                    {themeList
                      .filter(
                        (item) =>
                          item.learning_program_id ==
                          teacherTopicInput.learning_program_id
                      )
                      .map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                  <span style={{ color: "red", fontSize: "0.8rem" }}>
                    {errorList.theme_learning_program_id}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group m-3">
                <label>Topics</label>
                <select
                  name="teacher_topic_id"
                  onChange={handleInput}
                  value={teacherTopicInput.teacher_topic_id}
                  className="form-control"
                >
                  <option>Select Topic</option>
                  {teacherTopicList
                    .filter((item) => item.teacher_id == userData.teacher.id)
                    .filter(
                      (item) =>
                        item.topic.theme_learning_program_id ==
                        teacherTopicInput.theme_learning_program_id
                    )
                    .map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
                <span style={{ color: "red", fontSize: "0.8rem" }}>
                  {errorList.teacher_topic_id}
                </span>
              </div>
            </div>

            <div className="border p-3">
              {subtopicRows.map((row, index) => (
                <div
                  className="rowBts no-gutters"
                  key={index}
                  style={{ alignItems: "end" }}
                >
                  <div className="col-md-6">
                    <div className="form-group mx-3 my-1">
                      {index === 0 && <label>Subtopic</label>}
                      <input
                        type="text"
                        name="name_subtopic"
                        onChange={(event) => handleInputSubtopic(index, event)}
                        value={row.name_subtopic}
                        className="form-control"
                      />
                      <span style={{ color: "red", fontSize: "0.8rem" }}>
                        {errorList.name_subtopic}
                      </span>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group mx-3 my-1">
                      {index === 0 && <label>Audio Path</label>}
                      <input
                        type="file"
                        accept="audio/mp3, audio/wav"
                        name="audio"
                        onChange={(e) => handleAudio(e, index)}
                        className="form-control custom-file-input"
                      />
                      <span style={{ color: "red", fontSize: "0.8rem" }}>
                        {errorList.audio_path}
                      </span>
                    </div>
                  </div>

                  <div className="col-md-2">
                    <button
                      type="button"
                      className="btnBts btn-danger btn-sm mx-3"
                      onClick={() => handleRemoveSubtopicRow(index)}
                      style={{ marginBottom: "12px" }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="btnBts btn-success btn-sm px-4 mx-3 my-3"
                onClick={handleAddSubtopicRow}
              >
                Add Row
              </button>
            </div>

            <div className="border p-3">
              {photoRows.map((row, index) => (
                <div
                  className="rowBts no-gutters"
                  key={index}
                  style={{ alignItems: "end" }}
                >
                  <div className="col-md-6">
                    <div className="form-group mx-3 my-1">
                      {index === 0 && <label>Subtopic</label>}
                      <input
                        type="text"
                        name="name_subtopic"
                        onChange={(event) => handleInputPhoto(index, event)}
                        value={row.name_subtopic}
                        className="form-control"
                      />
                      <span style={{ color: "red", fontSize: "0.8rem" }}>
                        {errorList.name_subtopic}
                      </span>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group mx-3 my-1">
                      {index === 0 && <label>Photo Path</label>}
                      <input
                        type="file"
                        accept="image/*"
                        name="picture"
                        onChange={(e) => handlePicture(e, index)}
                        className="form-control"
                      />
                      <span style={{ color: "red", fontSize: "0.8rem" }}>
                        {errorList.photo_path}
                      </span>
                    </div>
                  </div>

                  <div className="col-md-2">
                    <button
                      type="button"
                      className="btnBts btn-danger btn-sm mx-3"
                      onClick={() => handleRemovePhotoRow(index)}
                      style={{ marginBottom: "12px" }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="btnBts btn-success btn-sm px-4 mx-3 my-3"
                onClick={() => handleAddPhotoRow()}
              >
                Add Row
              </button>
            </div>

            <div className="border p-3">
              {flipRows.map((row, rowIndex) => (
                <div
                  className="rowBts"
                  key={rowIndex}
                  style={{ alignItems: "end" }}
                >
                  <div className="col-md-4">
                    <div className="form-group mx-3 my-1">
                      {rowIndex === 0 && <label>Flip Card Title</label>}
                      <input
                        type="text"
                        name="flip_title"
                        onChange={(event) =>
                          handleInputFlip(
                            rowIndex,
                            event,
                            editorStates[rowIndex]
                              .getCurrentContent()
                              .getPlainText()
                          )
                        }
                        value={row.flip_title}
                        className="form-control"
                      />
                      <span style={{ color: "red", fontSize: "0.8rem" }}>
                        {errorList.flip_title}
                      </span>
                    </div>
                  </div>

                  <div className="white-background col-md-6">
                    {rowIndex === 0 && (
                      <label style={{ marginBottom: "10px", display: "block" }}>
                        Flip Card Answer
                      </label>
                    )}
                    {rowIndex !== 0 && <div style={{ height: "10px" }}></div>}
                    <div className="d-flex gap-1">
                      <button
                        type="button"
                        className="small-button"
                        onClick={() => handleBoldClick(rowIndex)}
                      >
                        Bold
                      </button>
                      <button
                        type="button"
                        className="small-button"
                        onClick={() => handleItalicClick(rowIndex)}
                      >
                        Italic
                      </button>
                      <button
                        type="button"
                        className="small-button"
                        onClick={() => handleUnderlineClick(rowIndex)}
                      >
                        Underline
                      </button>

                      {colorButtons.map((color, colorIndex) => (
                        <button
                          key={colorIndex}
                          type="button"
                          onClick={() => handleColorClick(rowIndex, color.name)}
                          style={{
                            backgroundColor: color.hex,
                            width: "20px",
                            height: "20px",
                            border: "none",
                            marginRight: "5px",
                          }}
                        />
                      ))}
                      {/* <button type="button" onClick={handleSaveClick}>Save</button> */}
                    </div>
                    <Editor
                      editorState={editorStates[rowIndex]}
                      onChange={(newEditorState) =>
                        onChangeFormat(rowIndex, newEditorState)
                      }
                      customStyleMap={styleMap}
                    />
                  </div>

                  <div className="col-md-2">
                    <button
                      type="button"
                      className="btnBts btn-danger btn-sm mx-3 my-2"
                      onClick={() => handleRemoveFlipRow(rowIndex)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="btnBts btn-success btn-sm px-4 mx-3 my-2"
                onClick={handleAddFlipRow}
              >
                Add Row
              </button>
            </div>

            <div className="rowBts">
              <div className="col-md-12">
                <p className="mx-3 my-1" style={{ paddingTop: "15px" }}>
                  Tags
                </p>
                <div className="tags-input-container form-group mx-3">
                  {tags.map((tag, index) => (
                    <div key={index} className="tag-item">
                      <span className="tag-text">{tag}</span>
                      <span
                        className="tag-close-icon"
                        onClick={() => removeTags(index)}
                      >
                        &times;
                      </span>
                    </div>
                  ))}
                  <input
                    type="text"
                    placeholder="Press enter to add tags"
                    className="tags-input"
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // Oprește evenimentul implicit al tastaturii pentru tasta Enter
                        addTags(e);
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-12 d-flex justify-content-end">
              <button type="submit" className="btnBts btn-success px-4 m-3">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMySubtopic;
