// src/types.ts

export interface Meal {
  id: string;
  name: string;
  calories: number;
  tags: string[];
  image?: string;
}

export interface MealPlanItem {
  day_of_week: number;
  meal_type: string;
  meal: Meal;
}

export interface MealPlan {
  items: MealPlanItem[];
}
