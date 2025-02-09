import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./Button";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function ChocolateSurprise() {
  const { width, height } = useWindowSize();
  const [showMessage, setShowMessage] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [answers, setAnswers] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [showLoveLetter, setShowLoveLetter] = useState(false);

  const questions = [
    { id: 1, text: "What is my favorite chocolate?" },
    { id: 2, text: "Where did we first meet?" },
    { id: 3, text: "What is our favorite song?" }
  ];

  const handleAnswer = (id, answer) => {
    setAnswers({ ...answers, [id]: answer });
    const allAnswered = questions.every((q) => answers[q.id]);
    if (allAnswered) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  };

  useEffect(() => {
    const hearts = document.querySelectorAll(".floating-heart");
    hearts.forEach((heart, index) => {
      setTimeout(() => {
        heart.classList.add("animate");
      }, index * 500);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-200 p-4 text-center relative overflow-hidden">
      {showConfetti && <Confetti width={width} height={height} />}
      <motion.h1 
        className="text-4xl font-bold text-red-700"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Happy Chocolate Day, Roshni! 🍫❤️
      </motion.h1>
      <motion.div className="mt-6">
        <img src="/choco.png" alt="Chocolate" className="w-[300px] h-[100px]  rounded-lg shadow-lg" />
      </motion.div>
      <motion.div className="mt-6">
        <img src="/image.webp" alt="Us" className="w-[300px]  h-[300px]  rounded-lg shadow-lg" />
      </motion.div>
      <Button onClick={() => setShowMessage(true)} className="bg-brown-600 text-white px-4 mt-2 py-2 rounded-xl hover:bg-brown-800 mt-6">
        Tap for a Sweet Message 💝
      </Button>
      {showMessage && (
        <motion.p className="text-xl text-brown-900 mt-4 max-w-md" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
          "Roshni, you are sweeter than all the chocolates in the world! 🍫💕 Every moment with you is a treat."
        </motion.p>
      )}
      {showMessage && !showQuestions && (
        <Button onClick={() => setShowQuestions(true)} className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-800 mt-4">
          Answer Some Fun Questions! 🎉
        </Button>
      )}
      {showQuestions && (
        <div className="mt-6 space-y-4">
          {questions.map((q) => (
            <motion.div key={q.id} className="p-3 bg-white rounded-lg shadow-md">
              <p className="font-semibold text-gray-700">{q.text}</p>
              <input type="text" className="border p-2 rounded w-full mt-2" placeholder="Your answer..." value={answers[q.id] || ""} onChange={(e) => handleAnswer(q.id, e.target.value)} />
            </motion.div>
          ))}
        </div>
      )}
      {showQuestions && (
        <Button onClick={() => setShowLoveLetter(true)} className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-800 mt-6">
          💌 Open a Surprise Love Letter 💌
        </Button>
      )}
      {showLoveLetter && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-xl font-semibold text-red-600">Dear Roshni,</h2>
            <p className="text-md text-gray-700 mt-2">"From the moment we met, my life has been filled with sweetness. You are my joy and my forever love. Happy Chocolate Day! ❤️🍫"</p>
            <Button onClick={() => setShowLoveLetter(false)} className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-700 mt-4">
              Close
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
