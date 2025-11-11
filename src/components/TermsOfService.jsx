import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useLanguage } from "../contexts/LanguageContext";

// Assets
import Navbar from "../components/Navbar";
import hubSticker from "../assets/hub-sticker2.png";
import sideLeftImg from "../assets/side-left6.png";
import sideRightImg from "../assets/side-right6.png";

// تبدیل اعداد انگلیسی به فارسی/پشتو
function toPersianNumber(str) {
  const persianDigits = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
  return str.replace(/\d/g, (d) => persianDigits[d]);
}

// متن‌ها
const termsTexts = {
  en: {
    title: "Terms of Service",
    subtitle: "Learn the rules and conditions for using our platform safely and effectively.",
    content: `
Welcome to Kids Learning Hub! By using our platform, you agree to the following terms and conditions:

1. Use of Content:
- All educational materials are for personal, non-commercial use.
- Copying or distributing content without permission is prohibited.

2. User Conduct:
- Users must be respectful and follow our guidelines.
- Harassment, cheating, or misuse of the platform is not allowed.

3. Accounts:
- Keep your login information secure.
- Notify us immediately if your account is compromised.

4. Privacy:
- We value your privacy. Please review our Privacy Policy for details.

5. Updates:
- We may update these terms periodically. Continued use of the platform indicates your acceptance.

Thank you for being part of our learning community!
    `
  },
  fa: {
    title: "شرایط استفاده",
    subtitle: "قوانین و ضوابط استفاده از پلتفرم ما را یاد بگیرید",
    content: `
به Kids Learning Hub خوش آمدید! با استفاده از پلتفرم ما، شما با شرایط و ضوابط زیر موافقت می‌کنید:

۱. استفاده از محتوا:
- تمام مطالب آموزشی برای استفاده شخصی و غیرتجاری است.
- کپی یا توزیع محتوا بدون اجازه ممنوع است.

۲. رفتار کاربران:
- کاربران باید محترمانه رفتار کنند و از دستورالعمل‌ها پیروی کنند.
- اذیت و آزار، تقلب یا سوءاستفاده از پلتفرم مجاز نیست.

۳. حساب‌های کاربری:
- اطلاعات ورود خود را امن نگه دارید.
- در صورت به خطر افتادن حساب، فوراً ما را مطلع کنید.

۴. حریم خصوصی:
- ما به حریم خصوصی شما احترام می‌گذاریم. لطفاً سیاست حفظ حریم خصوصی ما را بررسی کنید.

۵. به‌روزرسانی‌ها:
- ممکن است این شرایط به‌طور دوره‌ای به‌روزرسانی شود. ادامه استفاده از پلتفرم به معنی پذیرش شماست.

از اینکه بخشی از جامعه آموزشی ما هستید، سپاسگزاریم!
    `
  },
  ps: {
    title: "د خدمت شرایط",
    subtitle: "زده کړئ چې څنګه زموږ پلیټ فارم په خوندي او مؤثره توګه وکاروئ",
    content: `
Kids Learning Hub ته ښه راغلاست! د دې پلیټ فارم د کارولو سره، تاسو لاندې شرایط او قواعد منئ:

۱. د محتوا کارول:
- ټول تعلیمي مواد د شخصي او غیر تجارتي کارونې لپاره دي.
- د اجازې پرته د محتوا کاپي یا توزیع منع دی.

۲. د کارونکي چلند:
- کاروونکي باید درناوی وکړي او زموږ لارښودونه تعقیب کړي.
- ځورول، فریب یا د پلیټ فارم ناوړه کارول اجازه نلري.

۳. حسابونه:
- د ننوتلو معلومات خوندي وساتئ.
- که ستاسو حساب له خطر سره مخ شو، ژر تر ژره موږ ته خبر ورکړئ.

۴. محرمیت:
- موږ ستاسو محرمیت ته ارزښت ورکوو. د جزئیاتو لپاره زموږ د محرمیت پالیسۍ وګورئ.

۵. تازه معلومات:
- موږ ممکن دا شرایط وخت په وخت تازه کړو. د پلیټ فارم دوامداره کارول ستاسو د منلو نښه ده.

د دې زده کړې ټولنې برخه کیدو لپاره مننه!
    `
  }
};

export default function TermsOfService({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const [confettiActive, setConfettiActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isRTL = language === "fa" || language === "ps";

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center p-6
                    bg-gradient-to-r from-[#ff4b4b] via-[#ff7a2a] to-[#fcd703]
                    bg-opacity-100 backdrop-blur-xl transition-colors duration-500">

      {/* Side Images */}
      <img
        src={sideLeftImg}
        alt=""
        className={`absolute left-[-20px] sm:left-0 md:left-8 w-36 sm:w-44 md:w-64 opacity-50 pointer-events-none z-0
                    transition-all duration-300
                    ${menuOpen 
                      ? 'top-[28rem] sm:top-[28rem] md:top-38' 
                      : 'top-52 sm:top-56 md:top-36'}`}
      />
      <img
        src={sideRightImg}
        alt=""
        className={`absolute right-[-20px] sm:right-0 md:right-8 w-36 sm:w-44 md:w-64 opacity-50 pointer-events-none z-0
                    transition-all duration-300
                    ${menuOpen 
                      ? 'top-[28rem] sm:top-[28rem] md:top-38' 
                      : 'top-52 sm:top-56 md:top-36'}`}
      />

      {confettiActive && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={150} />}

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} onMenuToggle={setMenuOpen} />

      {/* Parent container */}
      <div className="flex flex-col items-center text-center w-full max-w-5xl space-y-8 mt-24 md:mt-36 lg:mt-40">

        {/* Title + Subtitle */}
        <div className="flex flex-col items-center gap-3 mb-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-white drop-shadow-md">
            {termsTexts[language].title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mt-4 font-dashboard font-bold tracking-wide">
            {termsTexts[language].subtitle}
          </p>
        </div>

        {/* Sticker */}
        <img src={hubSticker} alt="Hub Sticker" className="w-36 h-36 md:w-44 md:h-44 drop-shadow-md" />

        {/* Language Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setLanguage("en")}
            className={`px-5 py-2 rounded-full font-bold text-white shadow-md transition-all duration-300 transform hover:scale-110 ${
              language === "en" ? "bg-gradient-to-r from-red-500 to-pink-500" : "bg-red-400/80"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage("fa")}
            className={`px-5 py-2 rounded-full font-bold text-white shadow-md transition-all duration-300 transform hover:scale-110 ${
              language === "fa" ? "bg-gradient-to-r from-green-500 to-lime-500" : "bg-green-400/80"
            }`}
          >
            فارسی
          </button>
          <button
            onClick={() => setLanguage("ps")}
            className={`px-5 py-2 rounded-full font-bold text-white shadow-md transition-all duration-300 transform hover:scale-110 ${
              language === "ps" ? "bg-gradient-to-r from-blue-500 to-cyan-500" : "bg-blue-400/80"
            }`}
          >
            پښتو
          </button>
        </div>

     {/* Wrapper اصلی */}
<div className="flex flex-col items-center w-full max-w-5xl mt-24 md:mt-36 lg:mt-40 space-y-8">

  {/* کارت با translate-y پایین */}
  <div
    className="w-full rounded-[25px] shadow-lg p-8 flex flex-col items-start justify-center
               transition-transform duration-300 sm:translate-y-8 md:translate-y-16 lg:translate-y-0"
    style={{
      background: "rgba(255,255,255,0.25)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.3)",
      textAlign: isRTL ? "right" : "left",
      direction: isRTL ? "rtl" : "ltr",
    }}
  >
    <p className="text-white/90 text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose whitespace-pre-wrap font-dashboard">
      {isRTL ? toPersianNumber(termsTexts[language].content) : termsTexts[language].content}
    </p>
  </div>

  {/* فاصله کوچک زیر کارت برای دکمه */}
  <div className="h-4"></div>

  {/* Back Button */}
  <button
    onClick={() => navigate("/")}
    className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 hover:scale-105 hover:brightness-110 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
  >
    {language === "en" ? "⬅ Back to Dashboard" : language === "fa" ? "⬅ بازگشت به داشبورد" : "⬅ بیرته ډشبورډ ته"}
  </button>
</div>

      </div>
    </div>
  );
}
