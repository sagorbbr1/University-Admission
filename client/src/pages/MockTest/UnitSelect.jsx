import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import Spinner from "../../components/Spninner/Spinner";

const UnitSelect = () => {
  const navigate = useNavigate();
  const { university } = useParams();
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

  const handleSelect = (unit) => {
    navigate(
      `/mock/configure/${encodeURIComponent(university)}/${encodeURIComponent(
        unit
      )}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-blue-300 to-purple-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-10 drop-shadow-lg">
          🧩 ইউনিট নির্বাচন করুন
        </h1>

        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {units.map((unit) => (
              <div
                key={unit}
                onClick={() => handleSelect(unit)}
                className="cursor-pointer bg-white/20 dark:bg-white/10 backdrop-blur-lg border border-white/30 dark:border-white/20 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition transform hover:scale-105 select-none text-gray-900 dark:text-gray-100 font-semibold text-2xl flex flex-col items-center justify-center"
                title={unit}
              >
                <div className="text-6xl mb-4 select-none">🧩</div>
                <div>{unit}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitSelect;
