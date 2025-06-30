import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/api";

const MockResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const submittedRef = useRef(false);

  const [correctCount, setCorrectCount] = useState(0);
  const [resultId, setResultId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (submittedRef.current) return;
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
      } catch (err) {
        console.error("❌ Error saving result:", err);
      } finally {
        setLoading(false);
      }
    };

    submitResult();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg">⏳ ফলাফল লোড হচ্ছে...</div>
    );
  }

  const { university, unit, questions, answers } = location.state || {};
  const total = questions?.length || 0;
  const attempted = answers ? Object.keys(answers).length : 0;
  const wrong = attempted - correctCount;

  // 💥 Custom Scoring Rule
  const totalScore = (correctCount * 1 - wrong * 0.25).toFixed(2);

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-green-100 via-blue-200 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 bg-white/30 dark:bg-white/10 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl">
        {/* Left Block */}
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 drop-shadow-md">
            🎯 আপনার ফলাফল
          </h1>

          <div className="bg-white/40 dark:bg-white/20 p-6 rounded-xl shadow-md space-y-4">
            <div className="text-xl font-semibold text-gray-800 dark:text-white">
              বিশ্ববিদ্যালয়:{" "}
              <span className="text-green-500">
                {university?.toUpperCase()}
              </span>
            </div>
            <div className="text-xl font-semibold text-gray-800 dark:text-white">
              ইউনিট:{" "}
              <span className="text-yellow-400">{unit?.toUpperCase()}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-600 p-4 rounded-xl text-white font-semibold shadow-md text-center">
              ✅ সঠিক উত্তর: {correctCount}
            </div>
            <div className="bg-red-600 p-4 rounded-xl text-white font-semibold shadow-md text-center">
              ❌ ভুল উত্তর: {wrong}
            </div>
            <div className="bg-indigo-600 p-4 rounded-xl text-white font-semibold shadow-md text-center">
              🧠 দিয়েছেন: {attempted}
            </div>
            <div className="bg-gray-700 p-4 rounded-xl text-white font-semibold shadow-md text-center">
              📄 মোট প্রশ্ন: {total}
            </div>
          </div>
        </div>

        {/* Right Block */}
        <div className="flex flex-col justify-between space-y-8">
          <div className="bg-white/50 dark:bg-white/10 p-6 rounded-xl shadow-md text-center space-y-4">
            <h2 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 drop-shadow-md">
              🔢 স্কোর
            </h2>
            <p className="text-5xl font-bold text-green-600 dark:text-green-400">
              {totalScore} / {total}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              (সঠিকের জন্য +1, ভুলের জন্য -0.25 কাটা হয়েছে)
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("/mock")}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl text-white font-semibold shadow-md transition"
            >
              🔁 আবার দিন
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-2xl text-white font-semibold shadow-md transition"
            >
              🏠 হোম
            </button>
            {resultId && (
              <button
                onClick={() => navigate(`/student/results/${resultId}`)}
                className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-2xl text-white font-semibold shadow-md transition"
              >
                📊 ফল বিশ্লেষণ
              </button>
            )}
            <button
              onClick={() => navigate(`/leaderboard/${university}/${unit}`)}
              className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-2xl text-white font-semibold shadow-md transition"
            >
              🏆 লিডারবোর্ড
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockResult;
