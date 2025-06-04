import { React, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Routine from "./pages/Routine";
import RoutineDnD from "./pages/RoutineDnD";
import MockTestSelect from "./pages/MockTestSelect ";
import MockResult from "./pages/MockResult";
import MockExam from "./pages/MockExam";
import MockSetup from "./pages/MockSetup";
import Leaderboard from "./pages/LeaderBoard";
import Notice from "./pages/Notice";
import QuestionBank from "./pages/QuestionBank";
import DailyChallenge from "./pages/DailyChallenge";
import MistakeBank from "./pages/MistakeBank";
import ResultAnalysis from "./pages/ResultAnalysis";
import WeaknessPage from "./pages/WeaknessPage";
import ForumPage from "./pages/ForumPage";
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
        <Route path="/question-bank" element={<QuestionBank />} />
        <Route path="/daily-challenge" element={<DailyChallenge />} />
        <Route path="/mistake-bank" element={<MistakeBank />} />
        <Route path="/results" element={<ResultAnalysis />} />
        <Route path="/weakness" element={<WeaknessPage />} />
        <Route path="/forum" element={<ForumPage />} />
      </Routes>
    </Router>
  );
}

export default App;
