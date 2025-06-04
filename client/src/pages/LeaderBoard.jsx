import { useState } from "react";

const mockData = [
  { name: "Sagor Boss", score: 95, district: "Dhaka", batch: "2025" },
  { name: "Tanvir Ahmed", score: 90, district: "Rajshahi", batch: "2025" },
  { name: "Mim Akter", score: 88, district: "Chittagong", batch: "2024" },
];

const Leaderboard = () => {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? mockData
      : mockData.filter((entry) => entry.batch === filter);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold text-center mb-6">🏆 লিডারবোর্ড</h1>

      <div className="mb-4 text-center">
        <select
          className="p-2 rounded bg-gray-800"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">সব ব্যাচ</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
      </div>

      <div className="space-y-4 max-w-xl mx-auto">
        {filtered.map((user, i) => (
          <div
            key={i}
            className="bg-gray-800 p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-bold">
                {i + 1}. {user.name}
              </p>
              <p className="text-sm text-gray-400">
                {user.district} | ব্যাচ: {user.batch}
              </p>
            </div>
            <p className="text-xl font-bold text-yellow-400">{user.score} 🔥</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
