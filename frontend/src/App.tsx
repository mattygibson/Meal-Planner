import { Routes, Route } from "react-router-dom";
import MealList from "./components/MealList";
import MealPlanComponent from "./components/MealPlanComponent";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex min-h-screen bg-gray-800 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
        <Routes>
          <Route path="/" element={<MealPlanComponent />} />
          <Route path="/meals" element={<MealList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
