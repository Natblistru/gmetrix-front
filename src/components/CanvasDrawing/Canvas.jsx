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
    if(action==="writing" && textAreaRef.current) {
    textAreaRef.current.focus()
  }
  }, [action]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (tool === "text") {
      setAction("writing");
      if (!positionText) {
        setPositionText({x:offsetX,y:offsetY});
        
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
    setPositionText(null)
  };

  const handleClickOutside = (event) => {
    console.log(textAreaRef.current)
    if (textAreaRef.current && !textAreaRef.current.contains(event.target)) {
      contextRef.current.font = "28px sans-serif";
      contextRef.current.fillText(textAreaRef.current.value, positionText.x, positionText.y+20);

      const savedData = contextRef.current.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      setUndoStack((prevState) => [...prevState, savedData]);
      setAction("none")
      setPositionText(null)
      console.log("Клик за пределами textarea");
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

  const handleLineWidthChange = (e) => {
    setLineWidth(e.target.value);
  };

  const handleFillColorChange = (e) => {
    setFillColor(e.target.value);
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
    position: 'relative',
  };

  return (
    <div style={{position: 'relative'}} onClick={handleClickOutside}>
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
      <div>
        <button onClick={setToDraw} className="toolbar__btn brush"></button>
        <button onClick={setToErase} className="toolbar__btn eraser"></button>
        <button onClick={setToText} className="toolbar__btn textA"></button>
        {action === "writing" ? (
          <textarea
            ref={textAreaRef}
            // onBlur={handleBlur}
            style={{
              position: "absolute",
              top: positionText? (positionText.y - 2) : 0,
              left: positionText? positionText.x : 0,
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
        <button className="toolbar__btn clear"
          onClick={() => {
            contextRef.current.clearRect(
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
          }}
        >
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
        <button className="toolbar__btn save" onClick={saveImageToLocal} />
        <button className="toolbar__btn undo" onClick={handleUndo}></button>
      </div>
    </div>
  );
};

export default Canvas;
