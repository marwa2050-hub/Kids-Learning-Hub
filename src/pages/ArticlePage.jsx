import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { articlesData } from "../data/articlesData";

export default function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const articleId = Number(id);
  const article = articlesData.find(a => a.id === articleId);

  if (!article) {
    return (
      <p className="text-center mt-10 text-white text-lg drop-shadow-lg">
        Article not found
      </p>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4 
                    bg-gradient-to-r from-[#ff4b4b] via-[#ff7a2a] to-[#fcd703]">
      
      <div className="max-w-5xl w-full bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">
        
        {/* Article Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">
            {article.title}
          </h1>
          <p className="text-sm md:text-base text-white/90 drop-shadow-md">
            📅 Published: {article.date} | ⏱️ Reading time: {article.readingTime} | 👨‍🏫 By {article.author}
          </p>
        </div>

        {/* Article Content */}
        <div className="text-white/90 text-sm md:text-base leading-relaxed space-y-6 px-2 md:px-6">
          {article.content.split('\n\n').map((section, idx) => {
            const firstLine = section.split('\n')[0].trim();

            // همه عنوان‌ها بزرگ
            const isMainTitle = firstLine.length > 0 && (
              firstLine.startsWith('🧠') ||
              firstLine.startsWith('🔬') ||
              firstLine.startsWith('🎯') ||
              firstLine.startsWith('🏠') ||
              firstLine.startsWith('📱') ||
              firstLine.startsWith('🚀') ||
              firstLine.startsWith('🌟') ||
              firstLine.startsWith('💫') ||
              firstLine.startsWith('🧩') ||
              firstLine.startsWith('Key Strategies:') ||
              firstLine.startsWith('📚 Monitoring Progress')
            );

            return (
              <div key={idx} className="space-y-2">
                {isMainTitle && (
                  <h2 className="text-xl md:text-2xl font-semibold text-yellow-100 drop-shadow-md">
                    {firstLine}
                  </h2>
                )}
                <p className="text-white/80 whitespace-pre-line">
                  {isMainTitle ? section.split('\n').slice(1).join('\n') : section}
                </p>
              </div>
            );
          })}
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/blog-en")}
            className="px-6 py-3 bg-white/80 text-gray-800 font-semibold rounded-full shadow-lg hover:scale-105 hover:bg-white transition-all"
          >
            🔙 Back to Blog
          </button>
        </div>
      </div>
    </div>
  );
}
