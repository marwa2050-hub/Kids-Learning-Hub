// src/hooks/useLanguage.js
import { useState, useEffect, useCallback } from "react";
import { t } from "../i18n";

// کلید ذخیره در localStorage
const STORAGE_KEY = "kids_learning_hub_lang";

export default function useLanguage(defaultLang = "en") {
  const [language, setLanguage] = useState(() => {
    // بررسی localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved || defaultLang;
  });

  // ذخیره تغییر زبان در localStorage
  const changeLanguage = useCallback((lang) => {
    setLanguage(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }, []);

  // helper برای دسترسی آسان به ترجمه‌ها
  const translate = useCallback((key) => t(language, key), [language]);

  return { language, changeLanguage, t: translate };
}
