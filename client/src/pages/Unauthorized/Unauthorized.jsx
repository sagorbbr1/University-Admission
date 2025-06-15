import React from "react";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100">
      <h1 className="text-3xl font-bold">🚫 Unauthorized Access</h1>
    </div>
  );
}
