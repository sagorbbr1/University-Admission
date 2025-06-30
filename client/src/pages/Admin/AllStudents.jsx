import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { saveAs } from "file-saver";

const STUDENTS_PER_PAGE = 10;

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [loading, setLoading] = useState(false);

  const fetchStudents = async (page = 1) => {
    setLoading(true);
    try {
      const res = await api.get(
        `/admin/students?page=${page}&limit=${STUDENTS_PER_PAGE}`
      );
      const { students = [], pagination = {} } = res.data.data || {};
      setStudents(students);
      setPagination(pagination);
    } catch (err) {
      console.error("❌ Failed to fetch students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(pagination.page);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("❗ Delete this student?")) return;
    try {
      await api.delete(`/admin/students/${id}`);
      fetchStudents(pagination.page);
    } catch (err) {
      console.error("❌ Delete failed:", err);
    }
  };

  const exportCSV = () => {
    const headers =
      "Name,Email,Phone,College,District,Correct,Wrong,Registered\n";
    const rows = students
      .map((s) =>
        [
          s.name,
          s.email,
          s.phone || "N/A",
          s.collegeName || "N/A",
          s.district || "N/A",
          s.correctCount || 0,
          s.wrongCount || 0,
          new Date(s.registeredAt).toLocaleDateString(),
        ].join(",")
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "students.csv");
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#f3e5f5] via-[#e1bee7] to-[#e0f7fa] text-gray-900">
      <h1 className="text-4xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        👥 All Students
      </h1>

      <div className="flex justify-end mb-6">
        <button
          onClick={exportCSV}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm"
        >
          📦 Export CSV
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : students.length === 0 ? (
        <p className="text-center text-gray-500">No students found.</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl shadow-xl bg-white/30 backdrop-blur-lg border border-white/40">
            <table className="w-full text-sm text-left text-gray-800">
              <thead className="bg-pink-200 text-pink-800">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">College</th>
                  <th className="p-4">District</th>
                  <th className="p-4">Correct</th>
                  <th className="p-4">Wrong</th>
                  <th className="p-4">Registered</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s._id} className="border-b border-gray-300">
                    <td className="p-4">{s.name}</td>
                    <td className="p-4">{s.email}</td>
                    <td className="p-4">{s.phone || "N/A"}</td>
                    <td className="p-4">{s.collegeName || "N/A"}</td>
                    <td className="p-4">{s.district || "N/A"}</td>
                    <td className="p-4 text-green-700">
                      {s.correctCount || 0}
                    </td>
                    <td className="p-4 text-red-600">{s.wrongCount || 0}</td>
                    <td className="p-4 text-gray-600">
                      {new Date(s.registeredAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(s._id)}
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

          <div className="mt-6 flex justify-center items-center gap-4 text-sm">
            <button
              disabled={pagination.page === 1}
              onClick={() => fetchStudents(pagination.page - 1)}
              className="bg-white/30 px-4 py-2 rounded border border-gray-400 text-gray-800 disabled:opacity-30"
            >
              ⏮️ Prev
            </button>
            <span>
              Page {pagination.page} of {pagination.pages}
            </span>
            <button
              disabled={pagination.page === pagination.pages}
              onClick={() => fetchStudents(pagination.page + 1)}
              className="bg-white/30 px-4 py-2 rounded border border-gray-400 text-gray-800 disabled:opacity-30"
            >
              Next ⏭️
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllStudents;
