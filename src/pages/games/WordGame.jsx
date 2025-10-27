import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import wordImage from "../../assets/word1.png";
import rabbitImg from "../../assets/rabbit.png";

const translations = {
  fa: { title: "بازی کلمات", score: "امتیاز", level: "سطح", correct: "🎉 درست شد!", wrong: "❌ اشتباه شد!", answerIs: "جواب درست این است", questionText: "کدام یک از کلمات زیر درست است؟" },
  ps: { title: "د کلمو لوبه", score: "نمره", level: "کچه", correct: "🎉 سمه ده!", wrong: "❌ ناسم ده!", answerIs: "سمه ځواب ده", questionText: "لاندینۍ کلمه سمه ده؟" },
  en: { title: "Word Game", score: "Score", level: "Level", correct: "🎉 Correct!", wrong: "❌ Wrong!", answerIs: "The correct answer is", questionText: "Choose the correct word:" },
};

const wordBank = {
  fa: ["گربه", "سگ", "پرنده", "ماهی", "خرگوش", "اسب", "گاو", "شیر", "خر", "سنجاب", "مرغ", "کلاغ", "فیل", "میمون", "مار"],
  ps: ["پیشو", "سپي", "مرغه", "کبان", "خرگوش", "اسپ", "ګاو", "زمری", "خر", "سپنجاب", "چرګ", "تور", "فیل", "میمون", "مار"],
  en: ["Cat", "Dog", "Bird", "Fish", "Rabbit", "Horse", "Cow", "Lion", "Donkey", "Squirrel", "Chicken", "Crow", "Elephant", "Monkey", "Snake"],
};

// تولید 15 سوال تصادفی با گزینه‌ها
const generateQuestions = (lang) => {
  const allWords = wordBank[lang];
  const qs = [];
  const shuffled = [...allWords].sort(() => Math.random() - 0.5);

  for (let i = 0; i < 15; i++) {
    const correct = shuffled[i % shuffled.length];
    let options = new Set();
    options.add(correct);
    while (options.size < 4) {
      options.add(allWords[Math.floor(Math.random() * allWords.length)]);
    }
    options = Array.from(options).sort(() => Math.random() - 0.5);
    qs.push({ word: correct, options });
  }
  return qs;
};

function Particle({ x, y, emoji }) {
  return <div style={{ position: "absolute", top: y, left: x, fontSize: Math.random() * 24 + 16, opacity: 0.8, transform: `translateY(${Math.random() * -50}px) rotate(${Math.random() * 360}deg)`, animation: `floatUp ${1 + Math.random()}s ease-out forwards` }}>{emoji}</div>;
}

export default function WordGame() {
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

  const loadQuestions = (lang) => {
    const qs = generateQuestions(lang);
    setQuestions(qs);
    setCurrent(0);
    setTimer(10);
    setCorrectInLevel(0);
  };

  useEffect(() => { loadQuestions(language); }, [language]);

  useEffect(() => {
    if (!questions.length) return;
    if (timer <= 0) {
      const q = questions[current];
      setFeedback(`⏱ ${translations[language].wrong} | ${translations[language].answerIs}: ${q.word}`);
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
    if (choice === q.word) {
      setScore((s) => s + 1);
      setCorrectInLevel((c) => c + 1);
      setFeedback(translations[language].correct);
      setShowConfetti(true);
      setParticles([...Array(12)].map(() => ({ x: Math.random() * window.innerWidth * 0.6, y: Math.random() * window.innerHeight * 0.5, emoji: ["⭐","🎈","🧮"][Math.floor(Math.random() * 3)] })));
      setRabbitReaction("happy");
      setTimeout(() => { setShowConfetti(false); setParticles([]); setRabbitReaction("idle"); }, 1500);
      if (correctInLevel + 1 >= 5 && level < 5) {
        setLevel((l) => l + 1);
        setFeedback(`🎉 به سطح ${level + 1} خوش آمدید!`);
      }
    } else {
      setScore((s) => Math.max(0, s - 1));
      setCorrectInLevel(0);
      setFeedback(`${translations[language].wrong} | ${translations[language].answerIs}: ${q.word}`);
      setRabbitReaction("sad");
      setTimeout(() => setRabbitReaction("idle"), 1200);
    }
    setTimeout(() => handleNext(choice === q.word), 1000);
  };

  const handleNext = () => {
    setFeedback("");
    if (current + 1 < questions.length) { setCurrent((c) => c + 1); setTimer(10); }
    else { loadQuestions(language); setCurrent(0); setTimer(10); }
  };

  const topButtonStyle = { padding: "10px 16px", borderRadius: "12px", color: "#111827", border: "none", cursor: "pointer", fontWeight: "bold", boxShadow: "0 4px 10px rgba(0,0,0,0.3)", backgroundColor: "#FFD700" };
  const currentQuestion = questions[current] || { word: "", options: [] };

  return (
    <div className="min-h-screen w-full flex justify-center items-center p-4" style={{ background: "linear-gradient(135deg,#ff4e50,#f9d423)", fontFamily: "'Comic Sans MS','Comic Neue','Arial Rounded MT Bold'", color: "#fff", position: "relative", overflow: "hidden" }}>
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={150} />}
      {particles.map((p, idx) => <Particle key={idx} {...p} />)}

      <div style={{ position: "absolute", top: "15px", left: "15px", display: "flex", gap: "10px", zIndex: 10 }}>
        <button style={topButtonStyle} onClick={() => setLanguage("fa")}>دری</button>
        <button style={topButtonStyle} onClick={() => setLanguage("ps")}>پشتو</button>
        <button style={topButtonStyle} onClick={() => setLanguage("en")}>English</button>
      </div>

      <button style={{ ...topButtonStyle, position: "absolute", top: "15px", right: "15px" }} onClick={() => window.history.back()}>⬅ Back</button>

      <div style={{ display: "flex", width: "100%", maxWidth: "960px", justifyContent: "space-between", gap: "15px" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", marginTop: "80px" }}>
          <div style={{ background: "rgba(255, 165, 0, 0.9)", borderRadius: "25px", padding: "12px 30px", boxShadow: "0 4px 15px rgba(0,0,0,0.4), inset 0 0 10px rgba(255,255,255,0.3)", animation: "softPulse 4s ease-in-out infinite", marginBottom: "15px" }}>
            <h1 style={{ fontSize: "2.3rem", fontWeight: "bold", margin: 0, color: "#fff", textShadow: "2px 2px 6px rgba(0,0,0,0.3)" }}>🏆 {translations[language].title}</h1>
          </div>

          <h2 style={{ fontSize: '1.5rem', margin: "0 0 15px 0", fontWeight: 'bold', padding: '12px 25px', borderRadius: '20px', maxWidth: '80%', textAlign: language === 'fa' || language === 'ps' ? 'right' : 'center', direction: language === 'fa' || language === 'ps' ? 'rtl' : 'ltr', color: '#fff', background: 'linear-gradient(135deg, #FFA500, #FFB347)', boxShadow: '0 0 20px rgba(255,165,0,0.7), 0 0 40px rgba(255,200,0,0.5)', textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>{translations[language].score}: {score} | {translations[language].level}: {level} | ⏱ {timer}s</h2>

          <div style={{ fontSize: "1.6rem", fontWeight: "bold", padding: "15px 28px", borderRadius: "25px", background: 'linear-gradient(135deg, #FFA500, #FFB347)', boxShadow: '0 0 20px rgba(255,165,0,0.7), 0 0 40px rgba(255,200,0,0.5)', textShadow: '1px 1px 3px rgba(0,0,0,0.3)', marginBottom: "15px", textAlign: 'center' }}>
            {translations[language].questionText}
            <div style={{ fontSize: "2rem", marginTop: "10px" }}>{currentQuestion.word}</div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "15px" }}>
            {currentQuestion.options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(opt)} className="jumpOption" style={{ padding: "10px 18px", borderRadius: "20px", color: "#fff", border: "none", cursor: "pointer", fontWeight: "bold", fontSize: "1.3rem", background: 'linear-gradient(135deg, #FFA500, #FFB347)', boxShadow: '0 0 20px rgba(255,165,0,0.7), 0 0 40px rgba(255,200,0,0.5)', textShadow: '1px 1px 3px rgba(0,0,0,0.3)', transition: "transform 0.2s, box-shadow 0.2s" }}>{opt}</button>
            ))}
          </div>

          {feedback && (
            <div style={{ fontSize: "1.6rem", marginTop: "15px", textAlign: "center", color: "#fff", fontWeight: "bold", padding: "15px 25px", borderRadius: "18px", background: "linear-gradient(135deg, #FFA500, #FFB347)", boxShadow: "0 0 25px rgba(255,165,0,0.8), 0 0 50px rgba(255,200,0,0.6)", textShadow: "1px 1px 3px rgba(0,0,0,0.3)", maxWidth: "80%", margin: "0 auto" }}>{feedback}</div>
          )}
        </div>

        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <img src={wordImage} alt="Word" style={{ height: "400px", width: "auto", objectFit: "contain", borderRadius: "20px", boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }} />
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "15px", left: "15px", width: "120px", height: "120px" }}>
        <img src={rabbitImg} alt="Rabbit" style={{ width: "100%", height: "100%", transform: rabbitReaction === "happy" ? "translateY(-20px) rotate(-10deg)" : rabbitReaction === "sad" ? "translateY(0) rotate(10deg)" : "translateY(0) rotate(0deg)", transition: "all 0.3s" }} />
      </div>

      <style>{`
        @keyframes floatUp {0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(-50px) rotate(360deg)}}
        @keyframes jumpButton {0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);} }
        @keyframes softPulse {0%, 100% { box-shadow: 0 0 15px rgba(255, 255, 255, 0.4), inset 0 0 10px rgba(255,255,255,0.3); } 50% { box-shadow: 0 0 25px rgba(255,255,255,0.6), inset 0 0 12px rgba(255,255,255,0.4); }}
        button.jumpOption {animation: jumpButton 0.6s ease-in-out;}
        button:hover {transform: scale(1.05); box-shadow:0 6px 18px rgba(0,0,0,0.4);}
      `}</style>
<style>{`
  @keyframes floatUp {0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(-50px) rotate(360deg)}}

  /* ریسپانسیو موبایل */
  @media (max-width: 768px) {
    div[style*="display:flex"][style*="width:100%"][style*="maxWidth:960px"] {
      flex-direction: column !important;
      align-items: center !important;
      gap: 20px !important;
    }
    div[style*="flex:1"][style*="justifyContent:flex-end"] {
      flex: 1 !important;
      width: 80% !important;
      max-height: 300px !important;
    }
    div[style*="fontSize: \"2.3rem\""] { font-size: 1.8rem !important; }
    div[style*="fontSize:'1.5rem'"] { font-size: 1.2rem !important; padding: 10px 18px !important; }
    div[style*="fontSize:\"1.6rem\""] { font-size: 1.3rem !important; padding: 12px 20px !important; }
    button[style*="fontSize:'1.1rem'"] { font-size: 1rem !important; padding: 8px 14px !important; }
    div[style*="position:\"absolute\""][style*="bottom:\"15px\""] { width: 80px !important; height: 80px !important; }
    img[alt="Coin"] { width: 80px !important; margin-top: 8px !important; }
  }
`}</style>

    </div>
  );
}
