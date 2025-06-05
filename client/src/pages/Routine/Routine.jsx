import React from "react";
import { Link } from "react-router-dom";

const days = [
  "রবিবার",
  "সোমবার",
  "মঙ্গলবার",
  "বুধবার",
  "বৃহস্পতিবার",
  "শুক্রবার",
  "শনিবার",
];

const dummyRoutine = {
  রবিবার: ["৮:০০ - গণিত", "১০:০০ - রসায়ন"],
  সোমবার: ["৯:০০ - পদার্থ", "১১:০০ - জীববিজ্ঞান"],
  মঙ্গলবার: ["৮:৩০ - ইংরেজি", "১০:৩০ - গণিত"],
  // Add more if needed
};

const Routine = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          📅 সাপ্তাহিক রুটিন
        </h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {days.map((day) => (
            <div
              key={day}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-3 text-blue-400">
                {day}
              </h2>
              <ul className="space-y-2 text-sm text-gray-300">
                {dummyRoutine[day]?.length > 0 ? (
                  dummyRoutine[day].map((task, i) => (
                    <li key={i} className="bg-gray-700 px-3 py-2 rounded">
                      {task}
                    </li>
                  ))
                ) : (
                  <li className="italic text-gray-500">
                    কোনো কাজ নির্ধারিত নেই
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/routine-dnd"
            className="text-blue-400 underline hover:text-blue-500"
          >
            ✏️ Edit today’s routine
          </Link>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
            ➕ নতুন রুটিন যোগ করো
          </button>
        </div>
      </div>
    </div>
  );
};

export default Routine;
