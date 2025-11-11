// src/pages/StoriesPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";

import sideLeftImg from "../assets/side-left.png";
import sideRightImg from "../assets/side-right.png";
import storySticker from "../assets/story-sticker.png";

export default function StoriesPage({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const [storiesList, setStoriesList] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [cardsPerRow, setCardsPerRow] = useState(3);
  const [menuOpen, setMenuOpen] = useState(false);

  const WORKER_URL =
    "https://kids-learning-hub-api.marwanurestani.workers.dev/stories";

  useEffect(() => {
    fetchStories();
    const interval = setInterval(fetchStories, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchStories = async () => {
    try {
      const res = await fetch(WORKER_URL);
      const data = await res.json();
      if (Array.isArray(data)) setStoriesList(data);
      else setStoriesList([]);
    } catch (err) {
      console.error(err);
      setStoriesList([]);
    }
  };

  const normalizeStoryLang = (raw) => {
    if (!raw) return null;
    if (typeof raw === "object") {
      const moralText =
        (raw.moral && language !== "en" ? raw.moral.replace(/\./g, "") : raw.moral) || "";
      const summaryText =
        raw.summary && language !== "en" ? raw.summary.replace(/\./g, "") : raw.summary;
      const fullText =
        raw.fullStory && language !== "en" ? raw.fullStory.replace(/\./g, "") : raw.fullStory;

      return {
        title: raw.title || "Untitled Story",
        summary: summaryText || fullText?.slice(0, 120) || "No preview available...",
        fullStory: fullText || "",
        moral: moralText,
        readTime: raw.readTime || "5 min read",
        age: raw.age || null,
        sticker: raw.sticker || null,
      };
    }
    if (typeof raw === "string") {
      try {
        const parsed = JSON.parse(raw);
        return normalizeStoryLang(parsed);
      } catch {
        const lines = raw
          .split(/\r?\n/)
          .map((l) => l.trim())
          .filter(Boolean);
        const title = lines[0] || "Untitled Story";
        let summary = lines.slice(1, 3).join(" ").slice(0, 140);

        if (language !== "en") summary = summary.replace(/\./g, "");

        return {
          title,
          summary,
          fullStory: language !== "en" ? raw.replace(/\./g, "") : raw,
          moral: "",
          readTime: "5 min read",
        };
      }
    }
    return null;
  };

  const getNormalized = (story, lang) => {
    const raw = story?.stories?.[lang];
    return (
      normalizeStoryLang(raw) || {
        title: "Untitled Story",
        summary: "No preview available...",
        fullStory: "",
        moral: "",
        readTime: "5 min read",
      }
    );
  };

  const gradients = [
    ["#ec4899", "#ef4444"],
    ["#a78bfa", "#ec4899"],
    ["#22c55e", "#84cc16"],
    ["#60a5fa", "#06b6d4"],
    ["#facc15", "#f97316"],
    ["#6366f1", "#a78bfa"],
  ];

  const clampStyle = {
    display: "-webkit-box",
    WebkitLineClamp: 5,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };

  const handleCardClick = (e, storyIndex) => {
    const card = e.currentTarget;
    const cardRect = card.getBoundingClientRect();
    const rowIndex = Math.floor(storyIndex / cardsPerRow);
    const rowStartIndex = rowIndex * cardsPerRow;
    const rowEndIndex = Math.min(rowStartIndex + cardsPerRow, storiesList.length);

    const rowCards = Array.from(card.parentNode.children).slice(
      rowStartIndex,
      rowEndIndex
    );

    const rowRect = {
      top: rowCards[0].getBoundingClientRect().top,
      left: rowCards[0].getBoundingClientRect().left,
      width:
        rowCards.reduce((w, c) => w + c.getBoundingClientRect().width, 0) +
        (rowCards.length - 1) * 24,
    };

    setSelectedStory({
      ...storiesList[storyIndex],
      rowTop: rowRect.top + window.scrollY - 10,
      rowLeft: rowRect.left + rowRect.width / 2 + window.scrollX,
      rowWidth: rowRect.width * 0.9,
      gradient: gradients[storyIndex % gradients.length],
    });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center p-6
                    bg-gradient-to-r from-[#ff4b4b] via-[#ff7a2a] to-[#fcd703]
                    bg-opacity-100 backdrop-blur-xl transition-colors duration-500">

      {/* Side Images */}
      <img
        src={sideLeftImg}
        alt=""
        className={`absolute left-[-0px] sm:left-0 md:left-8 
                    w-36 sm:w-44 md:w-64 
                    opacity-50 pointer-events-none z-0
                    transition-all duration-300
                    ${menuOpen
                      ? "top-[31rem] sm:top-[31rem] md:top-38"
                      : "top-[17rem] sm:top-[17rem] md:top-36"
                    }`}
      />
      <img
        src={sideRightImg}
        alt=""
        className={`absolute right-[-0px] sm:right-0 md:right-8 
                    w-36 sm:w-44 md:w-64 
                    opacity-50 pointer-events-none z-0
                    transition-all duration-300
                    ${menuOpen
                      ? "top-[31rem] sm:top-[31rem] md:top-38"
                      : "top-[17rem] sm:top-[17rem] md:top-36"
                    }`}
      />

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onMenuToggle={(open) => setMenuOpen(open)}
      />

      {/* Main Content */}
      <div className="flex flex-col items-center text-center w-full max-w-6xl space-y-8 mt-24 md:mt-36 lg:mt-40">
        {/* Title + Subtitle + Sticker */}
        <div className="flex flex-col items-center gap-3 mb-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-white drop-shadow-md">
            {language === "en"
              ? "Amazing Stories for Kids"
              : language === "fa"
              ? "داستان‌های شگفت‌انگیز برای کودکان"
              : "حیرانوونکې کیسې د ماشومانو لپاره"}
          </h1>
          <p className="text-lg md:text-xl text-white/90 w-full max-w-[700px] mx-auto mt-4">
            {language === "fa"
              ? "صدها داستان آموزشی به زبان‌های انگلیسی، فارسی و پشتو برای یادگیری ارزش‌ها و مهارت‌ها"
              : language === "ps"
              ? "په انګلیسي، فارسي او پښتو کې سلګونه تعلیمي کیسې د مهارتونو او ارزښتونو د زده کړې لپاره"
              : "Explore hundreds of educational stories in English, Farsi, and Pashto."}
          </p>
          <img
            src={storySticker}
            alt="Story Sticker"
            className="w-36 h-36 md:w-44 md:h-44 mt-6 drop-shadow-md"
          />
        </div>

        {/* Language Buttons */}
        <div className="flex gap-4 mt-2 mb-6">
          <button
            onClick={() => setLanguage("en")}
            className={`px-5 py-2 rounded-full font-bold text-white shadow-md hover:scale-110 transition-all ${
              language === "en"
                ? "bg-gradient-to-r from-red-500 to-pink-500"
                : "bg-red-400/80"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage("fa")}
            className={`px-5 py-2 rounded-full font-bold text-white shadow-md hover:scale-110 transition-all ${
              language === "fa"
                ? "bg-gradient-to-r from-green-500 to-lime-500"
                : "bg-green-400/80"
            }`}
          >
            فارسی
          </button>
          <button
            onClick={() => setLanguage("ps")}
            className={`px-5 py-2 rounded-full font-bold text-white shadow-md hover:scale-110 transition-all ${
              language === "ps"
                ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                : "bg-blue-400/80"
            }`}
          >
            پښتو
          </button>
        </div>

        {/* Story Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mt-8">
          {storiesList.length === 0 ? (
            <p className="text-black mt-4">No stories yet.</p>
          ) : (
            storiesList.map((story, index) => {
              const s = getNormalized(story, language);
              const cleanTitle = (s.title || "").replace(/^Title:\s*/i, "").trim();
              return (
                <div
                  key={story.id}
                  onClick={(e) => handleCardClick(e, index)}
                  className={`cursor-pointer rounded-2xl shadow-lg p-8 flex flex-col justify-between items-start
                              min-h-[300px] max-h-[380px] overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 text-white`}
                  style={{
                    background: `linear-gradient(to right, ${gradients[index % gradients.length][0]}, ${gradients[index % gradients.length][1]})`,
                  }}
                >
                  <div className="text-sm opacity-90 mb-2 flex items-center gap-3 w-full">
                    <span className="text-3xl">{story.sticker || "📘"}</span>
                    <span className="text-sm capitalize">
                      {language === "fa"
                        ? "فارسی"
                        : language === "ps"
                        ? "پښتو"
                        : "English"}
                    </span>
                    <span className="ml-auto text-sm">{s.readTime}</span>
                  </div>
                  <h4 className="text-lg md:text-2xl font-bold mb-3 w-full">{cleanTitle}</h4>
                  <div style={{ height: 110 }} className="w-full mb-4">
                    <p style={clampStyle} className="text-sm md:text-base leading-relaxed">
                      {s.summary}
                    </p>
                  </div>
                  <div className="text-sm opacity-95 mb-3">
                    {language === "fa"
                      ? `نتیجه: ${s.moral || "—"}`
                      : language === "ps"
                      ? `اخلاق: ${s.moral || "—"}`
                      : `Moral: ${s.moral || "—"}`}
                  </div>
                  <button className="mt-auto w-full py-3 bg-white/30 text-white font-bold rounded-xl hover:brightness-110 transition text-sm md:text-base">
                    {language === "fa"
                      ? "مطالعه کامل →"
                      : language === "ps"
                      ? "بشپړ لوستل →"
                      : "Read Full →"}
                  </button>
                </div>
              );
            })
          )}
        </div>
{/* Story Popup */}
{selectedStory && (
  <div
    className="absolute z-50 transition-all duration-300"
    style={{
      top: selectedStory.rowTop,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <div
      className="rounded-2xl p-4 sm:p-6 shadow-lg text-white overflow-auto"
      style={{
        width:
          window.innerWidth < 480
            ? "90vw"
            : window.innerWidth < 768
            ? "85vw"
            : window.innerWidth < 1024
            ? "75vw"
            : `${selectedStory.rowWidth}px`,
        background: `linear-gradient(to right, ${selectedStory.gradient[0]}, ${selectedStory.gradient[1]})`,
        maxHeight: "80vh",
      }}
    >
      {/* Close Button */}
      <button
        onClick={() => setSelectedStory(null)}
        className="mb-3 text-red-200 font-bold text-lg"
      >
        ✖
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <span
          className={`text-sm opacity-90 ${
            language === "fa" || language === "ps" ? "font-bold" : ""
          }`}
        >
          {language === "fa"
            ? "فارسی"
            : language === "ps"
            ? "پښتو"
            : "English"}
        </span>

        <h2 className="text-xl sm:text-2xl font-bold text-center break-words">
          {getNormalized(selectedStory, language).title}
        </h2>

        <span className="text-3xl sm:text-4xl">
          {selectedStory.sticker || "📘"}
        </span>
      </div>

      {/* Story Text */}
      <div
        className={`mb-4 whitespace-pre-line break-words text-sm md:text-base leading-relaxed ${
          language === "fa" || language === "ps" ? "font-bold" : ""
        }`}
      >
        {getNormalized(selectedStory, language).fullStory}
      </div>

      {/* Moral */}
      <p
        className={`mt-3 ${
          language === "fa" || language === "ps" ? "font-bold" : ""
        }`}
      >
        {language === "fa"
          ? `نتیجه داستان: ${
              getNormalized(selectedStory, language).moral || "—"
            }`
          : language === "ps"
          ? `اخلاق کیسه: ${
              getNormalized(selectedStory, language).moral || "—"
            }`
          : `Moral of the Story: ${
              getNormalized(selectedStory, language).moral || "—"
            }`}
      </p>

      <p className="text-xs text-white/80 mt-3">
        Created at: {new Date(selectedStory.createdAt).toLocaleString()}
      </p>
    </div>
  </div>
)}     
        

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-8 mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 hover:scale-105 hover:brightness-110 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
        >
          {language === "en"
            ? "⬅ Back to Dashboard"
            : language === "fa"
            ? "⬅ بازگشت به داشبورد"
            : "⬅ بیرته ډشبورډ ته"}
        </button>
      </div>
    </div>
  );
}
