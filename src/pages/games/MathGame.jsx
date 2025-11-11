import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import mathImage from "../../assets/math1.png";
import rabbitImg from "../../assets/rabbit.png";

const translations = {
  fa: { title: "بازی ریاضی", score: "امتیاز", level: "سطح", correct: "🎉 درست شد!", wrong: "❌ اشتباه شد!", answerIs: "جواب درست این است" },
  ps: { title: "د ریاضي لوبه", score: "نمره", level: "کچه", correct: "🎉 سمه ده!", wrong: "❌ ناسم ده!", answerIs: "سمه ځواب ده" },
  en: { title: "Math Game", score: "Score", level: "Level", correct: "🎉 Correct!", wrong: "❌ Wrong!", answerIs: "The correct answer is" },
};

const formatNumber = (num, lang) => {
  if (num === undefined || num === null) return "";
  if (lang === "fa" || lang === "ps") {
    const arabicNumbers = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
    return num.toString().replace(/\d/g, d => arabicNumbers[d]);
  }
  return num.toString();
};

const getQuestionText = (a, b, op, lang, level) => {
  const na = formatNumber(a, lang);
  const nb = formatNumber(b, lang);
  if (lang === "fa") return `${na} ${op} ${nb} چند می‌شود؟`;
  if (lang === "ps") return `${na} ${op} ${nb} څو کېږي؟`;
  if (level === 1) return `What is ${a} + ${b}?`;
  if (level === 2) return `What is ${a} - ${b}?`;
  if (level === 3) return `What is ${a} × ${b}?`;
  return `What is ${a} ÷ ${b}?`;
};

const generateQuestionsByLevel = (level, lang) => {
  const qs = [];
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  for (let i = 0; i < 5; i++) {
    let a, b, correct;
    if (level === 1) { a = getRandom(1, 10); b = getRandom(1, 10); correct = a + b; }
    if (level === 2) { a = getRandom(5, 15); b = getRandom(1, 5); correct = a - b; }
    if (level === 3) { a = getRandom(1, 5); b = getRandom(1, 5); correct = a * b; }
    if (level === 4) { b = getRandom(1, 5); correct = getRandom(1, 5); a = b * correct; }
    let options = new Set();
    options.add(correct);
    while (options.size < 4) {
      let delta = getRandom(-2, 2);
      if (delta === 0) delta = 1;
      options.add(correct + delta);
    }
    options = Array.from(options).sort(() => Math.random() - 0.5);
    qs.push({ question: getQuestionText(a, b, ["+","-","×","÷"][level-1], lang, level), options, correct });
  }
  return qs;
};

function Particle({ x, y, emoji }) {
  return <div style={{ position:"absolute", top:y, left:x, fontSize:Math.random()*24+16, opacity:0.8, transform:`translateY(${Math.random()*-50}px) rotate(${Math.random()*360}deg)`, animation:`floatUp ${1+Math.random()}s ease-out forwards` }}>{emoji}</div>;
}

export default function MathGame() {
  const [language, setLanguage] = useState("en");
  const [questions, setQuestions] = useState([]);
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

  const loadQuestions = (lvl) => {
    const qs = generateQuestionsByLevel(lvl, language);
    setQuestions(qs);
    setCurrent(0);
    setTimer(10);
    setCorrectInLevel(0);
  };

  useEffect(() => {
    loadQuestions(level);
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [level, language]);

  useEffect(() => {
    if (!questions.length) return;
    if (timer <= 0) {
      const q = questions[current];
      setFeedback(`⏱ ${translations[language].wrong} | ${translations[language].answerIs}: ${formatNumber(q.correct, language)}`);
      setScore((s) => Math.max(0, s - 1));
      setRabbitReaction("sad");
      setCorrectInLevel(0);
      setTimeout(() => setRabbitReaction("idle"), 1200);
      setTimeout(() => handleNext(false), 1500);
      return;
    }
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer, questions, current]);

  const handleAnswer = (choice) => {
    const q = questions[current];
    if (!q) return;
    if (choice === q.correct) {
      setScore((s) => s + 1);
      setCorrectInLevel((c) => c + 1);
      setFeedback(translations[language].correct);
      setShowConfetti(true);
      setParticles([...Array(12)].map(() => ({ x: Math.random()*window.innerWidth*0.6, y: Math.random()*window.innerHeight*0.5, emoji: ["⭐","🎈","🧮"][Math.floor(Math.random()*3)] })));
      setRabbitReaction("happy");
      setTimeout(() => { setShowConfetti(false); setParticles([]); setRabbitReaction("idle"); }, 1500);
      if (correctInLevel + 1 >= 5 && level < 5) {
        setLevel((l) => l + 1);
        setFeedback(`🎉 به سطح ${formatNumber(level + 1, language)} خوش آمدید!`);
      }
    } else {
      setScore((s) => Math.max(0, s - 1));
      setCorrectInLevel(0);
      setFeedback(`${translations[language].wrong} | ${translations[language].answerIs}: ${formatNumber(q.correct, language)}`);
      setRabbitReaction("sad");
      setTimeout(() => setRabbitReaction("idle"), 1200);
    }
    setTimeout(() => handleNext(choice === q.correct), 1000);
  };

  const handleNext = () => {
    setFeedback("");
    if (current + 1 < questions.length) { setCurrent((c) => c + 1); setTimer(10); }
    else { loadQuestions(level); setCurrent(0); setTimer(10); }
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
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={150} />}
      {particles.map((p, idx) => <Particle key={idx} {...p} />)}

      {/* دکمه‌های زبان */}
      <div
        style={{
          position: "absolute",
          top: "15px",
          left: "15px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row", // موبایل عمودی
          gap: isMobile ? "8px" : "10px",
          zIndex: 10
        }}
      >
        <button style={topButtonStyle} onClick={() => setLanguage("fa")}>دری</button>
        <button style={topButtonStyle} onClick={() => setLanguage("ps")}>پشتو</button>
        <button style={topButtonStyle} onClick={() => setLanguage("en")}>English</button>
      </div>

      <button style={{ ...topButtonStyle, position: "absolute", top: "15px", right: "15px" }} onClick={() => window.history.back()}>⬅ Back</button>

      <div style={{ display: "flex", width: "100%", maxWidth: "960px", gap: isMobile ? "10px" : "15px", flexDirection: isMobile ? "column" : "row", alignItems: "center" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "rgba(255, 165, 0, 0.9)", borderRadius: "25px", padding: isMobile ? "8px 20px" : "12px 30px", boxShadow: "0 4px 15px rgba(0,0,0,0.4), inset 0 0 10px rgba(255,255,255,0.3)", animation: "softPulse 4s ease-in-out infinite", marginBottom: "15px" }}>
            <h1 style={{ fontSize: titleFontSize, fontWeight: "bold", margin: 0, color: "#fff", textShadow: "2px 2px 6px rgba(0,0,0,0.3)" }}>🏆 {translations[language].title}</h1>
          </div>

          <h2 style={{ fontSize: scoreFontSize, margin: "0 0 15px 0", fontWeight: 'bold', padding: isMobile ? "8px 12px" : "12px 25px", borderRadius: '20px', maxWidth: '80%', color: '#fff', background: 'linear-gradient(135deg, #FFA500, #FFB347)', boxShadow: '0 0 20px rgba(255,165,0,0.7), 0 0 40px rgba(255,200,0,0.5)', textShadow: '1px 1px 3px rgba(0,0,0,0.3)', textAlign: language==='fa'||language==='ps'?'right':'center', direction: language==='fa'||language==='ps'?'rtl':'ltr' }}>
            {translations[language].score}: {formatNumber(score, language)} | {translations[language].level}: {formatNumber(level, language)} | ⏱ {formatNumber(timer, language)}s
          </h2>

          <div style={{ fontSize: questionFontSize, fontWeight: "bold", padding: paddingBox, borderRadius: "25px", background: 'linear-gradient(135deg, #FFA500, #FFB347)', boxShadow: '0 0 20px rgba(255,165,0,0.7), 0 0 40px rgba(255,200,0,0.5)', textShadow: '1px 1px 3px rgba(0,0,0,0.3)', marginBottom: "15px", textAlign: 'center' }}>
            {currentQuestion.question}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "15px" }}>
            {currentQuestion.options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(opt)} className="jumpOption" style={{ padding: isMobile ? "6px 10px" : "10px 18px", borderRadius: "20px", color: "#fff", border: "none", cursor: "pointer", fontWeight: "bold", fontSize: optionFontSize, background: 'linear-gradient(135deg, #FFA500, #FFB347)', boxShadow: '0 0 20px rgba(255,165,0,0.7), 0 0 40px rgba(255,200,0,0.5)', textShadow: '1px 1px 3px rgba(0,0,0,0.3)', transition: "transform 0.2s, box-shadow 0.2s" }}>{language==='en'?opt:formatNumber(opt,language)}</button>
            ))}
          </div>

          {feedback && (
            <div style={{ fontSize: questionFontSize, marginTop: "15px", textAlign: "center", color: "#fff", fontWeight: "bold", padding: paddingBox, borderRadius: "18px", background: "linear-gradient(135deg, #FFA500, #FFB347)", boxShadow: "0 0 25px rgba(255,165,0,0.8), 0 0 50px rgba(255,200,0,0.6)", textShadow: "1px 1px 3px rgba(0,0,0,0.3)", maxWidth: "80%", margin: "0 auto" }}>{feedback}</div>
          )}
        </div>

        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", marginTop: isMobile ? "15px" : "0" }}>
          <img 
            src={mathImage} 
            alt="Math" 
            style={{ maxHeight: isMobile?"60%":"85%", width: "auto", objectFit: "contain", borderRadius: "20px", boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }} 
          />
        </div>
      </div>

      {!isMobile && (
        <div style={{ position: "absolute", bottom: "15px", left: "15px", width: "120px", height: "120px" }}>
          <img src={rabbitImg} alt="Rabbit" style={{ width: "100%", height: "100%", transform: rabbitReaction==="happy"?"translateY(-20px) rotate(-10deg)":rabbitReaction==="sad"?"translateY(0) rotate(10deg)":"translateY(0) rotate(0deg)", transition: "all 0.3s" }} />
        </div>
      )}

      <style>{`
        @keyframes floatUp {0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(-50px) rotate(360deg)}}
        @keyframes jumpButton {0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);} }
        @keyframes softPulse {0%, 100% { box-shadow: 0 0 15px rgba(255,255,255,0.4), inset 0 0 10px rgba(255,255,255,0.3); } 50% { box-shadow: 0 0 25px rgba(255,255,255,0.6), inset 0 0 12px rgba(255,255,255,0.4); }}
        button.jumpOption {animation: jumpButton 0.6s ease-in-out;}
        button:hover {transform: scale(1.05); box-shadow:0 6px 18px rgba(0,0,0,0.4);}
      `}</style>
    </div>
  );
}
