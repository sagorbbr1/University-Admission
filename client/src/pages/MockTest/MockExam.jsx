import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const sampleQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: 2,
  },
  {
    question: "What is H2O?",
    options: ["Hydrogen", "Oxygen", "Water", "Salt"],
    answer: 2,
  },
];

const MockExam = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(600); // 10 minutes default
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate("/mock-result/mock123");
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  const handleSelect = (qIndex, optionIndex) => {
    setAnswers({ ...answers, [qIndex]: optionIndex });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">📝 মক টেস্ট</h1>
        <span className="text-red-400">
          ⏳ {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
        </span>
      </div>
      {sampleQuestions.map((q, idx) => (
        <div key={idx} className="mb-4 p-4 bg-gray-800 rounded">
          <p className="mb-2">
            {idx + 1}. {q.question}
          </p>
          <div className="space-y-1">
            {q.options.map((opt, i) => (
              <button
                key={i}
                className={`block w-full text-left px-4 py-2 rounded ${
                  answers[idx] === i ? "bg-blue-600" : "bg-gray-700"
                }`}
                onClick={() => handleSelect(idx, i)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={() => navigate("/mock-result/mock123")}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 p-2 rounded"
      >
        ✅ সাবমিট করুন
      </button>
    </div>
  );
};

export default MockExam;
