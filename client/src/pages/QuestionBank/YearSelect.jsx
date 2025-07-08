import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Spinner from "../../components/Spinner/Spinner";

const YearSelect = () => {
  const { university, unit } = useParams();
  const navigate = useNavigate();

  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchYears = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get(
          `/questions/years/${encodeURIComponent(
            university
          )}/${encodeURIComponent(unit)}`
        );

        if (res.status === 200 && Array.isArray(res.data)) {
          setYears(res.data);
        } else {
          setError("কোনো বছর পাওয়া যায়নি।");
        }
      } catch (err) {
        console.error("❌ Year fetch error:", err);
        setError("সার্ভার সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।");
      } finally {
        setLoading(false);
      }
    };

    fetchYears();
  }, [university, unit]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-200 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6 py-10 transition-colors duration-500">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white drop-shadow">
          📘 {unit} - {university}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          একটা বছর বেছে নিন প্রশ্ন দেখার জন্য
        </p>

        {loading ? (
          <Spinner />
        ) : error ? (
          <p className="text-red-600 dark:text-red-400 font-semibold">
            {error}
          </p>
        ) : years.length === 0 ? (
          <p className="text-yellow-600 dark:text-yellow-400 font-semibold">
            ⚠️ কোনো প্রশ্ন খুঁজে পাওয়া যায়নি।
          </p>
        ) : (
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
                className="cursor-pointer bg-white/30 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center text-gray-900 dark:text-white font-semibold text-xl hover:bg-white/40 hover:dark:bg-white/20 hover:scale-105 transition-transform duration-300"
              >
                <div className="text-5xl mb-2">📅</div>
                <div>{year}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default YearSelect;
