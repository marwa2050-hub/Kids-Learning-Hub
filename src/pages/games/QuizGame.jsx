import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import quizImage from "../../assets/quiz1.png";
import rabbitImg from "../../assets/rabbit.png";

const translations = {
  fa: { title: "بازی کوییز", score: "امتیاز", level: "سطح", correct: "🎉 درست شد!", wrong: "❌ اشتباه شد!", answerIs: "جواب درست این است" },
  ps: { title: "د پوښتنو لوبه", score: "نمره", level: "کچه", correct: "🎉 سمه ده!", wrong: "❌ ناسم ده!", answerIs: "سمه ځواب ده" },
  en: { title: "Quiz Game", score: "Score", level: "Level", correct: "🎉 Correct!", wrong: "❌ Wrong!", answerIs: "The correct answer is" },
};

// مخزن سوال‌ها (هر سوال سه زبان)
const questionBank = [
  { question: { fa: "پایتخت افغانستان چیست؟", ps: "د افغانستان پلازمېنه څه ده؟", en: "What is the capital of Afghanistan?" }, options: {fa:["کابل","هرات","قندهار","مزار"], ps:["کابل","هرات","قندهار","مزار"], en:["Kabul","Herat","Kandahar","Mazar"]}, answer: 0 },
  { question: { fa: "رنگ آسمان چیست؟", ps: "د اسمان رنګ څه دی؟", en: "What is the color of the sky?" }, options: {fa:["آبی","سبز","قرمز","زرد"], ps:["شنه","شین","سره","ژېړ"], en:["Blue","Green","Red","Yellow"]}, answer: 0 },
  { question: { fa: "۵ + ۳ برابر است با؟", ps: "۵ + ۳ څو کیږي؟", en: "5 + 3 equals?" }, options: {fa:["۸","۷","۹","۱۰"], ps:["۸","۷","۹","۱۰"], en:["8","7","9","10"]}, answer: 0 },
  { question: { fa: "بزرگترین سیاره کدام است؟", ps: "لویترین سیاره کوم دی؟", en: "Which is the largest planet?" }, options: {fa:["مشتری","زمین","زهره","مارس"], ps:["مشتری","ځمکه","زهره","مارس"], en:["Jupiter","Earth","Venus","Mars"]}, answer: 0 },
  { question: { fa: "چه حیوانی پرواز می‌کند؟", ps: "کوم حیوان الوت کوي؟", en: "Which animal can fly?" }, options: {fa:["پرنده","سگ","گربه","اسب"], ps:["مرغه","سپی","پیشو","اسپ"], en:["Bird","Dog","Cat","Horse"]}, answer: 0 },
  { question: { fa: "رنگ برگ درخت چیست؟", ps: "د ونې پاڼې رنګ څه دی؟", en: "What is the color of a tree leaf?" }, options: {fa:["سبز","قرمز","زرد","آبی"], ps:["شنه","سره","ژېړ","شین"], en:["Green","Red","Yellow","Blue"]}, answer: 0 },
  { question: { fa: "چند پا دارد یک عنکبوت؟", ps: "یو سپایدر څو پښې لري؟", en: "How many legs does a spider have?" }, options: {fa:["۸","۶","۴","۱۰"], ps:["۸","۶","۴","۱۰"], en:["8","6","4","10"]}, answer: 0 },
  { question: { fa: "آب به چه حالت در می‌آید وقتی یخ می‌زند؟", ps: "کله چې اوبه یخ شي څه حالت نیسي؟", en: "What does water become when it freezes?" }, options: {fa:["یخ","بخار","مایع","گاز"], ps:["یخ","بخار","مایع","ګاز"], en:["Ice","Vapor","Liquid","Gas"]}, answer: 0 },
  { question: { fa: "خورشید در چه جهت طلوع می‌کند؟", ps: "لمر په کومه خوا راختل کیږي؟", en: "Which direction does the sun rise?" }, options: {fa:["شرق","غرب","شمال","جنوب"], ps:["ختیځ","لویدیز","شمال","جنوب"], en:["East","West","North","South"]}, answer: 0 },
  { question: { fa: "چه حیوانی در آب زندگی می‌کند؟", ps: "کوم حیوان په اوبو کې ژوند کوي؟", en: "Which animal lives in water?" }, options: {fa:["ماهی","گربه","سگ","خر"], ps:["کبان","پیشو","سپی","خر"], en:["Fish","Cat","Dog","Donkey"]}, answer: 0 },
  // می‌توانی اینجا سوال‌های بیشتری اضافه کنی...
];

// تولید مجموعه‌ای از سوالات تصادفی (تا 15 سوال یا کمتر در صورت موجودی)
const generateQuestions = (lang) => {
  const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
  const sliceCount = Math.min(15, shuffled.length);
  return shuffled.slice(0, sliceCount).map(q => {
    // گزینه‌ها را به‌صورت تصادفی جابه‌جا کن، اما نگه دار که index جواب درست مطابق متن اصلی است
    const opts = [...q.options[lang]];
    const correctText = opts[q.answer];
    // shuffle
    const shuffledOpts = opts.sort(() => Math.random() - 0.5);
    // find new index of correct
    const newAnswerIndex = shuffledOpts.findIndex(o => o === correctText);
    return {
      question: q.question[lang],
      options: shuffledOpts,
      answer: newAnswerIndex
    };
  });
};

function Particle({ x, y, emoji }) {
  return <div style={{ position: "absolute", top: y, left: x, fontSize: Math.random() * 24 + 16, opacity: 0.9, transform: `translateY(${Math.random() * -50}px) rotate(${Math.random() * 360}deg)`, animation: `floatUp ${1 + Math.random()}s ease-out forwards` }}>{emoji}</div>;
}

export default function QuizGame() {
  const [language, setLanguage] = useState("en");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [correctInLevel, setCorrectInLevel] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [particles, setParticles] = useState([]);
  const [rabbitReaction, setRabbitReaction] = useState("idle");
  const [timer, setTimer] = useState(10);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // واکنش به تغییر زبان -> بارگذاری سوالات جدید تصادفی
  useEffect(() => { loadQuestions(language); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [language]);

  // resize listener برای Confetti و particle
  useEffect(() => {
    const onResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const loadQuestions = (lang) => {
    const qs = generateQuestions(lang);
    setQuestions(qs);
    setCurrent(0);
    setTimer(10);
    setCorrectInLevel(0);
    setScore(0);
    setFeedback("");
  };

  // تایمر
  useEffect(() => {
    if (!questions.length) return;
    if (timer <= 0) {
      const q = questions[current];
      setFeedback(`⏱ ${translations[language].wrong} | ${translations[language].answerIs}: ${q.options[q.answer]}`);
      setScore((s) => Math.max(0, s - 1));
      setRabbitReaction("sad");
      setCorrectInLevel(0);
      setTimeout(() => setRabbitReaction("idle"), 1200);
      setTimeout(() => handleNext(), 1500);
      return;
    }
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer, questions, current, language]);

  const handleAnswer = (choiceIndex) => {
    const q = questions[current];
    if (!q) return;
    if (choiceIndex === q.answer) {
      setScore((s) => s + 1);
      setCorrectInLevel((c) => c + 1);
      setFeedback(translations[language].correct);
      setShowConfetti(true);
      setParticles([...Array(12)].map(() => ({ x: Math.random() * windowSize.width * 0.6, y: Math.random() * windowSize.height * 0.5, emoji: ["⭐","🎈","🧮"][Math.floor(Math.random() * 3)] })));
      setRabbitReaction("happy");
      setTimeout(() => { setShowConfetti(false); setParticles([]); setRabbitReaction("idle"); }, 1500);
      if (correctInLevel + 1 >= 5 && level < 5) {
        setLevel((l) => l + 1);
        setFeedback(`🎉 به سطح ${level + 1} خوش آمدید!`);
      }
    } else {
      setScore((s) => Math.max(0, s - 1));
      setCorrectInLevel(0);
      setFeedback(`${translations[language].wrong} | ${translations[language].answerIs}: ${q.options[q.answer]}`);
      setRabbitReaction("sad");
      setTimeout(() => setRabbitReaction("idle"), 1200);
    }
    setTimeout(() => handleNext(), 1000);
  };

  const handleNext = () => {
    setFeedback("");
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setTimer(10);
    } else {
      loadQuestions(language);
    }
  };

  const topButtonStyle = { padding: "10px 16px", borderRadius: "12px", color: "#111827", border: "none", cursor: "pointer", fontWeight: "bold", boxShadow: "0 4px 10px rgba(0,0,0,0.3)", backgroundColor: "#FFD700" };
  const currentQuestion = questions[current] || { question: "", options: [] };

  return (
    <div className="min-h-screen w-full flex justify-center items-center p-4" style={{ background: "linear-gradient(135deg,#ff4e50,#f9d423)", fontFamily: "'Comic Sans MS','Comic Neue','Arial Rounded MT Bold'", color: "#fff", position: "relative", overflow: "hidden" }}>
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={150} />}
      {particles.map((p, idx) => <Particle key={idx} {...p} />)}

      {/* language buttons */}
      <div style={{ position: "absolute", top: "15px", left: "15px", display: "flex", gap: "10px", zIndex: 10 }}>
        <button style={topButtonStyle} onClick={() => setLanguage("fa")}>دری</button>
        <button style={topButtonStyle} onClick={() => setLanguage("ps")}>پشتو</button>
        <button style={topButtonStyle} onClick={() => setLanguage("en")}>English</button>
      </div>

      <button style={{ ...topButtonStyle, position: "absolute", top: "15px", right: "15px" }} onClick={() => window.history.back()}>⬅ Back</button>

      <div style={{ display: "flex", width: "100%", maxWidth: "960px", justifyContent: "space-between", gap: "15px" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", marginTop: "80px" }}>
          {/* عنوان با استایل مشابه WordGame */}
          <div style={{ background: "rgba(255, 165, 0, 0.9)", borderRadius: "25px", padding: "12px 30px", boxShadow: "0 4px 15px rgba(0,0,0,0.4), inset 0 0 10px rgba(255,255,255,0.3)", animation: "softPulse 4s ease-in-out infinite", marginBottom: "15px" }}>
            <h1 style={{ fontSize: "2.3rem", fontWeight: "bold", margin: 0, color: "#fff", textShadow: "2px 2px 6px rgba(0,0,0,0.3)" }}>🏆 {translations[language].title}</h1>
          </div>

          {/* خط امتیاز — به‌صورت RTL ثابت */}
          <h2
            style={{
              fontSize: '1.5rem',
              margin: "0 0 15px 0",
              fontWeight: 'bold',
              padding: '12px 25px',
              borderRadius: '20px',
              maxWidth: '80%',
              direction: 'rtl',       // <-- این خط باعث راست‌به‌چپ شدن کل محتوی می‌شود
              textAlign: 'right',
              color: '#fff',
              background: 'linear-gradient(135deg, #FFA500, #FFB347)',
              boxShadow: '0 0 20px rgba(255,165,0,0.7), 0 0 40px rgba(255,200,0,0.5)',
              textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
            }}
          >
            {translations[language].score}: {score} &nbsp;|&nbsp; {translations[language].level}: {level} &nbsp;|&nbsp; ⏱ {timer}s
          </h2>

          {/* کارت سوال (دیزاین همانند مثال) */}
          <div style={{
            fontSize: "1.6rem",
            fontWeight: "bold",
            padding: "15px 28px",
            borderRadius: "25px",
            background: 'linear-gradient(135deg, #FFA500, #FFB347)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            marginBottom: "15px",
            textAlign: 'center',
            minHeight: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {currentQuestion.question}
          </div>

          {/* گزینه‌ها با همان استایل کارت */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "15px" }}>
            {currentQuestion.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="jumpOption"
                style={{
                  padding: "10px 18px",
                  borderRadius: "20px",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "1.3rem",
                  background: 'linear-gradient(135deg, #FFA500, #FFB347)',
                  boxShadow: '0 0 20px rgba(255,165,0,0.7)',
                  transition: "transform 0.2s, box-shadow 0.2s"
                }}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* بازخورد */}
          {feedback && (
            <div style={{
              fontSize: "1.6rem",
              marginTop: "15px",
              textAlign: "center",
              color: "#fff",
              fontWeight: "bold",
              padding: "15px 25px",
              borderRadius: "18px",
              background: "linear-gradient(135deg, #FFA500, #FFB347)",
              boxShadow: "0 0 25px rgba(255,165,0,0.8)",
              maxWidth: "80%",
              margin: "0 auto"
            }}>
              {feedback}
            </div>
          )}
        </div>

        {/* تصویر سمت راست — ثابت و اندازه مشخص */}
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <img src={quizImage} alt="Quiz" style={{ height: "400px", width: "auto", objectFit: "contain", borderRadius: "20px", boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }} />
        </div>
      </div>

      {/* خرگوش پایین چپ */}
      <div style={{ position: "absolute", bottom: "15px", left: "15px", width: "120px", height: "120px" }}>
        <img src={rabbitImg} alt="Rabbit" style={{ width: "100%", height: "100%", transform: rabbitReaction === "happy" ? "translateY(-20px) rotate(-10deg)" : rabbitReaction === "sad" ? "translateY(0) rotate(10deg)" : "translateY(0) rotate(0deg)", transition: "all 0.3s" }} />
      </div>

      <style>{`
        @keyframes floatUp {0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(-50px) rotate(360deg)}}
        @keyframes softPulse {0%, 100% { box-shadow: 0 0 15px rgba(255, 255, 255, 0.4), inset 0 0 10px rgba(255,255,255,0.3); } 50% { box-shadow: 0 0 25px rgba(255,255,255,0.6), inset 0 0 12px rgba(255,255,255,0.4); }}
        button.jumpOption { animation: jumpButton 0.6s ease-in-out; }
        @keyframes jumpButton { 0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);} }
        button.jumpOption:hover { transform: scale(1.05); box-shadow:0 6px 18px rgba(0,0,0,0.4); }
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
