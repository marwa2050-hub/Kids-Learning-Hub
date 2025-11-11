import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import rabbitImg from "../../assets/rabbit.png";
import paintingScene from "../../assets/Painter.png";

const translations = {
  fa: { title: "نقاش کوچک", score: "امتیاز", level: "سطح", correct: "🎉 درست شد!", wrong: "❌ اشتباه شد!", question: "چه رنگ باید استفاده شود؟", answerIs: "جواب درست این است" },
  ps: { title: "کوچنی نقاش", score: "نمره", level: "کچه", correct: "🎉 سمه ده!", wrong: "❌ ناسم ده!", question: "کوم رنګ باید وکارول شي؟", answerIs: "سم ځواب دا دی" },
  en: { title: "Mini Painter", score: "Score", level: "Level", correct: "🎉 Correct!", wrong: "❌ Wrong!", question: "Which color should be used?", answerIs: "The correct answer is" },
};

const colors = [
  { emoji: "🟥", name: { fa: "قرمز", ps: "سره", en: "Red" }, hex: "#FF4C4C" },
  { emoji: "🟦", name: { fa: "آبی", ps: "شین", en: "Blue" }, hex: "#4C6EFF" },
  { emoji: "🟩", name: { fa: "سبز", ps: "شنه", en: "Green" }, hex: "#4CFF4C" },
  { emoji: "🟨", name: { fa: "زرد", ps: "ژېړ", en: "Yellow" }, hex: "#FFF34C" },
];

function shuffleArray(array) { return array.sort(() => Math.random() - 0.5); }

export default function MiniPainter() {
  const [lang, setLang] = useState("fa");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [currentColor, setCurrentColor] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [particles, setParticles] = useState([]);
  const [rabbitReaction, setRabbitReaction] = useState("idle");
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [timer, setTimer] = useState(10);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  const backgroundColor = "#8BC6EC"; 
  const cardColor = "#8BC6EC"; 

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => pickNewColor(), []);

  useEffect(() => {
    if (!currentColor) return;
    const interval = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          setFeedback(`⏱ ${translations[lang].wrong} | ${translations[lang].answerIs}: ${currentColor.name[lang]}`);
          setScore(s => Math.max(0, s - 1));
          setRabbitReaction("sad");
          setTimeout(() => setRabbitReaction("idle"), 1200);
          setTimeout(() => pickNewColor(), 1500);
          return 10;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentColor, lang]);

  const pickNewColor = () => {
    const nextColor = colors[Math.floor(Math.random() * colors.length)];
    setCurrentColor(nextColor);
    let otherOptions = colors.filter(c => c !== nextColor);
    otherOptions = shuffleArray(otherOptions).slice(0, 3);
    setShuffledOptions(shuffleArray([nextColor, ...otherOptions]));
    setTimer(10);
    setFeedback("");
  };

  const checkAnswer = (color) => {
    if (color.name[lang] === currentColor.name[lang]) {
      setScore(s => s + 1);
      setFeedback(translations[lang].correct);
      setShowConfetti(true);
      setRabbitReaction("happy");
      setParticles([...Array(12)].map(() => ({
        x: Math.random() * windowSize.width * 0.6,
        y: Math.random() * windowSize.height * 0.5,
        emoji: ["⭐","🖌️","🎨"][Math.floor(Math.random()*3)]
      })));
      setTimeout(() => { setShowConfetti(false); setParticles([]); setRabbitReaction("idle"); }, 1500);
      if ((score + 1) % 5 === 0) setLevel(l => l + 1);
    } else {
      setFeedback(`${translations[lang].wrong} | ${translations[lang].answerIs}: ${currentColor.name[lang]}`);
      setRabbitReaction("sad");
      setTimeout(() => setRabbitReaction("idle"), 1200);
    }
    pickNewColor();
  };

  const Particle = ({ x, y, emoji }) => {
    const style = {
      position: "absolute",
      top: y,
      left: x,
      fontSize: Math.random() * 24 + 16,
      opacity: 0.8,
      transform: `translateY(${Math.random() * -50}px) rotate(${Math.random() * 360}deg)`,
      animation: `floatUp ${1 + Math.random()}s ease-out forwards`,
    };
    return <div style={style}>{emoji}</div>;
  };

  const cardLightStyle = {
    background: cardColor,
    boxShadow: "0 0 25px rgba(255,255,255,0.5), inset 0 0 15px rgba(255,255,255,0.3)",
    borderRadius: "25px",
    padding: isMobile ? "8px 20px" : "12px 30px",
    textAlign:"center",
    fontWeight:"bold",
    color:"#fff",
    fontSize: isMobile ? "0.9rem" : "1rem"
  };

  const topButtonStyle = {
    padding:isMobile?'6px 10px':'10px 16px',
    borderRadius:'12px',
    color:'#fff',
    border:'none',
    cursor:'pointer',
    fontWeight:'bold',
    boxShadow:'0 0 10px rgba(0,0,0,0.3)',
    background: cardColor,
    fontSize:isMobile?'0.8rem':'1rem'
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      fontFamily: "'Comic Sans MS','Comic Neue','Arial Rounded MT Bold'",
      color: "#fff",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "center",
      alignItems: "center",
      padding: isMobile ? "10px" : "20px",
      background: backgroundColor
    }}>
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={150} />}
      {particles.map((p, idx) => <Particle key={idx} {...p} />)}

      {/* دکمه‌های زبان */}
      <div style={{
        position: "absolute", 
        top: "12px", 
        left: "12px", 
        display: "flex", 
        flexDirection:isMobile?"column":"row", 
        gap: isMobile?"6px":"10px",
        zIndex: 10
      }}>
        <button style={topButtonStyle} onClick={() => setLang("fa")}>دری</button>
        <button style={topButtonStyle} onClick={() => setLang("ps")}>پشتو</button>
        <button style={topButtonStyle} onClick={() => setLang("en")}>English</button>
      </div>

      <button style={{ ...topButtonStyle, position: "absolute", top: "12px", right: "12px" }} onClick={() => window.history.back()}>⬅ Back</button>

      <div style={{
        display:"flex", 
        flexDirection:isMobile?"column":"row", 
        width:"100%", 
        maxWidth:"960px", 
        gap:isMobile?"12px":"15px",
        alignItems:"center"
      }}>
        <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", marginTop:isMobile?"20px":"50px" }}>
          {/* کارت عنوان */}
          <div style={cardLightStyle}>
            <h1 style={{ fontSize:isMobile?"1.8rem":"2.3rem", margin:0, textShadow:"2px 2px 6px rgba(0,0,0,0.3)" }}>🎨 {translations[lang].title}</h1>
          </div>

          {/* کارت امتیاز و سطح */}
          <h2 style={{ ...cardLightStyle, padding: isMobile?"10px 18px":"12px 25px", maxWidth:'80%', fontSize:isMobile?"1.2rem":"1.5rem", margin:'15px 0', textAlign: lang==='fa'||lang==='ps'?'right':'center', direction: lang==='fa'||lang==='ps'?'rtl':'ltr' }}>
            {translations[lang].score}: {score} | {translations[lang].level}: {level} | ⏱ {timer}s
          </h2>

          {/* کارت سوال */}
          <div style={{ ...cardLightStyle, fontSize:isMobile?"1.3rem":"1.6rem", fontWeight:"bold", marginBottom:"15px", display:'flex', alignItems:'center', gap:isMobile?'8px':'12px', padding:isMobile?'10px 20px':'15px 28px' }}>
            <span style={{ fontSize:isMobile?'1.5rem':'2rem' }}>{currentColor?.emoji}</span>
            <span>{translations[lang].question}</span>
          </div>

          {/* گزینه‌ها */}
          <div style={{ display: "flex", flexWrap:"wrap", gap:isMobile?'8px':'12px', justifyContent:"center", marginBottom:"15px" }}>
            {shuffledOptions.map((c,i)=>(
              <button key={i} onClick={()=>checkAnswer(c)} style={{ ...cardLightStyle, padding:isMobile?'6px 12px':'10px 18px', borderRadius:'20px', fontSize:isMobile?'0.9rem':'1.1rem', display:'flex', alignItems:'center', gap:isMobile?'4px':'6px', cursor:'pointer' }}>
                <span style={{ fontSize:isMobile?'1.2rem':'1.5rem' }}>{c.emoji}</span>
                <span>{c.name[lang]}</span>
              </button>
            ))}
          </div>

          {/* بازخورد */}
          {feedback && <div style={{ ...cardLightStyle, fontSize:isMobile?"1.3rem":"1.6rem", marginTop:"15px", maxWidth:"80%", textAlign:"center" }}>{feedback}</div>}
        </div>

        {/* تصویر سمت راست */}
        <div style={{ flex:1, display:"flex", justifyContent:isMobile?"center":"flex-end", alignItems:"center", marginTop:isMobile?"20px":"0" }}>
          <img 
            src={paintingScene} 
            alt="Painting Scene" 
            style={{ 
              width: isMobile?"80%":"300px",         
              height: isMobile?"200px":"400px",        
              objectFit: "contain", 
              borderRadius:"20px", 
              boxShadow:"0 10px 20px rgba(0,0,0,0.5)",
              flexShrink: 0            
            }}
          />
        </div>
      </div>

      {/* خرگوش فقط در لپ‌تاپ */}
      {!isMobile && (
        <div style={{ position:"absolute", bottom:"15px", left:"15px", width:"120px", height:"120px" }}>
          <img src={rabbitImg} alt="Rabbit" style={{ 
            width:"100%", 
            height:"100%", 
            transform: rabbitReaction==='happy'?'translateY(-20px) rotate(-10deg)':rabbitReaction==='sad'?'translateY(0) rotate(10deg)':'translateY(0) rotate(0deg)', 
            transition:"all 0.3s" 
          }}/>
        </div>
      )}

      <style>{`
        @keyframes floatUp {0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(-50px) rotate(360deg)}}
      `}</style>
    </div>
  );
}
