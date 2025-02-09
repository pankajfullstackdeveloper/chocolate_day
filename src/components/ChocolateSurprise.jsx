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

    // Check if all questions are answered
    const allAnswered = questions.every((q) => answers[q.id]);
    if (allAnswered) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000); // Stop confetti after 4 seconds
    }
  };

  useEffect(() => {
    // Start floating hearts animation
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

      {/* Floating hearts animation */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute floating-heart text-red-500 text-3xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: -300 }}
            transition={{ duration: 5, repeat: Infinity, delay: i * 0.5 }}
            style={{ left: `${Math.random() * 100}%` }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <motion.h1 
        className="text-4xl font-bold text-red-700"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Happy Chocolate Day, Roshni! 🍫❤️
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <img 
          src="/choco.png" 
          alt="Chocolate" 
          className="my-5 rounded-xl shadow-lg animate-bounce w-[300px] h-[100px]"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <img 
          src="/image.webp" 
          alt="Us" 
          className="my-5 rounded-xl shadow-lg w-[300px] h-[300px]"
        />
      </motion.div>

      {!showMessage ? (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button 
            onClick={() => setShowMessage(true)}
            className="bg-brown-600 text-white px-4 py-2 rounded-xl hover:bg-brown-800"
          >
            Tap for a Sweet Message 💝
          </Button>
        </motion.div>
      ) : (
        <motion.p 
          className="text-xl text-brown-900 mt-4 max-w-md"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          "Roshni, you are sweeter than all the chocolates in the world! 🍫💕
          Every moment with you is a treat, and I am so lucky to have you."
        </motion.p>
      )}

      {showMessage && !showQuestions && (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button 
            onClick={() => setShowQuestions(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-800 mt-4"
          >
            Answer Some Fun Questions! 🎉
          </Button>
        </motion.div>
      )}

      {showQuestions && (
        <div className="mt-6 space-y-4">
          {questions.map((q) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="p-3 bg-white rounded-lg shadow-md"
            >
              <p className="font-semibold text-gray-700">{q.text}</p>
              <input 
                type="text" 
                className="border p-2 rounded w-full mt-2" 
                placeholder="Your answer..."
                value={answers[q.id] || ""}
                onChange={(e) => handleAnswer(q.id, e.target.value)}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Surprise Love Letter */}
      {showQuestions && (
        <motion.div
          className="mt-8 cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowLoveLetter(true)}
        >
          <Button className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-800">
            💌 Open a Surprise Love Letter 💌
          </Button>
        </motion.div>
      )}

      {showLoveLetter && (
        <motion.div
          className="mt-6 p-4 bg-white rounded-lg shadow-lg w-3/4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-lg font-semibold text-red-600">Dear Roshni,</p>
          <p className="text-md text-gray-700">
            "From the moment we met, my life has been filled with sweetness. Every day with you is a celebration, and I can't wait to create even more memories together. You are my heart, my joy, and my forever love. Happy Chocolate Day, my love! ❤️🍫"
          </p>
        </motion.div>
      )}
    </div>
  );
}
