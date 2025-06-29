import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import api from "../../utils/api";

ChartJS.register(ArcElement, Tooltip, Legend);

const ResultAnalysis = () => {
  const [pieData, setPieData] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBasicStats = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await api.get(`/mock-test/analysis/${user?._id}`);

        const { correct, wrong } = res.data;
        const total = correct + wrong;
        const acc = total > 0 ? Math.round((correct / total) * 100) : 0;

        setCorrect(correct);
        setWrong(wrong);
        setAccuracy(acc);

        setPieData({
          labels: ["Correct", "Wrong"],
          datasets: [
            {
              data: [correct, wrong],
              backgroundColor: ["#10b981", "#ef4444"],
              hoverOffset: 8,
            },
          ],
        });
      } catch (err) {
        console.error("❌ Failed to load analysis:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBasicStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-800 font-semibold">
        📊 Loading result analysis...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#e1bee7] to-[#f3e5f5] px-4 py-10 text-gray-800">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg animate-pulse mb-14">
        📊 Performance Overview
      </h1>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/30 backdrop-blur-xl border border-green-400/40 rounded-3xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-green-700">
            🎯 Accuracy Chart
          </h2>
          <div className="p-4 bg-white/20 rounded-2xl shadow-inner">
            <Pie data={pieData} />
          </div>
        </div>

        <div className="bg-white/30 backdrop-blur-xl border border-indigo-400/40 rounded-3xl p-6 shadow-xl flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            📈 Summary
          </h2>
          <p className="text-lg">
            ✅ Correct:{" "}
            <span className="text-green-600 font-bold">{correct}</span>
          </p>
          <p className="text-lg">
            ❌ Wrong: <span className="text-red-600 font-bold">{wrong}</span>
          </p>
          <p className="text-lg mt-4">
            🔢 Accuracy:{" "}
            <span className="text-blue-700 font-extrabold">{accuracy}%</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultAnalysis;
