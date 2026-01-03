import uuid
from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from Db.base import Base

class Meal(Base):
    __tablename__ = "meals"

    id: Mapped[str] = mapped_column(
        String, primary_key=True, default=lambda: str(uuid.uuid4())
    )
    name: Mapped[str] = mapped_column(String, nullable=False)
    calories: Mapped[int] = mapped_column(Integer)
    tags: Mapped[str] = mapped_column(String)  # comma-separated for now


class MealPlan(Base):
    __tablename__ = "meal_plans"

    id: Mapped[str] = mapped_column(
        String, primary_key=True, default=lambda: str(uuid.uuid4())
    )

    items: Mapped[list["MealPlanItem"]] = relationship(
        back_populates="meal_plan", cascade="all, delete"
    )


class MealPlanItem(Base):
    __tablename__ = "meal_plan_items"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    meal_plan_id: Mapped[str] = mapped_column(ForeignKey("meal_plans.id"))
    meal_id: Mapped[str] = mapped_column(ForeignKey("meals.id"))
    day_of_week: Mapped[int]
    meal_type: Mapped[str]

    meal_plan = relationship(back_populates="items")
