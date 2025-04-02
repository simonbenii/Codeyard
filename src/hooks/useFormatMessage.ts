import { useState, useEffect, useCallback } from "react";
import useLanguage from "./useLanguage";

const useFormattedMessage = () => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Record<string, string> | null>(null);

  const fetchMessages = useCallback(async (language: string) => {
    try {
      const res = await fetch(`/locales/${language}.json`);
      if (!res.ok) throw new Error("Translation file not found");
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Error loading translations:", error);
      setMessages(null);
    }
  }, []);

  useEffect(() => {
    fetchMessages(language);
  }, [language, fetchMessages]);

  const formatMessage = (key: string, values: Record<string, string> = {}) => {
    if (!messages) return "";

    let message = messages[key] || key;

    Object.keys(values).forEach((placeholder) => {
      message = message.replace(`{${placeholder}}`, values[placeholder]);
    });

    return message;
  };

  return { formatMessage, language };
};

export default useFormattedMessage;
