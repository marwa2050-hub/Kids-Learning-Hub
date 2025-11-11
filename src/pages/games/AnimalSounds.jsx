import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import cowImg from "../../assets/cow.png";
import dogImg from "../../assets/dog.png";
import catImg from "../../assets/cat.png";
import horseImg from "../../assets/horse.png";
import rabbitImg from "../../assets/rabbit.png";
import animalScene from "../../assets/animalScene.png";

const animals = [
  { name: { fa: "گاو", ps: "غوا", en: "Cow" }, img: cowImg },
  { name: { fa: "سگ", ps: "سپي", en: "Dog" }, img: dogImg },
  { name: { fa: "گربه", ps: "پيشو", en: "Cat" }, img: catImg },
  { name: { fa: "اسب", ps: "اسپ", en: "Horse" }, img: horseImg },
  { name: { fa: "خرگوش", ps: "خرگوش", en: "Rabbit" }, img: rabbitImg },
];

const translations = {
  fa: { title: "بازی حیوانات", score: "امتیاز", level: "سطح", correct: "🎉 درست شد!", wrong: "❌ اشتباه شد!", answerIs: "این حیوان است", questionText: ":حیوان درست را انتخاب کنید" },
  ps: { title: "د حیواناتو لوبه", score: "نمره", level: "کچه", correct: "🎉 سمه ده!", wrong: "❌ ناسم ده!", answerIs: "سم حیوان دی", questionText: ":سم حیوان انتخاب کړئ" },
  en: { title: "Animal Game", score: "Score", level: "Level", correct: "🎉 Correct!", wrong: "❌ Wrong!", answerIs: "This is the animal", questionText: "Choose the correct animal:" },
};

function Particle({ x, y, emoji }) {
  return <div style={{ position: "absolute", top: y, left: x, fontSize: Math.random() * 24 + 16, opacity: 0.8, transform: `translateY(${Math.random() * -50}px) rotate(${Math.random() * 360}deg)`, animation: `floatUp ${1 + Math.random()}s ease-out forwards` }}>{emoji}</div>;
}

export default function AnimalGame() {
  const [language, setLanguage] = useState("en");
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [feedback, setFeedback] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [particles, setParticles] = useState([]);
  const [rabbitReaction, setRabbitReaction] = useState("idle");
  const [timer, setTimer] = useState(10);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  const currentQuestion = animals[currentQ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!currentQuestion) return;
    if (timer <= 0) {
      handleAnswer(null);
      return;
    }
    const id = setTimeout(() => setTimer(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer, currentQ]);

  const handleAnswer = (choiceIndex) => {
    let correct = choiceIndex === currentQ;
    if (choiceIndex === null) correct = false;
    if (correct) {
      setScore(s => s + 1);
      setFeedback(translations[language].correct);
      setShowConfetti(true);
      setParticles([...Array(12)].map(() => ({ x: Math.random() * window.innerWidth * 0.6, y: Math.random() * window.innerHeight * 0.5, emoji: ["⭐","🎈","🐰"][Math.floor(Math.random()*3)] })));
      setRabbitReaction("happy");
      if ((score + 1) % 3 === 0) setLevel(l => l + 1);
    } else {
      setScore(s => Math.max(0, s - 1));
      setFeedback(`${translations[language].wrong} | ${translations[language].answerIs}: ${currentQuestion.name[language]}`);
      setRabbitReaction("sad");
    }

    setTimeout(() => {
      setShowConfetti(false);
      setParticles([]);
      setRabbitReaction("idle");
      nextQuestion();
    }, 1500);
  };

  const nextQuestion = () => {
    const next = Math.floor(Math.random() * animals.length);
    setCurrentQ(next);
    setTimer(10);
    setFeedback("");
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

  const titleFontSize = isMobile ? "1.5rem" : "2rem";
  const scoreFontSize = isMobile ? "1rem" : "1.2rem";
  const optionFontSize = isMobile ? "0.9rem" : "1rem";
  const feedbackFontSize = isMobile ? "1rem" : "1.4rem";
  const questionImgSize = isMobile ? "80px" : "100px";
  const sceneWidth = isMobile ? "90%" : "380px";
  const rabbitSize = isMobile ? "70px" : "90px";

  return (
    <div className="min-h-screen w-full flex justify-center items-center p-4"
      style={{
        background: "linear-gradient(135deg,#ff4e50,#f9d423)",
        fontFamily: "'Comic Sans MS','Comic Neue','Arial Rounded MT Bold'",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={150} />}
      {particles.map((p,i)=><Particle key={i} {...p} />)}

      {/* دکمه‌های زبان */}
      <div style={{ position: "absolute", top: "15px", left: "15px", display: "flex", gap: isMobile?"8px":"10px", flexDirection:isMobile?"column":"row", zIndex: 10 }}>
        <button style={topButtonStyle} onClick={()=>setLanguage("fa")}>دری</button>
        <button style={topButtonStyle} onClick={()=>setLanguage("ps")}>پشتو</button>
        <button style={topButtonStyle} onClick={()=>setLanguage("en")}>English</button>
      </div>
      <button style={{ ...topButtonStyle, position: "absolute", top: "15px", right: "15px" }} onClick={()=>window.history.back()}>⬅ Back</button>

      <div style={{ display:"flex", width:"100%", maxWidth:"960px", gap:isMobile?"10px":"15px", flexDirection:isMobile?"column":"row", alignItems:"center", justifyContent:"center" }}>
        <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", marginTop:isMobile?"40px":"80px", minWidth:"280px" }}>
          <div style={{ background:"rgba(255,165,0,0.9)", borderRadius:"25px", padding:isMobile?"8px 20px":"12px 30px", boxShadow:"0 4px 15px rgba(0,0,0,0.4), inset 0 0 10px rgba(255,255,255,0.3)", animation:"softPulse 4s ease-in-out infinite", marginBottom:"15px" }}>
            <h1 style={{ fontSize:titleFontSize, fontWeight:"bold", margin:0, color:"#fff", textShadow:"2px 2px 6px rgba(0,0,0,0.3)" }}>🏆 {translations[language].title}</h1>
          </div>

          <h2 style={{ fontSize:scoreFontSize, margin:"0 0 15px 0", fontWeight:"bold", padding:isMobile?"6px 12px":"10px 20px", borderRadius:"20px", maxWidth:"90%", textAlign:language==='fa'||language==='ps'?'right':'center', direction:language==='fa'||language==='ps'?'rtl':'ltr', color:"#fff", background:"linear-gradient(135deg, #FFA500, #FFB347)", boxShadow:"0 0 20px rgba(255,165,0,0.7),0 0 40px rgba(255,200,0,0.5)", textShadow:"1px 1px 3px rgba(0,0,0,0.3)" }}>
            {translations[language].score}: {score} | {translations[language].level}: {level} | ⏱ {timer}s
          </h2>

          <div style={{ fontSize:"1.2rem", fontWeight:"bold", padding:isMobile?"8px 12px":"12px 20px", borderRadius:"25px", background:"linear-gradient(135deg, #FFA500, #FFB347)", boxShadow:"0 0 20px rgba(255,165,0,0.7),0 0 40px rgba(255,200,0,0.5)", marginBottom:"15px", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
            <div style={{ marginBottom:"10px" }}>{translations[language].questionText}</div>
            <img src={currentQuestion.img} alt={currentQuestion.name[language]} style={{ width:questionImgSize, height:questionImgSize, objectFit:"contain", borderRadius:"15px", boxShadow:"0 4px 8px rgba(0,0,0,0.3)" }} />
          </div>

          <div style={{ display:"flex", flexWrap:"wrap", gap:"10px", justifyContent:"center", marginBottom:"15px" }}>
            {animals.map((a,i)=>(
              <button key={i} onClick={()=>handleAnswer(i)} className="jumpOption" style={{ padding:isMobile?"6px 10px":"10px 16px", borderRadius:"18px", color:"#fff", border:"none", cursor:"pointer", fontWeight:"bold", fontSize:optionFontSize, background:"linear-gradient(135deg, #FFA500, #FFB347)", boxShadow:"0 0 15px rgba(255,165,0,0.7),0 0 30px rgba(255,200,0,0.5)", textShadow:"1px 1px 3px rgba(0,0,0,0.3)", transition:"transform 0.2s, box-shadow 0.2s" }}>{a.name[language]}</button>
            ))}
          </div>

          {feedback && <div style={{ fontSize:feedbackFontSize, marginTop:"15px", textAlign:"center", color:"#fff", fontWeight:"bold", padding:isMobile?"8px 12px":"12px 20px", borderRadius:"18px", background:"linear-gradient(135deg,#FFA500,#FFB347)", boxShadow:"0 0 25px rgba(255,165,0,0.8),0 0 50px rgba(255,200,0,0.6)", textShadow:"1px 1px 3px rgba(0,0,0,0.3)", maxWidth:"90%", margin:"0 auto" }}>{feedback}</div>}
        </div>

        <div style={{ flex:1, display:"flex", justifyContent:"center", alignItems:"center", marginTop:isMobile?"15px":"0" }}>
          <img src={animalScene} alt="Animals Scene" style={{ height:"auto", width:sceneWidth, objectFit:"contain", borderRadius:"20px", boxShadow:"0 10px 20px rgba(0,0,0,0.5)" }} />
        </div>
      </div>

      {/* خرگوش */}
      {!isMobile && (
        <div style={{ position:"absolute", bottom:"15px", left:"15px", width:rabbitSize, height:rabbitSize }}>
          <img src={rabbitImg} alt="Rabbit" style={{ width:"100%", height:"100%", transform: rabbitReaction==='happy'?"translateY(-20px) rotate(-10deg)":rabbitReaction==='sad'?"translateY(0) rotate(10deg)":"translateY(0) rotate(0deg)", transition:"all 0.3s" }} />
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
