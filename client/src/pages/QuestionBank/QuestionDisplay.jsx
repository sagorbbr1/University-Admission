import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import Spinner from "../../components/Spninner/Spinner";

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
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-200 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6 py-10 transition-colors duration-500">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white drop-shadow">
        📝 {unit} ({university}) - প্রশ্ন ও উত্তর {year}
      </h2>

      {loading && <Spinner />}
      {error && (
        <p className="text-center text-red-600 dark:text-red-400 font-semibold">
          ❌ {error}
        </p>
      )}
      {!loading && !error && questions.length === 0 && (
        <p className="text-center text-yellow-600 dark:text-yellow-400 font-semibold">
          😕 No questions found.
        </p>
      )}

      <div className="space-y-6 max-w-4xl mx-auto">
        {questions.map((q, i) => (
          <div
            key={i}
            className="bg-white/30 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-white text-lg">
              Q{i + 1}: {q.question}
            </h3>
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-300 mb-3 space-y-1">
              {q.options.map((opt, idx) => (
                <li key={idx}>{opt}</li>
              ))}
            </ul>
            <p className="text-green-500 font-semibold">
              ✔️ Correct Answer: {q.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionDisplay;
