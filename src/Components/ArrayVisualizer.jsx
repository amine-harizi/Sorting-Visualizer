import React, { createRef } from "react";
const ArrayVisualizer = ({ visualizationData, sortType }) => {
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
    <div className="arrays-container">
      <div className="arrays-wrapper" style={{ width: "100%" }}>
        {data[currStep].currArray.map((item, id) => (
          <div
            style={{ backgroundColor: styleBox(id) }}
            key={id}
            id={id}
            ref={createRef()}
            className="size-box"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArrayVisualizer;
