import classes from './page.module.css';
import Image from "next/image";
import { getMeal } from "@/db/meals";
import { notFound } from "next/navigation";

const MealsDetailsPage = async ({params}: any) => {
  const slugName = params.hasOwnProperty("mealSlug") ? params.mealSlug : "";
  const aMeal = getMeal(slugName);
  if(!aMeal) {
    notFound();
  }
  const {title, summary, image, creator, creator_email, instructions} = aMeal;

  const newInstructions = instructions.replaceAll('\n', '<br/>');

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image fill alt={title} src={image}/>
        </div>
        <div className={classes.headerText}>
          <h1>{title}</h1>
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