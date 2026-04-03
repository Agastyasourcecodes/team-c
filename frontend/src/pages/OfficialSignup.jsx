import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  Mail, 
  Lock, 
  X, 
  User, 
  ShieldCheck, 
  ArrowRight,
  Landmark,
  CheckCircle2,
  UserPlus
} from "lucide-react";

export default function OfficialSignup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(""); // Clear error on type
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "official",
          location: "Not Specified"
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      alert(data.message);
      navigate("/official-login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4 font-sans text-slate-900">
      
      {/* Background Decorative Element */}
      <div className="absolute top-[-5%] left-[-5%] w-[450px] h-[450px] bg-slate-800/20 rounded-full blur-[120px] -z-10"></div>

      <div className="relative w-full max-w-[500px] bg-white rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Top-Right Close Button */}
        <button 
          onClick={() => navigate("/")} 
          className="absolute top-6 right-6 p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 rounded-full transition-all z-20"
        >
          <X size={22} />
        </button>

        {/* Header Section */}
        <div className="bg-slate-900 p-8 pb-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
             <Landmark size={200} className="absolute -bottom-10 -left-10 text-white" />
          </div>
          
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl mb-4 relative z-10">
             <UserPlus className="text-white" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight relative z-10">Official Registration</h1>
          <p className="text-slate-400 text-sm mt-1 relative z-10 font-medium">Create Government Personnel Account</p>
        </div>

        {/* Form Section */}
        <div className="p-8 -mt-6 bg-white rounded-t-[2.5rem] relative">
          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Officer Name"
                  className="official-input-modern"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@gov.in"
                  className="official-input-modern"
                  required
                />
              </div>
            </div>

            {/* Passwords Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••"
                    className="official-input-modern"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1 group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••"
                    className="official-input-modern"
                    required
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-[12px] font-bold bg-red-50 p-3.5 rounded-xl border border-red-100">
                <ShieldCheck size={14} /> {error}
              </div>
            )}

            <button 
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-2" 
              disabled={loading}
            >
              {loading ? "Processing..." : "Register Official Account"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-6 text-center pt-4 border-t border-slate-50">
            <p className="text-sm text-slate-500 font-medium">
              Already have an account?{" "}
              <span 
                onClick={() => navigate("/official-login")} 
                className="text-slate-900 font-bold cursor-pointer hover:underline underline-offset-4"
              >
                Sign In
              </span>
            </p>
          </div>
        </div>

        {/* Security Trust Badge */}
        <div className="bg-slate-50 py-3 text-center border-t border-slate-100">
           <p className="text-[10px] text-slate-400 font-bold flex items-center justify-center gap-1 uppercase tracking-widest">
             <CheckCircle2 size={12} className="text-slate-900" /> Authorized Government Identity Access
           </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .official-input-modern {
          width: 100%;
          padding: 0.85rem 1rem 0.85rem 3.2rem;
          background-color: #f8fafc;
          border: 2px solid #f1f5f9;
          border-radius: 1.25rem;
          font-size: 0.9rem;
          color: #0f172a;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
        }
        .official-input-modern:focus {
          background-color: #fff;
          border-color: #0f172a;
          box-shadow: 0 10px 20px -5px rgba(15, 23, 42, 0.1);
        }
      `}} />
    </div>
  );
}