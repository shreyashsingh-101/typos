"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import randomWords from "random-words";
import { slideIn } from "../utils/motion";
import { useUser } from "../auth/useUser";
import { getDatabase, ref, child, push } from "firebase/database";

function uploadScore(score, id, name) {
  const dbRef = ref(getDatabase());
  push(child(dbRef, `/leaderboard`), {
    name: name,
    wpm: score,
    date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString() ,
  });
  push(child(dbRef, `/users/${id}/scores`), {
    wpm: score,
    date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString() ,
  });
}

const Hero = () => {
  const [text, setText] = useState("Click Start Test to begin");

  const { user } = useUser();
  let startTime = 60;
  const [timeRemaining, setTimeRemaining] = useState(startTime);
  const [score, setScore] = useState(0);
  const [isTestRunning, setIsTestRunning] = useState(false);

  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isTestRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((seconds) => seconds - 1);
      }, 1000);
    } else if (!isTestRunning && timeRemaining !== 0) {
      clearInterval(interval);
    }
    if (timeRemaining === 0) {
      setIsTestRunning(false);
      if (user) uploadScore(score, user.id, user.name);
    }
    return () => clearInterval(interval);
  }, [isTestRunning, timeRemaining]);

  function startTest() {
    setIsTestRunning(true);
    setText(randomWords({ min: 100, max: 200 }).join(" "));
    setTimeRemaining(startTime);
    setScore(0);
    setAccuracy(0);
    setTimeout(() => {
      document.querySelector(".editor").focus();
    }, 100);
    document.querySelectorAll(".letter").forEach((letter) => {
      letter.classList.remove("text-white");
      letter.classList.remove("text-red-500");
      if (letter.classList.contains("error")) {
        letter.remove();
      }
    });
  }

  function handleChange(event) {
    const { value } = event.target;

    let index = value.length - 1;
    let letter = value[index];
    let text_letters = document.querySelectorAll(".letter");

    if (letter !== " ") {
      if (event.nativeEvent.inputType === "deleteContentBackward") {
        text_letters[index + 1].classList.remove("text-white");
        if (text_letters[index + 1].classList.contains("error")) {
          text_letters[index + 1].remove();
        }
      } else if (letter === text_letters[index].innerText) {
        text_letters[index].classList.add("text-white");
      } else {
        text_letters[index].insertAdjacentHTML(
          "beforebegin",
          `<span class="letter text-red-500 error">${letter}</span>`
        );
        document.querySelectorAll(".error").forEach((error) => {
          error.classList.add("text-red-500");
        });
      }
    }

    if (letter === " ") {
      if (event.nativeEvent.inputType === "deleteContentBackward") {
        text_letters[index + 1].classList.remove("text-white");
        if (text_letters[index + 1].classList.contains("error")) {
          text_letters[index + 1].remove();
        }
      }
    }

    let typed_words = value.split(" ").length;

    let elapsed_time = startTime - timeRemaining;

    let correct_words = 0;

    for (let i = 0; i < typed_words; i++) {
      if (value.split(" ")[i] === text.split(" ")[i]) {
        correct_words++;
      }
    }
    let wpm = Math.floor((correct_words / elapsed_time) * 60);
    setAccuracy(Math.floor((correct_words / typed_words) * 100));

    setScore(wpm);
  }

  return (
    <motion.div
      variants={slideIn("right")}
      initial="hidden"
      whileInView="show"
      className={
        "m-auto mt-4 p-12  text-white w-[1200px] flex flex-col items-center justify-center text-3xl leading-[1.5] text-justify text-opacity-20 rounded-[50px]"
      }
    >
      <div className="mt-16 w-full flex justify-between text-center">
        <div className="w-full">Time remaining: {timeRemaining}</div>
        <div className="w-full">WPM: {score}</div>
        <div className="w-full">Accuracy: {accuracy}</div>
      </div>

      <div className="display mt-10 p-5 w-full h-[200px] bg-transparent border-none outline-none overflow-hidden resize-none text flex flex-wrap">
        {text.split(" ").map((word, index) => {
          return (
            <span key={index}>
              {word.split("").map((l, i) => {
                return (
                  <span className="letter" key={i}>
                    {l}
                  </span>
                );
              })}
              <span className="letter">&nbsp;</span>
            </span>
          );
        })}
      </div>

      {isTestRunning && (
        <textarea
          className="editor translate-y-[-200px]  p-5 pr-9 w-full h-[200px] bg-transparent border-none outline-none z-10 overflow-hidden resize-none text-transparent caret-white "
          onChange={handleChange}
          data-gramm_editor="false"
          data-gramm="false"
          data-enable-grammarly="false"
          spellCheck="false"
        />
      )}
      {!isTestRunning && (
        <button
          className="mt-10 p-5 text-xl text-white bg-[#6a3d94] rounded-xl cursor-pointer hover:bg-[#4e2d6d] "
          onClick={startTest}
        >
          Start Test
        </button>
      )}
    </motion.div>
  );
};

export default Hero;
