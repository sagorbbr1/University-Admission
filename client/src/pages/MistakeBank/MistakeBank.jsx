import React, { useEffect, useState } from "react";

// Dummy data for now, ideally fetched from backend
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
    // Normally fetch from backend: /api/mistakes
    setMistakes(mockMistakes);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1f2937] to-[#111827] px-4 py-10 text-white">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-400 mb-8 drop-shadow">
        ❌ Mistake Bank
      </h1>

      {mistakes.length === 0 ? (
        <p className="text-center text-gray-400">
          No mistakes yet. You're a genius 🧠✨
        </p>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {mistakes.map((q) => (
            <div
              key={q.id}
              className="p-6 rounded-xl border border-red-500/30 bg-[#111827] shadow-md"
            >
              <h2 className="text-lg font-semibold mb-3">{q.question}</h2>
              <ul className="mb-3 space-y-1 text-sm">
                {q.options.map((opt, idx) => (
                  <li
                    key={idx}
                    className={`px-3 py-2 rounded-lg ${
                      opt === q.correctAnswer
                        ? "bg-green-600 text-white"
                        : opt === q.selectedAnswer
                        ? "bg-red-600 text-white"
                        : "bg-gray-800 text-gray-300"
                    }`}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
              <p className="text-indigo-300 text-sm">
                📘 Explanation: {q.explanation}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MistakeBank;
