import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useLanguage } from "../contexts/LanguageContext";

// کامپوننت بازی‌ها
import MathGame from "./games/MathGame";
import WordGame from "./games/WordGame";
import QuizGame from "./games/QuizGame";
import ColorMatch from "./games/ColorMatch";
import AnimalSounds from "./games/AnimalSounds";
import ShapePuzzle from "./games/ShapePuzzle";
import CountingFun from "./games/CountingFun";
import MemoryMatch from "./games/MemoryCards";
import MiniMusicBand from "./games/MiniMusicBand";
import LetterHunt from "./games/LetterHunt";
import SimpleMaze from "./games/SimpleMaze";
import FruitPicker from "./games/FruitPicker";
import MiniPainter from "./games/MiniPainter";
import MoneySmart from "./games/MoneySmart";
import WeatherWonder from "./games/WeatherWonder";

// تصاویر بازی‌ها
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

export default function GamePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [confettiActive, setConfettiActive] = useState(false);
  const [game, setGame] = useState(null);

  const games = [
    { id: "math", name: { en: "Math Game", fa: "بازی ریاضی", ps: "د ریاضیات لوبه" }, image: mathImg, component: MathGame },
    { id: "word", name: { en: "Word Game", fa: "بازی کلمات", ps: "د کلمو لوبه" }, image: wordImg, component: WordGame },
    { id: "quiz", name: { en: "Quiz Game", fa: "بازی کوییز", ps: "د پوښتنو لوبه" }, image: quizImg, component: QuizGame },
    { id: "colorMatch", name: { en: "Color Match", fa: "هماهنگی رنگ‌ها", ps: "د رنګونو برابرول" }, image: colorMatchImg, component: ColorMatch },
    { id: "animalSounds", name: { en: "Animal Sounds", fa: "صدای حیوانات", ps: "د حیواناتو غږونه" }, image: animalSoundsImg, component: AnimalSounds },
    { id: "shapePuzzle", name: { en: "Shape Puzzle", fa: "پازل اشکال", ps: "د شکلونو معما" }, image: shapePuzzleImg, component: ShapePuzzle },
    { id: "countingFun", name: { en: "Counting Fun", fa: "شمارش سرگرم‌کننده", ps: "د شمېرنې خوند" }, image: countingFunImg, component: CountingFun },
    { id: "memoryCards", name: { en: "Memory Match", fa: "بازی حافظه", ps: "د حافظې لوبه" }, image: memoryImg, component: MemoryMatch },
    { id: "miniMusicBand", name: { en: "Mini Music Band", fa: "باند موسیقی کوچک", ps: "کوچنی میوزیک بند" }, image: miniMusicBandImg, component: MiniMusicBand },
    { id: "letterHunt", name: { en: "Letter Hunt", fa: "شکار حروف", ps: "د تورو لټون" }, image: letterHuntImg, component: LetterHunt },
    { id: "simpleMaze", name: { en: "Simple Maze", fa: "ماز ساده", ps: "اسانه لابیرنت" }, image: simpleMazeImg, component: SimpleMaze },
    { id: "fruitPicker", name: { en: "Fruit Picker", fa: "چیدن میوه‌ها", ps: "د مېوو راټولول" }, image: fruitPickerImg, component: FruitPicker },
    { id: "miniPainter", name: { en: "Mini Painter", fa: "نقاش کوچک", ps: "کوچنی انځورګر" }, image: miniPainterImg, component: MiniPainter },
    { id: "moneySmart", name: { en: "Money Smart", fa: "هوش مالی", ps: "هوښیارې پیسې" }, image: moneySmartImg, component: MoneySmart },
    { id: "weatherWonder", name: { en: "Weather Wonder", fa: "شگفتی آب‌وهوا", ps: "د هوا حیرانتیا" }, image: weatherWonderImg, component: WeatherWonder },
  ];

  useEffect(() => {
    const selectedGame = games.find((g) => g.id === id);
    if (!selectedGame) {
      navigate("/games");
    } else {
      setGame(selectedGame);
      setConfettiActive(true);
      const timer = setTimeout(() => setConfettiActive(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [id, navigate]);

  if (!game) return null;

  const GameComponent = game.component;

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-0"
      style={{ background: "linear-gradient(135deg,#ff4e50,#f9d423)" }}
    >
      {confettiActive && (
        <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={150} />
      )}

      {/* بازی تمام صفحه */}
      {GameComponent ? <GameComponent /> : (
        <div className="flex flex-col items-center justify-center gap-4">
          <img src={game.image} alt={game.name[language]} className="w-48 h-48 md:w-64 md:h-64" />
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg text-center">{game.name[language]}</h1>
        </div>
      )}
    </div>
  );
}
