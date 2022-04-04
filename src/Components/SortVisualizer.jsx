import React, { useState, useEffect } from "react";
import VisualizerControls from "./VisualizerControls";
import Sort from "../helper/Sort";
import ArrayVisualizer from "./ArrayVisualizer";
import BarsVisualizer from "./BarsVisualizer";

const SortVisualizer = ({ sortType, setShowMenu }) => {
  const arraySizes = [5, 6, 7, 8, 9, 10, 20, 30, 50, 120];
  const playbackSpeedChoices = [1, 2, 5, 10, 100];

  const [showVisualizer, setShowVisualizer] = useState(false);

  const [arrayInfos, setArrayInfos] = useState({
    size: arraySizes[0],
    values: Array.from({ length: arraySizes[0] }).map((_) =>
      Math.ceil(
        (((10 * Math.random() * Date.now() * Math.random()) % 1000) + 50) / 2
      )
    ),
  });

  //data returned from the sort class
  const [visualizationData, setVisualizationData] = useState({
    currStep: 0,
    data: [],
  });
  // for play button :
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  //handle Playing from the curr step [even if uses changes smth while playing => deps]
  useEffect(() => {
    let intr;
    if (
      isPlaying &&
      visualizationData.currStep <= visualizationData.data.length - 1
    ) {
      intr = setInterval(() => {
        handleVisBtnClick("next");
      }, 1000 / playbackSpeed);
    }

    return () => {
      clearInterval(intr);
    };
  }, [isPlaying, visualizationData.currStep]);

  // initial random values
  useEffect(() => {
    setArrayInfos({
      size: arraySizes[0],
      values: handleGenerateArrayValues(arraySizes[0]),
    });
  }, []);

  //change in controls : change in data
  useEffect(() => {
    setArrayInfos({
      ...arrayInfos,
      values: [...handleGenerateArrayValues(arrayInfos.size)],
    });
  }, [arrayInfos.size]);

  //hide the visualizer when data changes
  useEffect(() => {
    setShowVisualizer(false);
    setIsPlaying(false);
    setVisualizationData({
      currStep: 0,
      data: [],
    });
  }, [arrayInfos, sortType]);

  //functions that generates new Array random values
  const handleGenerateArrayValues = (len) => {
    const isSorted = (arr) => {
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) return false;
      }
      return true;
    };
    const newArrayVals = Array.from({ length: len }).map((_) =>
      Math.ceil(
        (((10 * Math.random() * Date.now() * Math.random()) % 1000) + 50) / 2
      )
    );

    if (isSorted(newArrayVals)) handleGenerateArrayValues(arrayInfos.size);
    return [...newArrayVals];
  };

  // change array values btn click handler
  const handleGenerateBtn = () => {
    setArrayInfos({
      ...arrayInfos,
      values: [...handleGenerateArrayValues(arrayInfos.size)],
    });
  };
  // handle the array size changes : generate new random array values base on new size
  const handleArraySizeChange = (e) => {
    console.log(e.target.value);
    setArrayInfos({
      size: Number(e.target.value),
      values: handleGenerateArrayValues(Number(e.target.value)),
    });
  };

  //sort btn handler : gets data and shows the visualizer
  const handleSort = () => {
    const currSort = new Sort(sortType, { ...arrayInfos });
    const data = currSort.getSortingData();
    data.unshift({
      currArray: [...arrayInfos.values],
      des: "Initial Array",
    });
    // get sorting steps data and sets the state
    setVisualizationData({
      data,
      currStep: 0,
    });

    //hide navbar
    setShowMenu(false);

    //stop playing
    setIsPlaying(false);

    //show the visualizer
    setShowVisualizer(true);

    const loc = document.getElementById("visualizer-main").offsetTop;
    window.scrollTo({
      top: loc + 20,
      left: 0,
      behavior: "smooth",
    });
  };

  // next / prev / play|pause btn click handler
  const handleVisBtnClick = (type) => {
    switch (type) {
      case "next":
        if (visualizationData.currStep + 1 < visualizationData.data.length)
          setVisualizationData((prev) => ({
            ...prev,
            currStep: prev.currStep + 1,
          }));
        else {
          setIsPlaying(false);
        }
        break;
      case "prev":
        if (visualizationData.currStep - 1 >= 0)
          setVisualizationData((prev) => ({
            ...prev,
            currStep: prev.currStep - 1,
          }));
        break;
      case "play":
        if (!isPlaying) setIsPlaying(true);
        else setIsPlaying(false);
        break;
      case "reset":
        setVisualizationData((prev) => ({ ...prev, currStep: 0 }));
        break;
    }
  };

  const handlePlaybackSpeedChange = (e) => {
    setPlaybackSpeed(Number(e.target.value));
  };

  const VisualizerControlsProps = {
    handleArraySizeChange,
    handleGenerateBtn,
    arrayInfos,
    arraySizes,
    handleSort,
    sortType,
  };
  return (
    <div>
      <VisualizerControls VisualizerControlsProps={VisualizerControlsProps} />

      <br />
      <hr />
      <br />

      <section id="visualizer-main" className="visualizer-main">
        {(showVisualizer && (
          <>
            {arrayInfos.size <= 10 && (
              <ArrayVisualizer
                sortType={sortType}
                visualizationData={visualizationData}
              />
            )}

            <BarsVisualizer
              sortType={sortType}
              visualizationData={visualizationData}
            />

            <div className="description">
              <h3>
                {
                  visualizationData.data[visualizationData.currStep].des.split(
                    "::"
                  )[0]
                }
              </h3>
              <p>
                {
                  visualizationData.data[visualizationData.currStep].des.split(
                    "::"
                  )[1]
                }
              </p>
            </div>
            <div className="steps-controls-container">
              <h5 id="steps">
                {visualizationData.currStep} /{" "}
                {visualizationData.data.length - 1}
              </h5>

              <button
                className="btn"
                title="reset"
                onClick={() => handleVisBtnClick("reset")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height={25}
                  width={25}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
              </button>

              <button
                className="btn"
                title="previous"
                id="prev-btn"
                onClick={() => handleVisBtnClick("prev")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height={25}
                  width={25}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                  />
                </svg>
              </button>

              <button
                className="btn"
                title={isPlaying ? "pause" : "play"}
                id="play-btn"
                onClick={() => handleVisBtnClick("play")}
              >
                {isPlaying ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height={25}
                    width={25}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height={25}
                    width={25}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </button>

              <button
                className="btn"
                title="next"
                id="next-btn"
                onClick={() => handleVisBtnClick("next")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height={25}
                  width={25}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>

              <div className="playback-wrapper">
                <select
                  disabled={isPlaying}
                  value={playbackSpeed}
                  onChange={handlePlaybackSpeedChange}
                  name="playback"
                  id="playback"
                >
                  {playbackSpeedChoices.map((op) => (
                    <option key={op} value={op}>
                      x{op}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )) || (
          <h3 style={{ marginTop: "22%" }}>
            Click the Sort button To start the visualization.
          </h3>
        )}
      </section>
    </div>
  );
};

export default SortVisualizer;
