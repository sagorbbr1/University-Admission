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

    // 🧠 Calculate correct answers
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
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">🎯 ফলাফল</h1>

        <div className="bg-gray-800 rounded-xl p-6 space-y-4 shadow-lg">
          <div className="text-lg font-semibold">
            বিশ্ববিদ্যালয়:{" "}
            <span className="text-green-400">{university.toUpperCase()}</span>
          </div>
          <div className="text-lg font-semibold">
            ইউনিট: <span className="text-yellow-400">{unit.toUpperCase()}</span>
          </div>
          <div className="text-xl font-bold mt-4 text-blue-400">
            মোট স্কোর: {score}% ({correctCount} / {total})
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-green-700 p-4 rounded-xl font-semibold">
              ✅ সঠিক: {correctCount}
            </div>
            <div className="bg-red-700 p-4 rounded-xl font-semibold">
              ❌ ভুল: {wrong}
            </div>
            <div className="bg-indigo-700 p-4 rounded-xl font-semibold">
              🧠 দিয়েছেন: {attempted}
            </div>
            <div className="bg-gray-700 p-4 rounded-xl font-semibold">
              📝 মোট প্রশ্ন: {total}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate("/mock")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold"
          >
            🔁 আবার দিন
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded font-semibold"
          >
            🏠 হোম
          </button>
        </div>
      </div>
    </div>
  );
};

export default MockResult;
