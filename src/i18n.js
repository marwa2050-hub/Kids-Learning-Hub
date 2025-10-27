// src/i18n.js

// ترجمه‌ها برای کل بازی‌ها
export const translations = {
  en: {
    gameNotFound: "Game not found",
    back: "Back",
    score: "Score",
    level: "Level",
    correct: "🎉 Correct!",
    wrong: "❌ Wrong!",
    timer: "Time left",
    // می‌توان پیام‌های دیگر بازی‌ها را اضافه کرد
  },
  fa: {
    gameNotFound: "بازی پیدا نشد",
    back: "بازگشت",
    score: "امتیاز",
    level: "سطح",
    correct: "🎉 درست شد!",
    wrong: "❌ اشتباه شد!",
    timer: "زمان باقی‌مانده",
  },
  ps: {
    gameNotFound: "لوبه ونه موندل شوه",
    back: "شاتګ",
    score: "نمره",
    level: "کچه",
    correct: "🎉 سمه ده!",
    wrong: "❌ ناسم ده!",
    timer: "پاتې وخت",
  },
};

// helper برای دسترسی آسان به ترجمه‌ها
export function t(lang = "en", key) {
  return translations[lang]?.[key] || translations["en"][key] || key;
}
