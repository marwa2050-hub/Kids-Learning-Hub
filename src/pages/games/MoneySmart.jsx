import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import rabbitImg from "../../assets/rabbit.png";
import moneyScene from "../../assets/Money.png";

// ایمپورت تصاویر سکه‌ها
import afghani1 from "../../assets/afghani_1.png";
import afghani5 from "../../assets/afghani_5.png";
import afghani10 from "../../assets/afghani_10.png";
import afghani20 from "../../assets/afghani_20.png";

const translations = {
  fa: { title: "هوشمند پول", score: "امتیاز", level: "سطح", correct: "🎉 درست شد!", wrong: "❌ اشتباه شد!", question: "این چند افغانی است؟", answerIs: "جواب درست این است" },
  ps: { title: "پیسې هوښیار", score: "نمره", level: "کچه", correct: "🎉 سمه ده!", wrong: "❌ ناسم ده!", question: "دا څو افغانی دي؟", answerIs: "سم ځواب دا دی" },
  en: { title: "Money Smart", score: "Score", level: "Level", correct: "🎉 Correct!", wrong: "❌ Wrong!", question: "How much is this coin?", answerIs: "The correct answer is" },
};

// لیست سکه‌ها/اسکناس‌ها با تصویر
const coins = [
  { img: afghani1, name: { fa: "1 افغانی", ps: "۱ افغانی", en: "1 Coin" }, value: 1 },
  { img: afghani5, name: { fa: "5 افغانی", ps: "۵ افغانی", en: "5 Coins" }, value: 5 },
  { img: afghani10, name: { fa: "10 افغانی", ps: "۱۰ افغانی", en: "10 Coins" }, value: 10 },
  { img: afghani20, name: { fa: "20 افغانی", ps: "۲۰ افغانی", en: "20 Coins" }, value: 20 },
];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

export default function MoneySmart() {
  const [lang, setLang] = useState("fa");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [currentCoin, setCurrentCoin] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [particles, setParticles] = useState([]);
  const [rabbitReaction, setRabbitReaction] = useState("idle");
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [timer, setTimer] = useState(10);

  const backgroundColor = "#8BC6EC"; 
  const cardColor = "#8BC6EC"; 

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => { pickNewCoin(); }, []);

  useEffect(() => {
    if (!currentCoin) return;
    const interval = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          setFeedback(`⏱ ${translations[lang].wrong} | ${translations[lang].answerIs}: ${currentCoin.name[lang]}`);
          setScore(s => Math.max(0, s - 1));
          setRabbitReaction("sad");
          setTimeout(() => setRabbitReaction("idle"), 1200);
          setTimeout(() => pickNewCoin(), 1500);
          return 10;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentCoin, lang]);

  const pickNewCoin = () => {
    const nextCoin = coins[Math.floor(Math.random() * coins.length)];
    setCurrentCoin(nextCoin);
    let otherOptions = coins.filter(c => c !== nextCoin);
    otherOptions = shuffleArray(otherOptions).slice(0, 3);
    setShuffledOptions(shuffleArray([nextCoin, ...otherOptions]));
    setTimer(10);
    setFeedback("");
  };

  const checkAnswer = (coin) => {
    if (coin.name[lang] === currentCoin.name[lang]) {
      setScore(s => s + 1);
      setFeedback(translations[lang].correct);
      setShowConfetti(true);
      setRabbitReaction("happy");
      setParticles([...Array(12)].map(() => ({
        x: Math.random() * windowSize.width * 0.6,
        y: Math.random() * windowSize.height * 0.5,
        emoji: ["⭐","🪙","💰"][Math.floor(Math.random()*3)]
      })));
      setTimeout(() => { setShowConfetti(false); setParticles([]); setRabbitReaction("idle"); }, 1500);
      if ((score + 1) % 5 === 0) setLevel(l => l + 1);
    } else {
      setFeedback(`${translations[lang].wrong} | ${translations[lang].answerIs}: ${currentCoin.name[lang]}`);
      setRabbitReaction("sad");
      setTimeout(() => setRabbitReaction("idle"), 1200);
    }
    pickNewCoin();
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
            <h1 style={{ fontSize: "2.3rem", margin: 0, textShadow: "2px 2px 6px rgba(0,0,0,0.3)" }}>💰 {translations[lang].title}</h1>
          </div>

          {/* کارت امتیاز و سطح */}
          <h2 style={{ ...cardLightStyle, padding: '12px 25px', maxWidth:'80%', fontSize:'1.5rem', margin:'15px 0', textAlign: lang==='fa'||lang==='ps'?'right':'center', direction: lang==='fa'||lang==='ps'?'rtl':'ltr' }}>
            {translations[lang].score}: {score} | {translations[lang].level}: {level} | ⏱ {timer}s
          </h2>

          {/* کارت سوال با تصویر پول */}
          <div style={{ ...cardLightStyle, fontSize:"1.6rem", fontWeight:"bold", marginBottom:"15px", display:'flex', flexDirection:'column', alignItems:'center', gap:'12px', padding:'15px 28px' }}>
            <span>{translations[lang].question}</span>
            <img src={currentCoin?.img} alt="Coin" style={{ width:"100px", marginTop:"10px" }} />
          </div>

          {/* گزینه‌ها فقط متن */}
          <div style={{ display: "flex", flexWrap:"wrap", gap:"12px", justifyContent:"center", marginBottom:"15px" }}>
            {shuffledOptions.map((c,i)=>(
              <button key={i} onClick={()=>checkAnswer(c)} style={{ ...cardLightStyle, padding:'10px 18px', borderRadius:'20px', fontSize:'1.1rem', cursor:'pointer' }}>
                {c.name[lang]}
              </button>
            ))}
          </div>

          {/* بازخورد */}
          {feedback && <div style={{ ...cardLightStyle, fontSize:"1.6rem", marginTop:"15px", maxWidth:"80%", textAlign:"center" }}>{feedback}</div>}
        </div>

        {/* تصویر سمت راست */}
        <div style={{ flex:1, display:"flex", justifyContent:"flex-end", alignItems:"center" }}>
          <img 
            src={moneyScene} 
            alt="Money Scene" 
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
