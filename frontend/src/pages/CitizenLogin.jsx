import { useState, useRef } from "react"; // 1. useRef add kiya
import { useNavigate } from "react-router-dom";
import { 
  Mail, 
  Lock, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

export default function CitizenLogin() {
  const navigate = useNavigate();
  const cardRef = useRef(null); // 2. Card ke liye ref banaya

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 3. Bahar click karne par close karne ka function
  const handleOverlayClick = (e) => {
    // Agar click cardRef ke 'bahar' hua hai, toh home page pe bhej do
    if (cardRef.current && !cardRef.current.contains(e.target)) {
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid credentials");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    /* 4. Main wrapper pe onClick lagaya aur cursor pointer kiya */
    <div 
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 font-sans cursor-pointer"
    >
      
      <div className="absolute top-[-5%] right-[-5%] w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[100px] -z-10"></div>

      {/* 5. Card pe ref={cardRef} lagaya aur cursor-default kiya taaki form pe click karne se band na ho */}
      <div 
        ref={cardRef}
        onClick={(e) => e.stopPropagation()} // Click event ko upar (overlay) tak jaane se rokta hai
        className="relative w-full max-w-[400px] bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(79,70,229,0.2)] overflow-hidden animate-in fade-in zoom-in-95 duration-300 cursor-default"
      >
        
        <div className="bg-indigo-600 p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <h1 className="text-3xl font-bold text-white tracking-tight relative z-10">Citizen Login</h1>
          <p className="text-indigo-100 text-sm mt-2 relative z-10 opacity-90 font-medium">Access your CIVIX dashboard</p>
        </div>

        <div className="p-8 bg-white relative">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={17} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="yourname@email.com"
                  className="citizen-login-input"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                <span className="text-[10px] text-indigo-600 font-bold cursor-pointer hover:underline">Forgot?</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={17} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="citizen-login-input"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-[12px] font-bold bg-red-50 p-3 rounded-xl border border-red-100 animate-shake">
                <ShieldCheck size={14} /> {error}
              </div>
            )}

            <button 
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4" 
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Sign In"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-500 font-medium">
              New to the platform?{" "}
              <span 
                onClick={() => navigate("/citizen-signup")} 
                className="text-indigo-600 font-bold cursor-pointer hover:underline underline-offset-4"
              >
                Create an account
              </span>
            </p>
          </div>
        </div>

        <div className="bg-slate-50 py-3 text-center border-t border-slate-100">
            <p className="text-[9px] text-slate-400 font-bold flex items-center justify-center gap-1 uppercase tracking-widest">
              <CheckCircle2 size={10} className="text-indigo-500" /> Secure Data Protocol Active
            </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .citizen-login-input {
          width: 100%;
          padding: 0.85rem 1rem 0.85rem 3.1rem;
          background-color: #f8fafc;
          border: 1.5px solid #f1f5f9;
          border-radius: 0.75rem;
          font-size: 0.9rem;
          color: #1e293b;
          transition: all 0.3s ease;
          outline: none;
        }
        .citizen-login-input:focus {
          background-color: #fff;
          border-color: #6366f1;
          box-shadow: 0 4px 12px -2px rgba(99, 102, 241, 0.08);
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out; }
      `}} />
    </div>
  );
}