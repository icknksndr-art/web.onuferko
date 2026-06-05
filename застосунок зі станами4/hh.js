import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SettingsPanel from "./components/SettingsPanel";
import PreviewBlock from "./components/PreviewBlock";

function App() {
  const [settings, setSettings] = useState({
    theme: "light",
    username: "",
    language: "ua",
  });

  const toggleTheme = () => {
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("Поточні налаштування:", settings);
  }, [settings]);

  const translations = {
    ua: {
      title: "Налаштування сторінки",
      theme: "Змінити тему",
      name: "Ваше ім'я",
      preview: "Поточні налаштування",
    },
    en: {
      title: "Page Settings",
      theme: "Change Theme",
      name: "Your Name",
      preview: "Current Settings",
    },
    pl: {
      title: "Ustawienia strony",
      theme: "Zmień motyw",
      name: "Twoje imię",
      preview: "Aktualne ustawienia",
    },
  };

  const text = translations[settings.language];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        backgroundColor:
          settings.theme === "light" ? "#ffffff" : "#1e1e1e",
        color: settings.theme === "light" ? "#000000" : "#ffffff",
        transition: "0.3s",
      }}
    >
      <Header title={text.title} />

      <SettingsPanel
        settings={settings}
        toggleTheme={toggleTheme}
        handleChange={handleChange}
        text={text}
      />

      <PreviewBlock settings={settings} text={text} />
    </div>
  );
}