import { useState, useEffect } from "react";
import type { Meal } from "../types";
import { fetchMeals } from "../api";

type PlanItem = {
  day_of_week: string;
  meal_type: keyof typeof rowColors;
  meal: Meal;
};

// Subtle row background colors
const rowColors = {
  Breakfast: "bg-blue-700/30",
  Lunch: "bg-yellow-600/20",
  Dinner: "bg-green-700/20"
} as const;

export default function MealPlanComponent() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [plan, setPlan] = useState<PlanItem[] | null>(null);
  const [loading, setLoading] = useState(false);

  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const mealTypes: Array<keyof typeof rowColors> = ["Breakfast","Lunch","Dinner"];

  useEffect(() => {
    fetchMeals().then(fetched => setMeals(fetched));
  }, []);

  const handleGenerate = async () => {
    setLoading(true);

    if (!meals || meals.length === 0) {
      console.warn("No meals available to generate a plan");
      setLoading(false);
      return;
    }

    const newPlan: PlanItem[] = [];

    days.forEach(day => {
      mealTypes.forEach(type => {
        const availableMeals = meals.filter(m => m.tags.includes(type));
        if (availableMeals.length === 0) return;
        const meal = availableMeals[Math.floor(Math.random() * availableMeals.length)];
        newPlan.push({ day_of_week: day, meal_type: type, meal });
      });
    });

    setPlan(newPlan);
    setLoading(false);
  };

  const mealsByType = mealTypes.map(type =>
    plan?.filter(item => item.meal_type === type) || []
  );

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-300">Weekly Meal Plan</h2>

      <button
        onClick={handleGenerate}
        className="w-48 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white font-semibold transition"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Plan"}
      </button>

      {plan && plan.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <div className="grid grid-cols-8 gap-4 min-w-[900px]">
            
            {/* Top-left empty cell */}
            <div></div>

            {/* Column headers: Days */}
            {days.map(day => (
              <div key={day} className="font-semibold text-center text-gray-300 uppercase text-sm">
                {day}
              </div>
            ))}

            {/* Meals rows */}
            {mealTypes.map((type, rowIdx) => (
              <div key={type} className="contents">
                {/* Row label */}
                <div className="font-semibold text-gray-400 flex items-center justify-center uppercase text-sm">
                  {type}
                </div>

                {days.map(day => {
                  const item = mealsByType[rowIdx].find(m => m.day_of_week === day);
                  return item ? (
                    <div
                      key={`${day}-${type}`}
                      className={`relative p-2 rounded-lg shadow-sm flex flex-col items-center gap-1 ${rowColors[type]} group`}
                    >
                      <img
                        src={item.meal.image || "https://picsum.photos/200/150"}
                        alt={item.meal.name}
                        className="w-full h-24 object-cover rounded"
                      />
                      <div className="font-semibold text-white">{item.meal.name}</div>

                      {/* Professional tooltip */}
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-gray-200 text-xs px-3 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        {item.meal.tags.join(", ")} • {item.meal.calories} cal
                        {/* small arrow */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>
                    </div>
                  ) : (
                    <div key={`${day}-${type}`} className={`p-2 rounded-lg h-32 ${rowColors[type]}`}></div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {plan && plan.length === 0 && (
        <div className="text-gray-400 mt-4">No meals available to display.</div>
      )}
    </div>
  );
}
