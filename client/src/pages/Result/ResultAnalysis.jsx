import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const subjectData = {
  labels: ["Physics", "Chemistry", "Biology", "Math"],
  datasets: [
    {
      label: "Accuracy (%)",
      data: [78, 60, 90, 55],
      backgroundColor: ["#6366f1", "#10b981", "#f59e0b", "#ef4444"],
      borderRadius: 6,
      borderSkipped: false,
    },
  ],
};

const pieData = {
  labels: ["Correct", "Wrong", "Skipped"],
  datasets: [
    {
      data: [50, 20, 10],
      backgroundColor: ["#10b981", "#ef4444", "#6b7280"],
      hoverOffset: 8,
    },
  ],
};

const ResultAnalysis = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1f2937] to-[#0f172a] text-white px-4 py-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg animate-pulse mb-14">
        📊 Result Analysis
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-indigo-800/40 hover:shadow-indigo-700/30 transition duration-300">
          <h2 className="text-xl font-semibold mb-4 text-indigo-300">
            📚 Subject-wise Accuracy
          </h2>
          <div className="p-2 bg-[#1e293b] rounded-xl shadow-inner">
            <Bar data={subjectData} />
          </div>
        </div>

        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-indigo-800/40 hover:shadow-indigo-700/30 transition duration-300">
          <h2 className="text-xl font-semibold mb-4 text-indigo-300">
            🎯 Overall Performance
          </h2>
          <div className="p-4 bg-[#1e293b] rounded-xl shadow-inner">
            <Pie data={pieData} />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-14 bg-[#111827] p-6 rounded-2xl border border-red-600/40 shadow-lg">
        <h3 className="text-2xl font-bold text-red-400 mb-4">
          ⚠️ Weak Chapters
        </h3>
        <ul className="space-y-2 text-gray-300 text-base pl-5 list-disc marker:text-red-400">
          <li>
            <span className="text-white">Physics:</span> Rotational Motion – 40%
          </li>
          <li>
            <span className="text-white">Math:</span> Trigonometry – 50%
          </li>
          <li>
            <span className="text-white">Chemistry:</span> Organic Naming – 30%
          </li>
        </ul>
        <p className="text-sm text-gray-400 mt-4 italic">
          💡 Hint: Practice these topics again to boost accuracy!
        </p>
      </div>
    </div>
  );
};

export default ResultAnalysis;
