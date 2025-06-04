import React, { useState } from "react";

const data = {
  "Dhaka University": {
    "Unit A": [
      { year: 2024, question: "What is the atomic number of carbon?" },
      { year: 2023, question: "Solve: ∫ x² dx." },
    ],
    "Unit B": [
      { year: 2024, question: "Who wrote 'Ekattorer Dinguli'?" },
      { year: 2023, question: "বাংলাদেশের স্বাধীনতা কবে?" },
    ],
  },
  BUET: {
    Engineering: [
      { year: 2024, question: "What is Ohm’s Law?" },
      { year: 2023, question: "Define entropy." },
    ],
  },
};

const QuestionBank = () => {
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");

  const universities = Object.keys(data);
  const units = selectedUniversity ? Object.keys(data[selectedUniversity]) : [];
  const questions =
    selectedUniversity && selectedUnit
      ? data[selectedUniversity][selectedUnit]
      : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          📚 Question Bank
        </h1>

        {/* University Select */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Select University:</label>
          <select
            value={selectedUniversity}
            onChange={(e) => {
              setSelectedUniversity(e.target.value);
              setSelectedUnit(""); // reset unit
            }}
            className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
          >
            <option value="">-- Select --</option>
            {universities.map((univ, i) => (
              <option key={i} value={univ}>
                {univ}
              </option>
            ))}
          </select>
        </div>

        {/* Unit Select */}
        {units.length > 0 && (
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Select Unit:</label>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
            >
              <option value="">-- Select --</option>
              {units.map((unit, i) => (
                <option key={i} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Questions Display */}
        {questions.length > 0 && (
          <div className="mt-6 space-y-4">
            <h2 className="text-xl font-bold">📖 Previous Year Questions</h2>
            {questions.map((q, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-4 rounded-lg shadow"
              >
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Year: {q.year}
                </div>
                <p className="text-md">{q.question}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionBank;
