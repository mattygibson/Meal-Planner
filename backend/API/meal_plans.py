from fastapi import APIRouter, HTTPException
from services.storage import load_meals
from services.meal_plan_generator import generate_weekly_plan
from schema.meal_plan import MealPlan

router = APIRouter(prefix="/meal-plans", tags=["Meal Plans"])

@router.post("/generate", response_model=MealPlan)
def generate_meal_plan():
    meals = load_meals()
    if not meals:
        raise HTTPException(400, "No meals available")

    items = generate_weekly_plan(meals)
    return {"items": items}
