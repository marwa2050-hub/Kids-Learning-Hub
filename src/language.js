// src/language.js
let currentLanguage = "en";
const listeners = new Set();

export function getLanguage() {
  return currentLanguage;
}

export function setLanguage(lang) {
  currentLanguage = lang;
  listeners.forEach((cb) => cb(currentLanguage));
}

export function subscribeLanguage(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb); // unsubscribe function
}
