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
      backgroundColor: ["#4f46e5", "#10b981", "#f59e0b", "#ef4444"],
    },
  ],
};

const pieData = {
  labels: ["Correct", "Wrong", "Skipped"],
  datasets: [
    {
      data: [50, 20, 10],
      backgroundColor: ["#10b981", "#ef4444", "#9ca3af"],
      hoverOffset: 8,
    },
  ],
};

const ResultAnalysis = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f2937] to-[#0f172a] text-white px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-400 mb-10 drop-shadow">
        📊 Result Analysis
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="bg-[#111827] rounded-xl p-6 shadow-lg border border-indigo-800/30">
          <h2 className="text-xl font-semibold mb-4">Subject-wise Accuracy</h2>
          <Bar data={subjectData} />
        </div>

        <div className="bg-[#111827] rounded-xl p-6 shadow-lg border border-indigo-800/30">
          <h2 className="text-xl font-semibold mb-4">Overall Performance</h2>
          <Pie data={pieData} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-12 bg-[#111827] p-6 rounded-xl border border-indigo-800/30 shadow-md">
        <h3 className="text-xl font-semibold text-indigo-300 mb-4">
          ⚠️ Weak Chapters
        </h3>
        <ul className="space-y-2 list-disc list-inside text-sm text-gray-300">
          <li>Physics: Rotational Motion – 40% accuracy</li>
          <li>Math: Trigonometry – 50% accuracy</li>
          <li>Chemistry: Organic Naming – 30% accuracy</li>
        </ul>
        <p className="text-xs text-gray-400 mt-3">
          💡 Try questions again from these chapters!
        </p>
      </div>
    </div>
  );
};

export default ResultAnalysis;
