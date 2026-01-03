from fastapi import FastAPI
from API import meals, meal_plans
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware

# Create FastAPI app instance
app = FastAPI(
    title="Meal Planner API (JSON Storage)",
    description="A simple meal planner API using JSON file storage.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allows all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(meals.router)
app.include_router(meal_plans.router)

handler = Mangum(app)


