import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Spinner from "../../components/Spninner/Spinner";

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
          setLoading(false);
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
    if (error) return;

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

  if (loading) return <Spinner />;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-200 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 px-6">
        <p className="text-red-600 dark:text-red-400 text-xl font-semibold text-center max-w-lg">
          {error}
        </p>
      </div>
    );

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-green-100 via-blue-200 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 pt-20 px-4">
      <div className="bg-white/30 dark:bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl max-w-4xl w-full p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white drop-shadow-sm">
            📝 মক টেস্ট
          </h2>
          <div className="text-lg font-mono bg-green-600 dark:bg-green-700 px-4 py-2 rounded-xl shadow-md text-white select-none">
            ⏱️ {formatTime(timeLeft)}
          </div>
        </div>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          {questions.map((q, index) => (
            <div
              key={q._id}
              className="bg-white/40 dark:bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-5 shadow-md"
            >
              <p className="mb-4 font-semibold text-gray-900 dark:text-white">
                {index + 1}. {q.question}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {q.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(q._id, opt)}
                    className={`py-2 px-4 rounded-lg border transition-colors font-medium text-gray-900 dark:text-white
                      ${
                        answers[q._id] === opt
                          ? "bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-500/70"
                          : "bg-white/60 border-white/50 hover:bg-white/80 dark:hover:bg-white/30 hover:shadow-md hover:shadow-white/40"
                      }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 transition rounded-xl font-semibold text-white shadow-lg"
          >
            ✅ সাবমিট করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default MockTest;
