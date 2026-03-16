import './styles/App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { PetitionProvider } from './context/PetitionContext';
import { LoaderProvider } from './context/LoaderContext';

import Landing from './pages/Landing';
import Dashboard from './Dashboard';
import OfficialDashboard from './pages/OfficialDashboard';
import OfficialPetitions from './OfficialPetitions';

import CitizenLogin from './pages/CitizenLogin';
import CitizenSignup from './pages/CitizenSignup';
import OfficialLogin from './pages/OfficialLogin';
import OfficialSignup from './pages/OfficialSignup';


import CivixDashboard from './pages/CivixDashboard';
import Auth from "./pages/Auth";

function App() {

  const location = useLocation();

  return (
    <div className="App">

      <LoaderProvider>

        <div className={`app-content ${location.pathname !== "/citizen-login" ? "scrollable" : ""}`}>

          <PetitionProvider>

            <Routes>

              {/* Landing */}
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />

              {/* Citizen */}
              <Route path="/citizen-login" element={<CitizenLogin />} />
              <Route path="/citizen-signup" element={<CitizenSignup />} />

              {/* Official */}
              <Route path="/official-login" element={<OfficialLogin />} />
              <Route path="/official-signup" element={<OfficialSignup />} />

              {/* Dashboards */}
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