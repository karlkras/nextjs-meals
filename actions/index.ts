'use server';
import { type MealItemProps, saveMeal } from "@/db/meals";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type ReturnType = {
  message: string | null;
}

export const shareMealAction = async ( prevState: ReturnType, formData: FormData): Promise<ReturnType> => {
  const meal: MealItemProps = {
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    creator: formData.get("name") as string,
    creator_email: formData.get("email") as string,
    image: formData.get("image-picked") as File
  }

  const validationResult = ValidateMealEntry(meal);

  if(!validationResult.isvalid) {
    // do some error
    console.log(`Error: ${validationResult.message}`)
    return { message: validationResult.message as string }
  }

  await saveMeal(meal);
  revalidatePath('/meals');

  redirect("/meals")

}

const ValidateMealEntry = (mealEntry: MealItemProps): { isvalid: boolean, message : string | null} => {
  let messageData: string | null = null;
  for (const [key, value] of Object.entries(mealEntry)) {
    if(typeof value === "string") {
      if(!value || value.trim().length === 0) {
        messageData = `${key} is a required field`;
        break;
      }
    } else if (value instanceof File) {
      if(!value || value.size === 0) {
        messageData = `${key} is either missing or invalid`;
        break;
      }
    }
  }
  // if we're here and still valid, let's test the email format...
  if(!messageData) {
    if(!mealEntry.creator_email?.includes(`@`)) {
      messageData = 'Email field is formatted incorrectly';
    }
  }
  return { isvalid: messageData === null, message:  messageData};
}