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
import MockTestSelect from "./pages/MockTest/MockTestSelect";
import MockSetup from "./pages/MockTest/MockSetup";
import MockExam from "./pages/MockTest/MockExam";
import MockResult from "./pages/MockTest/MockResult";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Notice from "./pages/Notice/Notice";
import DailyChallenge from "./pages/DailyChallenge/DailyChallenge";
import MistakeBank from "./pages/MistakeBank/MistakeBank";
import ResultAnalysis from "./pages/Result/ResultAnalysis";
import WeaknessPage from "./pages/Weakness/WeaknessPage";
import ForumPage from "./pages/ForumPage/ForumPage";
import UniversitySelect from "./pages/QuestionBank/UniversitySelect";
import UnitSelect from "./pages/QuestionBank/UnitSelect";
import YearSelect from "./pages/QuestionBank/YearSelect";
import QuestionDisplay from "./pages/QuestionBank/QuestionDisplay";
import AdminPanel from "./pages/Admin/AdminPanel";

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
        <Route path="/mock-tests" element={<MockTestSelect />} />
        <Route path="/mock-setup/:university" element={<MockSetup />} />
        <Route path="/mock-exam/:id" element={<MockExam />} />
        <Route path="/mock-result/:id" element={<MockResult />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/notices" element={<Notice />} />
        <Route path="/daily-challenge" element={<DailyChallenge />} />
        <Route path="/mistake-bank" element={<MistakeBank />} />
        <Route path="/results" element={<ResultAnalysis />} />
        <Route path="/weakness" element={<WeaknessPage />} />
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
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
