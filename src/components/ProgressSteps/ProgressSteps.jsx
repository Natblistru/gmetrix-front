import { useEffect, useState } from 'react';
import Circle from './Circle';
import './progressSteps.css';

const ProgressSteps = (props) => {
  const [currentActive, setcurrentActive] = useState(props.activeCircle);
  useEffect(() => {
    setcurrentActive(props.activeCircle)
  })
  let arraySubject = [...props.list];
  // console.log(arraySubject)
  const circlesLength = arraySubject.length;
  const clickStepHandler = (idx) => {
    setcurrentActive(idx+1);
    props.onClick(idx);
  }
  const progressWidth = `${(currentActive - 1) / (circlesLength - 1) * 100}%`;
  // console.log(currentActive);
    return (
        <div className="slider-container">
        <div className="progress-container">
          <div className="progress" style={{ width: progressWidth }}></div>
          {
            arraySubject
              .sort((a, b) => a.id - b.id)
              .map(circle => (
              <Circle className={(+circle.id) == currentActive ? "active":""} 
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