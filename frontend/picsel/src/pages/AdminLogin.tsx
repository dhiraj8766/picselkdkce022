import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User } from "lucide-react";
import adminCreds from "@/data/adminCredentials.json";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (username === adminCreds.username && password === adminCreds.password) {
        sessionStorage.setItem("admin_auth", "true");
        navigate("/admin/dashboard");
      } else {
        setError("Invalid credentials");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Lock className="text-primary" size={24} />
            </div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Admin Login</h1>
            <p className="text-sm text-muted-foreground mt-1">PICSEL Club Dashboard</p>
          </div>
          {error && (
            <div className="mb-4 rounded-xl border border-accent-red/20 bg-accent-red/10 p-3 text-sm text-accent-red">{error}</div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Enter username" required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Enter password" required />
              </div>
            </div>
            <button type="submit" disabled={loading} className="valorant-btn-cyan w-full text-center disabled:opacity-50">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
