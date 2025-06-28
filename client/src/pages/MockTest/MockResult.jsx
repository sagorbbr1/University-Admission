import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/api";

const MockResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const submittedRef = useRef(false); // prevents double submit

  const [correctCount, setCorrectCount] = useState(0);
  const [resultId, setResultId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (submittedRef.current) return; // already submitted, skip
    submittedRef.current = true;

    const { university, unit, questions, answers } = location.state || {};

    if (!questions || !answers) {
      navigate("/mock");
      return;
    }

    let correct = 0;
    const answerDetails = [];

    questions.forEach((q) => {
      const selected = answers[q._id] || "";
      const isCorrect = selected === q.answer;

      if (isCorrect) correct++;

      answerDetails.push({
        questionId: q._id,
        selectedOption: selected,
        correctOption: q.answer,
        university,
        unit,
      });
    });

    setCorrectCount(correct);

    const submitResult = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await api.post("/mock-test/submit", {
          userId: user?._id,
          university,
          unit,
          answers: answerDetails,
        });

        setResultId(res.data.resultId);
        console.log("✅ Result submitted to DB:", res.data);
      } catch (err) {
        console.error("❌ Error saving result:", err);
      } finally {
        setLoading(false);
      }
    };

    submitResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  if (loading) {
    return <div className="text-center mt-10">Loading result...</div>;
  }

  const { university, unit, questions, answers } = location.state || {};
  const total = questions?.length || 0;
  const attempted = answers ? Object.keys(answers).length : 0;
  const wrong = attempted - correctCount;
  const score = total ? Math.round((correctCount / total) * 100) : 0;

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
              {university?.toUpperCase()}
            </span>
          </div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            ইউনিট:{" "}
            <span className="text-yellow-400 font-bold">
              {unit?.toUpperCase()}
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

        <div className="mt-10 flex justify-center gap-6 flex-wrap">
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
          {resultId && (
            <button
              onClick={() => navigate(`/student/results/${resultId}`)}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-2xl font-semibold text-white shadow-lg transition"
            >
              📊 ফল বিশ্লেষণ
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MockResult;
