import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { logoutUser } from "./reducers/userReducer";

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
import PropertyListing from "./pages/PropertyListing";
import PropertyDetails from "./pages/PropertyDetails";
import Dashboard from "./pages/dashboard/Dashboard";
import AccountInfo from "./pages/dashboard/components/AccountInfo";
import ProfilePicture from "./pages/dashboard/components/ProfilePicture";
import ChangePassword from "./pages/ChangePassword";
import VerifyUserAccount from "./pages/VerifyUserAccount";
import {
  UserProtectedRoute,
  AdminProtectedRoute,
} from "./components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp < Date.now() / 1000) {
          dispatch(logoutUser());
          window.location.href = "/login";
        }
      } catch {
        dispatch(logoutUser());
      }
    }
  }, [dispatch]);

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
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/find" element={<FindProperty />} />
          <Route path="/property-listing" element={<PropertyListing />} />
          <Route path="/property-details" element={<PropertyDetails />} />
          <Route path="/buy" element={<BuyProperty />} />
          <Route path="/sell" element={<SellProperty />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiesPolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/verify-user-account" element={<VerifyUserAccount />} />
          <Route
            path="/my-account"
            element={
              <UserProtectedRoute>
                <Dashboard />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/my-account/account-info"
            element={
              <UserProtectedRoute>
                <AccountInfo />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/my-account/profile-picture"
            element={
              <UserProtectedRoute>
                <ProfilePicture />
              </UserProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
