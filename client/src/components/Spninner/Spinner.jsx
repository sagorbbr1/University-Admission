import React from "react";
import { ClockLoader } from "react-spinners"; // ✅ Import the loader

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <ClockLoader color="rgba(48, 211, 211, 1)" loading speedMultiplier={1} />
    </div>
  );
};

export default Spinner;
