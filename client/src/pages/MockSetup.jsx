import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const subjects = ["Physics", "Chemistry", "Biology", "Math"];

const MockSetup = () => {
  const { university } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ subject: "", chapter: "", duration: 10 });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ideally you should generate a mock ID and send to DB here
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
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          required
        >
          <option value="">বিষয় নির্বাচন করুন</option>
          {subjects.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>

        <input
          className="w-full p-2 rounded bg-gray-800"
          type="text"
          placeholder="অধ্যায় নম্বর"
          value={form.chapter}
          onChange={(e) => setForm({ ...form, chapter: e.target.value })}
          required
        />

        <input
          className="w-full p-2 rounded bg-gray-800"
          type="number"
          placeholder="সময় (মিনিটে)"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          required
        />

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
