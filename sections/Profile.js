import { motion } from "framer-motion";
import { useUser } from "../auth/useUser";
import { slideIn } from "../utils/motion";
import Image from "next/image";
import Graph from "../components/Graph";



const Profile = ({ email, name, image, data }) => {
  const { logout } = useUser();

  

  return (
    <motion.div>
      <motion.div
        variants={slideIn("right")}
        initial="hidden"
        whileInView="show"
        className="h-[250px] p-10 xl:mx-52 sm:mx-24 mx-4 mt-28 mb-14 rounded-xl bg-[#933a3a37] text-white flex justify-between items-center"
      >
        {/* Profile Image */}

        <div className="flex h-[110px] justify-center itmes-center">
          <div className="flex justify-center items-center h-[110px] rounded-full  border-4 border-white">
            <Image
              width={100}
              height={100}
              className="rounded-full"
              src={image ? image : "/google.svg"}
              alt="Profile Image"
            />
          </div>

          <div className="flex flex-col justify-center ml-5">
            <h1 className="text-2xl font-bold mt-2">{name}</h1>
            <p className="text-xl mt-2">{email}</p>
          </div>
        </div>

        <div className="flex flex-col justify-center min-w-[300px]">
          {/* Profile Stats */}
          <div className="flex flex-col items-stretch justify-center">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xl">Average WPM</p>
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {Object.values(data).length > 0  ? (
                    (Object.values(data).reduce((a, b) => a + b.wpm, 0) / Object.keys(data).length).toFixed(2)
                  ) : 0}
                </h1>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xl">Best WPM</p>
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  { Object.values(data).length > 0 ? Object.values(data).sort((a, b) => b.wpm - a.wpm)[0].wpm : 0}
                </h1>
              </div>
            </div>
          </div>

          {/* Profile Buttons */}

          <div className="flex items-center justify-center mt-10">
            <button
              onClick={() => logout()}
              className="bg-red-500 text-white px-5 py-2 rounded-sm hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </motion.div>

      {/* Last 5 wpms */}
      <motion.div
        variants={slideIn("right")}
        initial="hidden"
        whileInView="show"
        className="h-auto p-10 xl:mx-52 sm:mx-24 mx-4 my-10 rounded-xl bg-[#933a3a37] text-white flex justify-between items-center"
      >
        <div className="flex flex-col justify-center w-full">
          
          <div className="flex flex-col justify-center mt-10 w-full">
            <Graph data={data} />
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};

export default Profile;
