import "./ModalArrows.css";

const ModalArrows = ({setModalPosition}) => {
  const moveUp = () => {
    setModalPosition((prevPosition) => ({
      ...prevPosition,
      y: prevPosition.y - 10,
    }));
  };

  const moveDown = () => {
    setModalPosition((prevPosition) => ({
      ...prevPosition,
      y: prevPosition.y + 10,
    }));
  };

  const moveLeft = () => {
    setModalPosition((prevPosition) => ({
      ...prevPosition,
      x: prevPosition.x - 10,
    }));
  };

  const moveRight = () => {
    setModalPosition((prevPosition) => ({
      ...prevPosition,
      x: prevPosition.x + 10,
    }));
  };
  return (
    <div className="modal-arrows">
        <div className="arrow-container">
          <div className="arrow arrow--up" onClick={moveUp}>
            <div className="arrow-line arrow-line__upper"></div>
            <div className="arrow-line arrow-line__lower"></div>
          </div>
        </div>
        <div className="arrow-container">
          <div className="arrow arrow--back" onClick={moveLeft}>
            <div className="arrow-line arrow-line__upper"></div>
            <div className="arrow-line arrow-line__lower"></div>
          </div>
          <div className="arrow"></div>
          <div className="arrow arrow--next" onClick={moveRight}>
            <div className="arrow-line arrow-line__upper"></div>
            <div className="arrow-line arrow-line__lower"></div>
          </div>
        </div>
        <div className="arrow-container">
          <div className="arrow arrow--down" onClick={moveDown}>
            <div className="arrow-line arrow-line__upper"></div>
            <div className="arrow-line arrow-line__lower"></div>
          </div>
        </div>
      </div>
  )
}
export default ModalArrows;