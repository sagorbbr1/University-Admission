import React, { useEffect, useState } from "react";
import api from "../../utils/api";

const DailyChallengeSubmit = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // { questionId: selectedOption }
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await api.get("/daily-challenge");
        setQuestions(res.data.questions);
      } catch (err) {
        alert("Failed to load daily challenge");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleOptionChange = (qId, option) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions before submitting!");
      return;
    }
    try {
      const formattedAnswers = questions.map((q) => ({
        questionId: q._id,
        selectedOption: answers[q._id] || "",
      }));

      const res = await api.post("/daily-challenge/submit", {
        userId: user?._id,
        answers: formattedAnswers,
      });

      setCorrectCount(res.data.correctCount);
      setSubmitted(true);
    } catch (err) {
      alert(err.response?.data?.message || "Submission failed");
    }
  };

  if (loading)
    return <div className="text-white text-center mt-20">Loading...</div>;

  if (submitted)
    return (
      <div className="max-w-3xl mx-auto text-white p-6 bg-gray-900 rounded-lg mt-10">
        <h2 className="text-2xl font-bold mb-4">🎉 Challenge Submitted!</h2>
        <p>
          You answered {correctCount} out of {questions.length} questions
          correctly.
        </p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg mt-10 text-white">
      <h1 className="text-3xl font-bold mb-8 text-indigo-400 text-center">
        🌟 Daily Challenge
      </h1>
      {questions.map((q, idx) => (
        <div key={q._id} className="mb-6 border-b border-gray-700 pb-4">
          <p className="mb-2 font-semibold">
            {idx + 1}. {q.question}
          </p>
          <div className="flex flex-col gap-2">
            {q.options.map((opt) => (
              <label
                key={opt}
                className={`cursor-pointer rounded px-3 py-1 ${
                  answers[q._id] === opt ? "bg-indigo-600" : "bg-gray-800"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${q._id}`}
                  value={opt}
                  checked={answers[q._id] === opt}
                  onChange={() => handleOptionChange(q._id, opt)}
                  className="hidden"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded font-bold mt-4 transition"
      >
        Submit Answers
      </button>
    </div>
  );
};

export default DailyChallengeSubmit;
