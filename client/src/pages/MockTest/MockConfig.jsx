import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MockConfig = () => {
  const navigate = useNavigate();
  const { university, unit } = useParams();

  const questionOptions = Array.from({ length: 20 }, (_, i) => (i + 1) * 5);
  const [questionCount, setQuestionCount] = useState(25);
  const [duration, setDuration] = useState(25);

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
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#e1bee7] to-[#f3e5f5] flex flex-col items-center pt-20 px-6 pb-10 text-gray-800">
      <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-transparent bg-clip-text drop-shadow-lg">
        ⚙️ মক টেস্ট কনফিগার করুন
      </h1>

      <div className="bg-white/30 backdrop-blur-2xl border border-white/40 rounded-3xl p-10 max-w-2xl w-full shadow-2xl">
        <div className="space-y-8">
          <div>
            <label className="block mb-3 text-lg font-semibold text-gray-700">
              প্রশ্নের সংখ্যা
            </label>
            <select
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="w-full p-4 rounded-2xl bg-white/40 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-inner backdrop-blur-md"
            >
              {questionOptions.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-3 text-lg font-semibold text-gray-700">
              সময় (মিনিট)
            </label>
            <input
              type="number"
              value={duration}
              readOnly
              className="w-full p-4 rounded-2xl bg-white/30 text-gray-800 border border-gray-300 cursor-not-allowed shadow-inner backdrop-blur-md"
              title="সময় প্রশ্ন সংখ্যার সাথে স্বয়ংক্রিয় সামঞ্জস্যপূর্ণ"
            />
          </div>

          <button
            onClick={handleStart}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-400 to-green-600 text-white font-bold shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-300"
          >
            ✅ মক টেস্ট শুরু করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default MockConfig;
