import React, { useEffect, useState } from "react";
import api from "../../utils/api";

const AdminNoticeManager = () => {
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await api.get("/notices");
      if (res.ok) setNotices(res.data);
    } catch (err) {
      console.error("❌ Error fetching notices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePublish = async () => {
    if (!form.title || !form.content) return alert("📌 শিরোনাম ও কন্টেন্ট দিন");

    try {
      const res = await api.post("/notices", {
        ...form,
        date: new Date().toISOString(),
      });

      if (res.data.success) {
        setForm({ title: "", content: "" });
        fetchNotices();
      }
    } catch (err) {
      console.error("❌ Failed to publish notice:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("🗑️ আপনি কি সত্যিই ডিলিট করতে চান?")) return;
    try {
      await api.delete(`/notices/${id}`);
      setNotices(notices.filter((n) => n._id !== id));
    } catch (err) {
      console.error("❌ Failed to delete:", err);
    }
  };

  return (
    <div
      className="min-h-screen p-8 text-gray-900 dark:text-gray-100"
      style={{
        background: "linear-gradient(135deg, #e0f7fa, #e1bee7, #f3e5f5)",
      }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700 dark:text-indigo-300">
        🧑‍💼 Admin Notice Manager
      </h1>

      {/* Form with glassy effect */}
      <div
        className="p-6 rounded-2xl shadow-md space-y-4 max-w-2xl mx-auto mb-10"
        style={{
          background: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
        }}
      >
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="📌 Notice Title"
          className="w-full p-3 rounded-xl border dark:border-gray-600 dark:bg-gray-700"
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="✍️ Notice Content"
          rows={4}
          className="w-full p-3 rounded-xl border dark:border-gray-600 dark:bg-gray-700"
        />
        <button
          onClick={handlePublish}
          className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl text-white font-semibold shadow-md transition"
        >
          ✅ Publish Notice
        </button>
      </div>

      {/* Notices list */}
      <div className="max-w-4xl mx-auto space-y-4">
        <h2 className="text-xl font-bold mb-2">📃 Published Notices</h2>
        {loading ? (
          <p>🔄 Loading...</p>
        ) : notices.length === 0 ? (
          <p className="text-gray-500">🚫 No notices published.</p>
        ) : (
          notices.map((notice) => (
            <div
              key={notice._id}
              className="p-5 rounded-xl shadow-md border"
              style={{
                background: "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                borderColor: "rgba(255, 255, 255, 0.4)",
              }}
            >
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-semibold">{notice.title}</h3>
                <span className="text-sm text-gray-500">
                  {new Date(notice.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {notice.content}
              </p>
              <div className="text-right mt-3">
                <button
                  onClick={() => handleDelete(notice._id)}
                  className="text-red-500 hover:text-red-600 text-sm"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminNoticeManager;
