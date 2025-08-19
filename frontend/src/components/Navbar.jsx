import React, { useState } from 'react';
import { Menu, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Navbar = ({ scroller }) => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  const handleNav = () => {
    setNav(!nav);
  };

  const navItems = [
    { id: 1, text: 'Play', onClick: scroller[0] },
    { id: 2, text: 'Learn', onClick: scroller[1] },
    { id: 3, text: 'Shop', onClick: scroller[2] },
    { id: 4, text: 'Login', onClick: () => navigate('/login')}
  ];

  return (
    <div className="fixed top-2 left-1/2 transform -translate-x-1/2 w-[100%] sm:w-[90%] bg-white/30 backdrop-blur-md border-1 flex justify-between items-center h-12 sm:rounded-2xl px-4 text-white z-50">
      {/* Logo */}
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">REACT.</h1>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map(item => (
          <li
            key={item.id}
            onClick={() => {
              setActiveTab(item.text);
              item.onClick && item.onClick();
            }}
            className={`py-2 px-16 rounded-xl m-2 cursor-pointer duration-300 gap-5 
              ${activeTab === item.text ? "bg-[#00df9a] text-black font-semibold" : "hover:bg-[#00df9a] hover:text-black"}`}
          >
            {item.text}
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
        {/* Mobile Logo */}
        {/* <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">REACT.</h1> */}

        {/* Mobile Navigation Items */}
        {navItems.map(item => (
          <li
            key={item.id}
            onClick={() => {
              setActiveTab(item.text);
              item.onClick && item.onClick();
              setNav(false);
            }}
            className={`p-2 border-b rounded-xl cursor-pointer border-gray-600 duration-300 
              ${activeTab === item.text ? "bg-[#00df9a] text-black font-semibold" : "hover:bg-[#00df9a] hover:text-black"}`}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
