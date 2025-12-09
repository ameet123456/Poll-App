import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePoll from "./pages/CreatePoll";
import PollPage from "./pages/PollPage";
import AdminDashboard from "./pages/AdminDashboard";import Welcome from "./pages/Welcome";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/create" element={<CreatePoll />} />
        <Route path="/poll/:pollId" element={<PollPage />} />
        <Route path="/admin/:adminId" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
