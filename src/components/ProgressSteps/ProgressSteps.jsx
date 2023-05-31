import { useState } from 'react';
import Circle from './Circle';
import './progressSteps.css';

const ProgressSteps = (props) => {
  const [currentActive, setcurrentActive] = useState(1);
  let arraySubject = props.list;

  const circlesLength = arraySubject.length;
  const clickStepHandler = (idx) => {
    setcurrentActive(idx+1);
    props.onClick(idx);
  }
  const progressWidth = `${(currentActive - 1) / (circlesLength - 1) * 100}%`;
    return (
        <div className="container">
        <div className="progress-container">
          <div className="progress" style={{ width: progressWidth }}></div>
          {
            arraySubject.map(circle => (
              <Circle className={(+circle.id-1) < currentActive ? "active":""} 
                      index={+circle.id} 
                      onClick = {() => clickStepHandler(+circle.id-1)}
                      key={circle.id}/>
            ))
          }

        </div>
      </div>
    )
}
export default ProgressSteps;