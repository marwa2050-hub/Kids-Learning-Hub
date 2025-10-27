import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import rabbitImg from "../../assets/rabbit.png";

// تابع fetchAI که از Worker واقعی OpenAI سوال می‌گیرد
export async function fetchAI(language = "fa", count = 10, categories = []) {
  const API_URL = "https://kids-learning-hub-api.marwanurestani.workers.dev/";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language, count, categories })
    });

    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);

    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("Invalid format from API");

    // تبدیل اعداد فارسی/پشتو
    return data.map(item => {
      const opts = item.options || ["...", "...", "...", "..."];
      return {
        question: convertDigits(item.question, language),
        options: opts.map(opt => convertDigits(opt, language)),
        correct: convertDigits(item.correct, language)
      };
    });

  } catch (err) {
    console.error("[fetchAI] خطا در دریافت سوالات AI:", err.message);
    throw err;
  }
}

// تبدیل اعداد به فارسی یا پشتو
function convertDigits(str, language) {
  const digits = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
  return (language === "fa" || language === "ps") ? str.replace(/\d/g, d => digits[d]) : str;
}

// کامپوننت بازی
export default function GeneralQuiz() {
  const [lang, setLang] = useState("fa");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [feedback, setFeedback] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rabbitReaction, setRabbitReaction] = useState("idle");
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [timer, setTimer] = useState(15);
  const timerRef = useRef(null);

  // دریافت سوال‌ها از Worker
  useEffect(() => {
    async function loadQuestions() {
      try {
        const data = await fetchAI(lang, 10, ["animals","colors","shapes","numbers","objects"]);
        console.log("[GeneralQuiz] Questions loaded:", data);
        if (Array.isArray(data) && data.length > 0) {
          setQuestions(data);
          setCurrentIndex(0);
          setTimer(15);
          setFeedback("");
        }
      } catch (err) {
        console.warn("[GeneralQuiz] خطا در دریافت سوالات:", err.message);
        setQuestions([]);
      }
    }
    loadQuestions();
  }, [lang, level]);

  // تایمر
  useEffect(() => {
    if (!questions.length) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          handleAnswer(null);
          return 15;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentIndex, questions]);

  // تغییر اندازه صفحه
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAnswer = (option) => {
    const current = questions[currentIndex];
    if (!current) return;

    const correctAnswer = current.correct ?? current.options?.[0] ?? "...";

    if (option === correctAnswer) {
      setScore(s => s + 1);
      setFeedback(lang==="fa"?"🎉 درست شد!":lang==="ps"?"🎉 سمه ده!":"🎉 Correct!");
      setShowConfetti(true);
      setRabbitReaction("happy");
      setTimeout(() => { setShowConfetti(false); setRabbitReaction("idle"); }, 1500);
      if ((score + 1) % 5 === 0) setLevel(l => l + 1);
    } else {
      setFeedback(`${lang==="fa"?"❌ اشتباه شد!":"❌ ناسم ده!"} | ${lang==="fa"?"جواب درست این است":"سمه ځواب ده"}: ${correctAnswer}`);
      setRabbitReaction("sad");
      setTimeout(() => setRabbitReaction("idle"), 1200);
    }

    setTimer(15);
    setCurrentIndex(i => (i + 1) % questions.length);
  };

  const cardStyle = {
    background: "rgba(0,0,0,0.25)",
    backdropFilter: "blur(6px)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.35), inset 0 0 15px rgba(255,255,255,0.15)",
    borderRadius: "25px",
    padding: "12px 30px",
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  };

  const topButtonStyle = {
    padding: '10px 16px',
    borderRadius: '12px',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    background: "rgba(0,0,0,0.25)"
  };

  const currentQuestion = questions[currentIndex] || { 
    question: "در حال بارگذاری...", 
    options: ["...", "...", "...", "..."], 
    correct: "..." 
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
      background: "linear-gradient(135deg, #4e54c8, #8f94fb)"
    }}>
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={150} />}

      {/* دکمه‌های زبان */}
      <div style={{ position: "absolute", top: "15px", left: "15px", display: "flex", gap: "10px", zIndex: 10 }}>
        <button style={topButtonStyle} onClick={() => setLang("fa")}>دری</button>
        <button style={topButtonStyle} onClick={() => setLang("ps")}>پشتو</button>
        <button style={topButtonStyle} onClick={() => setLang("en")}>English</button>
      </div>
      <button style={{ ...topButtonStyle, position: "absolute", top: "15px", right: "15px" }} onClick={() => window.history.back()}>⬅ Back</button>

      <div style={{ display: "flex", width: "100%", maxWidth: "960px", gap: "15px", flexWrap:"wrap" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px", minWidth:"300px" }}>
          <div style={cardStyle}>
            <h1 style={{ fontSize: "2.3rem", margin: 0, textShadow: "2px 2px 6px rgba(0,0,0,0.5)" }}>
              🧠 {lang==="fa"?"سوال عمومی":lang==="ps"?"عمومي پوښتنې":"General Quiz"}
            </h1>
          </div>

          <h2 style={{ ...cardStyle, padding: '12px 25px', maxWidth:'80%', fontSize:'1.5rem', margin:'15px 0', textAlign: lang==='fa'||lang==='ps'?'right':'center', direction: lang==='fa'||lang==='ps'?'rtl':'ltr' }}>
            {lang==="fa"?"امتیاز":lang==="ps"?"نمره":"Score"}: {score} | {lang==="fa"?"سطح":lang==="ps"?"کچه":"Level"}: {level} | ⏱ {timer}s
          </h2>

          <div style={{ ...cardStyle, fontSize:"1.6rem", fontWeight:"bold", marginBottom:"15px", display:'flex', alignItems:'center', gap:'12px', padding:'15px 28px' }}>
            <span>{currentQuestion.question}</span>
          </div>

          <div style={{ display: "flex", flexWrap:"wrap", gap:"12px", justifyContent:"center", marginBottom:"15px" }}>
            {currentQuestion.options.map((opt,i)=>(
              <button key={i} onClick={()=>handleAnswer(opt)} style={{ ...cardStyle, padding:'10px 18px', borderRadius:'20px', fontSize:'1.1rem', cursor:'pointer' }}>
                {opt}
              </button>
            ))}
          </div>

          {feedback && <div style={{ ...cardStyle, fontSize:"1.6rem", marginTop:"15px", maxWidth:"80%", textAlign:"center" }}>{feedback}</div>}
        </div>

        <div style={{ flex:1, display:"flex", justifyContent:"center", alignItems:"center", minWidth:"250px" }}>
          <img 
            src={rabbitImg} 
            alt="Rabbit" 
            style={{ 
              width:"250px", 
              height:"250px", 
              objectFit:"contain", 
              borderRadius:"20px", 
              boxShadow:"0 10px 20px rgba(0,0,0,0.5)",
              transform: rabbitReaction==='happy'?'translateY(-20px) rotate(-10deg)':rabbitReaction==='sad'?'translateY(0) rotate(10deg)':'translateY(0) rotate(0deg)',
              transition:"all 0.3s"
            }}
          />
        </div>
      </div>
    </div>
  );
}
