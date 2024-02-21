import classes from "@/app/meals/page.module.css";
import Link from "next/link";
import MealsGrid, { MealGridType } from "@/components/meals/meals-grid";
import { getMeals } from "@/db/meals";
import { Suspense } from "react";

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by our vibrant community',
};

const Meals = async () => {
  const mealGridMeals: MealGridType = {meals: await getMeals()};
  return <MealsGrid meals={mealGridMeals['meals']}/>
}


const Page = () => {

  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created <span className={classes.highlight}>by you</span>
        </h1>
        <p>Choose your favorite recipe and cook it yourself</p>
        <p className={classes.cta}>
          <Link href="/meals/share">
            Share Your Favorite Recipes
          </Link>
        </p>

      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fetching Meals...</p>}>
          <Meals/>
        </Suspense>
      </main>
    </>
  )
}

export default Page;