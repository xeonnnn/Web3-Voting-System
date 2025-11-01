import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProposerDashboard from "./pages/ProposerDashboard";
import VoterDashboard from "./pages/VoterDashboard";
import BadgePage from "./pages/BadgePage";
import ProposalDetails from "./pages/ProposalDetails";
import Navbar from "./components/Navbar";
import FundChartContainer from "./components/FundChartContainer"; // ✅ updated import

export default function App() {
  const aptosAddress =
    "0x8c2717687c3ffe936360258323b0966cf24a45cb15bf2c038029852bb4ec1d29";

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard/proposer" element={<ProposerDashboard />} />
          <Route path="/dashboard/voter" element={<VoterDashboard />} />
          <Route path="/badge" element={<BadgePage />} />
          <Route path="/proposal/:id" element={<ProposalDetails />} />
        </Routes>

        {/* ✅ FundFlow Tracker Section */}
        <div className="mt-10 p-6 bg-white rounded shadow max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4">
            FundFlow Tracker
          </h2>
          <FundChartContainer address={aptosAddress} />
        </div>
      </div>
    </Router>
  );
}
