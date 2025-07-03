import React, { useEffect, useState, useRef } from "react";
import api from "../../utils/api";
import { useParams } from "react-router";

const DailyChallenge = () => {
  const { university, unit } = useParams();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerIdRef = useRef(null);
  const [hasSubmittedBefore, setHasSubmittedBefore] = useState(false);

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (user?._id) {
          const statusRes = await api.get(
            `/daily-challenge/status?userId=${
              user._id
            }&university=${encodeURIComponent(
              university
            )}&unit=${encodeURIComponent(unit)}`
          );

          if (statusRes.data.hasSubmitted) {
            setHasSubmittedBefore(true);
            setSubmitted(true);
            setCorrectCount(statusRes.data.correctCount);
            setAnswers(
              statusRes.data.answers.reduce((acc, cur) => {
                acc[cur.questionId] = cur.selectedOption;
                return acc;
              }, {})
            );
            setTimeLeft(0);
            setQuestions(statusRes.data.questions || []);
            setLoading(false);
            return;
          }
        }

        const challengeRes = await api.get(
          `/daily-challenge?university=${encodeURIComponent(
            university
          )}&unit=${encodeURIComponent(unit)}`
        );

        const qList = Array.isArray(challengeRes?.data?.questions)
          ? challengeRes.data.questions
          : [];

        setQuestions(qList);
        setTimeLeft(qList.length > 0 ? qList.length * 60 : 0);
        setLoading(false);
      } catch (error) {
        console.error("❌ Daily challenge fetch failed:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user?._id, university, unit]);

  useEffect(() => {
    if (loading || submitted) return;

    if (questions.length === 0) {
      setTimeLeft(0);
      return;
    }

    timerIdRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerIdRef.current);
          handleSubmit(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerIdRef.current);
  }, [timeLeft, loading, submitted, questions.length]);

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

    const answeredCount = Object.values(answers).filter(
      (v) => v && v.trim() !== ""
    ).length;

    if (!auto && answeredCount !== questions.length) {
      alert(
        `🔔 You answered ${answeredCount} out of ${questions.length} questions. Please answer all before submitting!`
      );
      return;
    }

    if (timerIdRef.current) clearInterval(timerIdRef.current);

    const formattedAnswers = questions.map((q) => ({
      questionId: q._id,
      selectedOption: answers[q._id] || "",
    }));

    try {
      const res = await api.post("/daily-challenge/submit", {
        userId: user?._id,
        university,
        unit,
        answers: formattedAnswers,
      });
      setCorrectCount(res.data.correctCount);
      setSubmitted(true);
      setTimeLeft(0);
    } catch (err) {
      console.error("❌ Submit error:", err);
      alert(err.response?.data?.message || "❌ Submission failed");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-800 dark:text-white">
        Loading...
      </div>
    );

  if (hasSubmittedBefore)
    return (
      <div className="max-w-4xl mx-auto p-6 bg-green-100 dark:bg-green-900 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-800 dark:text-green-200">
          ⚠️ You have already submitted today’s challenge.
        </h2>
        <p className="mb-4">
          Your score:{" "}
          <span className="font-semibold text-indigo-700 dark:text-indigo-400">
            {correctCount} / {questions.length}
          </span>
        </p>
        <div className="text-left max-h-[400px] overflow-y-auto bg-white dark:bg-gray-800 p-4 rounded-md shadow-inner">
          {questions.map((q, i) => (
            <div key={q._id} className="mb-4">
              <p className="font-semibold">
                {i + 1}. {q.question}
              </p>
              <p>
                Your answer:{" "}
                <span
                  className={`font-semibold ${
                    (answers[q._id] || "") === q.answer
                      ? "text-green-600"
                      : "text-red-600 line-through"
                  }`}
                >
                  {answers[q._id] || "No answer"}
                </span>
              </p>
              {(!answers[q._id] || answers[q._id] !== q.answer) && (
                <p className="text-green-600">
                  Correct answer: <strong>{q.answer}</strong>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto bg-white/30 backdrop-blur-md p-8 rounded-3xl border border-white/50 shadow-2xl">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          🌟 Daily Challenge ({university} - {unit})
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
  );
};

export default DailyChallenge;
