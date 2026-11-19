from typing import Literal

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


app = FastAPI(title="React-Python Button API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)


class ButtonRequest(BaseModel):
    action: Literal["button_clicked"]
    message: str = Field(min_length=1)


class ButtonResponse(BaseModel):
    reply: str


@app.post("/api/button", response_model=ButtonResponse)
def notify_button(payload: ButtonRequest) -> ButtonResponse:
    return ButtonResponse(reply=f"Pythonが通知を受け取りました。{payload.message}")
