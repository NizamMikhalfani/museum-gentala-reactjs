import React, { createContext, useState, useContext, PropsWithChildren } from "react";

const LanguageContext = createContext({
  language: "en",
  // underscore to indicate it's intentionally unused in the default value
  switchLanguage: (_lang: string) => {},
});

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = useState("en");

  const switchLanguage = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);