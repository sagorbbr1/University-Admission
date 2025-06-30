// DiscussionDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";

const DiscussionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [discussion, setDiscussion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchDiscussion = async () => {
    try {
      const res = await api.get(`/discussions/${id}`);
      setDiscussion(res.data);
    } catch (err) {
      console.error("❌ Failed to load discussion:", err);
      navigate("/forum");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscussion();
  }, [id]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    try {
      const res = await api.post(`/discussions/${id}/reply`, {
        user: user?.username || "Anonymous",
        text: replyText.trim(),
      });

      setDiscussion(res.data);
      setReplyText("");
    } catch (err) {
      console.error("❌ Failed to post reply:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen text-white text-center pt-20">
        Loading discussion...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#e1bee7] to-[#f3e5f5] text-gray-900 px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <button
          onClick={() => navigate("/forum")}
          className="text-sm text-purple-700 hover:underline"
        >
          ← Back to Forum
        </button>

        <div className="bg-white/30 backdrop-blur-md p-6 rounded-xl border border-purple-300 shadow-lg">
          <p className="text-sm text-purple-700 font-medium mb-2">
            Subject: {discussion.subject}
          </p>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {discussion.question}
          </h1>
          <p className="text-sm text-purple-800">
            🧑‍🎓 Posted by{" "}
            <span className="font-semibold">@{discussion.user}</span> ·{" "}
            {discussion.replies.length} replies
          </p>
        </div>

        <div className="bg-white/30 backdrop-blur-md p-5 rounded-xl border border-purple-300 shadow-md">
          <h2 className="text-lg font-semibold text-purple-700 mb-4">
            💬 Replies
          </h2>

          {discussion.replies.length === 0 ? (
            <p className="text-purple-600 italic">No replies yet.</p>
          ) : (
            <div className="space-y-4">
              {discussion.replies.map((reply, index) => (
                <div
                  key={index}
                  className="bg-white/20 backdrop-blur-sm p-4 rounded-lg border border-purple-300 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <p className="text-gray-900 text-sm">{reply.text}</p>
                  <p className="text-xs text-purple-600 mt-1">
                    — @{reply.user} ·{" "}
                    {new Date(reply.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <form
          onSubmit={handleReplySubmit}
          className="bg-white/30 backdrop-blur-md p-5 rounded-xl border border-purple-300 shadow-lg"
        >
          <h2 className="text-lg font-semibold text-purple-700 mb-3">
            ✍️ Add a Reply
          </h2>
          <textarea
            rows="3"
            className="w-full rounded-lg bg-white/40 text-gray-900 p-3 text-sm border border-purple-400 placeholder-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Write your reply here..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="mt-4 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-sm rounded-lg text-white transition-colors duration-300"
          >
            ➕ Post Reply
          </button>
        </form>
      </div>
    </div>
  );
};

export default DiscussionDetail;
