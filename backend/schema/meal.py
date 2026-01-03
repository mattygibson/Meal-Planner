from pydantic import BaseModel

class Meal(BaseModel):
    id: int
    name: str
    calories: int
    tags: list[str]
    image: str
