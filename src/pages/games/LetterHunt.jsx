import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import rabbitImg from "../../assets/rabbit.png";
import lettersScene from "../../assets/lettersScene.png";

const translations = {
  fa: { title: "جستجوی حروف", score: "امتیاز", level: "سطح" },
  ps: { title: "د تورو لټون", score: "نمره", level: "کچه" },
  en: { title: "Letter Hunt", score: "Score", level: "Level" },
};

const lettersByLang = {
  en: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  fa: "ا ب پ ت ث ج چ ح خ د ذ ر ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن و ه ی".split(" "),
  ps: "ا ب پ ت ث ج چ ح خ د ډ ر ړ ز ژ س ش ص ض ط ظ ع غ ف ق ک ګ ل م ن و ه ی".split(" "),
};

function Particle({ x, y, emoji }) {
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
}

export default function LetterHunt() {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentLetter, setCurrentLetter] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [lang, setLang] = useState("fa");
  const [particles, setParticles] = useState([]);
  const [rabbitReaction, setRabbitReaction] = useState("idle");
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          setScore(s => Math.max(0, s - 1));
          setRabbitReaction("sad");
          setTimeout(() => setRabbitReaction("idle"), 1200);
          setTimeout(generateLetter, 1500);
          return 10;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentLetter]);

  const generateLetter = () => {
    const currentLetters = lettersByLang[lang];
    const idx = Math.floor(Math.random() * currentLetters.length);
    setCurrentLetter(currentLetters[idx]);
    setRabbitReaction("idle");
    setTimer(10);
  };

  const checkLetter = (letter) => {
    if (letter === currentLetter) {
      setScore(s => s + 1);
      setShowConfetti(true);
      setRabbitReaction("happy");
      setParticles([...Array(12)].map(() => ({
        x: Math.random() * windowSize.width * 0.6,
        y: Math.random() * windowSize.height * 0.5,
        emoji: ['⭐', '🎈', '🔤'][Math.floor(Math.random() * 3)],
      })));
      setTimeout(() => { setShowConfetti(false); setParticles([]); setRabbitReaction("idle"); }, 1500);
      if ((score + 1) % 5 === 0) setLevel(l => l + 1);
    } else {
      setRabbitReaction("sad");
      setTimeout(() => setRabbitReaction("idle"), 1200);
    }
    setTimeout(generateLetter, 1200);
  };

  const topButtonStyle = {
    padding: '10px 14px',
    borderRadius: '10px',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 0 8px rgba(0,0,0,0.3)',
    background: 'inherit',
    fontSize: '0.9rem'
  };

  const cardLightStyle = {
    background: "inherit",
    boxShadow: "0 0 25px rgba(255,255,255,0.5), inset 0 0 15px rgba(255,255,255,0.3)",
    borderRadius: "25px",
    padding: "12px 30px",
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff"
  };

  useEffect(() => { generateLetter(); }, [lang]);

  const isMobile = windowSize.width < 768;

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
      background: "linear-gradient(135deg,#4e54c8,#8f94fb)"
    }}>
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={150} />}
      {particles.map((p, idx) => <Particle key={idx} {...p} />)}

      {/* Language Buttons */}
      <div style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        display: "flex",
        gap: "8px",
        zIndex: 10,
        flexWrap: "wrap"
      }}>
        <button style={topButtonStyle} onClick={() => setLang("fa")}>دری</button>
        <button style={topButtonStyle} onClick={() => setLang("ps")}>پشتو</button>
        <button style={topButtonStyle} onClick={() => setLang("en")}>English</button>
      </div>

      <button style={{
        ...topButtonStyle,
        position: "absolute",
        top: "10px",
        right: "10px"
      }} onClick={() => window.history.back()}>⬅ Back</button>

      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: "960px",
        gap: "15px",
        marginTop: isMobile ? "60px" : "0"
      }}>
        {/* Main Section */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: isMobile ? "20px" : "50px"
        }}>
          <div style={cardLightStyle}>
            <h1 style={{ fontSize: isMobile ? "1.8rem" : "2.3rem", margin: 0, textShadow: "2px 2px 6px rgba(0,0,0,0.3)" }}>
              🔤 {translations[lang].title}
            </h1>
          </div>

          <h2 style={{
            ...cardLightStyle,
            padding: '10px 18px',
            maxWidth: '90%',
            fontSize: isMobile ? '1.1rem' : '1.5rem',
            margin: '15px 0',
            textAlign: lang === 'fa' || lang === 'ps' ? 'right' : 'center',
            direction: lang === 'fa' || lang === 'ps' ? 'rtl' : 'ltr'
          }}>
            {translations[lang].score}: {score} | {translations[lang].level}: {level} | ⏱ {timer}s
          </h2>

          <div style={{
            ...cardLightStyle,
            fontSize: isMobile ? "1.2rem" : "1.6rem",
            fontWeight: "bold",
            marginBottom: "15px",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '15px 28px'
          }}>
            <span style={{ fontSize: isMobile ? '1.6rem' : '2rem' }}>{currentLetter}</span>
          </div>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: isMobile ? "6px" : "12px",
            justifyContent: "center",
            marginBottom: "15px"
          }}>
            {lettersByLang[lang].map((l, i) => (
              <button
                key={i}
                onClick={() => checkLetter(l)}
                style={{
                  ...cardLightStyle,
                  padding: isMobile ? '8px 10px' : '10px 18px',
                  borderRadius: '20px',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  cursor: 'pointer'
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: isMobile ? "20px" : "0"
        }}>
          <img
            src={lettersScene}
            alt="Letters Scene"
            style={{
              width: isMobile ? "80%" : "400px",
              maxHeight: isMobile ? "200px" : "85%",
              objectFit: "contain",
              borderRadius: "20px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.5)"
            }}
          />
        </div>
      </div>

      {/* Rabbit */}
      <div style={{
        position: "absolute",
        bottom: "15px",
        left: "15px",
        width: isMobile ? "80px" : "120px",
        height: isMobile ? "80px" : "120px"
      }}>
        <img
          src={rabbitImg}
          alt="Rabbit"
          style={{
            width: "100%",
            height: "100%",
            transform:
              rabbitReaction === 'happy' ? 'translateY(-20px) rotate(-10deg)' :
              rabbitReaction === 'sad' ? 'translateY(0) rotate(10deg)' :
              'translateY(0) rotate(0deg)',
            transition: "all 0.3s"
          }}
        />
      </div>

      <style>{`
        @keyframes floatUp {
          0% { opacity: 1; transform: translateY(0) rotate(0deg) }
          100% { opacity: 0; transform: translateY(-50px) rotate(360deg) }
        }
      `}</style>
    </div>
  );
}
