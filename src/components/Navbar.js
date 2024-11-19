import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Globe,
  Search,
  Bell,
  Sun,
  Moon,
  TrendingUp,
} from "lucide-react";

const Navbar = ({ countryChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { title: "General", path: "/", icon: TrendingUp },
    { title: "Business", path: "/business" },
    { title: "Entertainment", path: "/entertainment" },
    { title: "Health", path: "/health" },
    { title: "Science", path: "/science" },
    { title: "Sports", path: "/sport" },
    { title: "Technology", path: "/tech" },
  ];

  const countries = [
    { code: "us", name: "USA", flag: "🇺🇸" },
    { code: "in", name: "India", flag: "🇮🇳" },
    { code: "au", name: "Australia", flag: "🇦🇺" },
    { code: "cn", name: "China", flag: "🇨🇳" },
    { code: "ae", name: "UAE", flag: "🇦🇪" },
    { code: "gb", name: "UK", flag: "🇬🇧" },
    { code: "de", name: "Germany", flag: "🇩🇪" },
  ];

  const toggleTheme = () => {
    setIsDark(!isDark);
    // Add your theme toggle logic here
  };

  return (
    <div className={`fixed top-0 w-full z-50 ${isDark ? "dark" : ""}`}>
      {/* Breaking News Banner */}
      <div className="bg-blue-600 text-white py-1 px-4 text-center text-sm font-medium hidden lg:block">
        <div className="animate-marquee whitespace-nowrap">
          🔥 Breaking News: Latest updates and top stories from around the world
        </div>
      </div>

      <nav
        className={`transition-all duration-300 border-b ${
          scrolled
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg"
            : "bg-gradient-to-r from-blue-900 to-blue-800 dark:from-gray-900 dark:to-gray-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2 group">
                <span
                  className={`flex items-center transition-all duration-300 ${
                    scrolled ? "text-blue-900 dark:text-white" : "text-white"
                  }`}
                >
                  <span className="text-2xl font-black group-hover:scale-105 transition-transform duration-300">
                    NEWS
                  </span>
                  <span className="text-2xl text-blue-500 font-black ml-1 relative">
                    FATAFAT
                    <span className="absolute -top-1 -right-2 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                  </span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-center space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 relative group flex items-center space-x-1
                      ${
                        location.pathname === item.path
                          ? scrolled
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-white bg-white/10"
                          : scrolled
                          ? "text-gray-600 dark:text-gray-300"
                          : "text-gray-300"
                      }
                      hover:text-blue-500 dark:hover:text-blue-400`}
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    <span>{item.title}</span>
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100
                      ${location.pathname === item.path ? "scale-x-100" : ""}`}
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Section */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Search */}
              <div className="relative group">
                <div
                  className={`flex items-center space-x-2 ${
                    scrolled
                      ? "text-gray-600 dark:text-gray-300"
                      : "text-gray-300"
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Search news..."
                    className="w-0 group-hover:w-40 transition-all duration-300 bg-transparent border-b border-transparent group-hover:border-gray-300 focus:outline-none focus:border-blue-500 px-2"
                  />
                  <Search className="h-5 w-5 hover:text-blue-500 cursor-pointer transition-colors duration-300" />
                </div>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotification(!showNotification)}
                  className={`relative ${
                    scrolled
                      ? "text-gray-600 dark:text-gray-300"
                      : "text-gray-300"
                  } hover:text-blue-500 transition-colors duration-300`}
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                </button>

                {showNotification && (
                  <div className="absolute right-0 mt-2 w-80 rounded-lg shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 transform transition-all duration-200">
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                        Notifications
                      </h3>
                      <div className="space-y-2">
                        {[1, 2].map((i) => (
                          <div
                            key={i}
                            className="flex items-start space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                          >
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                              <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-800 dark:text-gray-200">
                                Breaking news alert
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                2 minutes ago
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`${
                  scrolled
                    ? "text-gray-600 dark:text-gray-300"
                    : "text-gray-300"
                } hover:text-blue-500 transition-colors duration-300`}
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              {/* Country Selector */}
              <div className="relative">
                <div
                  className={`flex items-center cursor-pointer space-x-2 ${
                    scrolled
                      ? "text-gray-600 dark:text-gray-300"
                      : "text-gray-300"
                  } hover:text-blue-500 transition-colors duration-300`}
                  onClick={() => setIsCountryOpen(!isCountryOpen)}
                >
                  <Globe className="h-5 w-5" />
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      isCountryOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {isCountryOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 transform transition-all duration-200">
                    <div className="py-1" role="menu">
                      {countries.map((country) => (
                        <button
                          key={country.code}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2"
                          onClick={() => {
                            countryChange(country.code);
                            setIsCountryOpen(false);
                          }}
                        >
                          <span>{country.flag}</span>
                          <span>{country.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md ${
                  scrolled
                    ? "text-gray-600 dark:text-gray-300"
                    : "text-gray-300"
                } hover:text-blue-500 focus:outline-none transition-colors duration-300`}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden ${
            scrolled
              ? "bg-white dark:bg-gray-900"
              : "bg-blue-900 dark:bg-gray-800"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  scrolled
                    ? "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600"
                    : "text-gray-300 hover:bg-blue-800 hover:text-white"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.title}</span>
              </Link>
            ))}

            <hr className="border-gray-200 dark:border-gray-700" />

            <div className="flex items-center justify-between px-3 py-2">
              <button
                onClick={toggleTheme}
                className={`${
                  scrolled
                    ? "text-gray-600 dark:text-gray-300"
                    : "text-gray-300"
                } hover:text-blue-500 transition-colors duration-300`}
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              <select
                onChange={(e) => countryChange(e.target.value)}
                className={`flex-1 ml-4 px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  scrolled
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    : "bg-blue-800 text-white"
                }`}
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
