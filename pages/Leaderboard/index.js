import Navbar from "../../components/Navbar";
import Leaderboard from "../../sections/Leaderboard";
import { useState } from "react";
import { app } from "../../config";
import { getDatabase, ref, child, get } from "firebase/database";

export default function Home() {
  const [data, setData] = useState([]);

  const dbRef = ref(getDatabase(app));
  useState(() => {
    get(child(dbRef, `/leaderboard`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  , []);

  

  return (
    <>
      <Navbar />
      <Leaderboard data={data} />
    </>
  );
}
