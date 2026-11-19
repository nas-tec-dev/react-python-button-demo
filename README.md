# react-python-button-demo
React-Python間のやり取り試作

既存の React 画面から FastAPI に通知し、Python の返信を表示する通信確認アプリです。基本ブランチは `main` です。

## 構成

```text
frontend/   React / Vite
backend/    Python / FastAPI
```

## ローカル起動

Node.js と Python を用意し、2つのターミナルで起動してください。動作確認には Node.js 24.19.0、npm 11.17.0、Python 3.12 を使用しています。

### Python API

リポジトリのルートで実行します。Windows PowerShell では仮想環境を有効化せず、その Python を直接指定できます。

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r backend/requirements.txt
.\.venv\Scripts\python.exe -m uvicorn main:app --app-dir backend --host 127.0.0.1 --port 8000 --reload
```

macOS / Linux では `python3 -m venv .venv` で作成し、以降は `.venv/bin/python` を使用します。

依存関係は `backend/requirements.txt` の FastAPI と Uvicorn です。API の確認画面は `http://127.0.0.1:8000/docs` です。

### React

別のターミナルでリポジトリのルートから実行します。

```powershell
cd frontend
npm ci
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

`http://127.0.0.1:5173/` を開き、「Pythonに通知する」を押してください。返信が表示されます。停止するときは各ターミナルで `Ctrl+C` を押します。

ビルド確認は `frontend` で `npm run build` を実行します。

## 通信仕様

React は `POST http://localhost:8000/api/button` に次の JSON を送ります。

```json
{
  "action": "button_clicked",
  "message": "Reactのボタンが押されました"
}
```

Python はリクエストを読み取り、`reply` を含む JSON を返します。

```json
{
  "reply": "Pythonが通知を受け取りました。Reactのボタンが押されました"
}
```

`action` と空でない文字列の `message` は必須です。不正なリクエストは HTTP 422 になります。React は HTTP エラー、接続エラー、返信形式のエラーを画面に表示します。

ローカル開発の CORS は `http://localhost:5173` と `http://127.0.0.1:5173` からの POST を許可しています。API URL を変更する場合は Vite 起動前に `VITE_API_BASE_URL` を設定します。

```powershell
$env:VITE_API_BASE_URL = 'http://127.0.0.1:8000'
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

## ファイル管理

`.env`、API キー、実際の履歴書、仮想環境、`node_modules`、ビルド出力、ログはコミット対象から除外します。フロントエンドの環境変数はブラウザへ公開されるため、秘密情報を入れないでください。
