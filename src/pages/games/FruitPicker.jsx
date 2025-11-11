import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import rabbitImg from "../../assets/rabbit.png";
import fruitScene from "../../assets/FruitPicker..png";

const translations = {
  fa: { title: "جمع‌آوری میوه‌ها", score: "امتیاز", level: "سطح", correct: "🎉 درست شد!", wrong: "❌ اشتباه شد!", question: "این میوه چیست؟", answerIs: "جواب درست این است" },
  ps: { title: "میوې راټول کړئ", score: "نمره", level: "کچه", correct: "🎉 سمه ده!", wrong: "❌ ناسم ده!", question: "دا مېوه څه شی ده؟", answerIs: "سم ځواب دا دی" },
  en: { title: "Fruit Picker", score: "Score", level: "Level", correct: "🎉 Correct!", wrong: "❌ Wrong!", question: "What is this fruit?", answerIs: "The correct answer is" },
};

const fruits = [
  { emoji: "🍎", name: { fa: "سیب", ps: "سیب", en: "Apple" } },
  { emoji: "🍌", name: { fa: "موز", ps: "کیله", en: "Banana" } },
  { emoji: "🍇", name: { fa: "انگور", ps: "انګور", en: "Grape" } },
  { emoji: "🍓", name: { fa: "توت فرنگی", ps: "توت", en: "Strawberry" } },
];

function shuffleArray(array) { return array.sort(() => Math.random() - 0.5); }

export default function FruitPicker() {
  const [lang, setLang] = useState("fa");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [currentFruit, setCurrentFruit] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [particles, setParticles] = useState([]);
  const [rabbitReaction, setRabbitReaction] = useState("idle");
  const [timer, setTimer] = useState(10);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  const backgroundColor = "#8BC6EC";
  const cardColor = "#8BC6EC";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => pickNewFruit(), []);

  useEffect(() => {
    if (!currentFruit) return;
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          setFeedback(`⏱ ${translations[lang].wrong} | ${translations[lang].answerIs}: ${currentFruit.name[lang]}`);
          setScore((s) => Math.max(0, s - 1));
          setRabbitReaction("sad");
          setTimeout(() => setRabbitReaction("idle"), 1200);
          setTimeout(() => pickNewFruit(), 1500);
          return 10;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentFruit, lang]);

  const pickNewFruit = () => {
    const nextFruit = fruits[Math.floor(Math.random() * fruits.length)];
    setCurrentFruit(nextFruit);
    let otherOptions = fruits.filter((f) => f !== nextFruit);
    otherOptions = shuffleArray(otherOptions).slice(0, 3);
    setShuffledOptions(shuffleArray([nextFruit, ...otherOptions]));
    setTimer(10);
    setFeedback("");
  };

  const checkAnswer = (fruit) => {
    if (fruit.name[lang] === currentFruit.name[lang]) {
      setScore((s) => s + 1);
      setFeedback(translations[lang].correct);
      setShowConfetti(true);
      setRabbitReaction("happy");
      setParticles([...Array(12)].map(() => ({
        x: Math.random() * windowSize.width * 0.6,
        y: Math.random() * windowSize.height * 0.5,
        emoji: ["⭐", "🍎", "🍌"][Math.floor(Math.random() * 3)],
      })));
      setTimeout(() => { setShowConfetti(false); setParticles([]); setRabbitReaction("idle"); }, 1500);
      if ((score + 1) % 5 === 0) setLevel((l) => l + 1);
    } else {
      setFeedback(`${translations[lang].wrong} | ${translations[lang].answerIs}: ${currentFruit.name[lang]}`);
      setRabbitReaction("sad");
      setTimeout(() => setRabbitReaction("idle"), 1200);
    }
    pickNewFruit();
  };

  const Particle = ({ x, y, emoji }) => (
    <div style={{
      position: "absolute",
      top: y,
      left: x,
      fontSize: Math.random() * 24 + 16,
      opacity: 0.8,
      transform: `translateY(${Math.random() * -50}px) rotate(${Math.random() * 360}deg)`,
      animation: `floatUp ${1 + Math.random()}s ease-out forwards`,
    }}>{emoji}</div>
  );

  const cardStyle = {
    background: cardColor,
    boxShadow: "0 0 20px rgba(255,255,255,0.5), inset 0 0 10px rgba(255,255,255,0.3)",
    borderRadius: "20px",
    padding: isMobile ? "6px 15px" : "12px 25px",
    fontSize: isMobile ? "0.85rem" : "1rem",
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
    width: isMobile ? "85%" : "auto",
  };

  const topButtonStyle = {
    padding: isMobile ? "5px 10px" : "10px 16px",
    borderRadius: "12px",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
    background: cardColor,
    fontSize: isMobile ? "0.75rem" : "1rem",
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
      background: backgroundColor,
    }}>
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={150} />}
      {particles.map((p,i)=><Particle key={i} {...p} />)}

      {/* دکمه‌های زبان */}
      <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "5px" : "10px", zIndex:10 }}>
        <button style={topButtonStyle} onClick={()=>setLang("fa")}>دری</button>
        <button style={topButtonStyle} onClick={()=>setLang("ps")}>پشتو</button>
        <button style={topButtonStyle} onClick={()=>setLang("en")}>English</button>
      </div>

      <button style={{...topButtonStyle, position:"absolute", top:"12px", right:"12px"}} onClick={()=>window.history.back()}>⬅ Back</button>

      <div style={{ display:"flex", flexDirection:isMobile?"column":"row", width:"100%", maxWidth:"960px", gap:isMobile?"10px":"15px", alignItems:"center" }}>
      {/* بخش اصلی */}
<div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", marginTop: isMobile ? "50px" : "50px" }}>
  {/* کارت عنوان */}
  <div style={{
    background: cardColor,
    boxShadow: "0 0 25px rgba(255,255,255,0.5), inset 0 0 15px rgba(255,255,255,0.3)",
    borderRadius: "25px",
    padding: isMobile ? "12px 25px" : "12px 30px",
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "15px"
  }}>
    <h1 style={{ fontSize: isMobile ? "1.8rem" : "2.3rem", margin: 0, textShadow: "2px 2px 6px rgba(0,0,0,0.3)" }}>
      🍓 {translations[lang].title}
    </h1>
  </div>

  {/* کارت امتیاز و سطح */}
  <h2 style={{
    background: cardColor,
    boxShadow: "0 0 25px rgba(255,255,255,0.5), inset 0 0 15px rgba(255,255,255,0.3)",
    borderRadius: "25px",
    padding: isMobile ? "10px 18px" : "12px 25px",
    fontSize: isMobile ? "1.3rem" : "1.5rem",
    margin: "15px 0",
    textAlign: lang === "fa" || lang === "ps" ? "right" : "center",
    direction: lang === "fa" || lang === "ps" ? "rtl" : "ltr",
    fontWeight: "bold",
    color: "#fff"
  }}>
    {translations[lang].score}: {score} | {translations[lang].level}: {level} | ⏱ {timer}s
  </h2>

  {/* کارت سوال */}
  <div style={{
    background: cardColor,
    boxShadow: "0 0 25px rgba(255,255,255,0.5), inset 0 0 15px rgba(255,255,255,0.3)",
    borderRadius: "25px",
    padding: isMobile ? "8px 20px" : "12px 25px",
    fontSize: isMobile ? "1.4rem" : "1.6rem",
    display: "flex",
    alignItems: "center",
    gap: isMobile ? "6px" : "12px",
    marginBottom: "15px",
    fontWeight: "bold",
    color: "#fff"
  }}>
    <span style={{ fontSize: isMobile ? "2rem" : "3rem" }}>{currentFruit?.emoji}</span>
    <span>{translations[lang].question}</span>
  </div>

  {/* گزینه‌ها */}
  <div style={{ display: "flex", flexWrap: "wrap", gap: isMobile ? "6px" : "12px", justifyContent: "center", marginBottom: "15px" }}>
    {shuffledOptions.map((f, i) => (
      <button key={i} onClick={() => checkAnswer(f)} style={{
        background: cardColor,
        boxShadow: "0 0 25px rgba(255,255,255,0.5), inset 0 0 15px rgba(255,255,255,0.3)",
        borderRadius: "25px",
        padding: isMobile ? "8px 15px" : "10px 18px",
        fontSize: isMobile ? "1rem" : "1.1rem",
        display: "flex",
        alignItems: "center",
        gap: isMobile ? "4px" : "6px",
        cursor: "pointer",
        color: "#fff",
        fontWeight: "bold"
      }}>
        <span style={{ fontSize: isMobile ? "1.5rem" : "1.8rem" }}>{f.emoji}</span>
        <span>{f.name[lang]}</span>
      </button>
    ))}
  </div>

  {/* بازخورد */}
  {feedback && (
    <div style={{
      background: cardColor,
      boxShadow: "0 0 25px rgba(255,255,255,0.5), inset 0 0 15px rgba(255,255,255,0.3)",
      borderRadius: "25px",
      padding: isMobile ? "10px 18px" : "12px 25px",
      fontSize: isMobile ? "1.3rem" : "1.5rem",
      marginTop: "15px",
      textAlign: "center",
      color: "#fff",
      fontWeight: "bold"
    }}>
      {feedback}
    </div>
  )}
</div>
        {/* تصویر */}
        <div style={{ flex:1, display:"flex", justifyContent:isMobile?"center":"flex-end", alignItems:"center", marginTop:isMobile?"15px":"0" }}>
          <img src={fruitScene} alt="Fruit Scene" style={{ width:isMobile?"75%":"320px", maxHeight:isMobile?"220px":"400px", objectFit:"contain", borderRadius:"20px", boxShadow:"0 10px 20px rgba(0,0,0,0.5)" }}/>
        </div>
      </div>

      {/* خرگوش فقط لپ‌تاپ */}
      {!isMobile && (
        <div style={{ position:"absolute", bottom:"15px", left:"15px", width:"120px", height:"120px" }}>
          <img src={rabbitImg} alt="Rabbit" style={{ width:"100%", height:"100%", transform: rabbitReaction==="happy"?"translateY(-20px) rotate(-10deg)":rabbitReaction==="sad"?"translateY(0) rotate(10deg)":"translateY(0) rotate(0deg)", transition:"all 0.3s"}}/>
        </div>
      )}

      <style>{`
        @keyframes floatUp {0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(-50px) rotate(360deg)}}
      `}</style>
    </div>
  );
}
