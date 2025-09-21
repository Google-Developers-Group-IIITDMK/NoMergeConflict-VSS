import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    onLogin(username.trim() || "guest");
  };

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      alignItems: "center",
      justifyContent: "center",
      background: "#f3f4f6"
    }}>
      <div style={{
        background: "white",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Virtual Stock Simulator
        </h2>

        <label htmlFor="username" style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
          Enter a username
        </label>
        <input
          id="username"
          type="text"
          placeholder="your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "1rem"
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "0.6rem",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#2563eb",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Enter
        </button>
      </div>
    </div>
  );
}
