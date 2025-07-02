import React, { useEffect, useState, useRef } from "react";
import api from "../../utils/api";

const DailyChallenge = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [hasSubmittedBefore, setHasSubmittedBefore] = useState(false);
  const timerIdRef = useRef(null);

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  // Fetch challenge + user submission status
  useEffect(() => {
    const fetchChallengeAndStatus = async () => {
      try {
        const challengeRes = await api.get("/daily-challenge");
        const qList = challengeRes.data.questions || [];
        setQuestions(qList);
        setTimeLeft(qList.length * 60);

        // Fetch if user already submitted
        if (user?._id) {
          const statusRes = await api.get(
            `/daily-challenge/status?userId=${user._id}`
          );
          if (statusRes.data.hasSubmitted) {
            setHasSubmittedBefore(true);
            setSubmitted(true);
            setCorrectCount(statusRes.data.correctCount || 0);
            setAnswers(statusRes.data.answers || {}); // optional if you want to prefill
            setTimeLeft(0);
          }
        }
      } catch (err) {
        console.error("❌ Failed to load challenge or status:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChallengeAndStatus();
  }, [user?._id]);

  // Timer effect
  useEffect(() => {
    if (loading || submitted) return;
    if (timeLeft <= 0) {
      handleSubmit(true);
      return;
    }

    timerIdRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerIdRef.current);
  }, [timeLeft, loading, submitted]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSelect = (qId, option) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = async (auto = false) => {
    if (submitted) return;

    // Count how many answered questions
    const answeredCount = Object.values(answers).filter(
      (v) => v && v.trim() !== ""
    ).length;

    if (!auto && answeredCount !== questions.length) {
      alert(
        `🔔 You have answered ${answeredCount} out of ${questions.length} questions. Please answer all before submitting!`
      );
      return;
    }

    if (timerIdRef.current) clearInterval(timerIdRef.current);

    const formatted = questions.map((q) => ({
      questionId: q._id,
      selectedOption: answers[q._id] || "",
    }));

    try {
      const res = await api.post("/daily-challenge/submit", {
        userId: user?._id || "guest",
        answers: formatted,
      });
      setCorrectCount(res.data.correctCount || 0);
      setSubmitted(true);
      setTimeLeft(0);
    } catch (err) {
      console.error("❌ Submit error:", err);
      alert(err.response?.data?.message || "❌ Submission failed");
    }
  };

  if (loading)
    return (
      <div className="text-gray-800 dark:text-white text-center mt-20">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2f1] via-[#ede7f6] to-[#f3e5f5] px-4 py-10 text-gray-800">
      <div className="max-w-5xl mx-auto bg-white/30 backdrop-blur-md p-8 rounded-3xl border border-white/50 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            🌟 Daily Challenge
          </h1>
          <div className="text-right">
            <p className="text-sm font-semibold text-indigo-700">
              Time Left:{" "}
              <span className="text-pink-600">{formatTime(timeLeft)}</span>
            </p>
            <p className="text-xs text-gray-600">
              ({questions.length} mins total)
            </p>
          </div>
        </div>

        {hasSubmittedBefore && (
          <div className="mb-4 p-4 bg-green-100 text-green-900 rounded-lg border border-green-400 text-center font-semibold">
            ⚠️ You have already submitted today’s challenge. Results shown
            below.
          </div>
        )}

        {questions.length === 0 ? (
          <p className="text-center text-gray-600">
            No challenge available today.
          </p>
        ) : (
          <>
            {questions.map((q, i) => (
              <div
                key={q._id}
                className="mb-6 pb-4 border-b border-white/30"
                aria-disabled={submitted}
              >
                <p className="mb-2 font-medium">
                  {i + 1}. {q.question}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt) => (
                    <label
                      key={opt}
                      className={`cursor-pointer px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                        answers[q._id] === opt
                          ? "bg-purple-600 text-white border-purple-400"
                          : "bg-white/40 border-white/30 hover:bg-white/60"
                      } ${submitted ? "cursor-not-allowed opacity-60" : ""}`}
                    >
                      <input
                        type="radio"
                        name={`question-${q._id}`}
                        value={opt}
                        checked={answers[q._id] === opt}
                        onChange={() => handleSelect(q._id, opt)}
                        disabled={submitted}
                        className="hidden"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {!submitted ? (
              <button
                onClick={() => handleSubmit(false)}
                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-bold text-white shadow-lg disabled:opacity-50"
                disabled={submitted}
              >
                ✅ Submit All Answers
              </button>
            ) : (
              <div className="mt-8 text-center">
                <p className="text-green-600 text-xl font-bold">
                  🎉 You got {correctCount} / {questions.length} correct!
                </p>
                <p className="text-gray-700">
                  You answered{" "}
                  {
                    Object.values(answers).filter((a) => a && a.trim() !== "")
                      .length
                  }{" "}
                  questions.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DailyChallenge;
