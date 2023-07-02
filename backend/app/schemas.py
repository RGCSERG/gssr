from pydantic import BaseModel
from typing import Optional, Union
from datetime import datetime


class Post(BaseModel):
    title:str
    content:str
    published:bool = True