import { useEffect, useState } from "react";
import type { Meal } from "../types";
import { fetchMeals } from "../api";

export default function MealList() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortByCalories, setSortByCalories] = useState<"asc" | "desc" | null>(null);

  useEffect(() => {
    fetchMeals().then(setMeals).finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading meals...</div>;

  const allTags = Array.from(new Set(meals.flatMap(meal => meal.tags.length ? meal.tags : ["Other"])));
  const filteredMeals = selectedTag
    ? meals.filter(meal => meal.tags.includes(selectedTag))
    : meals;

  if (sortByCalories === "asc") filteredMeals.sort((a, b) => a.calories - b.calories);
  if (sortByCalories === "desc") filteredMeals.sort((a, b) => b.calories - a.calories);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-400">All Meals</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <span className="font-semibold mr-2">Filter by tag:</span>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`px-3 py-1 rounded text-sm ${
                selectedTag === tag ? "bg-blue-600 text-white" : "bg-gray-700 hover:bg-gray-600"
              }`}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="ml-auto">
          <span className="font-semibold mr-2">Sort by calories:</span>
          <button
            className="px-3 py-1 rounded text-sm bg-gray-700 hover:bg-gray-600 mr-2"
            onClick={() => setSortByCalories("asc")}
          >
            Low → High
          </button>
          <button
            className="px-3 py-1 rounded text-sm bg-gray-700 hover:bg-gray-600"
            onClick={() => setSortByCalories("desc")}
          >
            High → Low
          </button>
          <button
            className="px-3 py-1 rounded text-sm bg-gray-700 hover:bg-gray-600 ml-2"
            onClick={() => setSortByCalories(null)}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="meal-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredMeals.map(meal => (
          <div key={meal.id} className="card flex flex-col">
            <img
              src={meal.image || "https://picsum.photos/200/150"}
              alt={meal.name}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <div className="card-title">{meal.name}</div>
            <div className="card-subtitle">{meal.calories} cal</div>
            <div className="card-tags text-gray-400 text-xs mt-1">Tags: {meal.tags.join(", ")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
