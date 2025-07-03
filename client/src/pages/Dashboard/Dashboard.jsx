import React from "react";
import { useUser } from "../../context/UserContext.jsx";

const Dashboard = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
        {/* same as before */}
      </div>
    );
  }

  return (
    <>
      <h2 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white drop-shadow">
        🎓 {user?.name}
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-10">
        প্রতিদিনের প্র‍্যাকটিস, প্রস্তুতি ও অগ্রগতির সবকিছু এক জায়গায়।
      </p>
      {/* dashboard content */}
    </>
  );
};

export default Dashboard;
