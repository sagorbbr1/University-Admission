import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MockConfig = () => {
  const navigate = useNavigate();
  const { university, unit } = useParams();

  // Generate options: 5, 10, ..., 100
  const questionOptions = Array.from({ length: 20 }, (_, i) => (i + 1) * 5);

  const [questionCount, setQuestionCount] = useState(25);
  const [duration, setDuration] = useState(25);

  // Sync duration with questionCount automatically
  useEffect(() => {
    setDuration(questionCount);
  }, [questionCount]);

  const handleStart = () => {
    if (!university || !unit) {
      alert("⚠️ বিশ্ববিদ্যালয় বা ইউনিট সিলেক্ট করা হয়নি");
      return;
    }
    if (duration < 1) {
      alert("⏳ সময় অবশ্যই ১ মিনিট বা তার বেশি হতে হবে");
      return;
    }
    navigate(`/mock/start/${university}/${unit}`, {
      state: { university, unit, questionCount, duration },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#141e30] to-[#243b55] flex flex-col items-center pt-20 px-6 pb-10 text-white">
      <h1 className="text-4xl font-extrabold mb-10 drop-shadow-lg text-center">
        ⚙️ কনফিগার করুন
      </h1>

      <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl p-12 max-w-4xl w-full shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
        <div className="max-w-md mx-auto space-y-8 select-none">
          <div>
            <label className="block mb-3 text-lg font-semibold">
              প্রশ্নের সংখ্যা
            </label>
            <select
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="w-full p-4 rounded-3xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition"
            >
              {questionOptions.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-3 text-lg font-semibold">
              সময় (মিনিট)
            </label>
            <input
              type="number"
              value={duration}
              readOnly
              className="w-full p-4 rounded-3xl bg-gray-800 text-white border border-gray-700 cursor-not-allowed"
              title="সময় প্রশ্ন সংখ্যার সাথে স্বয়ংক্রিয় সামঞ্জস্যপূর্ণ"
            />
          </div>

          <button
            onClick={handleStart}
            className="w-full py-4 rounded-3xl bg-green-600 hover:bg-green-700 shadow-lg font-semibold transition"
          >
            ✅ মক টেস্ট শুরু করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default MockConfig;
