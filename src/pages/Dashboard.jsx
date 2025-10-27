import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

// Assets
import hubSticker from "../assets/hub-sticker.png";
import p1Background from "../assets/p1.png";
import bookSticker from "../assets/book-sticker.png";
import gameSticker from "../assets/game-sticker.png";

// Import بازی‌ها
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

const useLanguage = () => {
  const t = (key) => {
    const translations = {
      mathGame: "Math Game",
      mathGameDesc: "Solve fun math problems",
      wordGame: "Word Game",
      wordGameDesc: "Learn new words",
      quizGame: "Quiz Game",
      quizGameDesc: "Test your knowledge",
    };
    return translations[key] || key;
  };
  const setLanguage = (lang) => {
    console.log("Language changed to:", lang);
  };
  return { t, setLanguage };
};

export default function Dashboard({ darkMode, setDarkMode }) {
  const { t, setLanguage } = useLanguage();
  const [confettiActive, setConfettiActive] = useState(false);
  const navigate = useNavigate();

  const games = [
    { id: "math", name: t("mathGame"), description: t("mathGameDesc"), image: mathImg, color: "from-purple-400 to-purple-600" },
    { id: "word", name: t("wordGame"), description: t("wordGameDesc"), image: wordImg, color: "from-yellow-400 to-yellow-600" },
    { id: "quiz", name: t("quizGame"), description: t("quizGameDesc"), image: quizImg, color: "from-pink-400 to-pink-600" },
    { id: "colorMatch", name: "Color Match", description: "Learn colors by matching objects", image: colorMatchImg, color: "from-red-400 to-red-600" },
    { id: "animalSounds", name: "Animal Sounds", description: "Discover animals and their sounds", image: animalSoundsImg, color: "from-green-400 to-green-600" },
    { id: "shapePuzzle", name: "Shape Puzzle", description: "Fit shapes into their correct places", image: shapePuzzleImg, color: "from-blue-400 to-blue-600" },
    { id: "countingFun", name: "Counting Fun", description: "Practice numbers with fun counting games", image: countingFunImg, color: "from-yellow-400 to-yellow-600" },
    { id: "memoryCards", name: "Memory Match", description: "Boost memory skills with matching cards", image: memoryImg, color: "from-purple-400 to-purple-600" },
    { id: "miniMusicBand", name: "Mini Music Band", description: "Play simple instruments and learn rhythm", image: miniMusicBandImg, color: "from-pink-400 to-pink-600" },
    { id: "letterHunt", name: "Letter Hunt", description: "Find hidden letters and improve your alphabet", image: letterHuntImg, color: "from-orange-400 to-orange-600" },
    { id: "simpleMaze", name: "Simple Maze", description: "Guide the character to the finish line", image: simpleMazeImg, color: "from-teal-400 to-teal-600" },
    { id: "fruitPicker", name: "Fruit Picker", description: "Collect fruits and learn their names", image: fruitPickerImg, color: "from-red-300 to-red-500" },
    { id: "miniPainter", name: "Mini Painter", description: "Color shapes and pictures creatively", image: miniPainterImg, color: "from-purple-300 to-purple-500" },
    { id: "moneySmart", name: "Money Smart", description: "Learn about money, counting coins, and making simple purchases", image: moneySmartImg, color: "from-amber-400 to-amber-600" },
    { id: "weatherWonder", name: "Weather Wonder", description: "Explore weather types and choose suitable clothes", image: weatherWonderImg, color: "from-sky-400 to-sky-600" }
  ];

  const startGame = (game) => {
    setConfettiActive(true);
    setTimeout(() => {
      setConfettiActive(false);
      navigate(`/game/${game.id}`);
    }, 1000);
  };

  return (
    <div
      className="min-h-screen w-full flex justify-center items-center p-4 transition-colors duration-500"
      style={{ backgroundImage: `url(${p1Background})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {confettiActive && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={150} />}

      <div
        className="w-full max-w-5xl rounded-[30px] shadow-2xl p-8 text-white animate-fadeIn overflow-hidden flex flex-col items-center justify-start"
        style={{
          background: "linear-gradient(135deg, #ff4e50, #f9d423)",
          boxShadow: "0 15px 35px rgba(0,0,0,0.35), inset 0 0 25px rgba(255,255,255,0.1)",
          minHeight: "240vh",
          fontFamily: "'Comic Sans MS','Chalkboard SE','Comic Neue','Marker Felt','Arial Rounded MT Bold','Helvetica Rounded',Arial,sans-serif",
        }}
      >
        {/* عنوان و استیکر */}
        <div className="flex items-center gap-6 mt-10 mb-4">
          <img src={hubSticker} alt="Hub Sticker" className="w-32 h-32 md:w-36 md:h-36" />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">Kids Learning Hub</h1>
        </div>

        {/* شعار */}
        <p className="text-center text-xl md:text-2xl italic mb-8 max-w-2xl animate-fadeIn">
          Fun, creative, and interactive learning for children
        </p>

        {/* سه کارت زبان */}
        <div className="w-full flex flex-col md:flex-row justify-center items-stretch gap-4 mb-4 scale-90">
          <div onClick={() => setLanguage("en")} className="cursor-pointer bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-white rounded-[40px] shadow-md p-3 flex-1 hover:scale-110 flex flex-col items-start justify-center gap-2 min-h-[70px] backdrop-blur-sm border border-white/30">
            <div className="flex items-center gap-2">
              <img src={bookSticker} alt="Book Sticker" className="w-8 h-8 drop-shadow-md" />
              <h3 className="text-base md:text-lg font-extrabold tracking-wide drop-shadow-md">Educational Blog (English)</h3>
            </div>
          </div>
          <div onClick={() => setLanguage("fa")} className="cursor-pointer bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white rounded-[40px] shadow-md p-3 flex-1 hover:scale-110 flex flex-col justify-center gap-2 min-h-[70px] items-start backdrop-blur-sm border border-white/30" dir="rtl">
            <div className="flex flex-row items-center gap-2 w-full">
              <img src={bookSticker} alt="Book Sticker" className="w-8 h-8 drop-shadow-md" />
              <h3 className="text-base md:text-lg font-extrabold tracking-wide drop-shadow-md">وبلاگ آموزشی (فارسی)</h3>
            </div>
          </div>
          <div onClick={() => setLanguage("ps")} className="cursor-pointer bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white rounded-[40px] shadow-md p-3 flex-1 hover:scale-110 flex flex-col justify-center gap-2 min-h-[70px] items-start backdrop-blur-sm border border-white/30" dir="rtl">
            <div className="flex flex-row items-center gap-2 w-full">
              <img src={bookSticker} alt="Book Sticker" className="w-8 h-8 drop-shadow-md" />
              <h3 className="text-base md:text-lg font-extrabold tracking-wide drop-shadow-md">تعلیمي وبلاګ (پښتو)</h3>
            </div>
          </div>
        </div>

        {/* توضیحات سه‌زبانه */}
        <div className="text-center mt-2 mb-10 space-y-2 animate-fadeIn">
          <p className="text-white/95 text-sm md:text-base font-bold tracking-wide">Engaging resources to boost children's creativity and learning skills</p>
          <p className="text-white/95 text-sm md:text-base font-bold tracking-wide" dir="rtl">منابع جذاب برای تقویت خلاقیت و مهارت‌های یادگیری کودکان</p>
          <p className="text-white/95 text-sm md:text-base font-bold tracking-wide" dir="rtl">د ماشومانو د خلاقیت او د زده کړې مهارتونو د پیاوړتیا لپاره جذابې سرچینې</p>
        </div>

        {/* بخش بازی‌ها */}
        <div className="flex items-center gap-4 mb-6 self-start">
          <img src={gameSticker} alt="Game Sticker" className="w-16 h-16" />
          <h3 className="text-2xl md:text-3xl font-extrabold">Our Educational Games</h3>
        </div>

        {/* کارت‌های بازی */}
        <div className="flex flex-wrap justify-center items-stretch gap-6 mb-10 w-full">
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => startGame(game)}
              className={`cursor-pointer flex-1 min-w-[160px] max-w-[28%] bg-gradient-to-br ${game.color} text-white rounded-2xl shadow-lg p-4 flex flex-col items-center justify-start hover:scale-105 transition transform text-center`}
              style={{ height: "220px" }}
            >
              <img src={game.image} alt={game.name} className="w-16 h-16 md:w-20 md:h-20 object-contain mb-2" />
              <h4 className="text-base md:text-lg font-bold truncate w-full">{game.name}</h4>
              <p className="text-[10px] md:text-xs text-white/90 w-full overflow-hidden" style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>{game.description}</p>
            </div>
          ))}
        </div>

        {/* نوشته‌های پایین */}
        <div className="flex flex-col items-center mt-8 mb-6 text-center space-y-2">
          <p className="text-sm font-extrabold text-white drop-shadow-sm">🎯 Click on any topic to start learning!</p>
          <p className="text-xs md:text-sm font-semibold text-white/90 drop-shadow-sm">💡 Help us improve by suggesting new topics</p>
        </div>

        {/* فوتر با مسیرهای قابل کلیک */}
        <div className="mt-auto w-full flex flex-col items-center px-4 py-6">
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs md:text-sm font-semibold text-white/90 tracking-wide mb-2">
            <span
              onClick={() => navigate("/privacy")}
              className="cursor-pointer hover:text-yellow-400 transition-transform duration-200 hover:scale-105"
            >
              🔒 Privacy Policy
            </span>
            <span
              onClick={() => navigate("/terms")}
              className="cursor-pointer hover:text-yellow-400 transition-transform duration-200 hover:scale-105"
            >
              📋 Terms of Service
            </span>
            <span
              onClick={() => navigate("/about")}
              className="cursor-pointer hover:text-yellow-400 transition-transform duration-200 hover:scale-105"
            >
              ℹ️ About Us
            </span>
            <span
              onClick={() => navigate("/contact")}
              className="cursor-pointer hover:text-yellow-400 transition-transform duration-200 hover:scale-105"
            >
              📧 Contact Us
            </span>
          </div>
          <div className="text-center text-xs md:text-sm font-medium text-white/80 tracking-wide drop-shadow-sm">
            © 2025 Kids Learning Hub. Safe, Educational, and Fun for Children.
          </div>
        </div>
      </div>
    </div>
  );
}
