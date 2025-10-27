import React from "react";
import { useParams } from "react-router-dom";
import useLanguage from "../hooks/useLanguage";

// 🎮 تمام بازی‌ها
import MathGame from "./games/MathGame";
import WordGame from "./games/WordGame";
import QuizGame from "./games/QuizGame";
import ColorMatch from "./games/ColorMatch";
import AnimalSounds from "./games/AnimalSounds";
import ShapePuzzle from "./games/ShapePuzzle";
import CountingFun from "./games/CountingFun";
import MemoryCards from "./games/MemoryCards";
import MiniMusicBand from "./games/MiniMusicBand";
import LetterHunt from "./games/LetterHunt";
import SimpleMaze from "./games/SimpleMaze";
import FruitPicker from "./games/FruitPicker";
import MiniPainter from "./games/MiniPainter";
import MoneySmart from "./games/MoneySmart";
import WeatherWonder from "./games/WeatherWonder";
// 🆕 اضافه کردن AI Game
import GeneralQuiz from "./games/GeneralQuiz"; // مسیر باید دقیق و با حروف بزرگ/کوچک صحیح باشد

export default function GamePage() {
  const { id } = useParams();
  const { language } = useLanguage();

  const gameMap = {
    math: <MathGame />,
    word: <WordGame />,
    quiz: <QuizGame />,
    colorMatch: <ColorMatch />,
    animalSounds: <AnimalSounds />,
    shapePuzzle: <ShapePuzzle />,
    countingFun: <CountingFun />,
    memoryCards: <MemoryCards />,
    miniMusicBand: <MiniMusicBand />,
    letterHunt: <LetterHunt />,
    simpleMaze: <SimpleMaze />,
    fruitPicker: <FruitPicker />,
    miniPainter: <MiniPainter />,
    moneySmart: <MoneySmart />,
    weatherWonder: <WeatherWonder />,
    // کلید AI
    ai: <GeneralQuiz />,
  };

  const Component = gameMap[id] || (
    <p className="text-center text-lg mt-6">Game not found</p>
  );

  return (
    <div className="min-h-screen w-full m-0 p-0">
      {Component}
    </div>
  );
}
