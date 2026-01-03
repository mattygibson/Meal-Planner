import random

MEAL_TYPES = ["breakfast", "lunch", "dinner"]

def generate_weekly_plan(meals: list[dict]) -> list[dict]:
    plan = []

    for day in range(7):
        for meal_type in MEAL_TYPES:
            eligible = [
                m for m in meals
                if meal_type in m["tags"]
            ]
            meal = random.choice(eligible)
            plan.append({
                "day_of_week": day,
                "meal_type": meal_type,
                "meal": meal
            })

    return plan
