import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import rabbitImg from "../../assets/rabbit.png";
import mazeScene from "../../assets/maz.png"; // تصویر ثابت سمت راست

const translations = {
  fa: { title: "هزارتوی ساده", score: "امتیاز", level: "سطح", correct: "🎉 رسیدی!", wrong: "❌ مسیر اشتباه است!" },
  ps: { title: "ساده ماز", score: "نمره", level: "کچه", correct: "🎉 رسید!", wrong: "❌ غلط لاره!" },
  en: { title: "Simple Maze", score: "Score", level: "Level", correct: "🎉 You made it!", wrong: "❌ Wrong move!" },
};

const directions = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };

// مپ نمونه
const mazeMap = [
  ["S", 0, 1, 0, 0],
  [1, 0, 1, 0, 1],
  [0, 0, 0, 0, 1],
  [0, 1, 1, 0, 0],
  [0, 0, 0, 1, "F"]
];

export default function SimpleMaze() {
  const [lang, setLang] = useState("fa");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [playerPos, setPlayerPos] = useState([0, 0]);
  const [particles, setParticles] = useState([]);
  const [rabbitReaction, setRabbitReaction] = useState("idle");
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // رنگ پس‌زمینه و کارت‌ها
  const backgroundColor = "#8BC6EC"; // رنگ پس‌زمینه جدید
  const cardColor = "#8BC6EC"; // رنگ کارت‌ها و دکمه‌ها مشابه پس‌زمینه

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (!directions[e.key]) return;
      setPlayerPos(([x, y]) => {
        const [dx, dy] = directions[e.key];
        const newX = x + dx;
        const newY = y + dy;
        if (mazeMap[newX] && mazeMap[newX][newY] !== 1) {
          if (mazeMap[newX][newY] === "F") {
            setScore(s => s + 5);
            setLevel(l => l + 1);
            setFeedback(translations[lang].correct);
            setShowConfetti(true);
            setRabbitReaction("happy");
            setParticles([...Array(12)].map(() => ({
              x: Math.random() * windowSize.width * 0.6,
              y: Math.random() * windowSize.height * 0.5,
              emoji: ["⭐","🎈","🏁"][Math.floor(Math.random()*3)]
            })));
            setTimeout(() => { 
              setShowConfetti(false); 
              setParticles([]); 
              setRabbitReaction("idle"); 
              resetPlayer(); 
              setFeedback("");
            }, 1500);
          } else {
            setFeedback("");
          }
          return [newX, newY];
        } else {
          setFeedback(translations[lang].wrong);
          setRabbitReaction("sad");
          setTimeout(() => setRabbitReaction("idle"), 1200);
          setTimeout(() => setFeedback(""), 1000);
          return [x, y];
        }
      });
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lang, windowSize]);

  const resetPlayer = () => setPlayerPos([0,0]);

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

  const renderCell = (cell, x, y) => {
    let style = {
      width: "50px",
      height: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius:"12px",
      background: "#6c63ff",
      fontSize:"1.5rem",
      color:"#fff"
    };
    if (cell === 1) style.background = "#333";
    if (playerPos[0] === x && playerPos[1] === y) style.background = "#ffdd57";
    if (cell === "F") style.background = "#3cff3c";
    return <div key={`${x}-${y}`} style={style}>{playerPos[0] === x && playerPos[1] === y ? <img src={rabbitImg} alt="Rabbit" style={{ width:"80%", height:"80%" }}/> : (cell==="F"?"🏁":null)}</div>
  };

  const cardLightStyle = {
    background: cardColor,
    boxShadow: "0 0 25px rgba(255,255,255,0.5), inset 0 0 15px rgba(255,255,255,0.3)",
    borderRadius: "25px",
    padding: "12px 30px",
    textAlign:"center",
    fontWeight:"bold",
    color:"#fff"
  };

  const topButtonStyle = {
    padding:'10px 16px',
    borderRadius:'12px',
    color:'#fff',
    border:'none',
    cursor:'pointer',
    fontWeight:'bold',
    boxShadow:'0 0 10px rgba(0,0,0,0.3)',
    background: cardColor
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
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      background: backgroundColor
    }}>
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={150} />}
      {particles.map((p, idx) => <Particle key={idx} {...p} />)}

      {/* دکمه‌های زبان */}
      <div style={{ position: "absolute", top: "15px", left: "15px", display: "flex", gap: "10px", zIndex: 10 }}>
        <button style={topButtonStyle} onClick={() => setLang("fa")}>دری</button>
        <button style={topButtonStyle} onClick={() => setLang("ps")}>پشتو</button>
        <button style={topButtonStyle} onClick={() => setLang("en")}>English</button>
      </div>
      <button style={{ ...topButtonStyle, position: "absolute", top: "15px", right: "15px" }} onClick={() => window.history.back()}>⬅ Back</button>

      <div style={{ display:"flex", width:"100%", maxWidth:"960px", gap:"15px" }}>
        <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", marginTop:"50px" }}>
          {/* کارت عنوان */}
          <div style={cardLightStyle}>
            <h1 style={{ fontSize: "2.3rem", margin: 0, textShadow: "2px 2px 6px rgba(0,0,0,0.3)" }}>🌀 {translations[lang].title}</h1>
          </div>

          {/* کارت امتیاز و سطح */}
          <h2 style={{ ...cardLightStyle, padding: '12px 25px', maxWidth:'80%', fontSize:'1.5rem', margin:'15px 0', textAlign: lang==='fa'||lang==='ps'?'right':'center', direction: lang==='fa'||lang==='ps'?'rtl':'ltr' }}>
            {translations[lang].score}: {score} | {translations[lang].level}: {level}
          </h2>

          {/* بازخورد */}
          {feedback && <div style={{ ...cardLightStyle, fontSize:"1.6rem", marginTop:"15px", maxWidth:"80%", textAlign:"center" }}>{feedback}</div>}

          {/* مپ */}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${mazeMap[0].length}, 50px)`, gap:"5px", marginTop:"15px" }}>
            {mazeMap.map((row, x) => row.map((cell, y) => renderCell(cell, x, y)))}
          </div>
        </div>

        {/* تصویر سمت راست */}
        <div style={{ flex:1, display:"flex", justifyContent:"flex-end", alignItems:"center" }}>
          <img 
            src={mazeScene} 
            alt="Maze Scene" 
            style={{ 
              width: "300px",         
              height: "400px",        
              objectFit: "contain", 
              borderRadius:"20px", 
              boxShadow:"0 10px 20px rgba(0,0,0,0.5)",
              flexShrink: 0            
            }}
          />
        </div>
      </div>

      {/* خرگوش */}
      <div style={{ position:"absolute", bottom:"15px", left:"15px", width:"120px", height:"120px" }}>
        <img src={rabbitImg} alt="Rabbit" style={{ width:"100%", height:"100%", transform: rabbitReaction==='happy'?'translateY(-20px) rotate(-10deg)':rabbitReaction==='sad'?'translateY(0) rotate(10deg)':'translateY(0) rotate(0deg)', transition:"all 0.3s" }}/>
      </div>

      <style>{`
        @keyframes floatUp {0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(-50px) rotate(360deg)}}
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
