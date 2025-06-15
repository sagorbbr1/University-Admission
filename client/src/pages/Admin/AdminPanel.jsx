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

      if (res.status === 200) {
        alert("✅ Question added successfully!");
        setQuestionForm({
          university: "",
          unit: "",
          sub: "",
          year: "",
          question: "",
          options: ["", "", "", ""],
          answer: "",
        });
      } else {
        alert(`❌ Failed: ${res.data?.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("🚨 Error adding question:", err);
      alert(`❌ ${err.response?.data?.message || "An error occurred."}`);
    }
  };

  const handleBulkUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/questions/bulk", formData);

      if (res.status === 200) {
        alert("📂 Bulk upload successful!");
      } else {
        alert(`❌ Bulk upload failed: ${res.data?.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("🚨 Error in bulk upload:", err);
      alert(`❌ ${err.response?.data?.message || "Bulk upload failed."}`);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">⚙️ Admin Panel</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Manual Add */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">➕ Add Question</h2>
            <button
              className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded mb-4 flex items-center gap-1"
              onClick={() => setShowManualForm(!showManualForm)}
            >
              <PlusCircle size={18} />
              {showManualForm ? "Hide Form" : "Add Manually"}
            </button>

            {showManualForm && (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  name="university"
                  placeholder="University"
                  onChange={handleChange}
                  className="input"
                />
                <input
                  type="text"
                  name="unit"
                  placeholder="Unit"
                  onChange={handleChange}
                  className="input"
                />
                <input
                  type="text"
                  name="sub"
                  placeholder="Sub"
                  onChange={handleChange}
                  className="input"
                />
                <input
                  type="text"
                  name="year"
                  placeholder="Year"
                  onChange={handleChange}
                  className="input"
                />
                <textarea
                  name="question"
                  placeholder="Question"
                  onChange={handleChange}
                  className="input"
                />
                {questionForm.options.map((opt, idx) => (
                  <input
                    key={idx}
                    type="text"
                    placeholder={`Option ${idx + 1}`}
                    value={opt}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    className="input"
                  />
                ))}
                <input
                  type="text"
                  name="answer"
                  placeholder="Correct Answer"
                  onChange={handleChange}
                  className="input"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </form>
            )}
          </div>

          {/* Bulk Upload */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">📂 Bulk Upload</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Upload a CSV or Excel file containing questions.
            </p>
            <label className="flex items-center gap-2 cursor-pointer bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
              <UploadCloud />
              <span>Select File</span>
              <input
                type="file"
                className="hidden"
                onChange={handleBulkUpload}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
