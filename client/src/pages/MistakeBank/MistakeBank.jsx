import React, { useEffect, useState } from "react";
import api from "../../utils/api";

const MistakeBank = () => {
  const [mistakes, setMistakes] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?._id) return;

    const fetchMistakes = async () => {
      try {
        const res = await api.get(`/mock-test/mistakes/${user._id}`);
        setMistakes(res.data);
      } catch (err) {
        console.error("❌ Failed to load mistake bank:", err);
      }
    };

    fetchMistakes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#e1bee7] to-[#f3e5f5] px-4 py-12 text-gray-900">
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-14 animate-pulse drop-shadow-lg">
        ❌ Mistake Bank
      </h1>

      {mistakes.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No mistakes yet. You're flawless 🧠✨
        </p>
      ) : (
        <div className="space-y-10 max-w-6xl mx-auto">
          {mistakes.map((q, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_0_30px_rgba(0,0,0,0.05)] p-6 md:p-8 hover:shadow-[0_0_40px_rgba(0,0,0,0.1)] transition-all duration-300"
            >
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-pink-700">
                ❓ {q.question}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-red-100/60 backdrop-blur-sm border border-red-200 rounded-xl p-4 shadow-inner">
                  <p className="text-red-600 font-semibold">❌ Your Answer</p>
                  <p className="text-gray-900 text-lg">{q.selectedAnswer}</p>
                </div>
                <div className="bg-green-100/60 backdrop-blur-sm border border-green-200 rounded-xl p-4 shadow-inner">
                  <p className="text-green-600 font-semibold">
                    ✅ Correct Answer
                  </p>
                  <p className="text-gray-900 text-lg">{q.correctAnswer}</p>
                </div>
              </div>

              <div className="bg-purple-100/60 border-l-4 border-purple-400 backdrop-blur-md p-4 rounded-xl text-sm text-purple-700 italic">
                📘 Explanation:{" "}
                <span className="text-gray-900 font-medium">
                  {q.explanation}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MistakeBank;
