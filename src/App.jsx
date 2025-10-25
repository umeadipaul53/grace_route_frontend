import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import NotFound from "./pages/NotFound";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLayout from "./layouts/AdminLayout";
import BuyOrders from "./admin/BuyOrders";
import ListingOrders from "./admin/ListingOrders";
import ManageEstate from "./admin/ManageEstate";
import ManageNews from "./admin/ManageNews";
import SendMessage from "./admin/SendMessage";
import ToursInvite from "./admin/ToursInvite";
import ManageUsers from "./admin/ManageUsers";
import ListProperty from "./admin/ListProperty";
import Settings from "./admin/Settings";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Hide Navbar/Footer for any route starting with "/admin"
  const isAdminRoute = /^\/admin(\/|$)/.test(location.pathname);

  const ProfilePictureRoute = () => {
    const navigate = useNavigate();
    return <ProfilePicture onBack={() => navigate(-1)} />;
  };

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
      {/* ✅ Navbar hidden for all admin routes */}
      {!isAdminRoute && <Navbar />}

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
          <Route path="/property-details/:id" element={<PropertyDetails />} />
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
                <ProfilePictureRoute />
              </UserProtectedRoute>
            }
          />

          {/* ✅ All admin routes (no Navbar/Footer) */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="buy-orders" element={<BuyOrders />} />
            <Route path="listing-orders" element={<ListingOrders />} />
            <Route path="list-property" element={<ListProperty />} />
            <Route path="tours-invite" element={<ToursInvite />} />
            <Route path="send-message" element={<SendMessage />} />
            <Route path="manage-news" element={<ManageNews />} />
            <Route path="estate" element={<ManageEstate />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* ✅ Footer hidden for all admin routes */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
