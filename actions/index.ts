'use server';
import { type MealItemProps, saveMeal } from "@/db/meals";

export const shareMealAction = async (formData: FormData) => {
  const meal: MealItemProps = {
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    creator: formData.get("name") as string,
    creator_email: formData.get("email") as string,
    image: formData.get("image-picked") as File
  }

  await saveMeal(meal);

}