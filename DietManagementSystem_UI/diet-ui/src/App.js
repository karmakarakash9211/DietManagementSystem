import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ChallengerDashboard from "./pages/ChallengerDashboard";
import MotivatorDashboard from "./pages/MotivatorDashboard";
import BatchLeaderboard from "./pages/BatchLeaderboard";
import Register from "./pages/Register";
import AssignBatch from "./pages/AssignBatch";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔓 PUBLIC */}
        <Route path="/" element={<Login />} />

        {/* 🔐 PROTECTED */}
        <Route element={<Layout />}>

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/challenger"
            element={
              <ProtectedRoute role="CHALLENGER">
                <ChallengerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/motivator"
            element={
              <ProtectedRoute role="MOTIVATOR">
                <MotivatorDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/register" element={<Register />} />

          <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

        </Route>
        <Route path="/leaderboard" element={<BatchLeaderboard />} />
<Route path="/assign" element={<AssignBatch />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;