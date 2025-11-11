import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import quizImage from "../../assets/quiz1.png";
import rabbitImg from "../../assets/rabbit.png";

const translations = {
  fa: { title: "بازی کوییز", score: "امتیاز", level: "سطح", correct: "🎉 درست شد!", wrong: "❌ اشتباه شد!", answerIs: "جواب درست این است" },
  ps: { title: "د پوښتنو لوبه", score: "نمره", level: "کچه", correct: "🎉 سمه ده!", wrong: "❌ ناسم ده!", answerIs: "سمه ځواب ده" },
  en: { title: "Quiz Game", score: "Score", level: "Level", correct: "🎉 Correct!", wrong: "❌ Wrong!", answerIs: "The correct answer is" },
};

const questionBank = [
  { question: { fa: "پایتخت افغانستان چیست؟", ps: "د افغانستان پلازمېنه څه ده؟", en: "What is the capital of Afghanistan?" }, options: {fa:["کابل","هرات","قندهار","مزار"], ps:["کابل","هرات","قندهار","مزار"], en:["Kabul","Herat","Kandahar","Mazar"]}, answer: 0 },
  { question: { fa: "رنگ آسمان چیست؟", ps: "د اسمان رنګ څه دی؟", en: "What is the color of the sky?" }, options: {fa:["آبی","سبز","قرمز","زرد"], ps:["شنه","شین","سره","ژېړ"], en:["Blue","Green","Red","Yellow"]}, answer: 0 },
  { question: { fa: "۵ + ۳ برابر است با؟", ps: "۵ + ۳ څو کیږي؟", en: "5 + 3 equals?" }, options: {fa:["۸","۷","۹","۱۰"], ps:["۸","۷","۹","۱۰"], en:["8","7","9","10"]}, answer: 0 },
];

const generateQuestions = (lang) => {
  const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
  const sliceCount = Math.min(15, shuffled.length);
  return shuffled.slice(0, sliceCount).map(q => {
    const opts = [...q.options[lang]];
    const correctText = opts[q.answer];
    const shuffledOpts = opts.sort(() => Math.random() - 0.5);
    const newAnswerIndex = shuffledOpts.findIndex(o => o === correctText);
    return { question: q.question[lang], options: shuffledOpts, answer: newAnswerIndex };
  });
};

function Particle({ x, y, emoji }) {
  return <div style={{ position: "absolute", top: y, left: x, fontSize: Math.random() * 24 + 16, opacity: 0.9, transform: `translateY(${Math.random() * -50}px) rotate(${Math.random() * 360}deg)`, animation: `floatUp ${1 + Math.random()}s ease-out forwards` }}>{emoji}</div>;
}

export default function QuizGame() {
  const [language, setLanguage] = useState("en");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [correctInLevel, setCorrectInLevel] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [particles, setParticles] = useState([]);
  const [timer, setTimer] = useState(10);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => { loadQuestions(language); }, [language]);
  useEffect(() => {
    const handleResize = () => { setWindowSize({ width: window.innerWidth, height: window.innerHeight }); setIsMobile(window.innerWidth <= 1024); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadQuestions = (lang) => {
    const qs = generateQuestions(lang);
    setQuestions(qs);
    setCurrent(0);
    setTimer(10);
    setCorrectInLevel(0);
    setScore(0);
    setFeedback("");
  };

  useEffect(() => {
    if (!questions.length) return;
    if (timer <= 0) {
      const q = questions[current];
      setFeedback(`⏱ ${translations[language].wrong} | ${translations[language].answerIs}: ${q.options[q.answer]}`);
      setScore((s) => Math.max(0, s - 1));
      setCorrectInLevel(0);
      setTimeout(() => handleNext(), 1500);
      return;
    }
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer, questions, current, language]);

  const handleAnswer = (choiceIndex) => {
    const q = questions[current];
    if (!q) return;
    if (choiceIndex === q.answer) {
      setScore((s) => s + 1);
      setCorrectInLevel((c) => c + 1);
      setFeedback(translations[language].correct);
      setShowConfetti(true);
      setParticles([...Array(12)].map(() => ({ x: Math.random() * windowSize.width * 0.6, y: Math.random() * windowSize.height * 0.5, emoji: ["⭐","🎈","🧮"][Math.floor(Math.random() * 3)] })));
      setTimeout(() => { setShowConfetti(false); setParticles([]); }, 1500);
      if (correctInLevel + 1 >= 5 && level < 5) setLevel((l) => l + 1);
    } else {
      setScore((s) => Math.max(0, s - 1));
      setCorrectInLevel(0);
      setFeedback(`${translations[language].wrong} | ${translations[language].answerIs}: ${q.options[q.answer]}`);
    }
    setTimeout(() => handleNext(), 1000);
  };

  const handleNext = () => {
    setFeedback("");
    if (current + 1 < questions.length) setCurrent((c) => c + 1);
    else loadQuestions(language);
    setTimer(10);
  };

  const topButtonStyle = { padding: isMobile ? "6px 10px" : "10px 16px", borderRadius: "12px", color: "#111827", border: "none", cursor: "pointer", fontWeight: "bold", boxShadow: "0 4px 10px rgba(0,0,0,0.3)", backgroundColor: "#FFD700", fontSize: isMobile ? "0.8rem" : "1rem" };

  const currentQuestion = questions[current] || { question: "", options: [] };
  const questionFontSize = isMobile ? "1rem" : "1.6rem";
  const optionFontSize = isMobile ? "0.9rem" : "1.3rem";
  const titleFontSize = isMobile ? "1.6rem" : "2.3rem";
  const scoreFontSize = isMobile ? "1rem" : "1.5rem";
  const paddingBox = isMobile ? "8px 12px" : "15px 28px";

  return (
    <div className="min-h-screen w-full flex justify-center items-center p-4" style={{ background: "linear-gradient(135deg,#ff4e50,#f9d423)", fontFamily: "'Comic Sans MS','Comic Neue','Arial Rounded MT Bold'", color: "#fff", position: "relative", overflow: "hidden" }}>
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={150} />}
      {particles.map((p, idx) => <Particle key={idx} {...p} />)}

      {/* دکمه‌های زبان */}
      <div style={{ position: "absolute", top: "15px", left: "15px", display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "8px" : "10px", zIndex: 10 }}>
        <button style={topButtonStyle} onClick={() => setLanguage("fa")}>دری</button>
        <button style={topButtonStyle} onClick={() => setLanguage("ps")}>پشتو</button>
        <button style={topButtonStyle} onClick={() => setLanguage("en")}>English</button>
      </div>

      <button style={{ ...topButtonStyle, position: "absolute", top: "15px", right: "15px" }} onClick={() => window.history.back()}>⬅ Back</button>

      <div style={{ display: "flex", width: "100%", maxWidth: "960px", gap: isMobile ? "20px" : "15px", flexDirection: isMobile ? "column" : "row", alignItems: "center" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "rgba(255, 165, 0, 0.9)", borderRadius: "25px", padding: paddingBox, boxShadow: "0 4px 15px rgba(0,0,0,0.4), inset 0 0 10px rgba(255,255,255,0.3)", animation: "softPulse 4s ease-in-out infinite", marginBottom: "15px" }}>
            <h1 style={{ fontSize: titleFontSize, fontWeight: "bold", margin: 0, color: "#fff", textShadow: "2px 2px 6px rgba(0,0,0,0.3)" }}>🏆 {translations[language].title}</h1>
          </div>

          <h2 style={{ fontSize: scoreFontSize, margin: "0 0 15px 0", fontWeight: 'bold', padding: paddingBox, borderRadius: '20px', maxWidth: '80%', color: '#fff', background: 'linear-gradient(135deg, #FFA500, #FFB347)', boxShadow: '0 0 20px rgba(255,165,0,0.7), 0 0 40px rgba(255,200,0,0.5)', textShadow: '1px 1px 3px rgba(0,0,0,0.3)', textAlign: 'center' }}>
            {translations[language].score}: {score} | {translations[language].level}: {level} | ⏱ {timer}s
          </h2>

          <div style={{ fontSize: questionFontSize, fontWeight: "bold", padding: paddingBox, borderRadius: "25px", background: 'linear-gradient(135deg, #FFA500, #FFB347)', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', marginBottom: "15px", textAlign: 'center', minHeight: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {currentQuestion.question}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "15px" }}>
            {currentQuestion.options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(i)} className="jumpOption" style={{ padding: isMobile ? "6px 12px" : "10px 18px", borderRadius: "20px", color: "#fff", border: "none", cursor: "pointer", fontWeight: "bold", fontSize: optionFontSize, background: 'linear-gradient(135deg, #FFA500, #FFB347)', boxShadow: '0 0 20px rgba(255,165,0,0.7)', transition: "transform 0.2s, box-shadow 0.2s" }}>{opt}</button>
            ))}
          </div>

          {feedback && (
            <div style={{ fontSize: questionFontSize, marginTop: "15px", textAlign: "center", color: "#fff", fontWeight: "bold", padding: paddingBox, borderRadius: "18px", background: "linear-gradient(135deg, #FFA500, #FFB347)", boxShadow: "0 0 25px rgba(255,165,0,0.8)", maxWidth: "80%", margin: "0 auto" }}>
              {feedback}
            </div>
          )}
        </div>

        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", marginTop: isMobile ? "15px" : "0" }}>
          <img src={quizImage} alt="Quiz" style={{ maxHeight: isMobile ? "250px" : "400px", width: "auto", objectFit: "contain", borderRadius: "20px", boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }} />
        </div>
      </div>

      {!isMobile && (
        <div style={{ position: "absolute", bottom: "15px", left: "15px", width: "120px", height: "120px" }}>
          <img src={rabbitImg} alt="Rabbit" style={{ width: "100%", height: "100%", transform: "translateY(0) rotate(0deg)", transition: "all 0.3s" }} />
        </div>
      )}

      <style>{`
        @keyframes floatUp {0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(-50px) rotate(360deg)}}
        @keyframes softPulse {0%,100%{box-shadow:0 0 15px rgba(255,255,255,0.4),inset 0 0 10px rgba(255,255,255,0.3);}50%{box-shadow:0 0 25px rgba(255,255,255,0.6), inset 0 0 12px rgba(255,255,255,0.4);} }
        button.jumpOption { animation: jumpButton 0.6s ease-in-out; }
        @keyframes jumpButton {0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);} }
        button.jumpOption:hover { transform: scale(1.05); box-shadow:0 6px 18px rgba(0,0,0,0.4); }
      `}</style>
    </div>
  );
}
