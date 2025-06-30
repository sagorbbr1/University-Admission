import React, { useEffect, useState } from "react";
import api from "../../utils/api";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/notices");
        if (res.ok) {
          setNotices(res.data);
        } else {
          console.error("⚠️ Notice fetch failed");
        }
      } catch (err) {
        console.error("❌ Error loading notices:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600 dark:text-gray-300">
        🔄 Loading latest notices...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#e1bee7] to-[#f3e5f5] px-4 py-10 text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-pink-500 via-blue-400 to-purple-500 bg-clip-text text-transparent">
          📌 Latest Notices
        </h1>

        {notices.length === 0 ? (
          <p className="text-center text-gray-500">🚫 No notices found.</p>
        ) : (
          <div className="space-y-6">
            {notices.map((notice, index) => (
              <div
                key={notice._id || index}
                className="bg-white/30 backdrop-blur-lg border border-white/40 shadow-md rounded-2xl p-6 transition hover:shadow-xl"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-semibold text-indigo-800">
                    {notice.title}
                  </h2>
                  <span className="text-sm text-gray-700">
                    {new Date(notice.date).toLocaleDateString("en-GB")}
                  </span>
                </div>
                <p className="text-gray-800">{notice.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notice;
