import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const units = ["DU A Unit", "DU B Unit", "DU C Unit", "DU D Unit"];

const MockSetup = () => {
  const { university } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    unit: "",
    numQuestions: 20,
    duration: 20,
  });

  useEffect(() => {
    // Auto-set duration: 1 minute per question
    setForm((prev) => ({
      ...prev,
      duration: prev.numQuestions,
    }));
  }, [form.numQuestions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Later, pass form data to DB with mockId
    navigate(`/mock-exam/mock123`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        🎯 {university.toUpperCase()} মক টেস্ট সেটআপ
      </h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <select
          className="w-full p-2 rounded bg-gray-800"
          value={form.unit}
          onChange={(e) => setForm({ ...form, unit: e.target.value })}
          required
        >
          <option value="">ইউনিট নির্বাচন করুন</option>
          {units.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>

        <input
          className="w-full p-2 rounded bg-gray-800"
          type="number"
          placeholder="প্রশ্ন সংখ্যা"
          value={form.numQuestions}
          onChange={(e) =>
            setForm({ ...form, numQuestions: Number(e.target.value) })
          }
          required
          min={1}
        />

        <input
          className="w-full p-2 rounded bg-gray-700 text-gray-400 cursor-not-allowed"
          type="number"
          value={form.duration}
          readOnly
          disabled
        />
        <p className="text-sm text-gray-400">⏱️ সময়: {form.duration} মিনিট</p>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded"
        >
          ✅ মক টেস্ট শুরু করুন
        </button>
      </form>
    </div>
  );
};

export default MockSetup;
