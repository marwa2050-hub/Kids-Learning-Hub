import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import colorImage from "../../assets/color.png";
import rabbitImg from "../../assets/rabbit.png";

const translations = {
  fa: { title: "بازی تطبیق رنگ", score: "امتیاز", level: "سطح", correct: "🎉 درست شد!", wrong: "❌ اشتباه شد!" },
  ps: { title: "د رنګونو لوبه", score: "نمره", level: "کچه", correct: "🎉 سمه ده!", wrong: "❌ ناسم ده!" },
  en: { title: "Color Match", score: "Score", level: "Level", correct: "🎉 Correct!", wrong: "❌ Wrong!" },
};

function Particle({ x, y, emoji }) {
  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: x,
        fontSize: Math.random() * 24 + 16,
        opacity: 0.8,
        transform: `translateY(${Math.random() * -50}px) rotate(${Math.random() * 360}deg)`,
        animation: `floatUp ${1 + Math.random()}s ease-out forwards`,
      }}
    >
      {emoji}
    </div>
  );
}

const colors = [
  { name: { fa: "قرمز", ps: "سره", en: "Red" }, value: "#FF0000" },
  { name: { fa: "آبی", ps: "شین", en: "Blue" }, value: "#0000FF" },
  { name: { fa: "سبز", ps: "شنه", en: "Green" }, value: "#00FF00" },
  { name: { fa: "زرد", ps: "ژېړ", en: "Yellow" }, value: "#FFFF00" },
  { name: { fa: "نارنجی", ps: "نارنجی", en: "Orange" }, value: "#FFA500" },
  { name: { fa: "بنفش", ps: "ارغواني", en: "Purple" }, value: "#800080" },
];

export default function ColorMatch() {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [questionColor, setQuestionColor] = useState({});
  const [feedback, setFeedback] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [lang, setLang] = useState("fa");
  const [particles, setParticles] = useState([]);
  const [rabbitReaction, setRabbitReaction] = useState("idle");
  const [timer, setTimer] = useState(10);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateQuestion = () => {
    const idx = Math.floor(Math.random() * colors.length);
    setQuestionColor(colors[idx]);
    setFeedback("");
    setRabbitReaction("idle");
    setTimer(10);
  };

  useEffect(() => generateQuestion(), [level, lang]);

  useEffect(() => {
    if (timer <= 0) {
      setFeedback(`${translations[lang].wrong} | ${questionColor.name ? questionColor.name[lang] : ""}`);
      setScore((s) => Math.max(0, s - 1));
      setRabbitReaction("sad");
      setTimeout(() => setRabbitReaction("idle"), 1200);
      setTimeout(generateQuestion, 1500);
    }
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer, questionColor]);

  const checkAnswer = (colorValue) => {
    if (colorValue === questionColor.value) {
      setScore((s) => s + 1);
      setFeedback(translations[lang].correct);
      setShowConfetti(true);
      setRabbitReaction("happy");
      setParticles([...Array(12)].map(() => ({ x: Math.random() * windowSize.width * 0.6, y: Math.random() * windowSize.height * 0.5, emoji: ["⭐","🎈","🧮"][Math.floor(Math.random()*3)] })));
      setTimeout(() => { setShowConfetti(false); setParticles([]); setRabbitReaction("idle"); }, 1500);
      if ((score + 1) % 5 === 0) setLevel(level + 1);
    } else {
      setFeedback(translations[lang].wrong);
      setRabbitReaction("sad");
      setTimeout(() => setRabbitReaction("idle"), 1200);
    }
    setTimeout(generateQuestion, 1200);
  };

  const topButtonStyle = {
    padding: isMobile ? "6px 10px" : "10px 16px",
    borderRadius: "12px",
    color: "#111827",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    backgroundColor: "#FFD700",
    fontSize: isMobile ? "0.8rem" : "1rem",
  };

  const titleFontSize = isMobile ? "1.6rem" : "2.3rem";
  const scoreFontSize = isMobile ? "1rem" : "1.5rem";
  const optionFontSize = isMobile ? "0.9rem" : "1.3rem";
  const feedbackFontSize = isMobile ? "1rem" : "1.6rem";
  const colorBoxSize = isMobile ? "80px" : "120px";
  const imageSize = isMobile ? "260px" : "400px";

  return (
    <div
      className="min-h-screen w-full flex justify-center items-center p-4"
      style={{
        background: "linear-gradient(135deg, #ff4e50, #f9d423)",
        fontFamily: "'Comic Sans MS','Comic Neue','Arial Rounded MT Bold'",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={150} />}
      {particles.map((p, idx) => <Particle key={idx} {...p} />)}

      {/* دکمه‌های زبان */}
      <div style={{ position:'absolute', top:'15px', left:'15px', display:'flex', flexDirection:isMobile?"column":"row", gap:isMobile?"8px":"10px", zIndex:10 }}>
        <button style={topButtonStyle} onClick={()=>setLang('fa')}>دری</button>
        <button style={topButtonStyle} onClick={()=>setLang('ps')}>پشتو</button>
        <button style={topButtonStyle} onClick={()=>setLang('en')}>English</button>
      </div>
      <button style={{ ...topButtonStyle, position:'absolute', top:'15px', right:'15px' }} onClick={()=>window.history.back()}>⬅ Back</button>

      <div style={{ display:'flex', width:'100%', maxWidth:'960px', gap:isMobile?"10px":"15px", flexDirection:isMobile?"column":"row", alignItems:'center', justifyContent:'center' }}>
        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', marginTop:isMobile?"40px":"80px" }}>
          <div style={{ background:'rgba(255,165,0,0.9)', borderRadius:'25px', padding:isMobile?"8px 20px":"12px 30px", boxShadow:'0 4px 15px rgba(0,0,0,0.4), inset 0 0 10px rgba(255,255,255,0.3)', animation:'softPulse 4s ease-in-out infinite', marginBottom:'15px' }}>
            <h1 style={{ fontSize: titleFontSize, fontWeight:'bold', margin:0, color:'#fff', textShadow:'2px 2px 6px rgba(0,0,0,0.3)' }}>🎨 {translations[lang].title}</h1>
          </div>

          <h2 style={{ fontSize: scoreFontSize, margin:'0 0 15px 0', fontWeight:'bold', padding:isMobile?"8px 12px":"12px 25px", borderRadius:'20px', maxWidth:'80%', textAlign: lang==='fa'||lang==='ps'?'right':'center', direction: lang==='fa'||lang==='ps'?'rtl':'ltr', color:'#fff', background:'linear-gradient(135deg, #FFA500, #FFB347)', boxShadow:'0 0 20px rgba(255,165,0,0.7),0 0 40px rgba(255,200,0,0.5)', textShadow:'1px 1px 3px rgba(0,0,0,0.3)'}}>
            {translations[lang].score}: {score} | {translations[lang].level}: {level} | ⏱ {timer}s
          </h2>

          <div style={{ width: colorBoxSize, height: colorBoxSize, borderRadius:'20px', backgroundColor:questionColor.value, margin:'15px 0', boxShadow:'0 0 20px rgba(255,165,0,0.7),0 0 40px rgba(255,200,0,0.5)'}}></div>

          <div style={{ display:'flex', flexWrap:'wrap', gap:'10px', justifyContent:'center', marginBottom:'15px' }}>
            {colors.map((c,i)=>(
              <button key={i} onClick={()=>checkAnswer(c.value)} className="jumpOption" style={{ padding:isMobile?"6px 10px":"10px 18px", borderRadius:'20px', color:'#fff', border:'none', cursor:'pointer', fontWeight:'bold', fontSize: optionFontSize, background:'linear-gradient(135deg, #FFA500, #FFB347)', boxShadow:'0 0 20px rgba(255,165,0,0.7),0 0 40px rgba(255,200,0,0.5)', textShadow:'1px 1px 3px rgba(0,0,0,0.3)', transition:'transform 0.2s, box-shadow 0.2s'}}>
                {lang==='en'?c.name.en:c.name[lang]}
              </button>
            ))}
          </div>

          {feedback && (
            <div style={{ fontSize: feedbackFontSize, marginTop:'15px', textAlign:'center', color:'#fff', fontWeight:'bold', padding:isMobile?"8px 12px":"15px 25px", borderRadius:'18px', background:'linear-gradient(135deg, #FFA500, #FFB347)', boxShadow:'0 0 25px rgba(255,165,0,0.8),0 0 50px rgba(255,200,0,0.6)', textShadow:'1px 1px 3px rgba(0,0,0,0.3)', maxWidth:'80%', margin:'0 auto'}}>
              {feedback}
            </div>
          )}
        </div>

        <div style={{ flex:1, display:'flex', justifyContent:'center', alignItems:'center', marginTop:isMobile?"15px":"0" }}>
          <img src={colorImage} alt="Color" style={{ width:imageSize, height:imageSize, objectFit:'contain', borderRadius:'20px', boxShadow:'0 10px 20px rgba(0,0,0,0.5)' }}/>
        </div>
      </div>

      {/* خرگوش فقط برای لپ‌تاپ */}
      {!isMobile && (
        <div style={{ position:'absolute', bottom:'15px', left:'15px', width:'120px', height:'120px' }}>
          <img src={rabbitImg} alt="Rabbit" style={{ width:'100%', height:'100%', transform:rabbitReaction==='happy'?'translateY(-20px) rotate(-10deg)':rabbitReaction==='sad'?'translateY(0) rotate(10deg)':'translateY(0) rotate(0deg)', transition:'all 0.3s' }}/>
        </div>
      )}

      <style>{`
        @keyframes floatUp {0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(-50px) rotate(360deg)}}
        @keyframes jumpButton {0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);} }
        @keyframes softPulse {0%, 100% { box-shadow: 0 0 15px rgba(255, 255, 255, 0.4), inset 0 0 10px rgba(255,255,255,0.3); } 50% { box-shadow: 0 0 25px rgba(255,255,255,0.6), inset 0 0 12px rgba(255,255,255,0.4); }}
        button.jumpOption {animation: jumpButton 0.6s ease-in-out;}
        button:hover {transform: scale(1.05); box-shadow:0 6px 18px rgba(0,0,0,0.4);}
      `}</style>
    </div>
  );
}
