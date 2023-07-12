import "./Canvas.css";
import { useEffect, useRef, useState } from "react";

const Canvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [fillColor, setFillColor] = useState("#000000");
  const [inputColor, setInputColor] = useState("#000000");
  const [selectedOption, setSelectedOption] = useState(5);
  const [points, setPoints] = useState([]);
  const [isAreaClosed, setIsAreaClosed] = useState(false);
  const [cursorStyle, setCursorStyle] = useState("default");
  const [undoStack, setUndoStack] = useState([]);
  const [action, setAction] = useState("none");
  const [positionText, setPositionText] = useState(null);

  const [tool, setTool] = useState("");
  const textAreaRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 674;
    canvas.height = 500;

    const context = canvas.getContext("2d");
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

  useEffect(() => {
    if (action === "writing" && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [action]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (tool === "text") {
      setAction("writing");
      if (!positionText) {
        setPositionText({ x: offsetX, y: offsetY });
      }
      return;
    }
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
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
    setPoints([...points, { x: offsetX, y: offsetY }]);
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    if (isDrawing) {
      const savedData = contextRef.current.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      setUndoStack((prevState) => [...prevState, savedData]);
    }
    setIsDrawing(false);
    setIsAreaClosed(true);
  };

  const setToDraw = () => {
    contextRef.current.globalCompositeOperation = "source-over";
    setCursorStyle("default");
    setTool("pensil");
  };

  const setToErase = () => {
    contextRef.current.globalCompositeOperation = "destination-out";
    setCursorStyle("cell");
    setTool("erase");
  };

  const setToText = () => {
    setCursorStyle("text");
    setTool("text");
    setPositionText(null);
  };

  const handleClickOutside = (event) => {
    // console.log(textAreaRef.current);
    if (textAreaRef.current && !textAreaRef.current.contains(event.target)) {
      contextRef.current.fillStyle = "black";
      contextRef.current.font = "28px sans-serif";
      contextRef.current.fillText(
        textAreaRef.current.value,
        positionText.x,
        positionText.y + 20
      );

      const savedData = contextRef.current.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      setUndoStack((prevState) => [...prevState, savedData]);
      setAction("none");
      setPositionText(null);
      // console.log("Клик за пределами textarea");
    }
  };

  const backgroundImageSrc = "/images/Romania_1938.png";

  const saveImageToLocal = async (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const savedData = context.getImageData(0, 0, canvas.width, canvas.height);

    const loadImage = () => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = backgroundImageSrc;
        image.onload = () => resolve(image);
        image.onerror = (error) => reject(error);
      });
    };

    try {
      const image = await loadImage();

      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempContext = tempCanvas.getContext("2d");

      // Отрисовываем фоновое изображение на временном холсте
      tempContext.drawImage(image, 0, 0);

      // Восстанавливаем сохраненные данные с прозрачным фоном
      const imageData = tempContext.getImageData(
        0,
        0,
        tempCanvas.width,
        tempCanvas.height
      );
      const pixels = imageData.data;
      const savedPixels = savedData.data;

      // Копируем сохраненные данные на временный холст с прозрачным фоном
      for (let i = 0; i < pixels.length; i += 4) {
        pixels[i] = savedPixels[i + 3] === 0 ? pixels[i] : savedPixels[i]; // красный
        pixels[i + 1] =
          savedPixels[i + 3] === 0 ? pixels[i + 1] : savedPixels[i + 1]; // зеленый
        pixels[i + 2] =
          savedPixels[i + 3] === 0 ? pixels[i + 2] : savedPixels[i + 2]; // синий
        pixels[i + 3] =
          savedPixels[i + 3] === 0 ? pixels[i + 3] : savedPixels[i + 3]; // альфа-канал
      }

      // Накладываем сохраненные данные на фоновое изображение
      tempContext.putImageData(imageData, 0, 0);

      // Получаем данные временного холста
      const finalImageData = tempCanvas.toDataURL("image/png");

      // Создаем ссылку для скачивания
      const link = document.createElement("a");
      link.href = finalImageData;
      link.download = "canvas_with_background.png";
      link.click();
    } catch (error) {
      console.error("Ошибка загрузки изображения:", error);
    }
  };

  const handleRangeChange = (e) => {
    setLineWidth(e.target.value);
  };

  const handleLineWidthChange = (e) => {
    setLineWidth(e.target.value);
  };

  const handleFillColorChange = (e) => {
    setFillColor(e.target.value);
    setInputColor(e.target.value);
    setSelectedOption(5);
  };

  const fillSelectedArea = () => {
    if (!isAreaClosed) {
      contextRef.current.fillStyle = hexToRgb(fillColor);
      contextRef.current.fillRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      const savedData = contextRef.current.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      setUndoStack((prevState) => [...prevState, savedData]);
    } else if (points && points.length > 0) {
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
      const savedData = contextRef.current.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      setUndoStack((prevState) => [...prevState, savedData]);
    }
  };

  const hexToRgb = (hex) => {
    const hexWithoutHash = hex.replace("#", "");
    const r = parseInt(hexWithoutHash.substring(0, 2), 16);
    const g = parseInt(hexWithoutHash.substring(2, 4), 16);
    const b = parseInt(hexWithoutHash.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, 0.3)`;
  };

  const testColor = (e, n) => {
    const element = e.target;
    const computedStyle = getComputedStyle(element);
    const backgroundColor = computedStyle.backgroundColor;
    console.log(backgroundColor);
    setFillColor(backgroundColor);
    setSelectedOption(n);
  };
  useEffect(() => {
    if (undoStack.length > 0) {
      contextRef.current.putImageData(undoStack[undoStack.length - 1], 0, 0);
    } else if (undoStack.length === 0) {
      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }
  }, [undoStack]);

  const handleUndo = () => {
    if (undoStack.length >= 0) {
      setUndoStack((prevState) => {
        const newState = [...prevState];
        newState.pop();
        return newState;
      });
    }
  };
  const canvasStyle = {
    backgroundImage: `url(${
      process.env.PUBLIC_URL + "/images/Romania_1938.png"
    })`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
    height: "500px",
    cursor: cursorStyle,
    position: "relative",
  };

  return (
    <div style={{ position: "relative" }} onClick={handleClickOutside}>
      <canvas
        className="canvas-container"
        ref={canvasRef}
        // style={{cursor: cursorStyle}}
        style={canvasStyle}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      ></canvas>
      <div className="toolbar-canvas">
        <button onClick={setToDraw} className="toolbar__btn brush" title="Brush"></button>
        <button onClick={setToErase} className="toolbar__btn eraser" title="Eraser"></button>
        <button onClick={setToText} className="toolbar__btn textA" title="Text"></button>
        {action === "writing" ? (
          <textarea
            ref={textAreaRef}
            // onBlur={handleBlur}
            style={{
              position: "absolute",
              top: positionText ? positionText.y - 2 : 0,
              left: positionText ? positionText.x : 0,
              font: "24px sans-serif",
              margin: 0,
              padding: 0,
              border: "1px dashed black",
              outline: 0,
              resize: "auto",
              overflow: "hidden",
              whiteSpace: "pre",
              background: "transparent",
            }}
          />
        ) : null}
        <button
          className="toolbar__btn clear" title="Clear"
          onClick={() => {
            contextRef.current.clearRect(
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
          }}
        ></button>
        <label>
          <input type="range" id="size-slider" min="1" max="30" value={lineWidth} onChange={handleRangeChange}/>
        </label>
        <span>{lineWidth}</span>
        <ul className="color-options">
          <li
            className={`color-option ${selectedOption === 1 ? "selected" : ""}`}
            onClick={(e) => testColor(e, 1)}
          ></li>
          <li
            className={`color-option ${selectedOption === 2 ? "selected" : ""}`}
            onClick={(e) => testColor(e, 2)}
          ></li>
          <li
            className={`color-option ${selectedOption === 3 ? "selected" : ""}`}
            onClick={(e) => testColor(e, 3)}
          ></li>
          <li
            className={`color-option ${selectedOption === 4 ? "selected" : ""}`}
            onClick={(e) => testColor(e, 4)}
          ></li>
          <li
            className={`color-option ${selectedOption === 5 ? "selected" : ""}`}
            style={{ background: inputColor }}
          >
            <input
              type="color"
              id="color-picker"
              onChange={handleFillColorChange}
            />
          </li>
        </ul>
        <button
          onClick={fillSelectedArea}
          className="toolbar__btn fill" title="Fill"
        ></button>
        <button className="toolbar__btn undo" onClick={handleUndo} title="Undo"></button>
        <button className="toolbar__btn save" onClick={saveImageToLocal} title="Save image" />
      </div>
    </div>
  );
};

export default Canvas;
