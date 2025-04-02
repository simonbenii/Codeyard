import { useState, useEffect } from "react";

const useLanguage = () => {
  const defaultLanguage = "en";
  const [language, setLanguage] = useState(defaultLanguage);

  useEffect(() => {
    const storedLanguage = sessionStorage.getItem("language");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    } else {
      sessionStorage.setItem("language", defaultLanguage);
    }
  }, []);

  const updateLanguage = (newLanguage: string) => {
    if (newLanguage === language) return;

    setLanguage(newLanguage);
    sessionStorage.setItem("language", newLanguage);
    window.location.reload();
  };

  return { language, updateLanguage };
};

export default useLanguage;
