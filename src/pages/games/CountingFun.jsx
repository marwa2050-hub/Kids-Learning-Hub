import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import rabbitImg from "../../assets/rabbit.png";
import countingScene from "../../assets/countingScene.png";

const translations = {
  fa: { title: "شمارش سرگرم‌کننده", score: "امتیاز", level: "سطح", correct: "🎉 درست شد!", wrong: "❌ اشتباه شد!", question: "چند دانه سیب می‌بینید؟" },
  ps: { title: "خوشحاله شمیرل", score: "نمره", level: "کچه", correct: "🎉 سمه ده!", wrong: "❌ ناسم ده!", question: "څومره مڼې وینئ؟" },
  en: { title: "Counting Fun", score: "Score", level: "Level", correct: "🎉 Correct!", wrong: "❌ Wrong!", question: "How many apples do you see?" },
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

export default function CountingFun() {
  const [lang, setLang] = useState("fa");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [count, setCount] = useState(Math.floor(Math.random() * 5) + 1);
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
      setFeedback(`⏱ ${translations[lang].wrong} | جواب درست: ${count}`);
      setScore((s) => Math.max(0, s - 1));
      setRabbitReaction("sad");
      setTimeout(() => setRabbitReaction("idle"), 1200);
      setTimeout(() => nextQuestion(), 1500);
      return;
    }
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  const nextQuestion = () => {
    setCount(Math.floor(Math.random() * 5) + 1);
    setFeedback("");
    setTimer(10);
  };

  const handleAnswer = (choice) => {
    if (choice === count) {
      setScore(score + 1);
      setFeedback(translations[lang].correct);
      setShowConfetti(true);
      setRabbitReaction("happy");
      setParticles(
        [...Array(12)].map(() => ({
          x: Math.random() * windowSize.width * 0.6,
          y: Math.random() * windowSize.height * 0.5,
          emoji: ["⭐", "🎈", "🍎"][Math.floor(Math.random() * 3)],
        }))
      );
      setTimeout(() => {
        setShowConfetti(false);
        setParticles([]);
        setRabbitReaction("idle");
      }, 1500);
      if ((score + 1) % 3 === 0) setLevel(level + 1);
    } else {
      setScore((s) => Math.max(0, s - 1));
      setFeedback(`${translations[lang].wrong} | جواب درست: ${count}`);
      setRabbitReaction("sad");
      setTimeout(() => setRabbitReaction("idle"), 1200);
    }
    setTimeout(() => nextQuestion(), 1200);
  };

  const cardLightStyle = {
    background: "inherit",
    boxShadow: "0 0 25px rgba(255,255,255,0.5), inset 0 0 15px rgba(255,255,255,0.3)",
    borderRadius: "25px",
    padding: "10px 20px",
  };

  const topButtonStyle = {
    padding: "8px 14px",
    borderRadius: "12px",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    background: "inherit",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
    fontSize: "0.9rem",
  };

  return (
    <div
      className="min-h-screen w-full flex justify-center items-center p-3"
      style={{
        background: "linear-gradient(135deg,#4e54c8,#8f94fb)",
        fontFamily: "'Comic Sans MS','Comic Neue','Arial Rounded MT Bold'",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={150} />}
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      {/* زبان‌ها */}
      <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", gap: "8px", zIndex: 10, flexWrap: "wrap" }}>
        <button style={topButtonStyle} onClick={() => setLang("fa")}>دری</button>
        <button style={topButtonStyle} onClick={() => setLang("ps")}>پشتو</button>
        <button style={topButtonStyle} onClick={() => setLang("en")}>English</button>
      </div>

      {/* دکمه بازگشت */}
      <button
        style={{
          ...topButtonStyle,
          position: "absolute",
          top: "12px",
          right: "12px",
        }}
        onClick={() => window.history.back()}
      >
        ⬅ Back
      </button>

      <div
        style={{
          display: "flex",
          flexDirection: windowSize.width < 768 ? "column" : "row",
          width: "100%",
          maxWidth: "960px",
          alignItems: "center",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        {/* بخش اصلی */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
          <div style={cardLightStyle} className="softPulse">
            <h1 style={{ fontSize: windowSize.width < 768 ? "1.8rem" : "2.3rem", fontWeight: "bold", margin: 0, textShadow: "2px 2px 6px rgba(0,0,0,0.3)" }}>
              🔢 {translations[lang].title}
            </h1>
          </div>

          <h2
            style={{
              ...cardLightStyle,
              padding: "10px 20px",
              maxWidth: "90%",
              textAlign: lang === "fa" || lang === "ps" ? "right" : "center",
              direction: lang === "fa" || lang === "ps" ? "rtl" : "ltr",
              fontSize: windowSize.width < 768 ? "1.1rem" : "1.5rem",
              marginTop: "10px",
            }}
          >
            {translations[lang].score}: {score} | {translations[lang].level}: {level} | ⏱ {timer}s
          </h2>

          <div
            style={{
              ...cardLightStyle,
              fontSize: windowSize.width < 768 ? "1.2rem" : "1.6rem",
              fontWeight: "bold",
              margin: "10px 0",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <span>{Array(count).fill("🍎").map((_, i) => <span key={i}>🍎</span>)}</span>
            <span>{translations[lang].question}</span>
          </div>

          {/* گزینه‌ها */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "15px" }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => handleAnswer(n)}
                style={{
                  ...cardLightStyle,
                  padding: windowSize.width < 768 ? "10px 18px" : "12px 22px",
                  borderRadius: "20px",
                  fontSize: windowSize.width < 768 ? "1.2rem" : "1.5rem",
                  cursor: "pointer",
                  fontWeight: "bold",
                  minWidth: "60px",
                }}
              >
                {n}
              </button>
            ))}
          </div>

          {feedback && (
            <div
              style={{
                ...cardLightStyle,
                fontSize: windowSize.width < 768 ? "1.2rem" : "1.6rem",
                textAlign: "center",
                maxWidth: "90%",
                margin: "0 auto",
                fontWeight: "bold",
              }}
            >
              {feedback}
            </div>
          )}
        </div>

        {/* تصویر */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
          <img
            src={countingScene}
            alt="Counting Scene"
            style={{
              width: windowSize.width < 768 ? "85%" : "100%",
              maxHeight: windowSize.width < 768 ? "220px" : "85%",
              objectFit: "contain",
              borderRadius: "20px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      </div>

      {/* خرگوش */}
      <div style={{ position: "absolute", bottom: "15px", left: "15px", width: windowSize.width < 768 ? "80px" : "120px", height: "auto" }}>
        <img
          src={rabbitImg}
          alt="Rabbit"
          style={{
            width: "100%",
            transform:
              rabbitReaction === "happy"
                ? "translateY(-20px) rotate(-10deg)"
                : rabbitReaction === "sad"
                ? "translateY(0) rotate(10deg)"
                : "translateY(0) rotate(0deg)",
            transition: "all 0.3s",
          }}
        />
      </div>

      <style>{`
        @keyframes floatUp {0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(-50px) rotate(360deg)}}
        @keyframes softPulse {0%,100%{box-shadow:0 0 25px rgba(255,255,255,0.5), inset 0 0 15px rgba(255,255,255,0.3);}50%{box-shadow:0 0 35px rgba(255,255,255,0.7), inset 0 0 18px rgba(255,255,255,0.4);}}
      `}</style>
    </div>
  );
}
