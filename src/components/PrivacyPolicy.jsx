import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useLanguage } from "../contexts/LanguageContext";

// Assets
import hubSticker from "../assets/hub-sticker1.png";
import Navbar from "../components/Navbar";
import sideLeftImg from "../assets/side-left6.png";
import sideRightImg from "../assets/side-right6.png";

// تابع تبدیل اعداد انگلیسی به فارسی/پشتو
function toPersianNumber(str) {
  const persianDigits = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
  return str.replace(/\d/g, (d) => persianDigits[d]);
}

// متن‌ها
const privacyTexts = {
  en: {
    title: "Privacy Policy",
    subtitle: "Learn how we protect your personal information and ensure a safe environment for children.",
    content: `Welcome to Kids Learning Hub! We value your privacy and are committed to protecting your personal information.

This Privacy Policy outlines how we collect, use, and safeguard your data when you interact with our website or applications.

1. Information We Collect:
- Personal information such as name and email when you sign up or contact us.
- Usage data including pages visited, time spent, and interactions with games.

2. How We Use Your Information:
- To provide and improve our educational services.
- To communicate with you regarding updates, newsletters, or special offers.
- To ensure a safe and secure learning environment for children.

3. Sharing Your Information:
- We do not sell your personal information.
- We may share data with trusted partners only to improve our services or comply with legal requirements.

4. Security Measures:
- We implement industry-standard security practices to protect your information.
- Access to personal data is restricted to authorized personnel only.

5. Cookies and Tracking:
- We use cookies to enhance user experience and understand how our platform is used.
- You can disable cookies in your browser settings, but some features may not work properly.

6. Changes to Privacy Policy:
- We may update this Privacy Policy periodically. Changes will be posted on this page.

By using Kids Learning Hub, you agree to the terms of this Privacy Policy.`
  },
  fa: {
    title: "سیاست حفظ حریم خصوصی",
    subtitle: "بیاموزید که چگونه اطلاعات شخصی شما محافظت می‌شود و چگونه ما محیط امنی برای کودکان ایجاد می‌کنیم",
    content: `به Kids Learning Hub خوش آمدید! ما به حریم خصوصی شما احترام می‌گذاریم و متعهد به محافظت از اطلاعات شخصی شما هستیم.

این صفحه سیاست حفظ حریم خصوصی، نحوه جمع‌آوری، استفاده و محافظت از داده‌های شما را هنگام استفاده از وب‌سایت یا برنامه‌های ما توضیح می‌دهد.

۱. اطلاعات جمع‌آوری شده:
- اطلاعات شخصی مانند نام و ایمیل هنگام ثبت‌نام یا تماس با ما.
- داده‌های استفاده شامل صفحات بازدید شده، مدت زمان صرف شده و تعامل با بازی‌ها.

۲. نحوه استفاده از اطلاعات شما:
- ارائه و بهبود خدمات آموزشی ما.
- ارتباط با شما درباره به‌روزرسانی‌ها، خبرنامه‌ها یا پیشنهادات ویژه.
- تضمین محیط یادگیری امن و مطمئن برای کودکان.

۳. اشتراک‌گذاری اطلاعات:
- ما اطلاعات شخصی شما را نمی‌فروشیم.
- ممکن است داده‌ها را با شرکای معتبر به منظور بهبود خدمات یا رعایت الزامات قانونی به اشتراک بگذاریم.

۴. اقدامات امنیتی:
- ما اقدامات امنیتی استاندارد صنعتی را برای محافظت از اطلاعات شما اجرا می‌کنیم.
- دسترسی به داده‌های شخصی محدود به پرسنل مجاز است.

۵. کوکی‌ها و ردیابی:
- ما از کوکی‌ها برای بهبود تجربه کاربری و درک نحوه استفاده از پلتفرم استفاده می‌کنیم.
- شما می‌توانید کوکی‌ها را در تنظیمات مرورگر غیرفعال کنید، اما برخی ویژگی‌ها ممکن است به درستی کار نکنند.

۶. تغییرات در سیاست حفظ حریم خصوصی:
- ممکن است این سیاست را دوره‌ای به‌روزرسانی کنیم. تغییرات در این صفحه منتشر خواهد شد.

با استفاده از Kids Learning Hub، شما با شرایط این سیاست موافق هستید.`
  },
  ps: {
    title: "د محرمیت پالیسي",
    subtitle: "زده کړئ چې څنګه موږ ستاسو شخصي معلومات ساتو او د ماشومانو لپاره خوندي چاپیریال تضمین کوو.",
    content: `Kids Learning Hub ته ښه راغلاست! موږ ستاسو محرمیت ته ارزښت ورکوو او ژمن یو چې ستاسو شخصي معلومات خوندي وساتو.

دا د محرمیت پالیسي بیانوي چې څنګه موږ ستاسو معلومات راټولوو، کاروو او ساتو کله چې تاسو زموږ ویب پاڼه یا اپلیکیشنونه کاروئ.

۱. ټول معلومات چې راټولیږي:
- شخصي معلومات لکه نوم او ایمیل کله چې تاسو ثبت نام کوئ یا موږ سره اړیکه نیسئ.
- د کارونې معلومات لکه لیدل شوې پاڼې، مصرف شوی وخت، او د لوبو سره تعامل.

۲. ستاسو د معلوماتو کارول:
- زموږ د تعلیمي خدماتو وړاندې کولو او ښه کولو لپاره.
- تاسو سره د تازه معلوماتو، خبرپاڼو یا ځانګړو وړاندیزونو په اړه اړیکه نیول.
- د ماشومانو لپاره خوندي او امن تعلیمي چاپیریال تضمین کول.

۳. د معلوماتو شریکول:
- موږ ستاسو شخصي معلومات نه پلورو.
- موږ ممکن معلومات د باور وړ شریکانو سره یوازې د خدماتو د ښه کولو یا د قانوني اړتیاو پوره کولو لپاره شریک کړو.

۴. امنیتي تدابیر:
- موږ د صنعت معیاري امنیتي کړنې پلي کوو ترڅو ستاسو معلومات خوندي وساتو.
- د شخصي معلوماتو لاسرسی یوازې د مجاز کارمندانو لپاره محدود دی.

۵. کوکيز او تعقیب:
- موږ د کارونکي تجربه ښه کولو او د پلېټفارم د کارولو د پوهېدو لپاره کوکيز کاروو.
- تاسو کولی شئ په خپل براوزر کې کوکيز غیر فعال کړئ، خو ځینې ځانګړتیاوې ممکن سم کار ونکړي.

۶. د محرمیت پالیسي بدلونونه:
- موږ ممکن دا پالیسي وخت په وخت تازه کړو. بدلونونه به په دې پاڼه خپاره شي.

د Kids Learning Hub کارولو سره، تاسو د دې پالیسي شرایطو سره موافق یاست.`
  }
};

export default function PrivacyPolicy({ darkMode, setDarkMode }) {
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

      <div className="flex flex-col items-center text-center w-full max-w-5xl space-y-8 mt-24 md:mt-36 lg:mt-40">

        {/* Title + Subtitle */}
        <div className="flex flex-col items-center gap-3 mb-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-white drop-shadow-md">
            {privacyTexts[language].title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mt-4 font-dashboard font-bold tracking-wide">
            {privacyTexts[language].subtitle}
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

        {/* Content Card */}
        <div
          className="w-full rounded-[25px] shadow-lg p-8 flex flex-col items-start justify-center"
          style={{
            background: "rgba(255,255,255,0.25)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.3)",
            textAlign: isRTL ? "right" : "left",
            direction: isRTL ? "rtl" : "ltr"
          }}
        >
          <p className="text-white/90 text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose whitespace-pre-wrap font-dashboard">
            {isRTL ? toPersianNumber(privacyTexts[language].content) : privacyTexts[language].content}
          </p>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 hover:scale-105 hover:brightness-110 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
        >
          {language === "en" ? "⬅ Back to Dashboard" : language === "fa" ? "⬅ بازگشت به داشبورد" : "⬅ بیرته ډشبورډ ته"}
        </button>
      </div>
    </div>
  );
}
