import React, { useState } from "react";
import { UploadCloud, PlusCircle } from "lucide-react";
import api from "./../../utils/api.js";

export default function AdminPanel() {
  const [showManualForm, setShowManualForm] = useState(false);
  const [questionForm, setQuestionForm] = useState({
    university: "",
    unit: "",
    year: "",
    question: "",
    options: ["", "", "", ""],
    answer: "",
  });

  const handleChange = (e) => {
    setQuestionForm({ ...questionForm, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...questionForm.options];
    updatedOptions[index] = value;
    setQuestionForm({ ...questionForm, options: updatedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/questions/add", questionForm);

      if (res.status === 201) {
        alert("✅ Question added successfully!");
        setQuestionForm({
          university: "",
          unit: "",
          year: "",
          question: "",
          options: ["", "", "", ""],
          answer: "",
        });
      } else {
        alert(`❌ Failed: ${res.data?.message || "Unknown error"}`);
      }
    } catch (err) {
      alert(`❌ ${err.response?.data?.message || "An error occurred."}`);
    }
  };

  const handleBulkUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/questions/bulk", formData, true);

      if (res.status === 200) {
        alert("📂 Bulk upload successful!");
      } else {
        alert(`❌ Bulk upload failed: ${res.data?.message || "Unknown error"}`);
      }
    } catch (err) {
      alert(`❌ ${err.response?.data?.message || "Bulk upload failed."}`);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-cyan-400 drop-shadow-lg">
          ⚙️ Admin Panel
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Manual Add */}
          <div className="bg-gray-800 rounded-2xl p-8 shadow-lg border border-cyan-600">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <PlusCircle size={28} className="text-cyan-400" />
              Add Question Manually
            </h2>
            <button
              onClick={() => setShowManualForm(!showManualForm)}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg font-semibold mb-6 transition"
              aria-expanded={showManualForm}
            >
              {showManualForm ? "Hide Form" : "Show Form"}
            </button>

            {showManualForm && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  name="university"
                  placeholder="University"
                  value={questionForm.university}
                  onChange={handleChange}
                  className="w-full rounded-md bg-gray-900 border border-gray-700 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                  required
                />
                <input
                  type="text"
                  name="unit"
                  placeholder="Unit"
                  value={questionForm.unit}
                  onChange={handleChange}
                  className="w-full rounded-md bg-gray-900 border border-gray-700 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                  required
                />
                <input
                  type="text"
                  name="year"
                  placeholder="Year"
                  value={questionForm.year}
                  onChange={handleChange}
                  className="w-full rounded-md bg-gray-900 border border-gray-700 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                  required
                />
                <textarea
                  name="question"
                  placeholder="Question"
                  value={questionForm.question}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-md bg-gray-900 border border-gray-700 px-4 py-3 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                  required
                />
                {questionForm.options.map((opt, idx) => (
                  <input
                    key={idx}
                    type="text"
                    placeholder={`Option ${idx + 1}`}
                    value={opt}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    className="w-full rounded-md bg-gray-900 border border-gray-700 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                    required
                  />
                ))}
                <input
                  type="text"
                  name="answer"
                  placeholder="Correct Answer"
                  value={questionForm.answer}
                  onChange={handleChange}
                  className="w-full rounded-md bg-gray-900 border border-gray-700 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
                >
                  Submit Question
                </button>
              </form>
            )}
          </div>

          {/* Bulk Upload */}
          <div className="bg-gray-800 rounded-2xl p-8 shadow-lg border border-cyan-600 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <UploadCloud size={28} className="text-cyan-400" />
              Bulk Upload Questions
            </h2>
            <p className="text-gray-400 mb-6">
              Upload a CSV or Excel file containing questions.
            </p>
            <label
              htmlFor="bulk-upload"
              className="cursor-pointer inline-flex items-center gap-3 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
            >
              Select File
              <input
                id="bulk-upload"
                type="file"
                className="hidden"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={handleBulkUpload}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
