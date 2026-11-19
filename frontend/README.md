# React ↔ Python ボタン通知サンプル

React画面からPython APIへ通知し、Pythonの応答を画面に表示する最小サンプルです。

## 起動方法

### 1. React画面

```powershell
cd frontend
npm install
npm run dev
```

Viteが表示する `http://localhost:5173/` をブラウザで開き、「Pythonに通知する」を押してください。ボタンの通知を受け取ったPython APIが応答し、画面に返信が表示されます。

## 通信の流れ

1. Reactが `POST http://localhost:8000/api/button` にJSONを送信

フロントエンドのAPI URLは `VITE_API_BASE_URL` で変更できます。未設定の場合は `http://localhost:8000` を使います。
