import React, { createContext, useState, useContext, PropsWithChildren } from "react";

type LanguageContextShape = {
  language: string;
  switchLanguage: (lang: string) => void;
};

const defaultValue: LanguageContextShape = {
  language: "en",
  switchLanguage: () => {},
};

const LanguageContext = createContext<LanguageContextShape>(defaultValue);

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