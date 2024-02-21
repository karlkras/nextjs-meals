import Link from 'next/link';
import Image from 'next/image';
import classes from './meal-item.module.css';
import { MealItemProps } from "@/db/meals";

export const MealItem = ({ title, slug, image, summary, creator }: MealItemProps) => {

  let newImage = "";
  if(typeof image === "string") {
    newImage = image;
  }
  let newTitle = "";
  if(typeof title === "string") {
    newTitle = title;
  }


  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={`${process.env.AWS_IMAGE_URL}/${newImage}`} alt={newTitle} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}

export default MealItem;
