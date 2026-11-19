import { useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export default function App() {
  const [state, setState] = useState("idle");
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");

  async function notifyPython() {
    setState("sending");
    setReply("");
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/button`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "button_clicked",
          message: "Reactのボタンが押されました",
        }),
      });

      if (!response.ok) {
        throw new Error(`Python APIからHTTP ${response.status}が返りました。`);
      }

      const data = await response.json();
      setReply(data.reply);
      setState("received");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Python APIに接続できませんでした。",
      );
      setState("error");
    }
  }

  return (
    <main className="demo-shell">
      <section className="demo-card" aria-live="polite">
        <div className="eyebrow">REACT ↔ PYTHON</div>
        <h1>ボタン通知サンプル</h1>
        <p className="intro">
          ボタンを押すとReactからPythonへ通知し、Pythonの返事をここに表示します。
        </p>

        <button
          className="notify-button"
          onClick={notifyPython}
          disabled={state === "sending"}
        >
          {state === "sending" ? "Pythonへ送信中…" : "Pythonに通知する"}
        </button>

        {state === "idle" && (
          <p className="result-placeholder">
            ボタンを押すとPythonからの応答が表示されます。
          </p>
        )}
        {state === "sending" && (
          <p className="result pending">通知を送信しています。</p>
        )}
        {state === "received" && (
          <p className="result success">
            <span aria-hidden="true">✓</span> {reply}
          </p>
        )}
        {state === "error" && (
          <p className="result failure" role="alert">
            {error} Python APIが8000番ポートで起動しているか確認してください。
          </p>
        )}

        <p className="endpoint">POST {API_BASE_URL}/api/button</p>
      </section>
    </main>
  );
}
