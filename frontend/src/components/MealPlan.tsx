import { useState } from "react";
import type { MealPlan } from "../types";
import { generateMealPlan } from "../api";

export default function MealPlanComponent() {
  const [plan, setPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await generateMealPlan();
      setPlan(data);
    } catch {
      alert("Failed to generate plan");
    } finally {
      setLoading(false);
    }
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Weekly Meal Plan</h2>
      <button
        className="bg-blue-500 text-white mb-4"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Plan"}
      </button>

      {plan && (
        <div className="meal-grid">
          {plan.items.map((item, idx) => (
            <div key={idx} className="card">
              <div className="font-semibold">{days[item.day_of_week]} - {item.meal_type}</div>
              <div>{item.meal.name}</div>
              <div className="text-sm text-gray-400">{item.meal.calories} cal</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
