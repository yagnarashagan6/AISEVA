import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="mb-4">This is a simple admin dashboard placeholder.</p>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

function UserDashboard({
  userName,
  onLogout,
}: {
  userName: string;
  onLogout: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4">Welcome, {userName}</h1>
        <p className="mb-4">This is a simple user dashboard placeholder.</p>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState<{
    type: "user" | "admin";
    name: string;
  } | null>({
    type: "user",
    name: "Demo User",
  });

  const handleLogin = (type: "user" | "admin", name: string) => {
    setUser({ type, name });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">AISEVA Demo</h2>
          <div className="space-y-3">
            <button
              onClick={() => handleLogin("user", "Demo User")}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
            >
              Login as User
            </button>
            <button
              onClick={() => handleLogin("admin", "Demo Admin")}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
            >
              Login as Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={
            user.type === "user" ? (
              <UserDashboard userName={user.name} onLogout={handleLogout} />
            ) : (
              <Navigate to="/admin" />
            )
          }
        />
        <Route
          path="/admin"
          element={
            user.type === "admin" ? (
              <AdminDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/"
          element={
            <Navigate to={user.type === "admin" ? "/admin" : "/dashboard"} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
