import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const texts = {
  en: {
    title: "About Us",
    content: `
Welcome to Kids Learning Hub! Our mission is to create a fun, safe, and educational environment for children to explore and learn. 

Our platform offers interactive games, activities, and lessons designed to make learning enjoyable and engaging. We believe that every child has the potential to succeed, and we strive to provide tools that help them develop their skills in reading, math, science, and creativity.

Why Choose Kids Learning Hub?
- Safe and child-friendly environment.
- Educational content crafted by experienced teachers.
- Interactive games that make learning fun.
- Progress tracking to help children and parents see growth.

Our Goal:
We aim to inspire curiosity, creativity, and a love for learning in every child. By combining education with play, we make learning a joyful experience.

Thank you for being part of our community!
    `
  },
  fa: {
    title: "درباره ما",
    content: `
به Kids Learning Hub خوش آمدید! ماموریت ما ایجاد یک محیط سرگرم‌کننده، امن و آموزشی برای کودکان است تا بتوانند کاوش و یادگیری کنند. 

پلتفرم ما بازی‌ها، فعالیت‌ها و درس‌های تعاملی ارائه می‌دهد که یادگیری را جذاب و لذت‌بخش می‌کند. ما معتقدیم که هر کودک پتانسیل موفقیت دارد و تلاش می‌کنیم ابزارهایی ارائه دهیم که به آنها در توسعه مهارت‌های خواندن، ریاضی، علوم و خلاقیت کمک کند.

چرا Kids Learning Hub؟
- محیط امن و مناسب کودکان.
- محتوای آموزشی طراحی شده توسط معلمان مجرب.
- بازی‌های تعاملی که یادگیری را سرگرم‌کننده می‌کنند.
- پیگیری پیشرفت برای کمک به کودکان و والدین در مشاهده رشد.

هدف ما:
ما هدف داریم کنجکاوی، خلاقیت و عشق به یادگیری را در هر کودک الهام بخشیم. با ترکیب آموزش با بازی، یادگیری را به تجربه‌ای شاد تبدیل می‌کنیم.

از اینکه بخشی از جامعه ما هستید، سپاسگزاریم!
    `
  },
  ps: {
    title: "زموږ په اړه",
    content: `
Kids Learning Hub ته ښه راغلاست! زموږ موخه د ماشومانو لپاره یوه خوندوره، خوندي او تعلیمي چاپیریال رامینځته کول دي ترڅو وکولی شي وپلټي او زده کړه وکړي. 

زموږ پلیټ فارم تعاملي لوبې، فعالیتونه او درسونه وړاندې کوي چې زده کړه یې خوندوره او په زړه پورې کوي. موږ باور لرو چې هر ماشوم د بریالیتوب وړتیا لري، او موږ هڅه کوو هغه وسیلې برابرې کړو چې د لوستلو، ریاضیاتو، علومو او خلاقیت په مهارتونو کې یې مرسته وکړي.

ولې Kids Learning Hub؟
- خوندي او د ماشومانو لپاره دوستانه چاپیریال.
- د تجربې لرونکو ښوونکو لخوا چمتو شوی تعلیمي محتوا.
- تعاملي لوبې چې زده کړه خوندوره کوي.
- پرمختګ څارنه ترڅو ماشومان او والدین وکولی شي وده وګوري.

زموږ هدف:
موږ هڅه کوو په هر ماشوم کې تجسس، خلاقیت او د زده کړې مینه رامنځته کړو. د زده کړې او لوبې ترکیب سره، زده کړه یوه خوندوره تجربه کیږي.

ستاسو د ګډون لپاره مننه!
    `
  }
};

export default function AboutUs() {
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
