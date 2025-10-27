import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import rabbitImg from "../../assets/rabbit.png";
import puzzleScene from "../../assets/puzzleScene.png"; // تصویر ثابت سمت راست

// شکل‌ها و استیکرها
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

// تابع برای تولید سوالات تصادفی
const generateQuestions = () => {
  const qs = [];
  for (let i = 0; i < 10; i++) {
    const idx = Math.floor(Math.random() * shapes.length);
    const correctShape = shapes[idx];
    const options = new Set();
    options.add(correctShape);
    while (options.size < 4) {
      options.add(shapes[Math.floor(Math.random() * shapes.length)]);
    }
    const shuffledOptions = Array.from(options).sort(() => Math.random() - 0.5);
    qs.push({ correct: correctShape, options: shuffledOptions });
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
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
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
  const topButtonStyle = { padding: "10px 16px", borderRadius: "12px", color: "#fff", border: "none", cursor: "pointer", fontWeight: "bold", background: "inherit", boxShadow: "0 0 10px rgba(0,0,0,0.3)" };

  const cardLightStyle = { background: "inherit", boxShadow: "0 0 25px rgba(255,255,255,0.5), inset 0 0 15px rgba(255,255,255,0.3)", borderRadius: "25px", padding: "12px 30px" };

  return (
    <div className="min-h-screen w-full flex justify-center items-center p-4" style={{ background: "linear-gradient(135deg,#4e54c8,#8f94fb)", fontFamily: "'Comic Sans MS','Comic Neue','Arial Rounded MT Bold'", color: "#fff", position: "relative", overflow: "hidden" }}>
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={150} />}
      {particles.map((p, idx) => <Particle key={idx} {...p} />)}

      {/* دکمه‌های زبان */}
      <div style={{ position: "absolute", top: "15px", left: "15px", display: "flex", gap: "10px", zIndex: 10 }}>
        <button style={topButtonStyle} onClick={() => setLang("fa")}>دری</button>
        <button style={topButtonStyle} onClick={() => setLang("ps")}>پشتو</button>
        <button style={topButtonStyle} onClick={() => setLang("en")}>English</button>
      </div>

      <button style={{ ...topButtonStyle, position: "absolute", top: "15px", right: "15px" }} onClick={() => window.history.back()}>⬅ Back</button>

      <div style={{ display: "flex", width: "100%", maxWidth: "960px", gap: "15px" }}>
        {/* بخش سوال و گزینه‌ها */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          {/* کارت عنوان */}
          <div style={cardLightStyle} className="softPulse" >
            <h1 style={{ fontSize: "2.3rem", fontWeight: "bold", margin: 0, color: "#fff", textShadow: "2px 2px 6px rgba(0,0,0,0.3)" }}>🏆 {translations[lang].title}</h1>
          </div>

          {/* کارت امتیاز و سطح */}
          <h2 style={{ ...cardLightStyle, padding: '12px 25px', maxWidth: '80%', textAlign: lang === 'fa' || lang === 'ps' ? 'right' : 'center', direction: lang === 'fa' || lang === 'ps' ? 'rtl' : 'ltr', fontSize:'1.5rem', margin:'0 0 15px 0' }}>
            {translations[lang].score}: {score} | {translations[lang].level}: {level} | ⏱ {timer}s
          </h2>

          {/* کارت سوال */}
          <div style={{ ...cardLightStyle, fontSize:"1.6rem", fontWeight:"bold", marginBottom:"15px", display:'flex', alignItems:'center', gap:'12px', padding:'15px 28px' }}>
            <span style={{ fontSize:'2rem' }}>{currentQuestion?.correct?.emoji}</span>
            <span>{lang==="en" ? "Select the correct shape" : lang==="fa" ? "شکل درست را انتخاب کنید" : "صحیح شکل و انتخاب کړئ"}</span>
          </div>

          {/* گزینه‌ها */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom:"15px" }}>
            {currentQuestion?.options?.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(opt)} style={{ ...cardLightStyle, padding:'10px 18px', borderRadius:'20px', fontSize:'1.1rem', display:'flex', alignItems:'center', gap:'6px', cursor:'pointer', fontWeight:'bold' }}>
                <span style={{ fontSize:'1.5rem' }}>{opt.emoji}</span>
                <span>{lang==="en"?opt.name.en:lang==="fa"?opt.name.fa:opt.name.ps}</span>
              </button>
            ))}
          </div>

          {/* بازخورد */}
          {feedback && <div style={{ ...cardLightStyle, fontSize:"1.6rem", marginTop:"15px", textAlign:"center", maxWidth:"80%", margin:"0 auto", fontWeight:"bold" }}>{feedback}</div>}
        </div>

        {/* تصویر سمت راست */}
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <img src={puzzleScene} alt="Puzzle Scene" style={{ maxHeight: "85%", objectFit: "contain", borderRadius: "20px", boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }} />
        </div>
      </div>

      {/* خرگوش */}
      <div style={{ position: "absolute", bottom: "15px", left: "15px", width: "120px", height: "120px" }}>
        <img src={rabbitImg} alt="Rabbit" style={{ width:"100%", height:"100%", transform: rabbitReaction==="happy" ? "translateY(-20px) rotate(-10deg)" : rabbitReaction==="sad" ? "translateY(0) rotate(10deg)" : "translateY(0) rotate(0deg)", transition:"all 0.3s" }} />
      </div>

      <style>{`
        @keyframes floatUp {0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(-50px) rotate(360deg)}}
        @keyframes softPulse {0%,100%{box-shadow:0 0 25px rgba(255,255,255,0.5), inset 0 0 15px rgba(255,255,255,0.3);}50%{box-shadow:0 0 35px rgba(255,255,255,0.7), inset 0 0 18px rgba(255,255,255,0.4);}}
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
