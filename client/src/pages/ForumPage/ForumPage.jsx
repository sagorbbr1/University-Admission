// ForumPage.jsx
import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

const ForumPage = () => {
  const [newQuestion, setNewQuestion] = useState("");
  const [subject, setSubject] = useState("");
  const [discussions, setDiscussions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const fetchDiscussions = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/discussions?page=${page}&limit=5`);
      setDiscussions(res.data.discussions);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch discussions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscussions();
  }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newQuestion.trim() || !subject.trim()) return;

    try {
      const res = await api.post("/discussions", {
        user: user?.username || "Anonymous",
        subject,
        question: newQuestion,
      });

      setNewQuestion("");
      setSubject("");
      fetchDiscussions();
    } catch (err) {
      console.error("Failed to post question:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#e1bee7] to-[#f3e5f5] text-gray-900 px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-purple-700 mb-8 drop-shadow-md">
        💬 Alochona Forum
      </h1>

      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-lg border border-purple-300 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 text-purple-700">
            🔥 Post a New Question
          </h2>

          <input
            type="text"
            placeholder="Subject (e.g., 'Physics - Motion')"
            className="w-full mb-3 p-3 text-sm rounded-lg bg-white/40 border border-purple-400 text-gray-900 placeholder-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />

          <textarea
            rows="3"
            className="w-full rounded-lg bg-white/40 text-gray-900 p-3 text-sm border border-purple-400 placeholder-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Ask your question here..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            required
          ></textarea>

          <button
            type="submit"
            className="mt-4 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-sm rounded-lg text-white transition-colors duration-300"
          >
            ➕ Post Question
          </button>
        </form>

        {loading ? (
          <div className="text-center text-purple-700/80">
            Loading discussions...
          </div>
        ) : discussions.length === 0 ? (
          <p className="text-center text-purple-500">No discussions yet.</p>
        ) : (
          <div className="space-y-6">
            {discussions.map((item) => (
              <div
                key={item._id}
                className="bg-white/30 backdrop-blur-md p-5 rounded-lg border border-purple-300 shadow-md hover:shadow-xl hover:border-purple-500 cursor-pointer transition-shadow duration-300"
                onClick={() => navigate(`/discussion/${item._id}`)}
              >
                <p className="text-sm text-purple-700 mb-1 font-medium">
                  {item.subject}
                </p>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.question}
                </h3>
                <p className="text-xs text-purple-600">
                  🧑‍🎓 Posted by{" "}
                  <span className="text-purple-800 font-semibold">
                    @{item.user}
                  </span>{" "}
                  · 💬 {item.replies?.length || 0} replies
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/discussion/${item._id}`);
                  }}
                  className="mt-3 text-purple-700 hover:underline text-sm"
                >
                  View Discussion →
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-purple-300 rounded disabled:opacity-40 hover:bg-purple-400 transition-colors duration-200"
          >
            ⬅️ Prev
          </button>
          <span className="text-gray-900 font-semibold">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-purple-300 rounded disabled:opacity-40 hover:bg-purple-400 transition-colors duration-200"
          >
            Next ➡️
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
