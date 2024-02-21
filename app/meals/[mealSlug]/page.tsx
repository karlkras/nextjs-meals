import classes from './page.module.css';
import Image from "next/image";
import { getMeal } from "@/db/meals";
import { notFound } from "next/navigation";

export const generateMetadata = async ({params}: any) => {
  const slugName = params.hasOwnProperty("mealSlug") ? params.mealSlug : "";
  const aMeal = getMeal(slugName);
  if(!aMeal) {
    notFound();
  }
  const {title, summary} = aMeal;
  return {
    title, description: summary
  }
}

const MealsDetailsPage = async ({params}: any) => {
  const slugName = params.hasOwnProperty("mealSlug") ? params.mealSlug : "";
  const aMeal = getMeal(slugName);
  if(!aMeal) {
    notFound();
  }
  const {title, summary, image, creator, creator_email, instructions} = aMeal;
  let newInstructions = "";
  if(instructions) {
    newInstructions = instructions.replace(/\r?\n|\r/g, '<br>');
  }
  let newTitle = "";
  if(title) {
    newTitle = title;
  }
  let newImage = "";
  if(image && typeof image === "string") {
    newImage = `${process.env.AWS_IMAGE_URL}/${image}`;
  }

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image fill alt={newTitle} src={newImage}/>
        </div>
        <div className={classes.headerText}>
          <h1>{newTitle}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${creator_email}`}>{creator}</a>
          </p>
          <p className={classes.summary}>
            {summary}
          </p>
        </div>
      </header>
      <main>
        <p className={classes.instructions} dangerouslySetInnerHTML={{
          __html: newInstructions
        }}
        ></p>
      </main>
    </>
  )
}

export default MealsDetailsPage;