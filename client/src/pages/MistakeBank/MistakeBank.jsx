import React, { useEffect, useState } from "react";

// Dummy data (replace with backend API later)
const mockMistakes = [
  {
    id: 1,
    question: "What is the value of g on Earth?",
    options: ["9.8 m/s²", "10 m/s²", "9.6 m/s²", "9.2 m/s²"],
    selectedAnswer: "10 m/s²",
    correctAnswer: "9.8 m/s²",
    explanation: "Standard gravitational acceleration is 9.8 m/s² on Earth.",
  },
  {
    id: 2,
    question: "Who discovered Penicillin?",
    options: ["Marie Curie", "Alexander Fleming", "Newton", "Einstein"],
    selectedAnswer: "Marie Curie",
    correctAnswer: "Alexander Fleming",
    explanation: "Alexander Fleming discovered penicillin in 1928.",
  },
];

const MistakeBank = () => {
  const [mistakes, setMistakes] = useState([]);

  useEffect(() => {
    setMistakes(mockMistakes);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1f2937] to-[#111827] px-4 py-12 text-white">
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-red-400 via-pink-400 to-purple-500 bg-clip-text text-transparent mb-12 animate-pulse drop-shadow-md">
        ❌ Mistake Bank
      </h1>

      {mistakes.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          No mistakes yet. You're flawless 🧠✨
        </p>
      ) : (
        <div className="space-y-8 max-w-5xl mx-auto">
          {mistakes.map((q) => (
            <div
              key={q.id}
              className="bg-[#1e293b] border border-red-500/40 rounded-2xl p-6 shadow-lg transition hover:shadow-red-500/20"
            >
              <h2 className="text-xl font-bold mb-4 text-red-300">
                {q.question}
              </h2>

              <ul className="space-y-2 mb-4">
                {q.options.map((opt, idx) => {
                  let classes = "px-4 py-2 rounded-lg transition-all";

                  if (opt === q.correctAnswer) {
                    classes +=
                      " bg-green-700 text-white border border-green-500";
                  } else if (opt === q.selectedAnswer) {
                    classes += " bg-red-700 text-white border border-red-500";
                  } else {
                    classes += " bg-gray-800 text-gray-300";
                  }

                  return (
                    <li key={idx} className={classes}>
                      {opt}
                    </li>
                  );
                })}
              </ul>

              <div className="text-sm text-cyan-300 italic border-l-4 border-cyan-500 pl-4">
                📘 Explanation:{" "}
                <span className="text-white">{q.explanation}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MistakeBank;
