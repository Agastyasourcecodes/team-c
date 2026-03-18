// frontend/src/App.js
import './styles/App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { PetitionProvider } from './context/PetitionContext';
import { LoaderProvider } from './context/LoaderContext';
import Loader from './components/Loader';

// Pages
import Landing from './pages/Landing';
import Auth from "./pages/Auth";
import CitizenLogin from './pages/CitizenLogin';
import CitizenSignup from './pages/CitizenSignup';
import OfficialLogin from './pages/OfficialLogin';
import OfficialSignup from './pages/OfficialSignup';
import CivixDashboard from './pages/CivixDashboard';
import OfficialDashboard from './pages/OfficialDashboard';

// Note: .jsx extension not needed in imports
import Dashboard from './Dashboard.jsx';  // 👈 Changed to .jsx
import OfficialPetitions from './OfficialPetitions.jsx';  // 👈 Changed to .jsx

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <LoaderProvider>
        <Loader />
        
        <div className={`app-content ${location.pathname !== "/citizen-login" ? "scrollable" : ""}`}>
          <PetitionProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />

              {/* Citizen Routes */}
              <Route path="/citizen-login" element={<CitizenLogin />} />
              <Route path="/citizen-signup" element={<CitizenSignup />} />

              {/* Official Routes */}
              <Route path="/official-login" element={<OfficialLogin />} />
              <Route path="/official-signup" element={<OfficialSignup />} />

              {/* Dashboard Routes */}
              <Route path="/dash" element={<Dashboard />} /> 
              <Route path="/dashboard" element={<CivixDashboard />} />
              <Route path="/official-dashboard" element={<OfficialDashboard />} />
              <Route path="/official-petitions" element={<OfficialPetitions />} />
            </Routes>
          </PetitionProvider>
        </div>
      </LoaderProvider>
    </div>
  );
}

export default App;