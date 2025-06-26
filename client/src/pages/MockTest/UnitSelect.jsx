import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";

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
    navigate(`/mock/configure/${university}/${unit}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        🧩 ইউনিট নির্বাচন করুন
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {units.map((unit) => (
          <div
            key={unit}
            onClick={() => handleSelect(unit)}
            className="p-10 rounded-xl cursor-pointer text-center shadow-xl bg-indigo-700 hover:scale-105 duration-300 text-lg font-semibold"
          >
            {unit}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnitSelect;
