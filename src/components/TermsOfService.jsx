import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const texts = {
  en: {
    title: "Terms of Service",
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
    content: `
به Kids Learning Hub خوش آمدید! با استفاده از پلتفرم ما، شما با شرایط و ضوابط زیر موافقت می‌کنید:

1. استفاده از محتوا:
- تمام مطالب آموزشی برای استفاده شخصی و غیرتجاری است.
- کپی یا توزیع محتوا بدون اجازه ممنوع است.

2. رفتار کاربران:
- کاربران باید محترمانه رفتار کنند و از دستورالعمل‌ها پیروی کنند.
- اذیت و آزار، تقلب یا سوءاستفاده از پلتفرم مجاز نیست.

3. حساب‌های کاربری:
- اطلاعات ورود خود را امن نگه دارید.
- در صورت به خطر افتادن حساب، فوراً ما را مطلع کنید.

4. حریم خصوصی:
- ما به حریم خصوصی شما احترام می‌گذاریم. لطفاً سیاست حفظ حریم خصوصی ما را بررسی کنید.

5. به‌روزرسانی‌ها:
- ممکن است این شرایط به‌طور دوره‌ای به‌روزرسانی شود. ادامه استفاده از پلتفرم به معنی پذیرش شماست.

از اینکه بخشی از جامعه آموزشی ما هستید، سپاسگزاریم!
    `
  },
  ps: {
    title: "د خدمت شرایط",
    content: `
Kids Learning Hub ته ښه راغلاست! د دې پلیټ فارم د کارولو سره، تاسو لاندې شرایط او قواعد منئ:

1. د محتوا کارول:
- ټول تعلیمي مواد د شخصي او غیر تجارتي کارونې لپاره دي.
- د اجازې پرته د محتوا کاپي یا توزیع منع دی.

2. د کارونکي چلند:
- کاروونکي باید درناوی وکړي او زموږ لارښودونه تعقیب کړي.
- ځورول، فریب یا د پلیټ فارم ناوړه کارول اجازه نلري.

3. حسابونه:
- د ننوتلو معلومات خوندي وساتئ.
- که ستاسو حساب له خطر سره مخ شو، ژر تر ژره موږ ته خبر ورکړئ.

4. محرمیت:
- موږ ستاسو محرمیت ته ارزښت ورکوو. د جزئیاتو لپاره زموږ د محرمیت پالیسۍ وګورئ.

5. تازه معلومات:
- موږ ممکن دا شرایط وخت په وخت تازه کړو. د پلیټ فارم دوامداره کارول ستاسو د منلو نښه ده.

د دې زده کړې ټولنې برخه کیدو لپاره مننه!
    `
  }
};

export default function TermsOfService() {
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
              className="px-4 py-2 font-bold rounded-full shadow-lg transition-transform transform hover:scale-105"
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
