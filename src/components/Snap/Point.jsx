import React, { useEffect, useRef } from "react";
import Snap from "snapsvg-cjs";

const Point = ({ x, y, onPointMousedown, index }) => {
  const svgRef = useRef(null);
  const dotRef = useRef(null);
  const borderRef = useRef(null);
  const outlineRef = useRef(null);
  const shadowRef = useRef(null);

  useEffect(() => {

    const svgElement = svgRef.current;
    const s = Snap(svgElement);
    const dot = s.circle(x, y, 1).attr({ fill: "#232323" });
    const border = s
      .circle(x, y, 7.5)
      .attr({ stroke: "#ffffff", fill: "#ffffff" });
    const outline = s.circle(x, y, 8.5).attr({ stroke: "#232323" });
    const shadow = s
      .circle(x, y, 9)
      .attr({
        fill: "white",
        fillOpacity: "0.01",
        shapeRendering: "crispEdges",
      });

    const mina = window.mina;

    const point = s.group(shadow, outline, border, dot);

    point.hover(function () {
      point.animate({ transform: "s1.33,1.33" }, 100, mina.easeout);
      dot.animate({ r: "4.5" }, 100, mina.easeout);
    });

    point.mouseout(function () {
      point.animate({ transform: "s1,1" }, 100);
      dot.animate({ r: "1" }, 100, mina.easeout);
    });

    point.mousedown(function (event) {
      // const line = m
      // .line(x, y, event.offsetX, event.offsetY)
      // .attr({ strokeWidth: 2, stroke: "black" });

      onPointMousedown(event,index);
    });

    // Привязка ссылок к элементам <circle>
    dotRef.current = dot;
    borderRef.current = border;
    outlineRef.current = outline;
    shadowRef.current = shadow;

    return () => {
      // Очистка ресурсов при размонтировании компонента
      // ...
    };
  }, []);

  return (
    <svg ref={svgRef} style={{ height: "35px", width: "50px" }}>
      {dotRef.current && (
        <g>
          <circle ref={shadowRef} />
          <circle ref={outlineRef} />
          <circle ref={borderRef} />
          <circle ref={dotRef} />
        </g>
      )}
    </svg>
  );
};

export default Point;