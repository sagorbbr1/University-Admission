import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import api from "../../utils/api";

ChartJS.register(ArcElement, Tooltip, Legend);

const ResultDetails = () => {
  const { resultId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await api.get(`/mock-test/${resultId}`);
        setResult(res.data);
      } catch (err) {
        console.error("Failed to fetch result details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [resultId]);

  if (loading)
    return (
      <div className="text-center mt-10 text-white">Loading result...</div>
    );
  if (!result)
    return (
      <div className="text-center mt-10 text-red-400">Result not found</div>
    );

  const pieData = {
    labels: ["Correct", "Wrong"],
    datasets: [
      {
        data: [result.correctCount, result.wrongCount],
        backgroundColor: ["#10b981", "#ef4444"],
        hoverOffset: 6,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center text-indigo-400 drop-shadow mb-10">
        📊 Individual Result Analysis
      </h1>

      <div className="max-w-4xl mx-auto bg-[#111827] p-6 rounded-2xl shadow-lg border border-indigo-600/40">
        <p className="text-lg mb-2">
          বিশ্ববিদ্যালয়:{" "}
          <span className="text-green-400 font-bold">{result.university}</span>
        </p>
        <p className="text-lg mb-4">
          ইউনিট:{" "}
          <span className="text-yellow-400 font-bold">{result.unit}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#1e293b] p-4 rounded-xl shadow-inner">
            <Pie data={pieData} />
          </div>

          <div className="flex flex-col justify-center items-center space-y-4 text-lg">
            <p>
              ✅ Correct:{" "}
              <span className="text-green-400 font-bold">
                {result.correctCount}
              </span>
            </p>
            <p>
              ❌ Wrong:{" "}
              <span className="text-red-400 font-bold">
                {result.wrongCount}
              </span>
            </p>
            <p>
              🧮 Total:{" "}
              <span className="text-blue-400 font-bold">
                {result.totalQuestions}
              </span>
            </p>
            <p>
              📅 Taken at:{" "}
              <span className="text-gray-400">
                {new Date(result.createdAt).toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDetails;
