import classes from "@/components/meals/meals-grid.module.css";
import MealItem from "@/components/meals/meal-item";
import { MealItemProps } from "@/db/meals";


export type MealGridType = {
  meals: MealItemProps[];
}


const MealsGrid = ({meals}: MealGridType) => {
  return (
    <ul className={classes.meals}>
      {meals.map((aMeal) => <li key={aMeal.id}><MealItem {...aMeal}/></li>)}
    </ul>
  )
}

export default MealsGrid;