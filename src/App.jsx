import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/home/Home";
import About from "./pages/aboutUs/About";
import Services from "./pages/Services";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import FindProperty from "./pages/FindProperty";
import BuyProperty from "./pages/BuyProperty";
import SellProperty from "./pages/SellProperty";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiesPolicy from "./pages/CookiesPolicy";
import FAQ from "./pages/FAQ";
import Achievements from "./pages/Achievements";
import Managements from "./pages/Managements";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/management" element={<Managements />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/find" element={<FindProperty />} />
          <Route path="/buy" element={<BuyProperty />} />
          <Route path="/sell" element={<SellProperty />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiesPolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
