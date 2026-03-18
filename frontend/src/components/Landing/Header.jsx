// frontend/src/components/Landing/Header.jsx
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../context/LoaderContext";

export default function Header() {
  const navigate = useNavigate();
  const { showLoader } = useLoader();

  const role = localStorage.getItem("role");

  const isOfficialLoggedIn = role === "OFFICIAL";
  const isCitizenLoggedIn = role === "CITIZEN";

  // Reusable navigation function with loader - REDUCED TIME TO 300ms
  const navigateWithLoader = (path, message) => {
    console.log(`🚀 Navigating to ${path} with message: ${message}`);
    showLoader(message);
    
    setTimeout(() => {
      console.log(`➡️ Now navigating to ${path}`);
      navigate(path);
    }, 300); // Changed from 800ms to 300ms
  };

  const handleOfficialAction = () => {
    if (isOfficialLoggedIn) {
      navigateWithLoader("/official-dashboard", "Loading official dashboard...");
    } else {
      navigateWithLoader("/official-login", "Loading official login...");
    }
  };

  const handleCitizenLogin = () => {
    if (isCitizenLoggedIn) {
      navigateWithLoader("/dashboard", "Loading citizen dashboard...");
    } else {
      navigateWithLoader("/citizen-login", "Loading citizen login...");
    }
  };

  const handleLogoClick = () => {
    navigateWithLoader("/", "Loading home...");
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigateWithLoader(`/#${id}`, `Loading ${id} section...`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-16 py-4 bg-white/90 backdrop-blur-md z-[100] border-b border-slate-100">

      {/* Logo */}
      <div
        className="text-2xl font-black text-indigo-600 cursor-pointer tracking-tight"
        onClick={handleLogoClick}
      >
        CIVIX
      </div>

      {/* Center Links */}
      <div className="hidden md:flex items-center gap-10">

        <button
          onClick={() => scrollToSection("home")}
          className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition"
        >
          Home
        </button>

        <button
          onClick={() => scrollToSection("features")}
          className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition"
        >
          Petitions
        </button>

        <button
          onClick={() => scrollToSection("stats")}
          className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition"
        >
          Our Impact
        </button>

      </div>

      {/* Right Buttons */}
      <div className="flex items-center gap-4">

        {/* Official Portal */}
        <button
          onClick={handleOfficialAction}
          className="hidden sm:block text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-indigo-600 border-r border-slate-200 pr-4 transition"
        >
          {isOfficialLoggedIn ? "Official Dashboard" : "Official Portal"}
        </button>

        {/* Citizen Login */}
        <button
          onClick={handleCitizenLogin}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition active:scale-95 text-sm"
        >
          {isCitizenLoggedIn ? "Dashboard" : "Citizen Login"}
        </button>

      </div>

    </nav>
  );
}