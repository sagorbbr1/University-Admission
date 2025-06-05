import { useParams, useNavigate } from "react-router-dom";
import { questionData } from "../../data/questionData";

const UnitSelect = () => {
  const { university } = useParams();
  const navigate = useNavigate();
  const units = Object.keys(questionData[university] || {});

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        🧪 {university} ইউনিট নির্বাচন করুন
      </h2>
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
    </div>
  );
};

export default UnitSelect;
