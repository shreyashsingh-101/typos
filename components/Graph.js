import dynamic from "next/dynamic";

const Chart = dynamic(() => import("../pages/Chart/Chart.js"), { ssr: false });

const Graph = ({data}) => {
  return (
    <div 
    className="w-[80%] h-[450px] mx-auto"
    >
      <Chart data={data}/>
    </div>
  );
};

export default Graph;
