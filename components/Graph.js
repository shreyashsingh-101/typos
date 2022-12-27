import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

const Graph = ({ data }) => {
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    if (data) {
      const dataPoints = Object.keys(data).map((item) => {
        return {
          date: data[item].date,
          wpm: data[item].wpm,
        };
      });
      setDataPoints(dataPoints);
    }
  }, [data]);

  return (
    <div className="w-full h-[400px] pr-10">
      {dataPoints.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dataPoints}
            height={200}
            width={500}
            className="w-full h-[200px]"
          >
            <Line type="monotone" dataKey="wpm" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis dataKey="wpm"/>
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-xl text-center">No data available</p>
      )}
    </div>
  );
};

export default Graph;
