import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useLanguage } from "../contexts/LanguageContext";

// Assets
import hubSticker from "../assets/hub-sticker3.png";
import Navbar from "../components/Navbar";
import sideLeftImg from "../assets/side-left6.png";
import sideRightImg from "../assets/side-right6.png";

// تابع تبدیل اعداد انگلیسی به فارسی/پشتو
function toPersianNumber(str) {
  const persianDigits = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
  return str.replace(/\d/g, (d) => persianDigits[d]);
}

// متن‌ها
const aboutTexts = {
  en: {
    title: "About Us",
    subtitle: "Learn about our mission, values, and how we create a fun learning environment.",
    content: `
Welcome to Kids Learning Hub! Our mission is to create a fun, safe, and educational environment for children to explore and learn. 

Our platform offers interactive games, activities, and lessons designed to make learning enjoyable and engaging. We believe that every child has the potential to succeed, and we strive to provide tools that help them develop their skills in reading, math, science, and creativity.

Why Choose Kids Learning Hub?
- Safe and child-friendly environment.
- Educational content crafted by experienced teachers.
- Interactive games that make learning fun.
- Progress tracking to help children and parents see growth.

Our Goal:
We aim to inspire curiosity, creativity, and a love for learning in every child. By combining education with play, we make learning a joyful experience.

Thank you for being part of our community!
    `
  },
  fa: {
    title: "درباره ما",
    subtitle: "با ماموریت، ارزش‌ ها و محیط یادگیری ما آشنا شوید",
    content: `
به Kids Learning Hub خوش آمدید! ماموریت ما ایجاد یک محیط سرگرم‌کننده، امن و آموزشی برای کودکان است تا بتوانند کاوش و یادگیری کنند. 

پلتفرم ما بازی‌ها، فعالیت‌ها و درس‌های تعاملی ارائه می‌دهد که یادگیری را جذاب و لذت‌بخش می‌کند. ما معتقدیم که هر کودک پتانسیل موفقیت دارد و تلاش می‌کنیم ابزارهایی ارائه دهیم که به آنها در توسعه مهارت‌های خواندن، ریاضی، علوم و خلاقیت کمک کند.

چرا Kids Learning Hub؟
- محیط امن و مناسب کودکان.
- محتوای آموزشی طراحی شده توسط معلمان مجرب.
- بازی‌های تعاملی که یادگیری را سرگرم‌کننده می‌کنند.
- پیگیری پیشرفت برای کمک به کودکان و والدین در مشاهده رشد.

هدف ما:
ما هدف داریم کنجکاوی، خلاقیت و عشق به یادگیری را در هر کودک الهام بخشیم. با ترکیب آموزش با بازی، یادگیری را به تجربه‌ای شاد تبدیل می‌کنیم.

از اینکه بخشی از جامعه ما هستید، سپاسگزاریم!
    `
  },
  ps: {
    title: "زموږ په اړه",
    subtitle: "زده کړئ زموږ ماموریت، ارزښتونه، او د زده کړې خوندور چاپیریال څنګه جوړوو",
    content: `
Kids Learning Hub ته ښه راغلاست! زموږ موخه د ماشومانو لپاره یوه خوندوره، خوندي او تعلیمي چاپیریال رامینځته کول دي ترڅو وکولی شي وپلټي او زده کړه وکړي. 

زموږ پلیټ فارم تعاملي لوبې، فعالیتونه او درسونه وړاندې کوي چې زده کړه یې خوندوره او په زړه پورې کوي. موږ باور لرو چې هر ماشوم د بریالیتوب وړتیا لري، او موږ هڅه کوو هغه وسیلې برابرې کړو چې د لوستلو، ریاضیاتو، علومو او خلاقیت په مهارتونو کې یې مرسته وکړي.

ولې Kids Learning Hub؟
- خوندي او د ماشومانو لپاره دوستانه چاپیریال.
- د تجربې لرونکو ښوونکو لخوا چمتو شوی تعلیمي محتوا.
- تعاملي لوبې چې زده کړه خوندوره کوي.
- پرمختګ څارنه ترڅو ماشومان او والدین وکولی شي وده وګوري.

زموږ هدف:
موږ هڅه کوو په هر ماشوم کې تجسس، خلاقیت او د زده کړې مینه رامنځته کړو. د زده کړې او لوبې ترکیب سره، زده کړه یوه خوندوره تجربه کیږي.

ستاسو د ګډون لپاره مننه!
    `
  }
};

export default function AboutUs({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const [confettiActive, setConfettiActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isRTL = language === "fa" || language === "ps";

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
                      : 'top-52 sm:top-56 md:top-36'}`}
      />
      <img
        src={sideRightImg}
        alt=""
        className={`absolute right-[-20px] sm:right-0 md:right-8 w-36 sm:w-44 md:w-64 opacity-50 pointer-events-none z-0
                    transition-all duration-300
                    ${menuOpen 
                      ? 'top-[28rem] sm:top-[28rem] md:top-38' 
                      : 'top-52 sm:top-56 md:top-36'}`}
      />

      {confettiActive && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={150} />}

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} onMenuToggle={setMenuOpen} />

      <div className="flex flex-col items-center text-center w-full max-w-5xl space-y-8 mt-24 md:mt-36 lg:mt-40">

        {/* Title + Subtitle */}
        <div className="flex flex-col items-center gap-3 mb-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-white drop-shadow-md">
            {aboutTexts[language].title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mt-4 font-dashboard font-bold tracking-wide">
            {aboutTexts[language].subtitle}
          </p>
        </div>

        {/* Sticker */}
        <img src={hubSticker} alt="Hub Sticker" className="w-36 h-36 md:w-44 md:h-44 drop-shadow-md" />

        {/* Language Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setLanguage("en")}
            className={`px-5 py-2 rounded-full font-bold text-white shadow-md transition-all duration-300 transform hover:scale-110 ${
              language === "en" ? "bg-gradient-to-r from-red-500 to-pink-500" : "bg-red-400/80"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage("fa")}
            className={`px-5 py-2 rounded-full font-bold text-white shadow-md transition-all duration-300 transform hover:scale-110 ${
              language === "fa" ? "bg-gradient-to-r from-green-500 to-lime-500" : "bg-green-400/80"
            }`}
          >
            فارسی
          </button>
          <button
            onClick={() => setLanguage("ps")}
            className={`px-5 py-2 rounded-full font-bold text-white shadow-md transition-all duration-300 transform hover:scale-110 ${
              language === "ps" ? "bg-gradient-to-r from-blue-500 to-cyan-500" : "bg-blue-400/80"
            }`}
          >
            پښتو
          </button>
        </div>

        {/* Card + Back Button Wrapper */}
        <>
          {/* Content Card */}
          <div
            className="w-full rounded-[25px] shadow-lg p-8 flex flex-col items-start justify-center
                       transition-transform duration-300 sm:translate-y-8 md:translate-y-16 lg:translate-y-0"
            style={{
              background: "rgba(255,255,255,0.25)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.3)",
              textAlign: isRTL ? "right" : "left",
              direction: isRTL ? "rtl" : "ltr",
            }}
          >
            <p className="text-white/90 text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose whitespace-pre-wrap font-dashboard">
              {isRTL ? toPersianNumber(aboutTexts[language].content) : aboutTexts[language].content}
            </p>
          </div>

          {/* فاصله کوچک زیر کارت */}
          <div className="h-4"></div>

          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 hover:scale-105 hover:brightness-110 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
          >
            {language === "en" ? "⬅ Back to Dashboard" : language === "fa" ? "⬅ بازگشت به داشبورد" : "⬅ بیرته ډشبورډ ته"}
          </button>
        </>
      </div>
    </div>
  );
}
