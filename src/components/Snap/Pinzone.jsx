import Point from "./Point";

const Pinzone = ({ transformMatrix, onPointMousedown, index }) => {

  return (
    <g transform={transformMatrix} >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        style={{ cursor: "pointer" }}
      >
        <Point x={24} y={23} onPointMousedown={(event) => onPointMousedown(event, index)} index={index}></Point>
      </svg>
    </g>
  );
};
export default Pinzone;
