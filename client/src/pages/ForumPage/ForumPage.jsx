import React, { useState } from "react";

const discussions = [
  {
    id: 1,
    user: "Rakib2004",
    chapter: "Physics – Motion in One Dimension",
    question: "Velocity ar speed er moddhe ashol difference ta ki?",
    replies: 3,
  },
  {
    id: 2,
    user: "Sumaiya05",
    chapter: "Biology – Cell",
    question: "Golgi body ar mitochondria ek sathe kaj kore ki?",
    replies: 1,
  },
  {
    id: 3,
    user: "NayeemX",
    chapter: "Chemistry – Periodic Table",
    question: "Keno atomic radius left to right komte thake?",
    replies: 5,
  },
];

const ForumPage = () => {
  const [newQuestion, setNewQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic here to push to backend
    console.log("New Discussion:", newQuestion);
    setNewQuestion("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f2937] to-[#0f172a] text-white px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-400 mb-8 drop-shadow">
        💬 Alochona Forum
      </h1>

      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-[#111827] p-6 rounded-xl shadow-md border border-indigo-800/30 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 text-indigo-300">
            🔥 Post a New Question
          </h2>
          <textarea
            rows="3"
            className="w-full rounded-lg bg-[#1e293b] text-white p-3 text-sm border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Ask your question here (e.g., 'What’s the easiest way to memorize physics formulas?')"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="mt-4 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-sm rounded-lg transition"
          >
            ➕ Post Question
          </button>
        </form>

        <div className="space-y-6">
          {discussions.map((item) => (
            <div
              key={item.id}
              className="bg-[#111827] p-5 rounded-lg border border-indigo-800/20 shadow-sm"
            >
              <p className="text-sm text-indigo-400 mb-1 font-medium">
                {item.chapter}
              </p>
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.question}
              </h3>
              <p className="text-xs text-gray-400">
                🧑‍🎓 Posted by <span className="text-blue-400">@{item.user}</span>{" "}
                · 💬 {item.replies} replies
              </p>
              <button className="mt-3 text-indigo-400 hover:underline text-sm">
                View Discussion →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
