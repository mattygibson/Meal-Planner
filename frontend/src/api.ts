import type { Meal, MealPlan } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchMeals(): Promise<Meal[]> {
  const res = await fetch(`${API_URL}/meals`);
  if (!res.ok) throw new Error("Failed to fetch meals");
  return res.json();
}

export async function generateMealPlan(): Promise<MealPlan> {
  const res = await fetch(`${API_URL}/meal-plans/generate`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to generate meal plan");
  return res.json();
}
