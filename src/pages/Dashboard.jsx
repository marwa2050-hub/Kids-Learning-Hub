// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import hubSticker from "../assets/hub-sticker.png";
import bookSticker from "../assets/book-sticker.png";
import ageSticker from "../assets/age-sticker.png";
import multiplicationSticker from "../assets/multiplication-sticker.png";
import bmiSticker from "../assets/bmi-sticker.png";
import Navbar from "../components/Navbar";

export default function Dashboard({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState(null);
  const [showFormCard, setShowFormCard] = useState(false);
  const [toolLangs, setToolLangs] = useState({ age: "en", multiplication: "en", bmi: "en" });
  const [suggestLang, setSuggestLang] = useState("en");

  const languageCards = [
    { lang: "en", label: "Educational Blog (English)", dir: "ltr", color: "#ff4b4b" },
    { lang: "fa", label: "وبلاگ آموزشی (فارسی)", dir: "rtl", color: "#4b9aff" },
    { lang: "ps", label: "تعلیمي وبلاګ (پښتو)", dir: "rtl", color: "#00c85a" },
  ];

  const tools = [
    {
      key: "age",
      color: "#ff4b4b",
      title: { en: "Age Calculator", fa: "محاسبه سن", ps: "د عمر محاسب" },
      description: { en: "Find your exact age in years, months, and days", fa: "سن دقیق خود را بر حسب سال، ماه و روز پیدا کنید", ps: "خپل دقیق عمر په کلونو، میاشتو او ورځو کې پیدا کړئ" },
      sticker: ageSticker
    },
    {
      key: "multiplication",
      color: "#4b9aff",
      title: { en: "Multiplication Table", fa: "جدول ضرب", ps: "د ضرب جدول" },
      description: { en: "Generate multiplication tables for practice", fa: "جدول‌های ضرب برای تمرین تولید کنید", ps: "د تمرین لپاره د ضرب جدولونه جوړ کړئ" },
      sticker: multiplicationSticker
    },
    {
      key: "bmi",
      color: "#00c85a",
      title: { en: "BMI Calculator", fa: "BMI محاسبه", ps: "محاسب BMI د" },
      description: { en: "Calculate BMI based on height and weight", fa: "شاخص توده بدن را بر اساس قد و وزن محاسبه کنید", ps: "د بدن د غوړوالي شاخص د قد او وزن پر اساس محاسبه کړئ" },
      sticker: bmiSticker
    }
  ];

  const setToolLanguage = (key, lang) => {
    setToolLangs(prev => ({ ...prev, [key]: lang }));
  };

  const setLanguage = (lang) => {
    if (lang === "en") navigate("/blog-en");
    else if (lang === "fa") navigate("/blog-fa");
    else navigate("/blog-ps");
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center p-6 sm:p-6 transition-colors duration-500
      bg-gradient-to-r from-[#ff4b4b] via-[#ff7a2a] to-[#fcd703] bg-opacity-100 backdrop-blur-xl"
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="flex flex-col items-center text-center w-full max-w-5xl space-y-8 mt-24 md:mt-36 lg:mt-40 px-2 sm:px-4">
        {/* Title */}
        <div className="flex flex-col items-center gap-3 mb-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-white drop-shadow-md">Welcome to Kids Learning Hub</h1>
          <p className="text-lg md:text-xl italic text-white/90 max-w-2xl">Fun, creative, and interactive learning for children</p>
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center gap-4 mt-4 mb-4">
          <img src={hubSticker} alt="Hub Sticker" className="w-36 h-36 md:w-44 md:h-44 max-w-full h-auto drop-shadow-md" />
        </div>

        {/* Language Cards */}
        <div className="w-full flex flex-col md:flex-row justify-center items-stretch gap-5 mb-8">
          {languageCards.map(({ lang, label, dir, color }) => (
            <div
              key={lang}
              dir={dir}
              className="cursor-pointer text-white rounded-[25px] shadow-lg p-3 flex-1 flex flex-col items-center justify-center gap-2 min-h-[65px]
              hover:scale-105 hover:shadow-xl hover:brightness-110 transition-all duration-300 border border-white/50
              px-2 sm:px-3"
              style={{ backgroundColor: color }}
              onClick={() => setLanguage(lang)}
            >
              <div className="flex items-center gap-2">
                <img src={bookSticker} alt="Book Sticker" className="w-9 h-9 opacity-95" />
                <h3 className="text-sm md:text-base font-extrabold tracking-wide">{label}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Three-language texts */}
        <div className="space-y-2 mt-4 text-white px-2">
          <p className="text-base md:text-lg font-bold tracking-wide">Engaging resources to boost children's creativity and learning skills</p>
          <p className="text-base md:text-lg font-bold tracking-wide" dir="rtl">منابع جذاب برای تقویت خلاقیت و مهارت‌های یادگیری کودکان</p>
          <p className="text-base md:text-lg font-bold tracking-wide" dir="rtl">د ماشومانو د خلاقیت او د زده کړې مهارتونو د پیاوړتیا لپاره جذابې سرچینې</p>
        </div>

        {/* Tools Section */}
        <div className="flex flex-col items-center text-center gap-3" style={{ marginTop: "90px", marginBottom: "40px" }}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-md">Tools & Learning Helpers</h2>
          <p className="text-lg md:text-xl italic text-white/90 max-w-2xl">Useful and interactive tools to help children learn and explore</p>
        </div>

        {/* Tools Cards Row */}
        <div className="relative flex flex-wrap justify-center gap-5 w-full max-w-5xl mb-8">
         {tools.map(tool => {
  const { key, ...rest } = tool;  

  return (
    <ToolCard
      key={key}                    
      toolKey={key}
      {...rest}                  
      toolLang={toolLangs[key]}
      setToolLang={(lang) => setToolLanguage(key, lang)}
      activeTool={activeTool}
      setActiveTool={setActiveTool}
    />
  );
})}

          {/* Modal */}
          {activeTool && (
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 z-20 p-6 rounded-3xl flex flex-col items-center justify-center gap-4 max-w-md w-full sm:w-[90%] shadow-xl"
              style={{ backgroundColor: tools.find(t => t.key === activeTool)?.color }}
            >
              <button className="absolute top-3 right-3 text-white font-bold text-xl" onClick={() => setActiveTool(null)}>×</button>

              {activeTool === "age" && <AgeCalculatorModal toolLang={toolLangs[activeTool]} />}
              {activeTool === "multiplication" && <MultiplicationTableModal toolLang={toolLangs[activeTool]} />}
              {activeTool === "bmi" && <BMICalculatorModal toolLang={toolLangs[activeTool]} />}
            </div>
          )}
        </div>

        {/* Suggest New Topic Card */}
        <div
          className="cursor-pointer rounded-[25px] p-6 flex flex-col items-center justify-center gap-3
                     hover:scale-105 hover:shadow-xl transition-all duration-300 border border-white/30 text-white
                     w-full max-w-[1100px] mx-auto relative"
          style={{ backgroundColor: "#ff7a2a", minHeight: "200px", marginTop: "60px" }}
          onClick={() => setShowFormCard(!showFormCard)}
        >
          {/* زبان‌ها */}
          <div className="absolute top-3 right-3 flex gap-1 z-10">
            <button className="px-2 py-1 text-xs rounded bg-white/30 hover:bg-white/50" onClick={(e) => { e.stopPropagation(); setSuggestLang("en"); }}>EN</button>
            <button className="px-2 py-1 text-xs rounded bg-white/30 hover:bg-white/50" onClick={(e) => { e.stopPropagation(); setSuggestLang("fa"); }}>FA</button>
            <button className="px-2 py-1 text-xs rounded bg-white/30 hover:bg-white/50" onClick={(e) => { e.stopPropagation(); setSuggestLang("ps"); }}>PS</button>
          </div>

          <div className="text-5xl md:text-6xl mb-2">💡</div>

          <h3 className={`text-xl md:text-2xl font-extrabold tracking-wide flex justify-center items-center gap-2 ${suggestLang !== "en" ? "text-right" : ""}`} dir={suggestLang === "en" ? "ltr" : "rtl"}>
            {suggestLang === "en" && "Suggest New Topic"}
            {suggestLang === "fa" && "پیشنهاد موضوع جدید"}
            {suggestLang === "ps" && "د نوي موضوع وړاندیز"}
          </h3>

          <p className={`text-sm md:text-base text-white/90 ${suggestLang === "en" ? "text-center" : "text-right"}`} dir={suggestLang === "en" ? "ltr" : "rtl"}>
            {suggestLang === "en" && "Help us create new educational content by suggesting topics"}
            {suggestLang === "fa" && "با پیشنهاد موضوعات جدید به ما در تولید محتوای آموزشی کمک کنید"}
            {suggestLang === "ps" && "د نوي تعلیمي مینځپانګې د جوړولو لپاره موږ سره د موضوعاتو په وړاندیز کولو کې مرسته وکړئ"}
          </p>
        </div>

        {/* Form Card */}
        {showFormCard && (
          <div className="w-full max-w-3xl bg-white/10 rounded-2xl p-6 sm:p-6 flex flex-col gap-3
                          transition-all duration-300 border border-white/30 text-white mt-6">

            <label className={`flex flex-col font-semibold text-white ${suggestLang === "en" ? "text-left" : "text-right"}`} dir={suggestLang === "en" ? "ltr" : "rtl"}>
              {suggestLang === "en" && "Topic Title:"}
              {suggestLang === "fa" && "عنوان موضوع:"}
              {suggestLang === "ps" && "د موضوع عنوان:"}
              <input
                type="text"
                dir={suggestLang === "en" ? "ltr" : "rtl"}
                placeholder={
                  suggestLang === "en" ? "Enter topic title..." :
                    suggestLang === "fa" ? "عنوان موضوع را وارد کنید..." :
                      "د موضوع عنوان دننه کړئ..."
                }
                className="mt-1 p-2 rounded-lg border border-white/50 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/70"
              />
            </label>

            <label className={`flex flex-col font-semibold text-white ${suggestLang === "en" ? "text-left" : "text-right"}`} dir={suggestLang === "en" ? "ltr" : "rtl"}>
              {suggestLang === "en" && "Description:"}
              {suggestLang === "fa" && "توضیحات:"}
              {suggestLang === "ps" && "توضیحات:"}
              <textarea
                dir={suggestLang === "en" ? "ltr" : "rtl"}
                placeholder={
                  suggestLang === "en" ? "Describe what this topic should include..." :
                    suggestLang === "fa" ? "توضیح دهید این موضوع باید چه چیزی را شامل شود..." :
                      "تشریح کړئ چې دا موضوع باید څه شامل کړي..."
                }
                rows={4}
                className="mt-1 p-2 rounded-lg border border-white/50 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/70"
              />
            </label>

            <label className={`flex flex-col font-semibold text-white ${suggestLang === "en" ? "text-left" : "text-right"}`} dir={suggestLang === "en" ? "ltr" : "rtl"}>
              {suggestLang === "en" && "Your Email (Optional):"}
              {suggestLang === "fa" && "ایمیل شما (اختیاری):"}
              {suggestLang === "ps" && "ستاسو بریښنالیک (اختیاري):"}
              <input
                type="email"
                dir={suggestLang === "en" ? "ltr" : "rtl"}
                placeholder={
                  suggestLang === "en" ? "Enter your email..." :
                    suggestLang === "fa" ? "ایمیل خود را وارد کنید..." :
                      "خپل بریښنالیک دننه کړئ..."
                }
                className="mt-1 p-2 rounded-lg border border-white/50 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/70"
              />
            </label>

            <button
              className={`mt-2 self-center bg-white/20 hover:bg-white/40 text-white font-bold py-2 px-4 rounded-xl
                          transition-all duration-300 shadow-md hover:shadow-lg ${suggestLang === "en" ? "" : "text-right"}`}
              dir={suggestLang === "en" ? "ltr" : "rtl"}
            >
              {suggestLang === "en" && "Submit"}
              {suggestLang === "fa" && "ارسال"}
              {suggestLang === "ps" && "وړاندیز واستوئ"}
            </button>

          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col items-center text-center text-white/90 mt-6 gap-3 px-2 sm:px-0">

          {/* Motivational Lines */}
          <p className="text-xs md:text-sm font-extrabold">🎯 Click on any topic to start learning!</p>
          <p className="text-xs md:text-sm font-semibold">💡 Help us improve by suggesting new topics</p>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-2">
            <button
              className="text-xs md:text-sm font-medium text-white px-2 py-1 rounded-lg
                 hover:bg-white/20 hover:text-white transition-all duration-200 focus:outline-none"
              onClick={() => {
                navigate("/privacy");
                window.scrollTo(0, 0); // اسکرول به بالای صفحه
              }}
            >
              🔒 Privacy Policy
            </button>
            <button
              className="text-xs md:text-sm font-medium text-white px-2 py-1 rounded-lg
                 hover:bg-white/20 hover:text-white transition-all duration-200 focus:outline-none"
              onClick={() => {
                navigate("/terms");
                window.scrollTo(0, 0);
              }}
            >
              📋 Terms of Service
            </button>
            <button
              className="text-xs md:text-sm font-medium text-white px-2 py-1 rounded-lg
                 hover:bg-white/20 hover:text-white transition-all duration-200 focus:outline-none"
              onClick={() => {
                navigate("/about");
                window.scrollTo(0, 0);
              }}
            >
              ℹ️ About Us
            </button>
          </div>

          {/* Copyright */}
          <div className="text-center text-xs md:text-sm font-medium text-white/70 tracking-wide mt-1">
            © 2025 Kids Learning Hub. Safe, Educational, and Fun for Children.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ToolCard Component */
function ToolCard({ color, title, description, sticker, toolKey, toolLang, setToolLang, activeTool, setActiveTool }) {
  const handleCardClick = () => setActiveTool(toolKey);
  const handleLangClick = (e, lang) => { e.stopPropagation(); setToolLang(lang); };

  return (
    <div
      className="cursor-pointer rounded-[25px] p-6 sm:p-6 flex flex-col items-center justify-center gap-3
                 hover:scale-105 hover:shadow-xl transition-all duration-300 border border-white/30 text-white flex-1
                 min-w-[240px] sm:min-w-[240px] min-h-[300px] max-w-full relative"
      style={{ backgroundColor: color }}
      onClick={handleCardClick}
    >
      <div className="absolute top-3 right-3 flex gap-1 z-10">
        <button className="px-1 py-0.5 text-xs rounded bg-white/30 hover:bg-white/50" onClick={e => handleLangClick(e, "en")}>EN</button>
        <button className="px-1 py-0.5 text-xs rounded bg-white/30 hover:bg-white/50" onClick={e => handleLangClick(e, "fa")}>FA</button>
        <button className="px-1 py-0.5 text-xs rounded bg-white/30 hover:bg-white/50" onClick={e => handleLangClick(e, "ps")}>PS</button>
      </div>
      <img src={sticker} alt={title[toolLang]} className="w-28 h-28 sm:w-28 sm:h-28 mb-2 max-w-full h-auto" />
      <h3 className="text-lg md:text-xl font-extrabold text-center">{title[toolLang]}</h3>
      <p className="text-sm md:text-base text-center px-2">{description[toolLang]}</p>
    </div>
  );
}

// ------------------- Age Calculator Modal -------------------
function AgeCalculatorModal({ toolLang }) {
  const [dob, setDob] = React.useState("");
  const [result, setResult] = React.useState(null);

  const toPersianNumber = (num) =>
    String(num).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

  const calculateAge = () => {
    if (!dob) return;

    const birth = new Date(dob);
    if (isNaN(birth.getTime())) return;

    const today = new Date();
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = (today.getMonth() + 11) % 12;
      const yearForPrevMonth = prevMonth === 11 ? today.getFullYear() - 1 : today.getFullYear();
      days += new Date(yearForPrevMonth, prevMonth + 1, 0).getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    if (toolLang === "fa" || toolLang === "ps") {
      setResult({
        text: (
          <p dir="rtl" className="text-black font-bold mt-2">
            <span className="inline-block">{toPersianNumber(years)}</span> سال /{" "}
            <span className="inline-block">{toPersianNumber(months)}</span> ماه /{" "}
            <span className="inline-block">{toPersianNumber(days)}</span> روز
          </p>
        )
      });
    } else {
      setResult({
        text: (
          <p dir="ltr" className="text-black font-bold mt-2">
            <span className="inline-block">{years}</span> years /{" "}
            <span className="inline-block">{months}</span> months /{" "}
            <span className="inline-block">{days}</span> days
          </p>
        )
      });
    }
  };

  const labels = {
    en: { title: "Age Calculator", desc: "Find your exact age in years, months, and days", btn: "Calculate Age" },
    fa: { title: "محاسبه سن", desc: "سن دقیق خود را بر حسب سال، ماه و روز پیدا کنید", btn: "محاسبه سن" },
    ps: { title: "د عمر محاسب", desc: "خپل دقیق عمر په کلونو، میاشتو او ورځو کې پیدا کړئ", btn: "محاسبه" }
  };

  return (
    <div className="text-center text-white w-full max-w-md">
      <h3 className="text-2xl font-bold mb-2">{labels[toolLang].title}</h3>
      <p className="mb-2">{labels[toolLang].desc}</p>
      <input
        type="date"
        className="p-2 rounded-lg mb-2 w-full text-black"
        value={dob}
        onChange={(e) => setDob(e.target.value.trim())}
      />
      <button
        className="bg-white/20 hover:bg-white/40 text-black py-1 px-3 rounded mb-2"
        onClick={calculateAge}
      >
        {labels[toolLang].btn}
      </button>
      {result && result.text}
    </div>
  );
}

// ------------------- Multiplication Table Modal -------------------
function MultiplicationTableModal({ toolLang }) {
  const [num, setNum] = useState("");
  const [table, setTable] = useState("");

  const generate = () => {
    if (!num && num !== 0) return;
    let t = "";
    for (let i = 1; i <= 10; i++) {
      t += `${num} x ${i} = ${num * i}\n`;
    }
    setTable(t);
  };

  const labels = {
    en: { title: "Multiplication Table", placeholder: "Enter number", btn: "Generate" },
    fa: { title: "جدول ضرب", placeholder: "عدد را وارد کنید", btn: "تولید" },
    ps: { title: "د ضرب جدول", placeholder: "شمېره دننه کړئ", btn: "جوړول" }
  };

  return (
    <div className="text-center text-white w-full max-w-md">
      <h3 className="text-2xl font-bold mb-2">{labels[toolLang].title}</h3>
      <input type="number" placeholder={labels[toolLang].placeholder} className="p-2 m-1 rounded-lg w-full text-black" value={num} onChange={(e) => setNum(Number(e.target.value))} />
      <button className="bg-white/20 hover:bg-white/40 py-1 px-3 rounded mt-2 mb-2 text-black" onClick={generate}>
        {labels[toolLang].btn}
      </button>
      {table && <pre className="text-left font-bold whitespace-pre-wrap text-black">{table}</pre>}
    </div>
  );
}

// ------------------- BMI Modal -------------------
function BMICalculatorModal({ toolLang }) {
  const [h, setH] = useState("");
  const [w, setW] = useState("");
  const [bmi, setBmi] = useState("");
  const [msg, setMsg] = useState("");

  const calc = () => {
    if (!h || !w) return;
    const v = (w / (h / 100) ** 2).toFixed(2);
    setBmi(v);
    const val = parseFloat(v);
    if (val < 18.5) setMsg(toolLang === "fa" ? "کم وزن – سالم غذا بخورید و فعال باشید" : toolLang === "ps" ? "کم وزن – سالم غذا وخورئ او فعال اوسئ" : "Underweight – eat healthy and stay active!");
    else if (val <= 24.9) setMsg(toolLang === "fa" ? "وزن سالم – عالی" : toolLang === "ps" ? "سالم وزن – عالي" : "Healthy weight – great!");
    else if (val <= 29.9) setMsg(toolLang === "fa" ? "کمی اضافه وزن – ورزش کنید و سالم غذا بخورید" : toolLang === "ps" ? "څه اضافه وزن – ورزش وکړئ او سالم خواړه وخورئ" : "Slightly overweight – exercise and eat healthy!");
    else setMsg(toolLang === "fa" ? "اضافه وزن – روی ورزش و غذای سالم تمرکز کنید" : toolLang === "ps" ? "اضافه وزن – پر ورزش او صحي غذا تمرکز وکړئ" : "Overweight – focus on exercise and healthy food!");
  };

  const labels = {
    en: { title: "BMI Calculator", h: "Height (cm)", w: "Weight (kg)", btn: "Calculate" },
    fa: { title: "BMI محاسبه", h: "قد (سانتی‌متر)", w: "وزن (کیلوگرم)", btn: "محاسبه" },
    ps: { title: "محاسب BMI د", h: "قد (سانتي متر)", w: "وزن (کیلوګرام)", btn: "محاسبه" }
  };

  return (
    <div className="text-center text-white w-full max-w-md">
      <h3 className="text-2xl font-bold mb-2">{labels[toolLang].title}</h3>
      <input type="number" placeholder={labels[toolLang].h} className="p-2 m-1 rounded-lg w-full text-black" value={h} onChange={(e) => setH(e.target.value)} />
      <input type="number" placeholder={labels[toolLang].w} className="p-2 m-1 rounded-lg w-full text-black" value={w} onChange={(e) => setW(e.target.value)} />
      <button className="bg-white/20 hover:bg-white/40 py-1 px-3 rounded mt-2 mb-2 text-black" onClick={calc}>{labels[toolLang].btn}</button>
      {bmi && <p className="font-bold text-black">BMI: {bmi}</p>}
      {msg && <p className="font-semibold text-black">{msg}</p>}
    </div>
  );
}
