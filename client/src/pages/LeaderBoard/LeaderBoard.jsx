import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";

const Leaderboard = () => {
  const { university, unit } = useParams();
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get(
          `/mock-test/leaderboard/${university}/${unit}`
        );
        if (res.ok && res.data?.data) {
          setLeaders(res.data.data);
        }
      } catch (err) {
        console.error("❌ Error loading leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [university, unit]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-200 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <p className="text-xl font-semibold text-gray-700 dark:text-white">
          ⏳ লোড হচ্ছে...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-blue-100 via-purple-200 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 drop-shadow-lg mb-10">
        🏆 লিডারবোর্ড: {university && university.toUpperCase()} (
        {unit && unit.toUpperCase()})
      </h1>

      <div className="max-w-3xl mx-auto space-y-4">
        {leaders.length === 0 ? (
          <div className="text-center text-gray-700 dark:text-gray-200 text-xl">
            😔 এখনও কেউ এই ইউনিটে মক টেস্ট দেয়নি।
          </div>
        ) : (
          leaders.map((entry, idx) => (
            <div
              key={entry._id}
              className="flex items-center justify-between bg-white/60 dark:bg-white/10 p-5 rounded-2xl shadow-md backdrop-blur-xl"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-300">
                  #{idx + 1}
                </span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {entry.userId?.name || "অজানা"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {entry.percentage || 0}% সঠিক | সময়:{" "}
                    {entry.timeTaken || "--"} মিনিট
                  </p>
                </div>
              </div>
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                ✅ {entry.correctCount}/{entry.totalQuestions}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
