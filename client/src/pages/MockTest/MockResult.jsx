import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MockResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { university, unit, questions, answers, duration } =
    location.state || {};

  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    if (!questions || !answers) {
      navigate("/mock"); // fallback
      return;
    }

    let correct = 0;
    questions.forEach((q) => {
      if (answers[q._id] && answers[q._id] === q.answer) {
        correct++;
      }
    });
    setCorrectCount(correct);
  }, [questions, answers, navigate]);

  const total = questions.length;
  const attempted = Object.keys(answers).length;
  const wrong = attempted - correctCount;
  const score = Math.round((correctCount / total) * 100);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-200 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 px-6 py-10">
      <div className="bg-white/30 dark:bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl max-w-xl w-full p-8">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-white drop-shadow-md text-center">
          🎯 ফলাফল
        </h1>

        <div className="bg-white/40 dark:bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 space-y-6 shadow-lg">
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            বিশ্ববিদ্যালয়:{" "}
            <span className="text-green-500 font-bold">
              {university.toUpperCase()}
            </span>
          </div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            ইউনিট:{" "}
            <span className="text-yellow-400 font-bold">
              {unit.toUpperCase()}
            </span>
          </div>

          <div className="text-2xl font-extrabold text-blue-500 text-center mt-4 drop-shadow-md">
            মোট স্কোর: {score}% ({correctCount} / {total})
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-green-700 bg-opacity-80 p-4 rounded-xl font-semibold text-white shadow-md">
              ✅ সঠিক: {correctCount}
            </div>
            <div className="bg-red-700 bg-opacity-80 p-4 rounded-xl font-semibold text-white shadow-md">
              ❌ ভুল: {wrong}
            </div>
            <div className="bg-indigo-700 bg-opacity-80 p-4 rounded-xl font-semibold text-white shadow-md">
              🧠 দিয়েছেন: {attempted}
            </div>
            <div className="bg-gray-700 bg-opacity-80 p-4 rounded-xl font-semibold text-white shadow-md">
              📝 মোট প্রশ্ন: {total}
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-6">
          <button
            onClick={() => navigate("/mock")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl font-semibold text-white shadow-lg transition"
          >
            🔁 আবার দিন
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-2xl font-semibold text-white shadow-lg transition"
          >
            🏠 হোম
          </button>
        </div>
      </div>
    </div>
  );
};

export default MockResult;
