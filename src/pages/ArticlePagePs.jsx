import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { articlesDataPs } from "../data/articlesDataPs";

export default function ArticlePagePs() {
  const { id } = useParams();
  const navigate = useNavigate();

  const articleId = Number(id);
  const article = articlesDataPs.find(a => a.id === articleId);

  if (!article) {
    return (
      <p className="text-center mt-10 text-white text-lg drop-shadow-lg">
        مقاله ونه موندل شوه
      </p>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4 
                    bg-gradient-to-r from-[#ff4b4b] via-[#ff7a2a] to-[#fcd703]">
      
      <div className="max-w-5xl w-full bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 space-y-12">
        
        {/* عنوان مقاله */}
        <div className="text-center space-y-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">
            {article.title}
          </h1>
          <p className="text-sm md:text-base text-white/90 drop-shadow-md">
            📅 نېټه: {article.date} | ⏱️ د لوست وخت: {article.readingTime} | 👨‍🏫 لیکوال: {article.author}
          </p>
        </div>

        {/* محتوای مقاله */}
        <div className="text-white/90 text-sm md:text-base leading-[2.2] space-y-10 px-2 md:px-6 rtl text-right">
          {article.content}
        </div>

        {/* د بېرته تګ تڼۍ */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/blog-ps")}
            className="px-6 py-3 bg-white/80 text-gray-800 font-semibold rounded-full shadow-lg hover:scale-105 hover:bg-white transition-all"
          >
            🔙 بلاګ ته بېرته تګ
          </button>
        </div>
      </div>
    </div>
  );
}
