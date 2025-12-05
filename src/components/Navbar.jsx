import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, fetchUserProfile } from "../reducers/userReducer";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, details } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false); // for mobile dashboard dropdown
  const [moreOpen, setMoreOpen] = useState(false);
  const avatarUrl =
    details?.profileImage ||
    "https://res.cloudinary.com/dtzesgkf0/image/upload/user-profile-avatar-login-account-male-user-icon-hd-png-download-lrue3mennq6knv5l_vtfvz8.png";

  const dropdownRef = useRef();
  const moreTimeoutRef = useRef(null);
  const navigate = useNavigate();

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isAuthenticated && !details) {
      dispatch(fetchUserProfile());
    }
  }, [isAuthenticated, dispatch, details]);

  // Cleanup hover timeout
  useEffect(() => {
    return () => {
      if (moreTimeoutRef.current) {
        clearTimeout(moreTimeoutRef.current);
        moreTimeoutRef.current = null;
      }
    };
  }, []);

  const toggleMobileMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLinkClick = () => {
    setMenuOpen(false);
    setDashboardOpen(false);
    setMoreOpen(false);
  };

  const handleMoreEnter = () => {
    if (moreTimeoutRef.current) {
      clearTimeout(moreTimeoutRef.current);
      moreTimeoutRef.current = null;
    }
    setMoreOpen(true);
  };

  const handleMoreLeave = () => {
    moreTimeoutRef.current = setTimeout(() => {
      setMoreOpen(false);
      moreTimeoutRef.current = null;
    }, 120);
  };

  const handleDashboardClick = (tabId) => {
    navigate(`/my-account?tab=${tabId}`);
    handleLinkClick();
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top Header */}
      <div className="bg-green-950 text-gold text-sm">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-6 py-2 space-y-3 md:space-y-0 text-center md:text-left">
          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row sm:space-x-6 text-gold-500">
            <a href="tel:+2348012345678" className="text-gold block sm:inline">
              📞 +234 801 234 5678
            </a>
            <a
              href="mailto:info@gracerouteltd.com"
              className="text-gold block sm:inline"
            >
              ✉ info@gracerouteltd.com
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end space-x-4">
            <a
              href="#"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img
              src="https://res.cloudinary.com/dtzesgkf0/image/upload/logo-new-removebg-preview_aenosg.png"
              alt="logo"
              className="h-10 w-auto md:h-12"
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex space-x-6 text-green-950 font-medium">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about-us">About us</Link>
            </li>

            {/* More Dropdown */}
            <li
              className="relative"
              onMouseEnter={handleMoreEnter}
              onMouseLeave={handleMoreLeave}
            >
              <button className="hover:text-green-950 flex items-center gap-1 transition-colors duration-200">
                More
                <span
                  className={`text-xs transform transition-transform duration-200 ${
                    moreOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              </button>
              <ul
                className={`absolute left-0 mt-2 w-44 bg-white shadow-md rounded-lg transition-all duration-200 ease-out origin-top z-50 ${
                  moreOpen
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <li>
                  <Link
                    to="/services"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/management"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Management
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="block px-4 py-2 hover:bg-gray-100">
                    FAQ
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/estates">Estates</Link>
            </li>
            <li>
              <Link to="/buy">Buy</Link>
            </li>
            <li>
              <Link to="/sell">Sell</Link>
            </li>
            <li>
              <Link to="/contact-us">Contact Us</Link>
            </li>
          </ul>

          {/* Profile or Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-green-950"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-950 text-white px-4 py-2 rounded hover:bg-green-900"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2"
                >
                  <img
                    src={avatarUrl}
                    alt="User avatar"
                    className="w-9 h-9 rounded-full border"
                  />
                  <span className="text-gray-700 font-medium">
                    {user?.firstname} {user?.lastname}
                  </span>
                  <span>▼</span>
                </button>
                <div
                  className={`absolute right-0 mt-2 w-40 bg-white border rounded shadow-md transition-all duration-200 origin-top ${
                    dropdownOpen
                      ? "scale-100 opacity-100"
                      : "scale-95 opacity-0 pointer-events-none"
                  }`}
                >
                  <Link
                    to="/my-account"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-700 text-2xl"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 space-y-2 bg-white border-t border-gray-100 text-gray-700 font-medium">
            <Link to="/" className="block py-2" onClick={handleLinkClick}>
              Home
            </Link>
            <Link
              to="/about-us"
              className="block py-2"
              onClick={handleLinkClick}
            >
              About us
            </Link>

            {/* Dashboard Submenu (mobile only) */}
            <Link
              to="/estates"
              className="block py-2"
              onClick={handleLinkClick}
            >
              Estates
            </Link>
            <Link to="/buy" className="block py-2" onClick={handleLinkClick}>
              Buy
            </Link>
            <Link to="/sell" className="block py-2" onClick={handleLinkClick}>
              Sell
            </Link>
            <Link
              to="/contact-us"
              className="block py-2"
              onClick={handleLinkClick}
            >
              Contact Us
            </Link>

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="block py-2"
                  onClick={handleLinkClick}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block py-2"
                  onClick={handleLinkClick}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <div>
                  <button
                    onClick={() => setDashboardOpen(!dashboardOpen)}
                    className="w-full text-left py-2 flex justify-between items-center"
                  >
                    My Account
                    <span>{dashboardOpen ? "▲" : "▼"}</span>
                  </button>
                  {dashboardOpen && (
                    <div className="ml-4 space-y-1 text-gray-600">
                      <button
                        onClick={() => handleDashboardClick("account")}
                        className="block w-full text-left py-1"
                      >
                        Account Settings
                      </button>
                      <button
                        onClick={() => handleDashboardClick("goals")}
                        className="block w-full text-left py-1"
                      >
                        My Goals
                      </button>

                      <button
                        onClick={() => handleDashboardClick("favorites")}
                        className="block w-full text-left py-1"
                      >
                        My Favorites
                      </button>
                      <button
                        onClick={() => handleDashboardClick("buy")}
                        className="block w-full text-left py-1"
                      >
                        Buy Orders
                      </button>
                      <button
                        onClick={() => handleDashboardClick("sell")}
                        className="block w-full text-left py-1"
                      >
                        List My Property
                      </button>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
