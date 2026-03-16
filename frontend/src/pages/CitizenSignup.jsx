import { useState, useRef } from "react"; // useRef add kiya
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Lock, 
  UserPlus, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2 
} from "lucide-react";

export default function CitizenSignup() {
  const navigate = useNavigate();
  const cardRef = useRef(null); // Ref for click-outside logic

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Click outside to close logic
  const handleOverlayClick = (e) => {
    if (cardRef.current && !cardRef.current.contains(e.target)) {
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); 
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "citizen" 
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      alert("Citizen account created successfully");
      navigate("/citizen-login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 font-sans cursor-pointer"
    >
      
      {/* Subtle Indigo Glow */}
      <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] -z-10"></div>

      <div 
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[460px] bg-white rounded-3xl shadow-[0_25px_50px_-12px_rgba(79,70,229,0.15)] overflow-hidden animate-in fade-in zoom-in-95 duration-300 cursor-default"
      >
        
        {/* Header - No Close Button, No Icon, Straight Edge */}
        <div className="bg-indigo-600 p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <h1 className="text-3xl font-bold text-white tracking-tight relative z-10">Create Account</h1>
          <p className="text-indigo-100 text-sm mt-2 relative z-10 opacity-90 font-medium">Join CIVIX to track and raise local issues</p>
        </div>

        {/* Form Section - Straight Edge with Header */}
        <div className="p-8 bg-white relative">
          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={16} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Vansh Kumar Garg"
                  className="citizen-input-compact"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={16} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@email.com"
                  className="citizen-input-compact"
                  required
                />
              </div>
            </div>

            {/* Passwords Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={16} />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••"
                    className="citizen-input-compact"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5 group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={16} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••"
                    className="citizen-input-compact"
                    required
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-[11px] font-bold bg-red-50 p-3 rounded-xl border border-red-100">
                <ShieldCheck size={14} /> {error}
              </div>
            )}

            <button 
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4" 
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Register Now"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Footer Toggle */}
          <div className="mt-8 text-center pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-500 font-medium">
              Already a member?{" "}
              <span 
                onClick={() => navigate("/citizen-login")} 
                className="text-indigo-600 font-bold cursor-pointer hover:underline underline-offset-4"
              >
                Sign In
              </span>
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="bg-slate-50 py-3 text-center border-t border-slate-100">
            <p className="text-[9px] text-slate-400 font-bold flex items-center justify-center gap-1 uppercase tracking-widest">
              <CheckCircle2 size={10} className="text-indigo-500" /> Secure Encryption Shield
            </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .citizen-input-compact {
          width: 100%;
          padding: 0.85rem 1rem 0.85rem 3rem;
          background-color: #f8fafc;
          border: 1.5px solid #f1f5f9;
          border-radius: 0.75rem;
          font-size: 0.85rem;
          color: #1e293b;
          transition: all 0.3s ease;
          outline: none;
        }
        .citizen-input-compact:focus {
          background-color: #fff;
          border-color: #6366f1;
          box-shadow: 0 4px 12px -2px rgba(99, 102, 241, 0.08);
        }
      `}} />
    </div>
  );
}