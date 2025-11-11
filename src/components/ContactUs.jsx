// src/pages/ContactUs.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import hubSticker from "../assets/hub-sticker5.png";
import sideLeftImg from "../assets/side-left.png";
import sideRightImg from "../assets/side-right.png";
import Confetti from "react-confetti";

// تابع تبدیل اعداد به فارسی/پشتو
function toPersianNumber(str) {
  const persianDigits = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
  return str.replace(/\d/g, (d) => persianDigits[d]);
}

const contactTexts = {
  en: {
    title: "Contact Us",
    subtitle: "We’d love to hear from you! Reach out for questions or support.",
    email: "contact@kidslearninghub.com",
    phone: "+93744918068",
    address: "Khair Khana, Kabul City, Afghanistan",
    content: `Our support team is here to help you Saturday through Thursday, 9:00 AM to 5:00 PM.
Feel free to send us your suggestions or inquiries anytime!`
  },
  fa: {
    title: "تماس با ما",
    subtitle: "ما خوشحال می‌شویم از شما بشنویم! برای سوال یا پشتیبانی با ما به تماس شوید",
    email: "contact@kidslearninghub.com",
    phone: "۹۳۷۴۴۹۱۸۰۶۸",
    address: "خیرخانه، شهر کابل، افغانستان",
    content: `تیم پشتیبانی ما از شنبه تا پنج شنبه، ساعت 9:00 صبح تا 5:00 بعد از ظهر در خدمت شماست.
هر زمان می‌توانید پیشنهادات یا سوالات خود را برای ما ارسال کنید!`
  },
  ps: {
    title: "موږ سره اړیکه",
    subtitle: "موږ غواړو ستاسو څخه واورو! د پوښتنو یا ملاتړ لپاره موږ سره اړیکه ونیسئ",
    email: "contact@kidslearninghub.com",
    phone: "۹۳۷۴۴۹۱۸۰۶۸",
    address: "خیرخانه، کابل، افغانستان",
    content: `زموږ د ملاتړ ټیم د شنبه څخه تر پنج شنبه پورې د سهار له 9:00 څخه تر ماښام 5:00 پورې ستاسو لپاره موجود دی.
هر وخت کولی شئ خپلې وړاندیزونه یا پوښتنې موږ ته واستوئ!`
  }
};

export default function ContactUs({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const [confettiActive, setConfettiActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isRTL = language === "fa" || language === "ps";
  const displayText = (text) => (isRTL ? toPersianNumber(text) : text);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center p-6
                    bg-gradient-to-r from-[#ff4b4b] via-[#ff7a2a] to-[#fcd703]
                    bg-opacity-100 backdrop-blur-xl transition-colors duration-500">

     {/* Side Images */}
<img
  src={sideLeftImg}
  alt=""
  className={`absolute left-[-20px] sm:left-0 md:left-8 w-36 sm:w-44 md:w-64 opacity-50 pointer-events-none z-0
              transition-all duration-300
              ${menuOpen 
                ? 'top-[28rem] sm:top-[28rem] md:top-38' 
                : 'top-52 sm:top-56 md:top-36'}`} // موبایل: top-52، تبلت: top-56، دسکتاپ بدون تغییر
/>
<img
  src={sideRightImg}
  alt=""
  className={`absolute right-[-20px] sm:right-0 md:right-8 w-36 sm:w-44 md:w-64 opacity-50 pointer-events-none z-0
              transition-all duration-300
              ${menuOpen 
                ? 'top-[28rem] sm:top-[28rem] md:top-38' 
                : 'top-52 sm:top-56 md:top-36'}`} // موبایل: top-52، تبلت: top-56، دسکتاپ بدون تغییر
/>
      {confettiActive && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={150} />}

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} onMenuToggle={setMenuOpen} />

      <div className="flex flex-col items-center text-center w-full max-w-5xl space-y-8 mt-24 md:mt-36 lg:mt-40">

        {/* Title + Subtitle */}
        <div className="flex flex-col items-center gap-3 mb-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-white drop-shadow-md">
            {contactTexts[language].title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mt-4 font-dashboard font-bold tracking-wide">
            {contactTexts[language].subtitle}
          </p>
        </div>

        {/* Sticker */}
        <img src={hubSticker} alt="Hub Sticker" className="w-36 h-36 md:w-44 md:h-44 drop-shadow-md" />

        {/* Language Buttons */}
        <div className="flex gap-4 mt-4 flex-wrap justify-center">
          <button
            onClick={() => setLanguage("en")}
            className={`px-5 py-2 rounded-full font-bold text-white shadow-md transition-all duration-300 transform hover:scale-110 ${
              language === "en"
                ? "bg-gradient-to-r from-red-500 to-pink-500"
                : "bg-red-400/80"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage("fa")}
            className={`px-5 py-2 rounded-full font-bold text-white shadow-md transition-all duration-300 transform hover:scale-110 ${
              language === "fa"
                ? "bg-gradient-to-r from-green-500 to-lime-500"
                : "bg-green-400/80"
            }`}
          >
            فارسی
          </button>
          <button
            onClick={() => setLanguage("ps")}
            className={`px-5 py-2 rounded-full font-bold text-white shadow-md transition-all duration-300 transform hover:scale-110 ${
              language === "ps"
                ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                : "bg-blue-400/80"
            }`}
          >
            پښتو
          </button>
        </div>

        {/* Content Card */}
        <div
          className="w-full rounded-[25px] shadow-lg p-8 flex flex-col items-start justify-center space-y-4"
          style={{
            background: "rgba(255,255,255,0.25)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.3)",
            textAlign: isRTL ? "right" : "left",
            direction: isRTL ? "rtl" : "ltr"
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-white text-xl">📧</span>
            <span className="text-white text-lg">{displayText(contactTexts[language].email)}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white text-xl">📞</span>
            <span className="text-white text-lg">{displayText(contactTexts[language].phone)}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white text-xl">🏠</span>
            <span className="text-white text-lg">{displayText(contactTexts[language].address)}</span>
          </div>

          <p className="text-white/90 text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose whitespace-pre-wrap font-dashboard mt-4">
            {displayText(contactTexts[language].content)}
          </p>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 hover:scale-105 hover:brightness-110 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
        >
          {language === "en" ? "⬅ Back to Dashboard" : language === "fa" ? "⬅ بازگشت به داشبورد" : "⬅ بیرته ډشبورډ ته"}
        </button>
      </div>
    </div>
  );
}
