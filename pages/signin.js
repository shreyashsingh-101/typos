import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { app } from "../config";

import { mapUserData } from "../auth/useUser";
import Image from "next/image";
import { useRouter } from "next/router";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const FirebaseAuth = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-[100vw] h-[100vh] items-center justify-center ">
      <h1 className="text-4xl font-bold text-center mb-10 text-white">
        Ty<span className="text-blue-800">pos</span>
      </h1>
      <h1 className="text-4xl font-bold text-center mb-10 text-white">
        Sign in to <span className="text-blue-800">Save Progress</span> <br />{" "}
      </h1>
      <div className="flex flex-col justify-center items-center border h-[450px] w-[350px] p-5">
        <button
          className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex"
          onClick={() =>
            signInWithPopup(auth, provider)
              .then()
              .then((result) => {
                const user = result.user;
                const userData = mapUserData(user);
                router.push("/Profile");
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential =
                  GoogleAuthProvider.credentialFromError(error);
              })
          }
        >
          <Image
            width={50}
            height={50}
            src="/google.svg"
            alt="google login"
            className="w-5 mr-3 mt-[2px]"
          />
          Sign In with Google
        </button>

        <button
          className="mt-16 bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex"
          onClick={() =>
            signInWithPopup(auth, githubProvider)
              .then()
              .then((result) => {
                const user = result.user;
                const userData = mapUserData(user);
                router.push("/Profile");
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential =
                  GithubAuthProvider.credentialFromError(error);
              })
          }
        >
          <Image
            width={50}
            height={50}
            src="/github.svg"
            alt="github login"
            className="w-5 mr-3 mt-[2px]"
          />
          Sign In with Github
        </button>
      </div>
    </div>
  );
};

export default FirebaseAuth;
