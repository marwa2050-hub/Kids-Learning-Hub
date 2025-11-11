// src/pages/GamesPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";

import sideLeftImg from "../assets/side-left.png";
import sideRightImg from "../assets/side-right.png";
import gameSticker from "../assets/game-sticker.png";

// Game images
import mathImg from "../assets/math.png";
import wordImg from "../assets/word.png";
import quizImg from "../assets/quiz.png";
import colorMatchImg from "../assets/colorMatch.png";
import animalSoundsImg from "../assets/animalSounds.png";
import shapePuzzleImg from "../assets/shapePuzzle.png";
import countingFunImg from "../assets/countingFun.png";
import memoryImg from "../assets/memory.png";
import miniMusicBandImg from "../assets/miniMusicBand.png";
import letterHuntImg from "../assets/letterHunt.png";
import simpleMazeImg from "../assets/simpleMaze.png";
import fruitPickerImg from "../assets/fruitPicker.png";
import miniPainterImg from "../assets/miniPainter.png";
import moneySmartImg from "../assets/moneySmart.png";
import weatherWonderImg from "../assets/weatherWonder.png";

export default function GamesPage({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const [confettiActive, setConfettiActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const games = [
    { id: "math", name: { en: "Math Game", fa: "بازی ریاضی", ps: "د ریاضي لوبه" }, description: { en: "Solve fun math problems", fa: "حل مسائل ریاضی سرگرم‌کننده", ps: "خوندې ریاضي مسئلې حل کړئ" }, image: mathImg, color: "from-purple-400 to-purple-600" },
    { id: "word", name: { en: "Word Game", fa: "بازی کلمات", ps: "د ټکو لوبه" }, description: { en: "Learn new words", fa: "یادگیری کلمات جدید", ps: "نوې ټکي زده کړئ" }, image: wordImg, color: "from-yellow-400 to-yellow-600" },
    { id: "quiz", name: { en: "Quiz Game", fa: "بازی کوییز", ps: "کوئز لوبه" }, description: { en: "Test your knowledge", fa: "دانش خود را امتحان کنید", ps: "خپل پوهه ازموینه وکړئ" }, image: quizImg, color: "from-pink-400 to-pink-600" },
    { id: "colorMatch", name: { en: "Color Match", fa: "مطابقت رنگ‌ها", ps: "رنګونه سم کړئ" }, description: { en: "Learn colors by matching objects", fa: "یادگیری رنگ‌ها با مطابقت اشیاء", ps: "د شیانو سره د رنګونو پیوستون زده کړئ" }, image: colorMatchImg, color: "from-red-400 to-red-600" },
    { id: "animalSounds", name: { en: "Animal Sounds", fa: "صداهای حیوانات", ps: "د حیواناتو غږونه" }, description: { en: "Discover animals and their sounds", fa: "کشف حیوانات و صداهای آن‌ها", ps: "حیوانات او د هغوی غږونه کشف کړئ" }, image: animalSoundsImg, color: "from-green-400 to-green-600" },
    { id: "shapePuzzle", name: { en: "Shape Puzzle", fa: "پازل اشکال", ps: "د شکلونو پزل" }, description: { en: "Fit shapes into their correct places", fa: "قرار دادن اشکال در مکان‌های درست", ps: "شکلونه په سم ځای کې واچوئ" }, image: shapePuzzleImg, color: "from-blue-400 to-blue-600" },
    { id: "countingFun", name: { en: "Counting Fun", fa: "شمارش سرگرم‌کننده", ps: "شمېرل په خوند" }, description: { en: "Practice numbers with fun counting games", fa: "تمرین اعداد با بازی‌های سرگرم‌کننده", ps: "شمېرې د ساتیري لوبو سره تمرین کړئ" }, image: countingFunImg, color: "from-yellow-400 to-yellow-600" },
    { id: "memoryCards", name: { en: "Memory Match", fa: "تقویت حافظه", ps: "د حافظې لوبه" }, description: { en: "Boost memory skills with matching cards", fa: "تقویت حافظه با کارت‌های مطابقتی", ps: "د کارتونو سره حافظه پیاوړې کړئ" }, image: memoryImg, color: "from-purple-400 to-purple-600" },
    { id: "miniMusicBand", name: { en: "Mini Music Band", fa: "باند موسیقی کوچک", ps: "کوچنی موسیقي بانډ" }, description: { en: "Play simple instruments and learn rhythm", fa: "نواختن سازهای ساده و یادگیری ریتم", ps: "آلات ساده وغږوئ او ریتم زده کړئ" }, image: miniMusicBandImg, color: "from-pink-400 to-pink-600" },
    { id: "letterHunt", name: { en: "Letter Hunt", fa: "شکار حروف", ps: "د تورو لټون" }, description: { en: "Find hidden letters and improve your alphabet", fa: "پیدا کردن حروف مخفی و تقویت الفبا", ps: "پټ توري پیدا کړئ او الفبا ښه کړئ" }, image: letterHuntImg, color: "from-orange-400 to-orange-600" },
    { id: "simpleMaze", name: { en: "Simple Maze", fa: "هزارتوی ساده", ps: "ساده لیبیرینت" }, description: { en: "Guide the character to the finish line", fa: "هدایت شخصیت به خط پایان", ps: "کردار ته د پای کرښه لارښوونه وکړئ" }, image: simpleMazeImg, color: "from-teal-400 to-teal-600" },
    { id: "fruitPicker", name: { en: "Fruit Picker", fa: "چیدن میوه‌ها", ps: "ميوې ټولونکی" }, description: { en: "Collect fruits and learn their names", fa: "جمع‌آوری میوه‌ها و یادگیری نام آن‌ها", ps: "ميوې راټول کړئ او نومونه زده کړئ" }, image: fruitPickerImg, color: "from-red-300 to-red-500" },
    { id: "miniPainter", name: { en: "Mini Painter", fa: "نقاش کوچک", ps: "کوچنی رنګوونکی" }, description: { en: "Color shapes and pictures creatively", fa: "رنگ آمیزی اشکال و تصاویر به صورت خلاقانه", ps: "شکلونه او عکسونه په خلاقانه ډول رنګ کړئ" }, image: miniPainterImg, color: "from-purple-300 to-purple-500" },
    { id: "moneySmart", name: { en: "Money Smart", fa: "هوش مالی", ps: "د پیسو پوهه" }, description: { en: "Learn about money, counting coins, and making simple purchases", fa: "یادگیری پول، شمارش سکه‌ها و خرید ساده", ps: "د پیسو، سکې شمیرنه او ساده پیرودونه زده کړئ" }, image: moneySmartImg, color: "from-amber-400 to-amber-600" },
    { id: "weatherWonder", name: { en: "Weather Wonder", fa: "کشف آب و هوا", ps: "د هوا کشف" }, description: { en: "Explore weather types and choose suitable clothes", fa: "کشف انواع آب و هوا و انتخاب لباس مناسب", ps: "د هوا ډولونه وپلټئ او مناسب لباس وټاکئ" }, image: weatherWonderImg, color: "from-sky-400 to-sky-600" },
  ];

  const startGame = (game) => {
    setConfettiActive(true);
    setTimeout(() => {
      setConfettiActive(false);
      navigate(`/game/${game.id}`);
    }, 500);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center p-6
                    bg-gradient-to-r from-[#ff4b4b] via-[#ff7a2a] to-[#fcd703]
                    bg-opacity-100 backdrop-blur-xl transition-colors duration-500">
{/* Side Images */}
<img
  src={sideLeftImg}
  alt=""
  className={`absolute left-[-0px] sm:left-0 md:left-8 w-36 sm:w-44 md:w-64 opacity-50 pointer-events-none z-0
              transition-all duration-300
              ${menuOpen 
                ? 'top-[30rem] sm:top-[30rem] md:top-38' 
                : 'top-[14rem] sm:top-[16rem] md:top-36'}`}
/>
<img
  src={sideRightImg}
  alt=""
  className={`absolute right-[-0px] sm:right-0 md:right-8 w-36 sm:w-44 md:w-64 opacity-50 pointer-events-none z-0
              transition-all duration-300
              ${menuOpen 
                ? 'top-[30rem] sm:top-[30rem] md:top-38' 
                : 'top-[14rem] sm:top-[16rem] md:top-36'}`}
/>

      {confettiActive && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={150} />}

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} onMenuToggle={setMenuOpen} />

      {/* Main Content */}
      <div className="flex flex-col items-center text-center w-full max-w-6xl space-y-8 mt-24 md:mt-36 lg:mt-40">

        {/* Title + Subtitle + Sticker */}
        <div className="flex flex-col items-center gap-3 mb-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide text-white drop-shadow-md">
            {language === "en"
              ? "Our Educational Games"
              : language === "fa"
              ? "بازی‌های آموزشی ما"
              : "زموږ تعلیمي لوبې"}
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-white/90 w-full max-w-[700px] mx-auto mt-4">
            {language === "fa"
              ? "مجموعه‌ای از بازی‌های سرگرم‌کننده و آموزشی برای تقویت خلاقیت، مهارت‌های یادگیری و حل مسئله کودکان"
              : language === "ps"
              ? "د ساتیري او تعلیمي لوبو مجموعه چې د ماشومانو خلاقیت، د زده کړې مهارتونه او د ستونزو حل کولو وړتیاوې پیاوړې کوي"
              : "Explore a variety of fun and educational games designed to enhance children's creativity, learning skills, and problem-solving abilities."}
          </p>

          <img src={gameSticker} alt="Game Sticker" className="w-28 sm:w-36 md:w-44 h-28 sm:h-36 md:h-44 mt-6 drop-shadow-md" />
        </div>

        {/* Language Buttons */}
        <div className="flex gap-2 sm:gap-4 mt-2 mb-6 flex-wrap justify-center">
          <button onClick={() => setLanguage("en")} className={`px-4 sm:px-5 py-2 rounded-full font-bold text-white shadow-md hover:scale-110 transition-all ${language === "en" ? "bg-gradient-to-r from-red-500 to-pink-500" : "bg-red-400/80"}`}>English</button>
          <button onClick={() => setLanguage("fa")} className={`px-4 sm:px-5 py-2 rounded-full font-bold text-white shadow-md hover:scale-110 transition-all ${language === "fa" ? "bg-gradient-to-r from-green-500 to-lime-500" : "bg-green-400/80"}`}>فارسی</button>
          <button onClick={() => setLanguage("ps")} className={`px-4 sm:px-5 py-2 rounded-full font-bold text-white shadow-md hover:scale-110 transition-all ${language === "ps" ? "bg-gradient-to-r from-blue-500 to-cyan-500" : "bg-blue-400/80"}`}>پښتو</button>
        </div>

        {/* Game Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => startGame(game)}
              className={`cursor-pointer bg-gradient-to-br ${game.color} text-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col justify-between items-center min-h-[240px]
                         hover:scale-105 hover:shadow-2xl hover:brightness-110 transition-all duration-300 text-center`}
            >
              <img src={game.image} alt={game.name[language]} className="w-24 h-24 md:w-28 md:h-28 object-contain mb-2" />
              <h4 className="text-lg sm:text-xl md:text-2xl font-bold w-full text-center">
                {language === "fa" ? game.name.fa : language === "ps" ? game.name.ps : game.name.en}
              </h4>
              <p className="text-xs sm:text-sm md:text-base text-white/90 w-full text-center overflow-hidden" style={{display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical"}}>
                {language === "fa" ? game.description.fa : language === "ps" ? game.description.ps : game.description.en}
              </p>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 hover:scale-105 hover:brightness-110 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-lg transition duration-300"
        >
          {language === "en" ? "⬅ Back to Dashboard" : language === "fa" ? "⬅ بازگشت به داشبورد" : "⬅ بیرته ډشبورډ ته"}
        </button>
      </div>
    </div>
  );
}
