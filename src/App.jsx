import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";

// Pages
import Dashboard from "./pages/Dashboard";
import GamesPage from "./pages/GamesPage";
import GamePage from "./pages/GamePage";
import StoriesPage from "./pages/StoriesPage";

// Blogs
import BlogEnglish from "./pages/BlogEnglish";
import BlogFarsi from "./pages/BlogFarsi";
import BlogPashto from "./pages/BlogPashto";

// Articles
import ArticlePage from "./pages/ArticlePage";
import ArticlePageFa from "./pages/ArticlePageFa";
import ArticlePagePs from "./pages/ArticlePagePs";

// Components
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <LanguageProvider>
      <div className="min-h-screen w-full transition-colors duration-500 text-white flex flex-col">
        <Routes>
          <Route
            path="/"
            element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/games"
            element={<GamesPage darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/game/:id"
            element={<GamePage darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/stories"
            element={<StoriesPage darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          {/* Blogs */}
          <Route path="/blog-en" element={<BlogEnglish />} />
          <Route path="/blog-fa" element={<BlogFarsi />} />
          <Route path="/blog-ps" element={<BlogPashto />} />

          {/* Articles */}
          <Route path="/article/en/:id" element={<ArticlePage />} />
          <Route path="/article/fa/:id" element={<ArticlePageFa />} />
          <Route path="/article/ps/:id" element={<ArticlePagePs />} />

          {/* Other Pages */}
          <Route
            path="/privacy"
            element={<PrivacyPolicy darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/terms"
            element={<TermsOfService darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/about"
            element={<AboutUs darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/contact"
            element={<ContactUs darkMode={darkMode} setDarkMode={setDarkMode} />}
          />
        </Routes>
      </div>
    </LanguageProvider>
  );
}

export default App;
