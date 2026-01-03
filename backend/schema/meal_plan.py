from pydantic import BaseModel

class MealPlanItem(BaseModel):
    day_of_week: int
    meal_type: str
    meal: dict

class MealPlan(BaseModel):
    items: list[MealPlanItem]
