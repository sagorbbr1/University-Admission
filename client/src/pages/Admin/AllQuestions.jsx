import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import Spinner from "../../components/Spinner/Spinner";

const QUESTIONS_PER_PAGE = 10;

const AllQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [units, setUnits] = useState([]);

  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editedAnswer, setEditedAnswer] = useState("");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await api.get("/admin/questions");
      setQuestions(res.data || []);

      const uniqueUnis = [...new Set(res.data.map((q) => q.university))];
      const uniqueUnits = [...new Set(res.data.map((q) => q.unit))];

      setUniversities(uniqueUnis);
      setUnits(uniqueUnits);
    } catch (err) {
      console.error("❌ Failed to fetch questions:", err);
    }
  };

  useEffect(() => {
    let filtered = questions;
    if (selectedUniversity) {
      filtered = filtered.filter((q) => q.university === selectedUniversity);
    }
    if (selectedUnit) {
      filtered = filtered.filter((q) => q.unit === selectedUnit);
    }
    setFilteredQuestions(filtered);
    setCurrentPage(1);
  }, [questions, selectedUniversity, selectedUnit]);

  const totalPages = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE);
  const paginatedQuestions = filteredQuestions.slice(
    (currentPage - 1) * QUESTIONS_PER_PAGE,
    currentPage * QUESTIONS_PER_PAGE
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?"))
      return;
    try {
      await api.delete(`/admin/questions/${id}`);
      setQuestions((prev) => prev.filter((q) => q._id !== id));
    } catch (err) {
      console.error("❌ Delete failed:", err);
    }
  };

  const handleEdit = (q) => {
    setEditingId(q._id);
    setEditedAnswer(q.answer);
  };

  const handleSave = async (q) => {
    try {
      const updated = { ...q, answer: editedAnswer };
      await api.put(`/admin/questions/${q._id}`, updated);
      setQuestions((prev) =>
        prev.map((item) => (item._id === q._id ? updated : item))
      );
      setEditingId(null);
    } catch (err) {
      console.error("❌ Edit failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] via-[#e3e8f0] to-[#f3e5f5] p-6 text-gray-900">
      <h1 className="text-4xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
        📋 All Questions
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <select
          value={selectedUniversity}
          onChange={(e) => setSelectedUniversity(e.target.value)}
          className="bg-white/80 border border-purple-300 px-4 py-2 rounded-xl shadow text-sm text-gray-800"
        >
          <option value="">🏛️ All Universities</option>
          {universities.map((uni) => (
            <option key={uni} value={uni}>
              {uni}
            </option>
          ))}
        </select>

        <select
          value={selectedUnit}
          onChange={(e) => setSelectedUnit(e.target.value)}
          className="bg-white/80 border border-purple-300 px-4 py-2 rounded-xl shadow text-sm text-gray-800"
        >
          <option value="">📚 All Units</option>
          {units.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {filteredQuestions.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <div className="overflow-x-auto rounded-3xl shadow-2xl backdrop-blur-lg bg-white/30 border border-white/40">
            <table className="w-full text-sm text-left text-gray-800">
              <thead className="bg-purple-200 text-purple-800">
                <tr>
                  <th className="p-4">Question</th>
                  <th className="p-4">Options</th>
                  <th className="p-4">Answer</th>
                  <th className="p-4">University</th>
                  <th className="p-4">Unit</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedQuestions.map((q) => (
                  <tr key={q._id} className="border-b border-gray-300">
                    <td className="p-4 max-w-[250px]">{q.question}</td>
                    <td className="p-4">
                      <ul className="space-y-1">
                        {q.options.map((opt, idx) => (
                          <li
                            key={idx}
                            className={`${
                              opt === q.answer
                                ? "text-green-600 font-semibold"
                                : ""
                            }`}
                          >
                            {idx + 1}. {opt}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-4">
                      {editingId === q._id ? (
                        <input
                          type="text"
                          value={editedAnswer}
                          onChange={(e) => setEditedAnswer(e.target.value)}
                          className="bg-white border border-purple-400 px-3 py-1 rounded-lg w-full"
                        />
                      ) : (
                        <span className="text-green-700 font-bold">
                          {q.answer}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-yellow-600">{q.university}</td>
                    <td className="p-4 text-pink-600">{q.unit}</td>
                    <td className="p-4 flex gap-2 flex-wrap">
                      {editingId === q._id ? (
                        <button
                          onClick={() => handleSave(q)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(q)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(q._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center items-center gap-4 text-sm">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="bg-white/70 px-4 py-2 rounded-lg border border-gray-300 text-gray-800 disabled:opacity-40"
            >
              ⏮️ Prev
            </button>
            <span className="px-4 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="bg-white/70 px-4 py-2 rounded-lg border border-gray-300 text-gray-800 disabled:opacity-40"
            >
              Next ⏭️
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllQuestions;
