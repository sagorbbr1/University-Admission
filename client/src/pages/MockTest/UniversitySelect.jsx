import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Spinner from "../../components/Spinner/Spinner";

const UniversitySelect = () => {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/questions/universities");
        if (res.ok) setUniversities(res.data);
      } catch (err) {
        console.error("🚨 Error fetching universities:", err);
        alert("❌ Failed to load universities.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSelect = (uniCode) => {
    navigate(`/mock/unit/${uniCode}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-blue-300 to-purple-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-10 drop-shadow-lg">
          🎯 বিশ্ববিদ্যালয় বাছাই করুন
        </h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {universities.map((uni) => (
              <div
                key={uni}
                onClick={() => handleSelect(uni)}
                className="cursor-pointer bg-white/20 dark:bg-white/10 backdrop-blur-lg border border-white/30 dark:border-white/20 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition transform hover:scale-105 select-none"
                title={uni.toUpperCase()}
              >
                <div className="text-6xl mb-4 select-none">🎓</div>
                <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {uni.toUpperCase()}
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
