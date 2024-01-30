import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';


const ProjectCard = ({ title, description, imgUrl }) => {
  useEffect(() => {
    AOS.init(); 
  }, []);

  return (
    <div className="col-md-4" data-aos="fade-up">
      <div className="proj-imgbx">
        <img src={imgUrl} />
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
        </div>
      </div>
    </div>
  )
}
export default ProjectCard;
