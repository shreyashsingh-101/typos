import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";

const Leaderboard = ({ data }) => {
  data = Object.values(data).sort((a, b) => b.wpm - a.wpm);
  data = data.slice(0, 10);
  return (
    <motion.div
      variants={slideIn("right")}
      initial="hidden"
      whileInView="show"
      className="h-[500px] px-10 xl:mx-52 sm:mx-24 mx-4 my-28 rounded-xl bg-[#933a3a37] text-white flex items-center justify-center"
    >
      {/* Leaderboard Table */}

      <div className="flex flex-col w-[650px] h-[450px] overflow-auto">
        <table className="w-full text-center max-h-[400px]">
          <thead>
            <tr>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">WPM</th>
              <th className="px-4 py-2">Date/Time </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              Object.keys(data).map((key, index) => {
                return (
                  <tr key={key}>
                    <td className=" px-4 py-2">{index + 1}</td>
                    <td className=" px-4 py-2">{data[key].name}</td>
                    <td className=" px-4 py-2">{data[key].wpm}</td>
                    <td className=" px-4 py-2">{data[key].date}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Leaderboard;
