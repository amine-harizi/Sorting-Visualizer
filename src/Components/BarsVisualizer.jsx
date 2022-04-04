import React, { createRef, useLayoutEffect, useRef } from "react";
const BarsVisualizer = ({ visualizationData, sortType }) => {
  let coeff = 0.5;
  const { data, currStep } = visualizationData;

  let { indexes, pointer, sortedItem } = data[currStep];

  const styleBox = (idx) => {
    let bg = "#1e2d43"; //normal;
    if (
      idx > pointer &&
      sortType.toLowerCase() !== "insertion" &&
      sortType.toLowerCase() !== "quick"
    )
      bg = "#7cc75d"; //in place

    if (currStep && indexes.split("/")[0] == idx) bg = "#ea4888"; // process

    if (currStep && indexes.split("/")[1] == idx) bg = "#e52532"; // process
    if (pointer < -1) bg = "#7cc75d"; //in place
    if (
      sortType.toLowerCase() === "insertion" &&
      data[currStep].currArray.indexOf(sortedItem) === idx
    )
      bg = "#7cc75d"; //in place
    if (sortType.toLowerCase() === "quick" && currStep === data.length - 1)
      bg = "#7cc75d"; //ended
    return bg;
  };

  return (
    <div className="bars-container">
      {/* <h3>Bars Visualizer</h3> */}
      <div className="bars-wrapper">
        {data[currStep].currArray.map((bar, idx) => (
          <div
            id={idx}
            key={idx}
            ref={createRef()}
            className="bar-item"
            style={{
              position: "relative",
              height: bar * coeff + "px",
              backgroundColor: styleBox(idx),
            }}
          >
            <span
              className="bar-des"
              style={{ position: "absolute", left: "25%", bottom: "-30px" }}
            >
              {bar}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarsVisualizer;
