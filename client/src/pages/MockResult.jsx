import { useParams } from "react-router-dom";

const MockResult = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">📊 আপনার ফলাফল</h1>
      <div className="bg-gray-800 p-6 rounded text-center">
        <p className="text-lg mb-2">
          মক আইডি: <span className="text-yellow-400">{id}</span>
        </p>
        <p className="text-3xl font-bold text-green-400">80% সঠিক ✅</p>
        <p className="mt-2">আপনার উত্তর বিশ্লেষণ শীঘ্রই আসবে... 😉</p>
      </div>
    </div>
  );
};

export default MockResult;
