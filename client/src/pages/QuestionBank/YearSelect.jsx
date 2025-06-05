import { useParams, useNavigate } from "react-router-dom";
import { questionData } from "../../data/questionData";

const YearSelect = () => {
  const { university, unit } = useParams();
  const navigate = useNavigate();

  const years = Object.keys(questionData[university]?.[unit] || {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-4 py-10">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-8">
          📘 {unit} - {university}
        </h1>
        <p className="text-gray-400 mb-6">
          একটা বছর বেছে নিন প্রশ্ন দেখার জন্য
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {years.map((year, idx) => (
            <div
              key={idx}
              onClick={() =>
                navigate(
                  `/questionbank/${encodeURIComponent(
                    university
                  )}/${encodeURIComponent(unit)}/${year}`
                )
              }
              className="cursor-pointer bg-gray-800 hover:bg-blue-700 p-6 rounded-xl shadow-md flex flex-col items-center justify-center transition-all"
            >
              <div className="text-4xl mb-2">📅</div>
              <div className="text-xl font-semibold">{year}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YearSelect;
