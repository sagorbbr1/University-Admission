import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api"; // Adjust if needed
import Spinner from "../../components/Spinner/Spinner";

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
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-200 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-10 transition-colors duration-500">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 drop-shadow">
          🎓 বিশ্ববিদ্যালয় বাছাই করুন
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          প্রশ্ন দেখার জন্য একটি বিশ্ববিদ্যালয় নির্বাচন করুন
        </p>

        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {universities.map((univ, idx) => (
              <div
                key={idx}
                onClick={() =>
                  navigate(`/questionbank/${encodeURIComponent(univ)}`)
                }
                className="cursor-pointer bg-white/30 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center"
              >
                <div className="text-5xl mb-2">🎓</div>
                <div className="text-xl font-semibold text-gray-900 dark:text-white">
                  {univ}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversitySelect;
