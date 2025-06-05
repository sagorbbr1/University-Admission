import React from "react";
import { useNavigate } from "react-router-dom";

const universities = [
  { name: "ঢাকা বিশ্ববিদ্যালয়", code: "du", color: "bg-blue-800" },
  { name: "বুয়েট", code: "buet", color: "bg-red-800" },
  { name: "চবি", code: "cu", color: "bg-green-800" },
  { name: "রুয়েট", code: "ruet", color: "bg-yellow-700" },
];

const MockTestSelect = () => {
  const navigate = useNavigate();

  const handleSelect = (code) => {
    navigate(`/mock-setup/${code}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl text-center font-bold mb-8">
        🎯 মক টেস্ট নির্বাচন করুন
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {universities.map((uni) => (
          <div
            key={uni.code}
            onClick={() => handleSelect(uni.code)}
            className={`p-6 rounded-xl cursor-pointer text-center shadow-xl hover:scale-105 duration-300 ${uni.color}`}
          >
            <h2 className="text-xl font-semibold">{uni.name}</h2>
            <p className="text-sm mt-1">বিশ্ববিদ্যালয়ভিত্তিক প্রশ্ন</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MockTestSelect;
