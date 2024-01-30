import React, { useState, useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import projImg1 from "../assets/img/video.png";
import projImg2 from "../assets/img/Audio.png";
import projImg3 from "../assets/img/flip.png";
import projImg4 from "../assets/img/test_quiz.png";
import projImg5 from "../assets/img/test_snap.png";
import projImg6 from "../assets/img/test_dnd.png";
import projImg7 from "../assets/img/test_words.png";
import projImg8 from "../assets/img/evaluare.png";
import projImg9 from "../assets/img/rezultate.png";

import profImg1 from "../assets/img/tema_prof.png";
import profImg2 from "../assets/img/video_prof.png";
import profImg3 from "../assets/img/audio_prof.png";
import profImg4 from "../assets/img/image_prof.png";
import profImg5 from "../assets/img/flip_prof.png";
import profImg6 from "../assets/img/test_prof.png";
import ProjectCard from './ProjectCard';
// import colorSharp2 from "../assets/img/color-sharp2.png";
// import 'animate.css';
// import TrackVisibility from 'react-on-screen';

function Projects() {

  const [activeTab, setActiveTab] = useState("first");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    AOS.init(); 
  }, []);

  const projects = [
    {
      title: "Lecții video",
      description: "cu breakpoint-uri",
      imgUrl: projImg1,
    },
    {
      title: "Slide-uri de imagini",
      description: "însoțite de audio",
      imgUrl: projImg2,
    },
    {
      title: "Carduri rotative",
      description: "pentru memorare",
      imgUrl: projImg3,
    },
    {
      title: "Teste quizz",
      description: "interactive",
      imgUrl: projImg4,
    },
    {
      title: "Teste de asociere",
      description: "interactive",
      imgUrl: projImg5,
    },
    {
      title: "Teste drag-n-drop",
      description: "interactive",
      imgUrl: projImg6,
    },
    {
      title: "Teste completarea",
      description: "lacunelor",
      imgUrl: projImg7,
    },
    {
      title: "Practica evaluărilor",
      description: "anilor precedenți",
      imgUrl: projImg8,
    },
    {
      title: "Analiza rezultatelor",
      description: "studentului",
      imgUrl: projImg9,
    },
  ];

  const projectsProf = [
    {
      title: "Constructorul temelor",
      description: "profesorului",
      imgUrl: profImg1,
    },
    {
      title: "Adăugare video",
      description: "cu breakpoint-uri",
      imgUrl: profImg2,
    },
    {
      title: "Adăugare fișiere audio",
      description: "pentru sonorizarea prezentărilor",
      imgUrl: profImg3,
    },
    {
      title: "Agaugare imagini",
      description: "pentru prezentări",
      imgUrl: profImg4,
    },
    {
      title: "Constructorul fișelor",
      description: "de memorare",
      imgUrl: profImg5,
    },
    {
      title: "Constructorul testelor",
      description: "profesorului",
      imgUrl: profImg6,
    },
  ];

  const handleTabChange = (key) => {
    setActiveTab(key);
    setIsVisible(true);
  };

  return (
    <section className="project" id="projects" data-aos="fade-up">
      <div style={{width: '100%', paddingRight: '.75rem', paddingLeft: '.75rem', marginRight: 'auto', marginLeft: 'auto'}}>
        <div className="rowBts">
          <div className="col-md-12">
              <h2>Ce conține platforma?</h2>
                <div id="projects-tabs">
                  <div className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <div id="projects-tabs-tab-first" className={`nav-item ${activeTab === "first" ? "active" : ""}`}>
                      <div className="nav-link" onClick={() => handleTabChange("first")}>Penru elevi</div>
                    </div>
                    <div id="projects-tabs-tab-second" className={`nav-item ${activeTab === "second" ? "active" : ""}`}>
                      <div className="nav-link" onClick={() => handleTabChange("second")}>Pentru profesori</div>
                    </div>
                  </div>
                  <div id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                  {activeTab === "first" && (
                      <div className="rowBts  aos-init aos-animate" data-aos="fade-up">
                        {projects.map((project, index) => (
                              <ProjectCard
                              key={index}
                              {...project}
                              />
                        ))}
                      </div>
                    )}
                    {activeTab === "second" && (
                      <div className="rowBts">
                      {projectsProf.map((project, index) => (
                            <ProjectCard
                            key={index}
                            {...project}
                            />
                      ))}
                    </div>
                    )}
                  </div>
                </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects;
