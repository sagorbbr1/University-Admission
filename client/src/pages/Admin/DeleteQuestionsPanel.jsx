import React, { useEffect, useState } from "react";
import api from "../../utils/api"; // adjust path if needed

const DeleteQuestionsPanel = () => {
  const [universities, setUniversities] = useState([]);
  const [units, setUnits] = useState([]);
  const [years, setYears] = useState([]);

  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // Load universities
  useEffect(() => {
    const fetchUniversities = async () => {
      const { data } = await api.get("/questions/universities");
      if (data) setUniversities(data);
    };
    fetchUniversities();
  }, []);

  // Load units based on selected university
  useEffect(() => {
    if (!selectedUniversity) return;
    const fetchUnits = async () => {
      const { data } = await api.get(
        `/questions/units/${encodeURIComponent(selectedUniversity)}`
      );
      if (data) {
        setUnits(data);
        setSelectedUnit("");
        setYears([]);
        setSelectedYear("");
      }
    };
    fetchUnits();
  }, [selectedUniversity]);

  // Load years based on selected unit
  useEffect(() => {
    if (!selectedUniversity || !selectedUnit) return;
    const fetchYears = async () => {
      const { data } = await api.get(
        `/questions/years/${encodeURIComponent(
          selectedUniversity
        )}/${encodeURIComponent(selectedUnit)}`
      );
      if (data) {
        setYears(data);
        setSelectedYear("");
      }
    };
    fetchYears();
  }, [selectedUnit]);

  const handleDelete = async () => {
    if (!selectedUniversity || !selectedUnit || !selectedYear) {
      alert("⚠️ Please select university, unit and year.");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete all questions from ${selectedUniversity}, Unit-${selectedUnit}, Year ${selectedYear}?`
    );
    if (!confirmDelete) return;

    const payload = {
      university: selectedUniversity,
      unit: selectedUnit,
      year: selectedYear,
    };

    const { status, data } = await api.post(
      "/questions/delete-by-university-unit-year",
      payload
    );

    if (status === 200) {
      alert(data.message);
    } else {
      alert(data?.message || "❌ Deletion failed.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background: "linear-gradient(135deg, #bbf7d0, #bfdbfe, #e9d5ff)", // green to blue to purple
      }}
    >
      <div
        className="w-full max-w-md p-8 rounded-3xl shadow-2xl border"
        style={{
          background: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
        }}
      >
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          🗑️ Bulk Delete Questions
        </h2>

        {/* University */}
        <div className="mb-4">
          <label className="block font-medium mb-1">University</label>
          <select
            className="w-full border px-3 py-2 rounded bg-white/60 dark:bg-gray-800"
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}
          >
            <option value="">-- Select University --</option>
            {universities.map((uni) => (
              <option key={uni} value={uni}>
                {uni}
              </option>
            ))}
          </select>
        </div>

        {/* Unit */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Unit</label>
          <select
            className="w-full border px-3 py-2 rounded bg-white/60 dark:bg-gray-800"
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            disabled={!units.length}
          >
            <option value="">-- Select Unit --</option>
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div className="mb-6">
          <label className="block font-medium mb-1">Year</label>
          <select
            className="w-full border px-3 py-2 rounded bg-white/60 dark:bg-gray-800"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            disabled={!years.length}
          >
            <option value="">-- Select Year --</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
        >
          Delete Now
        </button>
      </div>
    </div>
  );
};

export default DeleteQuestionsPanel;
