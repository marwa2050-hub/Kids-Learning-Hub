// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ children, onMenuToggle }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Dashboard", path: "/" },
    { label: "Stories", path: "/stories" },
    { label: "Games", path: "/games" },
    { label: "Contact", path: "/contact" },
  ];

  // اطلاع دادن وضعیت منو به والد
  useEffect(() => {
    if (onMenuToggle) onMenuToggle(menuOpen);
  }, [menuOpen, onMenuToggle]);

  return (
    <>
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2
                      w-[95%] max-w-6xl z-50
                      rounded-2xl overflow-hidden
                      shadow-2xl border border-white/20
                      flex flex-col md:flex-row justify-between items-center
                      p-3">
        {/* گرادیان اصلی */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#d33f3f] via-[#d36423] to-[#e0ba00]"></div>

        {/* لوگو */}
        <div
          className="relative z-10 text-white font-bold text-xl md:text-2xl drop-shadow-lg cursor-pointer"
          onClick={() => navigate("/")}
        >
          Kids Hub
        </div>

        {/* لینک‌های دسکتاپ */}
        <div className="relative z-10 hidden md:flex items-center gap-4">
          {links.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className="text-white drop-shadow-lg text-sm md:text-base font-medium
                         px-3 py-1 rounded-lg hover:bg-white/25 transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* منوی موبایل */}
        <div className="relative z-10 md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white drop-shadow-lg text-2xl focus:outline-none hover:scale-110 transition-transform duration-200"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* منوی موبایل باز شده */}
        {menuOpen && (
          <div className="relative md:hidden mt-2 w-full
                          bg-gradient-to-r from-[#d33f3f] via-[#d36423] to-[#e0ba00] bg-opacity-95
                          backdrop-blur-lg flex flex-col items-center gap-2 py-3
                          border-t border-white/20 z-50">
            {links.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setMenuOpen(false);
                }}
                className="text-white drop-shadow-lg text-base font-medium px-4 py-2 rounded-lg
                           hover:bg-white/25 transition-colors duration-200 w-11/12 text-center"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Wrapper برای پایین بردن محتوای صفحه وقتی منو باز است */}
      <div className={`transition-all duration-300 ${menuOpen ? "pt-[220px] md:pt-0" : "pt-0"}`}>
        {children}
      </div>
    </>
  );
}
