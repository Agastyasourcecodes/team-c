import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Auth from './Auth';
import Aurora from './Aurora';
import Dashboard from './Dashboard';
import Landing from './Landing';
import OfficialDashboard from './pages/OfficialDashboard';
import OfficialPetitions from './OfficialPetitions';
import { PetitionProvider } from './PetitionContext';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="App">

      <div className="app-background">
        <Aurora
          colorStops={['#223382', '#9BACD8', '#223382']}
          amplitude={1.2}
          blend={0.6}
          speed={isLoginPage ? 0 : 1}
        />
      </div>

      <div className={`app-content ${location.pathname !== "/login" ? "scrollable" : ""}`}>

        <PetitionProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/official-dashboard" element={<OfficialDashboard />} />
            <Route path="/official-petitions" element={<OfficialPetitions />} />
          </Routes>
        </PetitionProvider>

      </div>

    </div>
  );
}

export default App;