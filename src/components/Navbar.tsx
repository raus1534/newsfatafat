import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Globe,
  Search,
  // Bell,
  Sun,
  Moon,
  TrendingUp,
} from "lucide-react";
import { Country, NavbarProps, NavItem } from "../types";

const Navbar: React.FC<NavbarProps> = ({ countryChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCountryOpen, setIsCountryOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        isCountryOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCountryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    setIsOpen(false);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCountryOpen]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const navItems: NavItem[] = [
    { title: "General", path: "/", icon: TrendingUp },
    { title: "Business", path: "/business" },
    { title: "Entertainment", path: "/entertainment" },
    { title: "Health", path: "/health" },
    { title: "Science", path: "/science" },
    { title: "Sports", path: "/sport" },
    { title: "Technology", path: "/tech" },
  ];

  const countries: Country[] = [
    { code: "us", name: "EN", flag: "🇺🇸" },
    { code: "np", name: "नेपा", flag: "🇳🇵" },
  ];

  return (
    <div className="z-40 w-full">
      <div className="hidden px-4 py-1 text-sm font-medium text-center text-white bg-blue-600 lg:block">
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
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2 group">
                <span
                  className={`flex items-center transition-all duration-300 ${
                    scrolled ? "text-blue-900 dark:text-white" : "text-white"
                  }`}
                >
                  <span className="text-xl font-black transition-transform duration-300 sm:text-2xl group-hover:scale-105">
                    NEWS
                  </span>
                  <span className="relative ml-1 text-xl font-black text-blue-500 sm:text-2xl">
                    FATAFAT
                    <span className="absolute flex w-2 h-2 -top-1 -right-2">
                      <span className="absolute inline-flex w-full h-full bg-blue-400 rounded-full opacity-75 animate-ping"></span>
                      <span className="relative inline-flex w-2 h-2 bg-blue-500 rounded-full"></span>
                    </span>
                  </span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="items-center hidden space-x-4 xl:flex">
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
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span>{item.title}</span>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100
                      ${location.pathname === item.path ? "scale-x-100" : ""}`}
                  />
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-1 md:space-x-4">
              {/* Search */}
              <div
                className="relative flex items-center group"
                onMouseEnter={() => setShowSearch(true)}
                onMouseLeave={() => {
                  if (search.length) return;
                  setShowSearch(false);
                }}
              >
                <div
                  className={`transition-all duration-300 flex items-center ${
                    scrolled
                      ? "text-gray-600 dark:text-gray-300"
                      : "text-gray-300"
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Search news..."
                    className={`absolute left-0 -top-1 transition-all duration-300 border-b border-transparent focus:outline-none focus:border-blue-500 text-black bg-white ${
                      showSearch
                        ? "w-40 border-gray-300 z-50 py-0.5 pl-2 rounded"
                        : "w-0"
                    }`}
                    value={search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setSearch(e.target.value);
                    }}
                  />

                  <Search className="w-5 h-5 transition-colors duration-300 cursor-pointer hover:text-blue-500" />
                </div>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`sm:p-2 p-1 rounded-lg ${
                  scrolled
                    ? "text-gray-600 dark:text-gray-300"
                    : "text-gray-300"
                } hover:text-blue-500 transition-colors duration-300`}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* Country Selector */}
              <div className="relative" ref={dropdownRef}>
                <div
                  className={`flex items-center cursor-pointer sm:space-x-2 space-x-0 ${
                    scrolled
                      ? "text-gray-600 dark:text-gray-300"
                      : "text-gray-300"
                  }`}
                  onClick={() => setIsCountryOpen(!isCountryOpen)}
                >
                  <Globe className="w-5 h-5" />
                  <ChevronDown className="w-4 h-4" />
                </div>

                {isCountryOpen && (
                  <div className="absolute right-0 z-50 w-20 mt-2 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                    <div className="overflow-y-auto max-h-48">
                      {countries.map((country) => (
                        <div
                          key={country.code}
                          onClick={() => {
                            countryChange(country.code);
                            setIsCountryOpen(false);
                          }}
                          className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white dark:text-gray-800"
                        >
                          <span className="text-sm">
                            {country.flag} {country.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Hamburger Menu for Mobile */}
              <div className="xl:hidden">
                <button
                  className="p-2 text-gray-300 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } xl:hidden transition-all duration-300`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 items-center py-2 text-base flex space-x-2 font-medium rounded-md 
          ${
            location.pathname === item.path
              ? "bg-blue-500 text-white"
              : "text-gray-300 hover:text-gray-900 hover:bg-blue-500"
          }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span>{item.title}</span>
                  {item.icon && <item.icon className="w-4 h-4" />}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
