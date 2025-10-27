// src/hooks/useGame.jsx
import { useState, useEffect, useRef } from "react";

export function useGame({ questions = [], timePerQuestion = 15 }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [loading, setLoading] = useState(true);
  const [qList, setQList] = useState([]);
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [answerFeedback, setAnswerFeedback] = useState(null); // "correct" | "wrong" | null

  const timerRef = useRef(null);

  // بارگذاری سوالات
  useEffect(() => {
    setQList(questions);
    setLoading(false);
    resetTimer();
  }, [questions]);

  // تایمر و پیشروی سوالات
  useEffect(() => {
    if (qList.length === 0) return;
    if (current >= qList.length) {
      clearInterval(timerRef.current);
      return;
    }
    resetTimer();
  }, [current, qList]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTimeLeft(timePerQuestion);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleAnswer(false); // زمان تمام شد، پاسخ غلط
          return timePerQuestion;
        }
        return t - 1;
      });
    }, 1000);
  };

  const handleAnswer = (isCorrect) => {
    // نمایش feedback درست/غلط
    setAnswerFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore(s => s + 1);

    // تاخیر کوتاه برای نمایش انیمیشن قبل از رفتن به سوال بعد
    setTimeout(() => {
      setAnswerFeedback(null);
      setCurrent(c => c + 1);
    }, 600);
  };

  const resetGame = () => {
    setCurrent(0);
    setScore(0);
    setPlayerName("");
    setQList([]);
    setTimeLeft(timePerQuestion);
    setAnswerFeedback(null);
    clearInterval(timerRef.current);
  };

  return {
    current,
    score,
    playerName,
    setPlayerName,
    loading,
    questions: qList,
    handleAnswer,
    resetGame,
    timeLeft,
    answerFeedback
  };
}
