import React from "react";

function SettingsPanel({
  settings,
  toggleTheme,
  handleChange,
  text,
}) {
  return (
    <div>
      <button onClick={toggleTheme}>
        {text.theme}
      </button>

      <br />
      <br />

      <input
        type="text"
        name="username"
        placeholder={text.name}
        value={settings.username}
        onChange={handleChange}
      />

      <br />
      <br />

      <select
        name="language"
        value={settings.language}
        onChange={handleChange}
      >
        <option value="ua">Українська</option>
        <option value="en">English</option>
        <option value="pl">Polski</option>
      </select>
    </div>
  );
}
