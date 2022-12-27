import Navbar from "../../components/Navbar";
import Profile from "../../sections/Profile";
import withAuth from "../../auth/withAuth";
import { useUser } from "../../auth/useUser";
import { getDatabase, ref, child, get } from "firebase/database";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const { user } = useUser();
  const [data, setData] = useState([]);

  const dbRef = ref(getDatabase());

  useEffect(() => {
    if(user)
    get(child(dbRef, `/users/${user.id}/scores`))
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
  , [user]);


  return (
    <>
      <Navbar />
      <Profile email={user?.email} name={user?.name} image={user?.image} data={data}/>
    </>
  );
};

export default withAuth(Home);
