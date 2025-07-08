import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Spinner from "../../components/Spinner/Spinner";

const UnitSelect = () => {
  const { university } = useParams();
  const navigate = useNavigate();
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const res = await api.get(`/questions/units/${university}`);
        setUnits(res.data);
      } catch (err) {
        alert("❌ Failed to load units");
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, [university]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-200 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        🧪 {university} ইউনিট নির্বাচন করুন
      </h2>

      {loading ? (
        <Spinner />
      ) : units.length === 0 ? (
        <p className="text-center text-red-500 font-semibold">
          ❌ কোনো ইউনিট পাওয়া যায়নি
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-xl mx-auto">
          {units.map((unit, idx) => (
            <button
              key={idx}
              onClick={() =>
                navigate(
                  `/daily-challenge/${encodeURIComponent(
                    university
                  )}/${encodeURIComponent(unit)}`
                )
              }
              className="p-5 bg-white/30 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl text-lg font-semibold text-gray-900 dark:text-white hover:scale-105 transition-all"
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
