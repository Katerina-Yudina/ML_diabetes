from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    username: str
    email: Optional[str] = None
    hashed_password: str
    role: str = "user"  # Роли: user, admin
    credits: int = 100  # Внутренняя валюта