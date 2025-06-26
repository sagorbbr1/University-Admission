import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const UniversitySelect = () => {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await api.get("/questions/universities");
      if (res.ok) setUniversities(res.data);
    })();
  }, []);

  const handleSelect = (code) => {
    navigate(`/mock/unit/${code}`);
  };

  console.log("🚀 Universities:", universities);
  const colorMap = {
    du: "bg-blue-800",
    buet: "bg-red-800",
    cu: "bg-green-800",
    ruet: "bg-yellow-700",
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        🎯 মক টেস্ট নির্বাচন করুন
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {universities &&
          universities.map((uni) => {
            const colorClass = uni.color || colorMap[uni.code] || "bg-gray-700";
            return (
              <div
                key={uni}
                onClick={() => handleSelect(uni)}
                className={`p-10 rounded-xl cursor-pointer text-center shadow-xl hover:scale-105 duration-300 ${colorClass} text-lg font-semibold`}
              >
                {uni}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UniversitySelect;
