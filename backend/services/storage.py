import json
from pathlib import Path

DATA_FILE = Path("meals.json")

def load_meals() -> list[dict]:
    with open(DATA_FILE, "r") as f:
        return json.load(f)

def save_meals(meals: list[dict]) -> None:
    with open(DATA_FILE, "w") as f:
        json.dump(meals, f, indent=2)
