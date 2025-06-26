import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api"; // Adjust the import path as necessary

const UnitSelect = () => {
  const { university } = useParams();
  const navigate = useNavigate();
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const res = await api.get(`/questions/units/${university}`);
        if (res.ok) {
          setUnits(res.data);
        } else {
          alert("❌ Couldn't fetch units");
        }
      } catch (err) {
        console.error("🚨 Error fetching units:", err);
        alert("❌ Error loading units");
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, [university]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        🧪 {university} ইউনিট নির্বাচন করুন
      </h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading units...</p>
      ) : units.length === 0 ? (
        <p className="text-center text-red-400">❌ কোনো ইউনিট পাওয়া যায়নি</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
          {units.map((unit, idx) => (
            <button
              key={idx}
              onClick={() =>
                navigate(
                  `/questionbank/${encodeURIComponent(
                    university
                  )}/${encodeURIComponent(unit)}`
                )
              }
              className="p-4 bg-gray-800 hover:bg-blue-600 rounded-lg shadow text-lg"
            >
              {unit}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UnitSelect;
