import React from "react";

const notices = [
  {
    title: "📢 DU Admission Test Date Announced",
    content:
      "Dhaka University admission test will be held on 19th July. Admit cards will be available from 10th July.",
    date: "2025-06-03",
  },
  {
    title: "⚠️ Medical College Application Deadline",
    content:
      "Last date for online application is 15th June. No extension will be provided.",
    date: "2025-06-01",
  },
  {
    title: "📄 New Question Bank Uploaded",
    content:
      "BUET and RUET previous year questions have been added in the Question Bank section.",
    date: "2025-05-30",
  },
];

const Notice = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          📌 Latest Notices
        </h1>
        <div className="space-y-6">
          {notices.map((notice, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{notice.title}</h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {notice.date}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {notice.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notice;
