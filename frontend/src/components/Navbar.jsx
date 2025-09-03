import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { navConfig } from "../config/navConfig";

const Navbar = ({ scroller }) => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const role = user && user.role ? user.role : "public";
  const navItems = navConfig[role] || navConfig["public"];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNav = () => setNav(!nav);

  const handleItemClick = (item) => {
    setActiveTab(item.text);
    if (item.type === "scroll" && scroller?.[item.key]) {
      scroller[item.key](); // Scroll handler
    } else if (item.type === "route") {
      navigate(item.path);
    } else if (item.type === "logout") {
      dispatch(logout());
      navigate("/");
    } else if (item.type === "dropdown") {
      setDropdownOpen(dropdownOpen === item.id ? null : item.id);
      return; // Don't close mobile menu for dropdown
    }
    setNav(false); // close mobile menu
    setDropdownOpen(null); // close dropdown
  };

  const handleDropdownItemClick = (item) => {
    navigate(item.path);
    setNav(false);
    setDropdownOpen(null);
  };

  return (
    <div className="fixed top-2 left-1/2 transform -translate-x-1/2 w-[100%] sm:w-[90%] bg-white/30 backdrop-blur-md border-1 flex justify-between items-center h-12 sm:rounded-2xl px-4 text-white z-50">
      {/* Logo */}
      <h1
        className="w-full text-3xl font-bold text-[#00df9a] cursor-pointer"
        onClick={() => navigate("/")}
      >
        REACT.
      </h1>
      {/* Desktop Navigation */}
      <ul className="hidden md:flex justify-center items-center sm:gap-5 m-2" ref={dropdownRef}>
        {navItems.map((item) => (
          <li key={item.id} className="relative">
            <div
              onClick={() => handleItemClick(item)}
              className={`px-2 sm:px-8 py-2 rounded-xl whitespace-nowrap cursor-pointer duration-300 flex items-center gap-1
                ${
                  activeTab === item.text
                    ? "bg-[#00df9a] text-black from-neutral-50"
                    : "hover:bg-[#00df9a] hover:text-black"
                }`}
            >
              {item.text}
              {item.type === "dropdown" && <ChevronDown size={16} />}
            </div>
            
            {/* Dropdown Menu */}
            {item.type === "dropdown" && dropdownOpen === item.id && (
              <div className="absolute top-full left-0 mt-2 bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg min-w-[200px] z-50">
                {item.items.map((dropdownItem) => (
                  <div
                    key={dropdownItem.id}
                    onClick={() => handleDropdownItemClick(dropdownItem)}
                    className="px-4 py-3 text-gray-800 hover:bg-[#00df9a] hover:text-black cursor-pointer first:rounded-t-xl last:rounded-b-xl transition-colors duration-200"
                  >
                    {dropdownItem.text}
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden cursor-pointer">
        {nav ? <X size={20} /> : <Menu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[70%] h-screen border-r border-gray-800 bg-black/90 backdrop-blur-lg ease-in-out duration-500 z-40"
            : "ease-in-out w-[70%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {navItems.map((item) => (
          <li key={item.id}>
            <div
              onClick={() => handleItemClick(item)}
              className={`p-2 border-b cursor-pointer border-gray-600 duration-300 flex items-center justify-between
                ${
                  activeTab === item.text
                    ? "bg-[#00df9a] text-black font-semibold"
                    : "hover:bg-[#00df9a] hover:text-black"
                }`}
            >
              {item.text}
              {item.type === "dropdown" && <ChevronDown size={16} />}
            </div>
            
            {/* Mobile Dropdown Items */}
            {item.type === "dropdown" && dropdownOpen === item.id && (
              <div className="bg-gray-800/50">
                {item.items.map((dropdownItem) => (
                  <div
                    key={dropdownItem.id}
                    onClick={() => handleDropdownItemClick(dropdownItem)}
                    className="pl-6 pr-2 py-2 text-sm border-b border-gray-700 cursor-pointer hover:bg-[#00df9a] hover:text-black transition-colors duration-200"
                  >
                    {dropdownItem.text}
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
