import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProviderLayout from "./layouts/ProviderLayout.jsx";
import Home from "./pages/Home.jsx";
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
          <Route path="/provider" element={<ProviderLayout />}>
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
