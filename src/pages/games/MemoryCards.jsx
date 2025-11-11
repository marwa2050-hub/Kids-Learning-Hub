import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import rabbitImg from "../../assets/rabbit.png";
import memoryScene from "../../assets/memoryScene.png"; 

const translations = {
  fa: { title: "بازی حافظه", score: "امتیاز", level: "سطح" },
  ps: { title: "د حافظې لوبه", score: "نمره", level: "کچه" },
  en: { title: "Memory Cards", score: "Score", level: "Level" },
};

const cardSymbols = ["🍎","🍌","🍇","🍒","🍉","🍓","🥝","🍍"];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

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

export default function MemoryCards() {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [lang, setLang] = useState("fa");
  const [particles, setParticles] = useState([]);
  const [rabbitReaction, setRabbitReaction] = useState("idle");

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const doubled = shuffleArray([...cardSymbols, ...cardSymbols]);
    setCards(doubled.map((symbol, idx) => ({ id: idx, symbol })));
    setFlipped([]);
    setMatched([]);
  }, [level]);

  const handleFlip = (id) => {
    if (flipped.includes(id) || matched.includes(id)) return;
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].symbol === cards[second].symbol) {
        setMatched([...matched, first, second]);
        setScore(score + 1);
        setShowConfetti(true);
        setRabbitReaction("happy");
        setParticles([...Array(12)].map(() => ({ x: Math.random() * windowSize.width * 0.6, y: Math.random() * windowSize.height * 0.5, emoji: ['⭐','🎈','🃏'][Math.floor(Math.random()*3)] })));
        setTimeout(() => { setShowConfetti(false); setParticles([]); setRabbitReaction("idle"); }, 1500);
        if ((score + 1) % 5 === 0) setLevel(level + 1);
      } else {
        setRabbitReaction("sad");
        setTimeout(() => setRabbitReaction("idle"), 1200);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  const cardStyle = {
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.6rem",
    cursor: "pointer",
    boxShadow: "0 0 25px rgba(255,255,255,0.5), inset 0 0 15px rgba(255,255,255,0.3)",
    transition: "all 0.3s",
    backgroundColor: "#111827",
    color: "#fff",
  };

  const cardLightStyle = {
    background: "inherit",
    boxShadow: "0 0 25px rgba(255,255,255,0.5), inset 0 0 15px rgba(255,255,255,0.3)",
    borderRadius: "25px",
    padding: "12px 30px",
  };

  const topButtonStyle = {
    padding: isMobile ? "6px 10px" : "10px 16px",
    borderRadius:'12px',
    color:'#fff',
    border:'none',
    cursor:'pointer',
    fontWeight:'bold',
    boxShadow:'0 0 10px rgba(0,0,0,0.3)',
    backgroundColor:'inherit',
    fontSize: isMobile ? "0.8rem" : "0.95rem"
  };

  return (
    <div style={{
      background: "linear-gradient(135deg,#4e54c8,#8f94fb)",
      width: "100vw",
      minHeight: "100vh",
      fontFamily: "'Comic Sans MS','Chalkboard SE','Comic Neue','Marker Felt','Arial Rounded MT Bold','Helvetica Rounded',Arial,sans-serif",
      color: "#fff",
      position: "relative",
      overflow: "hidden",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      padding:isMobile?"6px":"12px"
    }}>
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={150} />}
      {particles.map((p,i)=><Particle key={i} {...p} />)}

      {/* دکمه‌های زبان */}
      <div style={{ position:'absolute', top:'15px', left:'15px', display:'flex', flexDirection:isMobile?"column":"row", gap:isMobile?"8px":"10px", zIndex:10 }}>
        <button style={topButtonStyle} onClick={()=>setLang('fa')}>دری</button>
        <button style={topButtonStyle} onClick={()=>setLang('ps')}>پشتو</button>
        <button style={topButtonStyle} onClick={()=>setLang('en')}>English</button>
      </div>
      <button style={{ ...topButtonStyle, position:'absolute', top:'15px', right:'15px' }} onClick={()=>window.history.back()}>⬅ Back</button>

      {/* بخش اصلی */}
      <div style={{
        display:"flex",
        flexDirection: isMobile ? "column" : "row",
        width:"100%",
        maxWidth:"960px",
        alignItems:"center",
        justifyContent:"center",
        gap:isMobile?"12px":"15px"
      }}>
        {/* سمت چپ */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", width:"100%" }}>
          <div style={cardLightStyle} className="softPulse">
            <h1 style={{ fontSize: isMobile ? "1.6rem" : "2.3rem", fontWeight:'bold', margin:0, textShadow:"2px 2px 6px rgba(0,0,0,0.3)" }}>🃏 {translations[lang].title}</h1>
          </div>

          <h2 style={{ ...cardLightStyle, padding: isMobile ? "8px 12px" : "12px 25px", fontSize:isMobile?"1rem":"1.5rem", margin:"10px 0", textAlign: lang==="fa"||lang==="ps"?"right":"center", direction: lang==="fa"||lang==="ps"?"rtl":"ltr" }}>
            {translations[lang].score}: {score} | {translations[lang].level}: {level}
          </h2>

          <div style={{ display:"grid", gridTemplateColumns: isMobile?"repeat(3,55px)":"repeat(4,68px)", gap:isMobile?"10px":"11px", justifyContent:"center" }}>
            {cards.map(card=>(
              <div key={card.id} onClick={()=>handleFlip(card.id)} style={{ ...cardStyle, width:isMobile?"55px":"68px", height:isMobile?"55px":"68px", fontSize:isMobile?"1.2rem":"1.6rem", backgroundColor: flipped.includes(card.id) || matched.includes(card.id) ? "#FFD700" : "#111827" }}>
                {(flipped.includes(card.id) || matched.includes(card.id)) ? card.symbol : ""}
              </div>
            ))}
          </div>
        </div>

        {/* سمت راست تصویر */}
        <div style={{ flex: isMobile?1:'0 0 400px', display:"flex", justifyContent:"center", alignItems:"flex-start", height:isMobile?"auto":'400px' }}>
          <img src={memoryScene} alt="Memory Scene" style={{ width:isMobile?"85%":"400px", height:isMobile?"auto":"400px", objectFit:"contain", borderRadius:'20px', boxShadow:'0 10px 20px rgba(0,0,0,0.5)' }} />
        </div>
      </div>

      {/* خرگوش فقط دسکتاپ */}
      {!isMobile && (
        <div style={{ position:'absolute', bottom:'15px', left:'15px', width:'120px', height:'120px' }}>
          <img src={rabbitImg} alt="Rabbit" style={{ width:'100%', transform: rabbitReaction==='happy'?'translateY(-20px) rotate(-10deg)':rabbitReaction==='sad'?'translateY(0) rotate(10deg)':'translateY(0) rotate(0deg)', transition:'all 0.3s' }} />
        </div>
      )}

      <style>{`
        @keyframes floatUp {0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(-50px) rotate(360deg)}}
        @keyframes softPulse {0%,100%{box-shadow:0 0 25px rgba(255,255,255,0.5), inset 0 0 15px rgba(255,255,255,0.3);}50%{box-shadow:0 0 35px rgba(255,255,255,0.7), inset 0 0 18px rgba(255,255,255,0.4);}}
      `}</style>
    </div>
  );
}
