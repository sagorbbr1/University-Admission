import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/api";

const MockTest = () => {
  const { university: paramUniversity, unit: paramUnit } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const stateData = location.state || {};

  const university = (
    stateData.university ||
    paramUniversity ||
    ""
  ).toLowerCase();
  const unit = (stateData.unit || paramUnit || "").toLowerCase();
  const questionCount = stateData.questionCount || 25;
  const duration = stateData.duration || 30;

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (!university || !unit) {
          setError("⚠️ বিশ্ববিদ্যালয় বা ইউনিট সিলেক্ট করা হয়নি।");
          return;
        }

        const res = await api.get(`/questions/mock/${university}/${unit}`, {
          params: { limit: questionCount },
        });

        if (res.ok && Array.isArray(res.data) && res.data.length > 0) {
          setQuestions(res.data);
          setError("");
        } else {
          setError("❌ প্রশ্ন পাওয়া যায়নি।");
          setQuestions([]);
        }
      } catch (err) {
        setError("❌ প্রশ্ন লোড করতে সমস্যা হয়েছে");
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [university, unit, questionCount]);

  useEffect(() => {
    if (error) return; // don't start timer if error

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [error]);

  const handleOptionSelect = (qid, option) => {
    setAnswers((prev) => ({ ...prev, [qid]: option }));
  };

  const handleSubmit = () => {
    navigate("/mock/result/mock1", {
      state: {
        university,
        unit,
        questions,
        answers,
        duration,
      },
    });
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (loading)
    return (
      <div className="text-white text-center p-10 text-xl">
        ⏳ প্রশ্ন লোড হচ্ছে...
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center p-10 text-xl font-semibold">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📝 মক টেস্ট</h2>
        <div className="text-lg font-mono bg-red-600 px-4 py-2 rounded">
          ⏱️ {formatTime(timeLeft)}
        </div>
      </div>

      <div className="space-y-8">
        {questions.map((q, index) => (
          <div key={q._id} className="bg-gray-800 p-6 rounded-lg shadow">
            <p className="mb-4 font-semibold">
              {index + 1}. {q.question}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(q._id, opt)}
                  className={`py-2 px-4 rounded border transition-all ${
                    answers[q._id] === opt
                      ? "bg-green-600 border-green-500"
                      : "bg-gray-700 border-gray-600"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 py-3 px-6 rounded text-lg font-semibold"
        >
          ✅ সাবমিট করুন
        </button>
      </div>
    </div>
  );
};

export default MockTest;
