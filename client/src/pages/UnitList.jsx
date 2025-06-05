import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Dummy unit data based on university slug
const universityUnits = {
  du: ["A Unit", "B Unit", "C Unit", "D Unit"],
  ru: ["A Unit", "B Unit", "C Unit"],
  ju: ["Science", "Arts", "Business Studies"],
  bup: ["FSSS", "FBS", "FASS"],
  maritime: ["Engineering", "Nautical Science"],
  "guccho-b": ["Science", "Humanities", "Commerce"],
  iba: ["IBA MCQ"],
  jatio: ["Unit 1", "Unit 2"],
};

const UnitList = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const units = universityUnits[slug] || [];

  const handleClick = (unit) => {
    navigate(`/questionbank/${slug}/${encodeURIComponent(unit)}`);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        🎯 ইউনিট নির্বাচন ({slug.toUpperCase()})
      </h1>

      {units.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {units.map((unit, idx) => (
            <div
              key={idx}
              onClick={() => handleClick(unit)}
              className="cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-transform duration-300 p-5 rounded-xl shadow text-center"
            >
              <div className="text-lg font-semibold">{unit}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-red-400 mt-8">
          এই বিশ্ববিদ্যালীর কোন ইউনিট খুঁজে পাওয়া যায়নি।
        </p>
      )}
    </div>
  );
};

export default UnitList;
