import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { app } from "../config";

const auth = getAuth(app);

export const mapUserData = async (user) => {
  const { uid, email, displayName, photoURL } = await user;
  const token = await user.getIdToken(true);
  return {
    id: uid,
    email,
    token,
    name: displayName,
    image: photoURL,
  };
};

const useUser = () => {
  const [user, setUser] = useState();
  const router = useRouter();

  const logout = async () => {
    return auth
      .signOut()
      .then(() => {
        router.push("/");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    const cancelAuthListener = auth.onIdTokenChanged(async (userToken) => {
      if (userToken) {
        const userData = await mapUserData(userToken);
        setUser(userData);
      } else {
        setUser();
      }
    });

    
    return () => cancelAuthListener;
  }, []);

  return { user, logout };
};

export { useUser };
