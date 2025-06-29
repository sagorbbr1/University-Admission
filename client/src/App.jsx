import { React, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import NotFound from "./pages/NotFound/NotFound";
import LoginPage from "./pages/LoginPage/Login";
import RegisterPage from "./pages/RegisterPage/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Routine from "./pages/Routine/Routine";
import RoutineDnD from "./pages/Routine/RoutineDnD";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Notice from "./pages/Notice/Notice";
import DailyChallenge from "./pages/DailyChallenge/DailyChallenge";
import MistakeBank from "./pages/MistakeBank/MistakeBank";
import ResultAnalysis from "./pages/Result/ResultAnalysis";
import ForumPage from "./pages/ForumPage/ForumPage";
import UniversitySelect from "./pages/QuestionBank/UniversitySelect";
import UnitSelect from "./pages/QuestionBank/UnitSelect";
import YearSelect from "./pages/QuestionBank/YearSelect";
import QuestionDisplay from "./pages/QuestionBank/QuestionDisplay";
import AdminPanel from "./pages/Admin/AdminPanel";
import AdminRoute from "./routes/AdminRoute";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import MockUniversitySelect from "./pages/MockTest/UniversitySelect";
import MockUnitSelect from "./pages/MockTest/UnitSelect";
import MockConfig from "./pages/MockTest/MockConfig";
import MockTest from "./pages/MockTest/MockTest";
import MockResult from "./pages/MockTest/MockResult";
import Profile from "./pages/Profile/Profile";
import ResultDetails from "./pages/ResultDetails/ResultDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/routine" element={<Routine />} />
        <Route path="/routine-dnd" element={<RoutineDnD />} />
        //MockExam
        <Route path="/mock" element={<MockUniversitySelect />} />
        <Route path="/mock/unit/:university" element={<MockUnitSelect />} />
        <Route
          path="/mock/configure/:university/:unit"
          element={<MockConfig />}
        />
        <Route path="/mock/start/:university/:unit" element={<MockTest />} />
        <Route path="/mock/result/:attemptId" element={<MockResult />} />
        //Others
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/notices" element={<Notice />} />
        <Route path="/daily-challenge" element={<DailyChallenge />} />
        <Route path="/mistake-bank" element={<MistakeBank />} />
        <Route path="/results" element={<ResultAnalysis />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/questionbank" element={<UniversitySelect />} />
        <Route path="/questionbank/:university" element={<UnitSelect />} />
        <Route
          path="/questionbank/:university/:unit"
          element={<YearSelect />}
        />
        <Route
          path="/questionbank/:university/:unit/:year"
          element={<QuestionDisplay />}
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/student/results/:resultId" element={<ResultDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
