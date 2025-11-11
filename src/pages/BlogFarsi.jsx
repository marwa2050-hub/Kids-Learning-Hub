import React from "react";
import { useNavigate } from "react-router-dom";
import { articlesDataFa } from "../data/articlesDataFa";

export default function BlogFarsi() {
  const navigate = useNavigate();

  const colors = [
    "#ff4b4b", "#4b9aff", "#00c85a", "#ff7a2a",
    "#fcd703", "#8b5cf6", "#f472b6", "#22d3ee"
  ];

  const darkenColor = (color) => {
    const shade = { "#ff7a2a": "#e06a21", "#fcd703": "#d4b800" };
    return shade[color] || color;
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-r from-[#ff4b4b] via-[#ff7a2a] to-[#fcd703] bg-opacity-90">
      <div className="max-w-6xl w-full space-y-10">

        {/* Header */}
        <div className="bg-white/30 backdrop-blur-md rounded-3xl shadow-lg p-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-md">
            📚 <strong>بلاگ آموزشی</strong>
          </h1>
          <p className="text-white/90 text-base md:text-lg mt-3 font-bold">
            <strong>جدیدترین مقالات و نکات برای تقویت مسیر یادگیری کودکان</strong>
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articlesDataFa.map((article, index) => {
            const bgColor = darkenColor(colors[index % colors.length]);
            return (
              <div
                key={article.id}
                className="rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition transform overflow-hidden flex flex-col justify-between min-h-[280px]"
                style={{ backgroundColor: bgColor }}
              >
                <div className="p-6 text-right" dir="rtl" style={{ fontFamily: "'Vazir', sans-serif" }}>
                  {/* Title */}
                  <h2 className="text-lg md:text-xl font-extrabold text-white drop-shadow mb-2 leading-tight">
                    <strong>{article.title}</strong>
                  </h2>

                  {/* Date & Reading Time */}
                  <p className="text-xs md:text-sm text-white/90 drop-shadow mb-6 leading-snug font-bold">
                    📅 <strong>{article.date}</strong> ⏱️ <strong>{article.readingTime}</strong>
                  </p>

                  {/* Short Description */}
                  <p className="text-white/90 text-sm md:text-base font-bold line-clamp-6 leading-relaxed mt-2">
                    <strong>{article.summary}</strong>
                  </p>
                </div>

                {/* Read Article Button */}
                <div className="p-6 flex justify-center">
                  <button
                    onClick={() => navigate(`/article/fa/${article.id}`)}
                    className="w-full px-6 py-3 bg-white text-gray-800 font-bold rounded-full shadow-md hover:scale-105 transition text-center"
                  >
                    <strong>مطالعه مقاله</strong>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Back Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-white text-gray-800 font-bold rounded-full shadow-md hover:scale-105 transition"
          >
            🔙 <strong>بازگشت به مرکز یادگیری</strong>
          </button>
        </div>

      </div>
    </div>
  );
}
