import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api"; // Adjust the import path as necessary

const UniversitySelect = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await api.get("/questions/universities");
        if (res.ok) {
          setUniversities(res.data);
        } else {
          alert("❌ Couldn't load universities.");
        }
      } catch (err) {
        console.error("🚨 Error fetching universities:", err);
        alert("❌ Failed to load universities.");
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-4 py-10">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-8">
          🎓 বিশ্ববিদ্যালয় বাছাই করুন
        </h1>
        <p className="text-gray-400 mb-6">
          প্রশ্ন দেখার জন্য একটি বিশ্ববিদ্যালয় নির্বাচন করুন
        </p>

        {loading ? (
          <p className="text-gray-400">Loading universities...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {universities.map((univ, idx) => (
              <div
                key={idx}
                onClick={() =>
                  navigate(`/questionbank/${encodeURIComponent(univ)}`)
                }
                className="cursor-pointer bg-gray-800 hover:bg-blue-700 p-6 rounded-xl shadow-md flex flex-col items-center justify-center transition-all"
              >
                <div className="text-4xl mb-2">🎓</div>
                <div className="text-xl font-semibold text-center">{univ}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversitySelect;
