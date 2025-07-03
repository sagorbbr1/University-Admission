import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedAppRoutes from "./routes/AnimatedAppRoutes";

function App() {
  return (
    <Router>
      <AnimatedAppRoutes />
    </Router>
  );
}

export default App;
