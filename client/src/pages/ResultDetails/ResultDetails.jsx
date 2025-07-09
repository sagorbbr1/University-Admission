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
      <div className="text-center mt-10 text-gray-800 font-medium">
        Loading result...
      </div>
    );
  if (!result)
    return (
      <div className="text-center mt-10 text-red-500 font-semibold">
        Result not found
      </div>
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
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#e1bee7] to-[#f3e5f5] px-4 py-12 text-gray-900">
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent mb-10 drop-shadow-md">
        📊 Individual Result Analysis
      </h1>

      <div className="max-w-4xl mx-auto rounded-3xl p-6 md:p-10 backdrop-blur-2xl bg-white/50 border border-white/30 shadow-2xl">
        <p className="text-lg mb-2 font-semibold">
          বিশ্ববিদ্যালয়:{" "}
          <span className="text-green-600">{result.university}</span>
        </p>
        <p className="text-lg mb-6 font-semibold">
          ইউনিট: <span className="text-yellow-600">{result.unit}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/30 backdrop-blur-xl rounded-xl p-6 border border-white/40 shadow-lg">
            <Pie data={pieData} />
          </div>

          <div className="flex flex-col justify-center items-start space-y-4 text-lg font-medium">
            <p>
              ✅ Correct:{" "}
              <span className="text-green-600 font-bold">
                {result.correctCount}
              </span>
            </p>
            <p>
              ❌ Wrong:{" "}
              <span className="text-red-500 font-bold">
                {result.wrongCount}
              </span>
            </p>
            <p>
              🧮 Total:{" "}
              <span className="text-blue-600 font-bold">
                {result.totalQuestions}
              </span>
            </p>
            <p>
              📅 Taken at:{" "}
              <span className="text-gray-700 font-semibold">
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
