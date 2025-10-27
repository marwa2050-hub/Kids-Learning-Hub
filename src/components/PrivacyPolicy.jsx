import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const texts = {
  en: {
    title: "Privacy Policy",
    content: `
Welcome to Kids Learning Hub! We value your privacy and are committed to protecting your personal information. 
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

By using Kids Learning Hub, you agree to the terms of this Privacy Policy.
    `
  },
  fa: {
    title: "سیاست حفظ حریم خصوصی",
    content: `
به Kids Learning Hub خوش آمدید! ما به حریم خصوصی شما احترام می‌گذاریم و متعهد به محافظت از اطلاعات شخصی شما هستیم.
این صفحه سیاست حفظ حریم خصوصی، نحوه جمع‌آوری، استفاده و محافظت از داده‌های شما را هنگام استفاده از وب‌سایت یا برنامه‌های ما توضیح می‌دهد.

1. اطلاعات جمع‌آوری شده:
- اطلاعات شخصی مانند نام و ایمیل هنگام ثبت‌نام یا تماس با ما.
- داده‌های استفاده شامل صفحات بازدید شده، مدت زمان صرف شده و تعامل با بازی‌ها.

2. نحوه استفاده از اطلاعات شما:
- ارائه و بهبود خدمات آموزشی ما.
- ارتباط با شما درباره به‌روزرسانی‌ها، خبرنامه‌ها یا پیشنهادات ویژه.
- تضمین محیط یادگیری امن و مطمئن برای کودکان.

3. اشتراک‌گذاری اطلاعات:
- ما اطلاعات شخصی شما را نمی‌فروشیم.
- ممکن است داده‌ها را با شرکای معتبر به منظور بهبود خدمات یا رعایت الزامات قانونی به اشتراک بگذاریم.

4. اقدامات امنیتی:
- ما اقدامات امنیتی استاندارد صنعتی را برای محافظت از اطلاعات شما اجرا می‌کنیم.
- دسترسی به داده‌های شخصی محدود به پرسنل مجاز است.

5. کوکی‌ها و ردیابی:
- ما از کوکی‌ها برای بهبود تجربه کاربری و درک نحوه استفاده از پلتفرم استفاده می‌کنیم.
- شما می‌توانید کوکی‌ها را در تنظیمات مرورگر غیرفعال کنید، اما برخی ویژگی‌ها ممکن است به درستی کار نکنند.

6. تغییرات در سیاست حفظ حریم خصوصی:
- ممکن است این سیاست را دوره‌ای به‌روزرسانی کنیم. تغییرات در این صفحه منتشر خواهد شد.

با استفاده از Kids Learning Hub، شما با شرایط این سیاست موافق هستید.
    `
  },
  ps: {
    title: "د محرمیت پالیسي",
    content: `
Kids Learning Hub ته ښه راغلاست! موږ ستاسو محرمیت ته ارزښت ورکوو او ژمن یو چې ستاسو شخصي معلومات خوندي وساتو.
دا د محرمیت پالیسي بیانوي چې څنګه موږ ستاسو معلومات راټولوو، کاروو او ساتو کله چې تاسو زموږ ویب پاڼه یا اپلیکیشنونه کاروئ.

1. ټول معلومات چې راټولیږي:
- شخصي معلومات لکه نوم او ایمیل کله چې تاسو ثبت نام کوئ یا موږ سره اړیکه نیسئ.
- د کارونې معلومات لکه لیدل شوې پاڼې، مصرف شوی وخت، او د لوبو سره تعامل.

2. ستاسو د معلوماتو کارول:
- زموږ د تعلیمي خدماتو وړاندې کولو او ښه کولو لپاره.
- تاسو سره د تازه معلوماتو، خبرپاڼو یا ځانګړو وړاندیزونو په اړه اړیکه نیول.
- د ماشومانو لپاره خوندي او امن تعلیمي چاپیریال تضمین کول.

3. د معلوماتو شریکول:
- موږ ستاسو شخصي معلومات نه پلورو.
- موږ ممکن معلومات د باور وړ شریکانو سره یوازې د خدماتو د ښه کولو یا د قانوني اړتیاو پوره کولو لپاره شریک کړو.

4. امنیتي تدابیر:
- موږ د صنعت معیاري امنیتي کړنې پلي کوو ترڅو ستاسو معلومات خوندي وساتو.
- د شخصي معلوماتو لاسرسی یوازې د مجاز کارمندانو لپاره محدود دی.

5. کوکيز او تعقیب:
- موږ د کارونکي تجربه ښه کولو او د پلېټفارم د کارولو د پوهېدو لپاره کوکيز کاروو.
- تاسو کولی شئ په خپل براوزر کې کوکيز غیر فعال کړئ، خو ځینې ځانګړتیاوې ممکن سم کار ونکړي.

6. د محرمیت پالیسي بدلونونه:
- موږ ممکن دا پالیسي وخت په وخت تازه کړو. بدلونونه به په دې پاڼه خپاره شي.

د Kids Learning Hub کارولو سره، تاسو د دې پالیسي شرایطو سره موافق یاست.
    `
  }
};

export default function PrivacyPolicy() {
  const [lang, setLang] = useState("en");
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full p-6 flex justify-center items-start relative"
      style={{
        background: "linear-gradient(135deg, #FFDEE9, #B5FFFC)",
      }}
    >

      {/* دکمه زبان‌ها */}
      <div className="absolute top-4 left-4 flex gap-3 z-20">
        {["en", "fa", "ps"].map(code => {
          const colors = { en: "#ff6b6b", fa: "#6bc1ff", ps: "#ffca3a" };
          return (
            <button
              key={code}
              onClick={() => setLang(code)}
              className={`px-4 py-2 font-bold rounded-full shadow-lg transition-transform transform hover:scale-105`}
              style={{
                background: lang === code ? colors[code] : "#ddd",
                color: lang === code ? "white" : "#555",
              }}
            >
              {code.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* کارت محتوا */}
      <div
        className="w-full max-w-3xl mt-16 mb-16 p-8 overflow-auto shadow-2xl"
        style={{
          direction: lang === "fa" || lang === "ps" ? "rtl" : "ltr",
          borderRadius: "20px",
          background: "linear-gradient(145deg, #fff9f2, #f2f9ff)",
          boxShadow: "0 15px 30px rgba(0,0,0,0.2), 0 0 50px rgba(255,255,255,0.3) inset",
        }}
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center text-pink-600 drop-shadow-lg">
          {texts[lang].title}
        </h1>
        <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed">
          {texts[lang].content}
        </pre>
      </div>

      {/* دکمه Back */}
      <div className="absolute bottom-4 right-4 z-20">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-3 rounded-full font-bold shadow-lg text-white transition-transform transform hover:scale-105"
          style={{
            background: "linear-gradient(90deg, #ff6b6b, #ffca3a)",
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
          }}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
