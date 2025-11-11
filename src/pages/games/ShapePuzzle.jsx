import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import rabbitImg from "../../assets/rabbit.png";
import puzzleScene from "../../assets/puzzleScene.png"; // تصویر ثابت سمت راست

const shapes = [
  { name: { fa: "مربع", ps: "مربع", en: "Square" }, emoji: "🟥" },
  { name: { fa: "مثلث", ps: "مثلث", en: "Triangle" }, emoji: "🔺" },
  { name: { fa: "دایره", ps: "دایره", en: "Circle" }, emoji: "⚪" },
  { name: { fa: "ستاره", ps: "ستاره", en: "Star" }, emoji: "⭐" },
];

const translations = {
  fa: { title: "پازل شکل‌ها", score: "امتیاز", level: "سطح", correct: "🎉 درست شد!", wrong: "❌ اشتباه شد!", answerIs: "جواب درست این است" },
  ps: { title: "د شکلونو پازل", score: "نمره", level: "کچه", correct: "🎉 سمه ده!", wrong: "❌ ناسم ده!", answerIs: "سمه ځواب ده" },
  en: { title: "Shape Puzzle", score: "Score", level: "Level", correct: "🎉 Correct!", wrong: "❌ Wrong!", answerIs: "The correct shape is" },
};

function Particle({ x, y, emoji }) {
  return <div style={{ position: "absolute", top: y, left: x, fontSize: Math.random() * 24 + 16, opacity: 0.8, transform: `translateY(${Math.random() * -50}px) rotate(${Math.random() * 360}deg)`, animation: `floatUp ${1 + Math.random()}s ease-out forwards` }}>{emoji}</div>;
}

const generateQuestions = () => {
  const qs = [];
  for (let i = 0; i < 10; i++) {
    const idx = Math.floor(Math.random() * shapes.length);
    const correctShape = shapes[idx];
    const options = new Set();
    options.add(correctShape);
    while (options.size < 4) options.add(shapes[Math.floor(Math.random() * shapes.length)]);
    qs.push({ correct: correctShape, options: Array.from(options).sort(() => Math.random() - 0.5) });
  }
  return qs;
};

export default function ShapePuzzle() {
  const [lang, setLang] = useState("fa");
  const [questions, setQuestions] = useState(generateQuestions());
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [correctInLevel, setCorrectInLevel] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [particles, setParticles] = useState([]);
  const [rabbitReaction, setRabbitReaction] = useState("idle");
  const [timer, setTimer] = useState(10);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      const q = questions[current];
      setFeedback(`⏱ ${translations[lang].wrong} | ${translations[lang].answerIs}: ${q.correct.emoji}`);
      setScore((s) => Math.max(0, s - 1));
      setRabbitReaction("sad");
      setCorrectInLevel(0);
      setTimeout(() => setRabbitReaction("idle"), 1200);
      setTimeout(() => handleNext(), 1500);
      return;
    }
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer, questions, current]);

  const handleAnswer = (shape) => {
    const q = questions[current];
    if (!q) return;
    if (shape.name.en === q.correct.name.en) {
      setScore((s) => s + 1);
      setCorrectInLevel((c) => c + 1);
      setFeedback(translations[lang].correct);
      setShowConfetti(true);
      setParticles([...Array(12)].map(() => ({ x: Math.random() * windowSize.width * 0.6, y: Math.random() * windowSize.height * 0.5, emoji: ["⭐", "🎈", "🟪"][Math.floor(Math.random() * 3)] })));
      setRabbitReaction("happy");
      setTimeout(() => { setShowConfetti(false); setParticles([]); setRabbitReaction("idle"); }, 1500);
      if (correctInLevel + 1 >= 5) {
        setLevel((l) => l + 1);
        setFeedback(`🎉 ${translations[lang].level} ${level + 1}!`);
      }
    } else {
      setScore((s) => Math.max(0, s - 1));
      setCorrectInLevel(0);
      setFeedback(`${translations[lang].wrong} | ${translations[lang].answerIs}: ${q.correct.emoji}`);
      setRabbitReaction("sad");
      setTimeout(() => setRabbitReaction("idle"), 1200);
    }
    setTimeout(() => handleNext(), 1000);
  };

  const handleNext = () => {
    setFeedback("");
    setTimer(10);
    if (current + 1 < questions.length) setCurrent((c) => c + 1);
    else { setQuestions(generateQuestions()); setCurrent(0); }
  };

  const currentQuestion = questions[current];

  const topButtonStyle = {
    padding: isMobile ? "6px 10px" : "10px 16px",
    borderRadius: "12px",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    background: "inherit",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
    fontSize: isMobile ? "0.8rem" : "1rem"
  };

  const cardStyle = { background: "inherit", boxShadow: "0 0 25px rgba(255,255,255,0.5), inset 0 0 15px rgba(255,255,255,0.3)", borderRadius: "25px", padding: isMobile ? "8px 18px" : "12px 30px" };

  const titleFont = isMobile ? "1.8rem" : "2.3rem";
  const scoreFont = isMobile ? "1.2rem" : "1.5rem";
  const questionFont = isMobile ? "1.3rem" : "1.6rem";
  const buttonFont = isMobile ? "1rem" : "1.1rem";
  const rabbitSize = isMobile ? "80px" : "120px";
  const sceneWidth = isMobile ? "80%" : "100%";

  return (
    <div className="min-h-screen w-full flex justify-center items-center p-4"
      style={{ background: "linear-gradient(135deg,#4e54c8,#8f94fb)", fontFamily: "'Comic Sans MS','Comic Neue','Arial Rounded MT Bold'", color: "#fff", position: "relative", overflow: "hidden", flexDirection: isMobile ? "column" : "row" }}
    >
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={150} />}
      {particles.map((p, idx) => <Particle key={idx} {...p} />)}

      {/* دکمه‌های زبان */}
      <div style={{ position: "absolute", top: "15px", left: "15px", display: "flex", gap: isMobile ? "8px" : "10px", flexDirection: isMobile ? "column" : "row", zIndex: 10 }}>
        <button style={topButtonStyle} onClick={() => setLang("fa")}>دری</button>
        <button style={topButtonStyle} onClick={() => setLang("ps")}>پشتو</button>
        <button style={topButtonStyle} onClick={() => setLang("en")}>English</button>
      </div>
      <button style={{ ...topButtonStyle, position: "absolute", top: "15px", right: "15px" }} onClick={() => window.history.back()}>⬅ Back</button>

      <div style={{ display: "flex", width: "100%", maxWidth: "960px", gap: isMobile ? "15px" : "20px", flexDirection: isMobile ? "column" : "row", alignItems: "center" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", marginTop: isMobile ? "30px" : "60px" }}>
          <div style={cardStyle}><h1 style={{ fontSize: titleFont, fontWeight: "bold", margin: 0, textShadow: "2px 2px 6px rgba(0,0,0,0.3)" }}>🏆 {translations[lang].title}</h1></div>

          <h2 style={{ ...cardStyle, fontSize: scoreFont, padding: '10px 20px', maxWidth: '80%', textAlign: lang === 'fa' || lang === 'ps' ? 'right' : 'center', direction: lang === 'fa' || lang === 'ps' ? 'rtl' : 'ltr', margin: "15px 0" }}>
            {translations[lang].score}: {score} | {translations[lang].level}: {level} | ⏱ {timer}s
          </h2>

          <div style={{ ...cardStyle, fontSize: questionFont, fontWeight: "bold", marginBottom: "15px", display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px' }}>
            <span style={{ fontSize: '2rem' }}>{currentQuestion?.correct?.emoji}</span>
            <span>{lang === "en" ? "Select the correct shape" : lang === "fa" ? "شکل درست را انتخاب کنید" : "صحیح شکل و انتخاب کړئ"}</span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "15px" }}>
            {currentQuestion?.options?.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(opt)} style={{ ...cardStyle, padding: '8px 14px', borderRadius: '20px', fontSize: buttonFont, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                <span style={{ fontSize: '1.5rem' }}>{opt.emoji}</span>
                <span>{lang === "en" ? opt.name.en : lang === "fa" ? opt.name.fa : opt.name.ps}</span>
              </button>
            ))}
          </div>

          {feedback && <div style={{ ...cardStyle, fontSize: questionFont, marginTop: "15px", textAlign: "center", maxWidth: "80%", margin: "0 auto", fontWeight: "bold" }}>{feedback}</div>}
        </div>

        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", marginTop: isMobile ? "20px" : "0" }}>
          <img src={puzzleScene} alt="Puzzle Scene" style={{ width: sceneWidth, objectFit: "contain", borderRadius: "20px", boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }} />
        </div>
      </div>

      {/* خرگوش فقط روی لپ‌تاپ */}
      {!isMobile && (
        <div style={{ position: "absolute", bottom: "15px", left: "15px", width: rabbitSize, height: rabbitSize }}>
          <img
            src={rabbitImg}
            alt="Rabbit"
            style={{
              width: "100%",
              height: "100%",
              transform: rabbitReaction === "happy" ? "translateY(-20px) rotate(-10deg)" :
                        rabbitReaction === "sad" ? "translateY(0) rotate(10deg)" : "translateY(0) rotate(0deg)",
              transition: "all 0.3s"
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes floatUp {0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(-50px) rotate(360deg)}}
        @keyframes softPulse {0%,100%{box-shadow:0 0 25px rgba(255,255,255,0.5), inset 0 0 15px rgba(255,255,255,0.3);}50%{box-shadow:0 0 35px rgba(255,255,255,0.7), inset 0 0 18px rgba(255,255,255,0.4);}}
      `}</style>
    </div>
  );
}
