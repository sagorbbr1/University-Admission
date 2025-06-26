import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/api";

const QuestionDisplay = () => {
  const { university, unit, year } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/questions/${university}/${unit}/${year}`);
        if (res.ok) {
          setQuestions(res.data || []);
        } else {
          setError(res.data?.message || "Failed to load questions.");
        }
      } catch (err) {
        console.error("🚨 Error fetching questions:", err);
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [university, unit, year]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        📝 {unit} ({university}) - প্রশ্ন ও উত্তর {year}
      </h2>

      {loading && (
        <p className="text-center text-gray-400">⏳ Loading questions...</p>
      )}
      {error && <p className="text-center text-red-500">❌ {error}</p>}

      {!loading && !error && questions.length === 0 && (
        <p className="text-center text-yellow-400">😕 No questions found.</p>
      )}

      <div className="space-y-6">
        {questions.map((q, i) => (
          <div key={i} className="bg-gray-800 p-4 rounded shadow">
            <h3 className="font-semibold mb-2">
              Q{i + 1}: {q.question}
            </h3>
            <ul className="list-disc list-inside text-sm text-gray-300 mb-2">
              {q.options.map((opt, idx) => (
                <li key={idx}>{opt}</li>
              ))}
            </ul>
            <p className="text-green-400">✔️ Correct Answer: {q.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionDisplay;
