import React from "react";
import { useNavigate } from "react-router-dom";
import { articlesData } from "../data/articlesData";

export default function BlogEnglish() {
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
          <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-md">📚 Educational Blog</h1>
          <p className="text-white/90 text-base md:text-lg mt-3">
            Explore our latest articles and tips for enhancing children's learning journey.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articlesData.map((article, index) => {
            const bgColor = darkenColor(colors[index % colors.length]);
            return (
              <div
                key={article.id}
                className="rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition transform overflow-hidden flex flex-col justify-between min-h-[280px]"
                style={{ backgroundColor: bgColor }}
              >
                <div className="p-6">
                  <h2 className="text-lg md:text-xl font-bold text-white drop-shadow">{article.title}</h2>
                  <p className="text-xs md:text-sm mt-1 text-white/90 drop-shadow">📅 {article.date} • ⏱️ {article.readingTime}</p>
                </div>
                <div className="p-6 flex flex-col justify-between flex-1">
                  <p className="text-white/90 text-sm md:text-base">
                    {article.content.split('\n\n')[0]} {/* بخش اول مقاله به عنوان توضیح کوتاه */}
                  </p>
                  <button
                    onClick={() => navigate(`/article/en/${article.id}`)}
                    className="mt-4 px-6 py-3 bg-white text-gray-800 font-semibold rounded-full shadow-md hover:scale-105 transition"
                  >
                    Read Article
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
            className="px-6 py-3 bg-white text-gray-800 rounded-full shadow-md hover:scale-105 transition"
          >
            🔙 Back to Learning Hub
          </button>
        </div>

      </div>
    </div>
  );
}
