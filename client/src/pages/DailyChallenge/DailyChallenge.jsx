import React, { useState, useEffect } from "react";

const sampleChallenges = [
  {
    id: 1,
    title: "Physics Quick Quiz",
    questionsCount: 10,
    duration: 5,
    description:
      "Test your physics fundamentals with these quick 10 questions.",
  },
  {
    id: 2,
    title: "Chemistry Speed Round",
    questionsCount: 15,
    duration: 7,
    description: "Speed up your reaction with this fast chemistry challenge!",
  },
  {
    id: 3,
    title: "Math Sprint",
    questionsCount: 20,
    duration: 10,
    description: "Sharpen your math skills in 10 minutes flat.",
  },
];

const DailyChallenge = () => {
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    const todayChallenge =
      sampleChallenges[Math.floor(Math.random() * sampleChallenges.length)];
    setChallenge(todayChallenge);
  }, []);

  if (!challenge)
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-[#1f2937] to-[#111827]">
        Loading challenge...
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1f2937] to-[#111827] text-white px-4 py-10">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-400 drop-shadow">
        🔥 Daily Challenge
      </h1>

      <div className="w-full max-w-4xl mx-auto bg-[#1f2937] border border-indigo-500/20 rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold mb-4">{challenge.title}</h2>
        <p className="mb-6 text-gray-300">{challenge.description}</p>

        <div className="flex justify-between mb-6 text-gray-400">
          <span>Questions: {challenge.questionsCount}</span>
          <span>Duration: {challenge.duration} mins</span>
        </div>

        <button
          onClick={() => alert("Challenge launching soon...")}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition"
        >
          Start Challenge
        </button>
      </div>
    </div>
  );
};

export default DailyChallenge;
