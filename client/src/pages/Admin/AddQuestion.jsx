import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import api from "./../../utils/api.js";

const AddQuestion = () => {
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

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#e0f7fa] via-[#e1bee7] to-[#f3e5f5] text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-10 drop-shadow-lg animate-pulse">
          ⚙️ Admin Question Panel
        </h1>

        <div className="bg-white/30 backdrop-blur-xl rounded-3xl border border-white/40 shadow-xl p-10">
          <div className="flex items-center gap-3 mb-8">
            <PlusCircle className="text-cyan-700" size={28} />
            <h2 className="text-2xl font-bold text-cyan-700">
              Add Question Manually
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                name="university"
                placeholder="University"
                value={questionForm.university}
                onChange={handleChange}
                className="styled-input border-l-4 border-cyan-500"
                required
              />
              <input
                type="text"
                name="unit"
                placeholder="Unit"
                value={questionForm.unit}
                onChange={handleChange}
                className="styled-input border-l-4 border-cyan-500"
                required
              />
              <input
                type="text"
                name="year"
                placeholder="Year"
                value={questionForm.year}
                onChange={handleChange}
                className="styled-input border-l-4 border-cyan-500"
                required
              />
            </div>

            <textarea
              name="question"
              placeholder="Write the question here..."
              value={questionForm.question}
              onChange={handleChange}
              rows={4}
              className="styled-input border-l-4 border-blue-500"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {questionForm.options.map((opt, idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`Option ${idx + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  className="styled-input border-l-4 border-pink-500"
                  required
                />
              ))}
            </div>

            <input
              type="text"
              name="answer"
              placeholder="Correct Answer"
              value={questionForm.answer}
              onChange={handleChange}
              className="styled-input border-l-4 border-green-500"
              required
            />

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-semibold transition shadow-lg"
            >
              ✅ Submit Question
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
