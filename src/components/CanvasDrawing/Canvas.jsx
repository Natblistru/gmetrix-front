import "./Canvas.css";
import { useEffect, useRef, useState } from "react";

const Canvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [fillColor, setFillColor] = useState("black");
  const [points, setPoints] = useState([]);
  const [isAreaClosed, setIsAreaClosed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 674;
    canvas.height = 500;

    const context = canvas.getContext("2d");
    const img = new Image(674,500);
    img.onload = function() {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = "/images/Romania_1938.png";

    context.lineCap = "round";
    context.strokeStyle = fillColor;
    context.lineWidth = lineWidth;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    contextRef.current.lineWidth = lineWidth;
  }, [lineWidth]);

  useEffect(() => {
    contextRef.current.strokeStyle = fillColor;
  }, [fillColor]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    // contextRef.current.lineTo(offsetX, offsetY);
    // contextRef.current.stroke();
    setIsDrawing(true);
    // nativeEvent.preventDefault();
    setPoints([{ x: offsetX, y: offsetY }]);
    setIsAreaClosed(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    // nativeEvent.preventDefault();
    setPoints([...points, { x: offsetX, y: offsetY }]); 
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    setIsAreaClosed(true);
  };

  const setToDraw = () => {
    contextRef.current.globalCompositeOperation = "source-over";
  };

  const setToErase = () => {
    contextRef.current.globalCompositeOperation = "destination-out";
  };

  const saveImageToLocal = (event) => {
    let link = event.currentTarget;
    link.setAttribute("download", "canvas.png");
    let image = canvasRef.current.toDataURL("image/png");
    link.setAttribute("href", image);
  };

  const handleLineWidthChange = (e) => {
    setLineWidth(e.target.value);
  };

  const handleFillColorChange = (e) => {
    setFillColor(e.target.value);
  };

  const fillSelectedArea = () => {
    console.log(fillColor);
    if (!isAreaClosed) {
      contextRef.current.fillStyle = hexToRgb(fillColor);
      contextRef.current.fillRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = hexToRgb(fillColor);
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      context.lineTo(points[i].x, points[i].y);
    }

    context.closePath();
    context.fill();
  };

  const hexToRgb = (hex) => {
    const hexWithoutHash = hex.replace("#", "");
    const r = parseInt(hexWithoutHash.substring(0, 2), 16);
    const g = parseInt(hexWithoutHash.substring(2, 4), 16);
    const b = parseInt(hexWithoutHash.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, 0.3)`;
  };

  // const canvasStyle = {
  //   backgroundImage: `url(${
  //     process.env.PUBLIC_URL + "/images/Romania_1938.png"
  //   })`,
  //   backgroundRepeat: "no-repeat",
  //   backgroundSize: "cover",
  //   width: "100%",
  //   height: "500px",
  // };

  return (
    <div>
      <canvas
        className="canvas-container"
        ref={canvasRef}
        // style={canvasStyle}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      ></canvas>
      <div>
        <button onClick={setToDraw}>Draw</button>
        <button onClick={setToErase}>Erase</button>
        <button
          onClick={() => {
            contextRef.current.clearRect(
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
          }}
        >
          Clear
        </button>
        <label>
          Color:{" "}
          <input
            type="color"
            name="color"
            value={fillColor}
            onChange={handleFillColorChange}
          />
        </label>
        <label>
          Size:{" "}
          <input
            type="number"
            name="number"
            size="4"
            value={lineWidth}
            onChange={handleLineWidthChange}
          />
        </label>
        <button onClick={fillSelectedArea}>Заполнить цветом</button>
        <a
          id="download_image_link"
          href="download_link"
          onClick={saveImageToLocal}
        >
          Download Image
        </a>
      </div>
    </div>
  );
};

export default Canvas;
