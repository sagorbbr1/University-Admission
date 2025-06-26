import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MockConfig = () => {
  const navigate = useNavigate();

  // Match these param names with your route definition!
  const { university, unit } = useParams();

  const [questionCount, setQuestionCount] = useState(25);
  const [duration, setDuration] = useState(30); // minutes

  const handleStart = () => {
    if (!university || !unit) {
      alert("⚠️ বিশ্ববিদ্যালয় বা ইউনিট সিলেক্ট করা হয়নি");
      return;
    }
    if (duration <= 0) {
      alert("⏳ সময় অবশ্যই ১ এর বেশি হতে হবে");
      return;
    }
    // Send the expected keys downstream: university, unit, etc.
    navigate(`/mock/start/${university}/${unit}`, {
      state: { university, unit, questionCount, duration },
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">⚙️ কনফিগার করুন</h1>

      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md shadow-lg space-y-6">
        <div>
          <label className="block mb-2 font-semibold">প্রশ্নের সংখ্যা</label>
          <select
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            className="w-full p-3 rounded bg-gray-700 text-white"
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={-1}>সব প্রশ্ন</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">সময় (মিনিট)</label>
          <input
            type="number"
            min={1}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full p-3 rounded bg-gray-700 text-white"
          />
        </div>

        <button
          onClick={handleStart}
          className="w-full py-3 rounded bg-green-600 hover:bg-green-700 transition font-semibold"
        >
          ✅ মক টেস্ট শুরু করুন
        </button>
      </div>
    </div>
  );
};

export default MockConfig;
