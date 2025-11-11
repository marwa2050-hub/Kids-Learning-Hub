// 📂 src/contexts/LanguageContext.jsx

import React, { createContext, useContext, useState } from "react";

// ایجاد context زبان
const LanguageContext = createContext();

// تابع provider برای دربر گرفتن تمام برنامه
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); // زبان پیش‌فرض: انگلیسی

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// هوک سفارشی برای استفاده آسان از context
export const useLanguage = () => useContext(LanguageContext);
