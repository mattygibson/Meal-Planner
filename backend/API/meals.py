from fastapi import APIRouter
from services.storage import load_meals
from schema.meal import Meal

router = APIRouter(prefix="/meals", tags=["Meals"])

@router.get("", response_model=list[Meal])
def list_meals():
    return load_meals()
