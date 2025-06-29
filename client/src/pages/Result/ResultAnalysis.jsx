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
      <div className="text-center mt-10 text-white">
        📊 Loading result analysis...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1f2937] to-[#0f172a] text-white px-4 py-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg animate-pulse mb-14">
        📊 Performance Overview
      </h1>

      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-green-700/40">
          <h2 className="text-xl font-semibold mb-4 text-green-400">
            🎯 Accuracy Chart
          </h2>
          <div className="p-4 bg-[#1e293b] rounded-xl shadow-inner">
            <Pie data={pieData} />
          </div>
        </div>

        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-indigo-700/40 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-indigo-300 mb-4">
            📈 Summary
          </h2>
          <p className="text-lg text-white">
            ✅ Correct:{" "}
            <span className="text-green-400 font-bold">{correct}</span>
          </p>
          <p className="text-lg text-white">
            ❌ Wrong: <span className="text-red-400 font-bold">{wrong}</span>
          </p>
          <p className="text-lg text-white mt-4">
            🔢 Accuracy:{" "}
            <span className="text-blue-400 font-extrabold">{accuracy}%</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultAnalysis;
