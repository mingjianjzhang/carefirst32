import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProviderLayout from "./layouts/ProviderLayout.jsx";
import Home from "./pages/Home.jsx";
import FirstToken from "./pages/FirstToken.jsx";
import PatientWallet from "./pages/PatientWallet.jsx";
import Marketplace from "./pages/Marketplace.jsx";
import InsuranceClaims from "./pages/InsuranceClaims.jsx";
import ICare from "./pages/ICare.jsx";
import ProviderPortal from "./pages/ProviderPortal.jsx";
import ProviderDashboard from "./pages/provider/ProviderDashboard.jsx";
import TaxPortal from "./pages/provider/TaxPortal.jsx";
import TokenDashboard from "./pages/provider/TokenDashboard.jsx";
import KYCVerification from "./pages/provider/KYCVerification.jsx";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/first" element={<FirstToken />} />
          <Route path="/wallet" element={<PatientWallet />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/claims" element={<InsuranceClaims />} />
          <Route path="/icare" element={<ICare />} />
          <Route path="/provider" element={<ProviderPortal />} />
          <Route path="/provider/app" element={<ProviderLayout />}>
            <Route index element={<ProviderDashboard />} />
            <Route path="taxes" element={<TaxPortal />} />
            <Route path="tokens" element={<TokenDashboard />} />
            <Route path="kyc" element={<KYCVerification />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
