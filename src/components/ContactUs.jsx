import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const texts = {
  en: {
    title: "Contact Us",
    content: `
We’d love to hear from you! If you have any questions, feedback, or need support, please reach out to us:

Email: contact@kidslearninghub.com
Phone: +93744918068
Address: Khair Khana, Kabul City, Afghanistan

Our support team is here to help you Monday through Friday, 9:00 AM to 5:00 PM.
Feel free to send us your suggestions or inquiries anytime!
    `
  },
  fa: {
    title: "تماس با ما",
    content: `
ما خوشحال می‌شویم از شما بشنویم! اگر سوال، بازخورد یا نیاز به پشتیبانی دارید، لطفاً با ما تماس بگیرید:

ایمیل: contact@kidslearninghub.com
تلفن: ۹۳۷۴۴۹۱۸۰۶۸
آدرس: خیرخانه، شهر کابل، افغانستان

تیم پشتیبانی ما از دوشنبه تا جمعه، ساعت 9:00 صبح تا 5:00 بعد از ظهر در خدمت شماست.
هر زمان می‌توانید پیشنهادات یا سوالات خود را برای ما ارسال کنید!
    `
  },
  ps: {
    title: "موږ سره اړیکه",
    content: `
موږ غواړو ستاسو څخه واورو! که تاسو کومې پوښتنې، نظریات، یا ملاتړ ته اړتیا لرئ، مهرباني وکړئ موږ سره اړیکه ونیسئ:

ایمیل: contact@kidslearninghub.com
ټیلیفون:  ۹۳۷۴۴۹۱۸۰۶۸
پته: خیرخانه، کابل، افغانستان

زموږ د ملاتړ ټیم د دوشنبې څخه تر جمعې پورې د سهار له 9:00 څخه تر ماښام 5:00 پورې ستاسو لپاره موجود دی.
هر وخت کولی شئ خپلې وړاندیزونه یا پوښتنې موږ ته واستوئ!
    `
  }
};

export default function ContactUs() {
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
