import React from "react";
import { UploadCloud } from "lucide-react";
import api from "../../utils/api.js";

const BulkUpload = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#e1bee7] to-[#f3e5f5] px-6 py-12 flex items-center justify-center text-gray-800">
      <div className="max-w-3xl w-full bg-white/30 backdrop-blur-lg border border-white/40 shadow-2xl rounded-3xl p-10">
        <div className="flex items-center gap-3 mb-6">
          <UploadCloud size={30} className="text-cyan-700" />
          <h2 className="text-3xl font-bold text-cyan-700">
            Bulk Upload Questions
          </h2>
        </div>

        <p className="text-gray-700 mb-8">
          Upload a CSV or Excel file containing properly formatted question
          data.
        </p>

        <label
          htmlFor="bulk-upload"
          className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-semibold shadow-md transition cursor-pointer"
        >
          📁 Select File to Upload
          <input
            id="bulk-upload"
            type="file"
            className="hidden"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={handleBulkUpload}
          />
        </label>

        <p className="mt-6 text-sm text-gray-600 italic">
          ⚠️ Supported formats: .csv, .xlsx
        </p>
      </div>
    </div>
  );
};

export default BulkUpload;
