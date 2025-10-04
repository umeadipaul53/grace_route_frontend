import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  // Simulated authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username] = useState("JohnDoe");
  const avatarUrl = "https://i.pravatar.cc/40?img=3"; // Placeholder avatar

  const dropdownRef = useRef();

  const toggleMobileMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top Header */}
      <div className="bg-green-950 text-gold text-sm">
        <div className="container mx-auto flex justify-between items-center px-6 py-2">
          {/* Contact Info */}
          <div className="flex space-x-6 text-gold-500">
            <a href="tel:+2348012345678" className="text-gold">
              📞 +234 801 234 5678
            </a>
            <a href="mailto:info@realestate.com" className="text-gold">
              ✉ info@realestate.com
            </a>
          </div>

          {/* Social Media */}
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" className="hover:text-gray-200">
              <Facebook size={18} />
            </a>
            <a href="#" className="hover:text-gray-200">
              <Twitter size={18} />
            </a>
            <a href="#" className="hover:text-gray-200">
              <Instagram size={18} />
            </a>
            <a href="#" className="hover:text-gray-200">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo-new-removebg-preview.png"
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

            {/* Services Dropdown */}
            <li className="relative group">
              <button className="hover:text-green-950">More ▼</button>
              <ul className="absolute left-0 mt-2 w-44 bg-white shadow-md rounded-lg opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition duration-200 ease-out pointer-events-none group-hover:pointer-events-auto">
                <li>
                  <Link
                    to="/services"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Our services
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
              <Link to="/buy">Buy</Link>
            </li>
            <li>
              <Link to="/sell">Sell</Link>
            </li>
            <li>
              <Link to="/contact-us">Contact Us</Link>
            </li>
          </ul>

          {/* Auth Buttons / Profile Dropdown */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-green-950"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-950 text-white px-4 py-2 rounded hover:bg-green-950"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={avatarUrl}
                    alt="User avatar"
                    className="w-9 h-9 rounded-full border border-gray-300"
                  />
                  <span className="text-gray-700 font-medium">{username}</span>
                  <span>▼</span>
                </button>

                {/* Animated Dropdown */}
                <div
                  className={`absolute right-0 mt-2 w-40 bg-white border rounded shadow-md transform transition-all duration-200 ease-in-out origin-top ${
                    dropdownOpen
                      ? "scale-100 opacity-100"
                      : "scale-95 opacity-0 pointer-events-none"
                  }`}
                >
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => setIsLoggedIn(false)}
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
            className="md:hidden text-gray-700 text-2xl focus:outline-none"
            onClick={toggleMobileMenu}
          >
            ☰
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 space-y-2 bg-white border-t border-gray-100 text-gray-700 font-medium">
            <Link to="/" className="block py-2">
              Home
            </Link>
            <Link to="/about-us" className="block py-2">
              About us
            </Link>

            {/* Mobile Services Dropdown */}
            <div>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="w-full text-left py-2 flex justify-between items-center"
              >
                More <span>{servicesOpen ? "▲" : "▼"}</span>
              </button>
              {servicesOpen && (
                <div className="ml-4 space-y-2">
                  <Link to="/services" className="block py-1">
                    Our services
                  </Link>
                  <Link to="/careers" className="block py-1">
                    Careers
                  </Link>
                  <Link to="/management" className="block py-1">
                    Management
                  </Link>
                  <Link to="/faq" className="block py-1">
                    FAQ
                  </Link>
                </div>
              )}
            </div>

            <Link to="/buy" className="block py-2">
              Buy
            </Link>
            <Link to="/sell" className="block py-2">
              Sell
            </Link>
            <Link to="/contact-us" className="block py-2">
              Contact Us
            </Link>

            {!isLoggedIn ? (
              <>
                <Link to="/login" className="block py-2">
                  Login
                </Link>
                <Link to="/signup" className="block py-2">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="block py-2">
                  Dashboard
                </Link>
                <button
                  onClick={() => setIsLoggedIn(false)}
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
