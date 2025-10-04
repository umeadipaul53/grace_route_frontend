import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-950 text-gold pt-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo & Brand Info */}
        <div>
          <h4 className="text-2xl font-bold text-white">Grace Route Limited</h4>
          <p className="mt-3 text-sm text-white">
            Real estate development & marketing company with a passion for
            quality, integrity, and results.
          </p>
          <p className="mt-4 text-xs text-gray-400">
            Mon — Fri: 9:00 AM — 6:00 PM
          </p>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Quick links">
          <h5 className="text-lg font-semibold text-white mb-4">Quick Links</h5>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/"
                className="hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/properties"
                className="hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
              >
                Properties
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/client-login"
                className="hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
              >
                Client Login
              </a>
            </li>
          </ul>
        </nav>

        {/* Help Column */}
        <div aria-labelledby="help-heading">
          <h5
            id="help-heading"
            className="text-lg font-semibold text-white mb-4"
          >
            Help
          </h5>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="/faq"
                className="flex items-center gap-2 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
              >
                {/* small question icon */}
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm.75 15h-1.5v-1.5h1.5V17zm1.73-7.03c-.17.52-.76 1.16-1.48 1.62-.46.31-.75.57-.92.85-.12.19-.18.4-.18.66v.3h-1.5v-.3c0-.58.23-1.1.66-1.6.45-.52 1.12-.95 1.77-1.38.61-.41.9-.82.9-1.25 0-.64-.52-1.15-1.15-1.15-.63 0-1.15.51-1.15 1.15H9.6c0-1.5 1.23-2.65 2.75-2.65 1.52 0 2.75 1.15 2.75 2.65 0 .6-.2 1.15-.62 1.8z" />
                </svg>
                FAQ
              </a>
            </li>
            <li>
              <a
                href="/docs"
                className="flex items-center gap-2 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
              >
                {/* docs icon */}
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                </svg>
                Documentation
              </a>
            </li>
            <li>
              <a
                href="#livechat"
                className="flex items-center gap-2 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
              >
                {/* chat icon */}
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20 2H4a2 2 0 00-2 2v16l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z" />
                </svg>
                Live Chat
              </a>
            </li>
            <li>
              <a
                href="mailto:support@mshelhomes.com"
                className="flex items-center gap-2 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
              >
                {/* ticket icon */}
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4 4h16v4H4V4zm0 6h16v10H4V10zm8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                Submit a Ticket
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h5 className="text-lg font-semibold text-white mb-4">Contact Us</h5>
          <address className="not-italic text-sm">
            2 Julius Adelusi Street
            <br />
            Guzape, Abuja
          </address>
          <p className="mt-2 text-sm">
            Email:{" "}
            <a href="mailto:info@mshelhomes.com" className="hover:text-white">
              info@mshelhomes.com
            </a>
          </p>
          <p className="text-sm mt-1">
            Phone:{" "}
            <a href="tel:+2348012345678" className="hover:text-white">
              +234 801 234 5678
            </a>
          </p>

          <div className="mt-4 flex space-x-4">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="hover:text-white"
            >
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M22 12a10 10 0 10-11.47 9.95v-7.05h-2.3V12h2.3v-1.7c0-2.27 1.36-3.52 3.44-3.52.995 0 2.03.18 2.03.18v2.23h-1.14c-1.12 0-1.46.693-1.46 1.4V12h2.49l-.4 2.9h-2.09v7.05A10 10 0 0022 12z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              className="hover:text-white"
            >
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M24 4.56a9.83 9.83 0 01-2.828.775 4.94 4.94 0 002.165-2.723 9.864 9.864 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.48A13.96 13.96 0 011.67 3.15a4.92 4.92 0 001.524 6.56 4.9 4.9 0 01-2.23-.616v.06a4.92 4.92 0 003.95 4.82 4.9 4.9 0 01-2.224.085 4.92 4.92 0 004.59 3.41 9.87 9.87 0 01-6.102 2.104c-.396 0-.787-.023-1.175-.07a13.94 13.94 0 007.557 2.212c9.054 0 14.007-7.496 14.007-13.986 0-.213-.005-.425-.014-.636A10.01 10.01 0 0024 4.56z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="hover:text-white"
            >
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.338 3.608 1.312.975.975 1.25 2.243 1.312 3.608.058 1.267.07 1.647.07 4.85s-.012 3.584-.07 4.85c-.062 1.365-.338 2.633-1.312 3.608-.975.975-2.243 1.25-3.608 1.312-1.267.058-1.647.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.338-3.608-1.312-.975-.975-1.25-2.243-1.312-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.338-2.633 1.312-3.608.975-.975 2.243-1.25 3.608-1.312C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.736 0 8.332.012 7.053.072 5.772.131 4.61.438 3.632 1.416 2.655 2.394 2.348 3.556 2.289 4.837 2.229 6.116 2.217 6.52 2.217 12s.012 5.884.072 7.163c.059 1.281.366 2.443 1.344 3.421.978.978 2.14 1.285 3.421 1.344 1.279.06 1.684.072 7.163.072s5.884-.012 7.163-.072c1.281-.059 2.443-.366 3.421-1.344.978-.978 1.285-2.14 1.344-3.421.06-1.279.072-1.684.072-7.163s-.012-5.884-.072-7.163c-.059-1.281-.366-2.443-1.344-3.421C19.443.438 18.281.131 17 .072 15.736.012 15.332 0 12 0zM12 5.838a6.163 6.163 0 100 12.326 6.163 6.163 0 000-12.326zm0 10.163a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-800 pt-4 pb-6 text-center text-sm text-gold">
        © {new Date().getFullYear()} Grace Route Real Estate Company Limited.
        All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
