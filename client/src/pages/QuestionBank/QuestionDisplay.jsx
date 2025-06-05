import { useParams } from "react-router-dom";
import { questionData } from "../../data/questionData";

const QuestionDisplay = () => {
  const { university, unit, year } = useParams();
  const questions = questionData[university]?.[unit]?.[year] || [];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        📝 {unit} ({university}) - প্রশ্ন ও উত্তর {year}
      </h2>
      {questions.map((q, i) => (
        <div key={i} className="mb-6 bg-gray-800 p-4 rounded shadow">
          <h3 className="font-semibold mb-2">
            Q{i + 1}: {q.question}
          </h3>
          <p className="text-green-400">✔️ Ans: {q.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default QuestionDisplay;
