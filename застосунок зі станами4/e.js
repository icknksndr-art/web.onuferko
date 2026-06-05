import React from "react";

function PreviewBlock({ settings, text }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2>{text.preview}</h2>

      <p>
        <strong>Theme:</strong> {settings.theme}
      </p>

      <p>
        <strong>Username:</strong>{" "}
        {settings.username ? settings.username : "—"}
      </p>

      <p>
        <strong>Language:</strong> {settings.language}
      </p>

      {/* Умовний рендеринг */}
      {settings.theme === "dark" ? (
        <p>🌙 Dark mode enabled</p>
      ) : (
        <p>☀️ Light mode enabled</p>
      )}
    </div>
  );
}
