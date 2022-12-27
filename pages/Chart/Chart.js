import React, { useState, useEffect } from "react";
import CanvasJSReact from "./canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = ({ data }) => {
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    if (data)
      setDataPoints(
        Object.keys(data).map((key) => {
          return {
            label: data[key].date.split(" ")[0],
            time: data[key].date.split(" ")[1],
            y: data[key].wpm,
          };
        })
      );
  }, [data]);

  const options = {
    animationEnabled: true,
    theme: "dark2",
    backgroundColor: "#00000000",
    title: {
      text: "Previous Submissions",
      margin: 15,
    },
    axisY: {
      title: "Words per minute",
      prefix: "WPM: ",

    },
    axisX: {
      title: "Date",
      prefix: "D: ",
      interval : 2,
    },
    data: [
      {
        type: "line",
        color: "#00EE00",
        toolTipContent: "Time {time} : {y} WPM",
        dataPoints: dataPoints,
      },
    ],
  };
  return (
    <div>
      {dataPoints && dataPoints.length > 0 ? (
        <CanvasJSChart
          options={options}
        />
      ) : (
        <h1>No Data</h1>
      )}
    </div>
  );
};

export default Chart;
